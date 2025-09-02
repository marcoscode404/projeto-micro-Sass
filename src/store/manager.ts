import type {
  InterfaceBranches,
  InterfaceObservationNfe,
  InterfacePendingInvoices,
  InterfaceSuppliers,
  IssueDate,
} from "@/store/types";
import { CalendarDate } from "@internationalized/date";
import moment from "moment";
import { defineStore } from "pinia";

export const useMyManagerStore = defineStore("myManagerStore", () => {
  const { $api, $toast } = useNuxtApp();

  const state = reactive({
    suppliers: {
      data: [] as InterfaceSuppliers[],
      isLoad: false,
      selected: {} as InterfaceSuppliers,
      multipleSelected: [] as string[],
    },
    noteEntry: {
      pendingInvoices: {
        data: [] as InterfacePendingInvoices[],
        dataByKey: [] as InterfacePendingInvoices[],
        multipleData: [] as InterfacePendingInvoices[],
        isLoad: false,
        itemSelected: {} as InterfacePendingInvoices,
        issueDate: {
          start: new CalendarDate(
            moment().subtract(2, "months").year(),
            moment().subtract(2, "months").month() + 1,
            moment().subtract(2, "months").date()
          ),
          end: new CalendarDate(
            moment().year(),
            moment().month() + 1,
            moment().date()
          ),
        } as IssueDate,
        isLoadingCheckIn: false,
        isOpenModalGeneralCheckin: false,
      },
      UfSelected: "",
      inputSearchInvoice: "",
      lastInputSearchInvoice: "",
      multipleNotes: false,
      branches: {
        data: [] as InterfaceBranches[],
      },
    },
    dashboard: {
      data: [] as InterfacePendingInvoices[],
      isLoad: false,
      filters: {
        startDateFilter: moment().subtract(2, "months").format("YYYY-MM-DD"),
        filterEndDate: moment().format("YYYY-MM-DD"),
        selectedTypeFilter: "emissao_de_nota",
        type_invoice: "",
        type_product: "",
        originBranchIds: [],
        destinationBranchIds: [],
      },
    },
    totalReceived: {
      data: {} as { quantidade: number; valor_total: string },
      isLoad: false,
    },
    observationsNfe: {} as InterfaceObservationNfe,
  });
  const getters = {};
  const actions = {
    // BUSCAR FORNECEDORES
    async getSuppliers() {
      state.suppliers.isLoad = true;
      await $api
        .get("/invoice_entry/suppliers")
        .then(({ data }) => {
          data.suppliers.forEach((supplier: InterfaceSuppliers) => {
            supplier.checked = false;
          });

          state.suppliers.data = data.suppliers;
          state.suppliers.isLoad = false;
        })
        .catch((error) => {
          $toast.error(getApiError(error));
          state.suppliers.isLoad = false;
        });
    },
    async getPendingInvoices(screen?: string) {
      state.noteEntry.pendingInvoices.isLoad = true;
      state.totalReceived.isLoad = true;

      let dateStart = state.noteEntry.pendingInvoices.issueDate.start;
      let dateEnd = state.noteEntry.pendingInvoices.issueDate.end;

      if (screen === "dashboard") {
        state.dashboard.isLoad = true;
        dateStart = state.dashboard.filters.startDateFilter;
        dateEnd = state.dashboard.filters.filterEndDate;
      }

      await $api
        .get("/invoice_entry/pending_invoices", {
          params: {
            issue_date_start: dateStart,
            issue_date_end: dateEnd,
            type: state.dashboard.filters.selectedTypeFilter
          },
        })
        .then(({ data }) => {
          // if (screen === "dashboard") {
            data.invoices.forEach((nf: InterfacePendingInvoices) => {
              nf.cor_canalBKP = nf.cor_canal;
              // CALCULO DE DIAS DE ATRASO - ENTRADA
              if (nf.entrada_atrasada && nf.check_in_as) {
                const today = moment();
                const checkIn = moment(nf.check_in_as);
  
                const deadline = checkIn.add(48, "hours");
                if (today.isAfter(deadline)) {
                  const daysLate = today.diff(deadline, "days");
                  nf.calculationOfDaysLate = daysLate > 0 ? daysLate : null;
                }
              }
              // --------------------------------------
            }); 
          // }

          let listData: InterfacePendingInvoices[] = data.invoices;

          listData = listData.sort((a, b) => {
            const daysToDeliveryA = Math.min(a.dias_para_entrega ?? 0, 0);
            const daysToDeliveryB = Math.min(b.dias_para_entrega ?? 0, 0);
            let valueA =
              a.nota_cd && a.demanda_geral > 0
                ? a.demanda_geral
                : !a.nota_cd && a.demanda_filial > 0
                ? a.demanda_filial
                : 0;

            let valueB =
              b.nota_cd && b.demanda_geral > 0
                ? b.demanda_geral
                : !b.nota_cd && b.demanda_filial > 0
                ? b.demanda_filial
                : 0;

            if (a.tipos_produtos?.includes("U")) valueA = 0;
            if (b.tipos_produtos?.includes("U")) valueB = 0;

            // Proridade 1: Se ambos têm check-in, ordenar pela demanda
            if (a.check_in_as && b.check_in_as) {
              return valueB - valueA;
            }

            // Proridade 2: Um dos dois tem check-in e entrada atrasada
            if (
              (a.check_in_as && a.entrada_atrasada) ||
              (b.check_in_as && b.entrada_atrasada)
            ) {
              if (a.check_in_as && a.entrada_atrasada) return -1;
              if (b.check_in_as && b.entrada_atrasada) return 1;
            }

            // Proridade 3: Um dos dois tem check-in simples
            if (a.check_in_as || b.check_in_as) {
              if (a.check_in_as) return -1;
              if (b.check_in_as) return 1;
            }

            // Proridade final: dias para entrega
            return daysToDeliveryA - daysToDeliveryB;
          });

          let arrayConcatenation = [
            ...state.noteEntry.pendingInvoices.dataByKey,
            ...listData,
          ];

          state.noteEntry.pendingInvoices.data = arrayConcatenation;
          state.dashboard.data = arrayConcatenation;
          state.noteEntry.pendingInvoices.isLoad = false;
          state.totalReceived.isLoad = false;

          if (screen === "dashboard") state.dashboard.isLoad = false;
        })
        .catch((error) => {
          $toast.error(getApiError(error));
          state.noteEntry.pendingInvoices.isLoad = false;
          state.totalReceived.isLoad = false;
          state.dashboard.isLoad = false;
        });
    },
    async getPendingInvoiceByKey(key: string) {
      if (
        state.noteEntry.lastInputSearchInvoice ==
        state.noteEntry.inputSearchInvoice
      ) {
        return;
      }
      state.noteEntry.lastInputSearchInvoice =
        state.noteEntry.inputSearchInvoice;
      state.noteEntry.pendingInvoices.isLoad = true;
      await $api
        .get("/invoice_entry/pending_invoice_by_key", {
          params: {
            key: key,
          },
        })
        .then(({ data }) => {
          if (data) {
            let nfe = state.noteEntry.pendingInvoices.data.find(
              (x) => x?.chave == data?.chave
            );
            if (nfe == null) {
              state.noteEntry.pendingInvoices.dataByKey.unshift(data);
              state.noteEntry.pendingInvoices.data.unshift(data);
            }
            state.noteEntry.pendingInvoices.isLoad = false;
          }
        })
        .catch((error) => {
          $toast.error(getApiError(error));
          state.noteEntry.pendingInvoices.isLoad = false;
        });
    },
    async postConsultIsAdmitted(item: InterfacePendingInvoices) {
      item.isLoadingConsultIsAdmitted = true;
      item.isDisabled = true;
      await $api
        .post("/invoice_entry/consult_is_admitted", { invoice_key: item.chave })
        .then(({ data }) => {
          item.internada = data.is_admitted;
          item.isLoadingConsultIsAdmitted = false;
        })
        .catch((error) => {
          $toast.error(getApiError(error));
          item.isLoadingConsultIsAdmitted = false;
        });
    },
    async postCheckIn(item?: InterfacePendingInvoices) {
      if (item) item.isLoadingCheckIn = true;
      else state.noteEntry.pendingInvoices.isLoadingCheckIn = true;

      let keys = state.noteEntry.pendingInvoices.multipleData.map(
        (item) => item.chave
      );

      await $api
        .post("/invoice_entry/check_in", {
          invoice_keys: item ? [item.chave] : keys,
        })
        .then(({ data }) => {
          if (item) {
            item.isLoadingCheckIn = false;
            item.isOpenAction = false;
            item.check_in_as = data.invoices[0].check_in_as;
            item.usuario_check_in = data.invoices[0].usuario_check_in;
            item.usuario_id_check_in = data.invoices[0].usuario_id_check_in;
            item.usuario_id_recusa = null;
            item.recusada_as = "";
            item.usuario_recusa = "";
            state.noteEntry.pendingInvoices.dataByKey = [];
          } else {
            state.noteEntry.multipleNotes = false;
            state.noteEntry.pendingInvoices.multipleData = [];
            this.getPendingInvoices();
          }

          state.noteEntry.pendingInvoices.isLoadingCheckIn = false;
        })
        .catch((error) => {
          $toast.error(getApiError(error));
          if (item) item.isLoadingCheckIn = false;
          state.noteEntry.pendingInvoices.isLoadingCheckIn = false;
        });
    },
    async postRefuseNFE(item: InterfacePendingInvoices) {
      item.isLoadingRefuse = true;

      await $api
        .post("/invoice_entry/refuse_nfe", { invoice_keys: [item.chave] })
        .then(({ data }) => {
          item.check_in_as = "";
          item.usuario_check_in = "";
          item.isLoadingRefuse = false;
          item.isOpenModalRefuse = false;
          item.recusada_as = data.invoices[0].recusada_as;
          item.usuario_recusa = data.invoices[0].usuario_recusa;
          item.usuario_id_recusa = data.invoices[0].usuario_id_recusa;

          let indexItem =
            state.noteEntry.pendingInvoices.multipleData.findIndex((note) => {
              return item.chave === note.chave;
            });
          // REMOVER O TEM DO  ARRAY
          state.noteEntry.pendingInvoices.multipleData.splice(indexItem, 1);
        })
        .catch((err) => {
          item.isLoadingRefuse = false;
          $toast.error(getApiError(err));
        });
    },
    async getBranches() {
      await $api
        .get("/invoice_entry/branches")
        .then(({ data }) => {
          state.noteEntry.branches.data = data.branches;
        })
        .catch((err) => {
          $toast.error(getApiError(err));
        });
    },

    async searchInvoice() {
      if (state.noteEntry.inputSearchInvoice.length < 40) {
        state.noteEntry.inputSearchInvoice = "";
        return $toast.error("Informe Valor Válido!");
      }

      let beepedNote = <InterfacePendingInvoices>(
        state.noteEntry.pendingInvoices.data.find(
          (item) => item?.chave === state.noteEntry?.inputSearchInvoice
        )
      );
      if (beepedNote == null) {
        await this.getPendingInvoiceByKey(state.noteEntry.inputSearchInvoice);
        beepedNote = <InterfacePendingInvoices>(
          state.noteEntry.pendingInvoices.data.find(
            (item) => item?.chave === state.noteEntry?.inputSearchInvoice
          )
        );
      }

      // NOTA CHECADA
      if (beepedNote?.check_in_as) {
        state.noteEntry.inputSearchInvoice = "";
        return $toast.warning("Check-in já realizado para essa nota!");
      }

      // SE NÃO ENCONTRAR A NOTA NA LISTA
      if (beepedNote == null) {
        state.noteEntry.inputSearchInvoice = "";
        return $toast.warning("Nota não encontrada!");
      }

      let exists = state.noteEntry.pendingInvoices.multipleData.some(
        (item) => item?.chave === state.noteEntry?.inputSearchInvoice
      );

      if (!exists) {
        state.noteEntry.pendingInvoices.multipleData.push(beepedNote);
        if (beepedNote?.requer_internamento) {
          this.postConsultIsAdmitted(beepedNote);
        }
      } else {
        $toast.warning("Nota Já existe na lista!");
      }

      state.noteEntry.inputSearchInvoice = "";
    },

    async createObservationNfe(
      selectedInoice: InterfacePendingInvoices,
      usuario_id: number
    ) {
      await $api
        .post("/invoice_entry/create_invoice_observation", {
          notas_fiscais_id: selectedInoice.nota_fiscal_id,
          observacao: selectedInoice.observacao,
          usuario_id_criacao: usuario_id,
        })
        .then(({ data }) => {
          $toast.success("Mensagem salva.");

          state.noteEntry.pendingInvoices.data.forEach((item) => {
            if (item.nota_fiscal_id === selectedInoice.nota_fiscal_id) {
              item.observacao_hora = data.observation.criado_as;
              item.qnt_conversas = (item.qnt_conversas ?? 0) + 1;
            }
          });
        })
        .catch((err) => {
          $toast.error(getApiError(err));
        });
    },

    // OBTER OBSERVAÇAO NFE
    async getObservationsNfe(notaFiscalId?: number) {
      await $api
        .get("/invoice_entry/get_invoice_observations", {
          params: { nota_fiscal_id: notaFiscalId },
        })
        .then(({ data }) => {
          state.observationsNfe.observacoes = data.observations;
        })
        .catch((error) => {
          $toast.error(getApiError(error));
        });
    },

    async getTotalReceived() {
      state.totalReceived.isLoad = true;
      let branchIdOnlyOrigin = state.dashboard.filters.originBranchIds?.filter(
        (id) => id !== "all"
      );
      let branchIdOnlyDestination =
        state.dashboard.filters.destinationBranchIds?.filter(
          (id) => id !== "all"
        );

      await $api
        .post("/invoice_entry/get_total_received", {
          start: state.dashboard.filters.startDateFilter,
          end: state.dashboard.filters.filterEndDate,
          type_invoice: state.dashboard.filters.type_invoice,
          type_product: state.dashboard.filters.type_product,
          supliers: state.suppliers.multipleSelected,
          origin_branch: branchIdOnlyOrigin,
          target_branch: branchIdOnlyDestination,
        })
        .then(({ data }) => {
          state.totalReceived.data = data;
          state.totalReceived.isLoad = false;
        })
        .catch(({ err }) => {
          $toast.error(getApiError(err));
          state.totalReceived.isLoad = false;
        });
    },

    async putTypeSuframa(item: InterfacePendingInvoices) {
      await $api.put("/invoice_entry/status_suframa", {
        key: item.chave, status: item.cor_canal
      }).then(() => {
      }).catch(( err ) => {
        $toast.error(getApiError(err));
        item.cor_canal = item.cor_canalBKP;
      });
    },

    async postStatusSuframa(item: InterfacePendingInvoices) {
      item.isLoadStatusSuframa = true;
      await $api.post("/invoice_entry/status_suframa", {
        key: item.chave
      }).then(({ data }) => {
        item.canal_status = data.canal_status;
        item.cor_canal = data.cor_canal;
        item.status_suframa = data.status_suframa;
        item.status_suframa_id = data.status_suframa_id;
        item.cor_canalBKP = data.cor_canal;
        $toast.success("Status atualizado com sucesso.");
        item.isLoadStatusSuframa = false;
      }).catch(( err ) => {
        item.isLoadStatusSuframa = false;
        $toast.error(getApiError(err));
      });
    }
  };

  return { state, getters, actions };
});

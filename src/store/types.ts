import type { DateValue } from "@internationalized/date";
import moment from "moment";

export interface InterfaceSuppliers {
  cnpj?: string;
  id?: number;
  emitente?: string;
  checked?: boolean;
}

export interface InterfacePendingInvoices {
  aceite_fiscal?: boolean;
  chave?: string;
  compras_informado_as?: string;
  compras_status_id?: number;
  data_emissao: string;
  dias_pra_entrega?: number;
  filial?: string;
  filial_id: number;
  filial_id_origem?: number;
  fiscal_informado_as?: string;
  fiscal_status_id?: number;
  fornecedor?: string;
  itens_bonificados?: number;
  nota_fiscal_id?: number;
  numero_nf?: string;
  pedidos?: string | boolean;
  possivel_reposicao_pbm?: boolean;
  previsao_entrega?: string;
  quantidade_itens?: number;
  transferencia?: boolean;
  usuario_compras?: string;
  usuario_fiscal?: string;
  valor_total?: number;
  internada?: number;
  volume?: number;
  dias_para_entrega?: number;
  emitente?: string;
  pendente_aceite_fiscal?: boolean;
  cnpj_emitente?: string;
  requer_internamento?: boolean;
  check_in_as?: string;
  compras_fiscal_id?: number;
  status_autorizacao?: number;
  usuario_id_check_in?: number;
  usuario_check_in?: string;
  recusada_as?: string;
  usuario_recusa?: string;
  usuario_id_recusa?: number | null;
  tipos_produtos?: ["R" | "U" | "S"];
  entrada_atrasada: boolean;
  nota_cd: boolean;
  demanda_filial: number;
  demanda_geral: number;
  pendencia_cadastro: boolean;
  calculationOfDaysLate?: number;
  cor_canal: string;
  canal_status: string;
  status_suframa: string;

  isLoadingConsultIsAdmitted?: boolean;
  isDisabled?: boolean;
  isLoadingCheckIn?: boolean;
  isOpenAction?: boolean;
  isOpenModalNFE?: boolean;
  isOpenModalRefuse?: boolean;
  isLoadingRefuse?: boolean;
  observacao?: string;
  observacao_hora?: string;
  qnt_conversas?: number;
  tipo_pendencia?: string[];
  isLoadStatusSuframa?: boolean;
  cor_canalBKP?: string;
  status_suframa_id?: number;
  requer_suframa?: boolean;
  controlado?: boolean;
}

export interface IssueDate {
  start: DateValue | any;
  end: DateValue | any;
}

export interface InterfaceBranches {
  id: number | string;
  nome: string;
}

export interface InterfaceInfoObservationNfe {
  criado_as: string;
  id: number;
  notas_fiscais_id: number;
  observacao: string;
  usuario_id_criacao: number;
  usuario_criacao: string;
}

export interface InterfaceObservationNfe {
  observacoes: InterfaceInfoObservationNfe[];
}

export interface Totals {
  toReceiveNF: number;
  toReceiveItens: number;
  toReceiveValor: number;
  entryErpNF: number;
  entryErpItens: number;
  entryErpValor: number;
  taxAcceptanceNF: number;
  taxAcceptanceItens: number;
  taxAcceptanceValor: number;
  totalNF: number;
  totalItens: number;
  totalValue: number;
  totalLateEntriesNF: number;
  totalLateEntriesItens: number;
  totalLateEntriesValue: number;
}

export interface ItemTableRow {
  barras?: string;
  estoque_cd?: number;
  a_receber?: number;
  estoque_em_transferencia?: number;
  fabricante?: string;
  produto_id?: number;
  grupo?: string;
  pedido_id?: number;
  preco_ultima_compra?: number;
  produto?: string;
  principio_ativo_id?: number;
  quantidade_pedida: number;
  preco_negociado?: number;
  valor_unitario_faturado?: number;
  estoque_filial_destino?: number;
  quantidade_faturada: number;
  vendas_30_dias_geral?: number;
  vendas_90_dias_geral?: number;
  vendas_30_dias_filial?: number;
  vendas_90_dias_filial?: number;
  dias_de_estoque_geral?: number;
  dias_de_estoque_filial?: number;
  fornecedor_id?: number;
  quantidade_no_carrinho?: string | number;
  quantidade_no_carrinho_salvo?: string | number;
  observacao?: string;
  est_forn_id?: number;
  itens_carrinho?:
    | {
        cnpj: string;
        id: number;
        fornecedor_id: number;
        nome: string;
      }
    | any;

  valor_total?: number;
  storeSelectedSupplier?: any;
  updated?: boolean;
  filial_id?: number;
  loadingPopoverStockSupplier?: boolean;
  pendencia?: string;
  controlado?: boolean;
}

export interface InterfaceAnalysisForProducts {
  cd?: boolean;
  data_emissao?: string;
  filial?: string;
  fornecedor?: string;
  valor_faturado?: number;
  razao_social_emitente?: string;
  razao_social_destinatario?: string;
  chave?: string;
  numero_nf?: string;
  cnpj_destinatario?: string;
  cnpj_emitente?: string;
  itens?: ItemTableRow[];
  pedido_id?: number;
  nota_fiscal_id?: number;
  compras_informado_as?: string;
  compras_status_id?: number;
  fiscal_informado_as?: string;
  fiscal_status_id?: number;
  usuario_compras?: string;
  usuario_fiscal?: string;
}

//
export function zeroStock(nf: InterfacePendingInvoices) {
  return (
    (nf.demanda_filial > 0 &&
      !nf.nota_cd &&
      !nf.tipos_produtos?.includes("U")) ||
    (nf.demanda_geral > 0 && nf.nota_cd && !nf.tipos_produtos?.includes("U"))
  );
}

// LOGICA PARA AGRUPAMENTO DE ITENS
export function groupBy<T extends InterfacePendingInvoices>(
  data: T[],
  key: keyof T,
  getValue: (item: T) => number = () => 0
) {
  const grouped: Record<
    string,
    {
      key: string;
      itens: T[];
      total: number;
      quantityOfItemsToReceive: number;
      amountToReceive: number;
      daysLateReceivable: number;
      quantityOfItemstoEntry: number;
      amountToEntry: number;
      quantityOfItemstoTaxAcceptance: number;
      totalValueOfItemstoTaxAcceptance: number;
      daysLate: number;
      quantityTotal: number;
    }
  > = {};

  const today = moment();
  
  data.forEach((item) => {
    const groupKey = item[key] as string;
    const total = getValue(item);
    
    if (!grouped[groupKey]) {
      grouped[groupKey] = {
        key: groupKey,
        itens: [],
        total: 0,
        quantityOfItemsToReceive: 0,
        amountToReceive: 0,
        daysLateReceivable: 0,
        quantityOfItemstoEntry: 0,
        amountToEntry: 0,
        quantityOfItemstoTaxAcceptance: 0,
        totalValueOfItemstoTaxAcceptance: 0,
        daysLate: 0,
        quantityTotal: 0,
      };
    }

    const group = grouped[groupKey];
    group.itens.push(item);
    group.total += total;

    // REGRA A RECEBER
    if (item.check_in_as == null && item.status_autorizacao != 2) {
      group.quantityOfItemsToReceive += 1;
      group.amountToReceive += item.valor_total || 0;
    }
    // ENTRADA
    if (item.check_in_as != null) {
      group.quantityOfItemstoEntry += 1;
      group.amountToEntry += item.valor_total || 0;
    }
    // NOTAS FISCAIS
    if (item.pendente_aceite_fiscal) {
      group.quantityOfItemstoTaxAcceptance += 1;
      group.totalValueOfItemstoTaxAcceptance += item.valor_total || 0;
    }

    // DIAS DE ATRASO - A RECEBER    
    if (item.dias_para_entrega < group.daysLateReceivable) {
      group.daysLateReceivable = item.dias_para_entrega;
    }
    // FIM DIAS DE ATRASO - A RECEBER ----------

    // DIAS DE ATRASO - ENTRADA
    if (item.entrada_atrasada && item.check_in_as && item.calculationOfDaysLate != null) {
      const daysLate = item.calculationOfDaysLate;
        
      if (daysLate > group.daysLate) {
        group.daysLate = daysLate;
      }
    }
    // FIM DIAS DE ATRASO - ENTRADA ----------


    // CALCULA TOTAL DE QUANTIDADE POR LINHA
    group.quantityTotal =
      group.quantityOfItemstoEntry +
      group.quantityOfItemsToReceive +
      group.quantityOfItemstoTaxAcceptance;
  });

  // ORDENA PELO DIAS DE ATRASO (ENTRADA) - PARA A TABELA DE FILIAL
  if (key == 'filial') return Object.values(grouped).sort(
    (a, b) => (b.daysLate || 0) - (a.daysLate || 0)
  )

  // ORDENA PELO DIAS DE ATRASO (A RECEBER) - PARA A TABELA DE FORNECEDOR
  if (key == 'emitente') return Object.values(grouped).sort(
    (a, b) => (a.daysLateReceivable || 0) - (b.daysLateReceivable || 0)
  )
}

export function filterManager(
  nfs: InterfacePendingInvoices[],
  checkbox: string,
  filterRadioButton: string,
  multipleSupplierSelected: string[],
  branchIdOnlyOrigin: number[],
  branchIdOnlyDestination: number[],
  typeProduct: string | any,
  type_invoice: any
) {
  // PRIORIDADES -----------------------------
  let dataPriorityList = nfs.filter((nf) => {
    let priority = nf.check_in_as && zeroStock(nf);
    if (priority) return nf;
  });

  if (multipleSupplierSelected.length) {
    dataPriorityList = dataPriorityList.filter((nf) => {
      if (multipleSupplierSelected.includes(nf.cnpj_emitente)) return nf;
    });
  }
  if (filterRadioButton != "Todos") {
    dataPriorityList = dataPriorityList.filter((nf) => {
      if (
        filterRadioButton === "A receber" &&
        nf.check_in_as == null &&
        nf.status_autorizacao != 2
      ) {
        return nf;
      }
      if (filterRadioButton === "Entrada" && nf.check_in_as != null) return nf;
      if (filterRadioButton === "Ac. Fiscal" && nf.pendente_aceite_fiscal)
        return nf;
    });
  }

  if (checkbox == "prioridades-em-atraso") {
    dataPriorityList = dataPriorityList.filter((nf) => {
      let productTypeU = nf?.tipos_produtos?.includes("U");
      if (
        (checkbox == "prioridades-em-atraso" &&
          nf.demanda_filial > 0 &&
          !nf.nota_cd &&
          !productTypeU) ||
        (nf.demanda_geral > 0 && nf.nota_cd && !productTypeU)
      ) {
        return nf;
      }
    });
  }
  if (branchIdOnlyOrigin.length) {
    dataPriorityList = dataPriorityList.filter((nf) => {
      if (branchIdOnlyOrigin.includes(nf.filial_id_origem)) return nf;
    });
  }
  if (branchIdOnlyDestination.length) {
    dataPriorityList = dataPriorityList.filter((nf) => {
      if (branchIdOnlyDestination.includes(nf.filial_id)) return nf;
    });
  }
  if (typeProduct) {
    dataPriorityList = dataPriorityList.filter((nf) => {
      if (nf?.tipos_produtos?.includes(typeProduct)) return nf;
    });
  }

  // TIPO NF
  if (type_invoice === "Compra") {
    dataPriorityList = dataPriorityList.filter((nf) => {
      if (
        !nf.possivel_reposicao_pbm &&
        !nf.itens_bonificados &&
        !nf.transferencia
      ) {
        return nf;
      }
    });
  }
  if (type_invoice === "Transferência") {
    dataPriorityList = dataPriorityList.filter((nf) => {
      if (nf.transferencia) return nf;
    });
  }
  if (type_invoice === "Rep. PBM") {
    dataPriorityList = dataPriorityList.filter((nf) => {
      if (nf.possivel_reposicao_pbm) return nf;
    });
  }
  if (type_invoice === "Bonificação") {
    dataPriorityList = dataPriorityList.filter((nf) => {
      if (nf.itens_bonificados) return nf;
    });
  }
  // ------------------FIM--------------------

  // FILTRO DE PENDÊNCIAS CD  E  PENDÊNCIAS FILIAL
  let dataGroupedList = nfs.filter((nf) => {
    let productTypeR = nf?.tipos_produtos?.includes("R");
    let productTypeU = nf?.tipos_produtos?.includes("U");

    if (!checkbox) return nf;
    else if (productTypeR && checkbox == "revenda") return nf;
    else if (productTypeU && checkbox == "uso-consumo") return nf;
    else if (checkbox == "prioridades-em-atraso") {
      if (
        (nf.demanda_filial > 0 &&
          !nf.nota_cd &&
          !nf.tipos_produtos?.includes("U")) ||
        (nf.demanda_geral > 0 &&
          nf.nota_cd &&
          !nf.tipos_produtos?.includes("U"))
      )
        return nf;
      return nf;
    }
  });

  if (multipleSupplierSelected.length) {
    dataGroupedList = dataGroupedList.filter((nf) => {
      if (multipleSupplierSelected.includes(nf.cnpj_emitente)) return nf;
    });
  }
  if (filterRadioButton != "Todos") {
    dataGroupedList = dataGroupedList.filter((nf) => {
      if (
        filterRadioButton === "A receber" &&
        nf.check_in_as == null &&
        nf.status_autorizacao != 2
      ) {
        return nf;
      }
      if (filterRadioButton === "Entrada" && nf.check_in_as != null) return nf;
      if (filterRadioButton === "Ac. Fiscal" && nf.pendente_aceite_fiscal)
        return nf;
    });
  }
  if (checkbox == "prioridades-em-atraso") {
    dataGroupedList = dataGroupedList.filter((nf) => {
      let productTypeU = nf?.tipos_produtos?.includes("U");
      if (
        (checkbox == "prioridades-em-atraso" &&
          nf.demanda_filial > 0 &&
          !nf.nota_cd &&
          !productTypeU) ||
        (nf.demanda_geral > 0 && nf.nota_cd && !productTypeU)
      ) {
        return nf;
      }
    });
  }
  if (branchIdOnlyOrigin.length) {
    dataGroupedList = dataGroupedList.filter((nf) => {
      if (branchIdOnlyOrigin.includes(nf.filial_id_origem)) return nf;
    });
  }
  if (branchIdOnlyDestination.length) {
    dataGroupedList = dataGroupedList.filter((nf) => {
      if (branchIdOnlyDestination.includes(nf.filial_id)) return nf;
    });
  }
  if (typeProduct) {
    dataGroupedList = dataGroupedList.filter((nf) => {
      if (nf?.tipos_produtos?.includes(typeProduct)) return nf;
    });
  }
  // TIPO NF
  if (type_invoice === "Compra") {
    dataGroupedList = dataGroupedList.filter((nf) => {
      if (
        !nf.possivel_reposicao_pbm &&
        !nf.itens_bonificados &&
        !nf.transferencia
      ) {
        return nf;
      }
    });
  }
  if (type_invoice === "Transferência") {
    dataGroupedList = dataGroupedList.filter((nf) => {
      if (nf.transferencia) return nf;
    });
  }
  if (type_invoice === "Rep. PBM") {
    dataGroupedList = dataGroupedList.filter((nf) => {
      if (nf.possivel_reposicao_pbm) return nf;
    });
  }
  if (type_invoice === "Bonificação") {
    dataGroupedList = dataGroupedList.filter((nf) => {
      if (nf.itens_bonificados) return nf;
    });
  }
  // ----------------------

  return { dataPriorityList, dataGroupedList };
}








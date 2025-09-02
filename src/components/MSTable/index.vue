<script setup lang="ts" generic="T extends {[key: string]: any}">
import defineColumns from './defineColumns';
import sort from './sort';
import filter from './useFilter';
import type { ColumnDefinition, VOnObject, getNextPageType } from './types';
import { onClickOutside, useThrottleFn } from '@vueuse/core';
import { useSortable } from '@vueuse/integrations/useSortable';
import ExportCSV from './ExportCSV.vue';
import convertToCSV from '../MSTable/exportCsv';
import { Icon } from '@iconify/vue';

const props = withDefaults(
  defineProps<{
    data: T[];
    columns?: ColumnDefinition[];
    uniqueKey?: string;
    name?: string;
    trEvents?: VOnObject;
    loading?: boolean;
    keyLocalStorage?: string;
    defineShowColumns?: boolean;
    tfoot?: boolean;
    componentSearch?: boolean;
    filterHeader?: boolean;
    componentExportCsv?: boolean;
    componentFilter?: boolean;
    fontSize?: string;
    pagination?: { pageSize: number, getNextPage: getNextPageType, updateData?: boolean }
    persistConfig?: { enable: boolean; key: string };
    colorConfig?: { background: string; font: string };
    columnExcludeCsv?: string[];
    nameFileCsv?: string;
    columnPartial?: { enable: boolean; action: Function, label: string };
    virtualized?: boolean;
    theadTotals?: boolean;
    theadTotalsTop?: boolean;
  }>(),
  {
    tfoot: false,
    defineShowColumns: false,
    loading: false,
    componentSearch: true,
    filterHeader: false,
    virtualized: true,
    theadTotals: false,
    theadTotalsTop: false,
    componentFilter: false,
  }
);

const emits = defineEmits(['scroll'])

const child = ref(null);
const childFilter = ref(null);

const definedColumns = ref(defineColumns(props.columns || [], props.data[0]));
const scrollElement = ref<Element | null>(null);
const scrollTop = ref(0);
const rowHeight = ref(window.innerHeight);
const textGlobalFilter = ref('');
const columnSort = reactive<{ keyColumn: string | null; desc: boolean }>({ keyColumn: null, desc: false });
const isOpen = ref(false);
const positionFilterRef = ref({ x: 0, y: 0 });
const trThs = ref<HTMLElement | null>(null);
const columnFilterElement = ref<HTMLElement | null>(null);
const isOpenConfigCollumns = ref(false);

// MOSTRA E OCULTA COLUNAS
const indexedDefinedColumns = computed(() => {
  let indexedColumns: { [key: string]: ColumnDefinition } = {}

  definedColumns.value.forEach((column) => {
    indexedColumns[column.key] = column;
  });

  return indexedColumns
})

// SALVAR COLUNAS NO LOCALSTORAGE
function saveCollumnsStorage() {
  let dataCollumns = definedColumns.value.map((collumn) => {
    return { key: collumn.key, title: collumn.title, show: collumn.show };
  })

  localStorage.setItem(
    props.keyLocalStorage ?? "defaultKey",
    JSON.stringify(dataCollumns)
  );
}

function readConfigCollumnsFromStorage() {
  let readSavedData = localStorage.getItem(props.keyLocalStorage ?? "defaultKey");
  let formatSavedData = JSON.parse(readSavedData ?? "{}");
  if (readSavedData && props.defineShowColumns) {
    formatSavedData.forEach((collumn: ColumnDefinition) => {
      if (collumn.key in indexedDefinedColumns.value) {
        indexedDefinedColumns.value[collumn.key].show = collumn.show;
      } else {
        saveCollumnsStorage()
      }
    });
  }
};

watch(
  () => definedColumns.value,
  () => {
    saveCollumnsStorage();
  }, { deep: true })
// || \\

function sortColumns() {
  const sortedKeys = JSON.parse(localStorage.getItem(props.persistConfig?.key ?? "") ?? "[]");

  if (sortedKeys == null) return;

  let sortedColumns = [];
  for (let key of sortedKeys) {
    const index = definedColumns.value.findIndex((c) => c.key === key);
    sortedColumns.push(definedColumns.value[index]);
  }

  definedColumns.value = sortedColumns;
}

if (props.persistConfig) {
  sortColumns();
}

const paginationState = reactive({
  enable: props.pagination != null,
  loading: false,
  lastPage: false,
  currentPage: 0
})

function changeColumnSort(keyColumn: string) {
  if (keyColumn === columnSort.keyColumn) {
    if (columnSort.desc) {
      columnSort.keyColumn = null;
      columnSort.desc = false;
    } else {
      columnSort.desc = true;
    }
  } else {
    columnSort.keyColumn = keyColumn;
    columnSort.desc = false;
  }
}

function defineRowHeight() {
  const td = scrollElement.value?.querySelector('td');

  let rowHeightTotals = 0;
  if(props.theadTotals) rowHeightTotals = 14;
  if(props.theadTotalsTop) rowHeightTotals = 14;

  if (td == null) {
    requestAnimationFrame(defineRowHeight);
  } else {
    rowHeight.value = Math.ceil(td.getBoundingClientRect().height) + rowHeightTotals;
  }
}

function vOnTrs(item: object) {
  if (props.trEvents == null) return {};

  let events: VOnObject = {};

  for (const [eventName, func] of Object.entries(props.trEvents)) {
    events[eventName] = (event) => {
      return func(event, item);
    };
  }

  return events;
}

function setIsOpen(event: MouseEvent, component: 'configCollumns' | 'filter', column?: ColumnDefinition,) {
  positionFilterRef.value.x = event.pageX;
  positionFilterRef.value.y = event.pageY;
  if (component == 'filter') {
    filterColumn.currentColumn = column;
    isOpen.value = true;
  } else if (component == 'configCollumns') {
    isOpenConfigCollumns.value = true;
  }
}

onClickOutside(columnFilterElement, () => (isOpen.value = false));
useSortable(trThs, definedColumns);

const filtered = computed(() => {
  const result = filter.globalFilter(props.data, textGlobalFilter.value);
  return result;
});

const filterColumn = reactive({
  currentColumn: null,
  filteredData: [] as T[],
});

const sorted = computed(() => {
  const result = sort.sortData(
    filterColumn.filteredData,
    columnSort.keyColumn,
    columnSort.desc
  );
  return result;
});

async function getNextPage() {
  if (!paginationState.enable || paginationState.loading || paginationState.lastPage) return

  paginationState.loading = true

  const nextPage = props.pagination.getNextPage(
    paginationState.currentPage + 1, props.pagination.pageSize
  )

  await Promise.resolve(nextPage)
    .then(itensNextPage => {
      paginationState.currentPage++
      if (itensNextPage.length === 0) {
        paginationState.lastPage = true
      }
      else {
        if (props.pagination.updateData) {
          props.data.push(...itensNextPage)
        }
      }
    })
    .finally(() => {
      paginationState.loading = false
    })
}

if (props.data.length <= 0) await getNextPage()

const throttledGetNextPage = useThrottleFn(getNextPage, 1000)

function startEndVirtualized() {
  const start = Math.ceil(scrollTop.value / rowHeight.value);
  let end =
    start +
    Math.ceil(
      (scrollElement.value.getBoundingClientRect().height / rowHeight.value) *
      1.2
    );
  end = Math.max(end, 10);
  return { start, end }
}

const renderRows = computed(() => {
  if (scrollElement.value == null) return [];
  let start = Math.ceil(scrollTop.value / rowHeight.value);
  let end = sorted.value.length;
  let rows = [];

  if (props.virtualized) {
    let range = startEndVirtualized();
    start = range.start;
    end = range.end;
    rows = sorted.value.slice(start, end);
  } else {
    rows = sorted.value;
  }

  if (end >= sorted.value.length - 2) {
    throttledGetNextPage()
  }

  emits('scroll')

  return rows;
});

const useExportCSV = (nameFile?: string, options?: {
  excludeColumns?: string[];
  only?: string[];
}) => {
  let outputColumns: ColumnDefinition[] = null;
  if (options == null) {
    outputColumns = definedColumns.value;
  } else if (options.excludeColumns) {
    outputColumns = definedColumns.value.filter((item) => {
      return !options?.excludeColumns.includes(item.key);
    });
  } else if (options.only) {
    outputColumns = definedColumns.value.filter((item) => {
      return options?.only.includes(item.key);
    });
  }

  convertToCSV.exportDataToCsv(outputColumns, sorted.value, nameFile);
};

defineExpose({
  textGlobalFilter,
  columnSort,
  filtered,
  sorted,
  definedColumns,
  useExportCSV,
});

watch(textGlobalFilter, () => {
  scrollElement.value.scrollTo(0, 0);
});

watch(
  definedColumns,
  () => {
    if (props.persistConfig?.enable) {
      const newSort = definedColumns.value.map((c) => c.key);

      localStorage.setItem(props.persistConfig.key, JSON.stringify(newSort));
    }
  },
  { deep: true }
);

watch(
  () => props.columns,
  () => {
    definedColumns.value = defineColumns(props.columns, props.data[0]);
  }
);

watch(
  () => props.data,
  (current, prev) => {
    if (paginationState.enable) {
      paginationState.currentPage = 1
      paginationState.lastPage = false
      scrollElement.value.scrollTo({ top: 0, behavior: 'instant' })
    }
  }
)

onMounted(() => {
  defineRowHeight();
  readConfigCollumnsFromStorage();
});

// Ler config
let getCurrentConfig = computed(() => {
  let colorConfig = {
    background: props?.colorConfig?.background,
    font: props?.colorConfig?.font,
  };
  return { colorConfig };
});

//salva no localStorage
function saveConfig() {
  const config = getCurrentConfig;
  if (config.value.colorConfig.background != '') {
    localStorage.setItem(
      'backgroundColorConfigTable',
      config.value.colorConfig.background
    );
  }

  if (config.value.colorConfig.font != '') {
    localStorage.setItem('fontColorConfigTable', config.value.colorConfig.font);
  }
}

// ler config do localStorage
let readConfigFromStorage = computed(() => {
  saveConfig();
  let storageBackground = localStorage.getItem('backgroundColorConfigTable');
  let storageFontColor = localStorage.getItem('fontColorConfigTable');

  return { storageBackground, storageFontColor };
});

const filterIsActive = (nameColum: string) => {

  return childFilter.value?.activeFilters
    .map((item: any) => item.column.key)
    .includes(nameColum);
};

// Configura Espaçamento do ultimo item ao fim da tabela
let endSpacing = 2;
if (props.tfoot) endSpacing = 4;

</script>

<template>
  <div class="w-full h-full">
    <!-- HEADER -->
    <div class="flex justify-between">
      <slot name="header">
        <div class="font-semibold text-sm text-gray-800 flex items-center gap-1 self-center">
          {{ name }}
          <slot></slot>
        </div>
      </slot>

      <slot name="itemCenter">
      </slot>

      <div class="flex gap-2 px-3">
        <div v-if="componentFilter" class="self-center flex flex-col">
          <slot name="newsFilter"></slot>
        </div>

        <!-- SEARCH -->
        <div class="flex relative border dark:border-ms-dark-header p-0 my-0.5">
          <div v-if="componentSearch" class="inline-flex rounded-lg">
            <div class="p-auto flex">
              <UIcon name="ms:search" class="w-5 h-5" />
            </div>
            
            <input v-model.lazy="textGlobalFilter"
              class=" border-gray-300 px-1 font-semibold dark:!text-white hover:border-gray-500 text-gray-900 text-[.7rem] block w-full"
              placeholder="Faça a sua busca" />
          </div>
          <slot name="icon"> </slot>
        </div>

        <!-- EXPORT CSV -->
        <div v-if="componentExportCsv" class="self-center flex flex-col">
          <ExportCSV ref="child" :item="sorted" :defineColumns="definedColumns" :funcExportCsv="useExportCSV"
            :nameFileCsv="nameFileCsv" :columnExclude="columnExcludeCsv" />
        </div>

        <!-- COLUNAS PARCIAIS -->
        <div v-if="columnPartial?.enable">
          <div>
            <button class="border rounded-md text-white bg-green-500 p-0.5 hover:bg-green-700"
              @click="columnPartial.action">
              {{ columnPartial?.label }}
            </button>
          </div>
        </div>
      </div>

    </div>

    <!-- FILTER -->
    <MSTableFilter ref="childFilter" :data="filtered" v-model="filterColumn.filteredData"
      :current-column="filterColumn.currentColumn" :positionRef="positionFilterRef" :is-open="isOpen"
      @close="isOpen = false" />

    <!-- TABLE -->
    <div class="overflow-auto rounded-t-lg h-full w-full " ref="scrollElement"
      @scroll.prevent="props.virtualized ? scrollTop = scrollElement.scrollTop : scrollTop = 0">
      <div :style="{
        height: `${filterColumn.filteredData.length * rowHeight + rowHeight * endSpacing
          }px`,
      }">
        <div :style="{ transform: `translate3d(0px, ${scrollTop}px, 0px)` }">
          <table class="w-full">
            <!-- THEAD -->
            <slot name="thead" :changeColumnSort="changeColumnSort" :columnSort="columnSort" class="bg-red-500">
              <thead class="top-0 border-b dark:border-b-gray-500 bg-white dark:bg-[#27272A]
              dark:text-white font-bold text-xs text-[#39424B] z-10" :class="props.virtualized ? 'relative' : 'sticky'"
                :style="[
                  {
                    color: `${readConfigFromStorage.storageFontColor != ''
                      ? readConfigFromStorage.storageFontColor
                      : 'black'
                      }`,
                  },
                  {
                    background: `${readConfigFromStorage.storageBackground != ''
                      ? readConfigFromStorage.storageBackground
                      : 'white'
                      }`,
                  },
                ]">

                <tr v-if="filterHeader">
                  <slot name="filters">
                  </slot>
                </tr>

                <!-- CONFIGURAÇÂO DE COLUNAS -->
                <tr>
                  <th class="text-left">
                    <button v-show="props.defineShowColumns" @click="setIsOpen($event, 'configCollumns')"
                      class="w-5 h-8 z-[9] absolute cursor-pointer">
                      
                      <Icon icon="ms:config" class="w-5 h-5"
                        :class="[[definedColumns.some((i) => i.show == false) ? 'text-green-700 dark:text-green-400' : null],
                        [colorConfig?.font ? '!text-white' : '']]" />
                    </button>

                    <MSTableConfigCollumns :is-open="isOpenConfigCollumns" :data="definedColumns"
                      :positionRef="positionFilterRef" :current-column="filterColumn.currentColumn"
                      @close="isOpenConfigCollumns = false" />
                  </th>
                </tr>
                <!-- ////\\\\ -->
                 <tr v-if="props.theadTotalsTop">
                  <slot name="theadTotalsTop"></slot>
                </tr>

                <tr :class="loading || (paginationState.loading ?? false)
                  ? 'borda-animada dark:!bg-gradient-to-r dark:!from-white from-10% dark:!via-sky-500 via-30% dark:!to-emerald-500 to-90%'
                  : ''
                  " ref="trThs">
                  <th class="group overflow-x-clip" v-for="column in definedColumns" :key="column.key"
                    :style="{ width: column.width, minWidth: column.minWidth }" v-show="column.show">

                    <div class="flex py-2 relative justify-between items-center border-r dark:border-gray-900 overflow-hidden
                      " :style="{ width: column.width, minWidth: column.minWidth }">
                      <slot :name="`th_${column.key}`">
                        <div class="flex self-center justify-center text-center relative w-full h-full">
                          {{ column.title }}
                        </div>
                      </slot>

                      <div v-if="column.sort || column.filter" class="w-fit h-4 absolute right-0 gap-1">
                        <div class="flex">
                          <!-- Ordenar colunas -->
                          <div v-show="column.sort" class="group-hover:flex" :class="columnSort.keyColumn === column.key
                            ? 'flex'
                            : 'hidden'
                            ">
                            
                            <button @click="changeColumnSort(column.key)">
                              <Icon :icon="columnSort.keyColumn === column.key && columnSort.desc
                              ? 'ms:arrowUp'
                              : 'ms:arrowDown'
                            " 
                                class="w-4 h-4 rounded-full cursor-pointer text-black shadow-md shadow-slate-600" :class="[
                                  columnSort.keyColumn === column.key
                                    ? 'bg-ms-green800 text-white border'
                                    : 'bg-white dark:bg-white border',
                                ]"/>
                            </button>
                          </div>

                          <!-- Filtrar nas colunas -->
                          <div v-show="column.filter" class="w-4 mr-2 bg-white text-black rounded-full group-hover:flex"
                            :class="filterIsActive(column.key) ? 'flex' : 'hidden'">
                            <button @click="setIsOpen($event, 'filter', column)">
                              <Icon class="w-4 h-4" :icon="filterIsActive(column.key)
                                ? 'mdi:filter-check'
                                : 'ms:filter'
                                " />
                            </button>
                          </div>
                        </div>
                      </div>

                    </div>
                  </th>
                </tr>
                
                <tr v-if="props.theadTotals">
                  <slot name="theadTotals"></slot>
                </tr>
              </thead>
            </slot>

            <!-- TBODY -->
            <slot name="tbody" :definedColumns="definedColumns" :indexedDefinedColumns :renderRows="renderRows"
              :page="renderRows" :sortedData="sorted" :filtered="filtered">
              <tbody class="overflow-x-scroll">
                <slot name="body"></slot>

                <slot name="tr">
                  <tr class="hover:bg-slate-200 hover:dark:bg-black h-8" v-for="(row, index) in renderRows"
                    v-on="vOnTrs(row)">
                    <td v-for="column in definedColumns" :key="column.key" v-show="column.show"
                      class="text-center border-b dark:border-gray-700 px-2 overflow-hidden whitespace-nowrap"
                      :style="{ width: column.width, minWidth: column.minWidth, fontSize: props.fontSize }">
                      <slot :name="column.key" :item="row">
                        {{ column.transform(row) }}
                      </slot>
                    </td>
                  </tr>
                </slot>

              </tbody>
            </slot>

            <!--  -->
            <slot name="tfooter">
              <tfoot>
                <slot>

                </slot>
              </tfoot>
            </slot>

          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* .icon{
  @apply 
} */

.borda-animada {
  background: linear-gradient(to right, white, red),
    -webkit-linear-gradient(left, white 0, red),
    -webkit-linear-gradient(top, white, red),
    -webkit-linear-gradient(top, white, red);

  background-size: 700px 3px;
  background-repeat: no-repeat;
  background-position: 0 0;
  -webkit-animation: anima-borda 60s linear infinite;
  animation: anima-borda 2s linear infinite;
}

input:focus {
  box-shadow: 0 0 0 0;
  outline: 0;
}

@keyframes anima-borda {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: 2000px 0;
  }
}
</style>

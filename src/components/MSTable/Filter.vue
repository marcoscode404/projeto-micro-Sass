<script setup lang='ts'>
import { onClickOutside } from '@vueuse/core';
import type { ColumnDefinition, ColumnFilterType, ActiveColumnFilter } from './types';

const props = withDefaults(
  defineProps<{ data: { [key: string]: any }[], modelValue: any[], currentColumn: ColumnDefinition, positionRef: { x: number, y: number }, isOpen: boolean }>(),
  { isOpen: false }
)
const emits = defineEmits(['update:modelValue', 'close'])

function tryNumber(value: any) {
  const asNumber = Number(value)
  if (isNaN(asNumber)) return value
  else return asNumber
}

const filterTypes = ref<ColumnFilterType[]>([
  {
    name: 'contain', label: 'Contém',
    func: (dataValue: any, value: string) => dataValue.toString().toUpperCase().includes(value.trim().toUpperCase())
  },
  {
    name: 'notContain', label: 'Não Contém',
    func: (dataValue: any, value: string) => !dataValue.toString().toUpperCase().includes(value.trim().toUpperCase())
  },
  {
    name: 'equal', label: 'Igual',
    func: (dataValue: any, value: string) => dataValue == value
  },
  {
    name: 'notEqual', label: 'Diferente',
    func: (dataValue: any, value: string) => dataValue != value
  },
  {
    name: 'lessThan', label: 'Menor que',
    func: (dataValue: any, value: string) => tryNumber(dataValue) < tryNumber(value)
  },
  {
    name: 'biggerThan', label: 'Maior que',
    func: (dataValue: any, value: string) => tryNumber(dataValue) > tryNumber(value)
  }
])

const activeFilters = ref<ActiveColumnFilter[]>([])
const selectedFilter = reactive({ type: filterTypes.value[0], value: '' })

function apply() {
  if (selectedFilter.value.length <= 0) return
  const newFilter = { column: props.currentColumn, ...selectedFilter }
  const index = activeFilters.value.findIndex((i) => {
    return (
      i.column.key === newFilter.column.key
      && i.type.name === newFilter.type.name
      && i.value === newFilter.value
    )
  })

  if (index == -1) {
    activeFilters.value.push({ column: props.currentColumn, ...selectedFilter })
  }

  selectedFilter.value = ''
}

function removeFilter(filter: ActiveColumnFilter) {
  const index = activeFilters.value.indexOf(filter)
  activeFilters.value.splice(index, 1)
}

defineExpose({
  activeFilters,
})


watchEffect(() => {
  let filtered = props.data

  if (activeFilters.value.length > 0) {
    filtered = props.data.filter((item) => {
      for (let filter of activeFilters.value) {
        const dataValue = filter.column.transform(item)
        const result = filter.type.func(dataValue, filter.value)
        if (!result) return false
      }
      return true
    })
  }
  emits('update:modelValue', filtered)
})

const container = ref<HTMLElement>()

async function definePosition() {
  const bounder = container.value.getBoundingClientRect()

  let x = props.positionRef.x - (bounder.width / 2)
  let y = props.positionRef.y + 10
  const maxX = window.innerWidth - bounder.width - 10
  const maxY = window.innerHeight - bounder.height - 10

  if (x < 0) { x = 10 }
  else { x = Math.min(x, maxX) }

  if (y < 0) { y = 10 }
  else { y = Math.min(y, maxY) }

  container.value.style.left = `${x}px`;
  container.value.style.top = `${y}px`;
}

watch(
  props.positionRef,
  () => {
    nextTick(() => {
      definePosition()
    })
  }
)

onClickOutside(container, () => {
  emits('close')
})

</script>

<template>
  <Teleport to="body" class="dark:!bg-red-500">
    <div ref="container" v-show="props.isOpen" class="!z-[99999999999] absolute top-16 m-1 font-medium 
        bg-neutral-100 dark:bg-[#27272A] border-2 dark:border dark:border-gray-500 overflow-hidden rounded-lg  text-sm
        bg-gradient-to-r from-gray-50 from-10% via-gray-200 via-50% to-gray-50 to-90%">
      <div class="flex flex-col w-[30rem] dark:!bg-[#27272A] p-2" v-if="props.isOpen">
        <h3 class="text-center font-semibold mb-3">{{ props.currentColumn?.title }}</h3>
        <UInput class="relative" :loading="false" trailing v-model="selectedFilter.value" @keypress.enter="apply">
          <!-- <GlobalIcon class="absolute top-0 right-0 text-gray-400 w-6" name="ic:outline-search" /> -->
        </UInput>

        <div class="flex flex-wrap mt-2 gap-3 max-w-md">
          <template v-for="filterType in filterTypes">
            <div>
              <input :id="`filterType-${filterType.name}`" type="radio" :value="filterType"
                v-model="selectedFilter.type">
              <label :for="`filterType-${filterType.name}`" class="ml-1">{{ filterType.label }}</label>
            </div>
          </template>
        </div>

        <button @click="apply"
          class="ml-2 py-1 px-2 w-20 self-end bg-green-500 hover:bg-green-600 text-white shadow-md rounded-md active:bg-green-700">Aplicar</button>

        <div class="border-t-2 mt-2 border-black dark:border-gray-500 text-left">
          <h3 class="font-medium text-lg mb-2">Filtros ativos</h3>
          <div class="w-full">
            <table class="w-full">
              <thead class="sticky top-0 border-b-2 dark:border-gray-500">
                <tr class="text-center">
                  <th>Coluna</th>
                  <th>Tipo</th>
                  <th>Valor</th>
                  <th>
                    <button class="text-red-500 rounded-full" @click="activeFilters = []">
                      <svg width="35" height="20" viewBox="0 0 24 24">
                        <path fill="currentColor"
                          d="M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12L20 6.91Z" />
                      </svg>
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="hover:bg-slate-300 hover:dark:bg-black h-10 text-center" v-for="filter in activeFilters">
                  <td>{{ filter.column.title }}</td>
                  <td>{{ filter.type.label }}</td>
                  <td>{{ filter.value }}</td>
                  <td>
                    <button class="text-red-500 rounded-full" @click="removeFilter(filter)">
                      <svg width="20" height="20" viewBox="0 0 24 24">
                        <path fill="currentColor"
                          d="M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12L20 6.91Z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

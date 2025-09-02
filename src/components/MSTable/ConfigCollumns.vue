<script setup lang='ts'>
import { onClickOutside } from '@vueuse/core';
import { ColumnDefinition, ColumnFilterType, ActiveColumnFilter } from './types';

const props = withDefaults(
  defineProps<{ data: { [key: string]: any }[], modelValue?: any[], currentColumn: ColumnDefinition, 
    positionRef: { x: number, y: number }, isOpen: boolean }>(),
  { isOpen: false }
)
const emits = defineEmits(['update:modelValue', 'close'])

const activeFilters = ref<ActiveColumnFilter[]>([])

defineExpose({ activeFilters })

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

function configShowColumnsFilter(showAllOrHideAll: string) {
  props.data.forEach((item) => {
    if (showAllOrHideAll === 'hideAll') item.show = false;
    else item.show = true;
  })
}

</script>

<template>
  <Teleport to="body" class="dark:!bg-red-500">
    <div ref="container" v-show="props.isOpen" class="!z-[99999999999] absolute top-16 m-1 font-medium 
        bg-neutral-100  border-2 dark:border dark:border-gray-500 overflow-hidden rounded-lg  text-sm
        bg-gradient-to-r from-gray-50 from-10% via-gray-200 via-50% to-gray-50 to-90%">
      <div class="flex flex-col p-2 dark:!bg-ms-jet-black" v-if="props.isOpen">
        <div class="h-[40vh] overflow-y-auto my-3 w-72 text-black font-normal p-2 dark:!bg-ms-jet-black">
          <div class="text-gray-900 font-semibold dark:text-white flex items-center gap-2 text-sm py-0.5 cursor-pointer"
            v-for="column in props.data">
            <USwitch size="xs" v-model="column.show" :class="{'dark:bg-msSkay400' : column.show}"/>
            <button @click="column.show = !column.show">{{ column.title }}</button>
          </div>

          <div class="flex text-msRed600 font-semibold dark:text-white justify-between mt-5 text-sm">
            <button class="hover:underline" @click="configShowColumnsFilter('hideAll')">Ocultar
              Todos</button>
            <button class="hover:underline" @click="configShowColumnsFilter('showAll')">Mostrar
              todos</button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

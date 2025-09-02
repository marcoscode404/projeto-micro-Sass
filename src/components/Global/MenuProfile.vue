<script setup lang="ts">
import { useMemory, useOnline } from '@vueuse/core';
import { useLogout } from '~/composables/auth';
import { useWindowSize, useFps } from '@vueuse/core'

const fps = useFps()
const userInfo = await getUserInfo();
const { isSupported, memory } = useMemory();
const props = defineProps<{ styleProps?: string, showName?: boolean, showIcon?: boolean }>();

const online = useOnline();

const clazz = computed(() => online.value ? 'text-green-700 font-bold dark:text-green-500' : 'text-gray');
const text = computed(() => online.value ? 'Online' : 'Offline');

const items: any = [
  [{
    slot: 'metrics',
  },
  {
    label: 'Sair',
    slot: 'logout',
    icon: 'i-heroicons-pencil-square-20-solid',
    onSelect: () => {
      useLogout()
    }
  }],
]

function size(v: number) {
  const kb = v / 1024 / 1024
  return `${kb.toFixed(2)} MB`
}

// DIMENSÃO DA TELA
const { width, height } = useWindowSize();

</script>

<template>
  <UDropdownMenu :items="items" :content="{
    align: 'end',
    side: 'bottom',
    sideOffset: 8
  }" :ui="{
    content: 'w-full px-4 dark:bg-ms-jet-black',
  }" :popper="{ placement: 'bottom-start', arrow: true }">

    <div class="flex items-center gap-2 cursor-pointer">
      <UTooltip :text="userInfo?.full_name" :ui="{ content: 'dark:bg-black font-semibold' }">
        <button class="rounded-full h-7 w-7  
       dark:border-white dark:font-medium" :class="props.styleProps">
          {{ userInfo?.first_name?.split('')[0] }}
          <!-- <GlobalIcon v-if="!userInfo?.first_name" class="w-full h-6 flex justify-center items-center"
            name="material-symbols:person-rounded" /> -->
        </button>
      </UTooltip>

      <p class="text-sm font-semibold" v-if="props.showName">{{ userInfo?.first_name?.split(' ')[0] }}</p>

      <Icon name="ms:angleDown" class="w-6 h-6" />
    </div>

    <template #metrics-trailing>
      <div class="text-center  w-full font-semibold">
        <div class="text-base bg-slate-100 dark:bg-ms-green600 rounded-md dark:text-white text-gray-800 font-semibold select-none">
          {{ userInfo?.first_name }}
        </div>

        <div class="my-2 ">
          <!-- <GlobalIcon name="material-symbols:memory-outline"
            class="m-auto text-green-700 w-7 h-7 dark:text-green-500" /> -->

          <div class="font-bold flex items-center justify-center gap-1">
            Status:
            <div class="h-2.5 w-2.5 rounded-full" :class="text == 'Online' ? 'bg-green-500' : 'bg-red-500'"></div>
            <b :class="clazz">{{ text }}</b>
            FPS:
            <div>{{ fps }}</div>
          </div>
        </div>

        <div v-if="isSupported && memory"
          class="inline-grid grid-cols-2 gap-x-4 gap-y-2 dark:text-white  text-black font-semibold">
          <template v-if="memory">
            <div opacity="50">
              Em uso
            </div>
            <div>{{ size(memory.usedJSHeapSize) }}</div>
            <div opacity="50">
              Alocado
            </div>
            <div>{{ size(memory.totalJSHeapSize) }}</div>
            <div opacity="50">
              Limite
            </div>
            <div>{{ size(memory.jsHeapSizeLimit) }}</div>
          </template>
        </div>

        <div class="font-bold text-red-600 dark:text-white mt-4">Largura: {{ width }} X Altura: {{ height }}</div>

        <div class="mt-3">Versão 1.0.0</div>

      </div>
    </template>

    <template #logout="{ item }">
      <div class="text-white dark:text-red-500 flex bg-ms-red500 dark:bg-white 
        items-center cursor-pointer  rounded-sm py-0.5 justify-center w-full font-semibold">
        <Icon name="ms:logout" class="h-5 w-6 text-white dark:text-red-500" />
        {{ item.label }}
      </div>
    </template>
  </UDropdownMenu>
</template>

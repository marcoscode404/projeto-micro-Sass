<script lang="ts" setup>
import { listIcons } from '@iconify/vue';
import { useClipboard } from '@vueuse/core';

const source = ref();
const { text, copy, copied } = useClipboard({ source })

</script>

<template>
  <UModal close-icon="ms:closeLg" :transition="false"
    :ui="{ content: 'max-w-[50rem] w-full dark:bg-ms-dark-bg-secondary', overlay: 'bg-black/70'}"  
    :close="{ class: 'dark:text-white cursor-pointer hover:bg-transparent' }"
    title="Desenvolvimento">
    <UButton variant="link" class="text-white cursor-pointer hover:text-white">
      <Icon name="ms:devs" class="w-5 h-5"/>
    </UButton>

    <template #body>
      <UInput v-model="text" class="w-full" name="search" placeholder="Pesquisar..." color="neutral" autocomplete="off"
        :ui="{ base: 'dark:!bg-ms-dark-grey focus:!outline-4 focus:!outline-offset-2 focus:!outline-violet-500' }" >
        <template #trailing>
          <UButton v-if="text !== ''" color="neutral" variant="link" icon="ms:closeLg" size="xs" class="w-5"
            @click="text = ''" />
        </template>
      </UInput>

      <div class="overflow-y-auto overflow-x-hidden  h-[20rem] mt-6">
        <UButton :label="copied ? 'Copiado' : ''" variant="link" color="info" class="absolute bottom-0 right-3" />

        <div class="grid grid-cols-5 gap-10 whitespace-normal">
          <div v-for="(icon, index) in listIcons()" :key="index">
            <button @click="copy(icon)" 
              class="cursor-pointer flex text-sm whitespace-nowrap">
              <Icon :name="icon" class="size-6 text-blue-700 dark:text-white" />
              {{ icon.slice(0, 15) }}
            </button>
          </div>

        </div>
      </div>
    </template>
  </UModal>
</template>
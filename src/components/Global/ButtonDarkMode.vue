<script lang="ts" setup>
import { useMagicKeys } from '@vueuse/core';

const props: any = withDefaults(defineProps<{
  type?: false
}>(), {})

// DARK MODE
const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})

// TECLA DE ATALHO 
const keys = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.ctrlKey && e.key === 'q' || e.ctrlKey && e.key === 'Q' && e.type === 'keydown')
      e.preventDefault()
  },
});
const CtrlQ = keys['Ctrl+q'];

watch(CtrlQ, (v) => {
  if (v) isDark.value = !isDark.value
});

</script>

<template>
  <div class="flex">
    <ClientOnly v-if="!props.type">
      <USwitch @click="isDark = !isDark"   :ui="{ root: 'text-red-500' }"/>
    </ClientOnly>

    <ClientOnly v-else>
      <UButton :icon="isDark ? 'ms:moon' : 'ms:sun'"  variant="link"
        aria-label="Theme" @click="isDark = !isDark" 
        class="text-white cursor-pointer hover:text-white"/>

      <template #fallback>
        <div class="w-8 h-8" />
      </template>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { useMagicKeys } from '@vueuse/core';
import { useMyGlobalStore } from '~/store/GlobalStore/global';
import type { InterfaceModuleApps } from '~/store/GlobalStore/types';
const { state, actions } = useMyGlobalStore();

const props = defineProps<{
  styleProps?: string, nameTooltip?: string, colorIcon?: string, styleModules?: string,
  styleSvg?: string
}>();

const config = useRuntimeConfig();

// TECLAS DE ATALHO
const open = ref(false);

const keys = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.ctrlKey && e.key === 'u' || e.ctrlKey && e.key === 'U' && e.type === 'keydown')
      e.preventDefault()
  },
});
const CtrlU = keys['Ctrl+u'];

watch(CtrlU, (v) => {
  if (v) open.value = !open.value
});
//

onMounted(() => { actions.getModuleApps() });

const searchModule = ref("");

// APENAS OS MODULOS FAVORITOS
const moduleFavorite = computed(() => {
  if (searchModule.value) {
    return state.moduleApps.filter((item: InterfaceModuleApps) => {
      if (item.favorite) {
        let modulesUpperCase = item?.name?.toUpperCase();
        let filtered = modulesUpperCase?.includes(searchModule.value.toUpperCase());
        return filtered;
      }
    })
  }

  return state.moduleApps.filter((item) => {
    if (item.favorite) return item;
  })
});

// NÃO FAVORITOS
const modules = computed(() => {
  if (searchModule.value) {
    return state.moduleApps.filter((item) => {
      if (!item.favorite) {
        let concatValues = item?.name?.toUpperCase();
        let filtered = concatValues?.includes(searchModule.value.toUpperCase());
        return filtered;
      }
    })
  }

  return state.moduleApps.filter((item) => {
    if (!item.favorite) return item;
  })
});

function handleClickLinkExternal(module: any) {
  if (module.name == 'Remanejo') return window.open(`/gerar_remanejo/historico`, '_blank')
  if (module.name == 'Módulos') return window.open(`${config.public.appsURL}/admin/modulos`, '_blank')
  return window.open(`${module.link}`, '_blank')
};

</script>

<template>
  <UPopover>
    <UTooltip text="Navegar Apps | Ctrl + U" :ui="{ content: 'dark:bg-black font-semibold' }">
      <UButton variant="link" 
        class="text-white flex items-center hover:text-white cursor-pointer" icon="ms:apps">
      </UButton>
    </UTooltip>

    <template #content>
      <!-- Content -->
      <div
        class="lg:w-[25rem] w-80 flex h-[27rem] bg-gradient-to-r dark:from-ms-brown dark:to-ms-dark-grey from-slate-100 to-slate-300 "
        :class="props.styleProps">
        <!-- INPUT -->
        <div class="dark:bg-ms-dark-grey bg-white h-11 w-full fixed z-20">
          <UInput placeholder="Buscar Modulo..." color="neutral" autocomplete="off"
              v-model="searchModule"
              class="fixed w-full px-2 z-20 mt-1"
              :ui="{ base: 'dark:!bg-ms-dark-grey focus:!outline-4 focus:!outline-offset-2 focus:!outline-violet-500' }"
              icon="ms:search">
              <template #trailing>
                <UButton color="neutral" variant="link" @click="searchModule = ''"
                icon="ms:closeLg" size="xs" class="w-5"
                :padded="false" />
            </template>
          </UInput>
        </div>

        <div class="p-1 w-full h-full overflow-x-hidden overflow-y-auto rounded-lg relative">
          <div class="rounded-md px-1 py-5 grid relative gap-x-2 gap-y-4 grid-cols-4  mb-1 mt-8">
            <button v-for="module in moduleFavorite" 
              class="cursor-pointer flex flex-col items-center z-10 dark:bg-ms-dark-bg-secondary bg-slate-100
              rounded-md border hover:border-black lg:py-2 py-0.5 gap-2 border-gray-500 dark:border-gray-400
              transition ease-in-out delay-0 hover:-translate-y-1 hover:dark:border-gray-100 hover:scale-110 duration-100
              " @click="handleClickLinkExternal(module)">
              <svg class="bg-slate-200 w-7 h-7 rounded-full p-0.5">
                <path :d="`${module.icon}`"></path>
              </svg>
              <p class="lg:text-sm text-xs">{{ module?.name?.slice(0, 8) }}</p>
            </button>

            <div class="absolute  blur-3xl h-full w-full"></div>
          </div>

          <div class="mt-1 rounded-md px-1 py-5 grid gap-x-2 gap-y-4  grid-cols-4
           dark:bg-ms-dark-bg-secondary bg-slate-300 border border-gray-500">
            <button v-for="module in modules" 
              class="flex flex-col items-center bg-slate-100 cursor-pointer dark:bg-ms-dark-grey
              rounded-md lg:py-2 py-0.5 gap-2 border border-gray-600 hover:border-black hover:dark:border-white
              transition ease-in-out delay-0 hover:-translate-y-0.5 hover:scale-105 duration-100
              " :class="props.styleModules" @click="handleClickLinkExternal(module)">
              <svg class="h-6 dark:bg-blue-100 bg-gray-300 w-6 rounded-full" :class="props.styleSvg">
                <path :d="`${module.icon}`"></path>
              </svg>
              <p class="lg:text-sm text-xs">
                {{ module?.name?.slice(0, 8) }}
              </p>
            </button>

            <div v-if="!modules.length" class="whitespace-normal">
              Não encontrado
            </div>
          </div>
        </div>
      </div>
    </template>
  </UPopover>
</template>

<style scoped>
::-webkit-scrollbar {
  height: 4px;
  width: 5px;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.616);
  background: white !important;
  width: 5px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: gray !important;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: black !important;
}
</style>
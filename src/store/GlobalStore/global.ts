import { defineStore } from "pinia";
import type { InterfaceModuleApps } from "./types";

export const useMyGlobalStore = defineStore("myGlobalStore", () => {
  const { $api, $toast } = useNuxtApp();
  const toast = useToast()

  const state = reactive({
    // MODULOS APPS
    moduleApps: [] as InterfaceModuleApps[],
  });

  const getters = {};

  const actions = { 
    async getModuleApps() {
      await $api.get('/auth/apps/get_user_apps').then(({ data }) => {
        state.moduleApps = data;
      })
      .catch((error) => {
        $toast.error(getApiError(error));
      })
    },
  };

  return { state, actions, getters };
})
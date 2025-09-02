import Vue3Toastify, { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Vue3Toastify, { 
    autoClose:2000,
    position: toast.POSITION.BOTTOM_RIGHT,
  });

  return {
    provide: {
      toast,
    },
  };


  // Definição do tipo para as opções do toast
  // type ToastOptions = Record<string, any>;

   // Definição do tipo que inclui os métodos auxiliares do `toast`
  //  type ToastFunction = ((message: string, options?: ToastOptions) => void) & {
  //   success: (message: string, options?: ToastOptions) => void;
  //   error: (message: string, options?: ToastOptions) => void;
  //   info: (message: string, options?: ToastOptions) => void;
  //   warn: (message: string, options?: ToastOptions) => void;
  //   loading: (message: string, options?: ToastOptions) => void;
  //   // done: (message: string, options?: ToastOptions) => void;
  //   update: (message: string, options?: ToastOptions) => void;
  // };

  // const showToast: ToastFunction = (message, options = {}) => {
  //   const autoClose = options.autoClose ?? (message.length > 50 ? 7000 : 2000);
  //   toast(message, { ...options, autoClose });
  // };

  // Adicionando os métodos auxiliares do `toast` com tipagem correta
  // showToast.success = (message, options = {}) => {
  //   const autoClose = options.autoClose ?? (message.length > 50 ? 7000 : 2000);
  //   toast.success(message, { ...options, autoClose });
  // };

  // showToast.error = (message, options = {}) => {
  //   const autoClose = options.autoClose ?? (message.length > 50 ? 7000 : 2000);
  //   toast.error(message, { ...options, autoClose });
  // };

  // showToast.info = (message, options = {}) => {
  //   const autoClose = options.autoClose ?? (message.length > 50 ? 7000 : 2000);
  //   toast.info(message, { ...options, autoClose });
  // };

  // showToast.warn = (message, options = {}) => {
  //   const autoClose = options.autoClose ?? (message.length > 50 ? 7000 : 2000);
  //   toast.warn(message, { ...options, autoClose });
  // };

  // showToast.loading = (message, options = {}) => {
  //   const autoClose = options.autoClose ?? (message.length > 50 ? 7000 : 2000);
  //   toast.loading(message, { ...options, autoClose });
  // };

  // showToast.done = (message, options = {}) => {
  //   const autoClose = options.autoClose ?? (message.length > 50 ? 7000 : 2000);
  //   toast.done(message, { ...options, autoClose });
  // };

  // showToast.update = (message, options = {}) => {
  //   const autoClose = options.autoClose ?? (message.length > 50 ? 7000 : 2000);
  //   toast.update(message, { ...options, autoClose });
  // };

  // return {
  //   provide: {
  //     toast: showToast,
  //   },
  // };
});

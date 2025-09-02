// import createAPI from './api';
import axios from 'axios';
import moment from "moment";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const api = axios.create({
    baseURL: config.public.baseURL,
    withCredentials: true,
  });
  api.interceptors.request.use((config: any) => {
    if (useRouter().currentRoute.value.fullPath != "/login") {
      // const cookie = useMSCookie();
      // let timeExpires = useDecodeJwt.asTimeExpiredToken(cookie.value);
      
      let currentDateAndTime = null;
      let expirationDate = null;
      
      // if (timeExpires != undefined) {
      //   expirationDate = moment.unix(timeExpires).format("YYYY/MM/DD HH:mm:ss");
      //   currentDateAndTime = moment().format("YYYY/MM/DD HH:mm:ss");
        
      //   // SE TOKEN EXPIRADO
      //   if (currentDateAndTime > expirationDate) {
      //     // useLogout();
      //     return;
      //   }
      // }

      // if (useMSCookie().value === undefined) {
      //   navigateTo("/login");
      //   return;
      // }
    }
    return config;
  });
  return {
    provide: {
      api,
    },
  };
});

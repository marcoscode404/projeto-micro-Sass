import { useJwt } from '@vueuse/integrations/useJwt'

export default {
  asTimeExpiredToken(jwt:string) {
    const encodedJwt = ref(jwt)
    const { payload } = useJwt(encodedJwt)
    return payload.value.exp
  },

  asLoggedInState(jwt?: string) {
    const encodedJwt = ref(jwt)
    const { payload } = useJwt(encodedJwt)
    
    return payload.value
  }
}

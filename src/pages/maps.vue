<script setup lang="ts">
import { onMounted } from "vue"
import "leaflet/dist/leaflet.css"
import * as L from "leaflet"
const { $api, $toast } = useNuxtApp();

let dataApiGoogle = ref({})

onMounted(async() => {
  await $api.get("https://api-rene.modenaesilva.com.br/api_compras/store_maps", {
    headers: {
      accept: "application/json"
    }
  }).then((response) => {
    dataApiGoogle.value = response.data
    console.log(dataApiGoogle.value)
  }).catch((error) => {
    $toast.error("Erro ao carregar os dados da API")
    console.error("Erro ao carregar os dados da API:", error)
  })
})

onMounted(() => {
  const map = L.map("map").setView([-8.763545159721895, -63.89342658620827], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap"
  }).addTo(map)

  const lojas: Array<{ nome: string; coords: [number, number] }> = [
    { nome: "CD PVH", coords: [-8.77876618510591, -63.86936698360354] },
    { nome: "PVH1", coords: [-8.750639564645155, -63.887505806101565] },
    { nome: "PVH 10", coords: [-8.755407991400785, -63.8869211612538] },
    { nome: "Não sei", coords: [-8.76281691761415, -63.88529722234486] }
  ]

  lojas?.forEach(loja => {
    L.marker(loja.coords).addTo(map).bindPopup(`<b>${loja.nome}</b>`)
  })
})

</script>

<template>
  <div id="map"></div>
</template>

<style scoped>
#map {
  display: flex;
  height: 100vh;
  width: 100%;
}
</style>

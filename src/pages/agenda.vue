<script setup lang="ts">

// horários fixos
const hours = [
  "08:00","09:00","10:00","11:00","12:00",
  "13:00","14:00","15:00","16:00","17:00",
  "18:00","19:00","20:00","21:00","22:00"
]

// dias fixos (pode vir de API depois)
const days = [
  { name: "SEG", date: 25 },
  { name: "TER", date: 26 },
  { name: "QUA", date: 27 },
  { name: "QUI", date: 28 },
  { name: "SEX", date: 29 },
  { name: "SAB", date: 30 },
  { name: "DOM", date: 31 }
]

</script>

<template>
  <main class="flex-1 p-4 md:p-8">
    <div class="max-w-full mx-auto">
      <!-- Cabeçalho da Agenda -->
      <div class="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
        <div>
          <h2 class="text-3xl font-bold text-gray-800">Agenda</h2>
          <p class="text-gray-500">Visualize e gerencie os horários da sua quadra.</p>
        </div>
        <div class="flex items-center gap-4">
          <div class="flex items-center border rounded-lg">
            <button class="p-2 hover:bg-gray-100 rounded-l-lg">
              <i data-lucide="chevron-left"></i>
            </button>
            <span class="px-4 py-2 text-sm font-semibold text-gray-700">25 - 31 Ago, 2025</span>
            <button class="p-2 hover:bg-gray-100 rounded-r-lg">
              <i data-lucide="chevron-right"></i>
            </button>
          </div>
          <button
            class="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 flex items-center transition-colors"
          >
            <i data-lucide="plus" class="w-5 h-5 mr-2"></i>
            Agendar Horário
          </button>
        </div>
      </div>

      <!-- Visualização da Agenda Semanal -->
      <div class="bg-white rounded-xl shadow-md overflow-hidden">
        <div class="overflow-x-auto calendar-scroll">
          <div class="grid grid-cols-8 min-w-[1200px]">
            <!-- Coluna de Horas -->
            <div class="col-span-1 border-r border-gray-200">
              <div class="h-16"></div>
              <div class="grid grid-rows-15">
                <div
                  v-for="hour in hours"
                  :key="hour"
                  class="h-20 text-right pr-2 pt-1 text-sm text-gray-400 border-t border-gray-200"
                >
                  {{ hour }}
                </div>
              </div>
            </div>

            <!-- Colunas dos Dias da Semana -->
            <div class="col-span-7 grid grid-cols-7">
              <div
                v-for="(day, i) in days"
                :key="i"
                class="text-center p-4 border-b border-r border-gray-200"
              >
                <span class="font-semibold">{{ day.name }}</span>
                <span class="text-gray-500"> {{ day.date }}</span>
              </div>

              <!-- Conteúdo com reservas -->
              <div class="border-r border-gray-200 relative">
                <div
                  class="absolute top-[480px] left-2 right-2 h-[160px] bg-green-100 border-l-4 border-green-500 rounded-lg p-2 cursor-pointer hover:opacity-90"
                >
                  <p class="text-sm font-semibold text-green-800">
                    Futebol - Turma do Bairro
                  </p>
                  <p class="text-xs text-green-700">18:00 - 20:00</p>
                  <p class="text-xs text-green-600 mt-1">
                    <i data-lucide="users" class="w-3 h-3 inline-block"></i>
                    Mensalista
                  </p>
                </div>
              </div>

              <div class="border-r border-gray-200 relative">
                <div
                  class="absolute top-[400px] left-2 right-2 h-[80px] bg-blue-100 border-l-4 border-blue-500 rounded-lg p-2 cursor-pointer hover:opacity-90"
                >
                  <p class="text-sm font-semibold text-blue-800">
                    Beach Tennis - Ana e Carla
                  </p>
                  <p class="text-xs text-blue-700">17:00 - 18:00</p>
                </div>
              </div>

              <div class="border-r border-gray-200 relative">
                <div
                  class="absolute top-[560px] left-2 right-2 h-[80px] bg-yellow-100 border-l-4 border-yellow-500 rounded-lg p-2 cursor-pointer hover:opacity-90"
                >
                  <p class="text-sm font-semibold text-yellow-800">
                    Vôlei - Equipe Amigos
                  </p>
                  <p class="text-xs text-yellow-700">19:00 - 20:00</p>
                  <p class="text-xs text-yellow-600 mt-1">
                    <i data-lucide="alert-circle" class="w-3 h-3 inline-block"></i>
                    Pendente
                  </p>
                </div>
              </div>

              <div class="border-r border-gray-200 relative"></div>

              <div class="border-r border-gray-200 relative">
                <div
                  class="absolute top-[480px] left-2 right-2 h-[160px] bg-green-100 border-l-4 border-green-500 rounded-lg p-2 cursor-pointer hover:opacity-90"
                >
                  <p class="text-sm font-semibold text-green-800">
                    Futebol - Empresa XYZ
                  </p>
                  <p class="text-xs text-green-700">18:00 - 20:00</p>
                  <p class="text-xs text-green-600 mt-1">
                    <i data-lucide="users" class="w-3 h-3 inline-block"></i>
                    Mensalista
                  </p>
                </div>
              </div>

              <div class="border-r border-gray-200 relative">
                <div
                  class="absolute top-[160px] left-2 right-2 h-[240px] bg-purple-100 border-l-4 border-purple-500 rounded-lg p-2 cursor-pointer hover:opacity-90"
                >
                  <p class="text-sm font-semibold text-purple-800">
                    Aniversário - Lucas
                  </p>
                  <p class="text-xs text-purple-700">10:00 - 13:00</p>
                  <p class="text-xs text-purple-600 mt-1">
                    <i data-lucide="party-popper" class="w-3 h-3 inline-block"></i>
                    Evento
                  </p>
                </div>
              </div>

              <div class="relative"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
/* Scroll horizontal para calendário */
.calendar-scroll::-webkit-scrollbar {
  height: 8px;
}
.calendar-scroll::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}
.calendar-scroll::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 10px;
}
.calendar-scroll::-webkit-scrollbar-thumb:hover {
  background: #aaa;
}
</style>

<script setup lang="ts">

</script>

<template>
  <main class="h-[calc(100vh-7rem)] flex-1 p-4 md:p-8 bg-gray-100">
    <div class="max-w-7xl mx-auto">
      <!-- Cabeçalho e Filtros -->
      <div class="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
        <div>
          <h2 class="text-3xl font-bold text-gray-800">Relatório Financeiro</h2>
          <p class="text-gray-500">Acompanhe os resultados do seu negócio.</p>
        </div>
        <div class="flex items-center gap-2">
          <select
            class="border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 px-3 py-2"
          >
            <option>Mês Atual</option>
            <option>Este Ano</option>
            <option>Hoje</option>
            <option>Últimos 30 dias</option>
          </select>
          <button
            class="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 flex items-center transition-colors"
          >
            <i data-lucide="download" class="w-5 h-5 mr-2"></i>
            Exportar
          </button>
        </div>
      </div>

      <!-- Cards de Resumo (KPIs) -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div class="bg-white p-6 rounded-xl shadow">
          <div class="flex justify-between items-start">
            <h3 class="text-lg font-semibold text-gray-600">Ganhos Totais (Mês)</h3>
            <span class="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <i data-lucide="dollar-sign"></i>
            </span>
          </div>
          <p class="text-3xl font-bold text-gray-800 mt-2">R$ 12.450,70</p>
          <p class="text-sm text-green-500 flex items-center mt-1">
            <i data-lucide="arrow-up" class="w-4 h-4 mr-1"></i>
            15% vs. mês anterior
          </p>
        </div>

        <div class="bg-white p-6 rounded-xl shadow">
          <div class="flex justify-between items-start">
            <h3 class="text-lg font-semibold text-gray-600">Lucro das Quadras</h3>
            <span class="p-2 bg-green-100 text-green-600 rounded-lg">
              <i data-lucide="swords"></i>
            </span>
          </div>
          <p class="text-3xl font-bold text-gray-800 mt-2">R$ 9.800,00</p>
          <p class="text-sm text-gray-500 mt-1">78.7% do total</p>
        </div>

        <div class="bg-white p-6 rounded-xl shadow">
          <div class="flex justify-between items-start">
            <h3 class="text-lg font-semibold text-gray-600">Vendas do PDV</h3>
            <span class="p-2 bg-orange-100 text-orange-600 rounded-lg">
              <i data-lucide="shopping-cart"></i>
            </span>
          </div>
          <p class="text-3xl font-bold text-gray-800 mt-2">R$ 2.650,70</p>
          <p class="text-sm text-gray-500 mt-1">21.3% do total</p>
        </div>
      </div>

      <!-- Seção de Gráficos e Clientes -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Gráfico de Faturamento Anual -->
        <div class="lg:col-span-2 bg-white p-6 rounded-xl shadow">
          <h3 class="text-xl font-semibold text-gray-800 mb-4">Faturamento Anual</h3>
          <div class="h-80 flex items-center justify-center text-gray-400">
            <i data-lucide="bar-chart-big" class="w-24 h-24"></i>
            <p class="ml-4">Área do gráfico de faturamento</p>
          </div>
        </div>

        <!-- Top Clientes -->
        <div class="bg-white p-6 rounded-xl shadow">
          <h3 class="text-xl font-semibold text-gray-800 mb-4">Top Clientes do Mês</h3>
          <ul class="space-y-4">
            <li class="flex items-center">
              <img
                src="https://placehold.co/40x40/E2E8F0/4A5568?text=CS"
                class="w-10 h-10 rounded-full mr-3"
              />
              <div class="flex-1">
                <p class="font-semibold text-gray-800">Carlos Silva</p>
                <p class="text-sm text-gray-500">8 agendamentos</p>
              </div>
              <p class="font-bold text-green-600">R$ 960,00</p>
            </li>

            <li class="flex items-center">
              <img
                src="https://placehold.co/40x40/E2E8F0/4A5568?text=BP"
                class="w-10 h-10 rounded-full mr-3"
              />
              <div class="flex-1">
                <p class="font-semibold text-gray-800">Bruno Pereira</p>
                <p class="text-sm text-gray-500">6 agendamentos</p>
              </div>
              <p class="font-bold text-green-600">R$ 780,00</p>
            </li>

            <li class="flex items-center">
              <img
                src="https://placehold.co/40x40/E2E8F0/4A5568?text=AS"
                class="w-10 h-10 rounded-full mr-3"
              />
              <div class="flex-1">
                <p class="font-semibold text-gray-800">Ana Souza</p>
                <p class="text-sm text-gray-500">5 agendamentos</p>
              </div>
              <p class="font-bold text-green-600">R$ 600,00</p>
            </li>

            <li class="flex items-center">
              <img
                src="https://placehold.co/40x40/E2E8F0/4A5568?text=RM"
                class="w-10 h-10 rounded-full mr-3"
              />
              <div class="flex-1">
                <p class="font-semibold text-gray-800">Ricardo Mendes</p>
                <p class="text-sm text-gray-500">4 agendamentos</p>
              </div>
              <p class="font-bold text-green-600">R$ 480,00</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </main>
</template>

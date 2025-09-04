<script setup lang="ts">

</script>

<template>
  <main class="flex-1 p-4 md:p-8">
    <div class="max-w-7xl mx-auto">
      <!-- Título e botão -->
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-3xl font-bold text-gray-800">Dashboard</h2>
        <button
          class="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 flex items-center transition-colors"
        >
          <i data-lucide="plus" class="w-5 h-5 mr-2"></i>
          Nova Reserva
        </button>
      </div>

      <!-- Cards de Resumo -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white p-6 rounded-xl shadow flex items-center">
          <div class="bg-blue-100 p-3 rounded-full mr-4">
            <i data-lucide="calendar-check" class="w-8 h-8 text-blue-600"></i>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Reservas Hoje</p>
            <p class="text-2xl font-bold text-gray-800">8</p>
          </div>
        </div>
        <div class="bg-white p-6 rounded-xl shadow flex items-center">
          <div class="bg-green-100 p-3 rounded-full mr-4">
            <i data-lucide="dollar-sign" class="w-8 h-8 text-green-600"></i>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Faturamento do Dia</p>
            <p class="text-2xl font-bold text-gray-800">R$ 1.250,00</p>
          </div>
        </div>
        <div class="bg-white p-6 rounded-xl shadow flex items-center">
          <div class="bg-yellow-100 p-3 rounded-full mr-4">
            <i data-lucide="clock" class="w-8 h-8 text-yellow-600"></i>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Próximo Horário Livre</p>
            <p class="text-2xl font-bold text-gray-800">16:00</p>
          </div>
        </div>
        <div class="bg-white p-6 rounded-xl shadow flex items-center">
          <div class="bg-indigo-100 p-3 rounded-full mr-4">
            <i data-lucide="users" class="w-8 h-8 text-indigo-600"></i>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Clientes Mensalistas</p>
            <p class="text-2xl font-bold text-gray-800">12</p>
          </div>
        </div>
      </div>

      <!-- Agenda e Vendas Recentes -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Agenda -->
        <div class="lg:col-span-2 bg-white p-6 rounded-xl shadow">
          <h3 class="text-xl font-semibold text-gray-800 mb-4">Agenda da Quadra - Hoje</h3>
          <div class="space-y-4">
            <!-- Exemplo de horário -->
            <div class="flex items-center p-3 rounded-lg bg-gray-50 border border-gray-200">
              <div class="w-20 text-center">
                <p class="font-bold text-gray-800">18:00</p>
                <p class="text-sm text-gray-500">19:00</p>
              </div>
              <div class="w-1.5 h-10 bg-green-500 rounded-full mx-4"></div>
              <div class="flex-1">
                <p class="font-semibold text-gray-700">Futebol - Turma do Bairro</p>
                <p class="text-sm text-gray-500">Cliente Mensalista</p>
              </div>
              <div class="text-right">
                <span class="px-3 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full">Confirmado</span>
              </div>
            </div>

            <div class="flex items-center p-3 rounded-lg bg-gray-50 border border-gray-200">
              <div class="w-20 text-center">
                <p class="font-bold text-gray-800">19:00</p>
                <p class="text-sm text-gray-500">20:00</p>
              </div>
              <div class="w-1.5 h-10 bg-blue-500 rounded-full mx-4"></div>
              <div class="flex-1">
                <p class="font-semibold text-gray-700">Beach Tennis - Ana e Carla</p>
                <p class="text-sm text-gray-500">Reserva Avulsa</p>
              </div>
              <div class="text-right">
                <span class="px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">Confirmado</span>
              </div>
            </div>

            <div class="flex items-center p-3 rounded-lg bg-yellow-50 border border-yellow-200 opacity-70">
              <div class="w-20 text-center">
                <p class="font-bold text-gray-800">20:00</p>
                <p class="text-sm text-gray-500">21:00</p>
              </div>
              <div class="w-1.5 h-10 bg-yellow-400 rounded-full mx-4"></div>
              <div class="flex-1">
                <p class="font-semibold text-gray-700">Vôlei - Equipe Amigos</p>
                <p class="text-sm text-gray-500">Aguardando Pagamento</p>
              </div>
              <div class="text-right">
                <span class="px-3 py-1 text-sm font-medium text-yellow-800 bg-yellow-100 rounded-full">Pendente</span>
              </div>
            </div>

            <div class="flex items-center p-3 rounded-lg bg-gray-50 border border-gray-200">
              <div class="w-20 text-center">
                <p class="font-bold text-gray-800">21:00</p>
                <p class="text-sm text-gray-500">22:00</p>
              </div>
              <div class="w-1.5 h-10 bg-green-500 rounded-full mx-4"></div>
              <div class="flex-1">
                <p class="font-semibold text-gray-700">Futebol - Empresa XYZ</p>
                <p class="text-sm text-gray-500">Cliente Mensalista</p>
              </div>
              <div class="text-right">
                <span class="px-3 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full">Confirmado</span>
              </div>
            </div>
          </div>
          <button class="mt-6 w-full text-center text-blue-600 font-semibold hover:underline">
            Ver agenda completa
          </button>
        </div>

        <!-- Vendas Recentes -->
        <div class="bg-white p-6 rounded-xl shadow">
          <h3 class="text-xl font-semibold text-gray-800 mb-4">Vendas Recentes</h3>
          <div class="space-y-4">
            <div class="flex items-start">
              <div class="bg-gray-100 p-2 rounded-full mr-3">
                <i data-lucide="beer" class="w-5 h-5 text-gray-600"></i>
              </div>
              <div class="flex-1">
                <p class="text-gray-700">Venda de <strong>2 Cervejas</strong> para a reserva das 19:00.</p>
                <p class="text-sm text-gray-400">há 5 minutos</p>
              </div>
              <p class="font-semibold text-gray-800">R$ 20,00</p>
            </div>

            <div class="flex items-start">
              <div class="bg-gray-100 p-2 rounded-full mr-3">
                <i data-lucide="droplet" class="w-5 h-5 text-gray-600"></i>
              </div>
              <div class="flex-1">
                <p class="text-gray-700">Venda de <strong>3 Águas</strong> e <strong>1 Isotônico</strong> para a reserva das 18:00.</p>
                <p class="text-sm text-gray-400">há 45 minutos</p>
              </div>
              <p class="font-semibold text-gray-800">R$ 21,00</p>
            </div>

            <div class="flex items-start">
              <div class="bg-gray-100 p-2 rounded-full mr-3">
                <i data-lucide="calendar-plus" class="w-5 h-5 text-gray-600"></i>
              </div>
              <div class="flex-1">
                <p class="text-gray-700">Nova reserva avulsa criada para <strong>amanhã às 17:00</strong>.</p>
                <p class="text-sm text-gray-400">há 1 hora</p>
              </div>
              <p class="font-semibold text-gray-800">R$ 120,00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
//
</script>

<template>
  <main class="flex-1 p-4 md:p-8 bg-gray-100 min-h-screen">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
      <!-- Coluna de Produtos -->
      <div class="lg:col-span-2">
        <h2 class="text-3xl font-bold text-gray-800 mb-2">Ponto de Venda</h2>
        <p class="text-gray-500 mb-6">Selecione os produtos para adicionar ao pedido.</p>

        <!-- Busca -->
        <div class="mb-6">
          <div class="relative">
            <i
              data-lucide="search"
              class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            ></i>
            <input
              type="text"
              placeholder="Buscar produto..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <!-- Lista de produtos -->
        <div
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          <div
            class="bg-white rounded-lg p-3 text-center cursor-pointer product-card shadow transition-transform hover:-translate-y-1 hover:shadow-lg"
          >
            <div
              class="w-16 h-16 bg-blue-100 rounded-lg mx-auto flex items-center justify-center mb-2"
            >
              <i data-lucide="beer" class="w-8 h-8 text-blue-500"></i>
            </div>
            <p class="font-semibold text-sm text-gray-700">Cerveja</p>
            <p class="text-xs text-gray-500">R$ 10,00</p>
          </div>
          <div
            class="bg-white rounded-lg p-3 text-center cursor-pointer product-card shadow transition-transform hover:-translate-y-1 hover:shadow-lg"
          >
            <div
              class="w-16 h-16 bg-cyan-100 rounded-lg mx-auto flex items-center justify-center mb-2"
            >
              <i data-lucide="droplet" class="w-8 h-8 text-cyan-500"></i>
            </div>
            <p class="font-semibold text-sm text-gray-700">Água</p>
            <p class="text-xs text-gray-500">R$ 4,00</p>
          </div>
          <div
            class="bg-white rounded-lg p-3 text-center cursor-pointer product-card shadow transition-transform hover:-translate-y-1 hover:shadow-lg"
          >
            <div
              class="w-16 h-16 bg-red-100 rounded-lg mx-auto flex items-center justify-center mb-2"
            >
              <i data-lucide="cup-soda" class="w-8 h-8 text-red-500"></i>
            </div>
            <p class="font-semibold text-sm text-gray-700">Refrigerante</p>
            <p class="text-xs text-gray-500">R$ 6,00</p>
          </div>
          <div
            class="bg-white rounded-lg p-3 text-center cursor-pointer product-card shadow transition-transform hover:-translate-y-1 hover:shadow-lg"
          >
            <div
              class="w-16 h-16 bg-orange-100 rounded-lg mx-auto flex items-center justify-center mb-2"
            >
              <i data-lucide="zap" class="w-8 h-8 text-orange-500"></i>
            </div>
            <p class="font-semibold text-sm text-gray-700">Isotônico</p>
            <p class="text-xs text-gray-500">R$ 7,00</p>
          </div>
          <div
            class="bg-white rounded-lg p-3 text-center cursor-pointer product-card shadow transition-transform hover:-translate-y-1 hover:shadow-lg"
          >
            <div
              class="w-16 h-16 bg-yellow-100 rounded-lg mx-auto flex items-center justify-center mb-2"
            >
              <i data-lucide="sandwich" class="w-8 h-8 text-yellow-500"></i>
            </div>
            <p class="font-semibold text-sm text-gray-700">Salgado</p>
            <p class="text-xs text-gray-500">R$ 8,00</p>
          </div>
        </div>
      </div>

      <!-- Coluna do Pedido -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-xl shadow h-full flex flex-col">
          <div class="p-6 border-b border-gray-200">
            <h3 class="text-xl font-semibold text-gray-800">Resumo do Pedido</h3>
          </div>
          <div class="p-6 flex-1">
            <div class="mb-4">
              <label
                for="reservation"
                class="block text-sm font-medium text-gray-700 mb-1"
                >Associar à Reserva/Cliente</label
              >
              <select
                id="reservation"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option>Venda avulsa</option>
                <option>Reserva 18:00 - Turma do Bairro</option>
                <option>Reserva 19:00 - Ana e Carla</option>
              </select>
            </div>
            <div class="space-y-3">
              <!-- Item do pedido -->
              <div class="flex items-center">
                <div class="flex-1">
                  <p class="font-semibold text-gray-700">Cerveja</p>
                  <p class="text-sm text-gray-500">R$ 10,00</p>
                </div>
                <div class="flex items-center gap-2">
                  <button
                    class="w-6 h-6 bg-gray-200 rounded-full font-bold text-gray-600"
                  >
                    -
                  </button>
                  <span>2</span>
                  <button
                    class="w-6 h-6 bg-gray-200 rounded-full font-bold text-gray-600"
                  >
                    +
                  </button>
                </div>
                <p class="w-20 text-right font-semibold text-gray-800">
                  R$ 20,00
                </p>
              </div>
              <!-- Item do pedido -->
              <div class="flex items-center">
                <div class="flex-1">
                  <p class="font-semibold text-gray-700">Água</p>
                  <p class="text-sm text-gray-500">R$ 4,00</p>
                </div>
                <div class="flex items-center gap-2">
                  <button
                    class="w-6 h-6 bg-gray-200 rounded-full font-bold text-gray-600"
                  >
                    -
                  </button>
                  <span>3</span>
                  <button
                    class="w-6 h-6 bg-gray-200 rounded-full font-bold text-gray-600"
                  >
                    +
                  </button>
                </div>
                <p class="w-20 text-right font-semibold text-gray-800">
                  R$ 12,00
                </p>
              </div>
            </div>
          </div>
          <div
            class="p-6 bg-gray-50 rounded-b-xl border-t border-gray-200"
          >
            <div class="space-y-2 mb-4">
              <div class="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>R$ 32,00</span>
              </div>
              <div class="flex justify-between text-gray-600">
                <span>Taxas</span>
                <span>R$ 0,00</span>
              </div>
              <div
                class="flex justify-between font-bold text-xl text-gray-800"
              >
                <span>Total</span>
                <span>R$ 32,00</span>
              </div>
            </div>
            <button
              class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-colors"
            >
              Finalizar Venda
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
body {
  font-family: 'Inter', sans-serif;
}
</style>

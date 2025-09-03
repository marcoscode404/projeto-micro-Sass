<script setup>

</script>

<template>
  <div class="flex h-[calc(100vh-7rem)]  container mx-auto">
    <!-- Conteúdo Principal -->
    <div class="w-full">
      <main class="">
        <div class=" w-full">
          <!-- Cabeçalho -->
          <div class="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
            <div>
              <h2 class="text-3xl font-bold text-gray-800">Gestão de Clientes</h2>
              <p class="text-gray-500">Adicione, visualize e gerencie seus clientes.</p>
            </div>
            <button
              class="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 flex items-center transition-colors self-start md:self-center"
            >
              <Plus class="w-5 h-5 mr-2" /> Adicionar Cliente
            </button>
          </div>

          <!-- Filtro -->
          <div class="mb-6 relative">
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nome, CPF ou e-mail..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <!-- Tabela -->
          <div class="bg-white rounded-xl shadow overflow-hidden">
            <div class="overflow-x-auto">
              <table class="w-full text-sm text-left text-gray-500">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th class="px-6 py-3">Cliente</th>
                    <th class="px-6 py-3">CPF</th>
                    <th class="px-6 py-3">Nascimento</th>
                    <th class="px-6 py-3 text-center">Reservas</th>
                    <th class="px-6 py-3">Status</th>
                    <th class="px-6 py-3 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="bg-white border-b hover:bg-gray-50">
                    <td class="px-6 py-4 font-medium text-gray-900">
                      <div class="flex items-center">
                        <img class="w-10 h-10 rounded-full" src="https://placehold.co/40x40/E2E8F0/4A5568?text=CS" />
                        <div class="pl-3">
                          <div class="text-base font-semibold">Teste</div>
                          <div class="text-gray-500">teste@example.com</div>
                          <div class="text-gray-500">(11) 98765-4321</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4">123.456.789-00</td>
                    <td class="px-6 py-4">15/05/1990</td>
                    <td class="px-6 py-4 text-center"><span class="font-semibold">12</span></td>
                    <td class="px-6 py-4"><span class="px-3 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full">Mensalista</span></td>
                    <td class="px-6 py-4 text-right">
                      <a href="#" class="text-blue-600 hover:underline mr-4">Editar</a>
                      <a href="#" class="text-red-600 hover:underline">Excluir</a>
                    </td>
                  </tr>
                  <!-- outros clientes... -->
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Overlay -->
    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
      @click="toggleSidebar"
    />
  </div>
</template>

<style scoped>
body {
  font-family: 'Inter', sans-serif;
  background-color: #f0f2f5;
}
</style>

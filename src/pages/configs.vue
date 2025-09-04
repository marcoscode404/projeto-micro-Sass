<script setup>
//
</script>

<template>
  <main class="h-[calc(100vh-7rem)] flex-1 p-4 md:p-8 bg-gray-100">
    <div class="max-w-3xl mx-auto">
      <h2 class="text-3xl font-bold text-gray-800 mb-6">Configurações</h2>

      <!-- Card de Informações do Perfil -->
      <div class="bg-white rounded-xl shadow mb-8">
        <div class="p-6 border-b border-gray-200">
          <h3 class="text-xl font-semibold text-gray-800">Informações do Perfil</h3>
          <p class="text-sm text-gray-500 mt-1">
            Atualize seus dados pessoais e de contato.
          </p>
        </div>
        <form class="p-6 space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Nome Completo</label>
            <input
              type="text"
              id="name"
              value="Marcos"
              class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value="marcos@quadraflex.com"
              class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div class="pt-2 flex justify-end">
            <button
              type="submit"
              class="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
            >
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>

      <!-- Card de Alteração de Senha -->
      <div class="bg-white rounded-xl shadow">
        <div class="p-6 border-b border-gray-200">
          <h3 class="text-xl font-semibold text-gray-800">Alterar Senha</h3>
          <p class="text-sm text-gray-500 mt-1">
            Para sua segurança, escolha uma senha forte.
          </p>
        </div>
        <form class="p-6 space-y-4">
          <div>
            <label for="current_password" class="block text-sm font-medium text-gray-700">Senha Atual</label>
            <input
              type="password"
              id="current_password"
              placeholder="********"
              class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label for="new_password" class="block text-sm font-medium text-gray-700">Nova Senha</label>
            <input
              type="password"
              id="new_password"
              placeholder="********"
              class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label for="confirm_password" class="block text-sm font-medium text-gray-700">Confirmar Nova Senha</label>
            <input
              type="password"
              id="confirm_password"
              placeholder="********"
              class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div class="pt-2 flex justify-end">
            <button
              type="submit"
              class="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
            >
              Alterar Senha
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<style scoped>
body {
  font-family: 'Inter', sans-serif;
}
</style>

<script lang="ts" setup>

// const items = [
//   'https://picsum.photos/468/468?random=2',
//   'https://picsum.photos/468/468?random=3',
// ]
</script>

<template>
   <div class="flex min-h-screen">
        <div class="hidden md:flex md:w-1/2 lg:w-2/3 bg-image-container relative">
             <div class="absolute inset-0 bg-black bg-opacity-50">
              
              <img loading="lazy" src="@/assets/background.jpg" alt="Logo Grupo Modena e Silva" 
              class="w-full h-full object-cover"/>

               <!-- <UCarousel
                    v-slot="{ item }"
                    loop
                    dots
                    :autoplay="{ delay: 4000 }"
                    :items="items"
                    :ui="{ item: 'basis-1/1' }"
                  >
                    <img :src="item" width="100%" height="100%" class="object-contain">
                  </UCarousel> -->
             </div>

             <div class="relative z-10 flex flex-col justify-end p-12 text-black">
                <h1 class="text-4xl lg:text-5xl font-bold mb-4 leading-tight">Gerencie sua quadra de forma simples e eficiente.</h1>
                <p class="text-lg lg:text-xl">Todos os seus agendamentos, vendas e clientes em um só lugar.</p>
             </div>
        </div>

        <!-- Coluna do Formulário de Login -->
        <div class="w-full md:w-1/2 lg:w-1/3 flex items-center justify-center p-8">
            <div class="w-full max-w-md">
                <div class="text-center mb-8">
                    <h1 class="text-3xl font-bold text-gray-800">QuadraFlex</h1>
                    <p class="text-gray-500 mt-2">Bem-vindo de volta!</p>
                </div>

                <form action="#" method="POST" class="space-y-6">
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                        <div class="mt-1">
                            <input id="email" name="email" type="email" autocomplete="email" required
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="seu@email.com">
                        </div>
                    </div>

                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700">Senha</label>
                        <div class="mt-1">
                            <input id="password" name="password" type="password" autocomplete="current-password"
                                required
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="********">
                        </div>
                    </div>

                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox"
                                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                            <label for="remember-me" class="ml-2 block text-sm text-gray-900">Lembrar-me</label>
                        </div>

                        <div class="text-sm">
                            <a href="#" class="font-medium text-blue-600 hover:text-blue-500">Esqueceu a senha?</a>
                        </div>
                    </div>

                    <div>
                        <button type="submit"
                            class="w-full flex justify-center cursor-pointer py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium
                             text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                            Entrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
const isSidebarOpen = ref(false)

function toggleSidebar() {
    isSidebarOpen.value = !isSidebarOpen.value
}

const navigationItems = [
    { name: 'Dashboard', icon: 'ms:dashboard', href: '/dashboard' },
    { name: 'Agenda', icon: 'Calendar', href: '/agenda' },
    { name: 'Vendas (PDV)', icon: 'ShoppingCart', href: 'vendas' },
    { name: 'Clientes', icon: 'Users', href: '/clientes' },
    { name: 'Financeiro', icon: 'BarChart2', href: '/financeiro' },
    { name: 'Configurações', icon: 'ms:config', href: '/configs' },
]

</script>

<template>
    <header class="bg-white dark:bg-black shadow-md p-2 flex items-center justify-between md:justify-end sticky top-0 z-20">
        <button id="open-sidebar" class="md:hidden text-gray-600">
            <i data-lucide="menu"></i>
        </button>
        <div class="flex items-center space-x-4">
            <button class="text-gray-500 hover:text-gray-700">
                <i data-lucide="bell" class="w-6 h-6"></i>
            </button>
        
            <GlobalButtonDarkMode />

            <div class="flex items-center">
                <img src="https://placehold.co/40x40/E2E8F0/4A5568?text=MV" alt="Avatar do usuário"
                    class="w-10 h-10 rounded-full mr-2">
                <div>
                    <div class="font-semibold">Marcos Vini</div>
                    <div class="text-sm text-gray-500">Dono da Quadra</div>
                </div>

            </div>
        </div>
    </header>

    <div class="flex flex-1 w-full">
        <!-- Sidebar -->
        <aside :class="[
            'bg-gray-800 dark:bg-black text-white w-64 fixed inset-y-0 left-0 z-30 -mt-15 transform transition-transform duration-300 flex flex-col h-screen',
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
            'md:relative md:translate-x-0 md:flex-shrink-0'
        ]">
            <div class="flex items-center justify-between p-4 border-b border-gray-700">
                <h1 class="text-2xl font-bold text-white">QuadraFlex</h1>
                <button class="md:hidden text-white" @click="toggleSidebar">
                    <X class="w-6 h-6" />
                </button>
            </div>

            <nav class="flex-1 p-4 space-y-2">
                <a v-for="item in navigationItems" :key="item.name"  @click="() => { navigateTo(item.href)}"
                    class="flex items-center px-4 py-2 cursor-pointer text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg">
                    <Icon :name="item.icon" class="w-5 h-5 mr-3" /> {{ item.name }}
                </a>
            </nav>

            <div class="p-4 border-t border-gray-700">
                <a href="#" class="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg">
                    <Icon name="ms:logout" class="w-5 h-5 mr-3" /> Sair
                </a>
            </div>
        </aside>

        <main class="max-h-screen flex-1 p-6 bg-gray-100">
            <slot></slot>
        </main>
    </div>
</template>

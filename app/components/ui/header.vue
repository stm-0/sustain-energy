<template>
    <header class="bg-bg w-full border-b">
        <nav
            class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4"
        >
            <!-- Logo -->
            <div
                class="text-primary font-heading flex items-center gap-2 text-xl"
            >
                <span class="material-symbols-outlined">eco</span>
                Sustain Energy
            </div>

            <!-- Links -->
            <ul class="hidden items-center gap-8 font-medium md:flex">
                <li>
                    <NuxtLink to="/" class="hover:text-primary">Home</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/our-mission" class="hover:text-primary"
                        >Mission</NuxtLink
                    >
                </li>
                <li>
                    <NuxtLink to="/dashboard" class="hover:text-primary"
                        >Dashboard</NuxtLink
                    >
                </li>
                <li>
                    <NuxtLink to="/dashboard/shop" class="hover:text-primary"
                        >Shop</NuxtLink
                    >
                </li>
            </ul>

            <!-- Login -->
            <NuxtLink
                to="/login"
                class="bg-primary rounded-lg px-4 py-2 text-white transition hover:bg-green-900"
            >
                Login
            </NuxtLink>
        </nav>
    </header>
</template>

<template>
    <section
        class="mx-auto grid max-w-7xl items-center gap-10 px-6 py-20 md:grid-cols-2"
    >
        <!-- Text -->
        <div>
            <h1 class="mb-6">Build a Greener Future for Your Company</h1>

            <p class="mb-8 text-lg text-neutral-600">
                Measure sustainability performance, track your environmental
                impact, and earn a green certification for your business.
            </p>

            <div class="flex gap-4">
                <NuxtLink
                    to="/register"
                    class="bg-primary rounded-lg px-6 py-3 text-white transition hover:bg-green-900"
                >
                    Get Started
                </NuxtLink>

                <NuxtLink
                    to="/our-mission"
                    class="border-primary hover:bg-primary rounded-lg border px-6 py-3 transition hover:text-white"
                >
                    Learn More
                </NuxtLink>
            </div>
        </div>

        <!-- Image -->
        <img src="/images/solar.jpg" class="rounded-xl shadow-lg" />
    </section>
</template>

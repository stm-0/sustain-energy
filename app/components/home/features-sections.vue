<script setup>
import FeatureCard from "./FeatureCard.vue"
</script>

<template>
    <section class="bg-neutral-100 py-20">
        <div class="mx-auto max-w-7xl px-6 text-center">
            <h2 class="mb-12">Platform Features</h2>

            <div class="grid gap-8 md:grid-cols-3">
                <FeatureCard
                    icon="calculate"
                    title="Green Calculator"
                    text="Measure sustainability performance across environmental criteria."
                />

                <FeatureCard
                    icon="dashboard"
                    title="Sustainability Dashboard"
                    text="Track your score, environmental progress and performance."
                />

                <FeatureCard
                    icon="workspace_premium"
                    title="Green Certification"
                    text="Receive a sustainability certificate based on your score."
                />
            </div>
        </div>
    </section>
</template>

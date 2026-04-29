<template>
  <section>
    <div class="container text-center">
      <Icon
        name="ph:leaf-bold"
        size="40"
        class="text-primary mx-auto mb-4 opacity-80"
      />

      <!-- Mini stats row -->
      <div class="my-6 flex flex-wrap justify-center gap-8">
        <UiBadge
          v-for="(item, idx) in [
            'Free registration',
            '2-minute setup',
            'Instant results',
            'Official certificate',
          ]"
          :key="item"
          variant="outline"
          class="p-3"
          v-fade-up
          :transition="{ delay: (idx + 1) * 0.2 }"
        >
          <Icon name="ph:check-circle-bold" size="16" class="text-primary" />
          <span class="font-heading">{{ item }}</span>
        </UiBadge>
      </div>

      <h2 class="mb-4 text-3xl font-bold md:text-4xl" v-fade-up>
        Ready to measure your impact?
      </h2>

      <p class="text-foreground/80 mx-auto mb-8 max-w-lg text-lg">
        Register today for free. Your first year subscription is just
        <strong>£99.99</strong> — less than £2 a week for full certification.
      </p>

      <div class="flex flex-col justify-center gap-3 sm:flex-row">
        <UiButton as-child size="lg" v-fade-up>
          <NuxtLink to="/auth/register" class="flex items-center">
            <Icon name="ph:rocket-launch-bold" size="18" />
            Register Now
          </NuxtLink>
        </UiButton>

        <UiButton as-child variant="ghost" size="lg">
          <NuxtLink to="/about" class="flex items-center">
            Learn More
            <Icon name="ph:arrow-right" size="16" />
          </NuxtLink>
        </UiButton>
      </div>
    </div>
  </section>
</template>

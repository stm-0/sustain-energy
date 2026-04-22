<template>
  <div class="flex min-h-screen flex-col">
    <div
      class="bg-background/80 fixed top-0 z-40 flex h-16 w-full justify-center backdrop-blur-sm"
    >
      <div class="container flex items-center">
        <Logo />
      </div>
    </div>

    <main class="flex min-h-screen flex-1 flex-col justify-center p-12">
      <slot></slot>
    </main>
  </div>
</template>

<template>
  <section class="flex h-[65vh] w-full flex-col justify-center">
    <div class="flex flex-col items-center space-y-4 text-center">
      <div class="space-y-6">
        <h1 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
          Simple GPA Calculator
        </h1>
        <p class="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
          A simple GPA calculator for your needs.
        </p>
        <div class="flex flex-col justify-center gap-4 min-[400px]:flex-row">
          <!-- <UiButton variant="outline">Learn More</UiButton> -->
          <UiButton>
            <NuxtLink to="/calculator"> Get Started </NuxtLink>
          </UiButton>
        </div>
      </div>
    </div>
  </section>

  <UiSeparator />

  <section class="w-full py-12 lg:py-24">
    <div class="container max-w-lg px-4 md:max-w-6xl md:px-24">
      <div class="grid grid-cols-1 items-center gap-6 md:grid-cols-2">
        <img
          alt="Image"
          class="mx-auto rounded-xl md:order-last md:w-full"
          src="~/assets/images/hero-image.png"
        />
        <div class="flex flex-col justify-center space-y-4">
          <div class="space-y-2">
            <div class="inline-block rounded-lg py-1 text-sm">GPA Calculator</div>
            <h2 class="text-3xl font-bold tracking-tighter md:text-5xl">Simple and Intuitive</h2>
            <p class="max-w-[600px] text-muted-foreground lg:text-xl/relaxed xl:text-xl/relaxed">
              A simple and intuitive GPA calculator for your needs. Calculate your GPA based on your
              grades. The data is stored locally on your device, and never shared with anyone.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup></script>

<template>
  <div class="bg-none w-full">
    <UiNavbar class="border-none">
      <UiContainer class="flex h-14 items-center justify-between px-4 md:px-6">
        <NuxtLink to="/">
          <div class="flex items-center gap-2 transition-transform  hover:scale-105">
            <img
              src="~/assets/images/logo.svg"
              alt="Korea International School Logo"
              class="h-10 w-10"
            />
            <p class="text-xl font-semibold">Tools</p>
          </div>
        </NuxtLink>

        <nav class="items-center gap-5 flex">
          <span class="text-sm font-medium underline-offset-4 hover:underline">
            <NuxtLink
              class="text-sm text-muted-foreground transition-colors hover:text-foreground"
              to="/"
            >
              Home
            </NuxtLink>
          </span>

          <span class="text-sm font-medium underline-offset-4 hover:underline">
            <NuxtLink
              class="text-sm text-muted-foreground transition-colors hover:text-foreground"
              to="/calculator"
            >
              Calculator
            </NuxtLink>
          </span>
        </nav>
      </UiContainer>
    </UiNavbar>
  </div>
</template>

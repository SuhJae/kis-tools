<template>
  <div class="fixed w-full bg-none">
    <UiNavbar class="border-none">
      <UiContainer class="flex h-14 items-center justify-between px-4 md:px-6">
        <NuxtLink to="/">
          <div class="flex items-center gap-2 transition-transform hover:scale-105">
            <img
              class="h-10 w-10 dark:hidden"
              src="~/assets/images/logo.svg"
              alt="Korea International School Logo"
            />
            <img
              class="hidden h-10 w-10 dark:block"
              src="~/assets/images/logo-dark.svg"
              alt="Korea International School Logo"
            />
            <p class="text-xl font-semibold">Tools</p>
          </div>
        </NuxtLink>

        <nav class="flex items-center gap-5">
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
  <div class="h-14"></div>
</template>

<template>
  <div>
    <NuxtLayout>
      <h1 class="text-5xl">Nested routes ONE</h1>
      <div class="flex gap-5 mt-10">
        <UButton prefetch to="/" color="gray">Index page</UButton>
        <UButton prefetch to="/test" color="gray">Test page</UButton>
        <UButton to="/child-page/one/bar" color="emerald">
          Bar modal!!!
        </UButton>
        <UButton to="/child-page/one/foo">Foo modal</UButton>
      </div>
    </NuxtLayout>
  </div>
</template>

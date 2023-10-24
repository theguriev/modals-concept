<template>
  <div>
    <NuxtLayout>
      <h1 class="text-5xl">Test page</h1>
      <div class="flex gap-5 mt-10">
        <UButton prefetch to="/" color="gray">Index page</UButton>
        <UButton to="/test/bar" color="emerald">Bar modal!!!</UButton>
        <UButton to="/test/foo">Foo modal</UButton>
      </div>
    </NuxtLayout>
  </div>
</template>

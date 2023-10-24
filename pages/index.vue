<template>
  <div>
    <NuxtLayout>
      <h1 class="text-5xl">Hello world</h1>
      <div class="flex gap-5 mt-10">
        <UButton prefetch to="/test" color="gray">Test page</UButton>
        <UButton prefetch to="/child-page/one" color="gray">
          /child-page/one
        </UButton>
        <UButton prefetch to="/bar" color="emerald">Bar modal!!!</UButton>
        <UButton prefetch to="/foo">Foo modal</UButton>
      </div>
    </NuxtLayout>
  </div>
</template>

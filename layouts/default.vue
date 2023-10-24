<template>
  <UContainer>
    <div class="flex mt-10 gap-20">
      <UVerticalNavigation
        :links="[
          {
            label: '/',
            to: '/',
          },
          {
            label: '/foo - [modal]',
            to: '/foo',
          },
          {
            label: '/bar - [modal]',
            to: '/bar',
          },
          {
            label: '/test',
            to: '/test',
          },
          {
            label: '/test/foo - [modal]',
            to: '/test/foo',
          },
          {
            label: '/test/bar - [modal]',
            to: '/test/bar',
          },
          {
            label: '/child-page/one',
            to: '/child-page/one',
          },
          {
            label: '/child-page/one/foo - [modal]',
            to: '/child-page/one/foo',
          },
          {
            label: '/child-page/one/bar - [modal]',
            to: '/child-page/one/bar',
          },
        ]"
        :ui="{
          wrapper: 'border-s border-gray-200 dark:border-gray-800 space-y-2',
          base: 'group block border-s -ms-px lg:leading-6 before:hidden',
          padding: 'p-0 ps-4',
          rounded: '',
          font: '',
          ring: '',
          active:
            'text-primary-500 dark:text-primary-400 border-current font-semibold',
          inactive:
            'border-transparent hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300',
        }"
      />
      <div><slot /><NuxtPage /></div>
    </div>
  </UContainer>
</template>

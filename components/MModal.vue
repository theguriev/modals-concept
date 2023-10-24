<template>
  <div class="relative z-50">
    <div
      class="fixed inset-0 transition-opacity bg-gray-200/75 dark:bg-gray-800/75 pointer-events-none"
    />
    <div class="fixed inset-0 overflow-y-auto">
      <div
        class="flex min-h-full items-start sm:items-center justify-center text-center p-4 sm:p-0"
      >
        <div
          class="relative text-left rtl:text-right overflow-hidden w-full flex flex-col bg-white dark:bg-gray-900 shadow-xl sm:max-w-lg rounded-lg sm:my-8"
        >
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

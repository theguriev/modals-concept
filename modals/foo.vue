<script setup lang="ts">
import { dirname } from "pathe";
import useModalNavigation from "~/composables/useModalNavigation.ts";

const preparePath = useModalNavigation();

const modalRef = ref(null);
const router = useRouter();
const handleCloseClick = () => {
  navigateTo(dirname(router.currentRoute.value.path));
};

onClickOutside(modalRef, handleCloseClick);
onKeyStroke("Escape", handleCloseClick);
</script>

<template>
  <MModal>
    <UCard
      ref="modalRef"
      :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
          >
            Modal
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="handleCloseClick"
          />
        </div>
      </template>
      Foo modal content
      <UButton :to="preparePath('bar', true)">
        Bar modal
        {{ preparePath("bar", true) }}
      </UButton>
      <template #footer> Foo modal footer </template>
    </UCard>
  </MModal>
</template>

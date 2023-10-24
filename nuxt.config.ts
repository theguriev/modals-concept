import getModals from "./getModals";
import pushRecursively from "./pushRecursively";
import { basename } from "pathe";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@vueuse/nuxt"],
  hooks: {
    "pages:extend": async (pages) => {
      const modals = await getModals("modals");
      const modalsPages = modals.map((modal) => ({
        name: basename(modal, ".vue"),
        path: basename(modal, ".vue"),
        file: modal,
        children: [],
      }));
      pushRecursively(pages, modalsPages);
    },
  },
});

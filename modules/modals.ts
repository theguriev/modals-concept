import { defineNuxtModule } from "nuxt/kit";
import resolveModalsRoutes from "../module-utils/resolveModalsRoutes";
import pushRecursively from "../module-utils/pushRecursively";

export default defineNuxtModule({
  meta: {
    name: "modals",
  },
  setup: async (_options, nuxt) => {
    nuxt.hook("pages:extend", async (pages) => {
      const modals = await resolveModalsRoutes();
      pushRecursively(pages, modals);
      console.log("log: modals", modals, JSON.stringify(pages, null, 4));
    });
  },
});

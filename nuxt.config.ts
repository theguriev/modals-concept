import resolveModalsRoutes from "./module-utils/resolveModalsRoutes";
import pushRecursively from "./module-utils/pushRecursively";

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@vueuse/nuxt"],
});

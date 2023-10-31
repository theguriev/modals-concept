import type { NuxtPage } from "nuxt/schema";

const findRouteByName = (
  name: string,
  routes: NuxtPage[]
): NuxtPage | undefined => {
  for (const route of routes) {
    if (route.name === name) {
      return route;
    }
  }
  return findRouteByName(name, routes);
};

export default findRouteByName;

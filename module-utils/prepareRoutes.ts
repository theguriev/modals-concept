import { logger } from "@nuxt/kit";
import type { NuxtPage } from "nuxt/schema";
import findRouteByName from "./findRouteByName";

const prepareRoutes = (
  routes: NuxtPage[],
  parent?: NuxtPage,
  names = new Set<string>()
) => {
  for (const route of routes) {
    // Remove -index
    if (route.name) {
      route.name = route.name.replace(/\/index$/, "").replace(/\//g, "-");

      if (names.has(route.name)) {
        const existingRoute = findRouteByName(route.name, routes);
        const extra = existingRoute?.name
          ? `is the same as \`${existingRoute.file}\``
          : "is a duplicate";
        logger.warn(
          `Route name generated for \`${route.file}\` ${extra}. You may wish to set a custom name using \`definePageMeta\` within the page file.`
        );
      }
    }

    // Remove leading / if children route
    if (parent && route.path.startsWith("/")) {
      route.path = route.path.slice(1);
    }

    if (route.children?.length) {
      route.children = prepareRoutes(route.children, route, names);
    }

    if (route.children?.find((childRoute) => childRoute.path === "")) {
      delete route.name;
    }

    if (route.name) {
      names.add(route.name);
    }
  }

  return routes;
};

export default prepareRoutes;

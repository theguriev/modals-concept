import type { NuxtPage } from "nuxt/schema";
import { withoutTrailingSlash, cleanDoubleSlashes } from "ufo";

const pushRecursively = (arr: Array<NuxtPage>, toPush: Array<NuxtPage>) => {
  arr.forEach((item) => {
    if ("children" in item && item.children) {
      const normalizedToPush = toPush.map((toPushItem) => ({
        ...toPushItem,
        path: cleanDoubleSlashes(
          `${withoutTrailingSlash(item.path)}${toPushItem.path}`
        ),
        name: `${item.name}-${toPushItem.name}`,
      }));
      pushRecursively(item.children, normalizedToPush);
      normalizedToPush.forEach((toPushItem) => {
        if (item.children) {
          item.children.push(toPushItem);
        }
      });
    }
  });
};

export default pushRecursively;

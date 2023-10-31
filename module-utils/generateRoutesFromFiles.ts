import fs from "node:fs";
import { extname } from "pathe";
import { joinURL, withLeadingSlash } from "ufo";
import escapeRE from "escape-string-regexp";
import type { NuxtPage } from "nuxt/schema";
import parseSegment from "./parseSegment";
import getRoutePath from "./getRoutePath";
import type { ScannedFile } from "../types";
import prepareRoutes from "./prepareRoutes";

const generateRoutesFromFiles = async (
  files: ScannedFile[],
  shouldExtractBuildMeta = false,
  vfs?: Record<string, string>
): Promise<NuxtPage[]> => {
  const routes: NuxtPage[] = [];

  for (const file of files) {
    const segments = file.relativePath
      .replace(new RegExp(`${escapeRE(extname(file.relativePath))}$`), "")
      .split("/");

    const route: NuxtPage = {
      name: "",
      path: "",
      file: file.absolutePath,
      children: [],
    };

    // Array where routes should be added, useful when adding child routes
    let parent = routes;

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];

      const tokens = parseSegment(segment);
      const segmentName = tokens.map(({ value }) => value).join("");

      // ex: parent/[slug].vue -> parent-slug
      route.name += (route.name && "/") + segmentName;

      // ex: parent.vue + parent/child.vue
      const path = withLeadingSlash(
        joinURL(route.path, getRoutePath(tokens).replace(/\/index$/, "/"))
      );
      const child = parent.find(
        (parentRoute) =>
          parentRoute.name === route.name && parentRoute.path === path
      );

      if (child && child.children) {
        parent = child.children;
        route.path = "";
      } else if (segmentName === "index" && !route.path) {
        route.path += "/";
      } else if (segmentName !== "index") {
        route.path += getRoutePath(tokens);
      }
    }

    if (shouldExtractBuildMeta && vfs) {
      const fileContent =
        file.absolutePath in vfs
          ? vfs[file.absolutePath]
          : fs.readFileSync(file.absolutePath, "utf-8");
      const overrideRouteName = await getRouteName(fileContent);
      if (overrideRouteName) {
        route.name = overrideRouteName;
      }
    }

    parent.push(route);
  }

  return prepareRoutes(routes);
};

export default generateRoutesFromFiles;

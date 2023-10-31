import { normalize } from "pathe";
import {
  genArrayFromRaw,
  genDynamicImport,
  genImport,
  genSafeVariableName,
} from "knitwork";
import { filename } from "pathe/utils";
import { hash } from "ohash";
import type { NuxtPage } from "nuxt/schema";

const normalizeRoutes = (
  routes: NuxtPage[],
  metaImports: Set<string> = new Set()
): { imports: Set<string>; routes: string } => {
  return {
    imports: metaImports,
    routes: genArrayFromRaw(
      routes.map((page) => {
        const route = Object.fromEntries(
          Object.entries(page)
            .filter(
              ([key, value]) =>
                key !== "file" && (Array.isArray(value) ? value.length : value)
            )
            .map(([key, value]) => [key, JSON.stringify(value)])
        ) as Record<Exclude<keyof NuxtPage, "file">, string> & {
          component?: string;
        };

        if (page.children?.length) {
          route.children = normalizeRoutes(page.children, metaImports).routes;
        }

        // Without a file, we can't use `definePageMeta` to extract route-level meta from the file
        if (!page.file) {
          for (const key of [
            "name",
            "path",
            "meta",
            "alias",
            "redirect",
          ] as const) {
            if (page[key]) {
              route[key] = JSON.stringify(page[key]);
            }
          }
          return route;
        }

        const file = normalize(page.file);
        const metaImportName =
          genSafeVariableName(filename(file) + hash(file)) + "Meta";
        metaImports.add(
          genImport(`${file}?macro=true`, [
            { name: "default", as: metaImportName },
          ])
        );

        let aliasCode = `${metaImportName}?.alias || []`;
        const alias = Array.isArray(page.alias)
          ? page.alias
          : [page.alias].filter(Boolean);
        if (alias.length) {
          aliasCode = `${JSON.stringify(alias)}.concat(${aliasCode})`;
        }

        route.name = `${metaImportName}?.name ?? ${
          page.name ? JSON.stringify(page.name) : "undefined"
        }`;
        route.path = `${metaImportName}?.path ?? ${JSON.stringify(page.path)}`;
        route.meta =
          page.meta &&
          Object.values(page.meta).filter((value) => value !== undefined).length
            ? `{...(${metaImportName} || {}), ...${JSON.stringify(page.meta)}}`
            : `${metaImportName} || {}`;
        route.alias = aliasCode;
        route.redirect = page.redirect
          ? JSON.stringify(page.redirect)
          : `${metaImportName}?.redirect || undefined`;
        route.component = genDynamicImport(file, { interopDefault: true });

        return route;
      })
    ),
  };
};

export default normalizeRoutes;

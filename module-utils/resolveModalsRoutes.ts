import { relative, resolve } from "pathe";
import { resolveFiles, useNuxt } from "@nuxt/kit";
import type { NuxtPage } from "nuxt/schema";
import generateRoutesFromFiles from "./generateRoutesFromFiles";
import uniqueBy from "./uniqueBy";
import type { ScannedFile } from "../types";

const resolveModalsRoutes = async (): Promise<NuxtPage[]> => {
  const nuxt = useNuxt();

  const pagesDirs = nuxt.options._layers.map((layer) =>
    resolve(layer.config.srcDir, "modals")
  );

  const scannedFiles: ScannedFile[] = [];
  for (const dir of pagesDirs) {
    const files = await resolveFiles(
      dir,
      `**/*{${nuxt.options.extensions.join(",")}}`
    );
    scannedFiles.push(
      ...files.map((file) => ({
        relativePath: relative(dir, file),
        absolutePath: file,
      }))
    );
  }
  scannedFiles.sort((a, b) => a.relativePath.localeCompare(b.relativePath));

  const allRoutes = await generateRoutesFromFiles(
    uniqueBy(scannedFiles, "relativePath"),
    nuxt.options.experimental.typedPages,
    nuxt.vfs
  );

  return uniqueBy(allRoutes, "path");
};

export default resolveModalsRoutes;

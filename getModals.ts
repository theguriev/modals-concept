import { join } from "pathe";

import { globby } from "globby";

const GLOB_SCAN_PATTERN = "*.vue";

const getModals = async (dir: string) => {
  return await globby(join(dir, GLOB_SCAN_PATTERN), {
    cwd: "./",
    dot: true,
    absolute: true,
  });
};

export default getModals;

// export async function resolvePagesRoutes (): Promise<NuxtPage[]> {
//   const nuxt = useNuxt()

//   const pagesDirs = nuxt.options._layers.map(
//     layer => resolve(layer.config.srcDir, (layer.config.rootDir === nuxt.options.rootDir ? nuxt.options : layer.config).dir?.pages || 'pages')
//   )

//   const scannedFiles: ScannedFile[] = []
//   for (const dir of pagesDirs) {
//     const files = await resolveFiles(dir, `**/*{${nuxt.options.extensions.join(',')}}`)
//     scannedFiles.push(...files.map(file => ({ relativePath: relative(dir, file), absolutePath: file })))
//   }
//   scannedFiles.sort((a, b) => a.relativePath.localeCompare(b.relativePath))

//   const allRoutes = await generateRoutesFromFiles(uniqueBy(scannedFiles, 'relativePath'), nuxt.options.experimental.typedPages, nuxt.vfs)

//   return uniqueBy(allRoutes, 'path')
// }

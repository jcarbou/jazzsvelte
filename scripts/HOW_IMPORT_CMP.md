1) Importing API doc from primereact project

`pnpm run importCmp myCmp`

2) Modify generated `packages/myCmp/myCmp.api.json`to add  custom property types

3) Generate cmp

`pnpm run generateCmp myCmp`

4) Install cmp

Fix error on myCmp.config.ts, defaul values (export const defaultMyCmpProps)
pnpm i

5) Import doc

`pnpm run importCmpDocList myCmp`

Replace in file MyCmpDoc.svelte, for ptDocs, the type DocApiTable by DocApiPtTable
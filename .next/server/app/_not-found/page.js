const CHUNK_PUBLIC_PATH = "server/app/_not-found/page.js";
const runtime = require("../../chunks/ssr/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/ssr/node_modules_next_dist_7c458f._.js");
runtime.loadChunk("server/chunks/ssr/[root of the server]__550d4a._.js");
runtime.loadChunk("server/chunks/ssr/_b0d1a8._.js");
runtime.loadChunk("server/chunks/ssr/src_app_global_ed6a4d.css");
runtime.loadChunk("server/chunks/ssr/_78b37a._.js");
runtime.getOrInstantiateRuntimeModule("[project]/.next-internal/server/app/_not-found/page/actions.js [app-rsc] (ecmascript)", CHUNK_PUBLIC_PATH);
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/node_modules/next/dist/esm/build/templates/app-page.js?page=/_not-found/page { MODULE_0 => \"[project]/src/app/layout.js [app-rsc] (ecmascript, Next.js server component)\", MODULE_1 => \"[project]/node_modules/next/dist/client/components/not-found-error.js [app-rsc] (ecmascript, Next.js server component)\" } [app-rsc] (ecmascript)", CHUNK_PUBLIC_PATH).exports;

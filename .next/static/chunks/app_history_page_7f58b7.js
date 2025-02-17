(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/app_history_page_7f58b7.js", {

"[project]/app/history/page.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>HistoryPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
"use client";
;
function HistoryPage() {
    _s();
    const [likedPosts, setLikedPosts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // Define defaultPosts directly in the History page
    const defaultPosts = [
        {
            id: 1,
            title: "What is Newton's law?",
            text: "Newton's laws of motion are three fundamental principles...",
            liked: false,
            likes: 100,
            comments: [
                "Great explanation!",
                "I learned a lot from this post.",
                "Can you provide more examples?"
            ],
            bookmarked: false
        },
        {
            id: 2,
            title: "What is Law of Demand?",
            text: "The Law of Demand describes the relationship between price...",
            liked: false,
            likes: 100,
            comments: [
                "Which component is the most important?"
            ],
            bookmarked: false
        },
        {
            id: 3,
            title: "What components make up a phone?",
            text: "A phone consists of multiple components...",
            liked: false,
            likes: 100,
            comments: [
                "This is a very timely topic.",
                "How did the pandemic affect the global economy?"
            ],
            bookmarked: false
        },
        {
            id: 4,
            title: "Which countries were most affected by COVID?",
            text: "Many countries were...",
            liked: false,
            likes: 169,
            comments: [],
            bookmarked: false
        }
    ];
    // Function to load liked posts
    // const loadLikedPosts = () => {
    //   if (typeof window !== "undefined") {
    //     const likedData = JSON.parse(localStorage.getItem('liked')) || {};
    //     const posts = defaultPosts.map(post => ({
    //       ...post,
    //       likes: likedData[post.id] || false,
    //       likes: likedData[post.id]?.likes || post.likes
    //     }));
    //     // Filter posts that have been liked
    //     const likedPosts = posts.filter(post => post.liked);
    //     // Sort liked posts in descending order by likes
    //     const sortedLikedPosts = likedPosts.sort((a, b) => b.likes - a.likes);
    //     setLikedPosts(sortedLikedPosts);
    //   }
    // };
    // const loadLikedPosts = () => {
    //   if (typeof window !== "undefined") {
    //     const likedData = JSON.parse(localStorage.getItem('liked')) || {};
    //     const posts = defaultPosts.map(post => ({
    //       ...post,
    //       liked: likedData[post.id]?.liked || false,
    //       likes: likedData[post.id]?.likes || post.likes // Load updated likes count
    //     }));
    //     const likedPosts = posts.filter(post => post.liked);
    //     setLikedPosts(likedPosts.sort((a, b) => b.likes - a.likes));
    //   }
    // };
    const loadLikedPosts = ()=>{
        const savedLikes = JSON.parse(localStorage.getItem('likesData')) || {};
        const likedPosts = defaultPosts.map((post)=>({
                ...post,
                liked: savedLikes[post.id]?.liked || false,
                likes: savedLikes[post.id]?.likes ?? post.likes
            })).filter((post)=>post.liked);
        setLikedPosts(likedPosts);
    };
    // Load liked posts on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HistoryPage.useEffect": ()=>{
            loadLikedPosts();
        }
    }["HistoryPage.useEffect"], []);
    // Listen for custom event to reload liked posts
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HistoryPage.useEffect": ()=>{
            const handleLikedStateChange = {
                "HistoryPage.useEffect.handleLikedStateChange": ()=>{
                    if ("TURBOPACK compile-time truthy", 1) {
                        loadLikedPosts();
                        const savedPosts = JSON.parse(localStorage.getItem('posts')) || defaultPosts;
                        // Filter posts that have been liked
                        const liked = savedPosts.filter({
                            "HistoryPage.useEffect.handleLikedStateChange.liked": (post)=>post.liked
                        }["HistoryPage.useEffect.handleLikedStateChange.liked"]);
                        // Sort liked posts in descending order by likes
                        const sortedLikedPosts = liked.sort({
                            "HistoryPage.useEffect.handleLikedStateChange.sortedLikedPosts": (a, b)=>b.likes - a.likes
                        }["HistoryPage.useEffect.handleLikedStateChange.sortedLikedPosts"]);
                        setLikedPosts(sortedLikedPosts);
                    }
                }
            }["HistoryPage.useEffect.handleLikedStateChange"];
            window.addEventListener('likedStateChanged', handleLikedStateChange);
            return ({
                "HistoryPage.useEffect": ()=>{
                    window.removeEventListener('likedStateChanged', handleLikedStateChange);
                }
            })["HistoryPage.useEffect"];
        }
    }["HistoryPage.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center min-h-screen text-white p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-3xl font-bold mb-8",
                children: "Liked Posts History"
            }, void 0, false, {
                fileName: "[project]/app/history/page.js",
                lineNumber: 135,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-4/5 space-y-4",
                children: likedPosts.length > 0 ? likedPosts.map((post)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 border border-gray-400 rounded-lg bg-gray-900",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-semibold",
                                children: post.title
                            }, void 0, false, {
                                fileName: "[project]/app/history/page.js",
                                lineNumber: 140,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm",
                                children: post.text
                            }, void 0, false, {
                                fileName: "[project]/app/history/page.js",
                                lineNumber: 141,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex space-x-2 mt-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: `px-4 py-2 rounded-lg text-white ${post.liked ? 'bg-red-500' : 'bg-blue-500'}`,
                                        children: [
                                            post.liked ? 'Unlike 👎' : 'Like 👍',
                                            " (",
                                            post.likes,
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/history/page.js",
                                        lineNumber: 143,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "bg-yellow-500 px-4 py-2 rounded-lg text-white",
                                        children: [
                                            "💬 Comment (",
                                            post.comments.length,
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/history/page.js",
                                        lineNumber: 146,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "bg-gray-600 px-4 py-2 rounded-lg text-white",
                                        children: "🔗 Share"
                                    }, void 0, false, {
                                        fileName: "[project]/app/history/page.js",
                                        lineNumber: 149,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: `px-4 py-2 rounded-lg text-white ${post.bookmarked ? 'bg-purple-500' : 'bg-gray-500'}`,
                                        children: post.bookmarked ? 'Unbookmark ❌' : 'Bookmark 📌'
                                    }, void 0, false, {
                                        fileName: "[project]/app/history/page.js",
                                        lineNumber: 152,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/history/page.js",
                                lineNumber: 142,
                                columnNumber: 15
                            }, this)
                        ]
                    }, post.id, true, {
                        fileName: "[project]/app/history/page.js",
                        lineNumber: 139,
                        columnNumber: 13
                    }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: "No liked posts found."
                }, void 0, false, {
                    fileName: "[project]/app/history/page.js",
                    lineNumber: 159,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/history/page.js",
                lineNumber: 136,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/history/page.js",
        lineNumber: 134,
        columnNumber: 5
    }, this);
}
_s(HistoryPage, "dxPqjTZZjhkkIPXjLGXLuRIHruE=");
_c = HistoryPage;
var _c;
__turbopack_refresh__.register(_c, "HistoryPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/history/page.js [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=app_history_page_7f58b7.js.map
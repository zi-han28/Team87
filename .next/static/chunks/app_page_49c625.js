(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/app_page_49c625.js", {

"[project]/app/page.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>Home)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
"use client";
;
;
function Home() {
    _s();
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        {
            user: 'User1',
            text: 'Hello!'
        },
        {
            user: 'User2',
            text: 'Hi there!'
        }
    ]);
    const [newMessage, setNewMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const messagesEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [viewingCommentsForPost, setViewingCommentsForPost] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Default posts
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
    // Load bookmarked state from localStorage and merge with default posts
    const [posts, setPosts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "Home.useState": ()=>{
            const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || {};
            const likedPosts = JSON.parse(localStorage.getItem('likesData')) || {};
            return defaultPosts.map({
                "Home.useState": (post)=>({
                        ...post,
                        bookmarked: savedBookmarks[post.id] || false,
                        liked: likedPosts[post.id]?.liked || false,
                        likes: likedPosts[post.id]?.likes ?? post.likes
                    })
            }["Home.useState"]);
        }
    }["Home.useState"]);
    //   const [posts, setPosts] = useState(() => {
    //   if (typeof window !== "undefined") {
    //     const savedPosts = JSON.parse(localStorage.getItem('posts')) || defaultPosts;
    //     return savedPosts;
    //   }
    //   return defaultPosts;
    // });
    // Save bookmarked state to localStorage
    const saveBookmarks = (posts)=>{
        const bookmarks = posts.reduce((acc, post)=>{
            acc[post.id] = post.bookmarked;
            return acc;
        }, {});
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    };
    const toggleBookmark = (postId)=>{
        const updatedPosts = posts.map((post)=>post.id === postId ? {
                ...post,
                bookmarked: !post.bookmarked
            } : post);
        setPosts(updatedPosts);
        saveBookmarks(updatedPosts); // Save bookmarked state to localStorage
    };
    // const saveLikes = (posts) => {
    //   const liked = posts.reduce((acc, post) => {
    //     acc[post.id] = post.liked;
    //     return acc;
    //   }, {});
    //   localStorage.setItem('liked', JSON.stringify(liked));
    // }; 
    const saveLikes = (posts)=>{
        const liked = posts.reduce((acc, post)=>{
            acc[post.id] = {
                liked: post.liked,
                likes: post.likes
            };
            return acc;
        }, {});
        localStorage.setItem('likesData', JSON.stringify(liked));
    };
    // const toggleLike = (postId) => {
    //   const updatedPosts = posts.map(post => 
    //     post.id === postId ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 } : post
    //   );
    //   setPosts(updatedPosts);
    //   saveLikes(updatedPosts);
    //   // Dispatch a custom event to notify other pages (e.g., History page)
    //   if (typeof window !== "undefined") {
    //     window.dispatchEvent(new Event('likedStateChanged'));
    //   }
    // };
    const toggleLike = (postId)=>{
        const updatedPosts = posts.map((post)=>post.id === postId ? {
                ...post,
                liked: !post.liked,
                likes: post.liked ? post.likes - 1 : post.likes + 1
            } : post);
        setPosts(updatedPosts);
        saveLikes(updatedPosts);
        if ("TURBOPACK compile-time truthy", 1) {
            window.dispatchEvent(new Event('likedStateChanged'));
        }
    };
    const addComment = (postId)=>{
        const comment = prompt('Enter your comment:');
        if (comment && comment.trim()) {
            const updatedPosts = posts.map((post)=>post.id === postId ? {
                    ...post,
                    comments: [
                        ...post.comments,
                        comment
                    ]
                } : post);
            setPosts(updatedPosts);
        }
    };
    const viewComments = (postId)=>{
        if (viewingCommentsForPost === postId) {
            // If the comments for this post are already being viewed, hide them
            setViewingCommentsForPost(null);
        } else {
            // Otherwise, show the comments for this post
            setViewingCommentsForPost(postId);
        }
    };
    const sharePost = (postId)=>{
        console.log(`Post ${postId} shared!`);
    };
    const handleSend = ()=>{
        if (newMessage.trim()) {
            setMessages((prevMessages)=>[
                    ...prevMessages,
                    {
                        user: 'You',
                        text: newMessage
                    }
                ]);
            setNewMessage('');
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            messagesEndRef.current?.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }["Home.useEffect"], [
        messages
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center min-h-screen text-white p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-4/5 bg-gray-900 p-6 shadow-lg rounded-lg flex flex-col h-96",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-bold mb-4",
                        children: "Chat Room"
                    }, void 0, false, {
                        fileName: "[project]/app/page.js",
                        lineNumber: 149,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 p-4 overflow-y-auto space-y-2 bg-gray-800 rounded-lg",
                        children: messages.map((msg, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `p-2 rounded-lg max-w-xs ${msg.user === 'You' ? 'bg-green-400 self-end ml-auto' : 'bg-blue-400'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: [
                                            msg.user,
                                            ": "
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.js",
                                        lineNumber: 153,
                                        columnNumber: 15
                                    }, this),
                                    msg.text
                                ]
                            }, index, true, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 152,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/page.js",
                        lineNumber: 150,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center space-x-2 mt-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                className: "flex-grow p-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-400",
                                placeholder: "Type your message...",
                                value: newMessage,
                                onChange: (e)=>setNewMessage(e.target.value),
                                onKeyPress: (e)=>e.key === 'Enter' && handleSend()
                            }, void 0, false, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 158,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600",
                                onClick: handleSend,
                                children: "Send"
                            }, void 0, false, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 166,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.js",
                        lineNumber: 157,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.js",
                lineNumber: 148,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-4/5 mt-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-bold",
                        children: "Database"
                    }, void 0, false, {
                        fileName: "[project]/app/page.js",
                        lineNumber: 177,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 space-y-4",
                        children: posts.map((post)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 border border-gray-400 rounded-lg bg-gray-900",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-semibold",
                                        children: post.title
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.js",
                                        lineNumber: 181,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm",
                                        children: post.text
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.js",
                                        lineNumber: 182,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex space-x-2 mt-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: `px-4 py-2 rounded-lg text-white ${post.liked ? 'bg-red-500' : 'bg-blue-500'}`,
                                                onClick: ()=>toggleLike(post.id),
                                                children: [
                                                    post.liked ? 'Unlike 👎' : 'Like 👍',
                                                    " (",
                                                    post.likes,
                                                    ")"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.js",
                                                lineNumber: 184,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "bg-yellow-500 px-4 py-2 rounded-lg text-white",
                                                onClick: ()=>addComment(post.id),
                                                children: "💬 Comment"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.js",
                                                lineNumber: 190,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "bg-green-500 px-4 py-2 rounded-lg text-white",
                                                onClick: ()=>viewComments(post.id),
                                                children: [
                                                    "💬 View Comments (",
                                                    post.comments.length,
                                                    ")"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.js",
                                                lineNumber: 196,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "bg-gray-600 px-4 py-2 rounded-lg text-white",
                                                onClick: ()=>sharePost(post.id),
                                                children: "🔗 Share"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.js",
                                                lineNumber: 202,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: `px-4 py-2 rounded-lg text-white ${post.bookmarked ? 'bg-purple-500' : 'bg-gray-500'}`,
                                                onClick: ()=>toggleBookmark(post.id),
                                                children: post.bookmarked ? 'Unbookmark ❌' : 'Bookmark 📌'
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.js",
                                                lineNumber: 208,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.js",
                                        lineNumber: 183,
                                        columnNumber: 15
                                    }, this),
                                    viewingCommentsForPost === post.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "font-semibold",
                                                children: "Comments:"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.js",
                                                lineNumber: 218,
                                                columnNumber: 19
                                            }, this),
                                            post.comments.length > 0 ? post.comments.map((comment, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-2 bg-gray-800 rounded-lg mt-2",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm",
                                                        children: comment
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.js",
                                                        lineNumber: 222,
                                                        columnNumber: 25
                                                    }, this)
                                                }, index, false, {
                                                    fileName: "[project]/app/page.js",
                                                    lineNumber: 221,
                                                    columnNumber: 23
                                                }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-400",
                                                children: "No comments yet."
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.js",
                                                lineNumber: 226,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.js",
                                        lineNumber: 217,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, post.id, true, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 180,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/page.js",
                        lineNumber: 178,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.js",
                lineNumber: 176,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-4/5 mt-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/bookmark",
                    className: "bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600",
                    children: "View Bookmarked Posts"
                }, void 0, false, {
                    fileName: "[project]/app/page.js",
                    lineNumber: 237,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.js",
                lineNumber: 236,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-4/5 mt-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/history",
                    className: "bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600",
                    children: "View Liked Posts History"
                }, void 0, false, {
                    fileName: "[project]/app/page.js",
                    lineNumber: 244,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.js",
                lineNumber: 243,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-4/5 mt-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/postingarea",
                    className: "bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600",
                    children: "Go to Posting Area"
                }, void 0, false, {
                    fileName: "[project]/app/page.js",
                    lineNumber: 251,
                    columnNumber: 3
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.js",
                lineNumber: 250,
                columnNumber: 1
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.js",
        lineNumber: 146,
        columnNumber: 5
    }, this);
}
_s(Home, "mfgkgscR+5Ymb9TpDUBe5CuJPzE=");
_c = Home;
var _c;
__turbopack_refresh__.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/page.js [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=app_page_49c625.js.map
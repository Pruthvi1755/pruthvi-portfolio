import{r as n,j as e}from"./motion-D7XEHKlI.js";import{b as c}from"./projects--8HG_GSc.js";import{c as s,u as m}from"./index-DSiJQUKl.js";import"./react-vendor-C4Li38bQ.js";import"./store-DvsV79UQ.js";/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=s("BookOpen",[["path",{d:"M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z",key:"vv98re"}],["path",{d:"M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",key:"1cyq3y"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=s("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=s("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=s("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=s("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=s("RotateCcw",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=s("Share",[["path",{d:"M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8",key:"1b2hhj"}],["polyline",{points:"16 6 12 2 8 6",key:"m901s6"}],["line",{x1:"12",x2:"12",y1:"2",y2:"15",key:"1p0rca"}]]);function M(){const{safariUrl:a,setSafariUrl:x}=m(),[d,l]=n.useState(a),[i,o]=n.useState(a);n.useEffect(()=>{l(a),o(a)},[a]);const h=t=>{const r=t.includes(".")&&!t.startsWith("http")?`https://${t}`:t;l(t),x(t),r.startsWith("http")&&window.open(r,"_blank")},p=t=>{t.key==="Enter"&&h(i)};return e.jsxs("div",{className:"flex flex-col h-full bg-[#1a1a1c]",children:[e.jsxs("div",{className:"flex items-center gap-2 px-3 py-2 border-b border-white/8 bg-[#242426]",children:[e.jsx("button",{className:"text-white/45 hover:text-white/75 transition-colors p-1",children:e.jsx(u,{size:14})}),e.jsx("button",{className:"text-white/30 p-1 cursor-not-allowed",children:e.jsx(f,{size:16})}),e.jsx("button",{className:"text-white/30 p-1 cursor-not-allowed",children:e.jsx(b,{size:16})}),e.jsxs("div",{className:"flex-1 flex items-center gap-2 bg-white/8 rounded-lg px-3 py-1.5 border border-white/8",children:[e.jsx("div",{className:"w-2 h-2 rounded-full bg-green-500 opacity-60"}),e.jsx("input",{type:"text",value:i,onChange:t=>o(t.target.value),onKeyDown:p,className:"flex-1 bg-transparent text-white/84 text-[12px] text-center outline-none placeholder:text-white/30",placeholder:"Search or enter website name","data-no-drag":!0})]}),e.jsx("button",{className:"text-white/45 hover:text-white/75 p-1 transition-colors",children:e.jsx(y,{size:14})}),e.jsx("button",{className:"text-white/45 hover:text-white/75 p-1 transition-colors",children:e.jsx(j,{size:14})}),e.jsx("button",{className:"text-white/45 hover:text-white/75 p-1 transition-colors",children:e.jsx(w,{size:14})}),e.jsx("button",{onClick:()=>h(i),className:"text-white/45 hover:text-white/75 p-1 transition-colors",children:e.jsx(g,{size:13})})]}),e.jsxs("div",{className:"flex-1 overflow-y-auto p-6","data-no-drag":!0,children:[e.jsx("h1",{className:"text-[#ff3b6b] text-xl font-bold mb-5",children:"Pruthvi's Notes"}),e.jsx("div",{children:c.map((t,r)=>e.jsxs("div",{children:[e.jsxs("div",{className:"flex gap-4 py-4",children:[e.jsx("div",{className:"w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-white/5 flex items-center justify-center relative",children:e.jsx("img",{src:t.image,alt:t.title,className:"w-full h-full object-cover"})}),e.jsxs("div",{className:"flex-1",children:[e.jsx("p",{className:"text-white/42 text-[11px] mb-1",children:t.date}),e.jsx("h3",{className:"text-white text-[13px] font-semibold leading-snug mb-2",children:t.title}),e.jsx("a",{href:t.url,target:"_blank",rel:"noopener noreferrer",className:"text-blue-400 text-[11px] hover:underline flex items-center gap-1",children:"Check out the full post ->"})]})]}),r<c.length-1&&e.jsx("div",{className:"border-b border-white/6"})]},t.id))}),e.jsxs("div",{className:"mt-6 p-4 rounded-xl border border-white/8 bg-white/4",children:[e.jsx("h2",{className:"text-white/82 text-sm font-semibold mb-2",children:"About the Author"}),e.jsx("p",{className:"text-white/45 text-[11px] leading-relaxed",children:"Computer Science Engineering student focused on AI/ML, data science, and building full-stack systems that turn data into useful products. Exploring machine learning pipelines, fraud detection, analytics dashboards, and practical backend APIs."})]}),e.jsx("p",{className:"text-white/25 text-[10px] text-center mt-4",children:d})]})]})}export{M as SafariApp};

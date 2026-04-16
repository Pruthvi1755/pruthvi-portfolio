import{j as e,m as t}from"./motion-D7XEHKlI.js";import{g as c}from"./projects--8HG_GSc.js";import{c as r}from"./index-DSiJQUKl.js";import{I as n}from"./image-D6q-y_v5.js";import"./react-vendor-C4Li38bQ.js";import"./store-DvsV79UQ.js";/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=r("Heart",[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",key:"c3ymky"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i=r("Images",[["path",{d:"M18 22H4a2 2 0 0 1-2-2V6",key:"pblm9e"}],["path",{d:"m22 13-1.296-1.296a2.41 2.41 0 0 0-3.408 0L11 18",key:"nf6bnh"}],["circle",{cx:"12",cy:"8",r:"2",key:"1822b1"}],["rect",{width:"16",height:"16",x:"6",y:"2",rx:"2",key:"12espp"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d=r("MapPin",[["path",{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z",key:"2oe9fu"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=r("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]),h=[{label:"Library",Icon:i},{label:"Memories",Icon:n},{label:"Places",Icon:d},{label:"People",Icon:m},{label:"Favorites",Icon:p}],x=["col-span-2 row-span-2","col-span-1 row-span-2","col-span-1 row-span-1","col-span-2 row-span-1","col-span-1 row-span-1","col-span-1 row-span-1","col-span-1 row-span-1","col-span-1 row-span-1","col-span-1 row-span-1","col-span-1 row-span-1"];function k(){return e.jsxs("div",{className:"flex h-full bg-[#282929] text-white",children:[e.jsxs("aside",{className:"w-48 flex-shrink-0 bg-[#2d2e2e] border-r border-black/20 px-5 py-5",children:[e.jsx("p",{className:"text-white/28 text-[12px] font-semibold mb-4",children:"Photos"}),e.jsx("nav",{className:"space-y-2",children:h.map(({label:a,Icon:s},o)=>{const l=o===0;return e.jsxs("button",{className:`w-full h-9 flex items-center gap-3 rounded-md px-3 text-[14px] transition-colors ${l?"bg-white/13 text-white":"text-white hover:bg-white/7"}`,"data-no-drag":!0,children:[e.jsx(s,{size:16,className:"text-[#0a84ff]"}),e.jsx("span",{children:a})]},a)})})]}),e.jsx("main",{className:"flex-1 min-w-0 bg-[#202121] px-5 py-5 overflow-y-auto","data-no-drag":!0,children:e.jsx("div",{className:"grid grid-cols-3 auto-rows-[125px] gap-3",children:c.map((a,s)=>e.jsx(t.button,{whileHover:{scale:1.012},whileTap:{scale:.992},transition:{type:"spring",stiffness:420,damping:32},className:`${x[s]??"col-span-1 row-span-1"} overflow-hidden rounded-lg bg-white/5`,children:e.jsx("img",{src:a.url,alt:a.alt,className:"w-full h-full object-cover",loading:s>3?"lazy":"eager",draggable:!1})},a.id))})})]})}export{k as GalleryApp};

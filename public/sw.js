if(!self.define){let e,a={};const s=(s,c)=>(s=new URL(s+".js",c).href,a[s]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=a,document.head.appendChild(e)}else e=s,importScripts(s),a()})).then((()=>{let e=a[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(c,i)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(a[n])return;let d={};const t=e=>s(e,n),r={module:{uri:n},exports:d,require:t};a[n]=Promise.all(c.map((e=>r[e]||t(e)))).then((e=>(i(...e),d)))}}define(["./workbox-50de5c5d"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/Sheffield_FC.svg.png",revision:"70f8b47af88bf1e66ae4fac32351a1a0"},{url:"/_next/static/cZSvosEVY_H_7sYDFTPf9/_buildManifest.js",revision:"d5481ed4e9e1c7c3369a5308a0f045ef"},{url:"/_next/static/cZSvosEVY_H_7sYDFTPf9/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/110-0b4d2e46929cbe98.js",revision:"0b4d2e46929cbe98"},{url:"/_next/static/chunks/239-61d2cc2ddfa861b2.js",revision:"61d2cc2ddfa861b2"},{url:"/_next/static/chunks/243-28d8baa7ca6d2a13.js",revision:"28d8baa7ca6d2a13"},{url:"/_next/static/chunks/536-1c9c408ed1029669.js",revision:"1c9c408ed1029669"},{url:"/_next/static/chunks/537-a00337817a493b5f.js",revision:"a00337817a493b5f"},{url:"/_next/static/chunks/573-dd6eb8497d3afcde.js",revision:"dd6eb8497d3afcde"},{url:"/_next/static/chunks/664-b63d0d8c80f30c87.js",revision:"b63d0d8c80f30c87"},{url:"/_next/static/chunks/675-0473debd371673fd.js",revision:"0473debd371673fd"},{url:"/_next/static/chunks/729-3054c841eeeb1249.js",revision:"3054c841eeeb1249"},{url:"/_next/static/chunks/79-7b2aba2ceb5dd00a.js",revision:"7b2aba2ceb5dd00a"},{url:"/_next/static/chunks/7b4c598c-ff48fde418e288f3.js",revision:"ff48fde418e288f3"},{url:"/_next/static/chunks/843-72a6938f2fe5dc2f.js",revision:"72a6938f2fe5dc2f"},{url:"/_next/static/chunks/850.1a94e9843341e167.js",revision:"1a94e9843341e167"},{url:"/_next/static/chunks/89-690e5dbd36ebedd7.js",revision:"690e5dbd36ebedd7"},{url:"/_next/static/chunks/903-b4651336cd392ce4.js",revision:"b4651336cd392ce4"},{url:"/_next/static/chunks/954-b3691986dd6a2c2b.js",revision:"b3691986dd6a2c2b"},{url:"/_next/static/chunks/fec483df-34f1dff269fd0623.js",revision:"34f1dff269fd0623"},{url:"/_next/static/chunks/framework-467b11a89995b152.js",revision:"467b11a89995b152"},{url:"/_next/static/chunks/main-7f47a74109a83f62.js",revision:"7f47a74109a83f62"},{url:"/_next/static/chunks/pages/UIComponents/bottomNav-850acd38ad02032d.js",revision:"850acd38ad02032d"},{url:"/_next/static/chunks/pages/UIComponents/dialogs/alertz-b3caae56a5c0ef5d.js",revision:"b3caae56a5c0ef5d"},{url:"/_next/static/chunks/pages/UIComponents/dialogs/error-a5e9a59f85b1ddcc.js",revision:"a5e9a59f85b1ddcc"},{url:"/_next/static/chunks/pages/UIComponents/dialogs/historydx-fc8225fcd872755c.js",revision:"fc8225fcd872755c"},{url:"/_next/static/chunks/pages/UIComponents/dialogs/success-f88a2506a27aad42.js",revision:"f88a2506a27aad42"},{url:"/_next/static/chunks/pages/UIComponents/dialogs/swapic-f08c42d641029f3a.js",revision:"f08c42d641029f3a"},{url:"/_next/static/chunks/pages/UIComponents/dialogs/warning-42f850c40067efa2.js",revision:"42f850c40067efa2"},{url:"/_next/static/chunks/pages/_app-dba530a9022fb32a.js",revision:"dba530a9022fb32a"},{url:"/_next/static/chunks/pages/_error-a59e2db023c5e431.js",revision:"a59e2db023c5e431"},{url:"/_next/static/chunks/pages/dashboard-4a2447d9a53a10da.js",revision:"4a2447d9a53a10da"},{url:"/_next/static/chunks/pages/dashboard/account-9096c44ac758e2a2.js",revision:"9096c44ac758e2a2"},{url:"/_next/static/chunks/pages/dashboard/bets-a62e9d7854e7dc4b.js",revision:"a62e9d7854e7dc4b"},{url:"/_next/static/chunks/pages/dashboard/bind-6ea5cb7e5a294cf5.js",revision:"6ea5cb7e5a294cf5"},{url:"/_next/static/chunks/pages/dashboard/bind/success-b4bc5599c51ea964.js",revision:"b4bc5599c51ea964"},{url:"/_next/static/chunks/pages/dashboard/codesetting-b8ba690607f1e9be.js",revision:"b8ba690607f1e9be"},{url:"/_next/static/chunks/pages/dashboard/event-b64d64af37555547.js",revision:"b64d64af37555547"},{url:"/_next/static/chunks/pages/dashboard/fund-bf66c8b34be27650.js",revision:"bf66c8b34be27650"},{url:"/_next/static/chunks/pages/dashboard/fund/address-57a639d02b305de2.js",revision:"57a639d02b305de2"},{url:"/_next/static/chunks/pages/dashboard/fund/success-9dd9c0c2f5a1a888.js",revision:"9dd9c0c2f5a1a888"},{url:"/_next/static/chunks/pages/dashboard/fund/upload-64ff6f6f65389615.js",revision:"64ff6f6f65389615"},{url:"/_next/static/chunks/pages/dashboard/history-cfc0cdc4a0a06127.js",revision:"cfc0cdc4a0a06127"},{url:"/_next/static/chunks/pages/dashboard/match/%5Bid%5D-905e75f0f303720f.js",revision:"905e75f0f303720f"},{url:"/_next/static/chunks/pages/dashboard/referral-3d676755786d105a.js",revision:"3d676755786d105a"},{url:"/_next/static/chunks/pages/dashboard/transactions-acbb6ea83f6f8508.js",revision:"acbb6ea83f6f8508"},{url:"/_next/static/chunks/pages/dashboard/withdraw-dd88e5655f7969aa.js",revision:"dd88e5655f7969aa"},{url:"/_next/static/chunks/pages/dashboard/withdraw/success-d5904728aa7613d7.js",revision:"d5904728aa7613d7"},{url:"/_next/static/chunks/pages/index-3ba04cb25904b68d.js",revision:"3ba04cb25904b68d"},{url:"/_next/static/chunks/pages/login-e06c53bf32bcfe96.js",revision:"e06c53bf32bcfe96"},{url:"/_next/static/chunks/pages/register/%5Bid%5D-0e38b0741a4a0e47.js",revision:"0e38b0741a4a0e47"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-6c5511afd51ab7ad.js",revision:"6c5511afd51ab7ad"},{url:"/_next/static/css/d2c27356cede8e46.css",revision:"d2c27356cede8e46"},{url:"/_next/static/media/10939feefdad71be-s.woff2",revision:"72b3ae37567ee5efdf2254b657c36ba9"},{url:"/_next/static/media/15bbcc9e7efef9a9-s.p.woff2",revision:"954f16b87b54ed7c7d526c39625c459c"},{url:"/_next/static/media/3828f203592f7603-s.woff2",revision:"e9fd398a43c9e51f9ee14e757eaf95d9"},{url:"/_next/static/media/591327bf3b62a611-s.woff2",revision:"0ed299a4bb5262e17e2145783b2c18f1"},{url:"/_next/static/media/87c72f23c47212b9-s.woff2",revision:"790d0c8dbcd491d29d58f1369c199d40"},{url:"/_next/static/media/916d3686010a8de2-s.p.woff2",revision:"9212f6f9860f9fc6c69b02fedf6db8c3"},{url:"/_next/static/media/953974ac5e9ff354-s.woff2",revision:"6731e1ba3788bda094c89ee8fc131aef"},{url:"/_next/static/media/Sheffield_FC.svg.dc60d333.png",revision:"70f8b47af88bf1e66ae4fac32351a1a0"},{url:"/_next/static/media/aa7134f068b18764-s.p.woff2",revision:"cd8ad1522c0410b8ceda219c25c59308"},{url:"/_next/static/media/avatar.55c55361.png",revision:"9e140410c81aba4b3a83a400ed5aebcc"},{url:"/_next/static/media/badge.bb8123da.png",revision:"e6d498e2b70da3f50587d8b11e01503c"},{url:"/_next/static/media/ball.e2f25b23.png",revision:"bd0d730892aee4916cb6060fd0db1472"},{url:"/_next/static/media/barcode.1be133a1.png",revision:"16e802a28e07ff371983396ee83f9324"},{url:"/_next/static/media/bball.8c097924.png",revision:"159559445d1fd39eb79d235afa353db4"},{url:"/_next/static/media/c04551857776278f-s.p.woff2",revision:"8d91ec1ca2d8b56640a47117e313a3e9"},{url:"/_next/static/media/cup1.c84ee9e3.png",revision:"160bb8e3ee575295061e3ba3a4cf831d"},{url:"/_next/static/media/cup3.6bad9f8d.png",revision:"aec68830ea9019d9301342e155d226d0"},{url:"/_next/static/media/d869208648ca5469-s.p.woff2",revision:"72993dddf88a63e8f226656f7de88e57"},{url:"/_next/static/media/depx.d5f7323a.png",revision:"14c91adf9de0c1a12185f53512294b74"},{url:"/_next/static/media/e025c64520263018-s.woff2",revision:"dc820d9f0f62811268590ff631f36be9"},{url:"/_next/static/media/success.8895daa2.png",revision:"9fe31fb91271eccfa7766a4dfd19304b"},{url:"/_next/static/media/team_connect.bd270b76.png",revision:"ff588a14fd49dfbbdf771360e2dd39c5"},{url:"/_next/static/media/tether.cb1e14f9.jpg",revision:"fec788e34f2da1af1ddc69fb46216ef6"},{url:"/_next/static/media/warn.a8856106.png",revision:"40d24ef83d6d225945c38da4c42354ea"},{url:"/_next/static/media/wig.51e5cc96.png",revision:"949b49fa2edfcbe64285f97af52c1b35"},{url:"/avatar.png",revision:"9e140410c81aba4b3a83a400ed5aebcc"},{url:"/ball.png",revision:"bd0d730892aee4916cb6060fd0db1472"},{url:"/barcode.png",revision:"16e802a28e07ff371983396ee83f9324"},{url:"/bball.png",revision:"159559445d1fd39eb79d235afa353db4"},{url:"/cup1.png",revision:"160bb8e3ee575295061e3ba3a4cf831d"},{url:"/cup3.png",revision:"aec68830ea9019d9301342e155d226d0"},{url:"/depx.png",revision:"14c91adf9de0c1a12185f53512294b74"},{url:"/favicon.ico",revision:"c30c7d42707a47a3f4591831641e50dc"},{url:"/font/lightpops.woff2",revision:"cd8ad1522c0410b8ceda219c25c59308"},{url:"/font/poppins.woff2",revision:"954f16b87b54ed7c7d526c39625c459c"},{url:"/icon/Vector.png",revision:"c452be6964ae90d35dc13ecd17d54431"},{url:"/icon/ant-design_link-outlined.png",revision:"49a532b660908d961401b1186a2b249c"},{url:"/icon/badge.png",revision:"e6d498e2b70da3f50587d8b11e01503c"},{url:"/icon/bet.png",revision:"4fa25e9a60c7ac3c5492f59bcd589404"},{url:"/icon/depos.png",revision:"43965fc56ca52ed0caa499a9b17b9a9e"},{url:"/icon/faq.png",revision:"e84f77122f0e2b0ec5b7c27f98bdf68f"},{url:"/icon/inter.png",revision:"9c9303810e6da5ad3c91346327cc1c3c"},{url:"/icon/ion_copy.png",revision:"91e2c0230a3ca432d8f6c14dc2c8d246"},{url:"/icon/lock.png",revision:"52d9d277a8aa1e2acb63391b837524a3"},{url:"/icon/out.png",revision:"e78b38014605cc0b159ebef3e6eac7e8"},{url:"/icon/rounds.png",revision:"6e516efb1636e88bfc2ad3aeb55c14bd"},{url:"/icon/steam.png",revision:"3fc9667be0a1b7975987d2507a89f417"},{url:"/icon/steamw.png",revision:"ff41298946780f638309a3f866f05232"},{url:"/icon/tel.png",revision:"2a509a56c34537fe685f257ca26d9b03"},{url:"/icon/tshow.png",revision:"d66c3a2e08e89fa47e532d941f0c9769"},{url:"/icon/vault.png",revision:"fb771d908c16a2eecade5171d21882b9"},{url:"/icon/wig.png",revision:"949b49fa2edfcbe64285f97af52c1b35"},{url:"/icon/wsuccess.png",revision:"db0a7bbe2b7ae43826efff5139e5daf1"},{url:"/icon512_maskable.png",revision:"83e46a547d7ee03c4bb19a100e6b715c"},{url:"/icon512_rounded.png",revision:"4cbeec4ec61c4e095d6cfcdd0b390a4c"},{url:"/logosfc.svg",revision:"a1d94c6fe571f0d044b0875d3604bf9b"},{url:"/manifest.json",revision:"c2efdd5624ff1562e5b14bbebe82fc15"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/success.png",revision:"9fe31fb91271eccfa7766a4dfd19304b"},{url:"/team_connect.png",revision:"ff588a14fd49dfbbdf771360e2dd39c5"},{url:"/testing.png",revision:"4eb4925f81ebda0b4222238611780838"},{url:"/tether.jpg",revision:"fec788e34f2da1af1ddc69fb46216ef6"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"},{url:"/warn.png",revision:"40d24ef83d6d225945c38da4c42354ea"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:a,event:s,state:c})=>a&&"opaqueredirect"===a.type?new Response(a.body,{status:200,statusText:"OK",headers:a.headers}):a}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const a=e.pathname;return!a.startsWith("/api/auth/")&&!!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));

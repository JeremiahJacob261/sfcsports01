if(!self.define){let e,s={};const a=(a,c)=>(a=new URL(a+".js",c).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,i)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let o={};const d=e=>a(e,n),r={module:{uri:n},exports:o,require:d};s[n]=Promise.all(c.map((e=>r[e]||d(e)))).then((e=>(i(...e),o)))}}define(["./workbox-50de5c5d"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/Sheffield_FC.svg.png",revision:"70f8b47af88bf1e66ae4fac32351a1a0"},{url:"/_next/static/chunks/1233-eb65d1a79ae61694.js",revision:"eb65d1a79ae61694"},{url:"/_next/static/chunks/1664-550e089b680a072b.js",revision:"550e089b680a072b"},{url:"/_next/static/chunks/1954-f5af7bdd8adef525.js",revision:"f5af7bdd8adef525"},{url:"/_next/static/chunks/2118-7751e9f43d3ad4ad.js",revision:"7751e9f43d3ad4ad"},{url:"/_next/static/chunks/2501-aa564585553949cf.js",revision:"aa564585553949cf"},{url:"/_next/static/chunks/2685-25be7e20267bf69a.js",revision:"25be7e20267bf69a"},{url:"/_next/static/chunks/356-7e9b18b2268623a3.js",revision:"7e9b18b2268623a3"},{url:"/_next/static/chunks/3581-d53db5ee31317950.js",revision:"d53db5ee31317950"},{url:"/_next/static/chunks/4034-4b32bd39158bbe80.js",revision:"4b32bd39158bbe80"},{url:"/_next/static/chunks/4274-404602d72accb9cd.js",revision:"404602d72accb9cd"},{url:"/_next/static/chunks/4917-0fe512fe99179263.js",revision:"0fe512fe99179263"},{url:"/_next/static/chunks/5573-ca608692ea315c4e.js",revision:"ca608692ea315c4e"},{url:"/_next/static/chunks/5675-46b0182a740430bc.js",revision:"46b0182a740430bc"},{url:"/_next/static/chunks/5843-74f584fdd1af098b.js",revision:"74f584fdd1af098b"},{url:"/_next/static/chunks/7406-02fa9dc19d4b6c25.js",revision:"02fa9dc19d4b6c25"},{url:"/_next/static/chunks/7656-a04f42b6bfa790d5.js",revision:"a04f42b6bfa790d5"},{url:"/_next/static/chunks/7739-ba42c490941c34aa.js",revision:"ba42c490941c34aa"},{url:"/_next/static/chunks/7813-8ae5d9346a250b89.js",revision:"8ae5d9346a250b89"},{url:"/_next/static/chunks/7850.897184398bf2b5cb.js",revision:"897184398bf2b5cb"},{url:"/_next/static/chunks/7861-0dddec45dd94b465.js",revision:"0dddec45dd94b465"},{url:"/_next/static/chunks/7b4c598c-fda9ccff7954c264.js",revision:"fda9ccff7954c264"},{url:"/_next/static/chunks/8456-c6ac1f2e044ce160.js",revision:"c6ac1f2e044ce160"},{url:"/_next/static/chunks/89-690e5dbd36ebedd7.js",revision:"690e5dbd36ebedd7"},{url:"/_next/static/chunks/fec483df-ed779ce1028b7b0c.js",revision:"ed779ce1028b7b0c"},{url:"/_next/static/chunks/framework-ca706bf673a13738.js",revision:"ca706bf673a13738"},{url:"/_next/static/chunks/main-46c09b2dde30cc08.js",revision:"46c09b2dde30cc08"},{url:"/_next/static/chunks/pages/UIComponents/bottomNav-a4ee041c2c33ce95.js",revision:"a4ee041c2c33ce95"},{url:"/_next/static/chunks/pages/UIComponents/dialogs/alertz-73a73fdb385ae9ec.js",revision:"73a73fdb385ae9ec"},{url:"/_next/static/chunks/pages/UIComponents/dialogs/error-b5d0c1cedcbefb49.js",revision:"b5d0c1cedcbefb49"},{url:"/_next/static/chunks/pages/UIComponents/dialogs/success-b82bc65afa0d98be.js",revision:"b82bc65afa0d98be"},{url:"/_next/static/chunks/pages/UIComponents/dialogs/swapic-28e276ab2da4bc03.js",revision:"28e276ab2da4bc03"},{url:"/_next/static/chunks/pages/UIComponents/dialogs/warning-54ca1fc72b2f9df7.js",revision:"54ca1fc72b2f9df7"},{url:"/_next/static/chunks/pages/_app-f2218764c2a40132.js",revision:"f2218764c2a40132"},{url:"/_next/static/chunks/pages/_error-e4216aab802f5810.js",revision:"e4216aab802f5810"},{url:"/_next/static/chunks/pages/dashboard-077cfd9d195a3b02.js",revision:"077cfd9d195a3b02"},{url:"/_next/static/chunks/pages/dashboard/account-b209e91e64f54b7f.js",revision:"b209e91e64f54b7f"},{url:"/_next/static/chunks/pages/dashboard/betdetails-c74162dcb4d284d9.js",revision:"c74162dcb4d284d9"},{url:"/_next/static/chunks/pages/dashboard/bets-dda3a104351c231b.js",revision:"dda3a104351c231b"},{url:"/_next/static/chunks/pages/dashboard/bind-d8099d5b924a51b5.js",revision:"d8099d5b924a51b5"},{url:"/_next/static/chunks/pages/dashboard/bind/success-9bcb03519bdb2999.js",revision:"9bcb03519bdb2999"},{url:"/_next/static/chunks/pages/dashboard/changepassword-d436ff07449fe691.js",revision:"d436ff07449fe691"},{url:"/_next/static/chunks/pages/dashboard/codesetting-456c1ff5ebd0ebbf.js",revision:"456c1ff5ebd0ebbf"},{url:"/_next/static/chunks/pages/dashboard/event-8f0fcb3908b1851d.js",revision:"8f0fcb3908b1851d"},{url:"/_next/static/chunks/pages/dashboard/fund-97e424930a7dfcb5.js",revision:"97e424930a7dfcb5"},{url:"/_next/static/chunks/pages/dashboard/fund/address-86e83b527ef12d94.js",revision:"86e83b527ef12d94"},{url:"/_next/static/chunks/pages/dashboard/fund/success-e5bf71b0d168d1d9.js",revision:"e5bf71b0d168d1d9"},{url:"/_next/static/chunks/pages/dashboard/fund/upload-134555d9cf61bd5d.js",revision:"134555d9cf61bd5d"},{url:"/_next/static/chunks/pages/dashboard/history-97d4b09a9c0533c2.js",revision:"97d4b09a9c0533c2"},{url:"/_next/static/chunks/pages/dashboard/matchs/%5Bid%5D-8b295ce3c9225bb2.js",revision:"8b295ce3c9225bb2"},{url:"/_next/static/chunks/pages/dashboard/promotion-2e9dec1bf83c6908.js",revision:"2e9dec1bf83c6908"},{url:"/_next/static/chunks/pages/dashboard/promotion/claim_signup_bonus-87dceb4cbffe02e4.js",revision:"87dceb4cbffe02e4"},{url:"/_next/static/chunks/pages/dashboard/referral-4291203ab1c0aaf6.js",revision:"4291203ab1c0aaf6"},{url:"/_next/static/chunks/pages/dashboard/transactions-e0d592ccc82d4531.js",revision:"e0d592ccc82d4531"},{url:"/_next/static/chunks/pages/dashboard/withdraw-12a78ca4bd0f011b.js",revision:"12a78ca4bd0f011b"},{url:"/_next/static/chunks/pages/dashboard/withdraw/success-a01de0d430416f8d.js",revision:"a01de0d430416f8d"},{url:"/_next/static/chunks/pages/faq-c5cb80f9ab43bdc3.js",revision:"c5cb80f9ab43bdc3"},{url:"/_next/static/chunks/pages/footer-64ba3fb396a0e97b.js",revision:"64ba3fb396a0e97b"},{url:"/_next/static/chunks/pages/index-8b438b2fed30d493.js",revision:"8b438b2fed30d493"},{url:"/_next/static/chunks/pages/login-2c8e6dc320c82fe9.js",revision:"2c8e6dc320c82fe9"},{url:"/_next/static/chunks/pages/register-f7f54416031060f6.js",revision:"f7f54416031060f6"},{url:"/_next/static/chunks/pages/translator-abdcdaf51ce37e29.js",revision:"abdcdaf51ce37e29"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-6f93584c728db402.js",revision:"6f93584c728db402"},{url:"/_next/static/css/6acaae5c54232986.css",revision:"6acaae5c54232986"},{url:"/_next/static/css/ae4ed9c503fd1e33.css",revision:"ae4ed9c503fd1e33"},{url:"/_next/static/media/10939feefdad71be-s.woff2",revision:"72b3ae37567ee5efdf2254b657c36ba9"},{url:"/_next/static/media/15bbcc9e7efef9a9-s.p.woff2",revision:"954f16b87b54ed7c7d526c39625c459c"},{url:"/_next/static/media/3828f203592f7603-s.woff2",revision:"e9fd398a43c9e51f9ee14e757eaf95d9"},{url:"/_next/static/media/591327bf3b62a611-s.woff2",revision:"0ed299a4bb5262e17e2145783b2c18f1"},{url:"/_next/static/media/87c72f23c47212b9-s.woff2",revision:"790d0c8dbcd491d29d58f1369c199d40"},{url:"/_next/static/media/916d3686010a8de2-s.p.woff2",revision:"9212f6f9860f9fc6c69b02fedf6db8c3"},{url:"/_next/static/media/953974ac5e9ff354-s.woff2",revision:"6731e1ba3788bda094c89ee8fc131aef"},{url:"/_next/static/media/Sheffield_FC.svg.dc60d333.png",revision:"70f8b47af88bf1e66ae4fac32351a1a0"},{url:"/_next/static/media/aa7134f068b18764-s.p.woff2",revision:"cd8ad1522c0410b8ceda219c25c59308"},{url:"/_next/static/media/avatar.55c55361.png",revision:"9e140410c81aba4b3a83a400ed5aebcc"},{url:"/_next/static/media/badge.bb8123da.png",revision:"e6d498e2b70da3f50587d8b11e01503c"},{url:"/_next/static/media/ball.e2f25b23.png",revision:"bd0d730892aee4916cb6060fd0db1472"},{url:"/_next/static/media/bankbri.262e90cb.jpg",revision:"42988dd2b3a8c27e5f754d4e48e3e62a"},{url:"/_next/static/media/barcode.1be133a1.png",revision:"16e802a28e07ff371983396ee83f9324"},{url:"/_next/static/media/c04551857776278f-s.p.woff2",revision:"8d91ec1ca2d8b56640a47117e313a3e9"},{url:"/_next/static/media/cara01.cd7def83.jpg",revision:"3483b213d01c48b51b96a1f2d4d0bccc"},{url:"/_next/static/media/cara02.61505d57.jpg",revision:"49c00bac8d685c949d2660094f4015c7"},{url:"/_next/static/media/cara03.4c179b1e.jpg",revision:"499678a96d6e09092124734290d204df"},{url:"/_next/static/media/cara04.4f965815.jpg",revision:"1ba1f691cbb735df84d7864fe6750be6"},{url:"/_next/static/media/cert (1).49e1ff71.jpg",revision:"f2f5547f11be7ce3b17cef48c3c6a2b8"},{url:"/_next/static/media/cert (2).7fc39c6b.jpg",revision:"afc9b024bc057f7ea39126753478871e"},{url:"/_next/static/media/cert (3).5e1dc312.jpg",revision:"273241c035f9ba1fc31b62d4ecaf1056"},{url:"/_next/static/media/cup1.c84ee9e3.png",revision:"160bb8e3ee575295061e3ba3a4cf831d"},{url:"/_next/static/media/cup3.6bad9f8d.png",revision:"aec68830ea9019d9301342e155d226d0"},{url:"/_next/static/media/d869208648ca5469-s.p.woff2",revision:"72993dddf88a63e8f226656f7de88e57"},{url:"/_next/static/media/e025c64520263018-s.woff2",revision:"dc820d9f0f62811268590ff631f36be9"},{url:"/_next/static/media/success.8895daa2.png",revision:"9fe31fb91271eccfa7766a4dfd19304b"},{url:"/_next/static/media/team_connect.bd270b76.png",revision:"ff588a14fd49dfbbdf771360e2dd39c5"},{url:"/_next/static/media/tether.cb1e14f9.jpg",revision:"fec788e34f2da1af1ddc69fb46216ef6"},{url:"/_next/static/media/warn.a8856106.png",revision:"40d24ef83d6d225945c38da4c42354ea"},{url:"/_next/static/media/wig.51e5cc96.png",revision:"949b49fa2edfcbe64285f97af52c1b35"},{url:"/_next/static/prulSsxWnRBBWSbQM5_aP/_buildManifest.js",revision:"eaeb8e60ae47bc22fff0fe8de93ae476"},{url:"/_next/static/prulSsxWnRBBWSbQM5_aP/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/assets/scripts/lang-config.js",revision:"f09a1094b8771e4a2edd3f551fa114a6"},{url:"/assets/scripts/translation.js",revision:"9e48bdc804c4c9fcadf3c29a02e614b5"},{url:"/avatar.png",revision:"9e140410c81aba4b3a83a400ed5aebcc"},{url:"/ball.png",revision:"bd0d730892aee4916cb6060fd0db1472"},{url:"/bankbri.jpg",revision:"42988dd2b3a8c27e5f754d4e48e3e62a"},{url:"/barcode.png",revision:"16e802a28e07ff371983396ee83f9324"},{url:"/bball.png",revision:"159559445d1fd39eb79d235afa353db4"},{url:"/cara01.jpg",revision:"3483b213d01c48b51b96a1f2d4d0bccc"},{url:"/cara02.jpg",revision:"49c00bac8d685c949d2660094f4015c7"},{url:"/cara03.jpg",revision:"499678a96d6e09092124734290d204df"},{url:"/cara04.jpg",revision:"1ba1f691cbb735df84d7864fe6750be6"},{url:"/cert (1).jpg",revision:"f2f5547f11be7ce3b17cef48c3c6a2b8"},{url:"/cert (2).jpg",revision:"afc9b024bc057f7ea39126753478871e"},{url:"/cert (3).jpg",revision:"273241c035f9ba1fc31b62d4ecaf1056"},{url:"/cup1.png",revision:"160bb8e3ee575295061e3ba3a4cf831d"},{url:"/cup3.png",revision:"aec68830ea9019d9301342e155d226d0"},{url:"/depx.png",revision:"14c91adf9de0c1a12185f53512294b74"},{url:"/favicon.ico",revision:"c30c7d42707a47a3f4591831641e50dc"},{url:"/font/lightpops.woff2",revision:"cd8ad1522c0410b8ceda219c25c59308"},{url:"/font/poppins.woff2",revision:"954f16b87b54ed7c7d526c39625c459c"},{url:"/icon/Vector.png",revision:"c452be6964ae90d35dc13ecd17d54431"},{url:"/icon/ant-design_link-outlined.png",revision:"49a532b660908d961401b1186a2b249c"},{url:"/icon/badge.png",revision:"e6d498e2b70da3f50587d8b11e01503c"},{url:"/icon/bet.png",revision:"4fa25e9a60c7ac3c5492f59bcd589404"},{url:"/icon/depos.png",revision:"43965fc56ca52ed0caa499a9b17b9a9e"},{url:"/icon/faq.png",revision:"e84f77122f0e2b0ec5b7c27f98bdf68f"},{url:"/icon/inter.png",revision:"9c9303810e6da5ad3c91346327cc1c3c"},{url:"/icon/ion_copy.png",revision:"91e2c0230a3ca432d8f6c14dc2c8d246"},{url:"/icon/lock.png",revision:"52d9d277a8aa1e2acb63391b837524a3"},{url:"/icon/out.png",revision:"e78b38014605cc0b159ebef3e6eac7e8"},{url:"/icon/rounds.png",revision:"6e516efb1636e88bfc2ad3aeb55c14bd"},{url:"/icon/steam.png",revision:"3fc9667be0a1b7975987d2507a89f417"},{url:"/icon/steamw.png",revision:"ff41298946780f638309a3f866f05232"},{url:"/icon/tel.png",revision:"2a509a56c34537fe685f257ca26d9b03"},{url:"/icon/tshow.png",revision:"d66c3a2e08e89fa47e532d941f0c9769"},{url:"/icon/vault.png",revision:"fb771d908c16a2eecade5171d21882b9"},{url:"/icon/wig.png",revision:"949b49fa2edfcbe64285f97af52c1b35"},{url:"/icon/wsuccess.png",revision:"db0a7bbe2b7ae43826efff5139e5daf1"},{url:"/icon512_maskable.png",revision:"83e46a547d7ee03c4bb19a100e6b715c"},{url:"/icon512_rounded.png",revision:"4cbeec4ec61c4e095d6cfcdd0b390a4c"},{url:"/locales/en/account.json",revision:"86870fef150ec6f7a115da611204ab53"},{url:"/locales/en/address.json",revision:"3c4355a40823b407a890b160b388b131"},{url:"/locales/en/all.json",revision:"f976529a257c0dbd2b8272dda70d6453"},{url:"/locales/en/betdetails.json",revision:"28c0a290a80a94cca5f359ff5a45dcaa"},{url:"/locales/en/bets.json",revision:"ac52dfbad95f01c9f4785e135cb4feba"},{url:"/locales/en/bind.json",revision:"29233a91105532f9589a6a35982add11"},{url:"/locales/en/bsuccess.json",revision:"4747a4705dd0b8e04f6d06eda45ae8f7"},{url:"/locales/en/changepassword.json",revision:"b41bdcd075c3d62bf49c0ce383438405"},{url:"/locales/en/claim.json",revision:"110ce39904d9be3d612b88fc6fd91d9e"},{url:"/locales/en/codesetting.json",revision:"ad97d3f55b1e7b55ecd212a53569ae9b"},{url:"/locales/en/common.json",revision:"2ac985a9ccde439af248229df5d5c5db"},{url:"/locales/en/commond.json",revision:"de164fa1e926c74261584705fcaf9e24"},{url:"/locales/en/dashboard.json",revision:"a0ae6d4475870f9389e344f6cd3216af"},{url:"/locales/en/dsuccess.json",revision:"533be098263ac9d2b02ce98ad582f2f9"},{url:"/locales/en/event.json",revision:"2419de79a4fc9fec4a4a8de59473fc01"},{url:"/locales/en/faq.json",revision:"993a54755e2bc18c3ef37b3b5d669e75"},{url:"/locales/en/fund.json",revision:"eca49106848dfe3d9259517f5f20bda7"},{url:"/locales/en/history.json",revision:"6c30b848883777a8c1501ff06ab7f6b1"},{url:"/locales/en/login.json",revision:"fc069fe311292204083c924685bfb4eb"},{url:"/locales/en/promotion.json",revision:"8e1d1df03934836c8220cb3546880b90"},{url:"/locales/en/referral.json",revision:"ba836b5ac439e620dac2421147c6fd89"},{url:"/locales/en/register.json",revision:"96244025af47da54c3ae3823a1d419d9"},{url:"/locales/en/transactions.json",revision:"2a0a3a28a35abc497e251745db974a75"},{url:"/locales/en/upload.json",revision:"6273855a2467450556427b46f7d94733"},{url:"/locales/en/withdraw.json",revision:"7c5d921da351f4a509955cd15a69b5fb"},{url:"/locales/en/wsuccess.json",revision:"f25bca047e9eb0a199e68ef12d0382a5"},{url:"/locales/es/account.json",revision:"9404e3bf5b675f1751ea1287366df9e0"},{url:"/locales/es/all.json",revision:"bac9dc93c0b2c0cdf1ab13e06e02f9e9"},{url:"/locales/es/betdetails.json",revision:"92ec445c39ee7efe720bb779721dcd0f"},{url:"/locales/es/bets.json",revision:"707d6978692459aa9364d54776490274"},{url:"/locales/es/bind.json",revision:"57a6265396096a6ad749fab9a9762ae3"},{url:"/locales/es/bsuccess.json",revision:"cb6d813eb6f7db8c4543075ceb6a6ce8"},{url:"/locales/es/changepassword.json",revision:"b1df7a7e90aa8caa275d4710501157db"},{url:"/locales/es/codesetting.json",revision:"b9e779ebbf623ce19a0e256f42b6f29a"},{url:"/locales/es/common.json",revision:"8294208084f6d2519a721107e5e2b7c9"},{url:"/locales/es/dashboard.json",revision:"a59e64a7262d868abd800f2a87e046d9"},{url:"/locales/es/dsuccess.json",revision:"dfef52aca9a527a0aed6257b6f83648c"},{url:"/locales/es/event.json",revision:"2c213f974f9e662627d287aa76df3632"},{url:"/locales/es/faq.json",revision:"afe9c7e073fbbc94c81e269388cb251b"},{url:"/locales/es/fund.json",revision:"3938b86aed0d38aa605e0b19a10fb686"},{url:"/locales/es/history.json",revision:"11a985aa8e8193c87e18bee04a95971d"},{url:"/locales/es/home.json",revision:"004e2245534eac5fb50594b177c41070"},{url:"/locales/es/login.json",revision:"5dee3a5aeb9535d3dcad2dc6d82e2fd7"},{url:"/locales/es/promotion.json",revision:"09246743d1cb4a7f4e677149b75699d9"},{url:"/locales/es/register.json",revision:"181feb9960d53ae4908a6c5c1da67ed0"},{url:"/locales/es/transactions.json",revision:"6be13302767d9660672df876a181957e"},{url:"/locales/es/upload.json",revision:"8282cbb56781a57e9465849263e04fe7"},{url:"/locales/es/withdraw.json",revision:"f486d78df04dc3cf4a03441933541030"},{url:"/locales/fr/account.json",revision:"165caf8e8f09302482968ffd198ed1b5"},{url:"/locales/fr/all.json",revision:"4822cc44e70e991f9d9392a594adc956"},{url:"/locales/fr/betdetails.json",revision:"b6d033149cfefba9fa2be15c50d0bbfb"},{url:"/locales/fr/bets.json",revision:"77d7ef1fabe51636e17a274589684db9"},{url:"/locales/fr/bind.json",revision:"2e6f36ba532473ab390e27d784bc8138"},{url:"/locales/fr/bsuccess.json",revision:"611fef65b2fd72942d1cb32f8e205d7d"},{url:"/locales/fr/changepassword.json",revision:"3f76e0ccf3c37625d46a1b331d701a4c"},{url:"/locales/fr/codesetting.json",revision:"62d75314582722ffaa08c0106bc2df6b"},{url:"/locales/fr/common.json",revision:"0e8301287678a3ed26628d147142fd31"},{url:"/locales/fr/dashboard.json",revision:"0b5652e758a12c0379c030163f638bf7"},{url:"/locales/fr/dsuccess.json",revision:"58c981e64a7a60052d2d56057e04824a"},{url:"/locales/fr/event.json",revision:"d67a8a244f7693764fa9c04e732989c8"},{url:"/locales/fr/faq.json",revision:"c0a91f04c774fa2f95a83ce87c7cabd1"},{url:"/locales/fr/fr/codesetting.json",revision:"05c4305922102ae639c11742cdc9ff90"},{url:"/locales/fr/fr/register.json",revision:"c58946fbe873152c68169d5658a6b8c6"},{url:"/locales/fr/fr/transactions.json",revision:"53c694465683f38dda6e4599a68a06a5"},{url:"/locales/fr/fund.json",revision:"8564f622400c3f5ec2735a702c055ab1"},{url:"/locales/fr/history.json",revision:"ccd8b31cc16747986e14ec98ea482199"},{url:"/locales/fr/login.json",revision:"6049b41d802d1641cfcd9d6b3deedde5"},{url:"/locales/fr/register.json",revision:"50626bb940c3721aab80049c5a146fe1"},{url:"/locales/fr/transactions.json",revision:"71041a322796735e61f6afe7776ac225"},{url:"/locales/fr/upload.json",revision:"77b8d219bf214985683971af3cb5d1ce"},{url:"/locales/fr/withdraw.json",revision:"7bc5252c3966a15d1a63f3e8134b14dc"},{url:"/locales/id/all.json",revision:"0e30f0b0fd23fd236eead293ed6338ba"},{url:"/locales/id/common.json",revision:"a45b2d21f53632f34ed9254832acad0e"},{url:"/locales/id/dashboard.json",revision:"10aefc589c5da63a1e3ee9e932645199"},{url:"/locales/id/event.json",revision:"1c4bf8c79edcd6d4b4798eb1fc6d0296"},{url:"/locales/id/login.json",revision:"89318de9e3130dc6a5bd17d6ec95af9a"},{url:"/locales/id/register.json",revision:"dfc53c71d204a047e0e5bb6483301579"},{url:"/locales/merger.py",revision:"aa9c5025203ce771c7118262d8c72c95"},{url:"/locales/pl/account.json",revision:"97cc4a22d04a083d32ffd20c75e6e475"},{url:"/locales/pl/all.json",revision:"4bb98959745b81a4a6b36f290369a852"},{url:"/locales/pl/betdetails.json",revision:"2ff06fbb90b47faf33c720522e026222"},{url:"/locales/pl/bets.json",revision:"f96bb8600b608e05a6c958233a96cb52"},{url:"/locales/pl/bind.json",revision:"c147bef9313b7ea20c9a0125c968ded6"},{url:"/locales/pl/changepassword.json",revision:"92c568739197b4034b53e221de93051d"},{url:"/locales/pl/codesetting.json",revision:"c85f5d4d649988c9f15a050dd04f2bcb"},{url:"/locales/pl/common.json",revision:"7fb605ffa91f43312ed164e33f080c0b"},{url:"/locales/pl/dashboard.json",revision:"490c87148e5837e28a756d6152ff51cf"},{url:"/locales/pl/dsuccess.json",revision:"04aa483046c93b56e3c67c5027f11dac"},{url:"/locales/pl/event.json",revision:"cbae7a7f91aef486505a9d46d3eebf45"},{url:"/locales/pl/faq.json",revision:"620e4b32cb62e197c971c46685ee11b0"},{url:"/locales/pl/fund.json",revision:"d49ba53b9d72789a1a8f07b02885f81b"},{url:"/locales/pl/history.json",revision:"5eca274ea605ffa7f0f7f5b525e1a51e"},{url:"/locales/pl/login.json",revision:"b5184dc6e412c135928dedef62f09410"},{url:"/locales/pl/register.json",revision:"f23b18f94f2061749a423e624e3fb851"},{url:"/locales/pl/transactions.json",revision:"4b820a7891cd9c3514ade4ae86d79b21"},{url:"/locales/pl/upload.json",revision:"543978d18b0bfe3d338f5f1749d6c339"},{url:"/locales/ru/account.json",revision:"55cc63033338fa55312e3b2d712ff3c2"},{url:"/locales/ru/all.json",revision:"de2824b1deb1fce0650df67b4b75b255"},{url:"/locales/ru/betdetails.json",revision:"d4f02cc89219d306800684d937e4b731"},{url:"/locales/ru/bets.json",revision:"f2a0fb528416dc72a0d4927c8ef45f7d"},{url:"/locales/ru/bind.json",revision:"79545dbe09a9026f156ec049464765a1"},{url:"/locales/ru/bsuccess.json",revision:"6a81256fb1826a486eafc8bd8059e5bb"},{url:"/locales/ru/changepassword.json",revision:"ee8e7806040572b8f96bc4c4ee3a6e8d"},{url:"/locales/ru/codesetting.json",revision:"4b73636fce08566bdb198c6ece9676e6"},{url:"/locales/ru/common.json",revision:"4e1fd14a8c2f3441aab6aa46f509a15a"},{url:"/locales/ru/dashboard.json",revision:"a18f9ecb7f863bc92557e55bf4d1d20b"},{url:"/locales/ru/dsuccess.json",revision:"607a69cc8144b5397a56aa56a4641207"},{url:"/locales/ru/event.json",revision:"9679f0c5eb86ce664f0406327ae0f068"},{url:"/locales/ru/faq.json",revision:"2244b16134dc970a31d8c6c456464dc1"},{url:"/locales/ru/fund.json",revision:"29e6210f94c8210ae69e08c5a5619a8c"},{url:"/locales/ru/history.json",revision:"b154a31f4f822736e045e61e4921ee1a"},{url:"/locales/ru/login.json",revision:"9f93c071469a28fbd1482bdcae142dec"},{url:"/locales/ru/register.json",revision:"36c2cd5131d79c59d8ff1d2e8a4aedb1"},{url:"/locales/ru/transactions.json",revision:"b8ab778d8ada03b092f322b123eca20c"},{url:"/locales/ru/upload.json",revision:"604d323def13be627c8dd1bbac00b8de"},{url:"/locales/ru/withdraw.json",revision:"044d2a51a7ad4838160d7c8958280a91"},{url:"/locales/vi/account.json",revision:"09d120a1ff2c6a7fd48679517b6d520b"},{url:"/locales/vi/all.json",revision:"ed3ba4f4bedd4e393d501f249e9372c1"},{url:"/locales/vi/betdetails.json",revision:"0ce45daecf3c9648c61038ccd3ad463d"},{url:"/locales/vi/bets.json",revision:"fb43f5a5f286b67561ab301e98159e1a"},{url:"/locales/vi/bind.json",revision:"bb2afe0fa7c2640d37dc6fe344d05d2e"},{url:"/locales/vi/bsuccess.json",revision:"47f408a0fde7c81700aa6021f3002664"},{url:"/locales/vi/changepassword.json",revision:"9462d82031eab2186f8953bc5f686792"},{url:"/locales/vi/codesetting.json",revision:"7c2073321fec2f98d5c5949c9b7d476b"},{url:"/locales/vi/common.json",revision:"4870308fc1eb7d4ebf13f9366c2415e0"},{url:"/locales/vi/dashboard.json",revision:"7031bef6aee197210002ff5080353c13"},{url:"/locales/vi/dsuccess.json",revision:"1bfc5d0f14c84a40d5e059fb2f4eb51d"},{url:"/locales/vi/event.json",revision:"fe2813be0e1bdf51dc60ada0d9f2d717"},{url:"/locales/vi/faq.json",revision:"ada20649d9a67605c114e335da5dc613"},{url:"/locales/vi/fund.json",revision:"860cbf46215442f5b898fad3f6bb71f8"},{url:"/locales/vi/history.json",revision:"43773e8dc7ede447b22379df8aac55ce"},{url:"/locales/vi/login.json",revision:"083c0d76a42918ac37688d9ee54693ac"},{url:"/locales/vi/promotion.json",revision:"901faaa7d454b52d65e4b38a0e87abe3"},{url:"/locales/vi/register.json",revision:"aa4a73938b3ce631d0cb51c20524138b"},{url:"/locales/vi/transactions.json",revision:"54d8e451927d82f2f89e32626a0e8e39"},{url:"/locales/vi/upload.json",revision:"d6380a6be2b0b704ca8472a9fbd568dd"},{url:"/locales/vi/withdraw.json",revision:"4fd79d7607e7e53ea55a0f8d9a5c87ca"},{url:"/logosfc.svg",revision:"a1d94c6fe571f0d044b0875d3604bf9b"},{url:"/manifest.json",revision:"c2efdd5624ff1562e5b14bbebe82fc15"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/success.png",revision:"9fe31fb91271eccfa7766a4dfd19304b"},{url:"/team_connect.png",revision:"ff588a14fd49dfbbdf771360e2dd39c5"},{url:"/testing.png",revision:"4eb4925f81ebda0b4222238611780838"},{url:"/tether.jpg",revision:"fec788e34f2da1af1ddc69fb46216ef6"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"},{url:"/warn.png",revision:"40d24ef83d6d225945c38da4c42354ea"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));

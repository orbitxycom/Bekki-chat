/* Kartu profil di bawah sidebar + menu (Laporan bug, Ganti tema, Settings, dst.) */
(function(){"use strict";
/* Isi alamat halaman di sini kalau sudah ada. Kosong = muncul tulisan "segera hadir". */
var LINKS={settings:"",security:"",upgrade:"",support:"",terms:"",privacy:""};
var APP="Bekki";

var CSS=".sb-foot{position:relative}"
+".sb-foot>.new-chat{display:none!important}"
+".pf-card{display:flex;align-items:center;gap:12px;width:100%;padding:8px;border-radius:12px;text-align:left;transition:background .15s}"
+".pf-card:hover,.pf-card[aria-expanded=true]{background:var(--sidebar-accent)}"
+".pf-av{width:40px;height:40px;border-radius:10px;background:color-mix(in oklab,var(--foreground) 12%,transparent);color:color-mix(in oklab,var(--foreground) 65%,transparent);display:grid;place-items:center;font-size:14px;font-weight:600;flex:none}"
+".pf-txt{min-width:0;display:flex;flex-direction:column;gap:1px}"
+".pf-name{font-size:14px;font-weight:500;color:var(--foreground);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}"
+".pf-sub{font-size:12px;color:var(--muted-foreground);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}"
+".pf-menu{position:fixed;overflow-y:auto;background:var(--popover);color:var(--popover-foreground);border:1px solid color-mix(in oklab,var(--border) 80%,transparent);border-radius:16px;padding:8px;box-shadow:var(--shadow-float);z-index:80;animation:pf-in .16s var(--ease-spring) both}"
+".pf-menu[hidden]{display:none}"
+"@keyframes pf-in{0%{opacity:0;transform:translateY(6px) scale(.98)}to{opacity:1;transform:none}}"
+".pf-head{display:flex;align-items:center;gap:12px;padding:8px}"
+".pf-head .pf-av{width:44px;height:44px;border-radius:12px;font-size:15px}"
+".pf-head .pf-name{font-size:15px;font-weight:600}"
+".pf-sep{height:1px;background:color-mix(in oklab,var(--border) 80%,transparent);margin:6px 4px}"
+".pf-item{display:flex;align-items:center;gap:12px;width:100%;height:42px;padding:0 10px;border-radius:10px;font-size:14px;color:var(--foreground);text-align:left;transition:background .15s}"
+".pf-item:hover{background:var(--sidebar-accent)}"
+".pf-item svg{font-size:18px;opacity:.85;flex:none}"
+".pf-item .pf-r{margin-left:auto;font-size:13px;color:var(--muted-foreground)}"
+".pf-item .pf-chev{margin-left:auto;font-size:16px;opacity:.6}"
+".pf-modes{display:flex;gap:6px;padding:6px 8px 2px}"
+".pf-mode{width:40px;height:40px;border-radius:12px;display:grid;place-items:center;border:1px solid transparent;color:var(--foreground);transition:background .15s}"
+".pf-mode svg{font-size:18px}"
+".pf-mode:hover{background:var(--sidebar-accent)}"
+".pf-mode[aria-pressed=true]{border-color:color-mix(in oklab,var(--foreground) 35%,transparent);background:var(--sidebar-accent)}"
+".pf-foot{padding:8px 10px 4px;font-size:13px;color:var(--muted-foreground);display:flex;flex-direction:column;gap:6px}"
+".pf-foot a{color:var(--muted-foreground);text-decoration:none;cursor:pointer}"
+".pf-foot a:hover{color:var(--foreground);text-decoration:underline}"
+".pf-toast{position:fixed;left:50%;bottom:90px;transform:translateX(-50%);background:var(--foreground);color:var(--background);padding:10px 16px;border-radius:10px;font-size:13px;z-index:60;animation:fade-up .2s var(--ease-spring) both}";
var I={
bug:'<svg viewBox="0 0 24 24"><path d="m8 2 1.88 1.88M14.12 3.88 16 2M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"/><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"/><path d="M12 20v-9M6.53 9C4.6 8.8 3 7.1 3 5M6 13H2M3 21c0-2.1 1.7-3.9 3.8-4M20.97 5c0 2.1-1.6 3.8-3.5 4M22 13h-4M17.2 17c2.1.1 3.8 1.9 3.8 4"/></svg>',
sun:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>',
moon:'<svg viewBox="0 0 24 24"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"/></svg>',
pc:'<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M2 20h20"/></svg>',
gear:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
lock:'<svg viewBox="0 0 24 24"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
up:'<svg viewBox="0 0 24 24"><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>',
gauge:'<svg viewBox="0 0 24 24"><path d="M12 14l4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>',
help:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/></svg>',
out:'<svg viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/></svg>',
chev:'<svg class="pf-chev" viewBox="0 0 24 24"><path d="m9 6 6 6-6 6"/></svg>'};
function $(i){return document.getElementById(i)}
function item(id,icon,label,extra){return '<button class="pf-item" id="'+id+'" type="button" role="menuitem">'+icon+'<span>'+label+'</span>'+(extra||"")+'</button>'}
function init(){
var foot=document.querySelector(".sb-foot");if(!foot||$("pfCard"))return;
var st=document.createElement("style");st.textContent=CSS;document.head.appendChild(st);
var card=document.createElement("button");card.className="pf-card";card.id="pfCard";card.type="button";card.setAttribute("aria-haspopup","menu");card.setAttribute("aria-expanded","false");
card.innerHTML='<span class="pf-av" id="pfAv">?</span><span class="pf-txt"><span class="pf-name" id="pfName">Akun saya</span><span class="pf-sub" id="pfSub">Akun saya</span></span>';
var menu=document.createElement("div");menu.className="pf-menu";menu.id="pfMenu";menu.hidden=true;menu.setAttribute("role","menu");
menu.innerHTML='<div class="pf-head"><span class="pf-av" id="pfAv2">?</span><span class="pf-txt"><span class="pf-name" id="pfName2"></span><span class="pf-sub" id="pfMail"></span></span></div>'
+'<div class="pf-sep"></div>'
+item("pfSettings",I.gear,"Settings")
+item("pfSecurity",I.lock,"Security &amp; Access")
+item("pfLimits",I.up,"Tingkatkan paket")
+item("pfSupport",I.help,"Support",I.chev)
+item("pfOut",I.out,"Log out")
+'<div class="pf-sep"></div>'
+'<div class="pf-modes" role="group" aria-label="Tema">'
+'<button class="pf-mode" data-m="light" type="button" aria-label="Terang" aria-pressed="false">'+I.sun+'</button>'
+'<button class="pf-mode" data-m="dark" type="button" aria-label="Gelap" aria-pressed="false">'+I.moon+'</button>'
+'<button class="pf-mode" data-m="system" type="button" aria-label="Ikuti sistem" aria-pressed="false">'+I.pc+'</button></div>'
+'<div class="pf-foot"><span>'+APP+' ©'+new Date().getFullYear()+'</span><span><a id="pfTerms">Terms</a> · <a id="pfPrivacy">Privacy policy</a></span></div>';
document.body.appendChild(menu);foot.appendChild(card);

function mode(){try{var n=localStorage.getItem("bekki_tema");return n==="dark"||n==="light"?n:"system"}catch(e){return "system"}}
function dark(){return document.documentElement.classList.contains("dark")}
function mark(){var m=mode();Array.prototype.forEach.call(menu.querySelectorAll(".pf-mode"),function(b){b.setAttribute("aria-pressed",String(b.getAttribute("data-m")===m))})}
function setTheme(m){
try{if(m==="system")localStorage.removeItem("bekki_tema");else localStorage.setItem("bekki_tema",m)}catch(e){}
document.documentElement.classList.toggle("dark",m==="dark"||(m==="system"&&matchMedia("(prefers-color-scheme: dark)").matches));mark()}
try{matchMedia("(prefers-color-scheme: dark)").addEventListener("change",function(){if(mode()==="system")setTheme("system")})}catch(e){}
function toast(t){var o=document.querySelector(".pf-toast");if(o)o.remove();var e=document.createElement("div");e.className="pf-toast";e.textContent=t;document.body.appendChild(e);setTimeout(function(){e.remove()},2200)}
function pos(){var r=card.getBoundingClientRect();if(r.width<120){menu.style.width=Math.min(280,innerWidth-16)+"px";menu.style.left=Math.max(8,Math.min(r.right+8,innerWidth-Math.min(280,innerWidth-16)-8))+"px";menu.style.bottom=Math.max(8,innerHeight-r.bottom)+"px";menu.style.maxHeight=Math.max(200,innerHeight-16)+"px";return}var w=Math.min(r.width,innerWidth-16),l=Math.max(8,Math.min(r.left,innerWidth-w-8));menu.style.width=w+"px";menu.style.left=l+"px";menu.style.bottom=(innerHeight-r.top+8)+"px";menu.style.maxHeight=Math.max(200,r.top-16)+"px"}
function buka(){mark();menu.hidden=false;pos();card.setAttribute("aria-expanded","true")}
addEventListener("resize",function(){if(!menu.hidden)pos()});
function tutup(){menu.hidden=true;card.setAttribute("aria-expanded","false")}
var PK=null,PKS=false;
var PKN={starter:"Starter",pro:"Pro",promax:"Pro Max"};
function pkCode(){var s="";try{var a=new Uint8Array(20);crypto.getRandomValues(a);for(var i=0;i<20;i++)s+=(a[i]%36).toString(36)}catch(e){s=Math.random().toString(36).slice(2,12)+Math.random().toString(36).slice(2,12)}return s}
function pktOpen(fromLoad){
PK=PK||document.getElementById("pkt");if(!PK){toast("Segera hadir");return}
if(!PK.hidden)return;
PK.hidden=false;PK.scrollTop=0;
var base=location.search.slice(1).split("=")[0]||"c0";
var code=(typeof fromLoad==="string"&&fromLoad)||pkCode();
window.bekkiPkt=code;
try{var url=location.pathname+"?"+base+"="+code;if(fromLoad)history.replaceState({pkt:2},"",url);else history.pushState({pkt:1},"",url)}catch(e){}
var sb=window.bekkiSB;
if(sb)sb.auth.getSession().then(function(r){
var u=r&&r.data&&r.data.session&&r.data.session.user;if(!u)return;
var m=u.user_metadata||{},mail=u.email||"";
var plan=String(m.plan||(u.app_metadata&&u.app_metadata.plan)||"starter").toLowerCase().replace(/[^a-z]/g,"");
if(!PKN[plan])plan="starter";
var a=document.getElementById("pkAcc");
if(a){a.textContent="";a.appendChild(document.createTextNode("Masuk sebagai "));var b1=document.createElement("b");b1.textContent=mail;a.appendChild(b1);a.appendChild(document.createTextNode(" \u00b7 Paket saat ini: "));var b2=document.createElement("b");b2.textContent=PKN[plan];a.appendChild(b2)}
Array.prototype.forEach.call(PK.querySelectorAll(".card"),function(c){
c.classList.remove("now");var o=c.querySelector(".badge.cur");if(o)o.remove();
if(c.getAttribute("data-plan")===plan){c.classList.add("now");var bd=document.createElement("span");bd.className="badge cur";bd.textContent="Paket Anda";c.appendChild(bd);var t=c.querySelector(".cta");if(t&&!c.hasAttribute("data-soon"))t.textContent="Paket saat ini"}})
}).catch(function(){})
}
function pktClose(fromPop){
if(!PK||PK.hidden)return;
PK.hidden=true;window.bekkiPkt=false;
if(fromPop)return;
if(history.state&&history.state.pkt===1){try{history.back();return}catch(e){}}
try{var bs=location.search.slice(1).split("=")[0];history.replaceState(null,"",bs&&bs!=="c0"?location.pathname+"?"+bs:location.pathname)}catch(e){}
}
window.addEventListener("popstate",function(){if(PK&&!PK.hidden&&location.search.indexOf("=")<0)pktClose(true)});
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&PK&&!PK.hidden){e.stopPropagation();pktClose()}},true);
function go(k){tutup();if(k==="upgrade"){pktOpen();return}var u=LINKS[k];if(!u){toast("Segera hadir");return}if(u.charAt(0)==="/")location.assign(u);else window.open(u,"_blank","noopener")}


card.onclick=function(e){e.stopPropagation();menu.hidden?buka():tutup()};
document.addEventListener("click",function(e){if(!menu.hidden&&!menu.contains(e.target))tutup()});
document.addEventListener("keydown",function(e){if(e.key==="Escape")tutup()});
Array.prototype.forEach.call(menu.querySelectorAll(".pf-mode"),function(b){b.onclick=function(){setTheme(b.getAttribute("data-m"))}});
$("pfSettings").onclick=function(){go("settings")};
$("pfSecurity").onclick=function(){go("security")};
$("pfLimits").onclick=function(){go("upgrade")};
$("pfSupport").onclick=function(){go("support")};
$("pfTerms").onclick=function(){go("terms")};
$("pfPrivacy").onclick=function(){go("privacy")};
$("pfOut").onclick=function(){tutup();var sb=window.bekkiSB;(window.bekkiLogout?window.bekkiLogout("local"):location.replace("https://orbitxy.com/"))};

function isi(u){
var m=(u&&u.user_metadata)||{},mail=(u&&u.email)||"";
var nama=m.full_name||((m.first_name||m.last_name)?((m.first_name||"")+" "+(m.last_name||"")).trim():"")||m.name||(mail?mail.split("@")[0]:"Akun saya");try{var fn=String(nama||"").trim().split(/\s+/)[0]||"";if(fn&&fn!=="Akun"){window.bekkiName=fn;window.bekkiGreet&&window.bekkiGreet()}}catch(e){}
var w=String(nama).replace(/[._-]+/g," ").trim().split(/\s+/);
var ini=(w.length>1?w[0][0]+w[1][0]:String(nama).replace(/[^A-Za-z0-9]/g,"").slice(0,2)||"?").toUpperCase();
var foto=m.avatar_url||m.picture||"";if(!/^https:\/\//i.test(foto))foto="";["pfAv","pfAv2"].forEach(function(id){var e=$(id);e.textContent=ini;e.style.backgroundImage=foto?"url(\""+foto.replace(/["\\()\s]/g,encodeURIComponent)+"\")":"";e.style.backgroundSize="cover";e.style.backgroundPosition="center";e.style.color=foto?"transparent":""});
$("pfName").textContent=nama;$("pfName2").textContent=nama;$("pfMail").textContent=mail;
$("pfSub").textContent=mail||"Akun saya"}
/* ===== Jendela Settings ===== */
var SCSS=".st-back{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:70;display:flex;align-items:center;justify-content:center;padding:12px;animation:fade-up .18s var(--ease-spring) both}"
+".st-back[hidden]{display:none}"
+".st-box{position:relative;display:flex;width:min(880px,100%);height:min(560px,88dvh);background:var(--background);color:var(--foreground);border:1px solid color-mix(in oklab,var(--border) 80%,transparent);border-radius:18px;overflow:hidden;box-shadow:var(--shadow-float)}"
+".st-side{width:260px;flex:none;padding:14px;background:color-mix(in oklab,var(--foreground) 4%,var(--background));border-right:1px solid color-mix(in oklab,var(--border) 80%,transparent);display:flex;flex-direction:column;gap:12px}"
+".st-who{display:flex;align-items:center;gap:10px;min-width:0;padding:2px 2px 6px}"
+".st-who .pf-av{width:36px;height:36px;border-radius:9px;font-size:12px}"
+".st-nav{display:flex;flex-direction:column;gap:4px}"
+".st-tab{display:flex;align-items:center;gap:12px;height:40px;padding:0 12px;border-radius:10px;font-size:14px;color:var(--foreground);text-align:left;border:1px solid transparent}"
+".st-tab svg{font-size:17px;opacity:.85;flex:none}"
+".st-tab:hover{background:var(--sidebar-accent)}"
+".st-tab[aria-selected=true]{background:var(--sidebar-accent);border-color:color-mix(in oklab,var(--foreground) 22%,transparent)}"
+".st-main{flex:1;min-width:0;overflow-y:auto;padding:26px 28px}"
+".st-x{position:absolute;top:14px;right:14px;width:36px;height:36px;border-radius:10px;display:grid;place-items:center;color:var(--foreground);z-index:2}"
+".st-x:hover{background:var(--sidebar-accent)}.st-x svg{font-size:20px}"
+".st-h{font-size:20px;font-weight:600;margin:0 40px 18px 0}"
+".st-card{border:1px solid color-mix(in oklab,var(--border) 80%,transparent);border-radius:14px;margin-bottom:16px;overflow:hidden}"
+".st-in{padding:20px}.st-ct{font-size:16px;font-weight:600;margin:0 0 16px}"
+".st-acc{display:grid;grid-template-columns:auto 1fr;gap:16px 20px;align-items:start}"
+".st-big{width:64px;height:64px;border-radius:12px;background:#e8e0d5;color:#111;display:grid;place-items:center;font-size:22px;font-weight:600}"
+".st-f{display:flex;flex-direction:column;gap:6px;min-width:0}.st-f label{font-size:13px;font-weight:500}"
+".st-row2{grid-column:1/-1;display:grid;grid-template-columns:1fr 1fr;gap:16px}"
+".st-f input{height:40px;border-radius:10px;border:1px solid color-mix(in oklab,var(--border) 90%,transparent);background:transparent;color:var(--foreground);padding:0 12px;font-size:14px;width:100%;min-width:0}"
+".st-f input:disabled{opacity:.7}"
+".st-bar{display:flex;align-items:center;gap:10px;padding:14px 20px;border-top:1px solid color-mix(in oklab,var(--border) 80%,transparent);flex-wrap:wrap}"
+".st-bar .lbl{font-size:13px;color:var(--muted-foreground)}"
+".st-id{display:flex;align-items:center;gap:8px;padding:6px 10px;border-radius:8px;background:color-mix(in oklab,var(--foreground) 7%,transparent);font:12px ui-monospace,Menlo,monospace;color:var(--muted-foreground)}"
+".st-id button{display:grid;place-items:center;color:var(--foreground)}.st-id svg{font-size:15px}"
+".st-btn{height:40px;padding:0 18px;border-radius:10px;font-size:14px;font-weight:500;background:var(--foreground);color:var(--background);margin-left:auto}"
+".st-btn:disabled{opacity:.5}"
+".st-btn.out{background:transparent;color:var(--foreground);border:1px solid color-mix(in oklab,var(--border) 90%,transparent);margin-left:0}"
+".st-line{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 20px;font-size:14px}"
+".st-line+.st-line{border-top:1px solid color-mix(in oklab,var(--border) 80%,transparent)}"
+".st-line small{display:block;color:var(--muted-foreground);font-size:12px;margin-top:2px}"
+".st-modes{display:flex;gap:6px}.st-msg{font-size:13px;color:var(--muted-foreground)}"
+"@media(max-width:700px){.st-back{align-items:flex-start;padding:56px 0 0}.st-box{flex-direction:column;height:auto;max-height:calc(100dvh - 56px);width:100%;border-radius:18px 18px 0 0}"
+".st-side{width:auto;border-right:0;border-bottom:1px solid color-mix(in oklab,var(--border) 80%,transparent);padding:12px 56px 12px 12px}.st-who{display:none}.st-nav{flex-direction:row;flex-wrap:wrap}"
+".st-main{padding:20px}.st-acc{grid-template-columns:1fr}.st-big{margin:0 auto;width:68px;height:68px}.st-row2{grid-template-columns:1fr}}"
+".st-back{padding:0;align-items:stretch;justify-content:stretch;background:var(--background);animation:stIn .32s cubic-bezier(.2,.8,.2,1) both}"
+"@keyframes stIn{from{opacity:0;transform:translateY(14px) scale(.985)}to{opacity:1;transform:none}}"
+".st-box{width:100%;height:100dvh;max-height:none;border:0;border-radius:0;box-shadow:none}"
+".st-side{width:min(320px,32vw);min-width:250px;padding:34px 22px;gap:18px;background:color-mix(in oklab,var(--foreground) 3.5%,var(--background))}"
+".st-who{padding:0 4px 18px;border-bottom:1px solid color-mix(in oklab,var(--border) 70%,transparent);gap:12px}"
+".st-who .pf-av{width:44px;height:44px;border-radius:12px;font-size:14px}"
+".st-who .pf-name{font-size:15px;font-weight:600}.st-who .pf-sub{font-size:12.5px}"
+".st-nav{gap:6px}.st-nav::before{content:'Settings';font-size:12px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--muted-foreground);margin:2px 12px 8px}"
+".st-tab{height:46px;padding:0 14px;border-radius:12px;font-size:15px;transition:background .18s,transform .18s}"
+".st-tab:active{transform:scale(.98)}"
+".st-tab[aria-selected=true]{background:var(--foreground);color:var(--background);border-color:transparent;font-weight:500}"
+".st-tab[aria-selected=true] svg{opacity:1}"
+".st-main{touch-action:pan-y;will-change:transform}"
+".st-main{padding:64px clamp(24px,6vw,96px) 80px;scroll-behavior:smooth}"
+".st-main>*{max-width:760px;margin-left:auto;margin-right:auto}"
+".st-main.rise>.st-h,.st-main.rise>.st-card{animation:stRise .38s cubic-bezier(.2,.8,.2,1) both}.st-main.rise>.st-card{animation-delay:.06s}"
+"@keyframes stRise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}"
+".st-h{font-size:30px;font-weight:700;letter-spacing:-.01em;margin-top:0;margin-bottom:26px}"
+".st-card{border-radius:18px;margin-bottom:20px}"
+".st-in{padding:26px}.st-ct{font-size:17px;margin-bottom:20px}"
+".st-big{width:76px;height:76px;border-radius:18px;font-size:26px}"
+".st-f input{height:44px;border-radius:12px;font-size:15px;transition:border-color .18s,box-shadow .18s}"
+".st-f input:focus{outline:0;border-color:var(--foreground);box-shadow:0 0 0 3px color-mix(in oklab,var(--foreground) 10%,transparent)}"
+".st-bar{padding:18px 26px}.st-line{padding:18px 26px;font-size:15px}"
+".st-btn{height:44px;padding:0 22px;border-radius:12px;transition:opacity .18s,transform .18s}.st-btn:active{transform:scale(.97)}"
+".st-x{top:22px;right:26px;width:44px;height:44px;border-radius:50%;border:1px solid color-mix(in oklab,var(--foreground) 14%,transparent);background:color-mix(in oklab,var(--background) 55%,transparent);-webkit-backdrop-filter:blur(14px) saturate(1.6);backdrop-filter:blur(14px) saturate(1.6);box-shadow:0 4px 18px rgba(0,0,0,.10),inset 0 1px 0 rgba(255,255,255,.45);transition:transform .16s cubic-bezier(.2,.8,.2,1),background .18s,box-shadow .18s}"
+".st-x:hover{background:color-mix(in oklab,var(--foreground) 9%,color-mix(in oklab,var(--background) 55%,transparent))}"
+".st-x svg{width:24px;height:24px;font-size:0;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round;display:block;margin:auto}"
+".st-x:active{transform:scale(.88);box-shadow:0 1px 6px rgba(0,0,0,.12),inset 0 1px 0 rgba(255,255,255,.3);background:color-mix(in oklab,var(--foreground) 14%,color-mix(in oklab,var(--background) 55%,transparent))}"
+"@media(max-width:700px){.st-back{padding:0}.st-box{flex-direction:column;height:100dvh;max-height:none;border-radius:0}"
+".st-side{width:auto;min-width:0;padding:max(14px,env(safe-area-inset-top)) 64px 0 16px;gap:0;border-right:0;border-bottom:1px solid color-mix(in oklab,var(--border) 70%,transparent);background:var(--background)}"
+".st-nav{flex-direction:row;flex-wrap:nowrap;overflow-x:auto;gap:4px;scrollbar-width:none;padding-bottom:12px}.st-nav::-webkit-scrollbar{display:none}.st-nav::before{display:none}"
+".st-tab{flex:none;height:40px;padding:0 14px;font-size:14px;white-space:nowrap;border-radius:999px}"
+".st-main{flex:1;min-height:0;padding:28px 18px max(40px,env(safe-area-inset-bottom))}"
+".st-h{font-size:24px;margin-bottom:18px;margin-right:0}.st-in{padding:18px}.st-bar{padding:14px 18px}.st-line{padding:15px 18px}"
+".st-x{top:max(10px,env(safe-area-inset-top));right:14px;width:40px;height:40px}"
+".st-acc{grid-template-columns:1fr}.st-big{margin:0 auto}.st-row2{grid-template-columns:1fr}}"
+".app-in{display:flex;gap:20px;align-items:flex-start}"
+".app-logo{width:76px;height:76px;flex:none;border-radius:19px;box-shadow:0 12px 28px rgba(49,46,129,.32),0 2px 6px rgba(0,0,0,.12)}"
+".app-tx{min-width:0}.app-tx .st-ct{margin-bottom:6px}"
+".app-tx p{margin:0 0 14px;font-size:14px;line-height:1.55;color:var(--muted-foreground)}"
+".app-chips{display:flex;flex-wrap:wrap;gap:8px}"
+".app-chips span{font-size:12px;padding:5px 12px;border-radius:999px;border:1px solid color-mix(in oklab,var(--foreground) 14%,transparent);background:color-mix(in oklab,var(--foreground) 4%,transparent)}"
+".app-bar{gap:14px}.app-hint{flex:1;min-width:0;font-size:12.5px;line-height:1.45;color:var(--muted-foreground)}"
+".st-btn:disabled{opacity:.55;cursor:default}"
+"@media(max-width:700px){.app-in{flex-direction:column;gap:14px}.app-bar{flex-wrap:wrap}.app-bar .st-btn{width:100%}}"
+".st-main.rise>.pf-open{animation:stRise .38s cubic-bezier(.2,.8,.2,1) both}"
+".pf-open{border:0!important;background:transparent!important;box-shadow:none!important;border-radius:0!important;overflow:visible!important}"
+".pf-hero{display:flex;flex-direction:column;align-items:center;text-align:center;gap:16px;padding:8px 0 38px}"
+".pf-open .st-big{width:108px;height:108px;margin:0;border-radius:50%;font-size:36px;font-weight:600;letter-spacing:.02em;background:var(--foreground);color:var(--background);box-shadow:0 0 0 7px color-mix(in oklab,var(--foreground) 7%,transparent),0 14px 34px rgba(0,0,0,.14)}"
+".pf-hero-t b{display:block;font-size:24px;font-weight:700;letter-spacing:-.01em;margin-bottom:4px}.pf-hero-t span{font-size:14px;color:var(--muted-foreground)}"
+".pf-form{display:grid;gap:20px;max-width:520px;margin:0 auto}"
+".pf-form .st-row2{display:grid;grid-template-columns:1fr 1fr;gap:16px}"
+".pf-open .st-f label{display:block;font-size:12.5px;font-weight:600;color:var(--muted-foreground);margin:0 0 8px 18px}"
+".pf-open .st-f input{width:100%;height:52px;padding:0 22px;border-radius:999px;font-size:15px;border:1px solid transparent;background:color-mix(in oklab,var(--foreground) 6%,transparent);transition:background .18s,border-color .18s,box-shadow .18s}"
+".pf-open .st-f input:focus{background:var(--background);border-color:var(--foreground);box-shadow:0 0 0 4px color-mix(in oklab,var(--foreground) 9%,transparent)}"
+".pf-open .st-f input:disabled{opacity:.65}"
+".pf-meta{max-width:520px;margin:30px auto 0;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:0 6px 0 18px;height:50px;border-radius:999px;border:1px dashed color-mix(in oklab,var(--foreground) 20%,transparent);font-size:13px;color:var(--muted-foreground)}"
+".pf-meta .st-id{background:none!important;border:0!important;padding:0!important;border-radius:0!important;height:auto!important;display:inline-flex;align-items:center;gap:8px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;color:var(--foreground)}"
+".pf-meta .st-id button{width:38px;height:38px;border-radius:50%;display:grid;place-items:center;border:0;background:color-mix(in oklab,var(--foreground) 7%,transparent);color:inherit;transition:transform .16s}.pf-meta .st-id button:active{transform:scale(.88)}"
+".pf-act{max-width:520px;margin:26px auto 0;display:flex;align-items:center;justify-content:flex-end;gap:14px}.pf-act .st-msg{flex:1;font-size:13px}"
+".pf-hero{flex-direction:row;align-items:center;text-align:left;gap:26px;padding:6px 0 4px;margin-bottom:24px;border-bottom:0}"
+".pf-open .st-big{width:96px;height:96px;font-size:32px;flex:none;box-shadow:0 0 0 5px color-mix(in oklab,var(--foreground) 7%,transparent),0 10px 26px rgba(0,0,0,.12)}"
+".pf-hero-t{min-width:0}.pf-hero-t b{font-size:26px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.pf-hero-t span{display:inline-flex;align-items:center;height:28px;padding:0 12px;margin-top:6px;border-radius:999px;background:color-mix(in oklab,var(--foreground) 6%,transparent);font-size:13px}"
+".pf-form,.pf-meta,.pf-act{max-width:none;margin-left:0;margin-right:0}.pf-form{gap:22px}"
+".pf-open .st-f label{margin-left:6px}"
+".pf-meta{margin-top:26px;border-radius:16px;height:56px}.pf-act{margin-top:22px}"
+".us-card{margin-top:22px}.us-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:14px}.us-head .st-ct{margin:0}"
+".us-pill{font-size:12.5px;font-weight:600;padding:5px 12px;border-radius:999px;background:color-mix(in oklab,var(--foreground) 7%,transparent);white-space:nowrap}.us-pill.hot{background:var(--foreground);color:var(--background)}"
+".us-bar{position:relative;height:10px;border-radius:999px;background:color-mix(in oklab,var(--foreground) 9%,transparent);overflow:visible}.us-bar i{display:block;height:100%;border-radius:999px;background:var(--foreground);transform-origin:left;animation:usGrow .9s cubic-bezier(.2,.8,.2,1) both}"
+".us-bar.hot i{background:var(--foreground);animation:usGrow .9s cubic-bezier(.2,.8,.2,1) both}"
+".us-bar b{position:absolute;top:-4px;bottom:-4px;width:2px;border-radius:2px;background:#ef4444;opacity:.0}.us-bar.hot b{opacity:.9}"
+".us-still *,.us-still *::before{animation:none!important;transition:none!important}.us-still .us-line{stroke-dashoffset:0}.us-still .us-area,.us-still .us-dot{opacity:1}"
+".us-msg{margin:10px 0 6px;font-size:13px;color:var(--muted-foreground)}.us-msg.hot{color:var(--foreground);font-weight:600}"
+".us-svg{width:100%;height:auto;display:block;margin:10px 0 6px;color:var(--foreground);overflow:visible}"
+".us-ax{stroke:color-mix(in oklab,var(--foreground) 22%,transparent);stroke-width:1}.us-gr{stroke:color-mix(in oklab,var(--foreground) 10%,transparent);stroke-width:1;stroke-dasharray:3 5}"
+".us-lim{stroke:#ef4444;stroke-width:1.6;stroke-dasharray:6 5;opacity:.85}.us-limt{fill:#ef4444;font-size:11px;font-weight:600}"
+".us-svg text{stroke:none!important;stroke-width:0!important;font-weight:500}.us-yt,.us-xt{fill:var(--muted-foreground);font-size:11px}"
+".us-line{fill:none;stroke:currentColor;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1;stroke-dashoffset:1;animation:usDraw 1.2s cubic-bezier(.4,0,.2,1) .1s forwards}"
+".us-area{stroke:none!important;opacity:0;animation:usFade .8s ease .7s forwards}"
+".us-dot{fill:var(--background);stroke:currentColor;stroke-width:2;opacity:0;transform-box:fill-box;transform-origin:center;animation:usPop .4s cubic-bezier(.2,.8,.2,1) forwards}.us-dot.now{fill:currentColor}"
+".us-tiles{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:14px}.us-tiles div{padding:12px 14px;border-radius:14px;background:color-mix(in oklab,var(--foreground) 5%,transparent)}.us-tiles small{display:block;font-size:11.5px;color:var(--muted-foreground);margin-bottom:4px}.us-tiles b{font-size:20px;font-weight:700;font-variant-numeric:tabular-nums}"
+".us-note{margin:14px 0 0;font-size:12px;line-height:1.5;color:var(--muted-foreground)}"
+"@keyframes usDraw{to{stroke-dashoffset:0}}@keyframes usFade{to{opacity:1}}@keyframes usPop{from{opacity:0;transform:scale(.2)}to{opacity:1;transform:scale(1)}}@keyframes usGrow{from{transform:scaleX(0)}}@keyframes usPulse{0%,100%{opacity:1}50%{opacity:.55}}"
+"@media(max-width:700px){.us-tiles{grid-template-columns:repeat(2,1fr)}.us-head{flex-wrap:wrap}}"
+".pf-act .st-btn{height:50px;padding:0 32px;border-radius:999px;background:var(--foreground);color:var(--background);border-color:transparent;font-weight:500}"
+"@media(max-width:700px){.pf-form .st-row2{grid-template-columns:1fr}.pf-act{flex-direction:column-reverse;align-items:stretch}.pf-act .st-btn{width:100%}.pf-hero{gap:16px;padding-bottom:2px;margin-bottom:18px}.pf-open .st-big{width:70px;height:70px;font-size:24px}.pf-hero-t b{font-size:20px}.pf-meta{border-radius:14px}}";
var SI={
user:'<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
sl:'<svg viewBox="0 0 24 24"><path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/></svg>',
sh:'<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
shc:'<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>',
x:'<svg viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>',
cp:'<svg viewBox="0 0 24 24"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/></svg>'};
var TABS=[["profile","Profile",SI.user],["pref","Preferences",SI.sl],["sec","Security &amp; Access",SI.sh],["priv","Privacy",SI.shc]];
var stEl=null,stUser=null,stTab="profile",stLast=null;
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function nm(u){var m=(u&&u.user_metadata)||{},mail=(u&&u.email)||"";var f=m.first_name,l=m.last_name;
if(f==null&&l==null){var full=m.full_name||m.name||(mail?mail.split("@")[0]:"");var p=String(full).split(/\s+/);f=p.shift()||"";l=p.join(" ")}
return {f:f||"",l:l||""}}
function inis(u){var n=nm(u),a=((n.f[0]||"")+(n.l[0]||"")).toUpperCase();return a||((u&&u.email||"?")[0]).toUpperCase()}
var APPLOGO='<svg class="app-logo" viewBox="0 0 96 96" aria-hidden="true"><defs><linearGradient id="alBg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1e1b4b"/><stop offset="1" stop-color="#0b1020"/></linearGradient><linearGradient id="alRing" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#38bdf8"/><stop offset=".5" stop-color="#4ade80"/><stop offset="1" stop-color="#a78bfa"/></linearGradient><radialGradient id="alGlow" cx=".3" cy=".2" r=".9"><stop offset="0" stop-color="#fff" stop-opacity=".16"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs><rect width="96" height="96" rx="24" fill="url(#alBg)"/><rect width="96" height="96" rx="24" fill="url(#alGlow)"/><ellipse cx="48" cy="48" rx="34" ry="13" transform="rotate(-28 48 48)" fill="none" stroke="url(#alRing)" stroke-width="3.2" stroke-linecap="round" stroke-dasharray="150 60"/><path d="M37 28h13.5c7.4 0 12 3.7 12 9.4 0 3.7-2 6.4-5.2 7.6 4.1 1 6.7 4 6.7 8.4 0 6.4-5 10.6-13.2 10.6H37z" fill="#fff"/><path d="M45 34.5v7.8h4.6c2.6 0 4.1-1.4 4.1-3.9s-1.5-3.9-4.1-3.9zm0 14.2v8.8h5.2c3 0 4.7-1.6 4.7-4.4s-1.7-4.4-4.7-4.4z" fill="#1e1b4b"/><circle cx="74.5" cy="31" r="8" fill="#4ade80" opacity=".18"/><circle cx="74.5" cy="31" r="4.6" fill="#4ade80"/></svg>';
var DEF=null;addEventListener("beforeinstallprompt",function(e){e.preventDefault();DEF=e});addEventListener("appinstalled",function(){DEF=null});
function isStd(){return (window.matchMedia&&matchMedia("(display-mode: standalone)").matches)||navigator.standalone===true}
function appInit(ab,ah){
var ios=/iphone|ipad|ipod/i.test(navigator.userAgent)||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1);
if(isStd()){ab.disabled=true;ab.textContent="Sudah terpasang";return}
ab.onclick=function(){
if(DEF){var d=DEF;DEF=null;d.prompt();d.userChoice.then(function(c){ah.textContent=c.outcome==="accepted"?"Terpasang. Cek layar utamamu.":"Dibatalkan."}).catch(function(){});return}
ah.textContent=ios?"Ketuk ikon Bagikan di Safari, lalu pilih Tambah ke Layar Utama.":"Buka menu browser (titik tiga), lalu pilih Pasang aplikasi atau Tambahkan ke layar utama."}}
var BATAS=30;
function dkey(d){return d.getFullYear()+"-"+("0"+(d.getMonth()+1)).slice(-2)+"-"+("0"+d.getDate()).slice(-2)}
function usageData(){var days=[],c={},log={};
try{log=(JSON.parse(localStorage.getItem("bekki_use_v1")||"{}")||{}).d||{}}catch(e){}
try{var r=JSON.parse(localStorage.getItem("bekki_riwayat_v2")||"{}"),ch=Array.isArray(r)?r:(r.chats||[]);ch.forEach(function(x){(x.msgs||[]).forEach(function(m){if(m.role==="assistant"&&m.t){var k=dkey(new Date(m.t));c[k]=(c[k]||0)+1}})})}catch(e){}
for(var i=13;i>=0;i--){var d=new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()-i);var k=dkey(d);days.push({k:k,d:d,n:Math.min(BATAS,Math.max(log[k]||0,c[k]||0))})}
return days}
function usageHTML(){
var D=usageData(),n=D.length,today=D[n-1].n,sum7=0,tot=0,mx=0;
D.forEach(function(x,i){tot+=x.n;if(x.n>mx)mx=x.n;if(i>=n-7)sum7+=x.n});
var pct=Math.min(100,Math.round(today/BATAS*100)),near=pct>=80,full=pct>=100;
var W=600,H=200,pl=38,pr=14,pt=16,pb=28,bw=W-pl-pr,bh=H-pt-pb,ym=Math.max(BATAS,mx)*1.12;
function X(i){return pl+i*bw/(n-1)}function Y(v){return pt+bh*(1-v/ym)}
var P=D.map(function(x,i){return[X(i),Y(x.n)]}),base=pt+bh,dd="M"+P[0][0].toFixed(1)+" "+P[0][1].toFixed(1);
for(var i=0;i<n-1;i++){var p0=P[Math.max(0,i-1)],p1=P[i],p2=P[i+1],p3=P[Math.min(n-1,i+2)];
var c1x=p1[0]+(p2[0]-p0[0])/6,c1y=Math.min(base,Math.max(pt,p1[1]+(p2[1]-p0[1])/6)),c2x=p2[0]-(p3[0]-p1[0])/6,c2y=Math.min(base,Math.max(pt,p2[1]-(p3[1]-p1[1])/6));
dd+=" C"+c1x.toFixed(1)+" "+c1y.toFixed(1)+","+c2x.toFixed(1)+" "+c2y.toFixed(1)+","+p2[0].toFixed(1)+" "+p2[1].toFixed(1)}
var area=dd+" L"+P[n-1][0].toFixed(1)+" "+base+" L"+P[0][0].toFixed(1)+" "+base+" Z",ly=Y(BATAS).toFixed(1);
var svg='<svg class="us-svg'+(near?" hot":"")+'" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Grafik pemakaian 14 hari"><defs><linearGradient id="usA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="currentColor" stop-opacity=".22"/><stop offset="1" stop-color="currentColor" stop-opacity="0"/></linearGradient></defs>'
+'<line x1="'+pl+'" x2="'+(W-pr)+'" y1="'+base+'" y2="'+base+'" class="us-ax"/><line x1="'+pl+'" x2="'+(W-pr)+'" y1="'+Y(BATAS/2).toFixed(1)+'" y2="'+Y(BATAS/2).toFixed(1)+'" class="us-gr"/>'
+'<line x1="'+pl+'" x2="'+(W-pr)+'" y1="'+ly+'" y2="'+ly+'" class="us-lim"/><text x="'+(W-pr)+'" y="'+(parseFloat(ly)-6)+'" text-anchor="end" class="us-limt">Batas '+BATAS+'</text>'
+'<text x="'+(pl-8)+'" y="'+(base+4)+'" text-anchor="end" class="us-yt">0</text>'
+'<path d="'+area+'" fill="url(#usA)" class="us-area"/><path d="'+dd+'" pathLength="1" class="us-line"/>';
D.forEach(function(x,i){var hot=x.n/BATAS>=.8,last=i===n-1;
svg+='<circle cx="'+P[i][0].toFixed(1)+'" cy="'+P[i][1].toFixed(1)+'" r="'+(last?5:3.4)+'" class="us-dot'+(hot?' hot':'')+(last?' now':'')+'" style="animation-delay:'+(0.55+i*0.05).toFixed(2)+'s"><title>'+x.d.getDate()+"/"+(x.d.getMonth()+1)+": "+x.n+' pesan</title></circle>';
if(i===0||i===4||i===8||i===n-1)svg+='<text x="'+P[i][0].toFixed(1)+'" y="'+(H-8)+'" text-anchor="'+(i===0?'start':i===n-1?'end':'middle')+'" class="us-xt">'+(last?"Hari ini":x.d.getDate()+"/"+(x.d.getMonth()+1))+'</text>'});
svg+='</svg>';
var msg=full?"Batas harian tercapai.":near?"Hampir mencapai batas harian. Sisa "+(BATAS-today)+" pesan.":"Sisa "+(BATAS-today)+" pesan hari ini.";
return '<div class="st-card us-card'+(full?" us-still":"")+'"><div class="st-in"><div class="us-head"><h3 class="st-ct">Usage Statistics</h3><span class="us-pill'+(near?' hot':'')+'">Hari ini '+today+' / '+BATAS+'</span></div>'
+'<div class="us-bar'+(near?' hot':'')+'"><i style="width:'+pct+'%"></i><b style="left:80%"></b></div><div class="us-msg'+(near?' hot':'')+'" role="status">'+msg+'</div>'
+svg
+'<div class="us-tiles"><div><small>Hari ini</small><b>'+today+'</b></div><div><small>7 hari</small><b>'+sum7+'</b></div><div><small>Rata-rata/hari</small><b>'+(tot/n).toFixed(1).replace(/\.0$/,"")+'</b></div><div><small>Tertinggi</small><b>'+mx+'</b></div></div>'
+'<p class="us-note">Dihitung dari pesan yang kamu kirim di akun ini selama 14 hari terakhir. Batas harian hanya sebagai panduan.</p></div></div>'}
function stClose(){if(stEl){stEl.remove();stEl=null}}
function stBody(){
var u=stUser||{},n=nm(u),box=stEl.querySelector(".st-main"),h="";var rise=(stLast!==stTab);stLast=stTab;
if(stTab==="profile"){
var id=u.id||"",sid=id?id.slice(0,8)+"..."+id.slice(-7):"-";
h='<h2 class="st-h">Profile</h2><div class="st-card pf-open"><div class="pf-hero"><div class="st-big">'+esc(inis(u))+'</div><div class="pf-hero-t"><b>'+esc((n.f+" "+n.l).trim()||(u.email||"").split("@")[0])+'</b><span>'+esc(u.email||"")+'</span></div></div>'
+'<div class="pf-form"><div class="st-row2"><div class="st-f"><label for="stFn">First name</label><input id="stFn" value="'+esc(n.f)+'" maxlength="60" autocomplete="given-name"></div><div class="st-f"><label for="stLn">Last name</label><input id="stLn" value="'+esc(n.l)+'" maxlength="60" autocomplete="family-name"></div></div>'
+'<div class="st-f"><label for="stEm">Email</label><input id="stEm" type="email" disabled value="'+esc(u.email||"")+'"></div></div>'
+'<div class="pf-meta"><span class="lbl">User ID</span><span class="st-id"><span>'+esc(sid)+'</span><button type="button" id="stCp" aria-label="Salin">'+SI.cp+'</button></span></div>'
+'<div class="pf-act"><span class="st-msg" id="stMsg" role="status"></span><button class="st-btn" id="stSave" type="button">Update profile</button></div></div>'+usageHTML()}
else if(stTab==="pref"){
h='<h2 class="st-h">Preferences</h2><div class="st-card"><div class="st-line"><div>Theme<small>Terang, gelap, atau ikuti sistem</small></div><div class="st-modes">'
+'<button class="pf-mode" data-m="light" type="button" aria-label="Terang" aria-pressed="false">'+I.sun+'</button>'
+'<button class="pf-mode" data-m="dark" type="button" aria-label="Gelap" aria-pressed="false">'+I.moon+'</button>'
+'<button class="pf-mode" data-m="system" type="button" aria-label="Ikuti sistem" aria-pressed="false">'+I.pc+'</button></div></div></div>'}
else if(stTab==="sec"){
var pv=(u.app_metadata&&u.app_metadata.provider)||"email";
h='<h2 class="st-h">Security &amp; Access</h2><div class="st-card"><div class="st-line"><div>Metode masuk<small>'+(pv==="google"?"Google":"Kode lewat email")+' · '+esc(u.email||"")+'</small></div></div>'
+'<div class="st-line"><div>Keluar dari perangkat ini</div><button class="st-btn out" id="stOut" type="button">Log out</button></div>'
+'<div class="st-line"><div>Keluar dari semua perangkat<small>Semua HP dan browser harus login lagi</small></div><button class="st-btn out" id="stOutAll" type="button">Log out semua</button></div></div>'+'<div class="st-card st-app"><div class="st-in app-in"><div class="app-tx"><h3 class="st-ct">Download aplikasi</h3><p>Pasang Bekki AI di layar utama seperti aplikasi biasa. Buka lebih cepat dan tampil layar penuh, tanpa toko aplikasi.</p><div class="app-chips"><span>Android</span><span>iPhone</span><span>Windows</span><span>Mac</span></div></div></div><div class="st-bar app-bar"><span class="st-msg app-hint" id="appHint" role="status"></span><button class="st-btn" id="appBtn" type="button">Pasang aplikasi</button></div></div>'}
else{
h='<h2 class="st-h">Privacy</h2><div class="st-card"><div class="st-line"><div>Hapus semua obrolan<small>Menghapus riwayat obrolan di perangkat ini</small></div><button class="st-btn out" id="stDel" type="button">Hapus</button></div>'
+'<div class="st-line"><div>Terms</div><button class="st-btn out" id="stTerms" type="button">Buka</button></div>'
+'<div class="st-line"><div>Privacy policy</div><button class="st-btn out" id="stPriv" type="button">Buka</button></div></div>'}
box.innerHTML=h;box.classList.toggle("rise",rise);if(rise)box.scrollTop=0;
Array.prototype.forEach.call(stEl.querySelectorAll(".st-tab"),function(b){b.setAttribute("aria-selected",String(b.getAttribute("data-t")===stTab))});
function g(i){return stEl.querySelector("#"+i)}
if(stTab==="profile"){
g("stCp").onclick=function(){try{navigator.clipboard.writeText(u.id||"");g("stMsg").textContent="Tersalin"}catch(e){}};
g("stSave").onclick=function(){
var f=g("stFn").value.trim(),l=g("stLn").value.trim(),sb=window.bekkiSB,bt=g("stSave"),ms=g("stMsg");
if(!sb){ms.textContent="Belum siap";return}
bt.disabled=true;ms.textContent="Menyimpan...";
sb.auth.updateUser({data:{first_name:f,last_name:l,full_name:(f+" "+l).trim()}}).then(function(r){
bt.disabled=false;if(r&&r.error){ms.textContent="Gagal menyimpan";return}
stUser=(r&&r.data&&r.data.user)||stUser;isi(stUser);stEl.querySelector(".st-big").textContent=inis(stUser);
stEl.querySelector("#stWho").textContent=(f+" "+l).trim()||u.email;ms.textContent="Tersimpan"},function(){bt.disabled=false;ms.textContent="Gagal menyimpan"})}}
if(stTab==="pref"){
var m=mode();Array.prototype.forEach.call(box.querySelectorAll(".pf-mode"),function(b){b.setAttribute("aria-pressed",String(b.getAttribute("data-m")===m));b.onclick=function(){setTheme(b.getAttribute("data-m"));stBody()}})}
if(stTab==="sec"){
appInit(g("appBtn"),g("appHint"));
g("stOut").onclick=function(){$("pfOut").click()};
g("stOutAll").onclick=function(){var sb=window.bekkiSB;(window.bekkiLogout?window.bekkiLogout("global"):location.replace("https://orbitxy.com/"))}}
if(stTab==="priv"){
g("stDel").onclick=function(){stClose();var d=$("delAll");if(d)d.click()};
g("stTerms").onclick=function(){go("terms")};g("stPriv").onclick=function(){go("privacy")}}}
function stOpen(t){
tutup();stClose();stLast=null;stTab=(typeof t==="string")?t:"profile";
var sb=window.bekkiSB;
var back=document.createElement("div");back.className="st-back";
back.innerHTML='<div class="st-box" role="dialog" aria-modal="true" aria-label="Settings"><button class="st-x" id="stX" type="button" aria-label="Tutup"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/></svg></button>'
+'<div class="st-side"><div class="st-who"><span class="pf-av">?</span><span class="pf-txt"><span class="pf-name" id="stWho"></span><span class="pf-sub" id="stMail"></span></span></div><div class="st-nav" role="tablist">'
+TABS.map(function(t){return '<button class="st-tab" role="tab" data-t="'+t[0]+'" type="button">'+t[2]+'<span>'+t[1]+'</span></button>'}).join("")
+'</div></div><div class="st-main"></div></div>';
document.body.appendChild(back);stEl=back;
var sty=document.getElementById("stCss");if(!sty){sty=document.createElement("style");sty.id="stCss";sty.textContent=SCSS;document.head.appendChild(sty)}
back.onclick=function(e){if(e.target===back)stClose()};
back.querySelector("#stX").onclick=stClose;
var order=TABS.map(function(t){return t[0]}),busy=false,mq=window.matchMedia("(max-width:700px)");
function goTab(t,dir,dist){var m=back.querySelector(".st-main");if(t===stTab||busy||!m)return;
if(!dir)dir=order.indexOf(t)>order.indexOf(stTab)?1:-1;busy=true;
m.style.transition="transform .2s cubic-bezier(.4,0,1,1),opacity .2s";m.style.transform="translateX("+(-dir*(dist||70))+"px)";m.style.opacity="0";
setTimeout(function(){stTab=t;stLast=t;stBody();m.scrollTop=0;
m.style.transition="none";m.style.transform="translateX("+(dir*70)+"px)";m.style.opacity="0";void m.offsetWidth;
m.style.transition="transform .32s cubic-bezier(.2,.8,.2,1),opacity .32s";m.style.transform="";m.style.opacity="";
var tb=back.querySelector('.st-tab[data-t="'+t+'"]');if(tb&&tb.scrollIntoView){try{tb.scrollIntoView({inline:"center",block:"nearest",behavior:"smooth"})}catch(e){}}
setTimeout(function(){m.style.transition="";busy=false},340)},200)}
Array.prototype.forEach.call(back.querySelectorAll(".st-tab"),function(b){b.onclick=function(){var t=b.getAttribute("data-t");if(mq.matches)goTab(t);else{stTab=t;stBody()}}});
var sm=back.querySelector(".st-main"),sx=0,sy=0,dx=0,lk=0,t0=0;
sm.addEventListener("touchstart",function(e){dx=0;lk=0;if(busy||e.touches.length!==1||!mq.matches){lk=2;return}if(e.target.closest&&e.target.closest("input,textarea"))lk=2;sx=e.touches[0].clientX;sy=e.touches[0].clientY;t0=Date.now()},{passive:true});
sm.addEventListener("touchmove",function(e){if(busy||lk===2||e.touches.length!==1)return;var x=e.touches[0].clientX-sx,y=e.touches[0].clientY-sy;
if(!lk){if(Math.abs(x)>10&&Math.abs(x)>Math.abs(y)*1.4)lk=1;else if(Math.abs(y)>10){lk=2;return}else return}
if(e.cancelable)e.preventDefault();var i=order.indexOf(stTab),w=x<0?1:-1,ok=order[i+w]!==undefined;dx=ok?x:x*.25;
sm.style.transition="none";sm.style.transform="translateX("+(dx*.8)+"px)";sm.style.opacity=String(1-Math.min(Math.abs(dx)/500,.4))},{passive:false});
function sEnd(){if(lk!==1||busy){lk=0;return}lk=0;var i=order.indexOf(stTab),w=dx<0?1:-1,nx=order[i+w],v=Math.abs(dx)/Math.max(1,Date.now()-t0);
if(nx!==undefined&&(Math.abs(dx)>70||(v>.5&&Math.abs(dx)>30)))goTab(nx,w,Math.max(80,Math.abs(dx)));
else{sm.style.transition="transform .3s cubic-bezier(.2,.8,.2,1),opacity .3s";sm.style.transform="";sm.style.opacity="";setTimeout(function(){sm.style.transition=""},320)}}
sm.addEventListener("touchend",sEnd);sm.addEventListener("touchcancel",sEnd);
document.addEventListener("keydown",function k(e){if(!stEl){document.removeEventListener("keydown",k);return}if(e.key==="Escape"){stClose()}});
function fill(u){stUser=u||{};var n=nm(stUser),full=(n.f+" "+n.l).trim();back.querySelector(".st-who .pf-av").textContent=inis(stUser);
back.querySelector("#stWho").textContent=full||stUser.email||"Akun saya";back.querySelector("#stMail").textContent=stUser.email||"";stBody()}
fill(null);
if(sb)sb.auth.getSession().then(function(r){if(stEl===back)fill(r&&r.data&&r.data.session?r.data.session.user:null)}).catch(function(){})}
$("pfSettings").onclick=function(){stOpen("profile")};
$("pfSecurity").onclick=function(){stOpen("sec")};
var pm=/^\?([^=&]{3,})=([a-z0-9]{12,})$/i.exec(location.search);if(pm&&pm[1]!=="c")setTimeout(function(){pktOpen(pm[2])},0);
var pb=document.getElementById("pkBack");if(pb)pb.onclick=function(){pktClose()};
var sb=window.bekkiSB;
if(sb)sb.auth.getSession().then(function(r){isi(r&&r.data&&r.data.session?r.data.session.user:null)}).catch(function(){});
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();

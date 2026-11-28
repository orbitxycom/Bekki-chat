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
+".ib-badge{flex:none;min-width:20px;height:20px;padding:0 6px;border-radius:999px;background:var(--foreground);color:var(--background);font-size:12px;font-weight:700;display:inline-grid;place-items:center;line-height:1}.pf-item .ib-badge{margin-left:auto}.ib-badge[hidden]{display:none}"
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
mail:'<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m3.5 7.5 8.5 6 8.5-6"/></svg>',
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
+item("pfInbox",I.mail,"Inbox",'<span class="ib-badge" id="pfIbB" hidden></span>')
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
$("pfInbox").onclick=function(){tutup();stOpen("inbox")};
$("pfTerms").onclick=function(){go("terms")};
$("pfPrivacy").onclick=function(){go("privacy")};
$("pfOut").onclick=function(){tutup();var sb=window.bekkiSB;(window.bekkiLogout?window.bekkiLogout("local"):location.replace("https://orbitxy.com/"))};

function isi(u){
var m=(u&&u.user_metadata)||{},mail=(u&&u.email)||"";
var nama=m.full_name||((m.first_name||m.last_name)?((m.first_name||"")+" "+(m.last_name||"")).trim():"")||m.name||(mail?mail.split("@")[0]:"Akun saya");try{var fn=String(nama||"").trim().split(/\s+/)[0]||"";if(fn&&fn!=="Akun"){window.bekkiName=fn;window.bekkiGreet&&window.bekkiGreet()}}catch(e){}
var w=String(nama).replace(/[._-]+/g," ").trim().split(/\s+/);
var ini=(w.length>1?w[0][0]+w[1][0]:String(nama).replace(/[^A-Za-z0-9]/g,"").slice(0,2)||"?").toUpperCase();
var foto=m.avatar_url||m.picture||"";setTimeout(applyAv,0);if(!/^https:\/\//i.test(foto))foto="";["pfAv","pfAv2"].forEach(function(id){var e=$(id);e.textContent=ini;e.style.backgroundImage=foto?"url(\""+foto.replace(/["\\()\s]/g,encodeURIComponent)+"\")":"";e.style.backgroundSize="cover";e.style.backgroundPosition="center";e.style.color=foto?"transparent":""});
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
+".pf-join.pf-two{flex-direction:column;align-items:stretch;justify-content:flex-start;gap:0;height:auto;padding:0 6px 0 18px}.pf-r{display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:52px}.pf-r+.pf-r{border-top:1px dashed color-mix(in oklab,var(--foreground) 20%,transparent)}"
+".pf-join{margin-top:22px}"
+".pf-join .lbl{display:inline-flex;align-items:center;gap:9px}.pf-join .lbl svg{width:17px;height:17px;flex:none;fill:none;stroke:currentColor;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round;opacity:.85}"
+".pf-jv{padding-right:12px;font-size:14px;font-weight:600;color:var(--foreground);white-space:nowrap}"
+".pf-act{max-width:520px;margin:26px auto 0;display:flex;align-items:center;justify-content:flex-end;gap:14px}.pf-act .st-msg{flex:1;font-size:13px}"
+".pf-hero{flex-direction:row;align-items:center;text-align:left;gap:26px;padding:6px 0 4px;margin-bottom:24px;border-bottom:0}"
+".pf-open .st-big{width:96px;height:96px;font-size:32px;flex:none;box-shadow:0 0 0 5px color-mix(in oklab,var(--foreground) 7%,transparent),0 10px 26px rgba(0,0,0,.12)}"
+".pf-hero-t{min-width:0}.pf-hero-t b{font-size:26px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.pf-hero-t span{display:inline-flex;align-items:center;height:28px;padding:0 12px;margin-top:6px;border-radius:999px;background:color-mix(in oklab,var(--foreground) 6%,transparent);font-size:13px}"
+".pf-form,.pf-meta,.pf-act{max-width:none;margin-left:0;margin-right:0}.pf-form{gap:22px}"
+".pf-open .st-f label{margin-left:6px}"
+".pf-meta{margin-top:26px;border-radius:16px;height:56px}.pf-join{margin-top:22px}.pf-act{margin-top:22px}"
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
+".pf-avw{position:relative;flex:none;display:block}"
+".pf-edit{position:absolute;right:-4px;bottom:-4px;width:38px;height:38px;padding:0;border-radius:50%;display:grid;place-items:center;cursor:pointer;color:var(--foreground);border:1px solid color-mix(in oklab,var(--foreground) 18%,transparent);background:color-mix(in oklab,var(--background) 50%,transparent);-webkit-backdrop-filter:blur(14px) saturate(1.8);backdrop-filter:blur(14px) saturate(1.8);box-shadow:0 6px 18px rgba(0,0,0,.2),inset 0 1px 0 rgba(255,255,255,.55);transition:transform .16s cubic-bezier(.2,.8,.2,1),background .18s}"
+".pf-edit svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round;transition:transform .2s}"
+".pf-edit:hover{background:color-mix(in oklab,var(--background) 30%,transparent)}.pf-edit:hover svg{transform:rotate(-12deg)}"
+".pf-edit:active{transform:scale(.8)}.pf-edit.tap{animation:pfTap .5s ease-out}"
+"@keyframes pfTap{0%{box-shadow:0 0 0 0 color-mix(in oklab,var(--foreground) 38%,transparent),0 6px 18px rgba(0,0,0,.2)}100%{box-shadow:0 0 0 14px transparent,0 6px 18px rgba(0,0,0,.2)}}"
+"@media(max-width:700px){.pf-edit{width:30px;height:30px;right:-6px;bottom:-6px}.pf-edit svg{width:15px;height:15px}}"
+".pv-t{font-size:12px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--muted-foreground);margin-bottom:14px}"
+".pv{display:flex;flex-direction:column;gap:12px}.pv .msg.user{justify-content:flex-end}.pv .msg{display:flex}"
+".pf-d{margin:-8px 0 16px;font-size:13.5px;color:var(--muted-foreground)}"
+".sw-row{display:flex;gap:14px;flex-wrap:wrap}"
+".sw{position:relative;width:46px;height:46px;border-radius:50%;padding:0;border:2px solid transparent;background:var(--c);cursor:pointer;display:grid;place-items:center;box-shadow:0 0 0 1px color-mix(in oklab,var(--foreground) 14%,transparent);transition:transform .16s cubic-bezier(.2,.8,.2,1),box-shadow .2s}"
+".sw svg{width:20px;height:20px;fill:none;stroke:#fff;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round;opacity:0;transform:scale(.4);transition:opacity .2s,transform .25s cubic-bezier(.2,.8,.2,1);filter:drop-shadow(0 1px 2px rgba(0,0,0,.35))}"
+".sw[data-c=inv] svg{stroke:var(--background);filter:none}.sw.def svg{stroke:var(--foreground);filter:none}"
+".sw.on{box-shadow:0 0 0 2px var(--background),0 0 0 4px var(--foreground)}.sw.on svg{opacity:1;transform:none}.sw:active{transform:scale(.86)}"
+".fs-row{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}"
+".fs{display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:6px;height:76px;padding:8px 4px;border-radius:16px;border:1px solid color-mix(in oklab,var(--foreground) 12%,transparent);background:color-mix(in oklab,var(--foreground) 4%,transparent);color:var(--foreground);cursor:pointer;transition:transform .16s cubic-bezier(.2,.8,.2,1),background .2s,color .2s}"
+".fs span{font-size:11.5px;opacity:.75;white-space:nowrap}.fs b{font-weight:600;line-height:1}"
+".fs.on{background:var(--foreground);color:var(--background);border-color:transparent}.fs.on span{opacity:.9}.fs:active{transform:scale(.94)}"
+"@media(max-width:700px){.fs-row{gap:8px}.fs span{font-size:10.5px}.sw-row{gap:12px}}"
+".dv-head{padding-bottom:4px}.dv-head .st-ct{margin-bottom:6px}.dv-head p{margin:0;font-size:14px;line-height:1.55;color:var(--muted-foreground)}"
+".dv-list{padding:6px 26px 4px}.dv-err{display:block;margin-top:8px;font-size:12px;opacity:.8;word-break:break-word}.dv-empty{padding:18px 0;font-size:14px;color:var(--muted-foreground)}"
+".dv-row{display:flex;align-items:center;gap:14px;padding:16px 0;border-top:1px solid color-mix(in oklab,var(--foreground) 9%,transparent);overflow:hidden;max-height:90px;animation:dvIn .4s cubic-bezier(.2,.8,.2,1) both;transition:max-height .32s ease,opacity .3s,padding .32s,transform .3s}"
+".dv-row:first-child{border-top:0}.dv-row.gone{max-height:0;opacity:0;padding-top:0;padding-bottom:0;transform:translateX(24px)}"
+"@keyframes dvIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}"
+".dv-ic{width:46px;height:46px;flex:none;border-radius:14px;display:grid;place-items:center;background:color-mix(in oklab,var(--foreground) 6%,transparent);border:1px solid color-mix(in oklab,var(--foreground) 10%,transparent)}"
+".dv-ic svg{width:23px;height:23px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}"
+".dv-tx{flex:1;min-width:0}.dv-tx b{display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-size:15px;font-weight:600}"
+".dv-tx em{font-style:normal;font-size:11px;font-weight:600;padding:2px 9px;border-radius:999px;background:var(--foreground);color:var(--background)}"
+".dv-tx small{display:flex;align-items:center;gap:7px;margin-top:4px;font-size:12.5px;color:var(--muted-foreground)}"
+".dv-dot{width:7px;height:7px;border-radius:50%;background:color-mix(in oklab,var(--foreground) 30%,transparent)}.dv-dot.live{background:var(--foreground);animation:dvPulse 1.8s ease-in-out infinite}"
+"@keyframes dvPulse{0%{box-shadow:0 0 0 0 color-mix(in oklab,var(--foreground) 40%,transparent)}100%{box-shadow:0 0 0 7px transparent}}"
+".dv-out{flex:none;height:38px;padding:0 16px;border-radius:999px;font-size:13px;font-weight:500;color:var(--foreground);background:transparent;border:1px solid color-mix(in oklab,var(--foreground) 20%,transparent);cursor:pointer;transition:transform .16s cubic-bezier(.2,.8,.2,1),background .18s}"
+".dv-out:hover{background:color-mix(in oklab,var(--foreground) 7%,transparent)}.dv-out:active{transform:scale(.9)}.dv-out:disabled{opacity:.5}"
+".dv-sk{height:46px;margin:14px 0;border-radius:14px;background:linear-gradient(90deg,color-mix(in oklab,var(--foreground) 5%,transparent),color-mix(in oklab,var(--foreground) 10%,transparent),color-mix(in oklab,var(--foreground) 5%,transparent));background-size:200% 100%;animation:dvSk 1.2s linear infinite}"
+"@keyframes dvSk{to{background-position:-200% 0}}"
+".dv-bar{gap:14px;justify-content:space-between}.dv-bar .st-msg{flex:1;min-width:0;font-size:12.5px}.dv-bar .st-btn:disabled{opacity:.45;cursor:default}"
+"@media(max-width:700px){.dv-list{padding:4px 18px}.dv-bar{flex-wrap:wrap}.dv-bar .st-btn{width:100%}.dv-out{padding:0 13px}}"
+".pf-act .st-btn{height:50px;padding:0 32px;border-radius:999px;background:var(--foreground);color:var(--background);border-color:transparent;font-weight:500}"
+"@media(max-width:700px){.pf-form .st-row2{grid-template-columns:1fr}.pf-act{flex-direction:column-reverse;align-items:stretch}.pf-act .st-btn{width:100%}.pf-hero{gap:16px;padding-bottom:2px;margin-bottom:18px}.pf-open .st-big{width:70px;height:70px;font-size:24px}.pf-hero-t b{font-size:20px}.pf-meta{border-radius:14px}}"
+".ib-badge{flex:none;min-width:20px;height:20px;padding:0 6px;border-radius:999px;background:var(--foreground);color:var(--background);font-size:12px;font-weight:700;display:inline-grid;place-items:center;line-height:1}.pf-item .ib-badge{margin-left:auto}"
+".ib-top{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:-4px 0 14px}.ib-tabs{display:flex;gap:8px}.ib-tab{position:relative;width:46px;height:46px;border-radius:14px;display:grid;place-items:center;border:1px solid color-mix(in oklab,var(--foreground) 14%,transparent);background:color-mix(in oklab,var(--foreground) 4%,transparent);color:var(--foreground);transition:background .2s,color .2s,transform .15s,border-color .2s}.ib-tab:active{transform:scale(.92)}.ib-tab svg{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round}.ib-tab.on{background:var(--foreground);color:var(--background);border-color:var(--foreground)}.ib-pt{position:absolute;top:7px;right:7px;width:9px;height:9px;border-radius:50%;background:var(--foreground);box-shadow:0 0 0 2px var(--background)}.ib-tab.on .ib-pt{background:var(--background);box-shadow:0 0 0 2px var(--foreground)}.ib-empty{padding:40px 8px;text-align:center;color:var(--muted-foreground);font-size:14px}.ib-empty small{display:block;margin-top:8px;font-size:12px;opacity:.75}.ib-top .st-btn[disabled]{opacity:.45;pointer-events:none}"
+".ib-list{display:flex;flex-direction:column;gap:12px}"
+".ib-card{position:relative;display:grid;grid-template-columns:auto 1fr auto;column-gap:12px;row-gap:6px;align-items:baseline;width:100%;padding:16px 18px;border-radius:18px;border:1px solid color-mix(in oklab,var(--foreground) 12%,transparent);background:color-mix(in oklab,var(--foreground) 3%,transparent);text-align:left;transition:background .2s,transform .15s}"
+".ib-card:hover{background:color-mix(in oklab,var(--foreground) 6%,transparent)}.ib-card:active{transform:scale(.99)}"
+".ib-dot{width:9px;height:9px;border-radius:50%;background:var(--foreground);align-self:center;opacity:0;transform:scale(.4);transition:opacity .2s,transform .2s}.ib-card.un .ib-dot{opacity:1;transform:none}"
+".ib-t{font-size:15px;font-weight:600;min-width:0}.ib-card:not(.un) .ib-t{font-weight:500;color:var(--muted-foreground)}"
+".ib-d{font-size:12px;color:var(--muted-foreground);white-space:nowrap}"
+".ib-b{grid-column:2/4;font-size:14px;line-height:1.55;color:var(--muted-foreground)}.ib-card.un .ib-b{color:var(--foreground);opacity:.85}"
+"@media(max-width:700px){.ib-card{grid-template-columns:auto 1fr}.ib-d{grid-column:2;grid-row:2}.ib-b{grid-column:2;grid-row:3}}"
+".st-card.lg-card{overflow:visible;position:relative;z-index:4}"
+".lg-dd{display:none;position:relative;margin-top:14px;width:max-content;min-width:200px;max-width:100%}"
+".lg-sel{display:flex;align-items:center;justify-content:space-between;gap:12px;width:100%;height:46px;padding:0 14px 0 16px;border-radius:12px;border:1px solid color-mix(in oklab,var(--foreground) 22%,transparent);background:var(--background);color:var(--foreground);font:inherit;font-size:15px;font-weight:600;text-align:left;transition:border-color .2s,box-shadow .2s}"
+".lg-sel.open{border-color:var(--foreground);box-shadow:0 0 0 3px color-mix(in oklab,var(--foreground) 10%,transparent)}"
+".lg-sel svg{width:16px;height:16px;flex:none;fill:none;stroke:var(--muted-foreground);stroke-width:2.2;transition:transform .22s}.lg-sel.open svg{transform:rotate(180deg)}"
+".lg-menu{position:absolute;z-index:30;left:0;top:calc(100% + 6px);min-width:100%;width:max-content;max-width:calc(100vw - 48px);padding:6px;border-radius:14px;border:1px solid color-mix(in oklab,var(--foreground) 14%,transparent);background:var(--popover);box-shadow:0 18px 44px -12px rgba(0,0,0,.35),0 2px 8px rgba(0,0,0,.08);animation:lgIn .16s ease both;transform-origin:top left}"
+".lg-menu[hidden]{display:none}"
+".lg-o{display:flex;align-items:center;justify-content:space-between;gap:18px;width:100%;height:42px;padding:0 12px;border-radius:9px;font-size:15px;color:var(--foreground);text-align:left;transition:background .15s}"
+".lg-o:hover,.lg-o:focus-visible{background:color-mix(in oklab,var(--foreground) 8%,transparent)}.lg-o.on{background:color-mix(in oklab,var(--foreground) 6%,transparent)}"
+".lg-o svg{width:17px;height:17px;flex:none;fill:none;stroke:var(--foreground);stroke-width:2.4;opacity:0}.lg-o.on svg{opacity:1}"
+"@keyframes lgIn{from{opacity:0;transform:translateY(-6px) scale(.97)}to{opacity:1;transform:none}}"
+".lg-row{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px}"
+".lg{position:relative;display:flex;align-items:center;gap:12px;min-height:58px;padding:10px 14px;border-radius:16px;border:1px solid color-mix(in oklab,var(--foreground) 12%,transparent);background:color-mix(in oklab,var(--foreground) 3%,transparent);text-align:left;transition:background .2s,border-color .2s,transform .15s}"
+".lg:hover{background:color-mix(in oklab,var(--foreground) 7%,transparent)}.lg:active{transform:scale(.97)}"
+".lg.on{border-color:var(--foreground);background:color-mix(in oklab,var(--foreground) 8%,transparent)}"
+".lg-b{flex:none;width:34px;height:34px;border-radius:50%;display:grid;place-items:center;font-style:normal;font-size:13px;font-weight:700;background:var(--foreground);color:var(--background)}"
+".lg-n{display:flex;flex-direction:column;min-width:0;line-height:1.25}.lg-n b{font-size:14px;font-weight:600}.lg-n small{font-size:12px;color:var(--muted-foreground)}"
+".lg-ck{position:absolute;right:12px;top:50%;width:18px;height:18px;margin-top:-9px;fill:none;stroke:var(--foreground);stroke-width:2.6;opacity:0;transform:scale(.6);transition:opacity .2s,transform .2s}.lg.on .lg-ck{opacity:1;transform:none}"
+"@media(max-width:420px){.lg-row{grid-template-columns:1fr}}"
+"@media(max-width:700px){.lg-dd{display:block}.lg-row{display:none}}";
var SI={
mail:'<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m3.5 7.5 8.5 6 8.5-6"/></svg>',
user:'<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
sl:'<svg viewBox="0 0 24 24"><path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/></svg>',
sh:'<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
shc:'<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>',
x:'<svg viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>',
cp:'<svg viewBox="0 0 24 24"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/></svg>'};
var TABS=[["profile","Profile",SI.user],["pref","Preferences",SI.sl],["sec","Security &amp; Access",SI.sh],["inbox","Inbox",SI.mail],["priv","Privacy",SI.shc]];
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
function applyAv(){var a="";try{a=localStorage.getItem("bekki_av_v1")||""}catch(e){}if(!/^data:image\/jpeg;base64,[A-Za-z0-9+\/=]+$/.test(a))return;
Array.prototype.forEach.call(document.querySelectorAll("#pfAv,#pfAv2,.st-who .pf-av,.st-big"),function(e){e.style.backgroundImage='url("'+a+'")';e.style.backgroundSize="cover";e.style.backgroundPosition="center";e.style.color="transparent"})}
var CL=[["def","Bawaan","var(--secondary)",null],["inv","Hitam / Putih","var(--foreground)","var(--background)"],["blue","Biru","linear-gradient(135deg,#3b82f6,#2563eb)","#fff"],["violet","Ungu","linear-gradient(135deg,#8b5cf6,#6d28d9)","#fff"],["pink","Pink","linear-gradient(135deg,#f472b6,#db2777)","#fff"]];
var FSZ=[["s","Kecil",.9],["m","Normal",1],["l","Besar",1.14],["xl","Sangat besar",1.3]];
function getPref(){try{var o=JSON.parse(localStorage.getItem("bekki_pref_v1")||"{}")||{};return{c:o.c||"def",s:o.s||"m",l:o.l||"",ib:Array.isArray(o.ib)?o.ib:[]}}catch(e){return{c:"def",s:"m",l:"",ib:[]}}}
function setPref(k,v){var o=getPref();o[k]=v;try{localStorage.setItem("bekki_pref_v1",JSON.stringify(o))}catch(e){}applyPref();if(k==="l"&&window.bkLang)window.bkLang()}
function applyPref(){var o=getPref(),r=document.documentElement.style,c=CL.filter(function(x){return x[0]===o.c})[0],f=FSZ.filter(function(x){return x[0]===o.s})[0];
if(!document.getElementById("bkPref")){var st=document.createElement("style");st.id="bkPref";st.textContent=".msg.user .bubble{background:var(--bk-bub,var(--secondary));color:var(--bk-bubfg,inherit);transition:background .25s}.msg .bubble{font-size:calc(13px*var(--bk-fs,1))}.msg .bubble code{font-size:calc(12px*var(--bk-fs,1))}.pv .msg{animation:none!important}";document.head.appendChild(st)}
if(c&&c[0]!=="def"){r.setProperty("--bk-bub",c[2]);r.setProperty("--bk-bubfg",c[3])}else{r.removeProperty("--bk-bub");r.removeProperty("--bk-bubfg")}
if(f&&f[2]!==1)r.setProperty("--bk-fs",String(f[2]));else r.removeProperty("--bk-fs")}
applyPref();
var IBTAB="",IBD=null,IBR={},IBERR="",IBT=0,IBUID="",IBBUSY=false;
function ibLang(){return getPref().l||"id"}
function ibUnread(){return IBD?IBD.filter(function(m){return !IBR[m.id]}).length:0}
function ibBadge(){var n=ibUnread(),b=$("pfIbB");if(b){b.textContent=n;b.hidden=!n}}
function ibUid(){var sb=window.bekkiSB;if(IBUID)return Promise.resolve(IBUID);if(!sb||!sb.auth)return Promise.resolve("");return sb.auth.getSession().then(function(r){IBUID=(r&&r.data&&r.data.session&&r.data.session.user&&r.data.session.user.id)||"";return IBUID}).catch(function(){return ""})}
function ibFetch(force){var sb=window.bekkiSB;if(!sb||!sb.from||IBBUSY)return Promise.resolve();if(!force&&IBD&&Date.now()-IBT<15000)return Promise.resolve();IBBUSY=true;
return ibUid().then(function(uid){if(!uid){IBBUSY=false;return}
return sb.from("bekki_inbox").select("id,user_id,title,body,i18n,created_at").order("created_at",{ascending:false}).limit(60).then(function(a){
if(a.error){IBERR=a.error.message||a.error.code||"error";IBBUSY=false;IBT=Date.now();if(IBD===null)IBD=[];if(stEl&&stTab==="inbox")stBody();return}
return sb.from("bekki_inbox_read").select("msg_id").eq("user_id",uid).then(function(b){
var rd={};((b&&b.data)||[]).forEach(function(x){rd[x.msg_id]=1});var d=a.data||[];
var ch=JSON.stringify(d)!==JSON.stringify(IBD)||JSON.stringify(rd)!==JSON.stringify(IBR)||IBERR;
IBD=d;IBR=rd;IBERR="";IBT=Date.now();IBBUSY=false;ibBadge();if(ch&&stEl&&stTab==="inbox")stBody()})})}).catch(function(){IBBUSY=false;IBT=Date.now()})}
function ibMark(ids,read){var sb=window.bekkiSB;if(!ids.length)return;ids.forEach(function(id){if(read)IBR[id]=1;else delete IBR[id]});ibBadge();stBody();
ibUid().then(function(uid){if(!uid||!sb)return;var q=read?sb.from("bekki_inbox_read").upsert(ids.map(function(id){return{user_id:uid,msg_id:id}}),{onConflict:"user_id,msg_id"}):sb.from("bekki_inbox_read").delete().eq("user_id",uid).in("msg_id",ids);
q.then(function(r){if(r&&r.error){ids.forEach(function(id){if(read)delete IBR[id];else IBR[id]=1});ibBadge();if(stEl&&stTab==="inbox")stBody()}})})}
function inboxHTML(){var L=ibLang(),LC={id:"id-ID",en:"en-US",zh:"zh-CN",ar:"ar",ru:"ru-RU",de:"de-DE"}[L]||"id-ID";var h='<h2 class="st-h">Inbox</h2>';
if(IBD===null)return h+'<div class="ib-empty">Memuat...</div>';
if(IBERR)return h+'<div class="ib-empty">Fitur ini belum diaktifkan.<br><small class="ib-err"></small></div>';
var pe=IBD.filter(function(m){return m.user_id}),gl=IBD.filter(function(m){return !m.user_id});
if(IBTAB!=="p"&&IBTAB!=="g")IBTAB=pe.length?"p":"g";
var cur=IBTAB==="p"?pe:gl,unc=cur.filter(function(m){return !IBR[m.id]}).length;
h+='<div class="ib-top"><div class="ib-tabs" role="tablist"><button type="button" class="ib-tab'+(IBTAB==="p"?' on':'')+'" data-k="p" role="tab" aria-selected="'+(IBTAB==="p")+'" aria-label="Pribadi" title="Pribadi"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4.5 20.5c.6-3.6 3.5-5.5 7.5-5.5s6.9 1.9 7.5 5.5"/></svg>'+(pe.some(function(m){return !IBR[m.id]})?'<i class="ib-pt"></i>':'')+'</button><button type="button" class="ib-tab'+(IBTAB==="g"?' on':'')+'" data-k="g" role="tab" aria-selected="'+(IBTAB==="g")+'" aria-label="Global" title="Global"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.4 2.5 3.6 5.3 3.6 8.5s-1.2 6-3.6 8.5c-2.4-2.5-3.6-5.3-3.6-8.5S9.6 6 12 3.5z"/></svg>'+(gl.some(function(m){return !IBR[m.id]})?'<i class="ib-pt"></i>':'')+'</button></div><button type="button" class="st-btn out" id="ibAll"'+(unc?'':' disabled')+'>Tandai semua dibaca</button></div>';
if(!cur.length)return h+'<div class="ib-empty">Belum ada pesan.</div>';
return h+'<div class="ib-list">'
+cur.map(function(m){var x=(m.i18n&&m.i18n[L])||{},t=x.t||m.title,b=x.b||m.body,un=!IBR[m.id],d="";try{d=new Date(m.created_at).toLocaleDateString(LC,{day:"numeric",month:"long",year:"numeric"})}catch(e){}
return '<button type="button" class="ib-card'+(un?' un':'')+'" data-i="'+esc(m.id)+'"><i class="ib-dot"></i><span class="ib-t">'+esc(t)+'</span><span class="ib-d">'+esc(d)+'</span><span class="ib-b">'+esc(b)+'</span></button>'}).join("")+'</div>'}
function inboxBind(box){var all=box.querySelector("#ibAll"),er=box.querySelector(".ib-err");if(er)er.textContent="Pesan dari server: "+IBERR;
if(all)all.onclick=function(){ibMark((IBD||[]).filter(function(m){return !IBR[m.id]&&(IBTAB==="p"?m.user_id:!m.user_id)}).map(function(m){return m.id}),true)};
Array.prototype.forEach.call(box.querySelectorAll(".ib-tab"),function(b){b.onclick=function(){var k=b.getAttribute("data-k");if(k!==IBTAB){IBTAB=k;stBody()}}});
Array.prototype.forEach.call(box.querySelectorAll(".ib-card"),function(b){b.onclick=function(){var id=b.getAttribute("data-i");ibMark([id],!IBR[id])}});ibFetch(false)}
var LDD=[["id","Bahasa Indonesia"],["en","English"],["zh","\u4e2d\u6587 (Mandarin)"],["ar","\u0627\u0644\u0639\u0631\u0628\u064a\u0629 (Arabic)"],["ru","\u0420\u0443\u0441\u0441\u043a\u0438\u0439 (Russian)"],["de","Deutsch (German)"]];
var LGS=[["id","ID","Bahasa Indonesia",""],["en","EN","English",""],["zh","\u4e2d","\u4e2d\u6587","Mandarin"],["ar","\u0639","\u0627\u0644\u0639\u0631\u0628\u064a\u0629","Arabic"],["ru","RU","\u0420\u0443\u0441\u0441\u043a\u0438\u0439","Russian"],["de","DE","Deutsch","German"]];
function langHTML(){var o=getPref();return '<div class="st-card lg-card"><div class="st-in"><div class="st-ct">Bahasa</div><p class="pf-d">Bahasa tampilan dan jawaban Bekki.</p><div class="lg-row" role="radiogroup" aria-label="Bahasa">'+LGS.map(function(x){return '<button type="button" class="lg'+(x[0]===o.l?' on':'')+'" role="radio" aria-checked="'+(x[0]===o.l)+'" data-l="'+x[0]+'" lang="'+x[0]+'"><i class="lg-b">'+x[1]+'</i><span class="lg-n"><b>'+x[2]+'</b>'+(x[3]?'<small>'+x[3]+'</small>':'')+'</span><svg class="lg-ck" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></button>'}).join("")+'</div><div class="lg-dd"><button type="button" class="lg-sel" aria-haspopup="listbox" aria-expanded="false"><span class="lg-cur">'+(LDD.filter(function(x){return x[0]===(o.l||"id")})[0]||LDD[0])[1]+'</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button><div class="lg-menu" role="listbox" hidden>'+LDD.map(function(x){var on=x[0]===(o.l||"id");return '<button type="button" class="lg-o'+(on?' on':'')+'" role="option" aria-selected="'+on+'" data-l="'+x[0]+'" lang="'+x[0]+'"><span>'+x[1]+'</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></button>'}).join("")+'</div></div></div></div></div>'}
function prefHTML(){var o=getPref();
return '<div class="st-card pv-card"><div class="st-in"><div class="pv-t">Pratinjau</div><div class="pv"><div class="msg user"><div class="bubble">Halo Bekki, tolong bantu saya</div></div><div class="msg bot"><div class="bubble">Tentu, dengan senang hati!</div></div></div></div></div>'
+'<div class="st-card"><div class="st-in"><div class="st-ct">Warna gelembung chat</div><p class="pf-d">Warna pesan yang kamu kirim.</p><div class="sw-row" role="radiogroup" aria-label="Warna gelembung">'
+CL.map(function(x){return '<button type="button" class="sw'+(x[0]===o.c?' on':'')+(x[0]==="def"?' def':'')+'" role="radio" aria-checked="'+(x[0]===o.c)+'" data-c="'+x[0]+'" aria-label="'+x[1]+'" title="'+x[1]+'" style="--c:'+x[2]+'"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></button>'}).join("")+'</div></div></div>'
+'<div class="st-card"><div class="st-in"><div class="st-ct">Ukuran teks</div><p class="pf-d">Ukuran tulisan di dalam chat.</p><div class="fs-row" role="radiogroup" aria-label="Ukuran teks">'
+FSZ.map(function(x,i){return '<button type="button" class="fs'+(x[0]===o.s?' on':'')+'" role="radio" aria-checked="'+(x[0]===o.s)+'" data-s="'+x[0]+'"><b style="font-size:'+(13+i*3)+'px">Aa</b><span>'+x[1]+'</span></button>'}).join("")+'</div></div></div>'}
var DVI={mobile:'<svg viewBox="0 0 24 24"><rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/></svg>',tablet:'<svg viewBox="0 0 24 24"><rect x="4.5" y="3" width="15" height="18" rx="2.5"/><path d="M11 17.5h2"/></svg>',desktop:'<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg>'};
function relT(ts){var s=Math.max(0,(Date.now()-new Date(ts).getTime())/1000);if(s<300)return"Aktif sekarang";var m=Math.round(s/60);if(m<60)return"Aktif "+m+" menit lalu";var h=Math.round(m/60);if(h<24)return"Aktif "+h+" jam lalu";return"Aktif "+Math.round(h/24)+" hari lalu"}
function devHTML(){return '<div class="st-card dv-card"><div class="st-in dv-head"><h3 class="st-ct">Sesi aktif</h3><p>Perangkat yang sedang masuk ke akunmu. Keluarkan yang tidak kamu kenal.</p></div><div id="dvList" class="dv-list"><div class="dv-sk"></div><div class="dv-sk"></div></div><div class="st-bar dv-bar"><span class="st-msg" id="dvMsg" role="status"></span><button class="st-btn" id="dvAll" type="button" disabled>Keluarkan semua perangkat lain</button></div></div>'}
function devLoad(box){var sb=window.bekkiSB,list=box.querySelector("#dvList"),all=box.querySelector("#dvAll"),msg=box.querySelector("#dvMsg");if(!list)return;
var uid=stUser&&stUser.id,me=window.bekkiDevId?window.bekkiDevId():"";
if(!sb||!uid){list.innerHTML='<div class="dv-empty">Belum tersedia.</div>';return}
function render(rows){rows.sort(function(a,b){return(b.id===me)-(a.id===me)||new Date(b.last_seen)-new Date(a.last_seen)});
if(!rows.length){list.innerHTML='<div class="dv-empty">Belum ada perangkat tercatat.</div>';all.disabled=true;return}
list.innerHTML=rows.map(function(r,i){var mine=r.id===me,live=(Date.now()-new Date(r.last_seen).getTime())<3e5;
return '<div class="dv-row" data-id="'+esc(r.id)+'" style="animation-delay:'+(i*.06)+'s"><div class="dv-ic">'+(DVI[r.kind]||DVI.desktop)+'</div><div class="dv-tx"><b>'+esc(r.name||"Perangkat")+(mine?'<em>Perangkat ini</em>':'')+'</b><small><i class="dv-dot'+(live?' live':'')+'"></i>'+(mine?"Aktif sekarang":relT(r.last_seen))+'</small></div>'+(mine?'':'<button type="button" class="dv-out">Keluarkan</button>')+'</div>'}).join("");
all.disabled=rows.length<2;
Array.prototype.forEach.call(list.querySelectorAll(".dv-out"),function(b){b.onclick=function(){var row=b.closest(".dv-row"),id=row.getAttribute("data-id");b.disabled=true;b.textContent="Mengeluarkan...";
sb.from("bekki_devices").delete().eq("user_id",uid).eq("id",id).then(function(r){if(r&&r.error){b.disabled=false;b.textContent="Keluarkan";msg.textContent="Gagal mengeluarkan";return}
row.classList.add("gone");setTimeout(function(){row.remove();var n=list.querySelectorAll(".dv-row").length;all.disabled=n<2;msg.textContent="Perangkat dikeluarkan. Ia akan keluar dalam beberapa menit."},320)})}})}
sb.from("bekki_devices").select("*").eq("user_id",uid).then(function(r){if(r.error){list.innerHTML='<div class="dv-empty">Fitur ini belum diaktifkan.<br><small class="dv-err"></small></div>';var er=list.querySelector(".dv-err");if(er)er.textContent="Pesan dari server: "+(r.error.message||r.error.code||"tidak diketahui");return}render(r.data||[])},function(){list.innerHTML='<div class="dv-empty">Tidak bisa memuat perangkat.</div>'});
all.onclick=function(){all.disabled=true;sb.from("bekki_devices").delete().eq("user_id",uid).neq("id",me).then(function(r){if(r&&r.error){all.disabled=false;msg.textContent="Gagal";return}
Array.prototype.forEach.call(list.querySelectorAll(".dv-row"),function(row){if(row.getAttribute("data-id")!==me)row.classList.add("gone")});setTimeout(function(){Array.prototype.forEach.call(list.querySelectorAll(".dv-row.gone"),function(x){x.remove()})},320);msg.textContent="Semua perangkat lain dikeluarkan."})}}
function stClose(){if(stEl){stEl.remove();stEl=null}}
function stBody(){
var u=stUser||{},n=nm(u),box=stEl.querySelector(".st-main"),h="";var rise=(stLast!==stTab);stLast=stTab;
if(stTab==="profile"){
var id=u.id||"",sid=id?id.slice(0,8)+"..."+id.slice(-7):"-";var rg="";try{var lg2=getPref().l||"id",LC2={id:"id-ID",en:"en-US",zh:"zh-CN",ar:"ar",ru:"ru-RU",de:"de-DE"},TZ={"Asia/Jakarta":"ID","Asia/Pontianak":"ID","Asia/Makassar":"ID","Asia/Jayapura":"ID","Asia/Kuala_Lumpur":"MY","Asia/Kuching":"MY","Asia/Singapore":"SG","Asia/Bangkok":"TH","Asia/Ho_Chi_Minh":"VN","Asia/Manila":"PH","Asia/Tokyo":"JP","Asia/Seoul":"KR","Asia/Shanghai":"CN","Asia/Hong_Kong":"HK","Asia/Taipei":"TW","Asia/Kolkata":"IN","Asia/Calcutta":"IN","Asia/Dubai":"AE","Asia/Riyadh":"SA","Asia/Karachi":"PK","Asia/Dhaka":"BD","Europe/London":"GB","Europe/Berlin":"DE","Europe/Paris":"FR","Europe/Madrid":"ES","Europe/Rome":"IT","Europe/Amsterdam":"NL","Europe/Moscow":"RU","Europe/Istanbul":"TR","America/New_York":"US","America/Chicago":"US","America/Denver":"US","America/Los_Angeles":"US","America/Toronto":"CA","America/Sao_Paulo":"BR","America/Mexico_City":"MX","Australia/Sydney":"AU","Australia/Melbourne":"AU","Australia/Perth":"AU","Pacific/Auckland":"NZ","Africa/Cairo":"EG","Africa/Lagos":"NG","Africa/Johannesburg":"ZA"},cc=TZ[Intl.DateTimeFormat().resolvedOptions().timeZone]||"";if(!cc){var ls2=navigator.languages||[navigator.language||""];for(var q=0;q<ls2.length&&!cc;q++){var mm=/^[a-z]{2,3}-([A-Za-z]{2})$/.exec(ls2[q]);if(mm)cc=mm[1].toUpperCase()}}if(cc)rg=new Intl.DisplayNames([LC2[lg2]||"id-ID"],{type:"region"}).of(cc)||""}catch(e){}
var jd="";try{if(u.created_at){var LC={id:"id-ID",en:"en-US",zh:"zh-CN",ar:"ar",ru:"ru-RU",de:"de-DE"},lg=getPref().l||"id";jd=new Date(u.created_at).toLocaleDateString(LC[lg]||"id-ID",{day:"numeric",month:"long",year:"numeric"})}}catch(e){}
h='<h2 class="st-h">Profile</h2><div class="st-card pf-open"><div class="pf-hero"><div class="pf-avw"><div class="st-big">'+esc(inis(u))+'</div><button type="button" class="pf-edit" id="stEdit" aria-label="Ganti foto profil"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg></button><input type="file" id="stFile" accept="image/*" hidden></div><div class="pf-hero-t"><b>'+esc((n.f+" "+n.l).trim()||(u.email||"").split("@")[0])+'</b><span>'+esc(u.email||"")+'</span></div></div>'
+'<div class="pf-form"><div class="st-row2"><div class="st-f"><label for="stFn">First name</label><input id="stFn" value="'+esc(n.f)+'" maxlength="60" autocomplete="given-name"></div><div class="st-f"><label for="stLn">Last name</label><input id="stLn" value="'+esc(n.l)+'" maxlength="60" autocomplete="family-name"></div></div>'
+'<div class="st-f"><label for="stEm">Email</label><input id="stEm" type="email" disabled value="'+esc(u.email||"")+'"></div></div>'
+'<div class="pf-meta pf-uid"><span class="lbl">User ID</span><span class="st-id"><span>'+esc(sid)+'</span><button type="button" id="stCp" aria-label="Salin">'+SI.cp+'</button></span></div>'
+'<div class="pf-act"><span class="st-msg" id="stMsg" role="status"></span><button class="st-btn" id="stSave" type="button">Update profile</button></div>'
+((jd||rg)?'<div class="pf-meta pf-join pf-two">'+(jd?'<div class="pf-r"><span class="lbl"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg><span>Tanggal bergabung</span></span><span class="pf-jv">'+esc(jd)+'</span></div>':'')+(rg?'<div class="pf-r"><span class="lbl"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.4 2.5 3.6 5.3 3.6 8.5s-1.2 6-3.6 8.5c-2.4-2.5-3.6-5.3-3.6-8.5S9.6 6 12 3.5z"/></svg><span>Wilayah akun</span></span><span class="pf-jv">'+esc(rg)+'</span></div>':'')+'</div>':'')
+'</div>'+usageHTML()}
else if(stTab==="pref"){
h='<h2 class="st-h">Preferences</h2><div class="st-card"><div class="st-line"><div>Theme<small>Terang, gelap, atau ikuti sistem</small></div><div class="st-modes">'
+'<button class="pf-mode" data-m="light" type="button" aria-label="Terang" aria-pressed="false">'+I.sun+'</button>'
+'<button class="pf-mode" data-m="dark" type="button" aria-label="Gelap" aria-pressed="false">'+I.moon+'</button>'
+'<button class="pf-mode" data-m="system" type="button" aria-label="Ikuti sistem" aria-pressed="false">'+I.pc+'</button></div></div></div>'+langHTML()+prefHTML()}
else if(stTab==="sec"){
var pv=(u.app_metadata&&u.app_metadata.provider)||"email";
h='<h2 class="st-h">Security &amp; Access</h2><div class="st-card"><div class="st-line"><div>Metode masuk<small>'+(pv==="google"?"Google":"Kode lewat email")+' · '+esc(u.email||"")+'</small></div></div>'
+'<div class="st-line"><div>Keluar dari perangkat ini</div><button class="st-btn out" id="stOut" type="button">Log out</button></div>'
+'<div class="st-line"><div>Keluar dari semua perangkat<small>Semua HP dan browser harus login lagi</small></div><button class="st-btn out" id="stOutAll" type="button">Log out semua</button></div></div>'+devHTML()+'<div class="st-card st-app"><div class="st-in app-in"><div class="app-tx"><h3 class="st-ct">Download aplikasi</h3><p>Pasang Bekki AI di layar utama seperti aplikasi biasa. Buka lebih cepat dan tampil layar penuh, tanpa toko aplikasi.</p><div class="app-chips"><span>Android</span><span>iPhone</span><span>Windows</span><span>Mac</span></div></div></div><div class="st-bar app-bar"><span class="st-msg app-hint" id="appHint" role="status"></span><button class="st-btn" id="appBtn" type="button">Pasang aplikasi</button></div></div>'}
else if(stTab==="inbox"){h=inboxHTML()}
else{
h='<h2 class="st-h">Privacy</h2><div class="st-card"><div class="st-line"><div>Hapus semua obrolan<small>Menghapus riwayat obrolan di perangkat ini</small></div><button class="st-btn out" id="stDel" type="button">Hapus</button></div>'
+'<div class="st-line"><div>Terms</div><button class="st-btn out" id="stTerms" type="button">Buka</button></div>'
+'<div class="st-line"><div>Privacy policy</div><button class="st-btn out" id="stPriv" type="button">Buka</button></div></div>'}
box.innerHTML=h;box.classList.toggle("rise",rise);applyAv();if(rise)box.scrollTop=0;
Array.prototype.forEach.call(stEl.querySelectorAll(".st-tab"),function(b){b.setAttribute("aria-selected",String(b.getAttribute("data-t")===stTab))});ibBadge();
function g(i){return stEl.querySelector("#"+i)}
if(stTab==="profile"){
g("stEdit").onclick=function(){var b=g("stEdit");b.classList.remove("tap");void b.offsetWidth;b.classList.add("tap");g("stFile").click()};
g("stFile").onchange=function(){var f=this.files&&this.files[0];this.value="";if(!f)return;var ms=g("stMsg");if(!/^image\//.test(f.type)){ms.textContent="Pilih file gambar";return}
var rd=new FileReader();rd.onload=function(){var im=new Image();im.onload=function(){var S=256,c=document.createElement("canvas");c.width=c.height=S;var x=c.getContext("2d"),q=Math.min(im.width,im.height);x.fillStyle="#fff";x.fillRect(0,0,S,S);x.drawImage(im,(im.width-q)/2,(im.height-q)/2,q,q,0,0,S,S);
try{localStorage.setItem("bekki_av_v1",c.toDataURL("image/jpeg",.86))}catch(e){ms.textContent="Gagal menyimpan foto";return}applyAv();ms.textContent="Foto diperbarui"};im.onerror=function(){ms.textContent="Gambar tidak bisa dibaca"};im.src=rd.result};rd.readAsDataURL(f)};
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
if(stTab==="pref"){var ls=box.querySelector(".lg-sel"),lm=box.querySelector(".lg-menu");if(ls&&lm){var lc=function(){lm.hidden=true;ls.setAttribute("aria-expanded","false");ls.classList.remove("open");document.removeEventListener("pointerdown",lo,true);document.removeEventListener("keydown",lk,true)};
var lo=function(e){if(!e.target.closest(".lg-dd"))lc()},lk=function(e){if(e.key==="Escape"){e.stopPropagation();lc()}};
ls.onclick=function(){if(!lm.hidden){lc();return}lm.hidden=false;ls.setAttribute("aria-expanded","true");ls.classList.add("open");document.addEventListener("pointerdown",lo,true);document.addEventListener("keydown",lk,true)};
Array.prototype.forEach.call(lm.querySelectorAll(".lg-o"),function(b){b.onclick=function(){lc();setPref("l",b.getAttribute("data-l"));stBody()}})}Array.prototype.forEach.call(box.querySelectorAll(".lg"),function(b){b.onclick=function(){setPref("l",b.getAttribute("data-l"));stBody()}})}
if(stTab==="pref"){Array.prototype.forEach.call(box.querySelectorAll(".sw"),function(b){b.onclick=function(){setPref("c",b.getAttribute("data-c"));stBody()}});Array.prototype.forEach.call(box.querySelectorAll(".fs"),function(b){b.onclick=function(){setPref("s",b.getAttribute("data-s"));stBody()}})}
if(stTab==="sec"){
appInit(g("appBtn"),g("appHint"));devLoad(box);
g("stOut").onclick=function(){$("pfOut").click()};
g("stOutAll").onclick=function(){var sb=window.bekkiSB;(window.bekkiLogout?window.bekkiLogout("global"):location.replace("https://orbitxy.com/"))}}
if(stTab==="inbox")inboxBind(box);
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
ibFetch(true);setInterval(function(){ibFetch(true)},120000);document.addEventListener("visibilitychange",function(){if(!document.hidden)ibFetch(false)});
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();

/* ===== Bahasa (Language): Indonesia, English, Mandarin, Arab ===== */
(function(){
var E=[["Chat baru","New chat","新对话","محادثة جديدة","Новый чат","Neuer Chat"],
["Hapus semua","Delete all","全部删除","حذف الكل","Удалить все","Alle löschen"],
["Konteks","Context","上下文","السياق","Контекст","Kontext"],
["Proyek","Projects","项目","المشاريع","Проекты","Projekte"],
["Obrolan","Chats","对话","المحادثات","Чаты","Chats"],
["Belum ada proyek","No projects yet","暂无项目","لا توجد مشاريع بعد","Проектов пока нет","Noch keine Projekte"],
["Konektor","Connectors","连接器","الموصلات","Коннекторы","Konnektoren"],
["Keahlian","Skills","技能","المهارات","Навыки","Fähigkeiten"],
["Pengaturan","Settings","设置","الإعدادات","Настройки","Einstellungen"],
["Dukungan","Support","支持","الدعم","Поддержка","Support"],
["Ketentuan","Terms","条款","الشروط","Условия","Nutzungsbedingungen"],
["Kebijakan privasi","Privacy policy","隐私政策","سياسة الخصوصية","Политика конфиденциальности","Datenschutzerklärung"],
["Keluar","Log out","退出登录","تسجيل الخروج","Выйти","Abmelden"],
["Tanya apa saja...","Ask anything...","随便问点什么...","اسأل أي شيء...","Спросите что угодно...","Frag mich alles..."],
["Bekki bisa keliru. Periksa kembali jawabannya.","Bekki can make mistakes. Check answers.","Bekki 可能会出错，请核实答案。","قد يخطئ Bekki. تحقق من الإجابات.","Bekki может ошибаться. Проверяйте ответы.","Bekki kann Fehler machen. Prüfe die Antworten."],
["Ada yang bisa dibantu?","How can I help?","有什么可以帮您？","كيف يمكنني مساعدتك؟","Чем могу помочь?","Wie kann ich helfen?"],
["Buatkan kode algoritma Dijkstra","Write code for Dijkstra's algorithm","写一段 Dijkstra 算法的代码","اكتب كود خوارزمية ديكسترا","Напиши код алгоритма Дейкстры","Schreibe Code für den Dijkstra-Algorithmus"],
["Bantu saya menulis esai atau surat","Help me write an essay or letter","帮我写一篇文章或一封信","ساعدني في كتابة مقال أو رسالة","Помоги написать эссе или письмо","Hilf mir, einen Aufsatz oder Brief zu schreiben"],
["Kabar terbaru dunia AI","Latest news in AI","AI 领域的最新动态","آخر أخبار الذكاء الاصطناعي","Последние новости об ИИ","Neueste Nachrichten aus der KI-Welt"],
["Jelaskan hal rumit dengan sederhana","Explain something complex simply","用简单的方式解释复杂的事","اشرح أمرًا معقدًا ببساطة","Объясни сложное простыми словами","Erkläre etwas Kompliziertes einfach"],
["Letakkan file di sini...","Drop your files here...","将文件拖放到此处...","أفلت ملفاتك هنا...","Перетащите файлы сюда...","Zieh deine Dateien hierher..."],
["Hapus semua obrolan?","Delete all chats?","删除所有对话？","حذف كل المحادثات؟","Удалить все чаты?","Alle Chats löschen?"],
["Tindakan ini tidak bisa dibatalkan. Semua obrolanmu di perangkat ini akan dihapus permanen.","This action cannot be undone. This will permanently delete all your chats from this device.","此操作无法撤销。这将永久删除此设备上的所有对话。","لا يمكن التراجع عن هذا الإجراء. سيتم حذف جميع محادثاتك من هذا الجهاز نهائيًا.","Это действие нельзя отменить. Все ваши чаты на этом устройстве будут удалены навсегда.","Diese Aktion kann nicht rückgängig gemacht werden. Alle deine Chats auf diesem Gerät werden dauerhaft gelöscht."],
["Batal","Cancel","取消","إلغاء","Отмена","Abbrechen"],
["Hapus Semua","Delete All","全部删除","حذف الكل","Удалить все","Alle löschen"],
["Hari ini","Today","今天","اليوم","Сегодня","Heute"],
["Kemarin","Yesterday","昨天","أمس","Вчера","Gestern"],
["7 hari terakhir","Previous 7 days","过去 7 天","آخر 7 أيام","Последние 7 дней","Letzte 7 Tage"],
["Lebih lama","Older","更早","أقدم","Ранее","Älter"],
["Disematkan","Pinned","已置顶","المثبتة","Закреплённые","Angeheftet"],
["Belum ada obrolan","No chats yet","暂无对话","لا توجد محادثات بعد","Чатов пока нет","Noch keine Chats"],
["Tidak ditemukan","Not found","未找到","لم يتم العثور","Не найдено","Nicht gefunden"],
["Buka sidebar","Open sidebar","打开侧边栏","افتح الشريط الجانبي","Открыть боковую панель","Seitenleiste öffnen"],
["Cari obrolan","Search chats","搜索对话","ابحث في المحادثات","Поиск по чатам","Chats durchsuchen"],
["Cari chat","Search chats","搜索对话","ابحث في المحادثات","Поиск по чатам","Chats durchsuchen"],
["Gelap","Dark","深色","داكن","Тёмная","Dunkel"],
["Terang","Light","浅色","فاتح","Светлая","Hell"],
["Ikuti sistem","Follow system","跟随系统","اتبع النظام","Как в системе","Wie System"],
["Tema","Theme","主题","المظهر","Тема","Design"],
["Ganti tema","Change theme","切换主题","تغيير المظهر","Сменить тему","Design wechseln"],
["Judul obrolan","Chat title","对话标题","عنوان المحادثة","Название чата","Chat-Titel"],
["Kembali ke chat","Back to chat","返回对话","العودة إلى المحادثة","Назад в чат","Zurück zum Chat"],
["Lampirkan file atau foto","Attach a file or photo","附加文件或照片","أرفق ملفًا أو صورة","Прикрепить файл или фото","Datei oder Foto anhängen"],
["Lampirkan","Attach","附加","إرفاق","Прикрепить","Anhängen"],
["Menu obrolan","Chat menu","对话菜单","قائمة المحادثة","Меню чата","Chat-Menü"],
["Menu chat","Chat menu","对话菜单","قائمة المحادثة","Меню чата","Chat-Menü"],
["Menu proyek","Project menu","项目菜单","قائمة المشروع","Меню проекта","Projektmenü"],
["Proyek baru","New project","新建项目","مشروع جديد","Новый проект","Neues Projekt"],
["Paket Bekki","Bekki plans","Bekki 套餐","باقات Bekki","Тарифы Bekki","Bekki-Tarife"],
["Pilih paket AI yang pas untuk Anda","Choose the AI plan that fits you","选择适合您的 AI 套餐","اختر باقة الذكاء الاصطناعي المناسبة لك","Выберите подходящий тариф ИИ","Wähle den passenden KI-Tarif"],
["Kembali","Back","返回","رجوع","Назад","Zurück"],
["Gratis","Free","免费","مجاني","Бесплатно","Kostenlos"],
["Bulanan","Monthly","每月","شهريًا","Ежемесячно","Monatlich"],
["Tahunan","Yearly","每年","سنويًا","Ежегодно","Jährlich"],
["Terpopuler","Most popular","最受欢迎","الأكثر شعبية","Самый популярный","Am beliebtesten"],
["Tingkatkan paket","Upgrade plan","升级套餐","ترقية الباقة","Улучшить тариф","Tarif upgraden"],
["Mulai Gratis","Start free","免费开始","ابدأ مجانًا","Начать бесплатно","Kostenlos starten"],
["Pilih Pro","Choose Pro","选择 Pro","اختر Pro","Выбрать Pro","Pro wählen"],
["Pilih Pro Max","Choose Pro Max","选择 Pro Max","اختر Pro Max","Выбрать Pro Max","Pro Max wählen"],
["Upgrade atau batalkan kapan saja.","Upgrade or cancel anytime.","可随时升级或取消。","قم بالترقية أو الإلغاء في أي وقت.","Улучшайте или отменяйте в любое время.","Jederzeit upgraden oder kündigen."],
["Harga dalam Rupiah. Dapat berubah sewaktu-waktu.","Prices in Rupiah. Subject to change.","价格以印尼盾计，可能随时变动。","الأسعار بالروبية وقابلة للتغيير في أي وقت.","Цены указаны в рупиях и могут измениться.","Preise in Rupiah. Änderungen vorbehalten."],
["Untuk mencoba dan penggunaan ringan sehari-hari.","For trying out and light daily use.","适合试用和日常轻度使用。","للتجربة والاستخدام اليومي الخفيف.","Для знакомства и лёгкого повседневного использования.","Zum Ausprobieren und für leichte tägliche Nutzung."],
["Untuk profesional dan kreator yang butuh lebih banyak.","For professionals and creators who need more.","适合需要更多额度的专业人士和创作者。","للمحترفين وصنّاع المحتوى الذين يحتاجون المزيد.","Для профессионалов и авторов, которым нужно больше.","Für Profis und Kreative, die mehr brauchen."],
["Kekuatan penuh untuk tim dan kebutuhan berat.","Full power for teams and heavy workloads.","为团队和高强度需求提供全部性能。","قوة كاملة للفرق والاحتياجات الكبيرة.","Полная мощность для команд и больших нагрузок.","Volle Leistung für Teams und hohe Anforderungen."],
["Gratis selamanya, tanpa kartu kredit","Free forever, no credit card","永久免费，无需信用卡","مجاني للأبد، بدون بطاقة ائتمان","Бесплатно навсегда, без банковской карты","Für immer kostenlos, ohne Kreditkarte"],
["100 pesan per hari","100 messages per day","每天 100 条消息","100 رسالة يوميًا","100 сообщений в день","100 Nachrichten pro Tag"],
["Model AI standar","Standard AI model","标准 AI 模型","نموذج ذكاء اصطناعي قياسي","Стандартная модель ИИ","Standard-KI-Modell"],
["Riwayat chat 30 hari","30-day chat history","30 天对话历史","سجل محادثات لمدة 30 يومًا","История чатов за 30 дней","30 Tage Chatverlauf"],
["Dukungan via email","Email support","邮件支持","دعم عبر البريد الإلكتروني","Поддержка по email","E-Mail-Support"],
["Memori","Memory","记忆","الذاكرة","Память","Gedächtnis"],
["Instruksi umum","General instructions","通用指令","تعليمات عامة","Общие инструкции","Allgemeine Anweisungen"],
["Profil","Profile","个人资料","الملف الشخصي","Профиль","Profil"],
["Preferensi","Preferences","偏好设置","التفضيلات","Предпочтения","Einstellungen"],
["Keamanan & Akses","Security & Access","安全与访问","الأمان والوصول","Безопасность и доступ","Sicherheit & Zugriff"],
["Privasi","Privacy","隐私","الخصوصية","Конфиденциальность","Datenschutz"],
["Nama depan","First name","名","الاسم الأول","Имя","Vorname"],
["Nama belakang","Last name","姓","اسم العائلة","Фамилия","Nachname"],
["ID Pengguna","User ID","用户 ID","معرّف المستخدم","ID пользователя","Benutzer-ID"],
["Tanggal bergabung","Joined on","加入日期","تاريخ الانضمام","Дата регистрации","Beigetreten am"],
["Wilayah akun","Account region","账号地区","منطقة الحساب","Регион аккаунта","Kontoregion"],
["Inbox","Inbox","收件箱","صندوق الوارد","Входящие","Posteingang"],["Tandai semua dibaca","Mark all as read","全部标为已读","وضع علامة مقروء على الكل","Отметить все как прочитанные","Alle als gelesen markieren"],
["Belum ada pesan.","No messages yet.","暂无消息。","لا توجد رسائل بعد.","Сообщений пока нет.","Noch keine Nachrichten."],["Memuat...","Loading...","加载中...","جارٍ التحميل...","Загрузка...","Wird geladen..."],
["Pribadi","Personal","个人","شخصي","Личные","Persönlich"],["Global","Global","全体","عام","Общие","Allgemein"],
["Perbarui profil","Update profile","更新资料","تحديث الملف","Обновить профиль","Profil aktualisieren"],
["Ganti foto profil","Change profile photo","更换头像","تغيير صورة الملف","Сменить фото профиля","Profilfoto ändern"],
["Statistik Penggunaan","Usage Statistics","使用统计","إحصاءات الاستخدام","Статистика использования","Nutzungsstatistik"],
["Rata-rata/hari","Average/day","日均","المعدل اليومي","В среднем за день","Durchschnitt/Tag"],
["Tertinggi","Highest","最高","الأعلى","Максимум","Höchstwert"],
["7 hari","7 days","7 天","7 أيام","7 дней","7 Tage"],
["Dihitung dari pesan yang kamu kirim di akun ini selama 14 hari terakhir. Batas harian hanya sebagai panduan.","Counted from messages you sent on this account over the last 14 days. The daily limit is only a guide.","根据您在此账号过去 14 天发送的消息统计。每日上限仅供参考。","محسوبة من الرسائل التي أرسلتها في هذا الحساب خلال آخر 14 يومًا. الحد اليومي للإرشاد فقط.","Считается по сообщениям, отправленным с этого аккаунта за последние 14 дней. Дневной лимит носит ориентировочный характер.","Berechnet aus den Nachrichten, die du in den letzten 14 Tagen mit diesem Konto gesendet hast. Das Tageslimit dient nur als Richtwert."],
["Tema","Theme","主题","المظهر","Тема","Design"],
["Terang, gelap, atau ikuti sistem","Light, dark, or follow system","浅色、深色或跟随系统","فاتح أو داكن أو اتباع النظام","Светлая, тёмная или как в системе","Hell, dunkel oder wie das System"],
["Pratinjau","Preview","预览","معاينة","Предпросмотр","Vorschau"],
["Halo Bekki, tolong bantu saya","Hi Bekki, please help me","你好 Bekki，请帮帮我","مرحبًا Bekki، ساعدني من فضلك","Привет, Bekki, помоги мне, пожалуйста","Hallo Bekki, bitte hilf mir"],
["Tentu, dengan senang hati!","Of course, happy to help!","当然，很乐意！","بالتأكيد، يسعدني ذلك!","Конечно, с радостью помогу!","Natürlich, gerne!"],
["Warna gelembung chat","Chat bubble color","聊天气泡颜色","لون فقاعة المحادثة","Цвет пузыря чата","Farbe der Chat-Blase"],
["Warna pesan yang kamu kirim.","The color of messages you send.","你发送的消息的颜色。","لون الرسائل التي ترسلها.","Цвет отправляемых вами сообщений.","Die Farbe deiner gesendeten Nachrichten."],
["Warna gelembung","Bubble color","气泡颜色","لون الفقاعة","Цвет пузыря","Blasenfarbe"],
["Bawaan","Default","默认","افتراضي","По умолчанию","Standard"],
["Hitam / Putih","Black / White","黑 / 白","أسود / أبيض","Чёрный / Белый","Schwarz / Weiß"],
["Biru","Blue","蓝色","أزرق","Синий","Blau"],
["Ungu","Purple","紫色","بنفسجي","Фиолетовый","Lila"],
["Pink","Pink","粉色","وردي","Розовый","Pink"],
["Ukuran teks","Text size","文字大小","حجم النص","Размер текста","Textgröße"],
["Ukuran tulisan di dalam chat.","Text size inside the chat.","聊天中的文字大小。","حجم الكتابة داخل المحادثة.","Размер текста в чате.","Textgröße im Chat."],
["Kecil","Small","小","صغير","Малый","Klein"],
["Normal","Normal","正常","عادي","Обычный","Normal"],
["Besar","Large","大","كبير","Большой","Groß"],
["Sangat besar","Extra large","特大","كبير جدًا","Очень большой","Sehr groß"],
["Bahasa","Language","语言","اللغة","Язык","Sprache"],
["Bahasa tampilan dan jawaban Bekki.","Display language and Bekki's replies.","界面语言和 Bekki 回复所用的语言。","لغة العرض ولغة ردود Bekki.","Язык интерфейса и ответов Bekki.","Anzeigesprache und Antworten von Bekki."],
["Metode masuk","Sign-in method","登录方式","طريقة تسجيل الدخول","Способ входа","Anmeldemethode"],
["Kode lewat email","Email code","邮箱验证码","رمز عبر البريد","Код по email","E-Mail-Code"],
["Keluar dari perangkat ini","Log out of this device","退出此设备","تسجيل الخروج من هذا الجهاز","Выйти на этом устройстве","Von diesem Gerät abmelden"],
["Keluar dari semua perangkat","Log out of all devices","退出所有设备","تسجيل الخروج من جميع الأجهزة","Выйти на всех устройствах","Von allen Geräten abmelden"],
["Semua HP dan browser harus login lagi","All phones and browsers must sign in again","所有手机和浏览器需要重新登录","يجب تسجيل الدخول مجددًا على جميع الهواتف والمتصفحات","Все телефоны и браузеры должны войти снова","Alle Handys und Browser müssen sich erneut anmelden"],
["Keluar semua","Log out all","全部退出","خروج من الكل","Выйти везде","Überall abmelden"],
["Sesi aktif","Active sessions","活跃会话","الجلسات النشطة","Активные сеансы","Aktive Sitzungen"],
["Perangkat yang sedang masuk ke akunmu. Keluarkan yang tidak kamu kenal.","Devices currently signed in to your account. Sign out any you don't recognize.","当前登录您账号的设备。请移除不认识的设备。","الأجهزة المسجّلة حاليًا في حسابك. أخرج أي جهاز لا تعرفه.","Устройства, выполнившие вход в ваш аккаунт. Завершите сеансы незнакомых устройств.","Geräte, die gerade bei deinem Konto angemeldet sind. Melde unbekannte Geräte ab."],
["Keluarkan semua perangkat lain","Sign out all other devices","移除所有其他设备","إخراج جميع الأجهزة الأخرى","Завершить сеансы на всех других устройствах","Alle anderen Geräte abmelden"],
["Keluarkan","Sign out","移除","إخراج","Завершить","Abmelden"],
["Mengeluarkan...","Signing out...","正在移除...","جارٍ الإخراج...","Завершение...","Wird abgemeldet..."],
["Perangkat ini","This device","此设备","هذا الجهاز","Это устройство","Dieses Gerät"],
["Aktif sekarang","Active now","当前活跃","نشط الآن","Активно сейчас","Jetzt aktiv"],
["Belum tersedia.","Not available yet.","暂不可用。","غير متاح بعد.","Пока недоступно.","Noch nicht verfügbar."],
["Belum ada perangkat tercatat.","No devices recorded yet.","暂无已记录的设备。","لا توجد أجهزة مسجّلة بعد.","Устройств пока нет.","Noch keine Geräte erfasst."],
["Fitur ini belum diaktifkan.","This feature is not enabled yet.","此功能尚未启用。","هذه الميزة غير مفعّلة بعد.","Эта функция ещё не включена.","Diese Funktion ist noch nicht aktiviert."],
["Tidak bisa memuat perangkat.","Couldn't load devices.","无法加载设备。","تعذر تحميل الأجهزة.","Не удалось загрузить устройства.","Geräte konnten nicht geladen werden."],
["Download aplikasi","Download app","下载应用","تنزيل التطبيق","Скачать приложение","App herunterladen"],
["Pasang Bekki AI di layar utama seperti aplikasi biasa. Buka lebih cepat dan tampil layar penuh, tanpa toko aplikasi.","Install Bekki AI on your home screen like a regular app. Opens faster and runs full screen, no app store needed.","像普通应用一样把 Bekki AI 安装到主屏幕。打开更快、全屏显示，无需应用商店。","ثبّت Bekki AI على الشاشة الرئيسية كأي تطبيق عادي. يفتح أسرع ويعمل بملء الشاشة دون متجر تطبيقات.","Установите Bekki AI на главный экран как обычное приложение. Открывается быстрее и работает на весь экран, магазин приложений не нужен.","Installiere Bekki AI wie eine normale App auf deinem Startbildschirm. Startet schneller und läuft im Vollbild, ganz ohne App-Store."],
["Pasang aplikasi","Install app","安装应用","تثبيت التطبيق","Установить приложение","App installieren"],
["Sudah terpasang","Already installed","已安装","مثبّت بالفعل","Уже установлено","Bereits installiert"],
["Hapus semua obrolan","Delete all chats","删除所有对话","حذف كل المحادثات","Удалить все чаты","Alle Chats löschen"],
["Menghapus riwayat obrolan di perangkat ini","Deletes chat history on this device","删除此设备上的对话记录","يحذف سجل المحادثات على هذا الجهاز","Удаляет историю чатов на этом устройстве","Löscht den Chatverlauf auf diesem Gerät"],
["Hapus","Delete","删除","حذف","Удалить","Löschen"],
["Buka","Open","打开","فتح","Открыть","Öffnen"],
["Menyimpan...","Saving...","正在保存...","جارٍ الحفظ...","Сохранение...","Wird gespeichert..."],
["Tersimpan","Saved","已保存","تم الحفظ","Сохранено","Gespeichert"],
["Tersalin","Copied","已复制","تم النسخ","Скопировано","Kopiert"],
["Foto diperbarui","Photo updated","头像已更新","تم تحديث الصورة","Фото обновлено","Foto aktualisiert"]];
var M={},Z=["id","en","zh","ar","ru","de"];E.forEach(function(r){r.forEach(function(s){if(!M[s])M[s]=r})});
var UN={menit:["menit","min","分钟","دقيقة","мин.","Min."],jam:["jam","h","小时","ساعة","ч","Std."],hari:["hari","d","天","يوم","дн.","Tg."]};
var GR={pagi:["Selamat pagi","Good morning","早上好","صباح الخير","Доброе утро","Guten Morgen"],siang:["Selamat siang","Good afternoon","中午好","طاب يومك","Добрый день","Guten Tag"],sore:["Selamat sore","Good afternoon","下午好","مساء الخير","Добрый день","Guten Tag"],malam:["Selamat malam","Good evening","晚上好","مساء الخير","Добрый вечер","Guten Abend"]};
function rx(s,L){var m;
if(m=s.match(/^Selamat (pagi|siang|sore|malam), (.+)\.$/))return L===2?GR[m[1]][2]+"，"+m[2]+"。":GR[m[1]][L]+", "+m[2]+(L===3?"":".");
if(m=s.match(/^Aktif (\d+) (menit|jam|hari) lalu$/)){var u=UN[m[2]][L];return L===0?s:L===1?"Active "+m[1]+" "+u+" ago":L===2?m[1]+" "+u+"前活跃":L===3?"نشط منذ "+m[1]+" "+u:L===4?"Активно "+m[1]+" "+u+" назад":"Aktiv vor "+m[1]+" "+u}
if(m=s.match(/^Hari ini (\d+) \/ (\d+)$/))return[ "Hari ini ","Today ","今天 ","اليوم ","Сегодня ","Heute "][L]+m[1]+" / "+m[2];
if(m=s.match(/^(\d+)\/(\d+): (\d+) pesan$/))return m[1]+"/"+m[2]+": "+m[3]+" "+["pesan","messages","条消息","رسالة","сообщ.","Nachr."][L];
if(m=s.match(/^Batas (\d+)$/))return[ "Batas ","Limit ","上限 ","الحد ","Лимит ","Limit "][L]+m[1];
return null}
function tx(s,L){var k=s.trim();if(!k)return null;var r=M[k];var o=r?r[L]:rx(k,L);if(o==null||o===k)return null;return s.replace(k,o)}
var SKIP=".chat-inner .bubble,.hist-item,.ttl:not(.muted),.ttl-input,textarea,input,script,style,code,pre,.st-id,.dv-err";var ASK=".chat-inner .bubble,.hist-item,.ttl:not(.muted),.ttl-input";
var OR=new WeakMap(),OP=new WeakMap(),L=-1,busy=false;
function curL(){try{var l=(JSON.parse(localStorage.getItem("bekki_pref_v1")||"{}")||{}).l;var i=Z.indexOf(l);return i}catch(e){return -1}}
function doText(n){var t=n.nodeValue,o=OR.get(n);if(o===undefined||OP.get(n)!==t){o=t;OR.set(n,o)}
var out=L<0?o:(tx(o,L)||o);if(out!==t)n.nodeValue=out;OP.set(n,out)}
var AT=["aria-label","placeholder","title"];
function doAttr(e){AT.forEach(function(a){var v=e.getAttribute(a);if(v==null)return;var k="_bk_"+a;var st=e[k];if(!st||st.p!==v)st=e[k]={o:v,p:v};var out=L<0?st.o:(tx(st.o,L)||st.o);if(out!==v)e.setAttribute(a,out);st.p=out})}
function walk(root){var w=document.createTreeWalker(root,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT,{acceptNode:function(n){if(n.nodeType===1)return n.matches(SKIP)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_ACCEPT}});var n,ts=[];while(n=w.nextNode())ts.push(n);ts.forEach(doText);
Array.prototype.forEach.call(root.querySelectorAll("[aria-label],[placeholder],[title]"),function(e){if(!e.closest(ASK))doAttr(e)})}
function run(){busy=true;try{walk(document.body)}catch(e){}busy=false}
var q=false;function sch(){if(q)return;q=true;requestAnimationFrame(function(){q=false;if(L>=0||hadL)run()})}
var hadL=false;
function sty(){var st=document.getElementById("bkLang");if(!st){st=document.createElement("style");st.id="bkLang";document.head.appendChild(st)}
st.textContent=L<0?"":".msg .bubble{unicode-bidi:plaintext;text-align:start}"+(L===3?".st-main,.dk-sheet,.pk-wrap{direction:rtl}.st-main .st-line small,.st-main p{text-align:start}":"")}
window.bkLang=function(){L=curL();if(L>=0)hadL=true;document.documentElement.lang=L>=0?Z[L]:"id";sty();run()};
new MutationObserver(function(ms){if(busy)return;if(L<0&&!hadL)return;for(var i=0;i<ms.length;i++){var t=ms[i].target,el=t.nodeType===1?t:t.parentElement;if(el&&el.closest&&el.closest(".chat-inner .bubble"))continue;sch();return}}).observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:AT});
window.bkLang();
})();

/* Wajib login sebelum masuk ke chat Bekki */
(function(){"use strict";
var URL_="https://adxyijyerblmosdzsbyp.supabase.co",KEY="sb_publishable_bCG2DJjBfLAMp2ME9Pe3cQ_jbPmlnnX";
var LOGIN="https://orbitxy.com/";
function toLogin(){location.replace(LOGIN)}
/* buang sisa tanda # di alamat (ditinggalkan library login setelah memproses sesi) */
(function(){var n=0,iv=setInterval(function(){if(location.href.slice(-1)==="#")history.replaceState(null,"",location.pathname+location.search);if(++n>24)clearInterval(iv)},250)})();
/* serah-terima sesi dari halaman login (orbitxy.com) lewat tanda di bagian # alamat */
var H=location.hash,M1=/[#&]bk_at=([^&]+)/.exec(H),M2=/[#&]bk_rt=([^&]+)/.exec(H),ready=Promise.resolve();
var sb=window.supabase&&window.supabase.createClient?window.supabase.createClient(URL_,KEY):null;
if(!sb){toLogin();return}
window.bekkiSB=sb;

/* ===== simpan data per AKUN (server), bukan per browser ===== */
var SYNC=["bekki_riwayat_v2","bekki_proyek_v1","bekki_skills_v1","bekki_conn_v1","bekki_mem_v1","bekki_gi_v1","bekki_fb_v1","bekki_use_v1","bekki_av_v1"],UK="bekki_uid",syncOn=false,frozen=false,syncUid=null,syncTimer=null;
var _set=Storage.prototype.setItem,_rem=Storage.prototype.removeItem;
function isSync(st,k){return st===localStorage&&SYNC.indexOf(k)>-1}
Storage.prototype.setItem=function(k,v){if(frozen&&isSync(this,k))return;_set.apply(this,arguments);if(syncOn&&isSync(this,k))sched()};
Storage.prototype.removeItem=function(k){if(frozen&&isSync(this,k))return;_rem.apply(this,arguments);if(syncOn&&isSync(this,k))sched()};
function snap(){var o={};SYNC.forEach(function(k){var v=localStorage.getItem(k);if(v!==null)o[k]=v});return o}
function push(){if(!syncOn||!syncUid)return Promise.resolve();clearTimeout(syncTimer);syncTimer=null;
return sb.from("bekki_data").upsert({user_id:syncUid,data:snap(),updated_at:new Date().toISOString()}).then(function(){},function(){})}
function sched(){clearTimeout(syncTimer);syncTimer=setTimeout(push,1500)}
window.bekkiFlush=push;
document.addEventListener("visibilitychange",function(){if(document.visibilityState==="hidden"&&syncTimer)push()});
window.addEventListener("pagehide",function(){if(syncTimer)push()});
function clearSyncLocal(){SYNC.forEach(function(k){_rem.call(localStorage,k)});_rem.call(localStorage,UK)}
/* tarik data akun dari server; true = halaman sedang dimuat ulang */
function pullSync(uid){
syncUid=uid;
try{return pullSync2(uid)}catch(e){return Promise.resolve(false)}}
function pullSync2(uid){
return sb.from("bekki_data").select("data").eq("user_id",uid).maybeSingle().then(function(r){
if(r.error){return false}
var mk=localStorage.getItem(UK),flag=sessionStorage.getItem("bk_rl"),changed=false;
if(r.data&&r.data.data){
var d=r.data.data;frozen=true;
SYNC.forEach(function(k){var nv=d[k],cv=localStorage.getItem(k);
if(nv==null||nv===undefined){if(cv!==null){_rem.call(localStorage,k);changed=true}}
else if(nv!==cv){_set.call(localStorage,k,nv);changed=true}});
_set.call(localStorage,UK,uid);
if(changed&&!flag){sessionStorage.setItem("bk_rl","1");location.reload();return true}
frozen=false;sessionStorage.removeItem("bk_rl");syncOn=true;return false}
/* akun ini belum punya data di server */
if(mk&&mk!==uid){var had=SYNC.some(function(k){return localStorage.getItem(k)!==null});frozen=true;clearSyncLocal();_set.call(localStorage,UK,uid);
if(had&&!flag){sessionStorage.setItem("bk_rl","1");location.reload();return true}frozen=false}
_set.call(localStorage,UK,uid);sessionStorage.removeItem("bk_rl");syncOn=true;
return push().then(function(){return false})
}).catch(function(){frozen=false;return false})}
if(M1&&M2){ready=sb.auth.setSession({access_token:decodeURIComponent(M1[1]),refresh_token:decodeURIComponent(M2[1])}).catch(function(){});history.replaceState(null,"",location.pathname+location.search)}
/* token pengguna yang sedang login, dipakai script.js saat memanggil server */
window.bekkiToken=function(){return sb.auth.getSession().then(function(r){return r&&r.data&&r.data.session?r.data.session.access_token:KEY}).catch(function(){return KEY})};
/* keluar: hapus sesi di browser ini pasti (tanpa bergantung pada jaringan), lalu ke halaman login */
function clearLocal(){try{clearSyncLocal();[localStorage,sessionStorage].forEach(function(st){Object.keys(st).forEach(function(k){if(/^sb-.*-auth-token/.test(k)||/^sb-.*-code-verifier/.test(k))st.removeItem(k)})})}catch(e){}}
window.bekkiLogout=function(scope){
var done=false,t0=Promise.race([push(),new Promise(function(r){setTimeout(r,2000)})]);t0.then(function(){syncOn=false;go(scope)});};
function go(scope){
var done=false;function fin(){if(done)return;done=true;try{sb.auth.signOut({scope:"local"}).catch(function(){})}catch(e){}clearLocal();toLogin()}
var t=setTimeout(fin,scope==="global"?3500:1500);
try{sb.auth.signOut({scope:scope==="global"?"global":"local"}).then(function(){clearTimeout(t);fin()},function(){clearTimeout(t);fin()})}catch(e){clearTimeout(t);fin()}}
function logout(){window.bekkiLogout("local")}
function addLogout(){
var foot=document.querySelector(".sb-foot");if(!foot||document.getElementById("logoutBtn"))return;
var b=document.createElement("button");b.className="new-chat";b.id="logoutBtn";b.style.border="0";
b.innerHTML='<svg viewBox="0 0 24 24" style="font-size:16px"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/></svg>Keluar';
b.onclick=logout;foot.appendChild(b)}
ready.then(function(){return sb.auth.getSession()}).then(function(r){
if(!(r&&r.data&&r.data.session)){toLogin();return}
var uid=r.data.session.user.id;
return Promise.race([pullSync(uid),new Promise(function(x){setTimeout(function(){x(false)},4000)})]).then(function(rl){if(rl)return;document.documentElement.classList.add("auth-ok");
if(location.search.indexOf("code=")>-1)history.replaceState(null,"",location.pathname);else if(location.href.indexOf("#")>-1)history.replaceState(null,"",location.pathname+location.search);
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",addLogout);else addLogout()
})}).catch(toLogin);
sb.auth.onAuthStateChange(function(ev){if(ev==="SIGNED_OUT")toLogin()});
setTimeout(function(){if(!document.documentElement.classList.contains("auth-ok"))toLogin()},8000);
})();

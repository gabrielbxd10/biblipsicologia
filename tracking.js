(function(){
'use strict';
const keys=['utm_source','utm_campaign','utm_medium','utm_content','utm_term','utm_id','src','sck','xcod','fbclid','gclid','gbraid','wbraid','ttclid','tbclid','click_id','CampaignID','adSETID','CreativeID','pixel_id','cid'];
const storageKey='biblioteca_attribution_v1';const now=Date.now();let saved={};
try{const record=JSON.parse(localStorage.getItem(storageKey)||'null');if(record&&record.expires>now)saved=record.params||{}}catch{}
const incoming=new URLSearchParams(location.search);if(keys.some(key=>incoming.has(key)&&incoming.get(key))){saved={};keys.forEach(key=>{const value=incoming.get(key);if(value)saved[key]=value});try{localStorage.setItem(storageKey,JSON.stringify({expires:now+7*24*60*60*1000,params:saved}))}catch{}}
function checkoutUrl(base){const url=new URL(base);const params=new URLSearchParams(saved);keys.forEach(key=>{const v=incoming.get(key);if(v)params.set(key,v)});if(window.utmParams&&typeof window.utmParams.forEach==='function'){window.utmParams.forEach((value,key)=>{if(keys.includes(key)&&value)params.set(key,value)})}keys.forEach(key=>{const value=params.get(key);if(value)url.searchParams.set(key,value)});
if(!url.searchParams.get('sck')){const values=['utm_source','utm_campaign','utm_medium','utm_content','utm_term'].map(key=>params.get(key)||'');if(values.some(Boolean)){const sck=values.join('hQwK21wXxR');url.searchParams.set('sck',sck.slice(0,255));if(!url.searchParams.get('xcod'))url.searchParams.set('xcod',sck.slice(0,255))}}
return url.toString()}
window.BibliotecaTracking={checkoutUrl,initiateCheckout(value,plan){if(typeof window.fbq==='function'){window.fbq('track','InitiateCheckout',{value:Number(value),currency:'USD',content_ids:['Q107777532N'],content_type:'product',num_items:1,content_name:'Biblioteca de Psicología Completa',contents:[{id:'Q107777532N',quantity:1,item_price:Number(value)}]})}}};
if(!window.fbq){const n=window.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!window._fbq)window._fbq=n;n.push=n;n.loaded=true;n.version='2.0';n.queue=[];const script=document.createElement('script');script.async=true;script.src='https://connect.facebook.net/en_US/fbevents.js';document.head.appendChild(script)}
window.fbq('init','973045345819425');window.fbq('track','PageView');window.fbq('track','ViewContent',{content_ids:['Q107777532N'],content_type:'product',content_name:'Biblioteca de Psicología Completa'});
})();

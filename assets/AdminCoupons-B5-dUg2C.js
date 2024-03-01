import{a as x,S as v,L as N}from"./axios-CdaRIhLA.js";import{h as V}from"./moment-Cl4UOzQZ.js";import{P as U}from"./PaginationComponent-D_Pfqg6H.js";import{r as i,l as y,o as b,c as f,d as k,t as _,a as e,m as g,v as C,q as Y,p as R,f as P,h as A,b as w,u as B,F as M,n as O,j,k as z}from"./index-D8-JcWOM.js";import{_ as F}from"./plugin-vueexport-helper-DlAUqK2U.js";const $=p=>(R("data-v-710da308"),p=p(),P(),p),H={method:"dialog"},q={class:"bg-#212529 p-4 flex justify-between items-center"},G={class:"text-white"},J={class:"grid grid-cols-2 gap-6 p-5"},K={class:"input-group"},Q=$(()=>e("label",{for:"name"},"名稱：",-1)),W={class:"input-group"},X=$(()=>e("label",{for:"code"},"優惠碼：",-1)),Z={class:"input-group"},ee=$(()=>e("label",{for:"due_date"},"日期：",-1)),te={class:"input-group mb-4"},oe=$(()=>e("label",{for:"percent"},"優惠比例：",-1)),ae={for:"is_paid"},se={class:"text-end p-3 border-t border-solid border-#dee2e6"},le={__name:"CouponModal",props:["tempCoupon","isNew"],setup(p,{expose:m}){const u=p,o=i(u.tempCoupon),r=i(),c=i("");function h(d){d.target.nodeName==="DIALOG"&&r.value.close()}return y(()=>u.tempCoupon,()=>{o.value={...u.tempCoupon},o.value.due_date&&(c.value=V(o.value.due_date).format("YYYY-MM-DD")),o.value.is_enabled||(o.value.is_enabled=0)}),y(()=>c.value,()=>{o.value.due_date=new Date(c.value).getTime()}),m({dialog:r}),(d,t)=>(b(),f("dialog",{ref_key:"dialog",ref:r,class:"max-w-1140px w-100% border-0 rd p-0 backdrop:backdrop-blur-3",onClick:h},[k(_(o.value)+" ",1),e("form",H,[e("div",q,[e("h3",G,_(p.isNew?"新增優惠券":"編輯優惠券"),1),e("button",{type:"button",class:"i-ic:baseline-close p-2 text-white font-size-4 hover:cursor-pointer",onClick:t[0]||(t[0]=a=>r.value.close())})]),e("div",J,[e("div",K,[Q,g(e("input",{type:"text",id:"name",placeholder:"請輸入名稱","onUpdate:modelValue":t[1]||(t[1]=a=>o.value.title=a)},null,512),[[C,o.value.title]])]),e("div",W,[X,g(e("input",{type:"text",id:"code",placeholder:"請輸入優惠碼","onUpdate:modelValue":t[2]||(t[2]=a=>o.value.code=a)},null,512),[[C,o.value.code]])]),e("div",Z,[ee,g(e("input",{type:"date",id:"due_date",pattern:"yyyy-MM-dd","onUpdate:modelValue":t[3]||(t[3]=a=>c.value=a)},null,512),[[C,c.value]])]),e("div",te,[oe,g(e("input",{type:"number",id:"percent",placeholder:"請輸入折扣百分比","onUpdate:modelValue":t[4]||(t[4]=a=>o.value.percent=a),min:"0",max:"100"},null,512),[[C,o.value.percent,void 0,{number:!0}]])]),e("div",null,[e("label",ae,[g(e("input",{type:"checkbox",id:"is_paid","onUpdate:modelValue":t[5]||(t[5]=a=>o.value.is_enabled=a),class:"custom-checkbox","true-value":1,"false-value":0},null,512),[[Y,o.value.is_enabled]]),k(" 是否啟用 ")])])]),e("div",se,[e("button",{type:"button",class:"m-1 px-3 py-1.5 bg-transparent text-#6c757d border-1 border-solid border-#6c757d rd hover:cursor-pointer hover:bg-#5c636a hover:text-white",onClick:t[6]||(t[6]=a=>r.value.close())},"取消"),e("button",{type:"button",class:"m-1 px-3 py-1.5 text-white bg-#0d6efd border-0 rd hover:cursor-pointer hover:bg-#0b5ed7",onClick:t[7]||(t[7]=a=>d.$emit("confirmCoupon",o.value))},"確定")])])],512))}},ne=F(le,[["__scopeId","data-v-710da308"]]);var de={VITE_URL:"https://vue3-course-api.hexschool.io",VITE_PATH:"payroom",BASE_URL:"/vue2023-week7/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const re={class:"container mx-a relative"},ie={class:"w-100% mt-6"},ue=e("thead",{class:"border-b-1 border-black border-solid fw-bold text-left"},[e("tr",null,[e("th",{width:"120"}," 名稱 "),e("th",null,"優惠碼"),e("th",null," 到期日 "),e("th",null," 百分比 "),e("th",{width:"100",class:"text-center"}," 是否啟用 "),e("th",{width:"120"}," 編輯 ")])],-1),ce={class:"text-center"},pe={key:0,class:"text-#198754"},ve={key:1,class:"text-red"},be=["onClick"],me=["onClick"],Ce={__name:"AdminCoupons",setup(p){const{VITE_URL:m,VITE_PATH:u}=de,o=i([]),r=i(!1),c=i({}),h=i({}),d=i(),t=i(!1);function a(l=1){r.value=!0,x.get(`${m}/v2/api/${u}/admin/coupons?page=${l}`).then(s=>{o.value=s.data.coupons,c.value=s.data.pagination}).catch(s=>{v.fire({icon:"error",title:"錯誤發生",text:s.response.data.message})}).finally(()=>{r.value=!1})}function D(){t.value=!0,h.value={},d.value.dialog.showModal()}function E(l){return V(l).format("YYYY-MM-DD")}function T(l){h.value=l,t.value=!1,d.value.dialog.showModal()}function I(l){t.value?x.post(`${m}/v2/api/${u}/admin/coupon`,{data:l}).then(s=>{v.fire({title:`${s.data.message}`,icon:"success",didClose:()=>{a()}}),d.value.dialog.close()}).catch(s=>{v.fire({title:"錯誤發生",text:`${s.response.data.message}`,icon:"error",target:"dialog"})}):x.put(`${m}/v2/api/${u}/admin/coupon/${l.id}`,{data:l}).then(s=>{v.fire({title:`${s.data.message}`,icon:"success",didClose:()=>{a()}}),d.value.dialog.close()}).catch(s=>{v.fire({title:"錯誤發生",text:`${s.response.data.message}`,icon:"error",target:"dialog"})})}function S(l){const{id:s}=l;x.delete(`${m}/v2/api/${u}/admin/coupon/${s}`).then(n=>{v.fire({title:`${n.data.message}`,icon:"success",didClose:()=>{a()}}),d.value.dialog.close()}).catch(n=>{v.fire({title:"錯誤發生",text:`${n.response.data.message}`,icon:"error",target:"dialog"})})}return A(()=>{a()}),(l,s)=>(b(),f(M,null,[e("div",re,[w(B(N),{active:r.value,"full-page":!1},null,8,["active"]),e("div",{class:"text-end mt-6"},[e("button",{type:"button",class:"bg-#0d6efd border-0 text-white cursor-pointer inline-block px-3 py-1.5 rd font-size-4 hover:bg-#0b5ed7",onClick:D},"建立優惠券")]),e("table",ie,[ue,e("tbody",null,[(b(!0),f(M,null,O(o.value,n=>(b(),f("tr",{class:"border-b border-#DEE2E6 border-solid",key:n.id},[e("td",null,_(n.title),1),e("td",null,_(n.code),1),e("td",null,_(E(n.due_date)),1),e("td",null,_(n.percent),1),e("td",ce,[n.is_enabled?(b(),f("span",pe,"啟用")):(b(),f("span",ve,"未啟用"))]),e("td",null,[e("div",null,[e("button",{type:"button",class:"text-#0d6efd bg-transparent border-1 border-#0d6efd border-solid rd-tl rd-bl px-2 py-1 hover:bg-#0d6efd hover:text-white hover:cursor-pointer",onClick:L=>T(n)}," 編輯 ",8,be),e("button",{type:"button",class:"text-#dc3545 bg-transparent border-1 border-#de3545 border-solid rd-tr rd-br px-2 py-1 hover:bg-#de3545 hover:text-white hover:cursor-pointer",onClick:L=>S(n)}," 刪除 ",8,me)])])]))),128))])])]),w(ne,{"temp-coupon":h.value,ref_key:"couponModalRef",ref:d,"is-new":t.value,onConfirmCoupon:I},null,8,["temp-coupon","is-new"]),o.value.length?(b(),j(U,{key:0,pages:c.value,onChangePage:a},null,8,["pages"])):z("",!0)],64))}};export{Ce as default};

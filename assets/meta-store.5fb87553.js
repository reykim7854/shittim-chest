import{j as d,k as o,c,h as m,i as u,g as v,l as f,m as g,w as y,X as s,D as C,C as A,a as D,Y as r,Z as B}from"./index.922fa320.js";import{h as F}from"./render.89e73213.js";var w=d({name:"QPage",props:{padding:Boolean,styleFn:Function},setup(t,{slots:e}){const{proxy:{$q:n}}=v(),a=u(f,o);if(a===o)return console.error("QPage needs to be a deep child of QLayout"),o;if(u(g,o)===o)return console.error("QPage needs to be child of QPageContainer"),o;const l=c(()=>{const i=(a.header.space===!0?a.header.size:0)+(a.footer.space===!0?a.footer.size:0);if(typeof t.styleFn=="function"){const p=a.isContainer.value===!0?a.containerHeight.value:n.screen.height;return t.styleFn(i,p)}return{minHeight:a.isContainer.value===!0?a.containerHeight.value-i+"px":n.screen.height===0?i!==0?`calc(100vh - ${i}px)`:"100vh":n.screen.height-i+"px"}}),h=c(()=>`q-page${t.padding===!0?" q-layout-padding":""}`);return()=>m("main",{class:h.value,style:l.value},F(e.default))}});function S(t){{const e={active:!0};if(typeof t=="function"){const n=c(t);e.val=n.value,y(n,a=>{e.val=a,e.active===!0&&s()})}else e.val=t;r.push(e),s(),C(()=>{e.active=!0,s()}),A(()=>{e.active=!1,s()}),D(()=>{r.splice(r.indexOf(e),1),s()})}}const q=B("meta",{state:()=>({metaData:{title:"Home",titleTemplate:t=>`${t} - Shittim Chest`,meta:{description:{name:"description",content:"Welcome to Shittim Chest! A Blue Archive Interactive App"},keywords:{name:"keywords",content:"Shittim Chest,Blue Archive,Buruaka,\u30D6\u30EB\u30FC\u30A2\u30FC\u30AB\u30A4\u30D6,\u30D6\u30EB\u30A2\u30AB"},equiv:{"http-equiv":"Content-Type",content:"text/html; charset=UTF-8"}},noscript:{default:"This is content for browsers with no JS (or disabled JS)"}}}),actions:{async setMetaData(t="Home",e="A Blue Archive Interactive App"){this.$patch(n=>{n.metaData.title=t,n.metaData.meta.description.content=e}),S(this.metaData)}}});export{w as Q,q as u};

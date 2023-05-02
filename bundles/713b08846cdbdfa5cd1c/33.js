(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{1764:function(e,t,r){"use strict";r.r(t),r.d(t,"default",(function(){return p}));var n=r(122),a=r.n(n),o=r(120),i=r.n(o),s=r(1),l=r(686),c=r(121),h=r(137),u=r(141);var d=function(e){return e.Edit="edit",e.Importing="importing",e}(d||{});class p extends i.a.Component{constructor(e){super(e),a()(this,"unmounted",!1),a()(this,"file",Object(o.createRef)()),a()(this,"onFormChange",(()=>{var e;const t=null===(e=this.file.current)||void 0===e?void 0:e.files;this.setState({enableSubmit:""!==this.state.passphrase&&!(null==t||!t.length)})})),a()(this,"onPassphraseChange",(e=>{this.setState({passphrase:e.target.value},this.onFormChange)})),a()(this,"onFormSubmit",(e=>{var t,r;e.preventDefault();const n=null===(t=this.file.current)||void 0===t||null===(r=t.files)||void 0===r?void 0:r[0];return n&&this.startImport(n,this.state.passphrase),!1})),a()(this,"onCancelClick",(e=>(e.preventDefault(),this.props.onFinished(!1),!1))),this.state={enableSubmit:!1,phase:d.Edit,errStr:null,passphrase:""}}componentWillUnmount(){this.unmounted=!0}startImport(e,t){return this.setState({errStr:null,phase:d.Importing}),function(e){return new Promise(((t,r)=>{const n=new FileReader;n.onload=e=>{var n;null!==(n=e.target)&&void 0!==n&&n.result?t(e.target.result):r(new Error("Failed to read file due to unknown error"))},n.onerror=r,n.readAsArrayBuffer(e)}))}(e).then((e=>l.a(e,t))).then((e=>this.props.matrixClient.importRoomKeys(JSON.parse(e)))).then((()=>{this.props.onFinished(!0)})).catch((e=>{if(s.a.error("Error importing e2e keys:",e),this.unmounted)return;const t=e.friendlyText||Object(c.b)("Unknown error");this.setState({errStr:t,phase:d.Edit})}))}render(){const e=this.state.phase!==d.Edit;return i.a.createElement(h.a,{className:"mx_importE2eKeysDialog",onFinished:this.props.onFinished,title:Object(c.b)("Import room keys")},i.a.createElement("form",{onSubmit:this.onFormSubmit},i.a.createElement("div",{className:"mx_Dialog_content"},i.a.createElement("p",null,Object(c.b)("This process allows you to import encryption keys that you had previously exported from another Matrix client. You will then be able to decrypt any messages that the other client could decrypt.")),i.a.createElement("p",null,Object(c.b)("The export file will be protected with a passphrase. You should enter the passphrase here, to decrypt the file.")),i.a.createElement("div",{className:"error"},this.state.errStr),i.a.createElement("div",{className:"mx_E2eKeysDialog_inputTable"},i.a.createElement("div",{className:"mx_E2eKeysDialog_inputRow"},i.a.createElement("div",{className:"mx_E2eKeysDialog_inputLabel"},i.a.createElement("label",{htmlFor:"importFile"},Object(c.b)("File to import"))),i.a.createElement("div",{className:"mx_E2eKeysDialog_inputCell"},i.a.createElement("input",{ref:this.file,id:"importFile",type:"file",autoFocus:!0,onChange:this.onFormChange,disabled:e}))),i.a.createElement("div",{className:"mx_E2eKeysDialog_inputRow"},i.a.createElement(u.a,{label:Object(c.b)("Enter passphrase"),value:this.state.passphrase,onChange:this.onPassphraseChange,size:64,type:"password",disabled:e})))),i.a.createElement("div",{className:"mx_Dialog_buttons"},i.a.createElement("input",{className:"mx_Dialog_primary",type:"submit",value:Object(c.b)("Import"),disabled:!this.state.enableSubmit||e}),i.a.createElement("button",{onClick:this.onCancelClick,disabled:e},Object(c.b)("Cancel")))))}}},686:function(e,t,r){"use strict";r.d(t,"a",(function(){return c})),r.d(t,"b",(function(){return h}));var n=r(1),a=r(121),o=r(132);const i=window.crypto.subtle||window.crypto.webkitSubtle;function s(e,t){return{message:e,friendlyText:t}}function l(){return Object(a.b)("Your browser does not support the required cryptography extensions")}async function c(e,t){const r=function(e){const t=(new TextDecoder).decode(new Uint8Array(e));let r=0;for(;;){const e=t.indexOf("\n",r);if(e<0)throw new Error("Header line not found");const n=t.slice(r,e).trim();if(r=e+1,n===d)break}const n=r;for(;;){const e=t.indexOf("\n",r);if(t.slice(r,e<0?void 0:e).trim()===p)break;if(e<0)throw new Error("Trailer line not found");r=e+1}const a=r;return function(e){const t=window.atob(e),r=new Uint8Array(t.length);for(let e=0;e<t.length;e++)r[e]=t.charCodeAt(e);return r}(t.slice(n,a))}(e),n=o.b.get().brand;if(r.length<1)throw s("Invalid file: too short",Object(a.b)("Not a valid %(brand)s keyfile",{brand:n}));if(1!==r[0])throw s("Unsupported version",Object(a.b)("Not a valid %(brand)s keyfile",{brand:n}));const c=r.length-69;if(c<0)throw s("Invalid file: too short",Object(a.b)("Not a valid %(brand)s keyfile",{brand:n}));const h=r.subarray(1,17),m=r.subarray(17,33),y=r[33]<<24|r[34]<<16|r[35]<<8|r[36],b=r.subarray(37,37+c),f=r.subarray(-32),[w,g]=await u(h,y,t),E=r.subarray(0,-32);let v,C;try{v=await i.verify({name:"HMAC"},g,f,E)}catch(e){throw s("subtleCrypto.verify failed: "+e,l())}if(!v)throw s("hmac mismatch",Object(a.b)("Authentication check failed: incorrect password?"));try{C=await i.decrypt({name:"AES-CTR",counter:m,length:64},w,b)}catch(e){throw s("subtleCrypto.decrypt failed: "+e,l())}return(new TextDecoder).decode(new Uint8Array(C))}async function h(e,t,r){const n=(r=r||{}).kdf_rounds||5e5,a=new Uint8Array(16);window.crypto.getRandomValues(a);const o=new Uint8Array(16);window.crypto.getRandomValues(o),o[8]&=127;const[c,h]=await u(a,n,t),y=(new TextEncoder).encode(e);let b;try{b=await i.encrypt({name:"AES-CTR",counter:o,length:64},c,y)}catch(e){throw s("subtleCrypto.encrypt failed: "+e,l())}const f=new Uint8Array(b),w=1+a.length+o.length+4+f.length+32,g=new Uint8Array(w);let E=0;g[E++]=1,g.set(a,E),E+=a.length,g.set(o,E),E+=o.length,g[E++]=n>>24,g[E++]=n>>16&255,g[E++]=n>>8&255,g[E++]=255&n,g.set(f,E),E+=f.length;const v=g.subarray(0,E);let C;try{C=await i.sign({name:"HMAC"},h,v)}catch(e){throw s("subtleCrypto.sign failed: "+e,l())}const S=new Uint8Array(C);return g.set(S,E),function(e){const t=96,r=Math.ceil(e.length/t),n=new Array(r+3);n[0]=d;let a,o=0;for(a=1;a<=r;a++)n[a]=m(e.subarray(o,o+t)),o+=t;return n[a++]=p,n[a]="",(new TextEncoder).encode(n.join("\n")).buffer}(g)}async function u(e,t,r){const a=new Date;let o,c;try{o=await i.importKey("raw",(new TextEncoder).encode(r),{name:"PBKDF2"},!1,["deriveBits"])}catch(e){throw s("subtleCrypto.importKey failed: "+e,l())}try{c=await i.deriveBits({name:"PBKDF2",salt:e,iterations:t,hash:"SHA-512"},o,512)}catch(e){throw s("subtleCrypto.deriveBits failed: "+e,l())}const h=new Date;n.a.log("E2e import/export: deriveKeys took "+(h.getTime()-a.getTime())+"ms");const u=c.slice(0,32),d=c.slice(32),p=i.importKey("raw",u,{name:"AES-CTR"},!1,["encrypt","decrypt"]).catch((e=>{throw s("subtleCrypto.importKey failed for AES key: "+e,l())})),m=i.importKey("raw",d,{name:"HMAC",hash:{name:"SHA-256"}},!1,["sign","verify"]).catch((e=>{throw s("subtleCrypto.importKey failed for HMAC key: "+e,l())}));return Promise.all([p,m])}const d="-----BEGIN MEGOLM SESSION DATA-----",p="-----END MEGOLM SESSION DATA-----";function m(e){const t=String.fromCharCode.apply(null,Array.from(e));return window.btoa(t)}}}]);
//# sourceMappingURL=33.js.map
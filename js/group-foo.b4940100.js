(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["group-foo"],{"162e":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-container",{staticClass:"container"},[a("el-aside",{staticClass:"aside",attrs:{width:"auto"}},[a("layout-aside",{staticClass:"layout-aside",attrs:{isCollapse:t.isCollapse}})],1),a("el-container",[a("el-header",{staticClass:"header"},[a("div",{staticClass:"layout-head"},[a("div",[a("span",{class:{"el-icon-s-fold":t.isCollapse,"el-icon-s-unfold":!t.isCollapse},on:{click:function(e){t.isCollapse=!t.isCollapse}}}),a("span",[t._v("欢迎来到阳光养猪场")])]),a("el-dropdown",[a("div",{staticClass:"select"},[a("img",{staticClass:"user-avatar",attrs:{src:t.user.photo,alt:""}}),a("span",[t._v(t._s(t.user.name))]),a("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[a("el-dropdown-item",{nativeOn:{click:function(e){return t.onSettings(e)}}},[t._v("设置")]),a("el-dropdown-item",{nativeOn:{click:function(e){return t.onLogout(e)}}},[t._v("退出")])],1)],1)],1)]),a("el-main",{staticClass:"main"},[a("router-view")],1)],1)],1)},r=[],s=(a("b0c0"),a("96cf"),a("1da1")),i=a("50f8"),l=a("c24f"),o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-menu",{staticClass:"el-menu-vertical-demo",attrs:{"default-active":t.path,"background-color":"#545c64","text-color":"#fff","active-text-color":"#ffd04b",router:"",collapse:t.isCollapse}},[a("el-menu-item",{attrs:{index:"/"}},[a("i",{staticClass:"el-icon-s-home"}),a("span",{attrs:{slot:"title"},slot:"title"},[t._v("首页")])]),a("el-menu-item",{attrs:{index:"/article"}},[a("i",{staticClass:"el-icon-document"}),a("span",{attrs:{slot:"title"},slot:"title"},[t._v("内容管理")])]),a("el-menu-item",{attrs:{index:"/image"}},[a("i",{staticClass:"el-icon-picture"}),a("span",{attrs:{slot:"title"},slot:"title"},[t._v("素材管理")])]),a("el-menu-item",{attrs:{index:"/publish"}},[a("i",{staticClass:"iconfont iconpublish"}),a("span",{attrs:{slot:"title"},slot:"title"},[t._v("发布文章")])]),a("el-menu-item",{attrs:{index:"/comment"}},[a("i",{staticClass:"el-icon-chat-dot-round"}),a("span",{attrs:{slot:"title"},slot:"title"},[t._v("评论管理")])]),a("el-menu-item",{attrs:{index:"/fans"}},[a("i",{staticClass:"iconfont icongift"}),a("span",{attrs:{slot:"title"},slot:"title"},[t._v("粉丝管理")])]),a("el-menu-item",{attrs:{index:"/settings"}},[a("i",{staticClass:"el-icon-setting"}),a("span",{attrs:{slot:"title"},slot:"title"},[t._v("个人设置")])])],1)},c=[],u={data:function(){return{path:""}},props:["is-collapse"],created:function(){this.getPath()},methods:{getPath:function(){this.path=this.$route.path}}},d=u,f=(a("4bf7"),a("2877")),p=Object(f["a"])(d,o,c,!1,null,"60f638e8",null),m=p.exports,b={data:function(){return{user:{},isCollapse:!0}},created:function(){var t=this;this.getProfile(),i["a"].$on("user-info",(function(e){t.user.name=e.name,t.user.photo=e.photo}))},methods:{getProfile:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(l["a"])();case 2:a=e.sent,t.user=a.data.data;case 4:case"end":return e.stop()}}),e)})))()},onLogout:function(){var t=this;this.$confirm("确定退出?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){window.localStorage.removeItem("user"),t.$router.push("/login")})).catch((function(){t.$message({type:"info",message:"已取消退出"})}))},onSettings:function(){this.$router.push("/settings")}},components:{LayoutAside:m}},h=b,g=(a("32c6"),Object(f["a"])(h,n,r,!1,null,"5bcb2200",null));e["default"]=g.exports},"230c":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("el-card",{staticClass:"filter-card"},[n("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[n("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[n("el-breadcrumb-item",{attrs:{to:"/"}},[t._v("首页")]),n("el-breadcrumb-item",[t._v("内容管理")])],1)],1),n("el-form",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],ref:"form",attrs:{model:t.form,"label-width":"100px",size:"mini",disabled:t.loading}},[n("el-form-item",{attrs:{label:"状态"}},[n("el-radio-group",{model:{value:t.status,callback:function(e){t.status=e},expression:"status"}},[n("el-radio",{attrs:{label:null}},[t._v("全部")]),n("el-radio",{attrs:{label:0}},[t._v("草稿")]),n("el-radio",{attrs:{label:1}},[t._v("待审核")]),n("el-radio",{attrs:{label:2}},[t._v("审核通过")]),n("el-radio",{attrs:{label:3}},[t._v("审核失败")]),n("el-radio",{attrs:{label:4}},[t._v("已删除")])],1)],1),n("el-form-item",{attrs:{label:"频道"}},[n("el-select",{attrs:{placeholder:"请选择频道"},model:{value:t.channelsId,callback:function(e){t.channelsId=e},expression:"channelsId"}},[n("el-option",{attrs:{label:"全部",value:null}}),t._l(t.channelList,(function(t){return n("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}))],2)],1),n("el-form-item",{attrs:{label:"日期"}},[n("el-date-picker",{attrs:{type:"datetimerange","start-placeholder":"开始日期","end-placeholder":"结束日期","default-time":["12:00:00"],format:"yyyy-MM-dd","value-format":"yyyy-MM-dd"},model:{value:t.pubDate,callback:function(e){t.pubDate=e},expression:"pubDate"}})],1),n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.loadArticles(1)}}},[t._v("查询")])],1)],1)],1),n("el-card",{staticClass:"box-card"},[n("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[n("span",[t._v("根据筛选条件共查询到 "+t._s(t.totalCount)+" 条结果：")])]),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"list-table",staticStyle:{width:"100%"},attrs:{data:t.articles,stripe:"",size:"mini"}},[n("el-table-column",{attrs:{prop:"date",label:"封面"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-image",{staticStyle:{width:"100px",height:"100px"},attrs:{src:e.row.cover.images[0],fit:"cover",lazy:""}},[n("div",{staticClass:"image-slot",staticStyle:{"text-align":"center"},attrs:{slot:"placeholder"},slot:"placeholder"},[t._v(" 加载中"),n("span",{staticClass:"dot"},[t._v("...")])]),n("div",{staticClass:"image-slot",attrs:{slot:"error"},slot:"error"},[n("img",{attrs:{src:a("cc64"),alt:""}})])])]}}])}),n("el-table-column",{attrs:{prop:"title",label:"标题"}}),n("el-table-column",{attrs:{label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-tag",{attrs:{type:t.articleStatus[e.row.status].type}},[t._v(t._s(t.articleStatus[e.row.status].text))])]}}])}),n("el-table-column",{attrs:{prop:"pubdate",label:"发布时间"}}),n("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{size:"mini",circle:"",icon:"el-icon-edit",type:"primary"},on:{click:function(a){return t.$router.push("/publish?id="+e.row.id)}}}),n("el-button",{attrs:{size:"mini",type:"danger",circle:"",icon:"el-icon-delete"},on:{click:function(a){return t.delArticle(e.row.id)}}})]}}])})],1),n("el-pagination",{attrs:{layout:"prev, pager, next",total:t.totalCount,background:"",disabled:t.loading,"current-page":t.page},on:{"current-change":t.getCurrent,"update:currentPage":function(e){t.page=e},"update:current-page":function(e){t.page=e}}})],1)],1)},r=[],s=(a("d3b7"),a("25f0"),a("96cf"),a("1da1")),i=a("2423"),l={name:"ArticleIndex",data:function(){return{articles:[],form:{name:"",region:"",date1:"",date2:"",delivery:!1,type:[],resource:"",desc:""},articleStatus:[{status:0,text:"草稿",type:"info"},{status:1,text:"待审核",type:""},{status:0,text:"审核通过",type:"success"},{status:0,text:"审核失败",type:"warning"},{status:0,text:"已删除",type:"danger"}],page:1,pageSize:10,totalCount:0,status:null,channelList:[],channelsId:null,pubDate:null,loading:!0}},created:function(){this.loadArticles(),this.loadArticleChannels()},methods:{loadArticles:function(){var t=arguments,e=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){var n,r,s,l,o;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return n=t.length>0&&void 0!==t[0]?t[0]:1,e.loading=!0,a.next=4,Object(i["g"])({page:n,per_page:e.pageSize,status:e.status,channel_id:e.channelsId,begin_pubdate:e.pubDate?e.pubDate[0]:null,end_pubdate:e.pubDate?e.pubDate[1]:null});case 4:r=a.sent,e.loading=!1,s=r.data.data,l=s.total_count,o=s.results,e.articles=o,e.totalCount=l;case 9:case"end":return a.stop()}}),a)})))()},getCurrent:function(t){this.loadArticles(t)},loadArticleChannels:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(i["f"])();case 2:a=e.sent,t.channelList=a.data.data.channels;case 4:case"end":return e.stop()}}),e)})))()},delArticle:function(t){var e=this;this.$confirm("确定删除?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(s["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,Object(i["b"])(t.toString());case 2:e.loadArticles(e.page);case 3:case"end":return a.stop()}}),a)})))).catch((function(){e.$message({type:"info",message:"已取消删除"})}))}}},o=l,c=(a("5edb"),a("2877")),u=Object(c["a"])(o,n,r,!1,null,"b90f41d8",null);e["default"]=u.exports},2423:function(t,e,a){"use strict";a.d(e,"g",(function(){return r})),a.d(e,"f",(function(){return s})),a.d(e,"b",(function(){return i})),a.d(e,"a",(function(){return l})),a.d(e,"e",(function(){return o})),a.d(e,"c",(function(){return c})),a.d(e,"d",(function(){return u}));var n=a("b775"),r=function(t){return Object(n["a"])({method:"GET",url:"/mp/v1_0/articles",params:t})},s=function(){return Object(n["a"])({method:"GET",url:"/mp/v1_0/channels"})},i=function(t){return Object(n["a"])({method:"DELETE",url:"/mp/v1_0/articles/".concat(t)})},l=function(t,e){return Object(n["a"])({method:"POST",url:"/mp/v1_0/articles",params:{draft:e},data:t})},o=function(t){return Object(n["a"])({method:"GET",url:"/mp/v1_0/articles/".concat(t)})},c=function(t,e,a){return Object(n["a"])({method:"PUT",url:"/mp/v1_0/articles/".concat(t),params:{draft:a},data:e})},u=function(t,e){return Object(n["a"])({method:"PUT",url:"/mp/v1_0/comments/status",params:{article_id:t},data:{allow_comment:e}})}},"25f0":function(t,e,a){"use strict";var n=a("6eeb"),r=a("825a"),s=a("d039"),i=a("ad6d"),l="toString",o=RegExp.prototype,c=o[l],u=s((function(){return"/a/b"!=c.call({source:"a",flags:"b"})})),d=c.name!=l;(u||d)&&n(RegExp.prototype,l,(function(){var t=r(this),e=String(t.source),a=t.flags,n=String(void 0===a&&t instanceof RegExp&&!("flags"in o)?i.call(t):a);return"/"+e+"/"+n}),{unsafe:!0})},"32c6":function(t,e,a){"use strict";var n=a("4a5f"),r=a.n(n);r.a},"35a2":function(t,e,a){},"39ab":function(t,e,a){},"4a5f":function(t,e,a){},"4bf7":function(t,e,a){"use strict";var n=a("35a2"),r=a.n(n);r.a},"500a":function(t,e,a){t.exports=a.p+"img/word.c2f99f11.png"},"50f8":function(t,e,a){"use strict";var n=a("8bbf"),r=a.n(n);e["a"]=new r.a},"5edb":function(t,e,a){"use strict";var n=a("39ab"),r=a.n(n);r.a},"602b":function(t,e,a){},"7abe":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},r=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"home"},[n("img",{attrs:{src:a("500a"),alt:""}})])}],s={name:"HomeIndex"},i=s,l=(a("ca18"),a("2877")),o=Object(l["a"])(i,n,r,!1,null,"6112da99",null);e["default"]=o.exports},ad6d:function(t,e,a){"use strict";var n=a("825a");t.exports=function(){var t=n(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.dotAll&&(e+="s"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},b0c0:function(t,e,a){var n=a("83ab"),r=a("9bf2").f,s=Function.prototype,i=s.toString,l=/^\s*function ([^ (]*)/,o="name";n&&!(o in s)&&r(s,o,{configurable:!0,get:function(){try{return i.call(this).match(l)[1]}catch(t){return""}}})},c24f:function(t,e,a){"use strict";a.d(e,"d",(function(){return r})),a.d(e,"a",(function(){return s})),a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return l}));var n=a("b775"),r=function(t){return Object(n["a"])({method:"POST",url:"/mp/v1_0/authorizations",data:t})},s=function(){return Object(n["a"])({method:"GET",url:"/mp/v1_0/user/profile"})},i=function(t){return Object(n["a"])({method:"PATCH",url:"/mp/v1_0/user/photo",data:t})},l=function(t){return Object(n["a"])({method:"PATCH",url:"/mp/v1_0/user/profile",data:t})}},ca18:function(t,e,a){"use strict";var n=a("602b"),r=a.n(n);r.a},cc64:function(t,e,a){t.exports=a.p+"img/20.995ee5a9.png"}}]);
//# sourceMappingURL=group-foo.b4940100.js.map
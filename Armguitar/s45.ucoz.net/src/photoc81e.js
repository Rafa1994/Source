function _uFrame(b){this.props=$.extend({color:"white",width:1,parentnode:document.body,callmousemove:null,css:{}},b||{});this.obj=[];for(var a=0;a<=3;a++){this.obj[a]=$("<div></div>").css(this.props.css).css({position:"absolute",display:"none",background:this.props.color,width:this.props.width+"px",height:this.props.width+"px",fontSize:0,overflow:"hidden"}).prependTo(this.props.parentnode).get(0);if(this.props.callmousemove){$(this.obj[a]).bind("mousemove",this.props.callmousemove,_uFrame._trigmousemove)}}}_uFrame._trigmousemove=function(a){$(a.data).trigger(a)};_uFrame.prototype={show:function(a,e,c,d){if(c<1||d<1){return}var b=this.props.width;$(this.obj[0]).css({left:a+"px",top:e+"px",width:(c-b)+"px"});$(this.obj[1]).css({left:(a+b)+"px",top:(e+d-b)+"px",width:(c-b)+"px"});$(this.obj[2]).css({left:a+"px",top:(e+b)+"px",height:(d-b)+"px"});$(this.obj[3]).css({left:(a+c-b)+"px",top:e+"px",height:(d-b)+"px"});$(this.obj).css("display","")},hide:function(){$(this.obj).css("display","none")},destroy:function(){$(this.obj).remove();this.obj=null}};function _uFramePile(a,b,e,d){this.n=a;this.neg=b;this.defshow=d;this.props=$.extend({colors:[],widths:[],empty:[],parentnode:document.body,callmousemove:null,css:{}},e||{});this.objs=[];for(var c=0;c<a;c++){if(!this.props.empty[c]){this.objs[c]=new _uFrame({color:this.props.colors[c],width:this.props.widths[c],css:this.props.css,parentnode:this.props.parentnode,callmousemove:this.props.callmousemove})}else{this.objs[c]=null}}}_uFramePile.prototype={show:function(a,h,d,e,f){var b=f?f:this.defshow;var g=0;for(var c=0;c<this.n-this.neg;c++){if(this.objs[c]){if(b&(1<<c)){this.objs[c].show(a+g,h+g,d-g*2,e-g*2)}else{this.objs[c].hide()}}g+=this.props.widths[c]}g=0;for(var c=this.n-this.neg;c<this.n;c++){g+=this.props.widths[c];if(this.objs[c]){if(b&(1<<c)){this.objs[c].show(a-g,h-g,d+g*2,e+g*2)}else{this.objs[c].hide()}}}},hide:function(){for(var a=0;a<this.n;a++){if(this.objs[a]){this.objs[a].hide()}}},destroy:function(){for(var a=0;a<this.n;a++){if(this.objs[a]){this.objs[a].destroy();this.objs[a]=null}}}};function _uPhotoGUI(photo,width,height,frames,opts){this.obj=typeof(photo)=="string"?$("#"+photo)[0]:photo;if(!this.obj){return}this.width=width?width:this.obj.width;this.obj.width=this.width;this.height=height?height:this.obj.height;this.obj.height=this.height;if(this.width<20||this.height<20){return}this.idx=_uPhotoGUI.nextidx++;_uPhotoGUI.all[this.idx]=this;this.destroyed=0;this.mode=0;this.frames=frames||[];this.props=$.extend({edit:0,parentnode:document.body,firstshow:'<div style="border:1px solid white"></div>',tipbox:'<div style="padding:2px; background:white;opacity:0.80; filter:alpha(opacity=80)"></div>',tipframe:'<div style="background:url(/.s/img/1px.gif); z-index:2"></div>',tipframepile:[3,1,["black","white","#E0E030"],[1,1,1],3],pilelinecss:{opacity:0.9,zIndex:2},startbut:null,stopbut:null,sizeboxcss:{background:"white",opacity:0.8,zIndex:3},indframe:'<div style="background:black; opacity:0.10; filter:alpha(opacity=10);z-index:6"></div>',indframepile:[2,1,["black","white"],[1,1],3],editframe:'<div style="cursor:move;background:#FFFF00; opacity:0.10; filter:alpha(opacity=10); z-index:2"></div>',editframepile:[2,1,["black","white"],[1,1],3],addwndtitle:"New",addwndcont:"&nbsp;",addwndw:-200,addwndh:-80,addwndparent:null,app:null,tipfunc:null,addfunc:null,rebuildonedit:0,delfunc:null,showdialog:null},opts||{});this.edit=this.props.edit;this.tmtip=-1;this.tipactive=0;this.tipbox=typeof(this.props.tipbox)=="string"?$(this.props.tipbox)[0]:this.props.tipbox;this.tipframe=typeof(this.props.tipframe)=="string"?$(this.props.tipframe)[0]:this.props.tipframe;this.tipframepile=new _uFramePile(this.props.tipframepile[0],this.props.tipframepile[1],{colors:this.props.tipframepile[2],widths:this.props.tipframepile[3],empty:this.props.tipframepile[5],css:this.props.pilelinecss,parentnode:this.props.parentnode},this.props.tipframepile[4]);with(this){$([tipbox,tipframe]).css({display:"none",position:"absolute",zIndex:1}).prependTo(props.parentnode);$([tipframe]).css({overflow:"hidden",fontSize:0})}this.firstshow=1;this.sizebox={};this.editbox=[];this.indwsize=this.indhsize=(this.width+this.height)/20>20?Math.floor((this.width+this.height)/40)*2:20;if(this.edit){this.indframe=typeof(this.props.indframe)=="string"?$(this.props.indframe)[0]:this.props.indframe;this.indframepile=new _uFramePile(this.props.indframepile[0],this.props.indframepile[1],{colors:this.props.indframepile[2],widths:this.props.indframepile[3],empty:this.props.indframepile[5],css:this.props.pilelinecss,parentnode:this.props.parentnode,callmousemove:this.obj},this.props.indframepile[4]);this.editframe=typeof(this.props.editframe)=="string"?$(this.props.editframe)[0]:this.props.editframe;this.editframepile=new _uFramePile(this.props.editframepile[0],this.props.editframepile[1],{colors:this.props.editframepile[2],widths:this.props.editframepile[3],empty:this.props.editframepile[5],css:this.props.pilelinecss,parentnode:this.props.parentnode,callmousemove:this.obj},this.props.editframepile[4]);with(this){$([indframe,editframe]).css({display:"none",position:"absolute",fontSize:0,overflow:"hidden",zIndex:1}).prependTo(props.parentnode)}this._resize=new _uDraggable(this,this._onrsmousemove,null);this._moveedit=new _uDraggable(this,this._ondrageditmousemove,null);this._resizeind=new _uDraggable(this,this._onrsindmousemove,null,null,this._onrsindstop);for(var i in {nw:1,ne:1,sw:1,se:1,n:1,s:1,w:1,e:1}){this.sizebox[i]=$("<div></div>").css(this.props.sizeboxcss).css({position:"absolute",display:"none",width:"6px",height:"6px",fontSize:0,cursor:i+"-resize",overflow:"hidden"}).prependTo(this.props.parentnode).bind("mousedown",{obj:this,tp:i},_uPhotoGUI._ondownsizebox).get(0)}this.addwnd=new _uWnd("",this.props.addwndtitle,this.props.addwndw,this.props.addwndh,{hidden:1,autosize:0,min:0,max:0,fadetype:0,fadeclosetype:0,closeonesc:1,parent:this.props.addwndparent,resize:0,fixed:0,onbeforeclose:function(w){w.hide();w._phgui.startedit();return 1}},this.props.addwndcont,null,this.props.app);this.addwnd._phgui=this;this.startbut=typeof(this.props.startbut)=="string"?$("#"+this.props.startbut)[0]:this.props.startbut;this.stopbut=typeof(this.props.stopbut)=="string"?$("#"+this.props.stopbut)[0]:this.props.stopbut;$(this.indframe).bind("click",this,function(e){e.data._onclickind(e)}).bind("mousedown",this,_uPhotoGUI._ondownindframe);$(this.editframe).bind("mousedown",this,_uPhotoGUI._ondowneditframe)}var dt=this.frames;for(var i=0;i<dt.length;i++){dt[i][0]=Math.floor(dt[i][0]*this.width);dt[i][1]=Math.floor(dt[i][1]*this.height);dt[i][2]=Math.floor(dt[i][2]*this.width);dt[i][3]=Math.floor(dt[i][3]*this.height);if(this.props.addfunc){this.props.addfunc.call(this.props.app,this.idx,i,dt[i][4],false,i==0?1:0)}}this.firstdivs=null;if(dt.length>0){$(this.obj).bind("mousemove",this,_uPhotoGUI._onphotomousemove)}$(this.obj).bind("click",this,_uPhotoGUI._onphotoclick);this.lastrecalc=0;this.parentoff=null;this.photooff=null;if(!_uPhotoGUI.globalset){_uPhotoGUI.globalset=1;$(document).bind("mousemove",_uPhotoGUI._onmousemove)}}_uPhotoGUI.globalset=0;_uPhotoGUI.all={};_uPhotoGUI.nextidx=1;_uPhotoGUI._onphotomousemove=function(a){var b=a.data;$(b.obj).unbind("mousemove");b.showall()};_uPhotoGUI._onphotoclick=function(a){if(a.which!=1){return}a.data._onclickphoto(a)};_uPhotoGUI._onmousemove=function(b){for(var a in _uPhotoGUI.all){if(_uPhotoGUI.all[a]){_uPhotoGUI.all[a]._onglobalmousemove(b)}}};_uPhotoGUI._ondownsizebox=function(a){if(a.which!=1){return}var b=a.data.obj;if(b.mode!=2){return}b._resize.start(a,b.editbox[0],b.editbox[1],b.editbox[2],b.editbox[3],a.data.tp)};_uPhotoGUI._ondowneditframe=function(a){if(a.which!=1){return}var b=a.data;if(b.mode!=2){return}b._moveedit.start(a,b.editbox[0],b.editbox[1])};_uPhotoGUI._ondownindframe=function(a){if(a.which!=1){return}var b=a.data;if(b.mode!=1){return}b._recalcoff();b._resizeind.start(a,a.pageX-b.photooff.left,a.pageY-b.photooff.top,[0])};_uPhotoGUI.prototype={showall:function(){var d=this.frames;if(this.firstdivs||d.length==0){return}this.firstdivs=[];this._recalcoff();var b=this.photooff.left-this.parentoff.left,a=this.photooff.top-this.parentoff.top;for(var c=0;c<d.length;c++){this.firstdivs[c]=typeof(this.props.firstshow)=="string"?$(this.props.firstshow)[0]:$(this.props.firstshow).clone().get(0);$(this.firstdivs[c]).css({position:"absolute",fontSize:0,overflow:"hidden",zIndex:1}).prependTo(this.props.parentnode).css({left:(d[c][0]+b)+"px",top:(d[c][1]+a)+"px",width:(d[c][2]-2)+"px",height:(d[c][3]-2)+"px"})}setTimeout("var a=_uPhotoGUI.all["+this.idx+"];if(a)a.hideall();",1000)},hideall:function(){with(this){if(!firstdivs){return}$(firstdivs).remove();firstdivs=null}},_recalcoff:function(){var t=(new Date()).getTime();with(this){if(t-lastrecalc>500||t<lastrecalc){parentoff=$(props.parentnode).offset();photooff=$(obj).offset();lastrecalc=t}}},_ondrageditmousemove:function(c,b,a,e){var d=this.editbox;d[0]=a+c;if(d[0]<0){d[0]=0}if(d[0]+d[2]>this.width){d[0]=this.width-d[2]}d[1]=e+b;if(d[1]<0){d[1]=0}if(d[1]+d[3]>this.height){d[1]=this.height-d[3]}this._updateeditbox()},_onclickphoto:function(c){if(this.destroyed||this.mode!=2){return}this._recalcoff();var a=this.editbox,b=this.photooff;a[0]=c.pageX-b.left-Math.floor(a[2]/2);a[1]=c.pageY-b.top-Math.floor(a[3]/2);if(a[0]<0){a[0]=0}if(a[0]+a[2]>this.width){a[0]=this.width-a[2]}if(a[1]<0){a[1]=0}if(a[1]+a[3]>this.height){a[1]=this.height-a[3]}this._updateeditbox();c.stopPropagation();c.preventDefault()},_onrsmousemove:function(j,h,f,e,b,g,a){var i=20,d=20,c=this.editbox;if(a.indexOf("n")>=0){c[1]=e+h;if(c[1]<0){c[1]=0}c[3]=e+g-c[1];if(c[3]<d){c[1]=e+g-d;c[3]=d}}if(a.indexOf("s")>=0){c[3]=g+h;if(c[3]<d){c[3]=d}if(e+c[3]>this.height){c[3]=this.height-e}}if(a.indexOf("w")>=0){c[0]=f+j;if(c[0]<0){c[0]=0}c[2]=f+b-c[0];if(c[2]<i){c[0]=f+b-i;c[2]=i}}if(a.indexOf("e")>=0){c[2]=b+j;if(c[2]<i){c[2]=i}if(f+c[2]>this.width){c[2]=this.width-f}}this._updateeditbox()},_updateeditbox:function(){with(this){if(destroyed){return}_recalcoff();var x=editbox[0]+photooff.left-parentoff.left,y=editbox[1]+photooff.top-parentoff.top,xs=editbox[2],ys=editbox[3];indwsize=xs;indhsize=ys;$(editframe).css({left:x+"px",top:y+"px",width:xs+"px",height:ys+"px",display:""});editframepile.show(x,y,xs,ys);$(sizebox.nw).css({left:(x+1)+"px",top:(y+1)+"px",display:""});$(sizebox.ne).css({left:(x+xs-6-1)+"px",top:(y+1)+"px",display:""});$(sizebox.n).css({left:(x+Math.floor((xs-6)/2))+"px",top:(y+1)+"px",display:""});$(sizebox.w).css({left:(x+1)+"px",top:(y+Math.floor((ys-6)/2))+"px",display:""});$(sizebox.e).css({left:(x+xs-6-1)+"px",top:(y+Math.floor((ys-6)/2))+"px",display:""});$(sizebox.sw).css({left:(x+1)+"px",top:(y+ys-6-1)+"px",display:""});$(sizebox.se).css({left:(x+xs-6-1)+"px",top:(y+ys-6-1)+"px",display:""});$(sizebox.s).css({left:(x+Math.floor((xs-6)/2))+"px",top:(y+ys-6-1)+"px",display:""});var d=_uWnd.getdims();var rtl=window._rtl&&x+parentoff.left-addwnd.width-10>d.clientLeft+10;if(window._rtl||x+xs+parentoff.left+10+addwnd.width>d.clientLeft+d.clientW-10){addwnd.moveTo(x+parentoff.left-addwnd.width-10,y+parentoff.top)}else{addwnd.moveTo(x+xs+parentoff.left+10,y+parentoff.top)}addwnd.show();addwnd.activate();if(this.props.showdialog){this.props.showdialog.call(this.props.app,this,this.appwnd)}}},hideeditbox:function(){if(this.destroyed||!this.edit){return}$(this.editframe).css("display","none");this.editframepile.hide();for(var a in {nw:1,ne:1,sw:1,se:1,n:1,s:1,w:1,e:1}){$(this.sizebox[a]).css("display","none")}this.addwnd.hide()},_onglobalmousemove:function(c){if(this.destroyed){return}this._recalcoff();var a=c.pageX,d=c.pageY,b=this.photooff;if(a>=b.left&&a<b.left+this.width&&d>=b.top&&d<b.top+this.height){if(this.mode==0){this.checktip(a-b.left,d-b.top)}else{if(this.mode==1&&!this._resizeind.active){this.showind(a-b.left,d-b.top,1)}}}else{if(this.mode==1&&!this._resizeind.active){this.hideind()}}},checktip:function(a,e){if(this.destroyed){return}var d=this.frames;var c=-1;for(var b=0;b<d.length;b++){if(!d[b]){continue}if(a>=d[b][0]&&a<d[b][0]+d[b][2]&&e>=d[b][1]&&e<d[b][1]+d[b][3]){c=b;break}}if(this.tmtip!=-1){clearTimeout(this.tmtip);this.tmtip=-1}if(c>=0){this.showtip(d[c]);this.tmtip=setTimeout("var a=_uPhotoGUI.all["+this.idx+"];if(a){a.tmtip=-1;a.hidetip();}",5000);return}if(this.tipactive){this.tmtip=setTimeout("var a=_uPhotoGUI.all["+this.idx+"];if(a){a.tmtip=-1;a.hidetip();}",800)}},showpart:function(a,c){if(this.destroyed){return}var b=this.frames;if(!b[a]){return}if(this.tmtip!=-1){clearTimeout(this.tmtip);this.tmtip=-1}this.showtip(b[a],c)},delpart:function(a,c){if(this.destroyed){return}var b=this.frames;if(!b[a]){return}b[a]=null;if(this.props.delfunc){this.props.delfunc.call(this.props.app,a,c)}this.hidetip()},addframe:function(params){with(this){if(destroyed||mode!=2||!edit){return}var t=editbox,arr=frames,i;i=arr.length;arr[i]=[t[0],t[1],t[2],t[3],params];if(props.addfunc){props.addfunc.call(props.app,idx,i,params,true,0)}startedit();showpart(i);tmtip=setTimeout("var a=_uPhotoGUI.all["+idx+"];if(a){a.tmtip=-1;a.hidetip();}",1500)}},showtip:function(d,c){if(this.destroyed){return}this._recalcoff();var b=this.photooff.left-this.parentoff.left,a=this.photooff.top-this.parentoff.top;$(this.tipframe).css({left:(d[0]+b)+"px",top:(d[1]+a)+"px",width:d[2]+"px",height:d[3]+"px",display:""});this.tipframepile.show(d[0]+b,d[1]+a,d[2],d[3],c?3:7);if(!c&&this.props.tipfunc){$(this.tipbox).html(this.props.tipfunc(d[4])).css({left:(d[0]+b)+"px",top:(d[1]+d[3]+a)+"px",visibility:"visible",display:"block"})}else{this.tipbox.style.display="none"}this.tipactive=1},_onrsindstop:function(b,a,c){if(this.destroyed){return}if(c[0]){this.stopind()}},_onrsindmousemove:function(e,c,d,b,f){if(this.destroyed){return}this._recalcoff();if(!f[0]){if(Math.abs(e)<5||Math.abs(c)<5){return}f[0]=1}var a=d+e,g=b+c;if(a<0){a=0}else{if(a>=this.width){a=this.width-1}}if(g<0){g=0}else{if(g>=this.height){g=this.height-1}}e=a-d;c=g-b;a=d;g=b;if(e<0){a+=e;e=-e}if(c<0){g+=c;c=-c}if(e<=0){e=1}if(c<=0){c=1}this.indwsize=e;this.indhsize=c;this.showind(a,g);if(e<20){e=20}if(c<20){c=20}if(a+e>=this.width){a=this.width-1-e}if(g+c>=this.height){g=this.height-1-c}this.editbox=[a,g,e,c]},hidetip:function(){with(this){if(destroyed){return}if(tmtip!=-1){clearTimeout(tmtip);tmtip=-1}$([tipbox,tipframe]).css("display","none");tipframepile.hide();tipactive=0}},_onclickind:function(c){if(this.destroyed||c.which!=1||this.mode!=1){return}this._recalcoff();var a=c.pageX-Math.floor(this.indwsize/2),d=c.pageY-Math.floor(this.indhsize/2),b=this.photooff;a-=b.left;d-=b.top;if(a<0){a=0}else{if(a+this.indwsize>=this.width){a=this.width-this.indwsize}}if(d<0){d=0}else{if(d+this.indhsize>=this.height){d=this.height-this.indhsize}}this.stopind([a,d,this.indwsize,this.indhsize])},stopind:function(b){if(this.destroyed||!this.edit||this.mode<1){return}this.hideind();this.mode=2;if(b){for(var a=0;a<b.length;a++){this.editbox[a]=b[a]}}this._updateeditbox()},showind:function(a,e,d){if(this.destroyed){return}this._recalcoff();if(d){a-=Math.floor(this.indwsize/2);e-=Math.floor(this.indhsize/2);if(a<0){a=0}else{if(a+this.indwsize>=this.width){a=this.width-this.indwsize}}if(e<0){e=0}else{if(e+this.indhsize>=this.height){e=this.height-this.indhsize}}}var c=this.photooff.left-this.parentoff.left,b=this.photooff.top-this.parentoff.top;$(this.indframe).css({left:(a+c)+"px",top:(e+b)+"px",width:this.indwsize+"px",height:this.indhsize+"px",display:""});this.indframepile.show(a+c,e+b,this.indwsize,this.indhsize)},hideind:function(){if(this.destroyed){return}$(this.indframe).css("display","none");this.indframepile.hide()},startedit:function(){with(this){if(destroyed||!edit){return}if(tmtip!=-1){clearTimeout(tmtip);tmtip=-1}hidetip();if(stopbut){stopbut.style.display=""}if(startbut){startbut.style.display="none"}hideeditbox();if(mode<1&&props.addfunc&&props.rebuildonedit){var arr=frames;for(var i=0;i<arr.length;i++){props.addfunc.call(props.app,idx,i,arr[i]?arr[i][4]:null,true,i==0?1:0)}}mode=1}},finishedit:function(){with(this){if(destroyed||mode==0){return}hideind();if(stopbut){stopbut.style.display="none"}if(startbut){startbut.style.display=""}hideeditbox();mode=0;if(props.addfunc&&props.rebuildonedit){var arr=frames;for(var i=0;i<arr.length;i++){props.addfunc.call(props.app,idx,i,arr[i]?arr[i][4]:null,false,i==0?1:0)}}}},destroy:function(){with(this){if(destroyed){return}tipframepile.destroy();tipbox=tipframe=tipframepile=null;if(edit){indframepile.destroy();editframepile.destroy();indframe=editframe=indframepile=editframepile=startbut=stopbut=null;addwnd.close();addwnd=null;sizebox=null;_resize=null}hideall();destroyed=1;props=null;_uPhotoGUI.all[idx]=null}}};var _phctr_state=[];function _phctr_init(b,k,i,h,e,l,j,m){var c=$("#"+b)[0];if(!c||k<0||i<0){return}var a=c.parentNode;if(!a||a.offsetHeight<=0||a.offsetWidth<=0){return}if(typeof(l)!="number"){l=NaN}if(typeof(j)!="number"){j=NaN}if(typeof(h)!="number"||isNaN(h)){h=0}if(k==0||i==0){k=c.width;i=c.height;if(k==0||i==0){if(typeof m!="number"||isNaN(m)){m=1}if(m<=20){setTimeout("_phctr_init('"+b+"',0,0,"+h+",'"+e+"',"+l+","+j+","+(m+1)+");",100)}return}}var g=a.offsetWidth/k;if(a.offsetHeight/i>g){g=a.offsetHeight/i}if(!h||h<0){if(g>=1){h=g}else{h=(1+g)/2}}var f=Math.round(k*h);var d=Math.round(i*h);if(typeof(l)!="number"||isNaN(l)){l=-(f-a.offsetWidth)/2}if(typeof(j)!="number"||isNaN(j)){j=-(d-a.offsetHeight)/2}_phctr_state[b]=[l,j,0,0,f,d,h,k,i,g,new _uDraggable()];_phctr_state[b][10]=new _uDraggable(_phctr_state[b],_phctr_ondrag,null,null,null);c.width=f;c.height=d;c.style.left=""+Math.round(_phctr_state[b][0])+"px";c.style.top=""+Math.round(_phctr_state[b][1])+"px";$(a).unbind("mousedown").bind("mousedown",b,_phctr_myondown);new _uSlider(e,"h",g,1,{step:0,initval:h,onchange:_phctr_setscale,param:b,disabled:(g<1?0:1)})}function _phctr_setscale(a,f){if(!_phctr_state[f]){return}var b=_phctr_state[f];var e=$("#"+f)[0];if(!e){return}var d=e.parentNode;if(!d||d.offsetHeight<=0||d.offsetWidth<=0){return}if(a<b[9]||(b[9]>=1&&a!=b[9])||(b[9]<1&&a>1)){a=b[9]}var c=b[6];b[0]=-((-b[0]+d.offsetWidth/2)/c*a-d.offsetWidth/2);b[1]=-((-b[1]+d.offsetHeight/2)/c*a-d.offsetHeight/2);b[4]=Math.round(b[7]*a);b[5]=Math.round(b[8]*a);b[6]=a;if(Math.round(b[0])<-(b[4]-d.offsetWidth)){b[0]=-(b[4]-d.offsetWidth)}else{if(Math.round(b[0])>0){b[0]=0}}if(Math.round(b[1])<-(b[5]-d.offsetHeight)){b[1]=-(b[5]-d.offsetHeight)}else{if(Math.round(b[1])>0){b[1]=0}}e.width=b[4];e.height=b[5];e.style.left=""+Math.round(b[0])+"px";e.style.top=""+Math.round(b[1])+"px"}function _phctr_ondrag(j,h,b,g,f){var c=$("#"+b)[0];var i=this;if(!i||!c){return}var a=c.parentNode;if(!a||a.offsetHeight<=0||a.offsetWidth<=0){return}var e=Math.round(g+j);if(e<-(i[4]-a.offsetWidth)){e=-(i[4]-a.offsetWidth)}else{if(e>0){e=0}}var d=Math.round(f+h);if(d<-(i[5]-a.offsetHeight)){d=-(i[5]-a.offsetHeight)}else{if(d>0){d=0}}c.style.left=e+"px";c.style.top=d+"px";i[0]=e;i[1]=d}function _phctr_myondown(b){var c=b.data,a=_phctr_state[c];if(!$("#"+c)[0]||!a){return}a[10].start(b,c,a[0],a[1])};
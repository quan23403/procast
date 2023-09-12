(function(g){var window=this;'use strict';var bob=function(a,b){g.U.call(this,{I:"button",Na:["ytp-miniplayer-expand-watch-page-button","ytp-button","ytp-miniplayer-button-top-left"],Y:{title:"{{title}}","data-tooltip-target-id":"ytp-miniplayer-expand-watch-page-button","aria-keyshortcuts":"i","data-title-no-tooltip":"{{data-title-no-tooltip}}"},X:[{I:"svg",Y:{height:"24px",version:"1.1",viewBox:"0 0 24 24",width:"24px"},X:[{I:"g",Y:{fill:"none","fill-rule":"evenodd",stroke:"none","stroke-width":"1"},X:[{I:"g",Y:{transform:"translate(12.000000, 12.000000) scale(-1, 1) translate(-12.000000, -12.000000) "},
X:[{I:"path",Y:{d:"M19,19 L5,19 L5,5 L12,5 L12,3 L5,3 C3.89,3 3,3.9 3,5 L3,19 C3,20.1 3.89,21 5,21 L19,21 C20.1,21 21,20.1 21,19 L21,12 L19,12 L19,19 Z M14,3 L14,5 L17.59,5 L7.76,14.83 L9.17,16.24 L19,6.41 L19,10 L21,10 L21,3 L14,3 Z",fill:"#fff","fill-rule":"nonzero"}}]}]}]}]});this.J=a;this.Ta("click",this.onClick,this);this.updateValue("title",g.fV(a,"M\u1edf r\u1ed9ng","i"));this.update({"data-title-no-tooltip":"M\u1edf r\u1ed9ng"});g.ub(this,g.$U(b.Ec(),this.element))},cob=function(a){g.U.call(this,
{I:"div",
T:"ytp-miniplayer-ui"});this.rg=!1;this.player=a;this.V(a,"minimized",this.Eh);this.V(a,"onStateChange",this.eR)},dob=function(a){g.MV.call(this,a);
this.B=new g.qL(this);this.j=new cob(this.player);this.j.hide();g.MU(this.player,this.j.element,4);a.wg()&&(this.load(),g.gu(a.getRootNode(),"ytp-player-minimized",!0))};
g.v(bob,g.U);bob.prototype.onClick=function(){this.J.Ua("onExpandMiniplayer")};g.v(cob,g.U);g.k=cob.prototype;
g.k.SN=function(){this.tooltip=new g.kY(this.player,this);g.L(this,this.tooltip);g.MU(this.player,this.tooltip.element,4);this.tooltip.scale=.6;this.fd=new g.sW(this.player);g.L(this,this.fd);this.nk=new g.U({I:"div",T:"ytp-miniplayer-scrim"});g.L(this,this.nk);this.nk.Ga(this.element);this.V(this.nk.element,"click",this.GI);var a=new g.U({I:"button",Na:["ytp-miniplayer-close-button","ytp-button"],Y:{"aria-label":"\u0110o\u0301ng"},X:[g.SG()]});g.L(this,a);a.Ga(this.nk.element);this.V(a.element,"click",
this.Ep);a=new bob(this.player,this);g.L(this,a);a.Ga(this.nk.element);this.hv=new g.U({I:"div",T:"ytp-miniplayer-controls"});g.L(this,this.hv);this.hv.Ga(this.nk.element);this.V(this.hv.element,"click",this.GI);var b=new g.U({I:"div",T:"ytp-miniplayer-button-container"});g.L(this,b);b.Ga(this.hv.element);a=new g.U({I:"div",T:"ytp-miniplayer-play-button-container"});g.L(this,a);a.Ga(this.hv.element);var c=new g.U({I:"div",T:"ytp-miniplayer-button-container"});g.L(this,c);c.Ga(this.hv.element);this.IY=
new g.xX(this.player,this,!1);g.L(this,this.IY);this.IY.Ga(b.element);b=new g.wX(this.player,this);g.L(this,b);b.Ga(a.element);this.nextButton=new g.xX(this.player,this,!0);g.L(this,this.nextButton);this.nextButton.Ga(c.element);this.Fj=new g.dY(this.player,this);g.L(this,this.Fj);this.Fj.Ga(this.nk.element);this.Tc=new g.CX(this.player,this);g.L(this,this.Tc);g.MU(this.player,this.Tc.element,4);this.oI=new g.U({I:"div",T:"ytp-miniplayer-buttons"});g.L(this,this.oI);g.MU(this.player,this.oI.element,
4);a=new g.U({I:"button",Na:["ytp-miniplayer-close-button","ytp-button"],Y:{"aria-label":"\u0110o\u0301ng"},X:[g.SG()]});g.L(this,a);a.Ga(this.oI.element);this.V(a.element,"click",this.Ep);a=new g.U({I:"button",Na:["ytp-miniplayer-replay-button","ytp-button"],Y:{"aria-label":"\u0110o\u0301ng"},X:[g.aua()]});g.L(this,a);a.Ga(this.oI.element);this.V(a.element,"click",this.v8);this.V(this.player,"presentingplayerstatechange",this.Xd);this.V(this.player,"appresize",this.Nb);this.V(this.player,"fullscreentoggled",
this.Nb);this.Nb()};
g.k.show=function(){this.Af=new g.Tt(this.qw,null,this);this.Af.start();this.rg||(this.SN(),this.rg=!0);0!==this.player.getPlayerState()&&g.U.prototype.show.call(this);this.Tc.show();this.player.unloadModule("annotations_module")};
g.k.hide=function(){this.Af&&(this.Af.dispose(),this.Af=void 0);g.U.prototype.hide.call(this);this.player.wg()||(this.rg&&this.Tc.hide(),this.player.loadModule("annotations_module"))};
g.k.Ba=function(){this.Af&&(this.Af.dispose(),this.Af=void 0);g.U.prototype.Ba.call(this)};
g.k.Ep=function(){this.player.stopVideo();this.player.Ua("onCloseMiniplayer")};
g.k.v8=function(){this.player.playVideo()};
g.k.GI=function(a){if(a.target===this.nk.element||a.target===this.hv.element)g.nM(this.player.Tb())?this.player.pauseVideo():this.player.playVideo()};
g.k.Eh=function(){g.gu(this.player.getRootNode(),"ytp-player-minimized",this.player.wg())};
g.k.cf=function(){this.Tc.Ic();this.Fj.Ic()};
g.k.qw=function(){this.cf();this.Af&&this.Af.start()};
g.k.Xd=function(a){g.sH(a.state,32)&&this.tooltip.hide()};
g.k.Nb=function(){g.OX(this.Tc,0,this.player.qb().getPlayerSize().width,!1);g.DX(this.Tc)};
g.k.eR=function(a){this.player.wg()&&(0===a?this.hide():this.show())};
g.k.Ec=function(){return this.tooltip};
g.k.Mg=function(){return!1};
g.k.xg=function(){return!1};
g.k.wm=function(){return!1};
g.k.GJ=function(){};
g.k.qq=function(){};
g.k.Qy=function(){};
g.k.dn=function(){return null};
g.k.bH=function(){return null};
g.k.kN=function(){return new g.ve(0,0)};
g.k.Mk=function(){return new g.pr(0,0,0,0)};
g.k.handleGlobalKeyDown=function(){return!1};
g.k.handleGlobalKeyUp=function(){return!1};
g.k.Ew=function(a,b,c,d,e){var f=0,h=d=0,l=g.Dr(a);if(b){c=g.bu(b,"ytp-prev-button")||g.bu(b,"ytp-next-button");var m=g.bu(b,"ytp-play-button"),n=g.bu(b,"ytp-miniplayer-expand-watch-page-button");c?f=h=12:m?(b=g.Br(b,this.element),h=b.x,f=b.y-12):n&&(h=g.bu(b,"ytp-miniplayer-button-top-left"),f=g.Br(b,this.element),b=g.Dr(b),h?(h=8,f=f.y+40):(h=f.x-l.width+b.width,f=f.y-20))}else h=c-l.width/2,d=25+(e||0);b=this.player.qb().getPlayerSize().width;e=f+(e||0);l=g.me(h,0,b-l.width);e?(a.style.top=e+"px",
a.style.bottom=""):(a.style.top="",a.style.bottom=d+"px");a.style.left=l+"px"};
g.k.showControls=function(){};
g.k.Vp=function(){};
g.k.lm=function(){return!1};
g.k.ZE=function(){};
g.k.PA=function(){};
g.k.Gr=function(){};
g.k.Fr=function(){};
g.k.oy=function(){};
g.k.Ps=function(){};
g.k.JE=function(){};g.v(dob,g.MV);g.k=dob.prototype;g.k.onVideoDataChange=function(){if(this.player.getVideoData()){var a=this.player.getVideoAspectRatio(),b=16/9;a=a>b+.1||a<b-.1;g.gu(this.player.getRootNode(),"ytp-rounded-miniplayer-not-regular-wide-video",a)}};
g.k.create=function(){g.MV.prototype.create.call(this);this.B.V(this.player,"videodatachange",this.onVideoDataChange);this.onVideoDataChange()};
g.k.wl=function(){return!1};
g.k.load=function(){this.player.hideControls();this.j.show()};
g.k.unload=function(){this.player.showControls();this.j.hide()};g.LV("miniplayer",dob);})(_yt_player);

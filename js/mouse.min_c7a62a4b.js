var __reflect=this&&this.__reflect||function(e,t,o){e.__class__=t,o?o.push(t):o=[t],e.__types__=e.__types__?o.concat(e.__types__):o},mouse;!function(e){var t=function(){function e(){}return e.MOUSE_MOVE="mouseMove",e.MOUSE_OVER="mouseOver",e.MOUSE_OUT="mouseOut",e.ROLL_OVER="rollOver",e.ROLL_OUT="rollOut",e.MOUSE_WHEEL="mouseWheel",e}();e.MouseEvent=t,__reflect(t.prototype,"mouse.MouseEvent")}(mouse||(mouse={})),egret.DisplayObject.prototype.$getConcatenatedVisible=function(){if(this.$parent){var e=this.$parent.$getConcatenatedVisible();return e&&this.$visible}return this.$visible};var mouse;!function(e){var t,o,n,s=function(s,u,r,i){if(s!=e.MouseEvent.ROLL_OVER||!t.isRollOver){if(s==e.MouseEvent.ROLL_OVER?t.isRollOver=!0:s==e.MouseEvent.ROLL_OUT&&delete t.isRollOver,n&&t.buttonModeForMouse)try{var l=o.$displayList.renderBuffer.surface;s==e.MouseEvent.ROLL_OVER?l.style.cursor="pointer":s==e.MouseEvent.ROLL_OUT&&(l.style.cursor="auto")}catch(c){}egret.TouchEvent.dispatchTouchEvent(t,s,u,!1,r,i,null)}};e.enable=function(i){n="Windows PC"==egret.Capabilities.os||"Mac OS"==egret.Capabilities.os,o=i,n&&r();var l=function(o,n){t&&!t.$stage&&(s(e.MouseEvent.MOUSE_OUT,!0,o,n),s(e.MouseEvent.ROLL_OUT,!1,o,n),t=null);var u=i.$hitTest(o,n);null!=u&&u!=i?t?u!=t&&(s(e.MouseEvent.MOUSE_OUT,!0,o,n),t.$getConcatenatedVisible()&&t.hitTestPoint(o,n,0)||s(e.MouseEvent.ROLL_OUT,!1,o,n),t=u,s(e.MouseEvent.ROLL_OVER,!1,o,n),s(e.MouseEvent.MOUSE_OVER,!0,o,n)):(t=u,s(e.MouseEvent.ROLL_OVER,!1,o,n),s(e.MouseEvent.MOUSE_OVER,!0,o,n)):t&&(s(e.MouseEvent.MOUSE_OUT,!0,o,n),s(e.MouseEvent.ROLL_OUT,!1,o,n),t=null)},c=0/0,a=0/0,E=egret.sys.TouchHandler.prototype.onTouchMove;egret.sys.TouchHandler.prototype.onTouchMove=function(t,n,s){if(c=t,a=n,E.call(this,t,n,s),u){var r=o.$hitTest(t,n);r||(r=o),egret.TouchEvent.dispatchTouchEvent(r,e.MouseEvent.MOUSE_MOVE,!0,!0,t,n,s,!0)}l(t,n)};var v=egret.sys.TouchHandler.prototype.onTouchBegin;egret.sys.TouchHandler.prototype.onTouchBegin=function(e,t,o){v.call(this,e,t,o),l(e,t)};var O=!1,M=egret.web.WebTouchHandler.prototype.getLocation;egret.web.WebTouchHandler.prototype.getLocation=function(e){return 0==e.buttons&&(O=!0),M.call(this,e)};var h=egret.sys.TouchHandler.prototype.onTouchEnd;egret.sys.TouchHandler.prototype.onTouchEnd=function(t,n,s){if(O){if(O=!1,c=t,a=n,h.call(this,t,n,s),u){var r=o.$hitTest(t,n);r||(r=o),egret.TouchEvent.dispatchTouchEvent(r,e.MouseEvent.MOUSE_MOVE,!0,!0,t,n,s,!0)}}else h.call(this,t,n,s),l(t,n)},i.addEventListener(egret.Event.ENTER_FRAME,function(){0/0!=c&&0/0!=a&&l(c,a)},null)},e.setButtonMode=function(e,t){e.buttonModeForMouse=t};var u=!1;e.setMouseMoveEnabled=function(e){u=e};var r=function(){var t="mousewheel",n=function(t){var n=t.type;("DOMMouseScroll"==n||"mousewheel"==n)&&(t.delta=t.wheelDelta?t.wheelDelta:-(t.detail||0),o.dispatchEventWith(e.MouseEvent.MOUSE_WHEEL,!1,t.delta))};window.addEventListener?("mousewheel"===t&&void 0!==document.mozFullScreen&&(t="DOMMouseScroll"),window.addEventListener(t,function(e){n(e)},!1)):window.attachEvent&&window.attachEvent("on"+t,function(e){e=e||window.event,n(e)})}}(mouse||(mouse={}));
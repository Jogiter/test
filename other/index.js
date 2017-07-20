/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 域名处理，为替换https
var domainList = {
    dyactive2: (location.protocol === 'http:' ? 'http:' : 'https:') + '//dyactive2.vip.xunlei.com',
    dyactive: (location.protocol === 'http:' ? 'http:' : 'https:') + '//dyactive.vip.xunlei.com',
    dyact: (location.protocol === 'http:' ? 'http:' : 'https:') + '//dyact.vip.xunlei.com',
    dynamic: (location.protocol === 'http:' ? 'http:' : 'https:') + '//dynamic.vip.xunlei.com',
    dypay: (location.protocol === 'http:' ? 'http:' : 'https:') + '//dypay.vip.xunlei.com',
    act: (location.protocol === 'http:' ? 'http:' : 'https:') + '//act.xunlei.com',
    vip: (location.protocol === 'http:' ? 'http:' : 'https:') + '//vip.xunlei.com'
};

var util = {
    getUrlParam: function getUrlParam(key, url) {
        var result,
            reg = new RegExp('(' + key + ')=([^&]*)', 'ig');
        url = url ? url : location.href;
        result = reg.exec(url);
        if (result) {
            return result[2];
        } else {
            return '';
        }
    },
    setUrlParam: function setUrlParam(key, value, url) {
        var reg = new RegExp('(' + key + ')=([^&]*)', 'ig');
        url = url ? url : location.href;
        var result = reg.exec(url);
        if (result) {
            return url.replace(result[0], key + '=' + value);
        } else {
            var search = /\?(.*)#?(.*)/gi.exec(url);
            if (search !== null) {
                return url.replace(search[1], search[1] + '&' + key + '=' + value);
            } else {
                return '';
            }
        }
    },
    // 根据秒来获取倒计时的时间[天, 时, 分, 秒]
    countdown: function countdown(seconds, callback) {
        var timer;

        function getTime(seconds) {
            var day = 0,
                hour = 0,
                min = 0,
                sec = 0,
                time = [];
            var Day = 24 * 60 * 60,
                Hour = 60 * 60,
                Min = 60;
            if (seconds > Day) {
                day = Math.floor(seconds / Day);
                seconds = seconds % Day;
            }
            hour = Math.floor(seconds / Hour);
            seconds = seconds % Hour;
            min = Math.floor(seconds / Min);
            sec = seconds % Min;

            function prefix(n) {
                if (typeof n !== 'number' || n < 0) {
                    throw Error('n必须是大于等于0的数字');
                }
                return n < 10 ? '0' + n : n;
            }
            return time.concat(prefix(day), prefix(hour), prefix(min), prefix(sec));
        }
        callback(getTime(seconds));
        seconds--;
        timer = setInterval(function () {
            if (seconds) {
                callback(getTime(seconds));
                seconds--;
            } else {
                callback(getTime(seconds));
                clearInterval(timer);
            }
        }, 1000);
    },
    ajax: function ajax(url, done, fail) {
        var ajaxOption = {};
        var setting = {
            url: url,
            dataType: 'jsonp',
            timeout: 5000,
            type: 'GET',
            success: function success(res) {
                done && $.type(done) === 'function' && done(res);
            },
            error: function error(e) {
                fail && $.type(fail) === 'function' && fail(e);
            }
        };
        if ($.type(url) === 'object') {
            $.extend(ajaxOption, setting, url);
        } else {
            $.extend(ajaxOption, setting, {
                url: url
            });
        }
        return $.ajax(ajaxOption);
    }
};

var test = {
    isMobile: function isMobile(number) {
        return (/^1[3,5,8]\d{9}$/.test(number)
        );
    },
    isID: function isID(id) {
        function validateIdCard(d) {
            var r = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
            if (!r.test(d)) return !1;
            if (18 == d.length) {
                for (var t = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2], n = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2], a = 0, i = 0; 17 > i; i++) {
                    a += d.substring(i, i + 1) * t[i];
                }var e = a % 11,
                    s = d.substring(17);
                return 2 == e ? 'X' == s || 'x' == s ? !0 : !1 : s == n[e] ? !0 : !1;
            }
        }
        return validateIdCard(id);
    },
    isName: function isName(string) {
        return (/^[\u4e00-\u9fa5]{2,6}$/.test(string)
        );
    },
    isClient: function isClient() {
        return window.XLJSWebViewBridge || navigator.userAgent.toLowerCase().match(/Thunder/i) == 'thunder';
    },
    isWechat: function isWechat() {
        return navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger';
    },
    isIpad: function isIpad() {
        return (/ipad/i.test(navigator.userAgent.toLowerCase())
        );
    },
    isIOS: function isIOS() {
        return (/\b(iPad|iPhone|iPod)\b.*? OS ([\d_]+)/.test(navigator.userAgent)
        );
    },
    isAndroid: function isAndroid() {
        return (/\bAndroid([^;]+)/.test(navigator.userAgent)
        );
    }
};

module.exports = $.extend(util, test, {
    domainList: domainList
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(2);

__webpack_require__(6);


console.log((0, _index.haslogin)());

// 全局登录设置
(0, _index.setup)({
    UI_THEME: ['embed', 'popup', 'wap'][Math.floor(Math.random() * 3)],
    LOGIN_SUCCESS_FUNC: function LOGIN_SUCCESS_FUNC(res) {
        console.log('logint =>');
        console.log(_index.setting);
        console.log(res);
    },
    LOGOUT_FUNC: function LOGOUT_FUNC() {
        console.log('logout => 不会reload页面');
    }
});

$('#viplogout').click(function () {
    (0, _index.logout)();
});

$('#viplogin').click(function () {
    (0, _index.login)();
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var util = __webpack_require__(0);
var client = __webpack_require__(3);
var user = __webpack_require__(4);

if (!window.xlQuickLogin) {
    throw new Error('请确保页面加载了<script src="http://i.xunlei.com/login/2.5/qLogin.min.js"></script>');
}

var plugin = {
    /**
     * [设置登录选项]
     * @param  {Object}   option   [登录选项，参考http://i.xunlei.com/login/2.5/qLogin.js line:4]
     * @param  {Function} callback [登录成功的回调]
     */
    setup: function setup(option) {
        var setting = {
            loginID: 200, // 101
            registerID: 'vip',
            UI_THEME: 'embed', // 'popup', 'embed', 'wap'
            LOGIN_TYPES: ['mobile', 'account'],
            DEFUALT_UI: 'login', // 'register'
            ALL_HTTPS: false,
            LOGOUT_FUNC: function LOGOUT_FUNC() {// 覆盖无效
            },
            LOGIN_SUCCESS_FUNC: function LOGIN_SUCCESS_FUNC() {
                user.getInfo();
            },
            REGISTER_SUCCESS_FUNC: function REGISTER_SUCCESS_FUNC() {}
        };
        $.extend(setting, option);

        // 封装登录回调
        setting.LOGIN_SUCCESS_FUNC = function () {
            user.getInfo(function (res) {
                option && option.LOGIN_SUCCESS_FUNC && $.type(option.LOGIN_SUCCESS_FUNC) === 'function' && option.LOGIN_SUCCESS_FUNC(res);
            });
        };

        // 封装登出回调
        setting.LOGOUT_FUNC = function () {
            // 参考：http://i.xunlei.com/login/2.5/qLogin.js  传入callback则会覆盖默认的xlQuickLogin.logout
            xlQuickLogin.logout(function () {
                // 清空用户信息和vip信息
                user.clearInfo();
                option && option.LOGOUT_FUNC && $.type(option.LOGOUT_FUNC) === 'function' && option.LOGOUT_FUNC();
            });
        };
        plugin.setting = setting;

        xlQuickLogin.init(setting);
        // 登录后，vipcookie处理
        if (!xlQuickLogin.isLogined()) {
            // 清空用户信息和vip信息
            user.clearInfo();
        } else {
            user.getInfo(function (res) {
                option && option.LOGIN_SUCCESS_FUNC && $.type(option.LOGIN_SUCCESS_FUNC) === 'function' && option.LOGIN_SUCCESS_FUNC(res);
            });
        }
    },

    /**
     * [登录]
     * @param  {Object}   option   [登录选项，与setup相同]
     */
    login: function login() {
        if (!plugin.setting) {
            throw Error('必须先执行setup函数');
        }
        if (util.isClient()) {
            client.data.getUserInfo({
                'source': '',
                'forceLogin': 1
            }, function (_ref) {
                var isLogin = _ref.isLogin,
                    userInfo = _ref.userInfo;

                console.log(isLogin + '=>' + JSON.stringify(userInfo));
            });
        } else {
            xlQuickLogin.getLoginIframe('login');
            // 添加css控制iframe占满容器
            $('#loginIframe').css({
                width: '100%',
                height: '100%'
            });
        }
    },
    logout: function logout() {
        // 清空用户信息和vip信息
        user.clearInfo();
        xlQuickLogin.logout();
    },

    /**
     * [判断用户是否登录]
     */
    haslogin: function haslogin() {
        return xlQuickLogin.isLogined();
    }
};

module.exports = plugin;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * @class XLClient
 * 客户端相关接口，在这个模块中不要依赖其他的类库或模块，保持独立。
 *
 * 此模块不是纯粹的客户端调用，对客户端接口有部分封装。
 * @since IOS 5.12+ Android 5.13+
   地址：http://m.sjzhushou.com/h5/lib/dist/client.min.js
 *      http://m.sjzhushou.com/h5/lib//client.js
 *
 * 判断新旧手雷和不是手雷的一个方案：
 *      通过try  window.share.getVersionCode()
 *      A: 如果成功：
 *          引入 clientOld.js
 *      B: 如果报错：
 *          说明2种情况 1：新手雷，  2：不是手雷。
 *          然后再用异步方式，引入 client.js 判断是不是新手雷。
 *          这样最多只要引入一个js即可。
 *
 * 【方案二】：
 * IOS 5.13+ 和 Android 5.17+
 * 在 navigator.userAgent 中，加入了 iThunder 关键字
 *
 * 【必看：】
 *
 * 1. 使用 XLClient 里面接口之前，需要调用 XLClient.ready。详细请看左侧对应的文档
 *
 * 2. 需要  http://m.sjzhushou.com/h5/src/thirdlib/jquery/2.1.4/jquery-2.1.4.min.js
 *    或者：http://m.sjzhushou.com/h5/thirdlib/zepto/1.1.6/zepto.all.min.js (就是打包zepto的所有模块)
 *
 * 3. 可以使用requirejs 也可以 直接src引用。
 *    如果你引入了requirejs，但又使用src时，那需要放到 requirejs 上面(提前引入)，使用全局变量 XLClient
 *
 * 4. jsduck 源文件的存放路径（10.10.39.4）：/data/xhtdocs/m.sjzhushou.com/htdocs/h5_src/lib
 *    在 /data/xhtdocs/m.sjzhushou.com/htdocs/h5_doc 目录下，运行 node doc_generator.js
 *
 * 5. 从iOS 5.19+, Android 5.18+ 开始使用
 *    接口的回调函数callback 参数 data 会有一个 internalError 对象，里面有 errorCode 和 errorMsg 信息。
 *    比如：data.internalError.errorCode
 *    注意：如果 接口调用成功了。internalError 这个对象是不会有的。
 */
;(function (root, factory) {
    "use strict";

    if (true) {
        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
        module.exports = factory();
    } else {
        root.client = root.XLClient = root.clientInterface = factory();
    }
})(undefined, function () {

    var ua = navigator.userAgent;
    var UA_IOS_REG = /\b(iPad|iPhone|iPod)\b.*? OS ([\d_]+)/;
    var UA_ANDROID_REG = /\bAndroid([^;]+)/;
    var UA_WX_REG = /MicroMessenger/;
    var UA_WEIBO_REG = /\bWeibo/;
    var UA_QZONE_REG = /Qzone\//;

    var isIOS = UA_IOS_REG.test(ua);
    var isAndroid = UA_ANDROID_REG.test(ua);
    var isWx = UA_WX_REG.test(ua);
    var isWeibo = UA_WEIBO_REG.test(ua);
    var isQzone = UA_QZONE_REG.test(ua);

    // 简单的扩展函数
    // @param {Object} target 被扩展的对象
    // @param {Object} source 资源对象
    // @return {Object}
    function extend(target, source) {
        for (var i in source) {
            if (source.hasOwnProperty(i)) {
                target[i] = source[i];
            }
        }

        return target;
    }

    // Android客户端接口回调，callNative和registerMessageListener中会使用
    var callbacks = window.G_callbacks = {
        _id: 0,
        _getId: function _getId() {
            return this._id++;
        }
    };
    var callbackTimeout = 5000;
    // 调用客户端接口
    var callNative = function callNative(name, params, callback) {
        // 兼容两个参数的 callNative(name, callback)
        if (Object.prototype.toString.call(params) === '[object Function]') {
            callback = params;
            params = null;
        }
        if (!window.XLJSWebViewBridge) {
            console.debug(arguments);
            return;
        }
        if (isIOS) {
            XLJSWebViewBridge.sendMessage(name, params, callback);
        } else {
            var callbackName;
            if (callback) {
                var timeout = function (name) {
                    return setTimeout(function () {
                        console.warn('call ' + name + ' timeout');
                    }, callbackTimeout);
                }(name);
                var callbackKey = '_callback_' + callbacks._getId() + '_' + name;
                callbacks[callbackKey] = function (resp) {
                    clearTimeout(timeout);
                    var data = resp && JSON.parse(resp);
                    console.debug(name + ' callback data:', data);
                    callback.call(this, data);
                };
                callbackName = 'window.G_callbacks.' + callbackKey;
            }
            XLJSWebViewBridge.sendMessage(name, JSON.stringify(params), callbackName);
        }
    };

    // 旧接口，这里只做记录，不提供使用
    var old = {
        /**
         * 提交嗅探结果给客户端，实际名称是getSniffResultList，v58是为区分5.8和5.9而加的
         * @param {Object} params 参数
         * @param {Number} error_code 状态码，1：正常；0：错误，客户端会立即停止嗅探
         * @param {Number} detail_page_url_num 总页面数（用于反馈进度，每次调用会增加进度，此接口在嗅探过程中只有第一次有效）
         * @param {Number} ui_flag 判断显示文件夹还是文件。0：文件，点击嗅探结果播放或者下载；1：文件夹，点击嗅探结果会进入详情页
         * @param {Array} result_list 结果列表
         * @param {Object} result_list.item
         * @param {Object} result_list.item
         */
        getSniffResultList_v58: function getSniffResultList_v58(params) {},
        /**
         * 提交嗅探结果给客户端，实际名称是getSniffResultList，v59是为区分5.8和5.9而加的
         * @param {Object} params 参数
         * @param
         */
        getSniffResultList_v59: function getSniffResultList_v59(params) {}
    };

    // 记录事件
    /**
     * @event xlNetworkChangeEvent 网络发生变化
     * @param {Object} params 参数，同 client.data.getNetworkInfo
     */

    var clientInterface = {
        /**
         * 调用客户端接口
         * @param {String} name 接口名字
         * @param {Object} params 接口需要的参数
         * @param {Function} callback 调用完接口后的回调
         */
        callNative: callNative,
        /**
         * callNative alias
         */
        call: callNative,

        /**
         * @property {Boolean}
         * 当前系统是否是IOS（通过UA判断）
         */
        isIOS: isIOS,
        /**
         * @property {Boolean}
         * 当前系统是否是Android（通过UA判断）
         */
        isAndroid: isAndroid,
        /**
         * @property {Boolean}
         * 当前系统是否是微信（通过UA判断）
         */
        isWx: isWx,
        /**
         * @property {Boolean}
         * 当前系统是否是微博（通过UA判断）
         */
        isWeibo: isWeibo,
        /**
         * @property {Boolean}
         * 当前系统是否是QQ空间（通过UA判断）
         */
        isQzone: isQzone,
        /**
         * 监听客户端事件
         * @param {String} eventName 事件名称
         * @param {Function} callback 回调函数
         * @param {Object} callback.data 事件数据
         */
        addEventListener: function addEventListener(eventName, callback) {
            if (isIOS) {
                XLJSWebViewBridge.registerMessageListener(eventName, callback);
            } else {
                return;
                var callbackKey = '_callback_' + callbacks._getId() + '_event_' + name;
                callbacks[callbackKey] = function (resp) {
                    var data = resp && JSON.parse(resp);
                    console.debug('event "' + eventName + '" callback data:', data);
                    callback.call(this, data);
                };
                var callbackName = 'window.G_callbacks.' + callbackKey;
                XLJSWebViewBridge.registerMessageListener(eventName, callbackName);
            }
        },
        /**
         * 触发事件（客户端监听，暂未实现）
         * @param {String} eventName 事件名称
         * @param {Object} [data] 事件数据
         */
        dispatchEvent: function dispatchEvent(eventName, data) {},
        /**
         * @class XLClient.data
         * 数据相关接口
         */
        data: {
            /**
             * 请求数据
             * @param {Object} params 参数
             * @param {String} params.url URL
             * @param {String} [params.method] GET或POST，未指定此参数时，若没有指定params参数使用GET，否则使用POST
             * @param {Boolean} [params.cache] 是否缓存（加时间戳）
             * @param {Number} [params.timeout] 超时，单位毫秒，默认30秒
             * @param {Object} [params.data] 请求参数
             * @param {Function} [params.success] 请求成功的回调函数
             * @param {String} params.success.responseText 响应数据
             * @param {Function} [params.error] 请求失败的回调函数
             * @param {Object} params.error.response 请求失败回调函数的参数
             * @param {Boolean} params.error.response.isSuccess 请求是否成功
             * @param {String} params.error.response.responseText 响应数据
             * @param {Number} params.error.response.status HTTP状态码
             * @param {Function} [params.complete] 请求完成的回调函数
             * @param {Object} params.complete.response 请求完成回调函数的参数
             * @param {Boolean} params.complete.response.isSuccess 请求是否成功
             * @param {String} params.complete.response.responseText 响应数据
             * @param {Number} params.complete.response.status HTTP状态码
             */
            httpRequest: function httpRequest(params) {
                // 本地接口参数
                // {String} url
                // {String} method
                // {Number} timeout
                // {String} postContent post内容
                // {Number} contentEncoding post内容的编码，默认utf-8，可选：1 utf-8, 2 gb2312, 3 gbk
                var nativeParams = {};

                var url = params.url;
                var method = params.method;
                var timeout = parseInt(params.timeout);
                var requestParams = params.data;

                // method未指定，requestParams不为空时使用POST
                if (method !== 'GET' && method !== 'POST') {
                    method = requestParams === undefined ? 'GET' : 'POST';
                }

                var postContent;
                if (method === 'GET' && Object.prototype.toString.call(requestParams) === '[object Object]') {
                    var tempParams = [];
                    for (var key in requestParams) {
                        tempParams.push(key + '=' + requestParams[key]);
                    }
                    if (tempParams.length > 0) {
                        url += (url.indexOf('?') === -1 ? '?' : '&') + tempParams.join('&');
                    }
                    if (!params.cache) {
                        url += (url.indexOf('?') === -1 ? '?' : '&') + '_=' + Date.now();
                    }
                } else if (method === 'POST') {
                    if (typeof requestParams === 'string') {
                        postContent = requestParams;
                    } else if (Object.prototype.toString.call(requestParams) === '[object Object]') {
                        var tempParams = [];
                        for (var key in requestParams) {
                            tempParams.push(key + '=' + requestParams[key]);
                        }
                        postContent = tempParams.join('&');
                    }
                }

                nativeParams.url = url;
                nativeParams.method = method;
                nativeParams.timeout = timeout || 30000;
                if (postContent !== undefined) {
                    nativeParams.postContent = postContent;
                }
                callNative('xlHttpRequestForward', nativeParams, function (resp) {
                    if (resp.isSuccess && params.success) {
                        params.success(resp.responseText);
                    } else if (!resp.isSuccess && params.error) {
                        params.error(resp);
                    }
                    if (params.complete) {
                        params.complete(resp);
                    }
                });
            },
            /**
             * 上报统计数据
             *
             *     client.data.reportStatistics({
             *         reportPlat: 0,
             *         hubbleEventId: 'ios_H5_client',
             *         hubbleAttribute1: 'discuss_submit',
             *         hubbleExData: {
             *             url: 'http://.m.sjzhushou.com:8080/video_detail/index.html?id=6647',
             *             is_login: 0
             *         },
             *         umengEventId: 'discuss_submit',
             *         umengExData: {
             *             url: 'http://m.sjzhushou.com:8080/video_detail/index.html?id=6647',
             *             is_login: 0
             *         }
             *     });
             *
             *      精简版：
             *
             *      client.data.reportStatistics({
             *         attribute: 'discuss_submit',
             *         hubbleExData: {
             *             url: 'http://.m.sjzhushou.com:8080/video_detail/index.html?id=6647',
             *             is_login: 0
             *         },
             *         umengExData: {
             *             url: 'http://m.sjzhushou.com:8080/video_detail/index.html?id=6647',
             *             is_login: 0
             *         }
             *     });
             *
             * @param {Object} params 上报参数
             * @param {Number} [params.reportPlat=0] 上报平台。 0: 所有平台、 1: Hubble、 2: 友盟
             * @param {String} [params.hubbleEventId='ios_H5_client' or 'android_H5_client'] Hubble平台的事件ID，reportPlat为0或1时必需
             * @param {String} params.hubbleAttribute1 Hubble平台的attribute1
             * @param {Object} params.hubbleExData 数据用key-value的形式传递
             * @param {String} params.umengEventId 友盟平台的事件ID，reportPlat为0或2时必需
             * @param {Object} params.umengExData 数据用key-value的形式传递
             */
            reportStatistics: function reportStatistics(params) {
                var defaultParams = {
                    reportPlat: 0,
                    hubbleEventId: isIOS ? 'ios_H5_client' : 'android_H5_client',
                    hubbleAttribute1: params.hubbleAttribute1 ? params.hubbleAttribute1 : params.attribute,
                    umengEventId: params.umengEventId ? params.umengEventId : params.attribute
                };

                // hubbleExData 哈勃数据
                // umengExData  友盟数据
                // 值都是字符串，所以这里预处理一下
                if (params.hubbleExData) {
                    for (var i in params.hubbleExData) {
                        if (params.hubbleExData.hasOwnProperty(i)) {
                            params.hubbleExData[i] = String(params.hubbleExData[i]);
                        }
                    }
                }

                if (params.umengExData) {
                    for (var i in params.umengExData) {
                        if (params.umengExData.hasOwnProperty(i)) {
                            params.umengExData[i] = String(params.umengExData[i]);
                        }
                    }
                }

                params = extend(defaultParams, params);

                console.log("=====client.js client.data.reportStatistics=====");
                console.log(params);

                if (isIOS) {
                    callNative('xlReport', params);
                } else {
                    callNative('xlReportStatistics', params);
                }
            },
            /**
             * 获取用户信息
             * @param params 参数
             * @param {Number} params.forceLogin 0: 未登陆时不登陆, 1: 未登陆时进入登陆界面
             * @param {Object} params.source 登陆来源, params.forceLogin 为0时不需要,
                      integralMall: 去积分商城,
                      signIn; 签到,
                      assignment: 去做任务
                      comment: 点击评论调起
             * @param {Function} callback 回调函数
             * @param {Object} callback.response 回调函数参数
             * @param {Number} callback.response.isLogin 0: 未登陆, 1: 已登陆
             * @param {Object} callback.response.userInfo 用户信息
             * @param {Number} callback.response.userInfo.avatarURL 头像地址
             * @param {Number} callback.response.userInfo.nickName 昵称
             * @param {Number} callback.response.userInfo.userID 用户ID
             * @param {Number} callback.response.userInfo.vipType VIP类型
             * @param {Number} callback.response.userInfo.vipLevel VIP级别
             * @param {Number} callback.response.userInfo.vipExpirationDate VIP过期时间
             */
            getUserInfo: function getUserInfo(params, callback) {
                callNative('xlGetUserInfo', params, callback);
            },
            /**
             * 分享指定内容到指定的平台
             * Android5.15
             *  + 增加sharePlatform==0选项，表示全平台分享。
             * @param {Object} params 参数
             * @param {Number} params.sharePlatform 平台, 1: 微信好友, 2: 微信朋友圈, 3: QQ空间, 4: 新浪微博
             * @param {String} params.shareHeadline 标题
             * @param {String} params.shareText 内容
             * @param {String} params.shareImageUrl 图片地址
             * @param {String} params.shareUrl 分享的URL
             * @param {Function} callback 回调函数
             * @param {Object} callback.response 回调函数参数
             * @param {Number} callback.response.result 分享结果，0：成功，1：失败，2：用户取消
             *
             * 说明一下(Android端目前还没有测试，也要注意一下)：
             * iOS端:
             * 分享到 微信好友，QQ空间    时，shareHeadline（标题），shareText（简介） 正常填写。
             * 分享到 微信朋友圈，新浪微博 时，它们都取 shareText（简介）作为标题，所以这里需要注意一下。
             */
            shareTo: function shareTo(params, callback) {
                callNative('xlSocialShare', params, callback);
            },
            /**
             * 添加一个下载任务
             * @param {Object} params 参数
             * @param {String} params.name 文件名
             * @param {String} params.url 下载地址
             * @param {String} params.refurl 这个资源来源哪个网站，通常是 window.location.href
             * @param {String} params.from 来源类型
             * public static final int FROM_NONE = 0; // none
                public static final int FROM_TWO_DIMENSIONAL_CODE = 1; // 二维码
                public static final int FROM_WEB_BROSWER = 2; // 浏览器
                public static final int FROM_NORMAL_MANUAL = 3; // 普通手动
                public static final int FROM_NORMAL_HOLD_UP = 4; // 拦截
                public static final int FROM_SNIFFER = 5; // 嗅探
                public static final int FROM_FASTCAMERA = 6;
                public static final int FROM_USER_COUNTS = 7;//商城积分
                  public static final int FROM_BT_NORMAL = 9; // BT手动
                public static final int FROM_BT_AUTO = 10; // BT自动
                public static final int FROM_BT_HOLD_UP = 11; // BT拦截
                public static final int FROM_XUNLEI_SCANCODE_NORMAL = 12; // 资源推广二维码迅雷二维码扫描
                public static final int FROM_XUNLEI_SCANCODE_LAUNCH = 13; // 资源推广二维码迅雷启动自动创建任务
                public static final int FROM_XUNLEI_SCANCODE_HOLD_UP = 14; // 资源推广二维码迅雷拦截
                public static final int FROM_XUNLEI_SNCANCODE_ASSIST = 15; // 协同下载
                public static final int FROM_XUNLEI_HUB = 16; // 通过HUB页面下载
                public static final int FROM_CAROUSEL = 17; // 热门资源
                public static final int FROM_WEIBO = 18; // 资源微博
                public static final int FROM_SHAKE = 19; // 摇一摇
                public static final int FROM_PUSH_MSG = 21; // 消息推送
                public static final int FROM_SEARCH = 22; // 搜索
                public static final int FROM_APK_RECOMMEND = 23; // APK联盟
                public static final int FROM_CHANNEL_GAME = 24;//频道-游戏
                public static final int FROM_HOMEPAGE = 25;//homepage
                public static final int FROM_THUNDER7   = 26;   //云列表，2.9版本添加
                public static final int FROM_COPYRIGHT_PAGE = 27;//版权页面，2.10版本添加
                public static final int FROM_LIXIAN = 28;//离线空间
                public static final int FROM_VOD_HISTORY = 29;//云播记录
                public static final int FROM_GROUP = 30;//资源组
                public static final int FROM_THEATER = 31;//院线
                public static final int FROM_BTDIGG = 32;//btdigg
                public static final int FROM_GROUP_DYN_MOVIE = 33;//资源列表——院线预约
                public static final int FROM_GROUP_DYN_TV = 34;//资源组——追剧
                public static final int FROM_GROUP_DYN_RELCOMM = 35;//资源组——相关推荐
                public static final int FROM_FRIEND_GROUP_LIST = 36;//朋友圈
                public static final int FROM_PROMOTION_LIST = 37;
                public static final int FROM_THIRDPART = 38; //第三方调起下载
                public static final int FROM_FLOATWINDOW = 39; //悬浮窗
                public static final int FROM_USERCENTER = 40; //个人中心
                public static final int FROM_NEARBY = 41; //迅雷邻居 5.2版本添加
                public static final int FROM_GUIDE = 43; // 引导图
                public static final int FROM_SPLASH = 42; // 闪屏页
                  public static final int FROM_CHANNEL_MASK = 0x800;//频道0xcx
                public static final int FROM_CHANNEL_SUBJECT = 0x801;//专题
                public static final int FROM_CHANNEL_MOVIE = 0x802;//电影
                public static final int FROM_CHANNEL_BOOK = 0x803;//电子书
                public static final int FROM_CHANNEL_TELEPLAY = 0x804;//剧场
                public static final int FROM_CHANNEL_SHORT_VIDEO = 0x805;//短视频
                public static final int FROM_CHANNEL_MV = 0x806;//mv
                public static final int FROM_CHANNEL_CARTOON = 0x807;//动漫
                public static final int FROM_CHANNEL_VARIETY = 0x808;//综艺
                  public static final int FROM_UC_ADDON = 0x809;//uc插件
                public static final int FROM_HOMEPAGE_RECOMMAND = 0x810;//首页热门推荐
                public static final int FROM_GAME_CENTER = 0x811;//趣玩游戏中心
                public static final int FROM_HOMEPAGE_ADBANNER = 0x812;//5.0后首页广告栏
                public static final int FROM_HOMEPAGE_HOTWORDAD = 0x813;//5.9后热词广告栏
                public static final int FROM_MOBILE_SETUP = 0x814;
                public static final int FROM_MOBILE_SETPASSWORD = 0x815;
                public static final int FROM_HOME_MEMBER_FREE = 0x816;    //主页 新用户 注册引导 （引导到抽奖页）
                public static final int FROM_HOME_HOT_SPECAIL = 0X817;    //主页 热门专题
                public static final int FROM_USER_CENTER_FEEDBACK = 0x818;         //个人 帮助反馈
                public static final int FROM_FUN_PLAY = 0x819;//趣玩tab
             */
            addDownloadTask: function addDownloadTask(params) {
                callNative('xlAddTask', params);
            },
            /**
             * 添加播放记录
             * @param {Object} params 参数
             * @param {String} params.pageUrl 页面URL
             * @param {String} params.title 任务标题
             * @param {String} params.coverImageUrl 图标
             * @param {String} params.createTime 添加时间
             * @param {Number} params.totalVideoLength 视频时长，单位秒
             */
            addPlayRecord: function addPlayRecord(params) {
                callNative('xlAddPlayRecord', params);
            },
            /**
             * 获取页面来源
             * @param {Function} callback 回调函数
             * @param {Object} callback.response 回调函数参数
             * @param {String} callback.response.from 页面来源
             * @param {Object} callback.response.userExData （有可能为null） iOS 5.13 新增
             * @param {String} callback.response.userExData.channelId 频道的id
             */
            getPageFrom: function getPageFrom(callback) {
                callNative('xlGetPageFrom', callback);
            },

            /**
             * iOS 5.14+
             * 存储内容至app提供的存储区，该存储区的生命周期与app进程一致。
             * @params {Object} params
             * @params {String} params.key   标识符
             * @params {String} params.value 内容
             * params = {
             *   "key1" : "value1",
             *   "key2" : "value2"
             * }
             */
            setCacheToApp: function setCacheToApp(params) {

                /**
                 * 说明是这样使用的：
                 * client.data.setCacheToApp("key", "value");
                 */
                if (arguments.length === 2) {
                    callNative('xlSetCacheToApp', {
                        "key": arguments[0],
                        "value": arguments[1]
                    });

                    return;
                }

                /**
                 * xlSetCacheToApp接口的存储规则是：
                 * {
                 *   "key"   : 'key1',   //string 类型，存储内容的标识，如果重复，后面存储的内容会覆盖先前的。
                 *   "value" : 'value1'  //string 类型，存储的内容.
                 * }
                 */
                for (var i in params) {
                    if (params.hasOwnProperty(i)) {
                        callNative('xlSetCacheToApp', {
                            "key": i,
                            "value": params[i]
                        });
                    }
                }
            },

            /**
             * iOS 5.14+
             * 从 xlSetCacheToApp 接口存储的存储区内取数据。
             *
             * @param {String} key 要取这个值的key
             *
             * @param {Function} callback 回调函数
             * @param {Object} callback.response 回调函数参数，客户端响应数据
             * @param {String} callback.response.value 返回值
             * callback.response = {
             *   "value": xxx //string 类型
             * }
             */
            getCacheFromApp: function getCacheFromApp(key, callback) {
                var params = {
                    "key": key

                    /**
                     * xlGetCacheFromApp接口的存储规则是：
                     * {
                     *   "key" : 'key1' //string 类型，存储内容的标识，如果key对应的内容不存在，则返回空字符串("")
                     * }
                    */
                };callNative('xlGetCacheFromApp', params, callback);
            },

            /**
             * iOS5.18+
             * 永久把数据存储在客户端，不用担心用户清楚缓存而消失
             *
             * data: {
             *    key: xx  // string;
             *    value:xx // string
             * };
             *
             * responseData: {
             *    result:1,    // 0=失败;1=成功;
             *    message:xxx, // 错误提示
             * };
             * @param {String} key key值
             * @param {String} value value值
             * @param {Function} callback 回调函数
             * @param {Object} callback.response 回调函数参数，客户端响应数据
             * @param {Number} callback.response.result 0=失败;1=成功
             * @param {String} callback.response.message 错误提示
            */
            setConfig: function setConfig(key, value, callback) {
                var params = {
                    key: key,
                    value: value
                };

                callNative('xlSetConfig', params, callback);
            },
            /**
             * iOS5.18+
             * 获取永久存储在客户端的数据
             *
             * data: {
             *    key: xx  // string;
             * };
             *
             * // 如果拿不到，就没有data值
             * responseData: {
             *    result:1,    // 0=失败;1=成功;
             *    message:xxx, // 错误提示
             *    data: {
             *      value: xx // 值
             *    }
             * };
             *
             * @param {String} key key值
             * @param {Function} callback 回调函数
             * @param {Object} callback.response 回调函数参数，客户端响应数据
             * @param {Number} callback.response.result 0=失败;1=成功
             * @param {String} callback.response.message 错误提示
             * @param {Object} callback.response.data
             * @param {String} callback.response.data.value 等到key对应的值
             */
            getConfig: function getConfig(key, callback) {
                var params = {
                    key: key
                };

                callNative('xlGetConfig', params, callback);
            },
            /**
             * iOS5.18+
             * 移除永久存储在客户端的数据
             *
             * data: {
             *    key: xx  // string;
             * };
             *
             * responseData: {
             *    result:1,    // 0=失败;1=成功;
             *    message:xxx  // 错误提示
             * };
             *
             * @param {String} key key值
             * @param {Function} callback 回调函数
             * @param {Object} callback.response 回调函数参数，客户端响应数据
             * @param {Number} callback.response.result 0=失败;1=成功
             * @param {String} callback.response.message 错误提示
             */
            removeConfig: function removeConfig(key, callback) {
                var params = {
                    key: key
                };

                callNative('xlRemoveConfig', params, callback);
            },

            /**
             * iOS 5.23+
             * 用于解码thunder链接
             * 解码失败，返回一个空字符串
             * @param {String} thunderStr thunder链接
             * @param {Object} callback.response 回调函数参数，客户端响应数据
             * @param {String} callback.response.decodedThunderUrl 错误提示
             * @example
             * XLClient.data.decodeThunderUrl('thunder://QUFodHRwOi8vNTEuZGwueTgwcy5uZXQ6OTIwLzEzMDMv54aK5Ye65rKh5LmL6L+H5bm0L+eGiuWHuuayoeS5i+i/h+W5tF9oZC5tcDRaWg==',
             *      function(resp){
             *          // {"decodedThunderUrl":"http://51.dl.y80s.net:920/1303/熊出没之过年/熊出没之过年_hd.mp4"}
             *          console.log('resp', resp);
             *      });
             */
            decodeThunderUrl: function decodeThunderUrl(thunderStr, callback) {
                var params = {
                    encodedThunderUrl: thunderStr
                };

                callNative('xlDecodeThunderUrl', params, callback);
            },
            /**
             * Android 5.23+ 获取嗅探的配置
             * @param {Function} callback 回调函数
             * @param {Object} callback.response 回调函数参数
             * @param {String} callback.response.keyword_suffix ["thunder", "mp4", "迅雷下载"]
             */
            getSniffConfig: function getSniffConfig(callback) {
                callNative('xlGetSniffConfig', callback);
            },
            /**
            * ios手雷购买
            * @param {String} params.selectedTabIndex 0代表白金 1代表超级
            * @param {String} params.purchaseType 0 代表开通 1代表升级
            * @param {String} params.refer 页面统计码
            */
            xlGoToMemberPurchasePage: function xlGoToMemberPurchasePage(params) {
                callNative('xlGoToMemberPurchasePage', params);
            }
        },
        /**
         * @class XLClient.ui
         * 界面相关接口
         */
        ui: {

            /**
             * Android 5.23+
             * @param {Object} params 参数
             * @example params = {
             *       "keyword" : "妖精的尾巴",  // 搜索的关键字
             *       "suffix" : "迅雷下载",      // mp4, thunder 等
             *       "autoSniffer" : true,     // 是否自动弹出嗅探
             *       "from" : "search_result"  // 来源 比如：search_result(搜索结果页), yingshi(长视频)
             *   }
             */
            startSniff: function startSniff(params) {
                params.from = typeof params.from === "undefined" ? "" : params.from;
                params.suffix = typeof params.suffix === "undefined" ? "" : params.suffix;
                params.autoSniffer = typeof params.autoSniffer === "undefined" ? true : params.autoSniffer;

                callNative('xlStartSniff', params);
            },

            /**
             * 打开一个URL
             *
             * @param {Object} params 参数
             * @param {String} params.title 页面标题
             * @param {String} params.url 要打开的URL
             * @param {Number} params.openType   1: 在手雷中按当前方式打开新页面(就是新推一个webview出来),
             *                                   2: 在Safari中打开,
             *                                   3: 在手雷中全屏打开新页面（如嗅探页面）
             * @param {Boolean} params.autoSniffer 是否自动嗅探，openType为3时需要指定
             * @param {String} params.from 来源
             *
             * Android 5.15
             *  +增加openType==4选项(会使得webview上面的Android导航变透明)，适合打开长视频这种页面
             *
             * Android 5.18+
             *  +增加openType==5选项, 打开旧的以前的webview(大概是5.13之前)，主要是临时兼容旧的活动页
             *
             * iOS 5.14
             *   +@param {String} params.contentType （如果是 长视频传'longVideo'，短视频传'shortVideo'）
             *   +增加openType==4选项 （使得webview上面的iOS导航变透明）
             */
            openUrl: function openUrl(params) {
                callNative('xlOpenUrl', params);
            },
            /**
             * 显示加载状态（IOS有回调函数，Android没有，没有实际作用，这里没加上）
             */
            showLoadingView: function showLoadingView() {
                callNative('xlShowLoading');
            },
            /**
             * 显示加载状态（IOS有回调函数，Android没有，没有实际作用，这里没加上）
             */
            hideLoadingView: function hideLoadingView() {
                callNative('xlHideLoading');
            },
            /**
             * 显示提示信息（IOS有回调函数，Android没有，没有实际作用，这里没加上）
             * @param msg 提示信息
             * @param [type=0] 0为默认，1为下载任务对话框样式(就是有个打勾的圈圈图标)
             */
            showToast: function showToast(msg, type) {
                type = type || 0;

                callNative('xlShowToast', {
                    message: msg,
                    type: type
                });
            },
            /**
             * @params {Object} params 播放参数
             * @params {String} params.url 视频URL
             * @params {String} params.title 标题
             * @params {Number} params.fileSize 视频大小（单位：kb）
             */
            videoPlay: function videoPlay(params) {
                callNative('xlVideoPlay', params);
            },
            /**
             * Android 5.16+
             * 通常用在打开Android手雷的窗口，而不是webview
             *
             * @params {Object} params 参数
             * @params {String} params.openType
             *                  openType=1 打开短视频详情页  再传短视频id值即可
             * @params {Int} vodType 短视频类型的整数表示（一般是1，2，3，4，5）
             * @params {String} vodTypeName 短视频类型中文名称（比如：雷妹精选，最热视频等）
             */
            openLocalPage: function openLocalPage(params) {
                callNative('xlOpenLocalPage', params);
            },
            /**
             * iOS 5.17+
             * 隐藏评论框
             */
            hiddenCommentView: function hiddenCommentView() {
                callNative('xlHiddenCommentView');
            },

            /**
             * iOS 5.17+
             * 跳短视频列表页
             *
             * @params {Object} params 参数
             * @params {String} params.type 频道类型
             * @params {String} params.from 来源地址
             */
            gumpToShortVideoListPage: function gumpToShortVideoListPage(params) {
                callNative('xlGumpToShortVideoListPage', params);
            },

            /**
             * iOS 5.19+, Android 5.18+
             * 这个接口iOS和Android看到的效果不一样。iOS是打开会员支付页面，Android是打开支付宝或微信，或支付页面
             *
             * 下面Android参数，目前iOS不需要传任何参数
             * @param {Object} params 参数
             * @param {Number} params.payType 0=弹出本地支付方式选择框（暂不支持）；1=直接打开微信支付；2=直接打开支付宝支付 3=跳转支付页面支付
             * @param {String} params.reportRefer 用于支付统计
             * @param {Number} params.monthOrTDays 月份或者天数。如果是升级，则是升级的天数。否则，为月份（迅雷会员可选1-12）
             * @param {Number} params.orderType 订单类型：0为购买/续费，1为升级 默认为购买/续费
             * @param {Number} params.vasType 支付类型：0、4 钻石会员；2 普通会员；3 白金会员；101 网游加速会员；102 高级网游加速会员 201
             *                  迅雷影视会员；202 迅雷阅读点；203 迅雷阅读会员；204 迅雷快鸟会员
             * @param {String} params.orderExtraParam 订单购物车附加参数，当vasType=206,夺宝币支付时：购物车下单参数，json格式，为空表示夺宝币充值操作（其他业务可空）
             * @param {String} params.orderVoucher    订单抵用金额，当vasType=206 夺宝币支付时：红包金额（其他业务可空）
             *
             * @param callback 回调函数
             * @param callback.data 回调函数自带的数据
             *
             * Android 5.18+开始使用, iOS 5.19+开始使用
             * @param callback.data.internalError 错误日志
             * @param callback.data.internalError.errorCode 错误代码
             * @param callback.data.internalError.errorMsg 错误信息
             */
            pay: function pay(params, callback) {

                if (isIOS) {
                    callNative('xlGoToMemberPurchasePage', {}, callback);
                    return;
                }

                callNative('xlPay', params, callback);
            }
        },
        /**
         * @class XLClient.app
         * 应用相关接口
         */
        app: {
            /**
             * 检查App是否安装
             * @param {Object} params 参数
             * @param {Array[String]} params.appSchemes iOS的参数(scheme) mqq: QQ, weixin: 微信, weibo: 微博，
             * Android的话需要知道包名字。比如 微信：com.tencent.mm, 微博：com.sina.weibo, qq是：com.tencent..mobileqq
             * @param {Function} callback 回调函数
             * @param {Object} callback.data 回调函数参数，key为参数appSchemes中的项，value为是否已经安装，Boolean类型
             *
             * @example
             *  client.app.checkAppInstalled({
                    appSchemes: ['weixin'] // ['mqq', 'weixin'] appSchemes参数必须数组
                }, function(data){
                    alert(JSON.stringify(data))
                });
             */
            checkAppInstalled: function checkAppInstalled(params, callback) {

                var appSchemes = params.appSchemes;

                // 为了兼容appSchemes只传了一个字符串，没有传数组
                if (typeof appSchemes == "string") {
                    params.appSchemes = [appSchemes];
                }

                if (isAndroid) {
                    if (typeof appSchemes == "string") {
                        params.pkgNameList = [appSchemes];
                    } else {
                        params.pkgNameList = appSchemes;
                    }
                }

                callNative('xlCheckAppInstalled', params, callback);
            },

            /**
             * 打开某个App
             *
             * Android 5.17+, iOS 5.22+
             *
             * @param {Object} params 参数
             * @param {Int} [params.openType=0] 0=默认打开方式 (only Android)
             * @param {String} params.name 应用包名
             * Android 的包名比如(微博，不支持传参数)：com.sina.weibo
             * iOS 的包名比如（qq，支持传参数）：mqq 或 mqq:// 或 mqq://a=1&b=2
             * @param callback
             */
            openApp: function openApp(params, callback) {

                var name = params.name;

                if (isAndroid) {
                    params.pkgName = name;
                }

                if (isIOS) {
                    params.name = name.indexOf(':\/\/') > -1 ? name : name + '://';
                }

                callNative('xlOpenApp', params, callback);
            }
        },
        /**
         * @class XLClient.device
         * 设备相关接口
         */
        device: {
            /**
             * 获取设备信息
             * @param {Function} callback 回调函数
             * @param {Object} callback.data 回调函数参数
             * @param {Number} callback.data.versionCode 版本号，主要用来判断版本，IOS中5.8.1即50801，5.12.1即51201，Android需要客户端给
             * @param {String} callback.data.appVersion APP版本号
             * @param {String} callback.data.systemVersion 系统版本号
             * @param {String} callback.data.productID 产品ID，31: iPhone未越狱, 32: iPhone越狱, 46: iPad未越狱, 47: iPad越狱
             * @param {String} callback.data.peerID 设备唯一ID（IOS中，APP重新安装后会变化）
             * @param {String} callback.data.partnerID 渠道ID
             * @param {String} callback.data.device 设备编码，如iphone 2G, iphone 3G等（仅IOS）
             * @param {Boolean} callback.data.isReview 【旧】应用当前是否正在审核（仅IOS）
             * @param {Boolean} callback.data.protectedID  【新 5.23+】应用当前是否正在审核（仅IOS）1 //string类型  可选 是否是在审核状态，例如 1在审核，0不在审核
             */
            getAppMetaData: function getAppMetaData(callback) {
                callNative('xlGetAppMetaData', callback);
            },
            /**
             * 获取网络信息
             * @param {Function} callback 回调函数
             * @param {Object} callback.data 回调函数参数
             * @param {Number} callback.data.status 网络状态。0：无网络，1：wifi，2：wwan
             */
            getNetworkInfo: function getNetworkInfo(callback) {
                callNative('xlGetNetworkInfo', callback);
            }
        },
        /**
         * @class XLClient.event
         * 页面事件（触发客户端操作）
         */
        event: {
            /**
             * 视频播放结束
             * (Android 最新版本已经去掉)
             */
            videoPlayOver: function videoPlayOver() {
                callNative('xlVideoPlayOver');
            },
            /**
             * 视频准备播放 Android 5.14+
             * (Android  最新版本已经去掉)
             *
             * @params {Object} params 播放参数
             * @params {String} params.url 视频URL
             * @params {String} params.title 标题
             *
             * params.errorcallback = function(data){
             *  log: data.status
             * }
             */
            videoPlayReady: function videoPlayReady(params) {
                callNative('xlVideoPlayReady', params);
            },
            /**
             * 视频重置 Android 5.14+
             * (Android  最新版本已经去掉)
             *
             * @params {Object} params 重置参数
             * @params {Boolean} [params.loading=true] 是否显示video的loading图标。默认显示
             */
            videoReset: function videoReset(params) {
                var defaultParams = {
                    loading: true
                };

                params = extend(defaultParams, params);

                callNative('xlVideoReset', params);
            }
        },
        /**
         * @class XLClient.ready
         * 整合了 lib/ready.js 进来
         *
         * 等待模块准备后执行回调函数
         * @param {Function} callback 全部ready后的回调函数
         *
         *     @example
         *
         *     XLClient.ready(function() {
         *         // 选择的功能/模块已经ready
         *     });
         */
        ready: function () {
            var REG_DOM_READY = /complete|loaded|interactive/;
            var REG_SUPPORT_MODS = /dom|proxy|client/;

            // 可以在这里新增ready类型
            var modMap = {
                // dom ready
                dom: {
                    event: 'DOMContentLoaded',
                    eventTarget: [document],
                    isReady: function isReady() {
                        return REG_DOM_READY.test(document.readyState) && document.body;
                    }
                },
                // 客户端 js 接口相关
                client: {
                    event: 'XLJSWebViewBridgejsReady',
                    eventTarget: [document, window],
                    isReady: function isReady() {
                        return window.XLJSWebViewBridge;
                    }
                }
            };

            var callbackDone = false;

            var ready = function ready(mods, callback) {
                if (Object.prototype.toString.call(mods) === "[object Function]") {
                    callback = mods;
                    mods = isIOS ? 'dom client' : 'dom';
                }
                mods && (mods = mods.trim().split(' '));
                mods || (mods = ['dom']);

                var waitList = [];
                mods.forEach(function (mod, i) {
                    if (!REG_SUPPORT_MODS.test(mod)) {
                        console.warn('不支持的类型: "' + mod + '"', REG_SUPPORT_MODS);
                        return true;
                    }

                    var modOpts = modMap[mod];
                    if (!modOpts.isReady()) {
                        waitList.push(mod);

                        modOpts.eventTarget.forEach(function (target) {
                            target.addEventListener(modOpts.event, function () {

                                if (callbackDone) return;

                                waitList.splice(waitList.indexOf(mod), 1);

                                if (waitList.length === 0) {
                                    callbackDone = true;
                                    callback && callback();
                                }
                            }, false);
                        });
                    }
                });
                waitList.length || callback();
            };

            return ready;
        }()
    };

    return clientInterface;
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _util = __webpack_require__(0);

var Cookies = __webpack_require__(5);

document.domain = 'xunlei.com';
var cookieName = 'vipcookie';

var cookieMap = {
    nickname: 'vip_nickname',
    usrname: 'vip_usrname',
    growvalue: 'vip_growvalue',
    expiredate: 'vip_expiredate',
    level: 'vip_level',
    isyear: 'vip_isyear',
    paytype: 'vip_paytype',
    isvip: 'vip_isvip',
    daily: 'vip_daily',
    payname: 'vip_payname',
    autopay: 'vip_autopay',
    vas_type: 'vas_type',
    ischild: 'vip_ischild',
    jsqtype: 'jsq_type',
    jsq_isvip: 'jsq_isvip',
    jsq_level: 'jsq_level',
    jsq_growvalue: 'jsq_growvalue',
    jsq_expiredate: 'jsq_expiredate',
    jsq_paytype: 'jsq_paytype',
    jsq_score: 'jsq_score',
    jsq_expiretype: 'jsq_expiretype',
    jsq_trialvip: 'jsq_trialvip',
    jsq_trialexpire: 'jsq_trialexpire',
    kn_isvip: 'vip_kn_isvip',
    kn_level: 'vip_kn_level',
    kn_expiredate: 'vip_kn_expiredate',
    history: '', // TODO: 没有找到对应的
    expiredays: '' // TODO: 没有找到对应的
};

var vipCookie = {
    get: function get(name) {
        var vipcookie = Cookies.get(cookieName);
        return decodeURIComponent((0, _util.getUrlParam)(cookieMap[name], vipcookie));
    },
    set: function set(name, value) {
        var vipcookie = Cookies.get(cookieName);
        var key = cookieMap[name];
        if (key) {
            if (new RegExp('(' + key + ')=([^&]*)', 'ig').test(vipcookie)) {
                Cookies.set(cookieName, (0, _util.setUrlParam)(key, value, vipcookie));
            } else {
                Cookies.set(cookieName, '' + (vipcookie ? vipcookie + '&' : '') + key + '=' + value);
            }
        }
    }
};

var User = {
    getInfo: function getInfo() {
        var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

        var vipcookie = Cookies.get('vipcookie');
        if (!vipcookie) {
            var url = _util.domainList.dypay + '/login/asynProxy?random=' + new Date().getTime();
            (0, _util.ajax)(url, function (res) {
                User.setInfo(res, function (data) {
                    callback(data);
                });
            });
        } else {
            User.setInfo(vipcookie, function (data) {
                callback(data);
            });
        }
    },
    setInfo: function setInfo(user) {
        var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

        var type = $.type(user);
        var arr = {
            3: 1,
            8: 1,
            9: 1,
            15: 1,
            103: 1
        }; //手机包月用户
        var userInfo = {
            isptvip: user.isvip == 1 && user.vas_type == 2,
            iszsvip: user.isvip == 1 && user.vas_type == 4,
            isbjvip: user.isvip == 1 && user.vas_type == 3,
            issjvip: !!arr[user.paytype] && user.isvip == 1 && user.paytype < 1000,
            isjsqvip: user.jsqtype > 0 && user.paytype < 1000, // 加速器会员
            isgjjsqvip: user.jsqtype == 1 && user.paytype < 1000, // 加速器高级会员
            // isgqvip: vip_level != null && vip_level != "" && vip_level != "0" && isvip != 1, // 过期会员
            istyvip: user.isvip == 1 && user.paytype > 1000, // 体验会员
            isztvip: user.isvip == 1 && user.paytype > 1000, // 体验会员
            // isgoodnum: vip_isgoodnum != null && vip_isgoodnum != '' && vip_isgoodnum == '1',

            usernewno: Cookies.get('usernewno'),
            userid: Cookies.get('userid'),
            sessionid: Cookies.get('sessionid'),

            // user的方法
            isPutongVip: user.isvip == 1 && user.vas_type == 2,
            isBaijin: user.isvip == 1 && user.vas_type == 3,
            isSuper: user.isvip == 1 && user.vas_type == 5,
            isPause: user.isvip == 2,
            isStopVip: user.isvip == 2
        };
        var _user = {};
        if (type === 'string') {
            for (var key in cookieMap) {
                _user[key] = vipCookie.get(key);
            }
            user = _user;
        }
        for (var _key in user) {
            vipCookie.set(_key, user[_key]);
        }
        $.extend(userInfo, user);
        callback(userInfo);
    },
    clearInfo: function clearInfo() {
        Cookies.remove(cookieName);
    }
};

module.exports = User;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * JavaScript Cookie v2.1.4
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
	var registeredInModuleLoader = false;
	if (true) {
		!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		registeredInModuleLoader = true;
	}
	if (true) {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function init (converter) {
		function api (key, value, attributes) {
			var result;
			if (typeof document === 'undefined') {
				return;
			}

			// Write

			if (arguments.length > 1) {
				attributes = extend({
					path: '/'
				}, api.defaults, attributes);

				if (typeof attributes.expires === 'number') {
					var expires = new Date();
					expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
					attributes.expires = expires;
				}

				// We're using "expires" because "max-age" is not supported by IE
				attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

				try {
					result = JSON.stringify(value);
					if (/^[\{\[]/.test(result)) {
						value = result;
					}
				} catch (e) {}

				if (!converter.write) {
					value = encodeURIComponent(String(value))
						.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
				} else {
					value = converter.write(value, key);
				}

				key = encodeURIComponent(String(key));
				key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
				key = key.replace(/[\(\)]/g, escape);

				var stringifiedAttributes = '';

				for (var attributeName in attributes) {
					if (!attributes[attributeName]) {
						continue;
					}
					stringifiedAttributes += '; ' + attributeName;
					if (attributes[attributeName] === true) {
						continue;
					}
					stringifiedAttributes += '=' + attributes[attributeName];
				}
				return (document.cookie = key + '=' + value + stringifiedAttributes);
			}

			// Read

			if (!key) {
				result = {};
			}

			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling "get()"
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var rdecode = /(%[0-9A-Z]{2})+/g;
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = parts[0].replace(rdecode, decodeURIComponent);
					cookie = converter.read ?
						converter.read(cookie, name) : converter(cookie, name) ||
						cookie.replace(rdecode, decodeURIComponent);

					if (this.json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					if (key === name) {
						result = cookie;
						break;
					}

					if (!key) {
						result[name] = cookie;
					}
				} catch (e) {}
			}

			return result;
		}

		api.set = api;
		api.get = function (key) {
			return api.call(api, key);
		};
		api.getJSON = function () {
			return api.apply({
				json: true
			}, [].slice.call(arguments));
		};
		api.defaults = {};

		api.remove = function (key, attributes) {
			api(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(7);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(9)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/.0.28.4@css-loader/index.js!./index.css", function() {
			var newContent = require("!!../node_modules/.0.28.4@css-loader/index.js!./index.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(undefined);
// imports


// module
exports.push([module.i, "#login {\r\n    width: 100%;\r\n    height: 600px;\r\n}\r\n\r\n.mt-15 {\r\n    margin-top: 15px;\r\n}\r\n\r\n.mr-15 {\r\n    margin-right: 15px;\r\n}\r\n\r\n.mb-15 {\r\n    margin-bottom: 15px;\r\n}\r\n\r\n.ml-15 {\r\n    margin-left: 15px;\r\n}\r\n\r\n.center-block {\r\n    width: 100%;\r\n}\r\n.divide {\r\n    border-color: #aae;\r\n    border-width: 5px;\r\n}\r\n", ""]);

// exports


/***/ }),
/* 8 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(10);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 10 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ]);
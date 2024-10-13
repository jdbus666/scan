/*
每次领取红包次数
export RedCount="5"
每个账号之间延时单位毫秒
export RedTimes="5000"
0 12 14 10 * jd_618redp.js
*/
const $ = new Env('双11红包');
const _0x23b352 = $.isNode() ? require("./jdCookie.js") : "";
let _0x35b099 = "",
  _0xb1627d = 3000,
  _0x48c6cb = 4,
  _0x5a7ec0 = 0;
$.CryptoJS = require("crypto-js");
const _0xfa6c4e = require("./function/dylans.js");
let _0x50efd5 = {};
if (process.env.DY_PROXY) try {
  require("https-proxy-agent");
  _0x50efd5 = require("./function/proxy.js");
  $.dget = _0x50efd5.intoRequest($.get.bind($));
  $.dpost = _0x50efd5.intoRequest($.post.bind($));
} catch {
  $.log("未安装https-proxy-agent依赖，无法启用代理");
  $.dget = $.get;
  $.dpost = $.post;
} else $.dpost = $.post, $.dget = $.get;
let _0xc05af6 = [],
  _0x2f2c29 = "";
if ($.isNode()) {
  Object.keys(_0x23b352).forEach(_0x593938 => {
    _0xc05af6.push(_0x23b352[_0x593938]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else _0xc05af6 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x249885($.getdata("CookiesJD") || "[]").map(_0x36f65c => _0x36f65c.cookie)].filter(_0x2d004e => !!_0x2d004e);
let _0x519999 = "";
if (!_0x519999) _0x519999 = "";
_0x519999 = $.isNode() ? process.env.JD_nhj_rebatePin ? process.env.JD_nhj_rebatePin : "" + _0x519999 : $.getdata("JD_nhj_rebatePin") ? $.getdata("JD_nhj_rebatePin") : "" + _0x519999;
_0x48c6cb = $.isNode() ? process.env.RedCount ? process.env.RedCount : "" + _0x48c6cb : $.getdata("RedCount") ? $.getdata("RedCount") : "" + _0x48c6cb;
_0xb1627d = $.isNode() ? process.env.RedTimes ? process.env.RedTimes : "" + _0xb1627d : $.getdata("RedTimes") ? $.getdata("RedTimes") : "" + _0xb1627d;
$.shareCount = $.isNode() ? process.env.JD_nhj_shareHelpCount ? process.env.JD_nhj_shareHelpCount : "" + _0x5a7ec0 : $.getdata("JD_nhj_shareHelpCount") ? $.getdata("JD_nhj_shareHelpCount") : "" + _0x5a7ec0;
$.shareCount = parseInt($.shareCount, 10) || 0;
let _0x22c435 = _0x519999 && _0x519999.split(",") || [];
$.time("yyyy-MM-dd HH:mm:ss");
message = "";
let _0x2fe70c = "";
resMsg = "";
$.uiUpdateTime = "";
$.endFlag = false;
$.runEnd = false;
let _0x59141b = {};
$.getH5st_WQ_Arr = {};
$.runArr = {};
let _0x298dd7 = "";
const _0x10e8b6 = "2024/11/12 00:00:00+08:00";
let _0x2ce899 = new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000;
$.UVCookieArr = {};
lr = {};
$.UVCookie = "";
let _0x490f4a = "",
  _0x19419b = 2;
_0xb1627d = Number(_0xb1627d);
$.time("yyyy-MM-dd");
_0x54cda4();
!(async () => {
  $.log("\n代理API DY_PROXY='url'");
  let _0xd383ce = await _0x30472e();
  if (_0xd383ce.length === 0) _0xd383ce = ["C6s8wqy", "C6s8wqy"];
  _0xd383ce = _0xd383ce[Math.floor(Math.random() * _0xd383ce.length)];
  if (!_0x35b099) _0x35b099 = "https://u.jd.com/" + (_0xd383ce || "C6s8wqy");
  _0x35b099 = $.isNode() ? process.env.REDCODE ? process.env.REDCODE : "" + _0x35b099 : $.getdata("REDCODE") ? $.getdata("REDCODE") : "" + _0x35b099;
  ii1I11 = _0x35b099 + "";
  if (/https:\/\/u\.jd\.com\/.+/.test(ii1I11)) {
    if (ii1I11.split("/").pop()) ii1I11 = ii1I11.split("/").pop().split("?").shift();else {
      console.log("请填写正确的rebateCode");
      return;
    }
  }
  if (!_0xc05af6[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  if (_0x2ce899 > new Date(_0x10e8b6).getTime()) {
    $.msg($.name, "活动已结束", "请删除此脚本");
    $.setdata("", "JD_231111_Red");
    $.setdata("", "JD_231111_Red_pin");
    return;
  }
  console.log("CODE：" + ii1I11.replace(/.+(.{3})/, "***$1"));
  $.shareCodeArr = {};
  $.shareCodePinArr = $.getdata("JD_231111_Red_pin") || {};
  $.shareCode = "";
  $.again = false;
  if ($.end) return;
  for (let _0x43e701 = 0; _0x43e701 < _0xc05af6.length && !$.runEnd; _0x43e701++) {
    if ($.endFlag) break;
    _0x2f2c29 = _0xc05af6[_0x43e701];
    if (_0x2f2c29) {
      $.UserName = decodeURIComponent(_0x2f2c29.match(/pt_pin=([^; ]+)(?=;?)/) && _0x2f2c29.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x43e701 + 1;
      if ($.runArr[$.UserName]) continue;
      console.log("\n\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      let _0x21bda6 = 1;
      _0x19419b = 4;
      $.eid_token = "";
      !$.index == 1 && _0x50efd5.swip && (await _0x50efd5.swip());
      _0x4f2e40(_0x21bda6);
      await _0x1c3cf6();
      await _0x252e50();
      if ($.endFlag) break;
    }
    $.setdata($.shareCodePinArr, "JD_231111_Red_pin");
  }
  $.setdata($.shareCodePinArr, "JD_231111_Red_pin");
  if (message) {
    if ($.isNode()) {}
  }
})().catch(_0x43a6e9 => $.logErr(_0x43a6e9)).finally(() => {
  $.done();
});
async function _0x252e50(_0xd5d405 = 0) {
  try {
    $.UVCookie = $.UVCookieArr[$.UserName] || "";
    !$.UVCookie && _0x54cda4();
    resMsg = "";
    let _0xe869a3 = false,
      _0x9e4d34 = 0,
      _0x5b1d74 = 0,
      _0x45b7fc = 0;
    $.shareFlag = true;
    do {
      if (_0x5b1d74 > 2) _0x9e4d34 = 0;
      $.flag = 0;
      _0x2fe70c = "";
      $.url1 = "";
      await _0x2d6f91();
      if (!$.url1) {
        console.log("获取url1失败");
        $.end = true;
        break;
      }
      $.url2 = "";
      $.UVCookie = _0x490f4a.getUVCookie("", "", $.url1, $.UVCookie);
      $.UVCookieArr[$.UserName] = $.UVCookie + "";
      await _0x1672bf();
      if (!$.url2) {
        console.log("获取不到红包页面");
        break;
      }
      if (!/unionActId=\d+/.test($.url2) && !new RegExp("&d=" + ii1I11).test($.url2)) {
        console.log("url：https://u.jd.com/" + ii1I11 + " 可能不是红包页面");
        $.runEnd = true;
        return;
      }
      if (!$.url2) $.url2 = "https://pro.m.jd.com/mall/active/3Rztcv2tMwdpFqWiqaAUzBAToowC/index.html?unionActId=31177&d=" + ii1I11 + "&cu=true&utm_source=kong&utm_medium=jingfen";
      $.actId = $.url2.match(/(https:\/\/\S{3,7}[\.m]{0,}\.jd\.com)/) && $.url2.match(/mall\/active\/([^/]+)\/index\.html/)[1] || "3Rztcv2tMwdpFqWiqaAUzBAToowC";
      $.UVCookie = _0x490f4a.getUVCookie("", "", $.url2, $.UVCookie);
      $.origin = $.url2.match(/(https:\/\/\S{3,7}[\.m]{0,}\.jd\.com)/) && $.url2.match(/(https:\/\/\S{3,7}[\.m]{0,}\.jd\.com)/)[1] || "https://pro.m.jd.com";
      $.UVCookieArr[$.UserName] = $.UVCookie + "";
      $.eid = "";
      !$.eid && ($.eid = -1);
      if (_0xd5d405 == 0) {
        let _0xaa2055 = 0,
          _0x283c6b = true,
          _0x41979e = 0;
        if (Object.getOwnPropertyNames(_0x59141b).length > _0x9e4d34 && $.shareFlag) for (let _0xebba3a in _0x59141b || {}) {
          if (_0xebba3a == $.UserName) {
            $.flag = 1;
            continue;
          }
          if (_0xaa2055 == _0x9e4d34) {
            $.flag = 0;
            $.shareCode = _0x59141b[_0xebba3a] || "";
            if ($.shareCodePinArr[_0xebba3a] && $.shareCodePinArr[_0xebba3a].includes($.UserName)) {
              _0x41979e++;
              continue;
            }
            if ($.shareCode.count >= $.shareCodeArr.shareCount) {
              _0x41979e++;
              continue;
            }
            $.getlj = false;
            if ($.shareCode) console.log("助力[" + _0xebba3a + "]");
            let _0x17be45 = await _0x2199f1($.shareCode.code, 1);
            if (/重复助力/.test(_0x17be45)) {
              if (!$.shareCodePinArr[_0xebba3a]) $.shareCodePinArr[_0xebba3a] = [];
              $.shareCodePinArr[_0xebba3a].push($.UserName);
              _0x9e4d34--;
              _0x45b7fc--;
            } else {
              if (/助力/.test(_0x17be45) && /上限/.test(_0x17be45)) $.shareFlag = false;else {
                if (!/领取上限/.test(_0x17be45) && $.getlj == true) {
                  if (!$.shareCodePinArr[_0xebba3a]) $.shareCodePinArr[_0xebba3a] = [];
                  !$.shareCodePinArr[_0xebba3a].includes($.UserName) && $.shareCodePinArr[_0xebba3a].push($.UserName);
                  _0x9e4d34--;
                } else _0x283c6b = false;
              }
            }
          }
          _0xaa2055++;
        }
        _0x283c6b && _0x41979e == Object.getOwnPropertyNames(_0x59141b).length && (_0xe869a3 = true);
        if (_0xaa2055 == 0) {
          $.getlj = false;
          let _0x15adb5 = await _0x2199f1("", 1);
          !/领取上限/.test(_0x15adb5) && $.getlj == true && _0x9e4d34--;
        }
        if ($.endFlag) break;
      } else {
        let _0x202654 = await _0x204404();
        if (!$.endFlag && _0x202654 && $.again == false) await _0x162c8c();
        if ($.again == false) break;
      }
      $.again == true && _0x5b1d74 < 1 && (_0x5b1d74++, $.again = false);
      _0x9e4d34++;
      _0x45b7fc++;
      $.flag == 1 && (await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
      if (_0x48c6cb > 0 && _0x48c6cb <= _0x45b7fc) break;
    } while ($.flag == 1 && _0x9e4d34 < 4);
    if ($.endFlag) return;
    resMsg && (message += "【京东账号" + $.index + "】\n" + resMsg);
    if (!_0x50efd5) {
      if ($.index % 10 == 0) {
        let _0xb11577 = parseInt(Math.random() * 1000 + 5000, 10);
        console.log("等待 " + _0xb11577 / 1000 + " 秒");
        await $.wait(_0xb11577);
      } else await $.wait(Math.random() * 2000 + _0xb1627d, 10);
    } else await $.wait(Math.random() * 1000 + 2000, 10);
  } catch (_0x462b06) {
    console.log(_0x462b06);
  }
}
async function _0x34cc4e(_0x3ee431 = 0) {
  try {
    let _0x46b5de = 2;
    if (_0x3ee431 == 1) _0x46b5de = 1;
    let _0xc0074e = 0;
    for (let _0x333a99 in $.shareCodeArr || {}) {
      if (_0x333a99 === "flag" || _0x333a99 === "updateTime" || _0x333a99 === "shareCount") continue;
      if ($.shareCodeArr[_0x333a99] && $.shareCodeArr.shareCount && $.shareCodeArr[_0x333a99].count < $.shareCodeArr.shareCount) _0xc0074e++;
    }
    for (let _0xfeed65 = 0; _0xfeed65 < _0xc05af6.length && !$.runEnd; _0xfeed65++) {
      _0x2f2c29 = _0xc05af6[_0xfeed65];
      if (_0x2f2c29) {
        $.UserName = decodeURIComponent(_0x2f2c29.match(/pt_pin=([^; ]+)(?=;?)/) && _0x2f2c29.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        if (_0x22c435.length > 0 && _0x22c435.indexOf($.UserName) == -1 || $.shareCodeArr[$.UserName]) continue;
        $.index = _0xfeed65 + 1;
        $.eid_token = "";
        _0x4f2e40();
        await _0x1c3cf6();
        await _0x252e50(1);
        let _0x14f103 = 0;
        for (let _0x71959a in $.shareCodeArr || {}) {
          if (_0x71959a === "flag" || _0x71959a === "updateTime" || _0x71959a === "shareCount") continue;
          if ($.shareCodeArr[_0x71959a] && $.shareCodeArr.shareCount && $.shareCodeArr[_0x71959a].count < $.shareCodeArr.shareCount) _0x14f103++;
        }
        if ($.endFlag || _0x14f103 - _0xc0074e >= _0x46b5de || $.end) break;
      }
    }
  } catch (_0x431c71) {
    console.log(_0x431c71);
  }
  if (Object.getOwnPropertyNames($.shareCodeArr).length > 0) for (let _0x1345f1 in $.shareCodeArr || {}) {
    if (_0x1345f1 === "flag" || _0x1345f1 === "updateTime" || _0x1345f1 === "shareCount") continue;
    if ($.shareCodeArr[_0x1345f1]) _0x59141b[_0x1345f1] = $.shareCodeArr[_0x1345f1];
  }
}
function _0x2199f1(_0x360f7d = "", _0x4db982 = 1) {
  return new Promise(async _0x84fc15 => {
    $.UVCookie = _0x490f4a.getUVCookie("", "", $.url2, $.UVCookie);
    $.UVCookieArr[$.UserName] = $.UVCookie + "";
    let _0x5489b9 = "";
    const _0x457fce = {
        "platform": _0x19419b,
        "unionActId": "31177",
        "actId": $.actId,
        "d": ii1I11,
        "unionShareId": _0x360f7d,
        "type": _0x4db982,
        "qdPageId": "MO-J2011-1",
        "mdClickId": "jxhongbao_ck"
      },
      _0x449348 = {
        "appId": "c822a",
        "functionId": "getCoupons",
        "body": _0x457fce,
        "appid": "u_hongbao",
        "clientVersion": $.UA.split(";")[2],
        "client": "apple",
        "user": $.UserName,
        "code": 0,
        "xcr": 1,
        "ua": $.UA
      };
    let _0x47b300 = await _0xfa6c4e.getbody(_0x449348, $.UserName);
    _0x5489b9 = _0x47b300.h5st || "";
    let _0x554f89 = "",
      _0x224167 = {
        "url": "https://api.m.jd.com/api",
        "body": "loginType=2&" + _0x47b300 + ($.eid_token ? "&x-api-eid-token=" + $.eid_token : ""),
        "headers": {
          "accept": "*/*",
          "Accept-Language": "zh-cn",
          "Accept-Encoding": "gzip, deflate, br",
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          "Cookie": "" + $.UVCookie + _0x2fe70c + " " + _0x2f2c29,
          "origin": $.origin,
          "Referer": "https://pro.m.jd.com/mall/active/3Rztcv2tMwdpFqWiqaAUzBAToowC/index.html",
          "User-Agent": $.UA
        }
      };
    _0x224167.headers.Cookie = _0x224167.headers.Cookie.replace(/;\s*$/, "");
    _0x224167.headers.Cookie = _0x224167.headers.Cookie.replace(/;([^\s])/g, "; $1");
    if ($.url2) _0x224167.headers.Referer = $.url2;
    $.dpost(_0x224167, async (_0x5aba0d, _0x5340cc, _0x434294) => {
      try {
        if (_0x5aba0d) console.log("" + $.toStr(_0x5aba0d)), console.log($.name + " API请求失败，请检查网路重试");else {
          let _0x50cd79 = $.toObj(_0x434294, _0x434294);
          if (typeof _0x50cd79 == "object") {
            _0x50cd79.msg && (_0x554f89 = _0x50cd79.msg, console.log(_0x50cd79.msg));
            if (_0x50cd79.msg.indexOf("不展示弹层") > -1 && _0x4db982 == 1) $.again = true;
            if (_0x50cd79.msg.indexOf("领取上限") === -1 && _0x50cd79.msg.indexOf("登录") === -1) {
              if (_0x4db982 == 1) $.flag = 1;
            }
            if (_0x50cd79.msg.indexOf("活动已结束") > -1 || _0x50cd79.msg.indexOf("活动未开始") > -1) {
              $.endFlag = true;
              return;
            }
            _0x360f7d && typeof _0x50cd79.data !== "undefined" && typeof _0x50cd79.data.joinNum !== "undefined" && console.log("当前" + _0x50cd79.data.joinSuffix + ":" + _0x50cd79.data.joinNum);
            if (_0x50cd79.code == 0 && _0x50cd79.data) {
              if (_0x4db982 == 1) $.shareCode.count++;
              let _0x55eb90 = "";
              for (let _0x688390 of _0x50cd79.data.couponList) {
                if (_0x688390.type == 1) $.getlj = true, _0x55eb90 += (_0x55eb90 ? "\n" : "") + "获得[红包]🧧" + _0x688390.discount + "元 使用时间:" + $.time("yyyy-MM-dd", _0x688390.beginTime) + " " + $.time("yyyy-MM-dd", _0x688390.endTime);else {
                  if (_0x688390.type == 3) $.getlj = true, _0x55eb90 += (_0x55eb90 ? "\n" : "") + "获得[优惠券]🎟️满" + _0x688390.quota + "减" + _0x688390.discount + " 使用时间:" + $.time("yyyy-MM-dd", _0x688390.beginTime) + " " + $.time("yyyy-MM-dd", _0x688390.endTime);else _0x688390.type == 6 ? ($.getlj = true, _0x55eb90 += (_0x55eb90 ? "\n" : "") + "获得[打折券]]🎫满" + _0x688390.quota + "打" + _0x688390.discount * 10 + "折 使用时间:" + $.time("yyyy-MM-dd", _0x688390.beginTime) + " " + $.time("yyyy-MM-dd", _0x688390.endTime)) : ($.getlj = true, _0x55eb90 += (_0x55eb90 ? "\n" : "") + "获得[未知]🎉" + (_0x688390.quota || "") + " " + _0x688390.discount + " 使用时间:" + $.time("yyyy-MM-dd", _0x688390.beginTime) + " " + $.time("yyyy-MM-dd", _0x688390.endTime), console.log(_0x688390));
                }
              }
              _0x55eb90 && (resMsg += _0x55eb90 + "\n", console.log(_0x55eb90));
            }
            if (_0x4db982 == 1 && typeof _0x50cd79.data !== "undefined" && typeof _0x50cd79.data.groupData !== "undefined" && typeof _0x50cd79.data.groupData.groupInfo !== "undefined") for (let _0x63f6e3 of _0x50cd79.data.groupData.groupInfo || []) {
              _0x63f6e3.status == 2 && (console.log("助力满可以领取" + _0x63f6e3.info + "元红包🧧"), await $.wait(parseInt(Math.random() * 2000 + 2000, 10)), await _0x2199f1("", 2));
            }
          } else console.log(_0x434294);
        }
      } catch (_0x35f67b) {
        $.logErr(_0x35f67b, _0x5340cc);
      } finally {
        _0x84fc15(_0x554f89);
      }
    });
  });
}
function _0x204404(_0x10aab3 = "") {
  let _0x31fb90 = true;
  return new Promise(_0x2375bf => {
    $.UVCookie = _0x490f4a.getUVCookie("", "", $.url2, $.UVCookie);
    $.UVCookieArr[$.UserName] = $.UVCookie + "";
    let _0x5262a2 = {
      "url": "https://api.m.jd.com/api?functionId=showCoupon&appid=u_hongbao&_=" + Date.now() + "&loginType=2&body={%22actId%22:%22" + $.actId + "%22,%22unionActId%22:%2231177%22,%22unpl%22:%22" + $.unpl + "%22,%22platform%22:" + _0x19419b + ",%22unionShareId%22:%22%22," + ($.uiUpdateTime ? "%22uiUpdateTime%22:" + $.uiUpdateTime + "," : "") + "%22d%22:%22" + ii1I11 + "%22,%22eid%22:%22" + $.eid + "%22}&client=iPhone&clientVersion=&osVersion=iOS&d_brand=iPhone&d_model=iPhone&lang=zh-cn&openudid=" + ($.eid_token ? "&x-api-eid-token=" + $.eid_token : ""),
      "headers": {
        "accept": "*/*",
        "Accept-Language": "zh-cn",
        "Accept-Encoding": "gzip, deflate, br",
        "Cookie": "" + $.UVCookie + _0x2fe70c + " " + _0x2f2c29,
        "origin": $.origin,
        "Referer": $.origin + "/",
        "User-Agent": $.UA
      }
    };
    _0x5262a2.headers.Cookie = _0x5262a2.headers.Cookie.replace(/;\s*$/, "");
    _0x5262a2.headers.Cookie = _0x5262a2.headers.Cookie.replace(/;([^\s])/g, "; $1");
    if ($.url2) _0x5262a2.headers.Referer = $.url2;
    $.dget(_0x5262a2, async (_0x402bd4, _0x51feb4, _0x48efd6) => {
      try {
        if (_0x402bd4) console.log("" + $.toStr(_0x402bd4)), console.log($.name + " API请求失败，请检查网路重试");else {
          let _0x3b7f71 = $.toObj(_0x48efd6, _0x48efd6);
          if (typeof _0x3b7f71 == "object") {
            if (_0x3b7f71.msg) console.log(_0x3b7f71.msg);
            if (_0x3b7f71.msg.indexOf("不展示弹层") > -1) $.again = true;
            if (_0x3b7f71.msg.indexOf("领取上限") > -1) $.runArr[$.UserName] = true;
            _0x3b7f71.msg.indexOf("上限") === -1 && _0x3b7f71.msg.indexOf("登录") === -1 && ($.flag = 1);
            if (_0x3b7f71.msg.indexOf("活动已结束") > -1 || _0x3b7f71.msg.indexOf("活动未开始") > -1) {
              $.endFlag = true;
              return;
            }
            if (_0x3b7f71.data.uiUpdateTime) $.uiUpdateTime = _0x3b7f71.data.uiUpdateTime;
            if (typeof _0x3b7f71.data !== "undefined" && typeof _0x3b7f71.data.groupData !== "undefined" && typeof _0x3b7f71.data.groupData.joinNum !== "undefined") {
              $.joinNum = _0x3b7f71.data.groupData.joinNum;
              let _0x58dd76 = 0;
              for (let _0x5bb433 of _0x3b7f71.data.groupData.groupInfo) {
                if (_0x58dd76 < _0x5bb433.num) _0x58dd76 = _0x5bb433.num;
              }
              if ($.shareCount > 0 && _0x58dd76 > $.shareCount) _0x58dd76 = $.shareCount;
              $.shareCodeArr[$.UserName] && ($.shareCodeArr[$.UserName].count = _0x58dd76);
              $.shareCodeArr.shareCount = _0x58dd76;
              if (_0x58dd76 <= $.joinNum) {
                if (!$.shareCodeArr[$.UserName]) $.shareCodeArr[$.UserName] = {};
                $.shareCodeArr[$.UserName].count = $.joinNum;
                _0x31fb90 = false;
              }
              console.log("【账号" + $.index + "】" + ($.nickName || $.UserName) + " " + $.joinNum + "/" + _0x58dd76 + "人");
            }
            _0x3b7f71.msg.indexOf("活动已结束") > -1 && (_0x31fb90 = false);
            if (typeof _0x3b7f71.data !== "undefined" && typeof _0x3b7f71.data.groupData !== "undefined" && typeof _0x3b7f71.data.groupData.groupInfo !== "undefined") for (let _0x17b7b8 of _0x3b7f71.data.groupData.groupInfo || []) {
              _0x17b7b8.status == 2 && (console.log("助力满可以领取" + _0x17b7b8.info + "元红包🧧"), await $.wait(parseInt(Math.random() * 2000 + 2000, 10)), await _0x2199f1("", 2));
            }
          } else console.log(_0x48efd6);
        }
      } catch (_0x2ba261) {
        $.logErr(_0x2ba261, _0x51feb4);
      } finally {
        _0x2375bf(_0x31fb90);
      }
    });
  });
}
function _0x162c8c() {
  if ($.shareCodeArr[$.UserName]) {
    console.log("【账号" + $.index + "】缓存分享码:" + $.shareCodeArr[$.UserName].code.replace(/.+(.{3})/, "***$1"));
    return;
  }
  return new Promise(_0x48c755 => {
    let _0x5ed05e = {
      "url": "https://api.m.jd.com/api?functionId=shareUnionCoupon&appid=u_hongbao&_=" + Date.now() + "&loginType=2&body={%22unionActId%22:%2231177%22,%22actId%22:%22" + $.actId + "%22,%22platform%22:4,%22unionShareId%22:%22%22,%22d%22:%22" + ii1I11 + "%22,%22supportPic%22:2}&client=iPhone&clientVersion=&osVersion=iOS&d_brand=iPhone&d_model=iPhone&lang=zh-cn&openudid=" + ($.eid_token ? "&x-api-eid-token=" + $.eid_token : ""),
      "headers": {
        "accept": "*/*",
        "Accept-Language": "zh-cn",
        "Accept-Encoding": "gzip, deflate, br",
        "Cookie": "" + $.UVCookie + _0x2fe70c + " " + _0x2f2c29,
        "origin": $.origin,
        "Referer": $.origin + "/",
        "User-Agent": $.UA
      }
    };
    _0x5ed05e.headers.Cookie = _0x5ed05e.headers.Cookie.replace(/;\s*$/, "");
    _0x5ed05e.headers.Cookie = _0x5ed05e.headers.Cookie.replace(/;([^\s])/g, "; $1");
    $.dget(_0x5ed05e, async (_0x48e36b, _0x31cf32, _0x45752e) => {
      try {
        if (_0x48e36b) console.log("" + $.toStr(_0x48e36b)), console.log($.name + " API请求失败，请检查网路重试");else {
          let _0x459ce7 = $.toObj(_0x45752e, _0x45752e);
          if (typeof _0x459ce7 == "object") {
            if (_0x459ce7.code == 0 && _0x459ce7.data && _0x459ce7.data.shareUrl) {
              let _0x35e0f5 = _0x459ce7.data.shareUrl.match(/\?s=([^&]+)/) && _0x459ce7.data.shareUrl.match(/\?s=([^&]+)/)[1] || "";
              _0x35e0f5 && (console.log("【账号" + $.index + "】分享码：" + _0x35e0f5.replace(/.+(.{3})/, "***$1")), $.shareCodeArr[$.UserName] = {
                "code": _0x35e0f5,
                "count": $.joinNum
              });
            }
          } else console.log(_0x45752e);
        }
      } catch (_0x196fa1) {
        $.logErr(_0x196fa1, _0x31cf32);
      } finally {
        _0x48c755();
      }
    });
  });
}
function _0x1672bf() {
  return new Promise(_0x251537 => {
    const _0x8200a8 = {
      "url": $.url1,
      "followRedirect": false,
      "headers": {
        "Cookie": "" + $.UVCookie + _0x2fe70c + " " + _0x2f2c29,
        "User-Agent": $.UA
      }
    };
    $.dget(_0x8200a8, async (_0x338f70, _0x27b9e9, _0x1e51eb) => {
      try {
        _0x5f45f2(_0x27b9e9);
        $.url2 = _0x27b9e9 && _0x27b9e9.headers && (_0x27b9e9.headers.location || _0x27b9e9.headers.Location || "") || "";
        $.url2 = decodeURIComponent($.url2);
        $.url2 = $.url2.match(/(https:\/\/\S{3,7}[\.m]{0,}\.jd\.com\/mall[^'"]+)/) && $.url2.match(/(https:\/\/\S{3,7}[\.m]{0,}\.jd\.com\/mall[^'"]+)/)[1] || "";
      } catch (_0xc4230d) {
        $.logErr(_0xc4230d, _0x27b9e9);
      } finally {
        _0x251537(_0x1e51eb);
      }
    });
  });
}
function _0x2d6f91() {
  return new Promise(_0x5c9227 => {
    const _0x1399e9 = {
      "url": "https://u.jd.com/" + ii1I11 + ($.shareCode && "?s=" + $.shareCode || ""),
      "followRedirect": false,
      "headers": {
        "Cookie": "" + $.UVCookie + _0x2fe70c + " " + _0x2f2c29,
        "User-Agent": $.UA
      }
    };
    $.dget(_0x1399e9, async (_0x4b02af, _0x6603fc, _0x1f58c1) => {
      try {
        _0x5f45f2(_0x6603fc);
        $.url1 = _0x1f58c1 && _0x1f58c1.match(/(https:\/\/u\.jd\.com\/jda[^']+)/) && _0x1f58c1.match(/(https:\/\/u\.jd\.com\/jda[^']+)/)[1] || "";
      } catch (_0x2cd5da) {
        $.logErr(_0x2cd5da, _0x6603fc);
      } finally {
        _0x5c9227(_0x1f58c1);
      }
    });
  });
}
function _0x5f45f2(_0xdf3570) {
  let _0x1d4671 = _0xdf3570 && _0xdf3570.headers && (_0xdf3570.headers["set-cookie"] || _0xdf3570.headers["Set-Cookie"] || "") || "",
    _0x109947 = "";
  if (_0x1d4671) {
    if (typeof _0x1d4671 != "object") _0x109947 = _0x1d4671.split(",");else _0x109947 = _0x1d4671;
    for (let _0x1d39f9 of _0x109947) {
      let _0x44581e = _0x1d39f9.split(";")[0].trim();
      if (_0x44581e.split("=")[1]) {
        _0x44581e.split("=")[0] == "unpl" && _0x44581e.split("=")[1] && ($.unpl = _0x44581e.split("=")[1]);
        if (_0x2fe70c.indexOf(_0x44581e.split("=")[1]) == -1) _0x2fe70c += _0x44581e.replace(/ /g, "") + "; ";
      }
    }
  }
}
function _0x3d2ce4(_0x252af0 = 1) {
  $.UA = "jdapp;iPhone;12.0.2;;;M/5.0;appBuild/168698;jdSupportDarkMode/0;ef/1;ep/" + encodeURIComponent(JSON.stringify({
    "ciphertype": 5,
    "cipher": {
      "ud": "",
      "sv": "CJGkCm==",
      "iad": ""
    },
    "ts": Math.floor(new Date().getTime() / 1000),
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "version": "1.0.3",
    "appname": "com.360buy.jdmobile",
    "ridx": -1
  })) + ";Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function _0x561684(_0x34feba) {
  let _0x29ed17 = "0123456789abcdef",
    _0x3b9a19 = "";
  for (let _0x14c855 = 0; _0x14c855 < _0x34feba; _0x14c855++) {
    _0x3b9a19 += _0x29ed17[Math.ceil(100000000 * Math.random()) % _0x29ed17.length];
  }
  return _0x3b9a19;
}
function _0x439024(_0x1d5f60, _0x4287e3) {
  let _0x3e58db = new Array();
  for (let _0x2b59a5 in _0x1d5f60) {
    _0x3e58db.push(_0x1d5f60[_0x2b59a5]);
  }
  let _0x4d8b49 = new Array();
  for (let _0x1b7838 = 0; _0x1b7838 < _0x4287e3; _0x1b7838++) {
    if (_0x3e58db.length > 0) {
      let _0xc6cfb1 = Math.floor(Math.random() * _0x3e58db.length);
      _0x4d8b49[_0x1b7838] = _0x3e58db[_0xc6cfb1];
      _0x3e58db.splice(_0xc6cfb1, 1);
    } else break;
  }
  return _0x4d8b49;
}
function _0x4f2e40(_0x27da3a) {
  let _0x5485c = {
      "A": "K",
      "B": "L",
      "C": "M",
      "D": "N",
      "E": "O",
      "F": "P",
      "G": "Q",
      "H": "R",
      "I": "S",
      "J": "T",
      "K": "A",
      "L": "B",
      "M": "C",
      "N": "D",
      "O": "E",
      "P": "F",
      "Q": "G",
      "R": "H",
      "S": "I",
      "T": "J",
      "e": "o",
      "f": "p",
      "g": "q",
      "h": "r",
      "i": "s",
      "j": "t",
      "k": "u",
      "l": "v",
      "m": "w",
      "n": "x",
      "o": "e",
      "p": "f",
      "q": "g",
      "r": "h",
      "s": "i",
      "t": "j",
      "u": "k",
      "v": "l",
      "w": "m",
      "x": "n"
    },
    _0x1a00cd = _0x439024([12, 13, 14, 15, 16], 1) + "." + _0x439024([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 1) + "." + _0x439024([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 1),
    _0x5c5ce0 = _0x439024([9, 10, 11], 1) + "." + _0x439024([0, 1, 2, 3, 4, 5, 6, 7, 8], 1) + "." + _0x439024([0, 1, 2, 3, 4, 5], 1),
    _0x216b89 = {
      "ciphertype": 5,
      "cipher": {
        "ud": "",
        "sv": "",
        "iad": ""
      },
      "ts": parseInt(new Date().getTime() / 1000),
      "hdid": "",
      "version": "1.0.3",
      "appname": "",
      "ridx": -1
    };
  _0x216b89.cipher.sv = new Buffer.from(_0x1a00cd).toString("base64").split("").map(_0x556def => _0x5485c[_0x556def] || _0x556def).join("");
  _0x216b89.cipher.ud = new Buffer.from(_0x561684(40)).toString("base64").split("").map(_0x304192 => _0x5485c[_0x304192] || _0x304192).join("");
  _0x216b89.appname = "com.360buy.jdmobile";
  _0x216b89.hdid = "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=";
  $.UA = "jdapp;iPhone;" + _0x5c5ce0 + ";;;M/5.0;appBuild/168341;jdSupportDarkMode/0;ef/1;ep/" + encodeURIComponent(JSON.stringify(_0x216b89)) + ";Mozilla/5.0 (iPhone; CPU iPhone OS " + _0x1a00cd.replace(/\./g, "_") + " like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function _0x249885(_0xd8391b) {
  if (typeof _0xd8391b == "string") try {
    return JSON.parse(_0xd8391b);
  } catch (_0x44012f) {
    return console.log(_0x44012f), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
async function _0x1c3cf6() {
  var _0x98265e = function () {
    function _0x1e5ab9(_0x405084, _0x178bef) {
      _0x405084 = [_0x405084[0] >>> 16, 65535 & _0x405084[0], _0x405084[1] >>> 16, 65535 & _0x405084[1]];
      _0x178bef = [_0x178bef[0] >>> 16, 65535 & _0x178bef[0], _0x178bef[1] >>> 16, 65535 & _0x178bef[1]];
      var _0x53b525 = [0, 0, 0, 0];
      return _0x53b525[3] += _0x405084[3] + _0x178bef[3], _0x53b525[2] += _0x53b525[3] >>> 16, _0x53b525[3] &= 65535, _0x53b525[2] += _0x405084[2] + _0x178bef[2], _0x53b525[1] += _0x53b525[2] >>> 16, _0x53b525[2] &= 65535, _0x53b525[1] += _0x405084[1] + _0x178bef[1], _0x53b525[0] += _0x53b525[1] >>> 16, _0x53b525[1] &= 65535, _0x53b525[0] += _0x405084[0] + _0x178bef[0], _0x53b525[0] &= 65535, [_0x53b525[0] << 16 | _0x53b525[1], _0x53b525[2] << 16 | _0x53b525[3]];
    }
    function _0x4a07de(_0x367e48, _0x2abeb3) {
      _0x367e48 = [_0x367e48[0] >>> 16, 65535 & _0x367e48[0], _0x367e48[1] >>> 16, 65535 & _0x367e48[1]];
      _0x2abeb3 = [_0x2abeb3[0] >>> 16, 65535 & _0x2abeb3[0], _0x2abeb3[1] >>> 16, 65535 & _0x2abeb3[1]];
      var _0x16dd56 = [0, 0, 0, 0];
      return _0x16dd56[3] += _0x367e48[3] * _0x2abeb3[3], _0x16dd56[2] += _0x16dd56[3] >>> 16, _0x16dd56[3] &= 65535, _0x16dd56[2] += _0x367e48[2] * _0x2abeb3[3], _0x16dd56[1] += _0x16dd56[2] >>> 16, _0x16dd56[2] &= 65535, _0x16dd56[2] += _0x367e48[3] * _0x2abeb3[2], _0x16dd56[1] += _0x16dd56[2] >>> 16, _0x16dd56[2] &= 65535, _0x16dd56[1] += _0x367e48[1] * _0x2abeb3[3], _0x16dd56[0] += _0x16dd56[1] >>> 16, _0x16dd56[1] &= 65535, _0x16dd56[1] += _0x367e48[2] * _0x2abeb3[2], _0x16dd56[0] += _0x16dd56[1] >>> 16, _0x16dd56[1] &= 65535, _0x16dd56[1] += _0x367e48[3] * _0x2abeb3[1], _0x16dd56[0] += _0x16dd56[1] >>> 16, _0x16dd56[1] &= 65535, _0x16dd56[0] += _0x367e48[0] * _0x2abeb3[3] + _0x367e48[1] * _0x2abeb3[2] + _0x367e48[2] * _0x2abeb3[1] + _0x367e48[3] * _0x2abeb3[0], _0x16dd56[0] &= 65535, [_0x16dd56[0] << 16 | _0x16dd56[1], _0x16dd56[2] << 16 | _0x16dd56[3]];
    }
    function _0x2bd724(_0x4beb62, _0x40f97d) {
      return 32 === (_0x40f97d %= 64) ? [_0x4beb62[1], _0x4beb62[0]] : 32 > _0x40f97d ? [_0x4beb62[0] << _0x40f97d | _0x4beb62[1] >>> 32 - _0x40f97d, _0x4beb62[1] << _0x40f97d | _0x4beb62[0] >>> 32 - _0x40f97d] : (_0x40f97d -= 32, [_0x4beb62[1] << _0x40f97d | _0x4beb62[0] >>> 32 - _0x40f97d, _0x4beb62[0] << _0x40f97d | _0x4beb62[1] >>> 32 - _0x40f97d]);
    }
    function _0x3a6927(_0x305075, _0x204af0) {
      return 0 === (_0x204af0 %= 64) ? _0x305075 : 32 > _0x204af0 ? [_0x305075[0] << _0x204af0 | _0x305075[1] >>> 32 - _0x204af0, _0x305075[1] << _0x204af0] : [_0x305075[1] << _0x204af0 - 32, 0];
    }
    function _0x27c3e6(_0x2428e1, _0x123f7d) {
      return [_0x2428e1[0] ^ _0x123f7d[0], _0x2428e1[1] ^ _0x123f7d[1]];
    }
    function _0x48e783(_0x33dcbc) {
      return _0x27c3e6(_0x33dcbc = _0x4a07de(_0x33dcbc = _0x27c3e6(_0x33dcbc = _0x4a07de(_0x33dcbc = _0x27c3e6(_0x33dcbc, [0, _0x33dcbc[0] >>> 1]), [4283543511, 3981806797]), [0, _0x33dcbc[0] >>> 1]), [3301882366, 444984403]), [0, _0x33dcbc[0] >>> 1]);
    }
    return {
      "hash128": function (_0x2d6019, _0xbdf1bb) {
        var _0x1e7d96 = _0xbdf1bb || 0;
        _0xbdf1bb = (_0x2d6019 = _0x2d6019 || "").length % 16;
        var _0x9c5a57 = _0x2d6019.length - _0xbdf1bb,
          _0x77c4ba = [0, _0x1e7d96];
        _0x1e7d96 = [0, _0x1e7d96];
        for (var _0x1e2b5d, _0x362ef0, _0x37b392 = [2277735313, 289559509], _0x4f4a8d = [1291169091, 658871167], _0x5003e2 = 0; _0x5003e2 < _0x9c5a57; _0x5003e2 += 16) {
          _0x1e2b5d = [255 & _0x2d6019.charCodeAt(_0x5003e2 + 4) | (255 & _0x2d6019.charCodeAt(_0x5003e2 + 5)) << 8 | (255 & _0x2d6019.charCodeAt(_0x5003e2 + 6)) << 16 | (255 & _0x2d6019.charCodeAt(_0x5003e2 + 7)) << 24, 255 & _0x2d6019.charCodeAt(_0x5003e2) | (255 & _0x2d6019.charCodeAt(_0x5003e2 + 1)) << 8 | (255 & _0x2d6019.charCodeAt(_0x5003e2 + 2)) << 16 | (255 & _0x2d6019.charCodeAt(_0x5003e2 + 3)) << 24];
          _0x362ef0 = [255 & _0x2d6019.charCodeAt(_0x5003e2 + 12) | (255 & _0x2d6019.charCodeAt(_0x5003e2 + 13)) << 8 | (255 & _0x2d6019.charCodeAt(_0x5003e2 + 14)) << 16 | (255 & _0x2d6019.charCodeAt(_0x5003e2 + 15)) << 24, 255 & _0x2d6019.charCodeAt(_0x5003e2 + 8) | (255 & _0x2d6019.charCodeAt(_0x5003e2 + 9)) << 8 | (255 & _0x2d6019.charCodeAt(_0x5003e2 + 10)) << 16 | (255 & _0x2d6019.charCodeAt(_0x5003e2 + 11)) << 24];
          _0x77c4ba = _0x1e5ab9(_0x4a07de(_0x77c4ba = _0x1e5ab9(_0x77c4ba = _0x2bd724(_0x77c4ba = _0x27c3e6(_0x77c4ba, _0x1e2b5d = _0x4a07de(_0x1e2b5d = _0x2bd724(_0x1e2b5d = _0x4a07de(_0x1e2b5d, _0x37b392), 31), _0x4f4a8d)), 27), _0x1e7d96), [0, 5]), [0, 1390208809]);
          _0x1e7d96 = _0x1e5ab9(_0x4a07de(_0x1e7d96 = _0x1e5ab9(_0x1e7d96 = _0x2bd724(_0x1e7d96 = _0x27c3e6(_0x1e7d96, _0x362ef0 = _0x4a07de(_0x362ef0 = _0x2bd724(_0x362ef0 = _0x4a07de(_0x362ef0, _0x4f4a8d), 33), _0x37b392)), 31), _0x77c4ba), [0, 5]), [0, 944331445]);
        }
        switch (_0x1e2b5d = [0, 0], _0x362ef0 = [0, 0], _0xbdf1bb) {
          case 15:
            _0x362ef0 = _0x27c3e6(_0x362ef0, _0x3a6927([0, _0x2d6019.charCodeAt(_0x5003e2 + 14)], 48));
          case 14:
            _0x362ef0 = _0x27c3e6(_0x362ef0, _0x3a6927([0, _0x2d6019.charCodeAt(_0x5003e2 + 13)], 40));
          case 13:
            _0x362ef0 = _0x27c3e6(_0x362ef0, _0x3a6927([0, _0x2d6019.charCodeAt(_0x5003e2 + 12)], 32));
          case 12:
            _0x362ef0 = _0x27c3e6(_0x362ef0, _0x3a6927([0, _0x2d6019.charCodeAt(_0x5003e2 + 11)], 24));
          case 11:
            _0x362ef0 = _0x27c3e6(_0x362ef0, _0x3a6927([0, _0x2d6019.charCodeAt(_0x5003e2 + 10)], 16));
          case 10:
            _0x362ef0 = _0x27c3e6(_0x362ef0, _0x3a6927([0, _0x2d6019.charCodeAt(_0x5003e2 + 9)], 8));
          case 9:
            _0x1e7d96 = _0x27c3e6(_0x1e7d96, _0x362ef0 = _0x4a07de(_0x362ef0 = _0x2bd724(_0x362ef0 = _0x4a07de(_0x362ef0 = _0x27c3e6(_0x362ef0, [0, _0x2d6019.charCodeAt(_0x5003e2 + 8)]), _0x4f4a8d), 33), _0x37b392));
          case 8:
            _0x1e2b5d = _0x27c3e6(_0x1e2b5d, _0x3a6927([0, _0x2d6019.charCodeAt(_0x5003e2 + 7)], 56));
          case 7:
            _0x1e2b5d = _0x27c3e6(_0x1e2b5d, _0x3a6927([0, _0x2d6019.charCodeAt(_0x5003e2 + 6)], 48));
          case 6:
            _0x1e2b5d = _0x27c3e6(_0x1e2b5d, _0x3a6927([0, _0x2d6019.charCodeAt(_0x5003e2 + 5)], 40));
          case 5:
            _0x1e2b5d = _0x27c3e6(_0x1e2b5d, _0x3a6927([0, _0x2d6019.charCodeAt(_0x5003e2 + 4)], 32));
          case 4:
            _0x1e2b5d = _0x27c3e6(_0x1e2b5d, _0x3a6927([0, _0x2d6019.charCodeAt(_0x5003e2 + 3)], 24));
          case 3:
            _0x1e2b5d = _0x27c3e6(_0x1e2b5d, _0x3a6927([0, _0x2d6019.charCodeAt(_0x5003e2 + 2)], 16));
          case 2:
            _0x1e2b5d = _0x27c3e6(_0x1e2b5d, _0x3a6927([0, _0x2d6019.charCodeAt(_0x5003e2 + 1)], 8));
          case 1:
            _0x77c4ba = _0x27c3e6(_0x77c4ba, _0x1e2b5d = _0x4a07de(_0x1e2b5d = _0x2bd724(_0x1e2b5d = _0x4a07de(_0x1e2b5d = _0x27c3e6(_0x1e2b5d, [0, _0x2d6019.charCodeAt(_0x5003e2)]), _0x37b392), 31), _0x4f4a8d));
        }
        return _0x77c4ba = _0x27c3e6(_0x77c4ba, [0, _0x2d6019.length]), _0x1e7d96 = _0x1e5ab9(_0x1e7d96 = _0x27c3e6(_0x1e7d96, [0, _0x2d6019.length]), _0x77c4ba = _0x1e5ab9(_0x77c4ba, _0x1e7d96)), _0x77c4ba = _0x48e783(_0x77c4ba), _0x1e7d96 = _0x1e5ab9(_0x1e7d96 = _0x48e783(_0x1e7d96), _0x77c4ba = _0x1e5ab9(_0x77c4ba, _0x1e7d96)), ("00000000" + (_0x77c4ba[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (_0x77c4ba[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (_0x1e7d96[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (_0x1e7d96[1] >>> 0).toString(16)).slice(-8);
      }
    };
  }();
  function _0x5ed15a(_0x2e9ede) {
    _0x2e9ede = JSON.stringify(_0x2e9ede);
    _0x2e9ede = encodeURIComponent(_0x2e9ede);
    var _0x34504f = "",
      _0x324561 = 0;
    do {
      var _0x1bba73 = _0x2e9ede.charCodeAt(_0x324561++),
        _0x2e086a = _0x2e9ede.charCodeAt(_0x324561++),
        _0x3c77f6 = _0x2e9ede.charCodeAt(_0x324561++),
        _0x517ebb = _0x1bba73 >> 2;
      _0x1bba73 = (3 & _0x1bba73) << 4 | _0x2e086a >> 4;
      var _0x4fad3a = (15 & _0x2e086a) << 2 | _0x3c77f6 >> 6,
        _0x270b86 = 63 & _0x3c77f6;
      isNaN(_0x2e086a) ? _0x4fad3a = _0x270b86 = 64 : isNaN(_0x3c77f6) && (_0x270b86 = 64);
      _0x34504f = _0x34504f + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(_0x517ebb) + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(_0x1bba73) + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(_0x4fad3a) + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(_0x270b86);
    } while (_0x324561 < _0x2e9ede.length);
    return _0x34504f + "/";
  }
  var _0x140a4b = [$.UA.substring(0, 90), "zh-CN", "applewebkit_chrome", "605.1.15", "NA", "NA", 32, "896x414", -480, "sessionStorageKey", "localStorageKey", "indexedDbKey", "openDatabase", "NA", "iPhone", 10, "NA", "", null, null],
    _0x1c9203 = _0x98265e.hash128(_0x140a4b.join("~~~"), 31),
    _0x2e3ba0 = {
      "pin": "",
      "oid": "",
      "bizId": "jd-babelh5",
      "fc": "",
      "mode": "strict",
      "p": "s",
      "fp": _0x1c9203,
      "ctype": 1,
      "v": "3.2.1.1",
      "f": "3",
      "o": "pro.m.jd.com/mall/active/3Rztcv2tMwdpFqWiqaAUzBAToowC/index.html",
      "qs": "",
      "jsTk": "",
      "qi": ""
    },
    _0x3f586b = _0x5ed15a(_0x2e3ba0),
    _0x102c74 = {},
    _0x140a4b = new Date();
  _0x102c74.ts = {};
  _0x102c74.ts.deviceTime = _0x140a4b.getTime();
  _0x102c74.ca = {
    "tdHash": null
  };
  _0x102c74.m = {
    "compatMode": "CSS1Compat"
  };
  _0x102c74.fo = ["Arial Black", "Bauhaus 93", "Chalkduster", "GungSeo", "Hiragino Sans GB", "Impact", "Menlo", "Papyrus", "Rockwell"];
  _0x102c74.n = {
    "vendorSub": "",
    "productSub": "20030107",
    "vendor": "Apple Computer, Inc.",
    "maxTouchPoints": 1,
    "pdfViewerEnabled": !1,
    "hardwareConcurrency": 10,
    "cookieEnabled": !0,
    "appCodeName": "Mozilla",
    "appName": "Netscape",
    "appVersion": /\/(.+)/g.exec($.UA) && /\/(.+)/g.exec($.UA)[1] || $.UA,
    "platform": "iPhone",
    "product": "Gecko",
    "userAgent": $.UA,
    "language": "zh-CN",
    "onLine": !0,
    "webdriver": !1,
    "javaEnabled": !1,
    "deviceMemory": 8,
    "enumerationOrder": ["vendorSub", "productSub", "vendor", "maxTouchPoints", "scheduling", "userActivation", "doNotTrack", "geolocation", "connection", "plugins", "mimeTypes", "pdfViewerEnabled", "webkitTemporaryStorage", "webkitPersistentStorage", "hardwareConcurrency", "cookieEnabled", "appCodeName", "appName", "appVersion", "platform", "product", "userAgent", "language", "languages", "onLine", "webdriver", "getGamepads", "javaEnabled", "sendBeacon", "vibrate", "bluetooth", "clipboard", "credentials", "keyboard", "managed", "mediaDevices", "storage", "serviceWorker", "virtualKeyboard", "wakeLock", "deviceMemory", "ink", "hid", "locks", "mediaCapabilities", "mediaSession", "permissions", "presentation", "serial", "gpu", "usb", "windowControlsOverlay", "xr", "userAgentData", "clearAppBadge", "getBattery", "getUserMedia", "requestMIDIAccess", "requestMediaKeySystemAccess", "setAppBadge", "webkitGetUserMedia", "getInstalledRelatedApps", "registerProtocolHandler", "unregisterProtocolHandler"]
  };
  _0x102c74.p = [];
  _0x102c74.w = {
    "devicePixelRatio": 1,
    "screenTop": 0,
    "screenLeft": 0
  };
  _0x102c74.s = {
    "availHeight": 896,
    "availWidth": 414,
    "colorDepth": 24,
    "height": 896,
    "width": 414,
    "pixelDepth": 24
  };
  _0x102c74.sc = {
    "ActiveBorder": "rgb(118, 118, 118)",
    "ActiveCaption": "rgb(0, 0, 0)",
    "AppWorkspace": "rgb(255, 255, 255)",
    "Background": "rgb(255, 255, 255)",
    "ButtonFace": "rgb(239, 239, 239)",
    "ButtonHighlight": "rgb(239, 239, 239)",
    "ButtonShadow": "rgb(239, 239, 239)",
    "ButtonText": "rgb(0, 0, 0)",
    "CaptionText": "rgb(0, 0, 0)",
    "GrayText": "rgb(128, 128, 128)",
    "Highlight": "rgb(181, 213, 255)",
    "HighlightText": "rgb(0, 0, 0)",
    "InactiveBorder": "rgb(118, 118, 118)",
    "InactiveCaption": "rgb(255, 255, 255)",
    "InactiveCaptionText": "rgb(128, 128, 128)",
    "InfoBackground": "rgb(255, 255, 255)",
    "InfoText": "rgb(0, 0, 0)",
    "Menu": "rgb(255, 255, 255)",
    "MenuText": "rgb(0, 0, 0)",
    "Scrollbar": "rgb(255, 255, 255)",
    "ThreeDDarkShadow": "rgb(118, 118, 118)",
    "ThreeDFace": "rgb(239, 239, 239)",
    "ThreeDHighlight": "rgb(118, 118, 118)",
    "ThreeDLightShadow": "rgb(118, 118, 118)",
    "ThreeDShadow": "rgb(118, 118, 118)",
    "Window": "rgb(255, 255, 255)",
    "WindowFrame": "rgb(118, 118, 118)",
    "WindowText": "rgb(0, 0, 0)"
  };
  _0x102c74.ss = {
    "cookie": !0,
    "localStorage": !0,
    "sessionStorage": !0,
    "globalStorage": !1,
    "indexedDB": !0
  };
  _0x102c74.tz = -480;
  _0x102c74.lil = "";
  _0x102c74.wil = "";
  _0x102c74.ts.deviceEndTime = new Date().getTime();
  var _0x322736 = _0x5ed15a(_0x102c74);
  const _0x1ac3e8 = {
    "url": "https://gia.jd.com/jsTk.do?a=" + _0x3f586b,
    "body": "d=" + _0x322736,
    "headers": {
      "Accept": "*/*",
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      "Origin": "https://pro.m.jd.com",
      "Referer": "https://pro.m.jd.com/",
      "User-Agent": $.UA
    }
  };
  return new Promise(_0x27e82b => {
    $.dpost(_0x1ac3e8, async (_0x5bf5fc, _0x37f53d, _0x3ae56d) => {
      try {
        if (_0x5bf5fc) console.log(_0x5bf5fc);else {
          let _0x68f90e = $.toObj(_0x3ae56d, _0x3ae56d);
          _0x68f90e && typeof _0x68f90e === "object" && _0x68f90e.code == 0 && _0x68f90e.data && _0x68f90e.data.token ? $.eid_token = _0x68f90e.data.token : console.log(_0x3ae56d);
        }
      } catch (_0xdbb10) {
        $.logErr(_0xdbb10, _0x37f53d);
      } finally {
        _0x27e82b();
      }
    });
  });
}
function _0x3191dd(_0x35b0d1, _0x5143b5, _0x405495 = "") {
  class _0x81796 {
    constructor(_0x52ac6b = "", _0x9bc73 = "", _0x57d683 = "") {
      this.appId = _0x52ac6b;
      this.v = "4.3";
      _0x9bc73 ? this.ua = _0x9bc73 : this.ua = this.__genUA();
      this.fp = _0x57d683 ? _0x57d683 : this.__genFp();
    }
    ["__format"](_0x41a0cc, _0x12f853) {
      if (!_0x41a0cc) _0x41a0cc = "yyyy-MM-dd";
      var _0x5bdf9e;
      !_0x12f853 ? _0x5bdf9e = Date.now() : _0x5bdf9e = new Date(_0x12f853);
      var _0x184709 = new Date(_0x5bdf9e),
        _0x51f8bb = _0x41a0cc,
        _0x3f989c = {
          "M+": _0x184709.getMonth() + 1,
          "d+": _0x184709.getDate(),
          "D+": _0x184709.getDate(),
          "h+": _0x184709.getHours(),
          "H+": _0x184709.getHours(),
          "m+": _0x184709.getMinutes(),
          "s+": _0x184709.getSeconds(),
          "w+": _0x184709.getDay(),
          "q+": Math.floor((_0x184709.getMonth() + 3) / 3),
          "S+": _0x184709.getMilliseconds()
        };
      return /(y+)/i.test(_0x51f8bb) && (_0x51f8bb = _0x51f8bb.replace(RegExp.$1, "".concat(_0x184709.getFullYear()).substr(4 - RegExp.$1.length))), Object.keys(_0x3f989c).forEach(_0x4ad96d => {
        if (new RegExp("(".concat(_0x4ad96d, ")")).test(_0x51f8bb)) {
          var _0x445b09 = "S+" === _0x4ad96d ? "000" : "00";
          _0x51f8bb = _0x51f8bb.replace(RegExp.$1, 1 == RegExp.$1.length ? _0x3f989c[_0x4ad96d] : "".concat(_0x445b09).concat(_0x3f989c[_0x4ad96d]).substr("".concat(_0x3f989c[_0x4ad96d]).length));
        }
      }), _0x51f8bb;
    }
    ["__genUA"]() {
      this.uid = $.CryptoJS.SHA1($.UserName + "red").toString();
      let _0x5d42f7 = this.uid,
        _0x40eabb = ["14.3"],
        _0x2609e9 = _0x40eabb[Math.floor(Math.random() * _0x40eabb.length)],
        _0x23b9e2 = ["12,1"],
        _0x5dc22e = _0x23b9e2[Math.floor(Math.random() * _0x23b9e2.length)],
        _0x13db60 = ["wifi"],
        _0x3e80ca = _0x13db60[Math.floor(Math.random() * _0x13db60.length)],
        _0x36dc5a = _0x2609e9.replace(/\./g, "_"),
        _0x353948 = [];
      _0x353948 = [["10.1.4", "167814"]];
      let _0x4124b6 = Math.floor(Math.random() * _0x353948.length),
        _0x2103f7 = _0x353948[_0x4124b6] ? _0x353948[_0x4124b6] : _0x353948[0];
      _0x5dc22e = "iPhone" + _0x5dc22e;
      let _0x2ba76c = "";
      return _0x2ba76c = "jdapp;iPhone;" + _0x2103f7[0] + ";" + _0x2609e9 + ";" + _0x5d42f7 + ";network/" + _0x3e80ca + ";model/" + _0x5dc22e + ";addressid/;appBuild/" + _0x2103f7[1] + ";jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS " + _0x36dc5a + " like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1", _0x2ba76c;
    }
    ["__genFp"]() {
      function _0x344897(_0x39785c, _0x29259a) {
        var _0x2ab4d4 = [],
          _0x5722a7 = _0x39785c.length,
          _0x36ce9d = _0x39785c.split(""),
          _0x25b304 = "";
        for (; _0x25b304 = _0x36ce9d.shift();) {
          if (Math.random() * _0x5722a7 < _0x29259a) {
            _0x2ab4d4.push(_0x25b304);
            if (--_0x29259a == 0) break;
          }
          _0x5722a7--;
        }
        for (var _0x12a076 = "", _0xf10262 = 0; _0xf10262 < _0x2ab4d4.length; _0xf10262++) {
          var _0x4dbcdc = Math.random() * (_0x2ab4d4.length - _0xf10262) | 0;
          _0x12a076 += _0x2ab4d4[_0x4dbcdc];
          _0x2ab4d4[_0x4dbcdc] = _0x2ab4d4[_0x2ab4d4.length - _0xf10262 - 1];
        }
        return _0x12a076;
      }
      function _0x5b368a(_0x529e5c, _0xfd326a) {
        for (let _0x126394 of _0xfd326a.slice()) _0x529e5c = _0x529e5c.replace(_0x126394, "");
        return _0x529e5c;
      }
      var _0x49e3ec = "kl9i1uct6d",
        _0x5ce40e = _0x344897(_0x49e3ec, 3),
        _0xd8e8e = Math.random() * 10 | 0,
        _0x183b27 = _0x5b368a(_0x49e3ec, _0x5ce40e),
        _0x5e6085 = {};
      _0x5e6085.size = _0xd8e8e;
      _0x5e6085.customDict = _0x183b27;
      var _0x12f810 = this.getRandomIDPro(_0x5e6085) + _0x5ce40e + this.getRandomIDPro({
          "size": 13 - _0xd8e8e - 1,
          "customDict": _0x183b27
        }) + _0xd8e8e,
        _0x49a4fe = _0x12f810.split("");
      let _0xacd0c0 = _0x49a4fe.slice(0, 10),
        _0x4d0e7b = _0x49a4fe.slice(10),
        _0x5f039f = [];
      for (; _0xacd0c0.length > 0;) _0x5f039f.push((35 - parseInt(_0xacd0c0.pop(), 36)).toString(36));
      _0x5f039f = _0x5f039f.concat(_0x4d0e7b);
      var _0x5b9628 = _0x5f039f.join("");
      return _0x5b9628;
    }
    ["getRandomIDPro"]() {
      var _0x2a55b3,
        _0x5a8309,
        _0x401c1c = void 0 === (_0xb48e5c = (_0x5a8309 = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}).size) ? 10 : _0xb48e5c,
        _0xb48e5c = void 0 === (_0xb48e5c = _0x5a8309.dictType) ? "number" : _0xb48e5c,
        _0x24ef58 = "";
      if ((_0x5a8309 = _0x5a8309.customDict) && "string" == typeof _0x5a8309) _0x2a55b3 = _0x5a8309;else switch (_0xb48e5c) {
        case "alphabet":
          _0x2a55b3 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
          break;
        case "max":
          _0x2a55b3 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";
          break;
        case "number":
        default:
          _0x2a55b3 = "0123456789";
      }
      for (; _0x401c1c--;) _0x24ef58 += _0x2a55b3[Math.random() * _0x2a55b3.length | 0];
      return _0x24ef58;
    }
    ["Encrypt"](_0x10cc33, _0x33f60c) {
      let _0x3df116 = $.CryptoJS.AES.encrypt(_0x10cc33, $.CryptoJS.enc.Utf8.parse(_0x33f60c.key), {
        "iv": $.CryptoJS.enc.Utf8.parse(_0x33f60c.iv),
        "mode": $.CryptoJS.mode.CBC,
        "padding": $.CryptoJS.pad.Pkcs7
      });
      return _0x3df116.ciphertext.toString();
    }
    async ["__genAlgo"]() {
      let _0x22da09 = {
          "wc": 0,
          "wd": 0,
          "l": "zh-cn",
          "ls": "zh-cn",
          "ml": 0,
          "pl": 0,
          "av": /\/(.+)/g.exec(this.ua) && /\/(.+)/g.exec(this.ua)[1] || this.ua,
          "ua": this.ua,
          "sua": /\((i[^;]+;( U;)? CPU.+Mac OS X)/g.exec(this.ua) && /\((i[^;]+;( U;)? CPU.+Mac OS X)/g.exec(this.ua)[1] || /\((M[^;]+;( U;)? Intel.+Mac OS X [0-9_]+)/g.exec(this.ua) && /\((M[^;]+;( U;)? Intel.+Mac OS X [0-9_]+)/g.exec(this.ua)[1] || "",
          "pp": {},
          "extend": {
            "wd": 0,
            "l": 0,
            "ls": 0,
            "wk": 0,
            "bu1": "0.1.7",
            "bu2": 0,
            "bu3": 0
          },
          "pp1": "",
          "w": 393,
          "h": 873,
          "ow": 393,
          "oh": 779,
          "url": "https://pro.m.jd.com/mall/active/3Rztcv2tMwdpFqWiqaAUzBAToowC/index.html?unionActId=31177&d=&s=&cu=true&utm_source=kong&utm_medium=jingfen",
          "og": "https://pro.m.jd.com",
          "pr": 3,
          "re": "https://u.jd.com/",
          "ai": this.appId,
          "fp": this.fp
        },
        _0x2013d4 = JSON.stringify(_0x22da09, null, 2),
        _0xc72165 = this.Encrypt(_0x2013d4, {
          "key": "wm0!@w-s#ll1flo(",
          "iv": "0102030405060708"
        });
      var _0xfdf0e7 = {
        "version": this.v,
        "fp": this.fp,
        "appId": this.appId.toString(),
        "timestamp": Date.now(),
        "platform": "web",
        "expandParams": _0xc72165 || ""
      };
      return new Promise(_0x453903 => {
        let _0x57454f = {
          "url": "https://cactus.jd.com/request_algo?g_ty=ajax",
          "body": JSON.stringify(_0xfdf0e7),
          "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-cn",
            "Origin": "https://pro.m.jd.com",
            "Referer": "https://pro.m.jd.com/",
            "user-agent": this.ua
          },
          "timeout": 30000
        };
        $.dpost(_0x57454f, async (_0x11e024, _0x410109, _0x55ce8f) => {
          try {
            if (_0x11e024) console.log(_0x11e024);else {
              let _0x126003 = $.toObj(_0x55ce8f, _0x55ce8f);
              _0x126003 && typeof _0x126003 === "object" && _0x126003.data && _0x126003.data.result && _0x126003.data.result.tk && (this.tk = _0x126003.data.result.tk, this.genKey = new Function("return " + _0x126003.data.result.algo)());
            }
          } catch (_0x2d19b7) {
            $.logErr(_0x2d19b7, _0x410109);
          } finally {
            _0x453903();
          }
        });
      });
    }
    ["__genH5st"](_0x33834a = {}, _0x46674b = "") {
      let _0x213d61 = undefined,
        _0x25747b = {
          "ua": this.ua,
          "uid": this.uid
        };
      if (this.tk && this.genKey) {
        this.time = Date.now();
        this.timestamp = this.__format("yyyyMMddhhmmssSSS", this.time);
        let _0x460a82 = this.genKey(this.tk, this.fp.toString(), this.timestamp.toString(), this.appId.toString(), $.CryptoJS).toString();
        var _0x5e930f = {},
          _0x317be2 = null;
        _0x317be2 = Object.keys(_0x33834a).sort().map(function (_0x49cafb) {
          var _0x12d540 = {};
          return _0x12d540.key = _0x49cafb, _0x12d540.value = _0x33834a[_0x49cafb], _0x12d540;
        }).filter(function (_0x18b161) {
          var _0x2b72f0 = _0x18b161.value,
            _0x2790c8 = "number" == typeof _0x2b72f0 && !isNaN(_0x2b72f0) || "string" == typeof _0x2b72f0 || "boolean" == typeof _0x2b72f0 || "body" == _0x18b161.key;
          if (_0x2790c8) {
            if ("body" == _0x18b161.key && typeof _0x18b161.value == "object") _0x18b161.value = JSON.stringify(_0x18b161.value);
            _0x5e930f[_0x18b161.key] = _0x18b161.value;
          }
          return _0x2790c8;
        });
        _0x33834a = _0x5e930f;
        let _0x5a0f23 = "";
        _0x5a0f23 = Object.keys(_0x33834a).map(function (_0x41a1a0) {
          return _0x41a1a0 + ":" + (_0x41a1a0 == "body" && _0x33834a[_0x41a1a0].length !== 64 && _0x33834a[_0x41a1a0].slice(0, 1) == "{" ? $.CryptoJS.SHA256(_0x33834a[_0x41a1a0]).toString($.CryptoJS.enc.Hex) : _0x33834a[_0x41a1a0]);
        }).join("&");
        _0x5a0f23 = $.CryptoJS.HmacSHA256(_0x5a0f23, _0x460a82).toString($.CryptoJS.enc.Hex);
        let _0x53a58d = {
          "sua": /\((i[^;]+;( U;)? CPU.+Mac OS X)/g.exec(this.ua) && /\((i[^;]+;( U;)? CPU.+Mac OS X)/g.exec(this.ua)[1] || /\((M[^;]+;( U;)? Intel.+Mac OS X [0-9_]+)/g.exec(this.ua) && /\((M[^;]+;( U;)? Intel.+Mac OS X [0-9_]+)/g.exec(this.ua)[1] || "",
          "pp": {}
        };
        _0x46674b && (_0x53a58d.pp.p1 = _0x46674b);
        _0x53a58d.fp = this.fp;
        let _0x35907f = JSON.stringify(_0x53a58d, null, 2),
          _0x2b9744 = this.Encrypt(_0x35907f, {
            "key": "&d74&yWoV.EYbWbZ",
            "iv": "0102030405060708"
          });
        _0x213d61 = [this.timestamp, this.fp, this.appId.toString(), this.tk, _0x5a0f23, this.v, this.time.toString(), _0x2b9744].join(";");
        _0x25747b.t = _0x33834a.t;
      }
      return _0x25747b.h5st = _0x213d61, _0x25747b;
    }
  }
  _0x298dd7 = new _0x81796(_0x35b0d1, _0x5143b5, _0x405495);
}
function _0x54cda4() {
  class _0x167347 {
    constructor() {
      this.UVCookie = "";
      this.ltr = 0;
      this.mr = [1, 0];
      this.document = {
        "cookie": "",
        "cookies": "__jdc=123;",
        "domain": "prodev.m.jd.com",
        "referrer": "https://u.jd.com/",
        "location": {
          "href": "https://pro.m.jd.com/mall/active/3Rztcv2tMwdpFqWiqaAUzBAToowC/index.html",
          "hrefs": "https://pro.m.jd.com/mall/active/3Rztcv2tMwdpFqWiqaAUzBAToowC/index.html"
        }
      };
      this.navigator = {
        "userAgent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1",
        "userAgents": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1"
      };
      this.window = {};
    }
    ["getUVCookie"](_0xb4d80a = "", _0x584276 = "", _0x22428f = "", _0x5ba5d4 = "") {
      try {
        this.document.location.href = this.document.location.hrefs + "";
        this.document.cookie = this.document.cookies + "";
        if (_0x22428f) this.document.location.href = _0x22428f;
        if (_0x5ba5d4) this.document.cookie = _0x5ba5d4;
        this.UVCookie = "";
        this.navigator.userAgent = this.navigator.userAgents + "";
        this.ltr = 1011 + Math.round(31 * Math.random());
        if (_0xb4d80a) this.navigator.userAgent = _0xb4d80a;
        return this.lr = {
          "ckJda": "__jda",
          "ckJdb": "__jdb",
          "ckJdv": "__jdv",
          "ckJdc": "__jdc",
          "refUrl": "https://u.jd.com/"
        }, this.q(), this.s(_0x584276), this.UVCookie;
      } catch (_0x47d753) {
        console.log(_0x47d753);
      }
    }
    ["s"](_0x38002b = "") {
      var _0x15d92f,
        _0x21b71f,
        _0x179203,
        _0x3a02e6,
        _0x3a42d0 = (this.getCookie(this.lr.ckJda) || "").split("."),
        _0x54841f = (this.getCookie(this.lr.ckJdb) || "").split("."),
        _0x802f69 = (this.getCookie(this.lr.ckJdv) || "").split("|"),
        _0x1445f8 = this.getCookie(this.lr.ckJdc) || "",
        _0x4c0ec7 = parseInt((new Date().getTime() - this.ltr) / 1000),
        _0x2844f3 = 0,
        _0x582b3a = 1,
        _0x5187f5 = "direct",
        _0x26fc22 = "-",
        _0x3900e8 = "none",
        _0x2469ed = "-";
      if (_0x3a42d0.length > 3) for (var _0xb150c4 = 2; _0xb150c4 < 5 && _0xb150c4 < _0x3a42d0.length; _0xb150c4++) {
        var _0x470a41 = _0x3a42d0[_0xb150c4];
        _0x470a41.length > 10 && (_0x3a42d0[_0xb150c4] = _0x470a41.substr(0, 10));
      }
      _0x3a42d0.length > 5 ? (_0x179203 = _0x3a42d0[0], _0x3a02e6 = _0x3a42d0[1], _0x15d92f = parseInt(_0x3a42d0[2], 10), _0x21b71f = parseInt(_0x3a42d0[3], 10), _0x4c0ec7 = parseInt(_0x3a42d0[4], 10), _0x582b3a = parseInt(_0x3a42d0[5], 10) || _0x582b3a) : (_0x3a02e6 = this.genUuid(), _0x15d92f = _0x4c0ec7, _0x21b71f = _0x4c0ec7);
      this.lr.uuid = _0x3a02e6;
      _0x54841f.length > 3 && (_0x179203 || (_0x179203 = _0x54841f[0]), _0x2844f3 = parseInt(_0x54841f[1], 10) || 0);
      _0x802f69.length > 4 && (_0x179203 || (_0x179203 = _0x802f69[0]), _0x5187f5 = _0x802f69[1], _0x26fc22 = _0x802f69[2], _0x3900e8 = _0x802f69[3], _0x2469ed = _0x802f69[4]);
      _0x1445f8 && "" !== _0x1445f8 && (_0x179203 || (_0x179203 = _0x1445f8));
      var _0x404c4c,
        _0x179878 = [],
        _0x37f49c = _0x54841f.length < 4,
        _0x3a84a9 = this.getParameter("utm_source"),
        _0x533ad8 = false;
      if (_0x3a84a9) {
        var _0x7d0471 = this.getParameter("utm_campaign"),
          _0x1a4c95 = this.getParameter("utm_medium"),
          _0x4e0fe7 = this.getParameter("utm_term");
        _0x179878.push(_0x3a84a9 || _0x5187f5);
        _0x179878.push(_0x7d0471 || _0x26fc22);
        _0x179878.push(_0x1a4c95 || _0x3900e8);
        _0x179878.push(_0x4e0fe7 || _0x2469ed);
        _0x2469ed = _0x179878[3];
        _0x533ad8 = !0;
      } else {
        var _0x58d028,
          _0x18bd91 = this.lr.refUrl && this.lr.refUrl.split("/")[2],
          _0x10d81b = false;
        if (_0x18bd91 && _0x18bd91.indexOf(this.lr.ckDomain) < 0) {
          for (_0x58d028 = this.lr.seo, _0xb150c4 = 0; _0xb150c4 < _0x58d028.length; _0xb150c4++) {
            var _0x46e559 = _0x58d028[_0xb150c4].split(":");
            if (_0x18bd91.indexOf(_0x46e559[0].toLowerCase()) > -1 && this.lr.refUrl.indexOf((_0x46e559[1] + "=").toLowerCase()) > -1) {
              var _0x272060 = this.getParameter(_0x46e559[1], this.lr.refUrl);
              /[^\x00-\xff]/.test(_0x272060) && (_0x272060 = encodeURIComponent(_0x272060));
              _0x179878.push(_0x46e559[0]);
              _0x179878.push("-");
              _0x179878.push("organic");
              _0x179878.push(_0x272060 || "not set");
              _0x2469ed = _0x179878[3];
              _0x10d81b = !0;
              break;
            }
          }
          _0x10d81b || (_0x18bd91.indexOf("zol.com.cn") > -1 ? (_0x179878.push("zol.com.cn"), _0x179878.push("-"), _0x179878.push("cpc"), _0x179878.push("not set")) : (_0x179878.push(_0x18bd91), _0x179878.push("-"), _0x179878.push("referral"), _0x179878.push("-")));
        }
      }
      _0x404c4c = _0x179878.length > 0 && (_0x179878[0] !== _0x5187f5 || _0x179878[1] !== _0x26fc22 || _0x179878[2] !== _0x3900e8) && "referral" !== _0x179878[2];
      _0x37f49c || !_0x37f49c && _0x404c4c ? (_0x5187f5 = _0x179878[0] || _0x5187f5, _0x26fc22 = _0x179878[1] || _0x26fc22, _0x3900e8 = _0x179878[2] || _0x3900e8, _0x2469ed = _0x179878[3] || _0x2469ed, _0x3a42d0.length > 5 ? (_0x15d92f = parseInt(_0x3a42d0[2], 10), _0x21b71f = parseInt(_0x3a42d0[4], 10), _0x4c0ec7 = parseInt((new Date().getTime() - this.ltr) / 1000), _0x582b3a++, _0x2844f3 = 1) : (_0x582b3a = 1, _0x2844f3 = 1)) : _0x2844f3++;
      var _0x1caaee = this.getPageParamFromSdk();
      if (_0x1caaee && _0x1caaee.vts) {
        var _0x20b26d = 1 * _0x1caaee.vts,
          _0x5e3de4 = 1 * _0x1caaee.seq;
        (_0x20b26d > _0x582b3a || _0x20b26d === _0x582b3a && _0x5e3de4 >= _0x2844f3) && (_0x582b3a = _0x20b26d, _0x2844f3 = _0x5e3de4 + 1);
      }
      if (_0x179203 || (_0x179203 = this.genHash(this.lr.ckDomain)), this.setCookie(this.lr.ckJda, [_0x179203, _0x3a02e6, _0x15d92f, _0x21b71f, _0x4c0ec7, _0x582b3a || 1].join("."), this.lr.ckDomain, this.lr.ckJdaExp), this.setCookie(this.lr.ckJdb, [_0x179203, _0x2844f3, _0x3a02e6 + "|" + _0x582b3a, _0x4c0ec7].join("."), this.lr.ckDomain, this.lr.ckJdbExp), _0x533ad8 || _0x404c4c || _0x802f69.length < 5) {
        var _0x4910ad = [_0x179203, _0x5187f5 || "direct", _0x26fc22 || "-", _0x3900e8 || "none", _0x2469ed || "-", new Date().getTime() - this.ltr].join("|");
        this.setJdv(_0x4910ad = encodeURIComponent(_0x4910ad), _0x179203);
      }
      this.setCookie(this.lr.ckJdc, _0x179203, this.lr.ckDomain);
    }
    ["q"]() {
      this.lr.rpDomain = this.lr.rpDomain || "uranus.jd.com";
      this.lr.logUrl = "//" + this.lr.rpDomain + "/log/m";
      this.lr.logType = {
        "pv": "1",
        "pf": "2",
        "cl": "3",
        "od": "4",
        "pd": "5",
        "hm": "6",
        "magic": "000001"
      };
      this.lr.useTmpCookie ? (this.lr.ckJda = "__tra", this.lr.ckJdb = "__trb", this.lr.ckJdc = "__trc", this.lr.ckJdu = "__tru") : (this.lr.ckJda = "__jda", this.lr.ckJdb = "__jdb", this.lr.ckJdc = "__jdc", this.lr.ckJdu = "__jdu");
      this.lr.ckJdv = "__jdv";
      this.lr.ckWxAppCk = "__jdwxapp";
      this.lr.ckRefCls = "__jd_ref_cls";
      this.lr.ckJdaExp = 15552000000;
      this.lr.ckJdbExp = 1800000;
      this.lr.ckJduExp = 15552000000;
      this.lr.ckJdvExp = 1296000000;
      this.lr.ckJdvEmbeddedExp = 86400000;
      this.lr.ckWxAppCkExp = 15552000000;
      this.lr.mtSubsiteExp = 31536000000;
      this.lr.ckDomain = (this.document.domain.match(/[^.]+\.(com.cn|net.cn|org.cn|gov.cn|edu.cn)$/) || [""])[0] || this.document.domain.replace(/.*?([^.]+\.[^.]+)$/, "$1");
      this.lr.title = this.document.title;
      this.lr.refUrl = this.document.referrer;
      this.lr.seo = ["i.easou.com:q", "m.baidu.com:word", "m.sm.cn:q", "m.so.com:q", "wap.sogou.com:keyword", "m.sogou.com:keyword", "wap.sogo.com:keyword", "m.sogo.com:keyword", "page.roboo.com:q", "ask.com:q", "baidu:word", "baidu:wd", "bing:q", "easou:q", "google:q", "roboo:word", "roboo:q", "sm.cn:q", "so.com:q", "sogou:keyword", "sogou:query", "sogo.com:keyword", "sogo.com:query", "yahoo:p", "yandex:text", "yicha:key"];
    }
    ["setCookie"](_0x5c67b5, _0x1898ae, _0x27d515, _0x240124) {
      if (_0x5c67b5) {
        var _0x43ce0d = "";
        if (_0x240124) {
          var _0x104a6f = new Date();
          _0x104a6f.setTime(_0x104a6f.getTime() - this.ltr + _0x240124);
          _0x43ce0d = ";expires=" + _0x104a6f.toGMTString();
        }
        this.UVCookie += _0x5c67b5 + "=" + _0x1898ae + "; ";
      }
    }
    ["setJdv"](_0x582cf7, _0x1482d7, _0x539599) {
      var _0x59a9d4 = "";
      _0x59a9d4 = this.isPrey(10) && (!_0x582cf7 || _0x582cf7.length > 400) ? _0x1482d7 + "|direct|-|none|-|" + (new Date().getTime() - this.ltr) : _0x582cf7;
      var _0x39bd46 = _0x539599 || this.isEmbedded() ? this.lr.ckJdvEmbeddedExp : this.lr.ckJdvExp;
      this.setCookie(this.lr.ckJdv || "__jdv", _0x59a9d4, this.lr.ckDomain, _0x39bd46);
    }
    ["getCookie"](_0x776030, _0x1a5f01) {
      var _0x412de0 = this.document.cookie.match(new RegExp("(^| )" + _0x776030 + "=([^;]*)(;|$)"));
      return null !== _0x412de0 ? _0x1a5f01 ? _0x412de0[2] : this.urlDecode(_0x412de0[2]) : "";
    }
    ["genUuid"]() {
      return new Date().getTime() - this.ltr + "" + parseInt(2147483647 * Math.random());
    }
    ["getParameter"](_0x708695, _0x5c2ba4) {
      var _0x16c389 = _0x5c2ba4 || this.document.location.href,
        _0x1e4b4b = new RegExp("(?:^|&|[?]|[/])" + _0x708695 + "=([^&]*)").exec(_0x16c389);
      return _0x1e4b4b ? this.urlDecode(_0x1e4b4b[1]) : null;
    }
    ["urlDecode"](_0x5178d4) {
      try {
        return decodeURIComponent(_0x5178d4);
      } catch (_0x135d33) {
        return _0x5178d4;
      }
    }
    ["genHash"](_0x58c5bb) {
      var _0x2caa6e,
        _0x18edce = 1,
        _0x185144 = 0;
      if (_0x58c5bb) for (_0x18edce = 0, _0x2caa6e = _0x58c5bb.length - 1; _0x2caa6e >= 0; _0x2caa6e--) {
        _0x18edce = 0 !== (_0x185144 = 266338304 & (_0x18edce = (_0x18edce << 6 & 268435455) + (_0x185144 = _0x58c5bb.charCodeAt(_0x2caa6e)) + (_0x185144 << 14))) ? _0x18edce ^ _0x185144 >> 21 : _0x18edce;
      }
      return _0x18edce;
    }
    ["isPrey"](_0x2aa143) {
      if (_0x2aa143 >= 100) return !0;
      var _0x21aea7 = this.lr.uuid,
        _0x42370c = _0x21aea7.substr(_0x21aea7.length - 2);
      return !!_0x42370c && 1 * _0x42370c < _0x2aa143;
    }
    ["isEmbedded"]() {
      var _0x32faf4 = this.navigator.userAgent || "";
      return /^(jdapp|jdltapp|jdpingou);/.test(_0x32faf4) || this.isJdLog();
    }
    ["isJdLog"]() {
      return (this.navigator.userAgent || "").indexOf(";jdlog;") > -1;
    }
    ["getPageParamFromSdk"]() {
      var _0x353b2a, _0x107340;
      try {
        this.window.JDMAUnifyBridge && this.window.JDMAUnifyBridge.JDMAGetMPageParam ? _0x107340 = JDMAUnifyBridge.JDMAGetMPageParam() : this.window.JDMAGetMPageParam ? _0x107340 = JDMAGetMPageParam() : this.window.webkit && this.window.webkit.messageHandlers && this.window.webkit.messageHandlers.JDMASetMPageParam && (_0x107340 = this.window.prompt("JDMAGetMPageParam", ""));
        _0x107340 && (_0x353b2a = JSON.parse(_0x107340));
      } catch (_0x2ea1df) {}
      return _0x353b2a;
    }
    ["time"](_0x7eb262, _0x4c4097 = null) {
      const _0x4ed930 = _0x4c4097 ? new Date(_0x4c4097) : new Date();
      let _0x3f3e7b = {
        "M+": _0x4ed930.getMonth() + 1,
        "d+": _0x4ed930.getDate(),
        "H+": _0x4ed930.getHours(),
        "m+": _0x4ed930.getMinutes(),
        "s+": _0x4ed930.getSeconds(),
        "q+": Math.floor((_0x4ed930.getMonth() + 3) / 3),
        "S": _0x4ed930.getMilliseconds()
      };
      /(y+)/.test(_0x7eb262) && (_0x7eb262 = _0x7eb262.replace(RegExp.$1, (_0x4ed930.getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (let _0x2a004a in _0x3f3e7b) new RegExp("(" + _0x2a004a + ")").test(_0x7eb262) && (_0x7eb262 = _0x7eb262.replace(RegExp.$1, 1 == RegExp.$1.length ? _0x3f3e7b[_0x2a004a] : ("00" + _0x3f3e7b[_0x2a004a]).substr(("" + _0x3f3e7b[_0x2a004a]).length)));
      return _0x7eb262;
    }
  }
  _0x490f4a = new _0x167347();
}
function _0x30472e() {
  let _0x330d95 = {
      "url": "https://src-dy-server-dmujhfwxmu.cn-hangzhou.fcapp.run/11red",
      "timeout": 10000
    },
    _0x222d24 = [];
  return new Promise(_0x567b6f => {
    $.get(_0x330d95, async (_0x33dcc0, _0x41cc41, _0x4a324e) => {
      try {
        if (_0x33dcc0) {} else {
          if (_0x4a324e) {
            _0x4a324e = JSON.parse(_0x4a324e);
            if (_0x4a324e.code === 200) _0x222d24 = _0x4a324e.data;else {}
          }
        }
      } catch (_0x2259fb) {
        $.logErr(_0x2259fb, _0x41cc41);
      } finally {
        _0x567b6f(_0x222d24);
      }
    });
  });
}
function _0x199ec4(_0x3c56ae) {
  if (typeof _0x3c56ae == "string") try {
    return JSON.parse(_0x3c56ae);
  } catch (_0x480adc) {
    return console.log(_0x480adc), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
function _0x52464c(_0x457153) {
  _0x457153 = _0x457153 || 32;
  let _0x18c991 = "abcdef0123456789",
    _0x49b0ed = _0x18c991.length,
    _0x4fba13 = "";
  for (i = 0; i < _0x457153; i++) _0x4fba13 += _0x18c991.charAt(Math.floor(Math.random() * _0x49b0ed));
  return _0x4fba13;
}
function Env(o,t){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((r,i)=>{s.call(this,t,(t,e,s)=>{t?i(t):r(e)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.logLevels={debug:0,info:1,warn:2,error:3},this.logLevelPrefixs={debug:"[DEBUG] ",info:"[INFO] ",warn:"[WARN] ",error:"[ERROR] "},this.logLevel="info",this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}getEnv(){return"undefined"!=typeof $environment&&$environment["surge-version"]?"Surge":"undefined"!=typeof $environment&&$environment["stash-version"]?"Stash":"undefined"!=typeof module&&module.exports?"Node.js":"undefined"!=typeof $task?"Quantumult X":"undefined"!=typeof $loon?"Loon":"undefined"!=typeof $rocket?"Shadowrocket":void 0}isNode(){return"Node.js"===this.getEnv()}isQuanX(){return"Quantumult X"===this.getEnv()}isSurge(){return"Surge"===this.getEnv()}isLoon(){return"Loon"===this.getEnv()}isShadowrocket(){return"Shadowrocket"===this.getEnv()}isStash(){return"Stash"===this.getEnv()}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null,...s){try{return JSON.stringify(t,...s)}catch{return e}}getjson(t,e){let s=e;if(this.getdata(t))try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(r=>{this.get({url:t},(t,e,s)=>r(s))})}runScript(a,o){return new Promise(r=>{let t=this.getdata("@chavy_boxjs_userCfgs.httpapi");t=t&&t.replace(/\n/g,"").trim();var e=(e=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"))?+e:20,[s,i]=(e=o&&o.timeout?o.timeout:e,t.split("@"));this.post({url:`http://${i}/v1/scripting/evaluate`,body:{script_text:a,mock_type:"cron",timeout:e},headers:{"X-Key":s,Accept:"*/*"},timeout:e},(t,e,s)=>r(s))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};this.fs=this.fs||require("fs"),this.path=this.path||require("path");var t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),r=!s&&this.fs.existsSync(e);if(!s&&!r)return{};r=s?t:e;try{return JSON.parse(this.fs.readFileSync(r))}catch(t){return{}}}writedata(){var t,e,s,r,i;this.isNode()&&(this.fs=this.fs||require("fs"),this.path=this.path||require("path"),t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),r=!(s=this.fs.existsSync(t))&&this.fs.existsSync(e),i=JSON.stringify(this.data),!s&&r?this.fs.writeFileSync(e,i):this.fs.writeFileSync(t,i))}lodash_get(t,e,s){let r=t;for(const t of e.replace(/\[(\d+)\]/g,".$1").split("."))if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,r,e){return Object(t)===t&&((r=Array.isArray(r)?r:r.toString().match(/[^.[\]]+/g)||[]).slice(0,-1).reduce((t,e,s)=>Object(t[e])===t[e]?t[e]:t[e]=Math.abs(r[s+1])>>0==+r[s+1]?[]:{},t)[r[r.length-1]]=e),t}getdata(t){let e=this.getval(t);if(/^@/.test(t)){var[,s,r]=/^@(.*?)\.(.*?)$/.exec(t);if(s=s?this.getval(s):"")try{const t=JSON.parse(s);e=t?this.lodash_get(t,r,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){var[,r,i]=/^@(.*?)\.(.*?)$/.exec(e),a=this.getval(r),a=r?"null"===a?null:a||"{}":"{}";try{const e=JSON.parse(a);this.lodash_set(e,i,t),s=this.setval(JSON.stringify(e),r)}catch(e){this.lodash_set(a={},i,t),s=this.setval(JSON.stringify(a),r)}}else s=this.setval(t,e);return s}getval(t){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":return $persistentStore.read(t);case"Quantumult X":return $prefs.valueForKey(t);case"Node.js":return this.data=this.loaddata(),this.data[t];default:return this.data&&this.data[t]||null}}setval(t,e){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":return $persistentStore.write(t,e);case"Quantumult X":return $prefs.setValueForKey(t,e);case"Node.js":return this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0;default:return this.data&&this.data[e]||null}}initGotEnv(t){this.got=this.got||require("got"),this.cktough=this.cktough||require("tough-cookie"),this.ckjar=this.ckjar||new this.cktough.CookieJar,t&&(t.headers=t.headers||{},t)&&(t.headers=t.headers||{},void 0===t.headers.cookie)&&void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar)}tmout(){return new Promise((t,e)=>{this.tmoutId=setTimeout(()=>{this.prms.cancel(),e({message:"timemout",response:""})},5e4)})}get(t,a=()=>{}){switch(t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"],delete t.headers["content-type"],delete t.headers["content-length"]),t.params&&(t.url+="?"+this.queryStr(t.params)),void 0===t.followRedirect||t.followRedirect||((this.isSurge()||this.isLoon())&&(t["auto-redirect"]=!1),this.isQuanX()&&(t.opts?t.opts.redirection=!1:t.opts={redirection:!1})),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,e,s)=>{!t&&e&&(e.body=s,e.statusCode=e.status||e.statusCode,e.status=e.statusCode),a(t,e,s)});break;case"Quantumult X":this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{var{statusCode:t,statusCode:e,headers:s,body:r,bodyBytes:i}=t;a(null,{status:t,statusCode:e,headers:s,body:r,bodyBytes:i},r,i)},t=>a(t&&t.error||"UndefinedError"));break;case"Node.js":this.initGotEnv(t),this.prms=this.got(t).on("redirect",(t,e)=>{try{var s;t.headers["set-cookie"]&&((s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString())&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar)}catch(t){this.logErr(t)}}),Promise.race([this.prms,this.tmout()]).then(t=>{var{statusCode:t,statusCode:e,headers:s,rawBody:r,body:i}=t;a(null,{status:t,statusCode:e,headers:s,rawBody:r,body:i},i),clearTimeout(this.tmoutId)},t=>{var{message:t,response:e}=t;clearTimeout(this.tmoutId),a(t,e,e&&e.body)})}}post(t,a=()=>{}){var e=t.method?t.method.toLocaleLowerCase():"post";switch(t.body&&t.headers&&!t.headers["Content-Type"]&&!t.headers["content-type"]&&(t.headers["content-type"]="application/x-www-form-urlencoded"),t.headers&&(delete t.headers["Content-Length"],delete t.headers["content-length"]),void 0===t.followRedirect||t.followRedirect||((this.isSurge()||this.isLoon())&&(t["auto-redirect"]=!1),this.isQuanX()&&(t.opts?t.opts.redirection=!1:t.opts={redirection:!1})),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[e](t,(t,e,s)=>{!t&&e&&(e.body=s,e.statusCode=e.status||e.statusCode,e.status=e.statusCode),a(t,e,s)});break;case"Quantumult X":t.method=e,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{var{statusCode:t,statusCode:e,headers:s,body:r,bodyBytes:i}=t;a(null,{status:t,statusCode:e,headers:s,body:r,bodyBytes:i},r,i)},t=>a(t&&t.error||"UndefinedError"));break;case"Node.js":this.initGotEnv(t);var{url:s,...r}=t;this.prms=this.got[e](s,r),Promise.race([this.prms,this.tmout()]).then(t=>{var{statusCode:t,statusCode:e,headers:s,rawBody:r,body:i}=t;a(null,{status:t,statusCode:e,headers:s,rawBody:r,body:i},i),clearTimeout(this.tmoutId)},t=>{var{message:t,response:e}=t;clearTimeout(this.tmoutId),a(t,e,e&&e.body)})}}time(t,e=null){var s,r={"M+":(e=e?new Date(e):new Date).getMonth()+1,"d+":e.getDate(),"H+":e.getHours(),"m+":e.getMinutes(),"s+":e.getSeconds(),"q+":Math.floor((e.getMonth()+3)/3),S:e.getMilliseconds()};for(s in/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(e.getFullYear()+"").substr(4-RegExp.$1.length))),r)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?r[s]:("00"+r[s]).substr((""+r[s]).length)));return t}queryStr(e){let s="";for(const r in e){let t=e[r];null!=t&&""!==t&&("object"==typeof t&&(t=JSON.stringify(t)),s+=`${r}=${t}&`)}return s=s.substring(0,s.length-1)}msg(t=o,e="",s="",r={}){var i,a=r=>{const{$open:t,$copy:e,$media:i,$mediaMime:a}=r;switch(typeof r){case void 0:return r;case"string":switch(this.getEnv()){case"Surge":case"Stash":default:return{url:r};case"Loon":case"Shadowrocket":return r;case"Quantumult X":return{"open-url":r};case"Node.js":return}case"object":switch(this.getEnv()){case"Surge":case"Stash":case"Shadowrocket":default:var o={},s=r.openUrl||r.url||r["open-url"]||t;if(s&&Object.assign(o,{action:"open-url",url:s}),(s=r["update-pasteboard"]||r.updatePasteboard||e)&&Object.assign(o,{action:"clipboard",text:s}),i){let t,e,s;if(i.startsWith("http"))t=i;else if(i.startsWith("data:")){const[r]=i.split(";"),[,a]=i.split(",");e=a,s=r.replace("data:","")}else e=i,s=(t=>{var e,s={JVBERi0:"application/pdf",R0lGODdh:"image/gif",R0lGODlh:"image/gif",iVBORw0KGgo:"image/png","/9j/":"image/jpg"};for(e in s)if(0===t.indexOf(e))return s[e];return null})(i);Object.assign(o,{"media-url":t,"media-base64":e,"media-base64-mime":a??s})}return Object.assign(o,{"auto-dismiss":r["auto-dismiss"],sound:r.sound}),o;case"Loon":{const e={};(s=r.openUrl||r.url||r["open-url"]||t)&&Object.assign(e,{openUrl:s});var n=r.mediaUrl||r["media-url"];return(n=i?.startsWith("http")?i:n)&&Object.assign(e,{mediaUrl:n}),console.log(JSON.stringify(e)),e}case"Quantumult X":{const a={};(o=r["open-url"]||r.url||r.openUrl||t)&&Object.assign(a,{"open-url":o});n=r["media-url"]||r.mediaUrl;return(n=i?.startsWith("http")?i:n)&&Object.assign(a,{"media-url":n}),(s=r["update-pasteboard"]||r.updatePasteboard||e)&&Object.assign(a,{"update-pasteboard":s}),console.log(JSON.stringify(a)),a}case"Node.js":return}default:return}};if(!this.isMute)switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:$notification.post(t,e,s,a(r));break;case"Quantumult X":$notify(t,e,s,a(r));break;case"Node.js":}this.isMuteLog||((i=["","==============📣系统通知📣=============="]).push(t),e&&i.push(e),s&&i.push(s),console.log(i.join("\n")),this.logs=this.logs.concat(i))}debug(...t){this.logLevels[this.logLevel]<=this.logLevels.debug&&(0<t.length&&(this.logs=[...this.logs,...t]),console.log(""+this.logLevelPrefixs.debug+t.map(t=>t??String(t)).join(this.logSeparator)))}info(...t){this.logLevels[this.logLevel]<=this.logLevels.info&&(0<t.length&&(this.logs=[...this.logs,...t]),console.log(""+this.logLevelPrefixs.info+t.map(t=>t??String(t)).join(this.logSeparator)))}warn(...t){this.logLevels[this.logLevel]<=this.logLevels.warn&&(0<t.length&&(this.logs=[...this.logs,...t]),console.log(""+this.logLevelPrefixs.warn+t.map(t=>t??String(t)).join(this.logSeparator)))}error(...t){this.logLevels[this.logLevel]<=this.logLevels.error&&(0<t.length&&(this.logs=[...this.logs,...t]),console.log(""+this.logLevelPrefixs.error+t.map(t=>t??String(t)).join(this.logSeparator)))}log(...t){0<t.length&&(this.logs=[...this.logs,...t]),console.log(t.map(t=>t??String(t)).join(this.logSeparator))}logErr(t,e){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Quantumult X":default:this.log("",`❗️${this.name}, 错误!`,t);break;case"Node.js":this.log("",`❗️${this.name}, 错误!`,void 0!==t.message?t.message:t)}}wait(e){return new Promise(t=>setTimeout(t,e))}done(t={}){var e=((new Date).getTime()-this.startTime)/1e3;switch(this.log("",`🔔${this.name}, 结束! 🕛 ${e} 秒`),this.log(),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Quantumult X":default:$done(t);break;case"Node.js":process.exit(1)}}}(o,t)}

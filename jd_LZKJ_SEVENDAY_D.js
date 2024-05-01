/*
活动名称：LZKJ_SEVENDAY_D
环境变量：多活动id用逗号分开，不同环境变量对应不同链接类型，注意区分


下方例子：	单个无需 ,  多活动id用逗号分开
export LZKJ_SEVENDAY_D="xxxx,xxxx,xxxxx"
export jd_sevenDay_blacklist="" 黑名单 用&隔开 pin值

默认入会，开启请设置变量 WXSIGNRH=false;
cron: 1 1 1 1 * LZKJ_SEVENDAY_D.js

*/

const $ = new Env('LZKJ_SEVENDAY_D');
const _0x36ee51 = $.isNode() ? require("./jdCookie.js") : "",
  _0x5b67d7 = $.isNode() ? require("./sendNotify") : "",
  _0x15c39a = require("./USER_AGENTS"),
  _0x5de4ef = require("./function/dylank"),
  _0x3c0d8f = require("crypto-js"),
  _0x1bc921 = require("child_process").execSync,
  _0x568cdc = require("fs");
if (process.env.DY_PROXY) {
  const _0x20b90a = require("./function/proxy.js");
  $.get = _0x20b90a.intoRequest($.get.bind($));
  $.post = _0x20b90a.intoRequest($.post.bind($));
}
const _0x3ec607 = _0x568cdc.existsSync("/ql/data/config") ? "/ql/data/config/config.sh" : "/ql/config/config.sh",
  _0x32763f = process.env.WXSIGNRH ? process.env.WXSIGNRH : true;
let _0x5903f8 = [],
  _0x470d5c = "",
  _0x427fa1 = "",
  _0x32df5e = [],
  _0x144e4e = [],
  _0x39bf25 = [],
  _0x140e24 = [],
  _0x51b92b = {},
  _0x1937b1 = 10,
  _0x2e2cac = 0,
  _0x2a15ef = [],
  _0xe4722;
process.env.LZKJ_SEVENDAY_D && process.env.LZKJ_SEVENDAY_D != "" && (_0x32df5e = process.env.LZKJ_SEVENDAY_D.split(",").filter(_0x2ff280 => !!_0x2ff280 && _0x2ff280.length === 32), _0x32df5e = [...new Set(_0x32df5e)]);
process.env.COOKIE_NUM && process.env.COOKIE_NUM != 1000 && (_0x1937b1 = process.env.COOKIE_NUM);
if ($.isNode()) Object.keys(_0x36ee51).forEach(_0x5e958e => {
  _0x5903f8.push(_0x36ee51[_0x5e958e]);
}), process.env.JD_DEBUG && process.env.JD_DEBUG === "false" && (console.log = () => {});else {
  let _0xb7efd4 = $.getdata("CookiesJD") || "[]";
  _0xb7efd4 = JSON.parse(_0xb7efd4);
  _0x5903f8 = _0xb7efd4.map(_0x23d746 => {
    return _0x23d746.cookie;
  });
  _0x5903f8.reverse();
  _0x5903f8.push(...[$.getdata("CookieJD2"), $.getdata("CookieJD")]);
  _0x5903f8.reverse();
  _0x5903f8 = _0x5903f8.filter(_0x193495 => {
    return !!_0x193495;
  });
}
let _0x375803 = "",
  _0x2ccd2b = "";
$.whitelist = process.env.jd_sevenDay_whitelist || _0x375803;
$.blacklist = process.env.jd_sevenDay_blacklist || _0x2ccd2b;
_0x57b6a3();
_0x5c278e();
!(async () => {
  console.log("\n默认只跑前10账号，变量为：COOKIE_NUM");
  console.log("支持代理API");
  if ([..._0x32df5e, ..._0x144e4e, ..._0x39bf25, ..._0x140e24].length === 0) {
    console.log("\n没有配置活动变量，详情查看注释，退出！\n");
    return;
  }
  if (!_0x5903f8[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  for (let _0x8a0f1d = 0; _0x8a0f1d < _0x1937b1; _0x8a0f1d++) {
    if (_0x5903f8[_0x8a0f1d]) {
      _0x470d5c = _0x5903f8[_0x8a0f1d];
      originCookie = _0x5903f8[_0x8a0f1d];
      newCookie = "";
      $.UserName = decodeURIComponent(_0x470d5c.match(/pt_pin=(.+?);/) && _0x470d5c.match(/pt_pin=(.+?);/)[1]);
      $.index = _0x8a0f1d + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      $.UA = _0x15c39a.UARAM ? _0x15c39a.UARAM() : _0x15c39a.USER_AGENT;
      await _0x22bc2a();
      if (!$.isLogin) {
        $.msg($.name, "\u3010\u63D0\u793A\u3011cookie\u5DF2\u5931\u6548", "\u4EAC\u4E1C\u8D26\u53F7" + $.index + " " + ($.nickName || $.UserName) + "\\n请重新登录获取\\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await _0x5b67d7.sendNotify("" + $.name + "cookie已失效 - " + $.UserName, "\u4EAC\u4E1C\u8D26\u53F7" + $.index + " " + $.UserName + "\\n请重新登录获取cookie"));
        continue;
      }
      $.bean = 0;
      $.ADID = _0x303929("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", 1);
      $.UUID = _0x303929("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
      _0x32df5e.length >= 1 && (console.log("❖ 签到类型1（ lzkj sevenDay ）"), await _0xebf920(), await $.wait(2000));
      _0x144e4e.length >= 1 && (console.log("\n❖ 签到类型2（ lzkj signActivity2 ）"), await _0x1521fc(), await $.wait(2000));
      _0x39bf25.length >= 1 && (console.log("\n❖ 签到类型3（ cjhy sevenDay ）"), await _0x5ba4e1(), await $.wait(2000));
      if (_0x140e24.length >= 1) {
        console.log("\n❖ 签到类型4（ cjhy signActivity ）");
        await _0x49dd6d();
        await $.wait(2000);
      }
      $.bean > 0 && (_0x427fa1 += "\u3010\u4EAC\u4E1C\u8D26\u53F7" + $.index + "】" + ($.nickName || $.UserName) + " \\n       └ 获得 " + $.bean + " 京豆。");
    }
  }
  try {
    _0xe4722 = _0x2a15ef.length;
    for (let _0x43fbe7 of _0x2a15ef) {
      _0x1bc921("sed -i \"s!" + _0x43fbe7 + "!!g\" " + _0x3ec607);
    }
  } catch (_0x5dbc68) {}
  console.log("\n" + (_0xe4722 > 0 ? _0xe4722 + "个失效活动，变量已移除" : ""));
  _0x427fa1 !== "" && ($.isNode() ? await _0x5b67d7.sendNotify($.name, _0x427fa1, "", "\n") : $.msg($.name, "有点儿收获", _0x427fa1));
})().catch(_0x293071 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x293071 + "!", "");
}).finally(() => {
  $.done();
});
async function _0xebf920() {
  for (let _0x577596 = 0; _0x577596 < _0x32df5e.length; _0x577596++) {
    $.activityId = _0x32df5e[_0x577596];
    if (!$.activityId) continue;
    $.activityUrl = "https://lzkj-isv.isvjcloud.com/sign/sevenDay/signActivity?activityId=" + $.activityId;
    console.log("");
    _0x2e2cac = 0;
    _0x577596 == 0 && ($.token = null, $.secretPin = null);
    $.venderId = null;
    await _0x4001f1();
    await $.wait(500);
    await _0xc894ae("customer/getSimpleActInfoVo", "activityId=" + $.activityId, 1);
    await $.wait(500);
    if (_0x577596 == 0) {
      $.token = await _0x5de4ef(_0x470d5c, "https://lzkj-isv.isvjcloud.com");
      if ($.token) {
        await _0x290277();
        await $.wait(500);
        if (!$.secretPin) await _0x290277();
      } else {
        $.log("没有成功获取到用户鉴权信息");
        break;
      }
    }
    if ($.secretPin) {
      console.log("\u6D3B\u52A8ID\uFF1A" + $.activityId);
      if ($.index == 1) {
        $.log("活动链接：" + $.activityUrl);
        await _0x57e952("lzkj", "wx", "getShopInfo", $.venderId, $.secretPin, $.activityId);
        await _0x57e952("lzkj", "sevenDay/wx", "getSignInfo", $.venderId, undefined, $.activityId);
        if ($.activityEnd) {
          $.log("活动已结束，不执行签到");
          delete _0x144e4e[_0x577596];
          continue;
        }
      }
      $.venderId && (await _0xc894ae("common/accessLogWithAD", "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + encodeURIComponent($.secretPin) + "&activityId=" + $.activityId + "&pageUrl=" + $.activityUrl + "&subType=app&adSource=tg_xuanFuTuBiao", 1), await $.wait(500));
      await _0xc894ae("sign/wx/signUp", "actId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin), 1);
      await $.wait(1000);
    } else {
      $.log("没有成功获取到用户信息");
      break;
    }
  }
  _0xc894ae;
}
async function _0x1521fc() {
  for (let _0x99eb82 = 0; _0x99eb82 < _0x144e4e.length; _0x99eb82++) {
    $.activityId = _0x144e4e[_0x99eb82];
    if (!$.activityId) continue;
    $.activityUrl = "https://lzkj-isv.isvjcloud.com/sign/signActivity2?activityId=" + $.activityId;
    console.log("");
    _0x2e2cac = 0;
    _0x99eb82 == 0 && ($.token = null, $.secretPin = null);
    $.venderId = null;
    await _0x4001f1();
    await $.wait(500);
    await _0xc894ae("customer/getSimpleActInfoVo", "activityId=" + $.activityId, 1);
    await $.wait(500);
    if (_0x99eb82 == 0) {
      $.token = await _0x5de4ef(_0x470d5c, "https://lzkj-isv.isvjcloud.com");
      if ($.token) {
        await _0x290277();
        await $.wait(500);
        if (!$.secretPin) await _0x290277();
      } else {
        $.log("没有成功获取到用户鉴权信息");
        break;
      }
    }
    if ($.secretPin) {
      console.log("\u6D3B\u52A8ID\uFF1A" + $.activityId);
      if ($.index == 1) {
        $.log("活动链接：" + $.activityUrl);
        await _0x57e952("lzkj", "wx", "getShopInfo", $.venderId, $.secretPin, $.activityId);
        await _0x57e952("lzkj", "wx", "getActivity", $.venderId, undefined, $.activityId);
        if ($.activityEnd) {
          $.log("活动已结束，不执行签到");
          delete _0x144e4e[_0x99eb82];
          continue;
        }
      }
      $.venderId && (await _0xc894ae("common/accessLogWithAD", "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + encodeURIComponent($.secretPin) + "&activityId=" + $.activityId + "&pageUrl=" + $.activityUrl + "&subType=app&adSource=tg_xuanFuTuBiao", 1), await $.wait(500));
      await _0xc894ae("sign/wx/signUp", "actId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin), 1);
      await $.wait(1000);
    } else {
      $.log("没有成功获取到用户信息");
      break;
    }
  }
}
async function _0x5ba4e1() {
  for (let _0x2a945e = 0; _0x2a945e < _0x39bf25.length; _0x2a945e++) {
    $.activityId = _0x39bf25[_0x2a945e];
    if (!$.activityId) continue;
    $.activityUrl = "https://cjhy-isv.isvjcloud.com/sign/sevenDay/signActivity?activityId=" + $.activityId;
    console.log("");
    _0x2e2cac = 0;
    _0x2a945e == 0 && ($.token = null, $.secretPin = null);
    $.venderId = null;
    await _0xb77af7();
    await $.wait(500);
    await _0x43806e("customer/getSimpleActInfoVo", "activityId=" + $.activityId, 1);
    await $.wait(500);
    _0x2a945e == 0 && ($.token = await _0x5de4ef(_0x470d5c, "https://cjhy-isv.isvjcloud.com"));
    await _0x293beb();
    if ($.secretPin) {
      console.log("\u6D3B\u52A8ID\uFF1A" + $.activityId);
      if ($.index == 1) {
        $.log("活动链接：" + $.activityUrl);
        await _0x57e952("cjhy", "wx", "getShopInfo", $.venderId, $.secretPin, $.activityId);
        await _0x57e952("cjhy", "sevenDay/wx", "getSignInfo", $.venderId, undefined, $.activityId);
        if ($.activityEnd) {
          $.log("活动已结束，不执行签到");
          delete _0x39bf25[_0x2a945e];
          continue;
        }
      }
      if ($.venderId) {
        await _0x43806e("common/accessLogWithAD", "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + encodeURIComponent(encodeURIComponent($.secretPin)) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent($.activityUrl) + "&subType=app&adSource=", 1);
        await $.wait(500);
      }
      let _0x3bcf44 = {
        "ecyText": _0x571058({
          "actId": $.activityId,
          "pin": encodeURIComponent($.secretPin)
        }, $.pinToken, $.te)
      };
      await _0x43806e("sign/sevenDay/wx/signUp", JSON.stringify(_0x3bcf44), 1);
      await $.wait(1000);
    } else {
      $.log("没有成功获取到用户信息");
      break;
    }
  }
}
async function _0x49dd6d() {
  for (let _0x390645 = 0; _0x390645 < _0x140e24.length; _0x390645++) {
    $.activityId = _0x140e24[_0x390645];
    if (!$.activityId) continue;
    $.activityUrl = "https://cjhy-isv.isvjcloud.com/sign/signActivity?activityId=" + $.activityId;
    console.log("");
    _0x2e2cac = 0;
    _0x390645 == 0 && ($.token = null, $.secretPin = null);
    $.venderId = null;
    await _0xb77af7();
    await $.wait(500);
    await _0x43806e("customer/getSimpleActInfoVo", "activityId=" + $.activityId, 1);
    await $.wait(500);
    _0x390645 == 0 && ($.token = await _0x5de4ef(_0x470d5c, "https://cjhy-isv.isvjcloud.com"));
    await _0x293beb();
    if ($.secretPin) {
      console.log("\u6D3B\u52A8ID\uFF1A" + $.activityId);
      if ($.index == 1) {
        $.log("活动链接：" + $.activityUrl);
        await _0x57e952("cjhy", "wx", "getShopInfo", $.venderId, $.secretPin, $.activityId);
        await _0x57e952("cjhy", "wx", "getActivity", $.venderId, undefined, $.activityId);
        if ($.activityEnd) {
          $.log("活动已结束，不执行签到");
          delete _0x140e24[_0x390645];
          continue;
        }
      }
      $.venderId && (await _0x43806e("common/accessLogWithAD", "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + encodeURIComponent(encodeURIComponent($.secretPin)) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent($.activityUrl) + "&subType=app", 1), await $.wait(500));
      let _0x264526 = {
        "ecyText": _0x571058({
          "actId": $.activityId,
          "pin": encodeURIComponent($.secretPin)
        }, $.pinToken, $.te)
      };
      await _0x43806e("sign/wx/signUp", JSON.stringify(_0x264526), 1);
      await $.wait(1000);
    } else {
      $.log("没有成功获取到用户信息");
      break;
    }
  }
}
async function _0xc894ae(_0x1e8013, _0x4b1379, _0x313bb5 = 0) {
  return new Promise(_0x4eb8cf => {
    $.post(_0x5ca58f(_0x1e8013, _0x4b1379, _0x313bb5), async (_0x74252e, _0x40506f, _0x35a6cc) => {
      try {
        if (_0x74252e) $.log(_0x74252e);else {
          if (_0x35a6cc) {
            _0x35a6cc = JSON.parse(_0x35a6cc);
            if (_0x40506f.headers["set-cookie"]) {
              _0x470d5c = originCookie + ";";
              for (let _0x2900db of _0x40506f.headers["set-cookie"]) {
                _0x51b92b[_0x2900db.split(";")[0].substr(0, _0x2900db.split(";")[0].indexOf("="))] = _0x2900db.split(";")[0].substr(_0x2900db.split(";")[0].indexOf("=") + 1);
              }
              for (const _0x1647ac of Object.keys(_0x51b92b)) {
                _0x470d5c += _0x1647ac + "=" + _0x51b92b[_0x1647ac] + ";";
              }
            }
            if (_0x35a6cc) {
              switch (_0x1e8013) {
                case "customer/getSimpleActInfoVo":
                  $.venderId = _0x35a6cc.data.venderId, $.activityType = _0x35a6cc.data.activityType;
                  break;
                case "sign/sevenDay/wx/signUp":
                  if (_0x35a6cc) {
                    if (_0x35a6cc.isOk) {
                      _0x2e2cac = 0;
                      _0x35a6cc.signResult.gift != null ? console.log("签到结果 -> 签到成功" + (_0x35a6cc.signResult.send ? ",获得" + _0x35a6cc.signResult.gift.giftName + " 🎉" : "")) : $.log("簽到結果 -> 簽到成功");
                    } else {
                      console.log("簽到结果 -> " + _0x35a6cc.msg);
                      if (_0x32763f && _0x35a6cc.msg.includes("会员")) {
                        process.stdout.write("去入会 -> ");
                        let _0x39ffb3;
                        for (let _0x104d1a of Array(2)) {
                          _0x39ffb3 = await _0x7242d4($.venderId);
                          if (_0x39ffb3.includes("成功")) break;
                        }
                        if (!_0x39ffb3.includes("成功")) return;
                        await _0xc894ae(_0x1e8013, _0x4b1379, _0x313bb5);
                      } else {
                        if (_0x35a6cc.msg.includes("火爆")) {
                          if (_0x2e2cac > 2) return;
                          _0x2e2cac++;
                          $.log("重试 " + _0x2e2cac);
                          await $.wait(100);
                          await _0xc894ae(_0x1e8013, _0x4b1379, _0x313bb5);
                        }
                      }
                    }
                  }
                  break;
                case "sign/wx/signUp":
                  if (_0x35a6cc) {
                    if (_0x35a6cc.isOk) {
                      _0x2e2cac = 0;
                      _0x35a6cc.gift != null ? console.log("签到结果 -> 签到成功" + (_0x35a6cc.isSend ? ",获得" + _0x35a6cc.gift.giftName + " 🎉" : "") + " ") : $.log("簽到結果 -> 簽到成功");
                      await _0x57e952("lzkj", "wx", "getSignInfo", $.venderId, $.secretPin, $.activityId);
                    } else {
                      console.log("签到结果 -> " + _0x35a6cc.msg);
                      if (_0x32763f && _0x35a6cc.msg.includes("会员")) {
                        process.stdout.write("去入会 -> ");
                        let _0x4c94f4;
                        for (let _0x539926 of Array(2)) {
                          _0x4c94f4 = await _0x7242d4($.venderId);
                          if (_0x4c94f4.includes("成功")) break;
                        }
                        if (!_0x4c94f4.includes("成功")) return;
                        await _0xc894ae(_0x1e8013, _0x4b1379, _0x313bb5);
                      } else {
                        if (_0x35a6cc.msg.includes("火爆")) {
                          if (_0x2e2cac > 2) return;
                          _0x2e2cac++;
                          $.log("重试 " + _0x2e2cac);
                          await $.wait(100);
                          await _0xc894ae(_0x1e8013, _0x4b1379, _0x313bb5);
                        }
                      }
                    }
                  }
                  break;
                default:
                  $.log(JSON.stringify(_0x35a6cc));
                  break;
              }
            }
          }
        }
      } catch (_0x3bff5b) {
        _0x1e8013 != "customer/getSimpleActInfoVo" && $.log(_0x1e8013 + " -> " + _0x3bff5b);
      } finally {
        _0x4eb8cf();
      }
    });
  });
}
async function _0x43806e(_0x5f209f, _0x2e48d6, _0x238849 = 0) {
  return new Promise(_0x9b367c => {
    $.post(_0x1cfb8a(_0x5f209f, _0x2e48d6, _0x238849), async (_0x1d9648, _0x59c7b6, _0x2b1f43) => {
      try {
        if (_0x1d9648) $.log(_0x1d9648);else {
          if (_0x2b1f43) {
            _0x2b1f43 = JSON.parse(_0x2b1f43);
            if (_0x59c7b6.headers["set-cookie"]) {
              _0x470d5c = originCookie + ";";
              for (let _0x1ce469 of _0x59c7b6.headers["set-cookie"]) {
                _0x51b92b[_0x1ce469.split(";")[0].substr(0, _0x1ce469.split(";")[0].indexOf("="))] = _0x1ce469.split(";")[0].substr(_0x1ce469.split(";")[0].indexOf("=") + 1);
              }
              for (const _0x52fa1f of Object.keys(_0x51b92b)) {
                _0x470d5c += _0x52fa1f + "=" + _0x51b92b[_0x52fa1f] + ";";
              }
            }
            if (_0x2b1f43) {
              switch (_0x5f209f) {
                case "customer/getSimpleActInfoVo":
                  $.venderId = _0x2b1f43.data.venderId, $.activityType = _0x2b1f43.data.activityType;
                  break;
                case "sign/sevenDay/wx/signUp":
                  if (_0x2b1f43) {
                    if (_0x2b1f43.isOk) {
                      _0x2e2cac = 0;
                      if (_0x2b1f43.signResult.gift != null) console.log("签到结果 -> 签到成功" + (_0x2b1f43.signResult.send ? ",获得" + _0x2b1f43.signResult.gift.giftName + " 🎉" : ""));else {
                        $.log("簽到結果 -> 簽到成功");
                      }
                    } else {
                      console.log("签到结果 -> " + _0x2b1f43.msg);
                      if (_0x32763f && _0x2b1f43.msg.includes("会员")) {
                        process.stdout.write("去入会 -> ");
                        let _0xe5452d;
                        for (let _0x56f340 of Array(2)) {
                          _0xe5452d = await _0x7242d4($.venderId);
                          if (_0xe5452d.includes("成功")) break;
                        }
                        if (!_0xe5452d.includes("成功")) return;
                        await _0x43806e(_0x5f209f, _0x2e48d6, _0x238849);
                      } else {
                        if (_0x2b1f43.msg.includes("火爆")) {
                          if (_0x2e2cac > 2) return;
                          _0x2e2cac++;
                          $.log("重试 " + _0x2e2cac);
                          await $.wait(100);
                          await _0x43806e(_0x5f209f, _0x2e48d6, _0x238849);
                        }
                      }
                    }
                  }
                  break;
                case "sign/wx/signUp":
                  if (_0x2b1f43) {
                    if (_0x2b1f43.isOk) _0x2e2cac = 0, _0x2b1f43.gift != null ? console.log("签到结果 -> 签到成功" + (_0x2b1f43.signResult.send ? ",获得" + _0x2b1f43.gift.giftName + " 🎉" : "")) : $.log("簽到結果 -> 簽到成功"), await _0x57e952("cjhy", "wx", "getSignInfo", $.venderId, $.secretPin, $.activityId);else {
                      console.log("签到结果 -> " + _0x2b1f43.msg);
                      if (_0x32763f && _0x2b1f43.msg.includes("会员")) {
                        process.stdout.write("去入会 -> ");
                        let _0x5e4d31;
                        for (let _0x222a5d of Array(2)) {
                          _0x5e4d31 = await _0x7242d4($.venderId);
                          if (_0x5e4d31.includes("成功")) break;
                        }
                        if (!_0x5e4d31.includes("成功")) return;
                        await _0x43806e(_0x5f209f, _0x2e48d6, _0x238849);
                      } else {
                        if (_0x2b1f43.msg.includes("火爆")) {
                          if (_0x2e2cac > 2) return;
                          _0x2e2cac++;
                          $.log("重试 " + _0x2e2cac);
                          await $.wait(100);
                          await _0x43806e(_0x5f209f, _0x2e48d6, _0x238849);
                        }
                      }
                    }
                  }
                  break;
                default:
                  $.log(JSON.stringify(_0x2b1f43));
                  break;
              }
            }
          }
        }
      } catch (_0x1d8179) {
        _0x5f209f != "customer/getSimpleActInfoVo" && $.log(_0x5f209f + " -> " + _0x1d8179);
      } finally {
        _0x9b367c();
      }
    });
  });
}
function _0x5ca58f(_0x263757, _0x260df3, _0x4c87f0) {
  return {
    "url": _0x4c87f0 ? "https://lzkj-isv.isvjcloud.com/" + _0x263757 : "https://lzkj-isv.isvjcloud.com/sign/wx/" + _0x263757,
    "headers": {
      "Host": "lzkj-isv.isvjcloud.com",
      "Accept": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "Accept-Language": "zh-cn",
      "Accept-Encoding": "gzip, deflate, br",
      "Content-Type": "application/x-www-form-urlencoded",
      "Origin": "https://lzkj-isv.isvjcloud.comm",
      "User-Agent": $.UA,
      "Connection": "keep-alive",
      "Referer": $.activityUrl,
      "Cookie": _0x470d5c
    },
    "body": _0x260df3
  };
}
function _0x1cfb8a(_0x238dd7, _0x439f82, _0x4d8953) {
  return {
    "url": _0x4d8953 ? "https://cjhy-isv.isvjcloud.com/" + _0x238dd7 : "https://cjhy-isv.isvjcloud.com/sign/wx/" + _0x238dd7,
    "headers": {
      "Host": "cjhy-isv.isvjcloud.com",
      "Accept": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "Accept-Language": "zh-cn",
      "Accept-Encoding": "gzip, deflate, br",
      "Content-Type": "application/x-www-form-urlencoded",
      "Origin": "https://cjhy-isv.isvjcloud.comm",
      "User-Agent": $.UA,
      "Connection": "keep-alive",
      "Referer": $.activityUrl,
      "Cookie": _0x470d5c
    },
    "body": _0x439f82
  };
}
function _0x290277() {
  let _0x322adb = {
    "url": "https://lzkj-isv.isvjcloud.com/customer/getMyPing",
    "headers": {
      "Host": "lzkj-isv.isvjcloud.com",
      "Accept": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "Accept-Language": "zh-cn",
      "Accept-Encoding": "gzip, deflate, br",
      "Content-Type": "application/x-www-form-urlencoded",
      "Origin": "https://lzkj-isv.isvjcloud.com",
      "User-Agent": $.UA,
      "Connection": "keep-alive",
      "Referer": $.activityUrl,
      "Cookie": _0x470d5c
    },
    "body": "userId=" + $.venderId + "&token=" + $.token + "&fromType=APP"
  };
  return new Promise(_0x1ac74b => {
    $.post(_0x322adb, (_0x48f3fd, _0x582af8, _0x39d8d1) => {
      try {
        if (_0x48f3fd) $.log(_0x48f3fd);else {
          if (_0x582af8.headers["set-cookie"]) {
            _0x470d5c = originCookie + ";";
            for (let _0x3c9315 of _0x582af8.headers["set-cookie"]) {
              _0x51b92b[_0x3c9315.split(";")[0].substr(0, _0x3c9315.split(";")[0].indexOf("="))] = _0x3c9315.split(";")[0].substr(_0x3c9315.split(";")[0].indexOf("=") + 1);
            }
            for (const _0x5b309f of Object.keys(_0x51b92b)) {
              _0x470d5c += _0x5b309f + "=" + _0x51b92b[_0x5b309f] + ";";
            }
          }
          if (_0x39d8d1) {
            _0x39d8d1 = JSON.parse(_0x39d8d1);
            _0x39d8d1.result ? ($.pin = _0x39d8d1.data.nickname, $.secretPin = _0x39d8d1.data.secretPin) : $.log(_0x39d8d1.errorMessage);
          } else $.log("京东返回了空数据");
        }
      } catch (_0x1337bf) {
        $.log(_0x1337bf);
      } finally {
        _0x1ac74b();
      }
    });
  });
}
function _0x293beb() {
  let _0x14150f = {
    "url": "https://cjhy-isv.isvjcloud.com/customer/initPinToken?activityId=" + $.activityId + "&jdToken=" + $.token + "&source=01&venderId=" + $.venderId + "&uuid=" + $.UUID + "&clientTime=" + Date.now() + "&fromType=APP&riskType=1",
    "headers": {
      "Host": "cjhy-isv.isvjcloud.com",
      "Accept-Language": "zh-cn",
      "Accept-Encoding": "gzip, deflate, br",
      "Content-Type": "application/json",
      "Origin": "https://cjhy-isv.isvjcloud.com",
      "User-Agent": $.UA,
      "Referer": $.activityUrl,
      "Cookie": _0x470d5c
    }
  };
  return new Promise(_0x478231 => {
    $.post(_0x14150f, (_0x4fe8d4, _0x47591f, _0x30c3fa) => {
      try {
        if (_0x4fe8d4) $.log(_0x4fe8d4);else {
          if (_0x47591f.headers["set-cookie"]) {
            _0x470d5c = originCookie + ";";
            for (let _0x2d687e of _0x47591f.headers["set-cookie"]) {
              _0x51b92b[_0x2d687e.split(";")[0].substr(0, _0x2d687e.split(";")[0].indexOf("="))] = _0x2d687e.split(";")[0].substr(_0x2d687e.split(";")[0].indexOf("=") + 1);
            }
            for (const _0x48e548 of Object.keys(_0x51b92b)) {
              _0x470d5c += _0x48e548 + "=" + _0x51b92b[_0x48e548] + ";";
            }
            try {
              $.pinToken = _0x470d5c.match(/pToken=(.*?);/)[1];
              $.te = _0x470d5c.match(/te=(\d+);/)[1];
            } catch {}
          }
          if (_0x30c3fa) {
            _0x30c3fa = JSON.parse(_0x30c3fa);
            if (_0x30c3fa.result) $.pin = _0x30c3fa.data.nickname, $.secretPin = _0x30c3fa.data.secretPin;else {
              $.log(_0x30c3fa.errorMessage);
            }
          } else $.log("京东返回了空数据");
        }
      } catch (_0x234134) {
        $.log(_0x234134);
      } finally {
        _0x478231();
      }
    });
  });
}
function _0x4001f1() {
  return new Promise(_0x29e93c => {
    let _0x2b1d8a = {
      "url": "https://lzkj-isv.isvjcloud.com/wxCommonInfo/token",
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": _0x470d5c,
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(_0x2b1d8a, async (_0x57e596, _0x111b54, _0x224783) => {
      try {
        if (_0x57e596) _0x111b54 && typeof _0x111b54.statusCode != "undefined" && _0x111b54.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true), console.log("" + $.toStr(_0x57e596)), console.log("" + $.name + " cookie API请求失败，请检查网路重试");else {
          let _0x433cc4 = _0x224783.match(/(活动已经结束)/) && _0x224783.match(/(活动已经结束)/)[1] || "";
          if (_0x433cc4) {
            $.activityEnd = true;
            console.log("活动已结束");
          }
          if (_0x111b54.headers["set-cookie"]) {
            _0x470d5c = originCookie + ";";
            for (let _0x3235f2 of _0x111b54.headers["set-cookie"]) {
              _0x51b92b[_0x3235f2.split(";")[0].substr(0, _0x3235f2.split(";")[0].indexOf("="))] = _0x3235f2.split(";")[0].substr(_0x3235f2.split(";")[0].indexOf("=") + 1);
            }
            for (const _0x63800f of Object.keys(_0x51b92b)) {
              _0x470d5c += _0x63800f + "=" + _0x51b92b[_0x63800f] + ";";
            }
            activityCookie = _0x470d5c;
          }
        }
      } catch (_0x441c9) {
        $.logErr(_0x441c9, _0x111b54);
      } finally {
        _0x29e93c();
      }
    });
  });
}
function _0xb77af7() {
  return new Promise(_0x56b7fd => {
    $.get({
      "url": $.activityUrl,
      "headers": {
        "user-agent": $.UA
      }
    }, (_0x1e9a78, _0x91cf49, _0x2b4f2c) => {
      try {
        if (_0x1e9a78) console.log(_0x1e9a78);else {
          if (_0x91cf49.headers["set-cookie"]) {
            _0x470d5c = originCookie + ";";
            for (let _0x58f682 of _0x91cf49.headers["set-cookie"]) {
              _0x51b92b[_0x58f682.split(";")[0].substr(0, _0x58f682.split(";")[0].indexOf("="))] = _0x58f682.split(";")[0].substr(_0x58f682.split(";")[0].indexOf("=") + 1);
            }
            for (const _0xcab1b2 of Object.keys(_0x51b92b)) {
              _0x470d5c += _0xcab1b2 + "=" + _0x51b92b[_0xcab1b2] + ";";
            }
          }
        }
      } catch (_0x3d3de4) {
        console.log(_0x3d3de4);
      } finally {
        _0x56b7fd();
      }
    });
  });
}
function _0x57e952(_0x172c5a, _0x3b013a, _0x384c40, _0xfc9ae3, _0x1c354e, _0x3889f5) {
  let _0x2cf8a6;
  $.activityEnd = false;
  switch (_0x384c40) {
    case "getSignInfo":
      if (_0x172c5a == "lzkj") _0x2cf8a6 = "venderId=" + _0xfc9ae3 + "&pin=" + encodeURIComponent(_0x1c354e) + "&actId=" + _0x3889f5;else {
        _0x2cf8a6 = "venderId=" + _0xfc9ae3 + "&pin=" + encodeURIComponent(encodeURIComponent(_0x1c354e)) + "&actId=" + _0x3889f5;
      }
      break;
    case "getShopInfo":
      _0x2cf8a6 = "venderId=" + _0xfc9ae3;
      break;
    case "getActivity":
      _0x2cf8a6 = "venderId=" + _0xfc9ae3 + "&actId=" + _0x3889f5;
      break;
  }
  let _0x39f929 = {
    "url": "https://" + _0x172c5a + "-isv.isvjcloud.com/sign/" + _0x3b013a + "/" + _0x384c40,
    "body": _0x2cf8a6,
    "headers": {
      "Accept": "application/json",
      "Referer": "https://" + _0x172c5a + "-isv.isvjcloud.com/",
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": $.UA,
      "Cookie": _0x470d5c
    }
  };
  return new Promise(_0x59e8eb => {
    $.post(_0x39f929, (_0x4b8482, _0x3c086b, _0x3afb2c) => {
      try {
        if (_0x4b8482) $.log(JSON.stringify(_0x4b8482));else {
          _0x3afb2c = JSON.parse(_0x3afb2c);
          if (_0x3afb2c.isOk) switch (_0x384c40) {
            case "getSignInfo":
              if (_0x3b013a == "sevenDay/wx") {
                if (_0x172c5a === "cjhy") {
                  $.log("活动时间：" + new Date(_0x3afb2c.startTime).toLocaleString() + " 至 " + new Date(_0x3afb2c.endTime).toLocaleString());
                  Date.now() > _0x3afb2c.endTime && (_0x2a15ef.push(_0x3889f5), $.activityEnd = true);
                  if (_0x3afb2c.giftConditions && _0x3afb2c.giftConditions.length !== 0) {
                    $.log("7日签到奖励：");
                    for (let _0xa78add of _0x3afb2c.giftConditions) {
                      if (_0xa78add.gift == null) continue;
                      $.log(_0xa78add.dayNum + "天" + "|" + _0xa78add.gift.giftName + "|" + _0xa78add.gift.giftTotal + "份|" + (_0xa78add.gift.insufficient ? "无了" : "还有"));
                    }
                  }
                } else {
                  $.log("活动时间：" + _0x3afb2c.actRule.match(/(\d+-\d+-\d+ \d+:\d+ - \d+-\d+-\d+ \d+:\d+)/)[1]);
                  Date.now() > new Date(_0x3afb2c.actRule.match(/- (\d+-\d+-\d+ \d+:\d+)/)[1] + ":00") && (_0x2a15ef.push(_0x3889f5), $.activityEnd = true);
                  if (_0x3afb2c.giftConditions && _0x3afb2c.giftConditions.length !== 0) {
                    $.log("7日签到奖励：");
                    for (let _0x150be9 of _0x3afb2c.giftConditions) {
                      if (_0x150be9.gift == null) continue;
                      $.log(_0x150be9.dayNum + "天" + "|" + _0x150be9.gift.giftName + "|" + (_0x150be9.gift.insufficient ? "无了" : "还有"));
                    }
                  }
                }
              } else $.log("累计签到" + _0x3afb2c.signRecord.totalSignNum + "天|连签" + _0x3afb2c.signRecord.contiSignNum + "天");
              break;
            case "getShopInfo":
              $.log("店铺名称：" + _0x3afb2c.shopInfo.shopName);
              break;
            case "getActivity":
              $.log("活动时间：" + _0x3afb2c.act.actTimeStr);
              if (Date.now() > _0x3afb2c.act.endTime) {
                _0x2a15ef.push(_0x3889f5);
                $.activityEnd = true;
              }
              _0x3afb2c.act.wxSignActivityGiftBean.hasGiftEveryDay == "y" && $.log("每日签到奖励：" + _0x3afb2c.act.wxSignActivityGiftBean.gift.giftName + "|" + _0x3afb2c.act.wxSignActivityGiftBean.gift.giftTotal + "份|" + (_0x3afb2c.act.wxSignActivityGiftBean.gift.insufficient ? "无了" : "还有"));
              if (_0x3afb2c.act.wxSignActivityGiftBean.giftConditions && _0x3afb2c.act.wxSignActivityGiftBean.giftConditions.length !== 0) {
                $.log("连续签到奖励：");
                for (let _0x574cb0 of _0x3afb2c.act.wxSignActivityGiftBean.giftConditions) {
                  $.log(_0x574cb0.dayNum + "天" + "|" + _0x574cb0.gift.giftName + "|" + _0x574cb0.gift.giftTotal + "份|" + (_0x574cb0.gift.insufficient ? "无了" : "还有"));
                }
              }
              break;
          } else _0x3afb2c.msg.includes("结束") && (_0x2a15ef.push(_0x3889f5), $.activityEnd = true);
        }
      } catch (_0x101369) {
        $.logErr(_0x101369, _0x3c086b);
      } finally {
        _0x59e8eb(_0x3afb2c);
      }
    });
  });
}
function _0x4b52d7(_0x3df9ad) {
  var _0x36d661 = false;
  for (let _0x401423 of lajiprizewords) {
    if (_0x3df9ad.includes(_0x401423)) {
      _0x36d661 = true;
      break;
    }
  }
  return _0x36d661;
}
function _0x4661ad(_0x3762cd, _0x1f1e0f) {
  return Math.floor(Math.random() * (_0x1f1e0f - _0x3762cd)) + _0x3762cd;
}
function _0x571058(_0x163f66, _0x2fb04f, _0x21ea2e) {
  const _0x32c674 = ["B6dB3QqGZP1lKNICTaiAeNJSHKNepO5GGgtL6FUceqSlpFZCdx2SZ5MPPbzrgy91HeR0dnJazcMrvMgPF7bhFrfsGaApJKk4JohEEhoJ4kKJpAaGsfrFhb7FPgMvrMczaJnd0ReH19ygrzbPPM5ZS2xdCZFplSqecUF6LtgGG5OpeNKHSJNeAiaTCINKl1PZGqQ3Bd6B", "EUhzJoyKP7VydtpyBwNUGU2tqzI0QB0LIpQ10Fk3hX2ZcPoGRpACqmzcTQbKd98i3U7raFz2rMl2kys0ODgtAh22E3i57wmh38RbbR83hmw75i3E22hAtgDO0syk2lMr2zFar7U3i89dKbQTczmqCApRGoPcZ2Xh3kF01QpIL0BQ0Izqt2UGUNwByptdyV7PKyoJzhUE", "xexcHoyVwOs5TYTQVvU0iXn56ryKVdWedLTpq3KEKmbUHfwzuZjIpZOPVXMEappFhjdqwtp1bBrWaRBCfPFwCq2W8SsyvwqZ6sIGGIs6ZqwvysS8W2qCwFPfCBRaWrBb1ptwqdjhFppaEMXVPOZpIjZuzwfHUbmKEK3qpTLdeWdVKyr65nXi0UvVQTYT5sOwVyoHcxex", "2Llnegc5i4flqd4HZPFK210yh61boBxRSdnNVMeudKimx92Qi4aPuHP12HmEImbWrXjLgBGqy1bSnKvLhqMqhknyuse4nFoeLTkJJkTLeoFn4esuynkhqMqhLvKnSb1yqGBgLjXrWbmIEmH21PHuPa4iQ29xmiKdueMVNndSRxBob16hy012KFPZH4dqlf4i5cgenlL2", "dZzoMZF6xtt3voTFDbPzEZ7GeM8t7uY05d4K4xfhtdxELh96dDRB4oRYA2smET5dy1dafGkXOz2V7tNOVi0vSqfuhI99IKprVK6QQ6KVrpKI99IhufqSv0iVONt7V2zOXkGfad1yd5TEms2AYRo4BRDd69hLExdthfx4K4d50Yu7t8MeG7ZEzPbDFTov3ttx6FZMozZd", "SNYr3bWMtQulWZO2FEwuhSFp3EXPR1TujPRJwUFlxBh9Pvf2MeTEpR7a3dU6e9rNUMyBh2osDdK4Vdm4gZ0XcRCoHZPi2jiXT2dCCd2TXij2iPZHoCRcX0Zg4mdV4KdDso2hByMUNr9e6Ud3a7RpETeM2fvP9hBxlFUwJRPjuT1RPXE3pFShuwEF2OZWluQtMWb3rYNS", "4viQ2FrYHcrH44gqvPLo6KtiFu56AW1eXbDBZrBepzdLKE33Ey4TwFERnkVLnbHAXbKqAi0HFP9Eu7yg8WNlI7q2dvXGGiPaMbrBBrbMaPiGGXvd2q7IlNW8gy7uE9PFH0iAqKbXAHbnLVknREFwT4yE33EKLdzpeBrZBDbXe1WA65uFitK6oLPvqg44HrcHYrF2Qiv4", "0VIoSHBNVAW8De7NquFyEUm0o9xNnQJGn2OR1yOK9djWALhyP3a1XoQEwTnXuzypRuwsaLPUlertksOY6LYmnbQmPgdDQRXXKdKooKdKXXRQDdgPmQbnmYL6YOsktrelUPLaswuRpyzuXnTwEQoX1a3PyhLAWjd9KOy1RO2nGJQnNx9o0mUEyFuqN7eD8WAVNBHSoIV0", "fdJPBiTra9E0qg2HJrobeEC2SkOfSzbw6nG5J5ACx42GQDBsCyGfxNlHHYhl7EmkdvYaKAXUVXSKcTT1KhyYaj9Q4YtyhnOA7cLrrLc7AOnhytY4Q9jaYyhK1TTcKSXVUXAKaYvdkmE7lhYHHlNxfGyCsBDQG24xCA5J5Gn6wbzSfOkS2CEeborJH2gq0E9arTiBPJdf", "kLOA93PyUOX3QdlLuZ9JgNq1peyIITAQSnKzuLBZ2NthOSseAJMGCecvSLVKAww61Y31hJ4l7kAOcjLmtqQNJlNyJb5yu9d9vqWUUWqv9d9uy5bJyNlJNQqtmLjcOAk7l4Jh13Y16wwAKVLSvceCGMJAesSOhtN2ZBLuzKnSQATIIyep1qNgJ9ZuLldQ3XOUyP39AOLk"];
  function _0x376eb2(_0x5a53e3) {
    _0x5a53e3 = _0x5a53e3.split("").reverse().join("");
    const _0x35254d = new Uint8Array(12),
      _0x4267ba = new TextEncoder().encode(_0x5a53e3);
    for (let _0x5f3a71 = 0; _0x5f3a71 < _0x4267ba.length; _0x5f3a71 += 2) {
      let _0x248fbc = _0x4267ba[_0x5f3a71] << 5 | _0x4267ba[_0x5f3a71 + 1] & 255;
      _0x248fbc %= 63;
      _0x35254d[_0x5f3a71 >> 1] = _0x248fbc;
    }
    let _0x397a35 = "";
    for (let _0x55f44d = 0; _0x55f44d < _0x35254d.length; _0x55f44d++) {
      _0x397a35 += (_0x35254d[_0x55f44d] + 256).toString(2).slice(1);
    }
    let _0x43e1c9 = "",
      _0x188774 = "";
    for (let _0x4338db = 0; _0x4338db < 16; _0x4338db++) {
      if (_0x4338db !== 0) {
        const _0x2c1bdf = _0x4338db * 6,
          _0x2eaf29 = _0x397a35.substring(_0x2c1bdf, _0x2c1bdf + 6);
        let _0x47481d = parseInt(_0x2eaf29, 2);
        const _0x571396 = _0x188774.split("");
        for (let _0x40dde4 = 0; _0x40dde4 < _0x571396.length; _0x40dde4++) {
          _0x571396[_0x40dde4] === "1" && (_0x47481d = (_0x47481d >> 6 - _0x40dde4 | _0x47481d << _0x40dde4) & 63);
        }
        _0x188774 = (_0x47481d & 63).toString(2).padStart(6, "0");
      } else _0x188774 = _0x397a35.substring(0, 6);
      _0x43e1c9 += _0x188774;
    }
    for (let _0x223ae0 = 0; _0x223ae0 < 12; _0x223ae0++) {
      const _0x55b59f = _0x223ae0 * 8;
      _0x35254d[_0x223ae0] = parseInt(_0x43e1c9.substring(_0x55b59f, _0x55b59f + 8), 2);
    }
    const _0x8d2bc1 = btoa(String.fromCharCode.apply(null, _0x35254d));
    return _0x8d2bc1;
  }
  let _0x349edd = Date.now() + parseInt(_0x21ea2e);
  typeof _0x163f66 != "object" && (_0x163f66 = JSON.parse(_0x163f66));
  _0x163f66.nowTime = _0x349edd;
  let _0x4fbfe8 = _0x2fb04f + _0x349edd;
  const _0x4632bb = _0x4fbfe8.substring(0, _0x4fbfe8.length - 5);
  let _0x20dcc8 = "";
  for (let _0x5c880a = 0; _0x5c880a < _0x4632bb.length; _0x5c880a++) {
    let _0x344db8 = _0x4632bb.charCodeAt(_0x5c880a),
      _0x106ceb = _0x344db8 % 10,
      _0x437f71 = _0x32c674[_0x106ceb][_0x5c880a];
    _0x20dcc8 += _0x437f71;
  }
  var _0x338a8f = _0x20dcc8.length,
    _0xbb2108 = Math.floor(_0x338a8f / 24),
    _0xe5faf = "";
  for (var _0x95c355 = 0; _0x95c355 < 24; _0x95c355++) {
    var _0x1e37a0 = (_0x95c355 + 1) * _0xbb2108;
    _0x95c355 === 23 && (_0x1e37a0 = _0x338a8f);
    var _0x793373 = _0x20dcc8.substring(_0x95c355 * _0xbb2108, _0x1e37a0),
      _0x4ed45a = [];
    for (var _0x27d7a0 = 0; _0x27d7a0 < _0x793373.length; _0x27d7a0++) {
      _0x4ed45a.push(_0x793373.charCodeAt(_0x27d7a0));
    }
    var _0x3ba09b = _0x4ed45a.reduce(function (_0x4dad48, _0xd4afc2) {
        return _0x4dad48 + _0xd4afc2;
      }, 0),
      _0x12431a = Math.floor(_0x3ba09b / _0x4ed45a.length);
    _0xe5faf += String.fromCharCode(_0x12431a);
  }
  _0x20dcc8 = _0xe5faf;
  const _0xf0e8cc = _0x376eb2(_0x20dcc8),
    _0x55cba3 = _0x3c0d8f.enc.Utf8.parse(_0xf0e8cc),
    _0x213417 = _0x3c0d8f.enc.Utf8.parse(""),
    _0xf77c31 = _0x3c0d8f.AES.encrypt(JSON.stringify(_0x163f66), _0x55cba3, {
      "iv": _0x213417,
      "mode": _0x3c0d8f.mode.ECB,
      "padding": _0x3c0d8f.pad.Pkcs7
    });
  return _0xf77c31.toString();
}
function _0x5c278e() {
  if ($.blacklist == "") {
    return;
  }
  console.log("当前已设置黑名单：");
  const _0x5e4a84 = Array.from(new Set($.blacklist.split("&")));
  console.log(_0x5e4a84.join("&") + "\n");
  let _0x1a442e = _0x5e4a84,
    _0x8c4804 = [],
    _0x206edc = false;
  for (let _0x14848c = 0; _0x14848c < _0x5903f8.length; _0x14848c++) {
    let _0x440939 = decodeURIComponent(_0x5903f8[_0x14848c].match(/pt_pin=([^; ]+)(?=;?)/) && _0x5903f8[_0x14848c].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!_0x440939) break;
    let _0x48912a = false;
    for (let _0x39b64b of _0x1a442e) {
      if (_0x39b64b && _0x39b64b == _0x440939) {
        _0x48912a = true;
        break;
      }
    }
    !_0x48912a && (_0x206edc = true, _0x8c4804.splice(_0x14848c, -1, _0x5903f8[_0x14848c]));
  }
  _0x206edc && (_0x5903f8 = _0x8c4804);
}
function _0x154607(_0x32d9fc, _0x4f93dc) {
  _0x4f93dc != 0 && _0x32d9fc.unshift(_0x32d9fc.splice(_0x4f93dc, 1)[0]);
}
function _0x57b6a3() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(_0x5903f8, _0x5903f8));
    return;
  }
  console.log("当前已设置白名单：");
  const _0x268b04 = Array.from(new Set($.whitelist.split("&")));
  console.log(_0x268b04.join("&") + "\n");
  let _0x3ef73e = [],
    _0x43b554 = _0x268b04;
  for (let _0x4ac6e7 in _0x5903f8) {
    let _0x2726b0 = decodeURIComponent(_0x5903f8[_0x4ac6e7].match(/pt_pin=([^; ]+)(?=;?)/) && _0x5903f8[_0x4ac6e7].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (_0x43b554.includes(_0x2726b0)) {
      _0x3ef73e.push(_0x5903f8[_0x4ac6e7]);
    }
  }
  helpCookiesArr = _0x3ef73e;
  if (_0x43b554.length > 1) {
    for (let _0x46d3b8 in _0x43b554) {
      let _0x350024 = _0x43b554[_0x43b554.length - 1 - _0x46d3b8];
      if (!_0x350024) continue;
      for (let _0x2ccb18 in helpCookiesArr) {
        let _0x4da706 = decodeURIComponent(helpCookiesArr[_0x2ccb18].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[_0x2ccb18].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        _0x350024 == _0x4da706 && _0x154607(helpCookiesArr, _0x2ccb18);
      }
    }
  }
}
function _0x303929(_0x5a7c0f = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", _0x1c3067 = 0) {
  return _0x5a7c0f.replace(/[xy]/g, function (_0x56bc46) {
    var _0x40d192 = Math.random() * 16 | 0,
      _0x3ad198 = _0x56bc46 == "x" ? _0x40d192 : _0x40d192 & 3 | 8;
    if (_0x1c3067) uuid = _0x3ad198.toString(36).toUpperCase();else {
      uuid = _0x3ad198.toString(36);
    }
    return uuid;
  });
}
function _0x7242d4(_0xb573f0) {
  const _0x418103 = {
    "url": "https://api.m.jd.com/client.action",
    "body": "appid=shopmember_m_jd_com&functionId=bindWithVender&body=" + encodeURIComponent(JSON.stringify({
      "venderId": _0xb573f0,
      "shopId": _0xb573f0,
      "bindByVerifyCodeFlag": 1
    })) + "&clientVersion=9.2.0&client=H5&h5st=",
    "headers": {
      "Cookie": _0x470d5c,
      "User-Agent": $.UA,
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "Referer": "https://shopmember.m.jd.com/"
    }
  };
  return new Promise(_0x14cd5d => {
    $.post(_0x418103, (_0x4648aa, _0x58686d, _0x5d24b3) => {
      try {
        if (_0x4648aa) $.logErr(_0x4648aa);else {
          if (_0x5d24b3) {
            _0x5d24b3 = JSON.parse(_0x5d24b3);
            if (_0x5d24b3.busiCode == "0") {
              process.stdout.write(_0x5d24b3.message + "\n");
              if (_0x5d24b3.result && _0x5d24b3.result.giftInfo) {
                for (let _0x426447 of lIIII1il.result.giftInfo.giftList) {
                  console.log(" >> 入会获得：" + _0x426447.discountString + _0x426447.prizeName + _0x426447.secondLineDesc);
                }
              }
            } else process.stdout.write(_0x5d24b3.message + "\n");
          } else $.log("京东返回了空数据");
        }
      } catch (_0x23e87c) {
        $.logErr(_0x23e87c);
      } finally {
        _0x14cd5d(_0x5d24b3.message);
      }
    });
  });
}
function _0x22bc2a() {
  return new Promise(_0xaded74 => {
    const _0x3ccfcd = {
      "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      "headers": {
        "Cookie": _0x470d5c,
        "referer": "https://h5.m.jd.com/",
        "User-Agent": $.UA
      },
      "timeout": 10000
    };
    $.get(_0x3ccfcd, (_0x3ba831, _0x48d402, _0x5342ec) => {
      try {
        if (_0x5342ec) {
          _0x5342ec = JSON.parse(_0x5342ec);
          if (_0x5342ec.islogin === "1") {} else _0x5342ec.islogin === "0" && ($.isLogin = false);
        }
      } catch (_0x5e4be9) {
        console.log(_0x5e4be9);
      } finally {
        _0xaded74();
      }
    });
  });
}
!function (n) { "use strict"; function t(n, t) { var r = (65535 & n) + (65535 & t); return (n >> 16) + (t >> 16) + (r >> 16) << 16 | 65535 & r } function r(n, t) { return n << t | n >>> 32 - t } function e(n, e, o, u, c, f) { return t(r(t(t(e, n), t(u, f)), c), o) } function o(n, t, r, o, u, c, f) { return e(t & r | ~t & o, n, t, u, c, f) } function u(n, t, r, o, u, c, f) { return e(t & o | r & ~o, n, t, u, c, f) } function c(n, t, r, o, u, c, f) { return e(t ^ r ^ o, n, t, u, c, f) } function f(n, t, r, o, u, c, f) { return e(r ^ (t | ~o), n, t, u, c, f) } function i(n, r) { n[r >> 5] |= 128 << r % 32, n[14 + (r + 64 >>> 9 << 4)] = r; var e, i, a, d, h, l = 1732584193, g = -271733879, v = -1732584194, m = 271733878; for (e = 0; e < n.length; e += 16)i = l, a = g, d = v, h = m, g = f(g = f(g = f(g = f(g = c(g = c(g = c(g = c(g = u(g = u(g = u(g = u(g = o(g = o(g = o(g = o(g, v = o(v, m = o(m, l = o(l, g, v, m, n[e], 7, -680876936), g, v, n[e + 1], 12, -389564586), l, g, n[e + 2], 17, 606105819), m, l, n[e + 3], 22, -1044525330), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 4], 7, -176418897), g, v, n[e + 5], 12, 1200080426), l, g, n[e + 6], 17, -1473231341), m, l, n[e + 7], 22, -45705983), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 8], 7, 1770035416), g, v, n[e + 9], 12, -1958414417), l, g, n[e + 10], 17, -42063), m, l, n[e + 11], 22, -1990404162), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 12], 7, 1804603682), g, v, n[e + 13], 12, -40341101), l, g, n[e + 14], 17, -1502002290), m, l, n[e + 15], 22, 1236535329), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 1], 5, -165796510), g, v, n[e + 6], 9, -1069501632), l, g, n[e + 11], 14, 643717713), m, l, n[e], 20, -373897302), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 5], 5, -701558691), g, v, n[e + 10], 9, 38016083), l, g, n[e + 15], 14, -660478335), m, l, n[e + 4], 20, -405537848), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 9], 5, 568446438), g, v, n[e + 14], 9, -1019803690), l, g, n[e + 3], 14, -187363961), m, l, n[e + 8], 20, 1163531501), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 13], 5, -1444681467), g, v, n[e + 2], 9, -51403784), l, g, n[e + 7], 14, 1735328473), m, l, n[e + 12], 20, -1926607734), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 5], 4, -378558), g, v, n[e + 8], 11, -2022574463), l, g, n[e + 11], 16, 1839030562), m, l, n[e + 14], 23, -35309556), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 1], 4, -1530992060), g, v, n[e + 4], 11, 1272893353), l, g, n[e + 7], 16, -155497632), m, l, n[e + 10], 23, -1094730640), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 13], 4, 681279174), g, v, n[e], 11, -358537222), l, g, n[e + 3], 16, -722521979), m, l, n[e + 6], 23, 76029189), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 9], 4, -640364487), g, v, n[e + 12], 11, -421815835), l, g, n[e + 15], 16, 530742520), m, l, n[e + 2], 23, -995338651), v = f(v, m = f(m, l = f(l, g, v, m, n[e], 6, -198630844), g, v, n[e + 7], 10, 1126891415), l, g, n[e + 14], 15, -1416354905), m, l, n[e + 5], 21, -57434055), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 12], 6, 1700485571), g, v, n[e + 3], 10, -1894986606), l, g, n[e + 10], 15, -1051523), m, l, n[e + 1], 21, -2054922799), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 8], 6, 1873313359), g, v, n[e + 15], 10, -30611744), l, g, n[e + 6], 15, -1560198380), m, l, n[e + 13], 21, 1309151649), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 4], 6, -145523070), g, v, n[e + 11], 10, -1120210379), l, g, n[e + 2], 15, 718787259), m, l, n[e + 9], 21, -343485551), l = t(l, i), g = t(g, a), v = t(v, d), m = t(m, h); return [l, g, v, m] } function a(n) { var t, r = "", e = 32 * n.length; for (t = 0; t < e; t += 8)r += String.fromCharCode(n[t >> 5] >>> t % 32 & 255); return r } function d(n) { var t, r = []; for (r[(n.length >> 2) - 1] = void 0, t = 0; t < r.length; t += 1)r[t] = 0; var e = 8 * n.length; for (t = 0; t < e; t += 8)r[t >> 5] |= (255 & n.charCodeAt(t / 8)) << t % 32; return r } function h(n) { return a(i(d(n), 8 * n.length)) } function l(n, t) { var r, e, o = d(n), u = [], c = []; for (u[15] = c[15] = void 0, o.length > 16 && (o = i(o, 8 * n.length)), r = 0; r < 16; r += 1)u[r] = 909522486 ^ o[r], c[r] = 1549556828 ^ o[r]; return e = i(u.concat(d(t)), 512 + 8 * t.length), a(i(c.concat(e), 640)) } function g(n) { var t, r, e = ""; for (r = 0; r < n.length; r += 1)t = n.charCodeAt(r), e += "0123456789abcdef".charAt(t >>> 4 & 15) + "0123456789abcdef".charAt(15 & t); return e } function v(n) { return unescape(encodeURIComponent(n)) } function m(n) { return h(v(n)) } function p(n) { return g(m(n)) } function s(n, t) { return l(v(n), v(t)) } function C(n, t) { return g(s(n, t)) } function A(n, t, r) { return t ? r ? s(t, n) : C(t, n) : r ? m(n) : p(n) } $.md5 = A }(this);
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
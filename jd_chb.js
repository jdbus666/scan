/*
1 1 1 1 * jd_chb.js
*/

const $ = new Env('赚吃货币抽超市卡');
const bdy_0x527523 = $.isNode() ? require("./jdCookie.js") : "",
  bdy_0x5101e7 = $.isNode() ? require("./sendNotify") : "",
  bdy_0x6db72 = require("./function/dylank"),
  bdy_0x230bb1 = require("./function/dylany");
if (process.env.DY_PROXY) {
  try {
    require("https-proxy-agent");
    ccc = require("./function/proxy.js");
    $.dget = ccc.intoRequest($.get.bind($));
    $.dpost = ccc.intoRequest($.post.bind($));
  } catch {
    $.log("未安装https-proxy-agent依赖，无法启用代理");
    $.dget = $.get;
    $.dpost = $.post;
  }
} else {
  $.dpost = $.post;
  $.dget = $.get;
}
let bdy_0x59ffd2 = [],
  bdy_0x2d6368 = "",
  bdy_0xb650ce = "",
  bdy_0x159760 = "",
  bdy_0x3f900c = {},
  bdy_0x318e06 = 0,
  bdy_0x28ebbc = process.env.CHB_DRAWTIMES || "3",
  bdy_0x197af9 = process.env.opencard_banpin || "",
  bdy_0x173d65 = process.env["opencard" + (__filename.match(/(\d+\w?).js/) ? __filename.match(/(\d+\w?).js/)[1] : "") + "_code"] || "",
  bdy_0x2bdbde = "https://pro.m.jd.com/mall/active/2HzetkVSSUGuP34PJiaaLBcrQ1bf/index.html";
$.activityId = "dz8afab8124748a0c150b7eccbde84";
$.userId = "739130";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
$.followShop = 0;
$.addCart = 0;
if ($.isNode()) {
  Object.keys(bdy_0x527523).forEach(_0xeb5987 => {
    bdy_0x59ffd2.push(bdy_0x527523[_0xeb5987]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  bdy_0x59ffd2 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonfomat($.getdata("CookiesJD") || "[]").map(_0x3ef655 => _0x3ef655.cookie)].filter(_0x5efaf6 => !!_0x5efaf6);
}
bdy_0x59ffd2.length == 1 && bdy_0x173d65 && (bdy_0x46b13a = bdy_0x173d65);
let bdy_0x5c0dc = ["ffacb1769a5e45bc88ec90bd053f3927@SZ0j0lYu9LdFR9JJJQH-w"],
  bdy_0x561537 = [],
  bdy_0x360da3 = [],
  bdy_0x46b13a = "";
$;
!(async () => {
  if (!bdy_0x59ffd2[0]) {
    const _0x4e8125 = {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    };
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", _0x4e8125);
    return;
  }
  await bdy_0x587e81();
  bdy_0x360da3 = bdy_0x561537.length != 0 ? bdy_0x561537 : bdy_0x5c0dc;
  bdy_0x46b13a = bdy_0x360da3[bdy_0x3b8bf6(0, bdy_0x360da3.length)];
  $.shareUuid = bdy_0x46b13a.split("@")[0];
  $.helpId = bdy_0x46b13a.split("@")[1];
  console.log("入口：超市频道--超市卡--任性尝新试吃趴");
  console.log("抽奖次数默认3，控制变量CHB_DRAWTIMES='10'");
  for (let _0x3df47d = 0; _0x3df47d < bdy_0x59ffd2.length; _0x3df47d++) {
    bdy_0x2d6368 = bdy_0x59ffd2[_0x3df47d];
    originCookie = bdy_0x59ffd2[_0x3df47d];
    if (bdy_0x2d6368) {
      $.UserName = decodeURIComponent(bdy_0x2d6368.match(/pt_pin=([^; ]+)(?=;?)/) && bdy_0x2d6368.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x3df47d + 1;
      $.hotFlag = false;
      $.nickName = "";
      $.isLogin = true;
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      if (bdy_0x197af9.indexOf($.UserName) > -1) {
        console.log("黑名单pin,跳出！");
        continue;
      }
      bdy_0x581d64();
      await bdy_0x1a1150();
      if (!$.isLogin) {
        const _0x321f40 = {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        };
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", _0x321f40);
        $.isNode() && (await bdy_0x5101e7.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      await bdy_0x9f0014();
      if ($.outFlag || $.activityEnd) {
        break;
      }
      await $.wait(2000);
    }
    $.index % 5 == 0 && (console.log("\n休息一下，可持续发展......"), await $.wait(parseInt(Math.random() * 2000 + 8000, 10)));
  }
  if ($.outFlag) {
    let _0x44c4fb = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + _0x44c4fb);
    $.isNode() && (await bdy_0x5101e7.sendNotify("" + $.name, "" + _0x44c4fb));
  }
  bdy_0xb650ce && $.msg($.name, "", "" + bdy_0xb650ce);
})().catch(_0x3a21cb => {
  return $.logErr(_0x3a21cb);
}).finally(() => {
  return $.done();
});
async function bdy_0x9f0014() {
  try {
    $.hasEnd = false;
    $.endTime = 0;
    $.followShop = 0;
    $.addCart = 0;
    $.Token = "";
    $.Pin = "";
    bdy_0x159760 = "";
    $.Token = await bdy_0x6db72(bdy_0x2d6368, "https://517chjhdcpkf2-2404-dz.isvjcloud.com");
    if ($.Token == "") {
      console.log("获取Token失败");
      return;
    }
    for (let _0x5a4021 of Array(3)) {
      await bdy_0x17cbca();
      if (bdy_0x159760) {
        break;
      }
      await $.wait(1000);
    }
    if (!bdy_0x159760) {
      console.log("获取cookie失败");
      return;
    }
    if ($.activityEnd === true) {
      return;
    }
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    await bdy_0x45bf0b("getMyCidPing");
    if (!$.Pin) {
      console.log("获取Pin失败");
      return;
    }
    await bdy_0x45bf0b("getSystemConfigForNew");
    await bdy_0x45bf0b("init");
    await bdy_0x45bf0b("accessLogWithAD");
    await bdy_0x45bf0b("getUserInfo");
    await bdy_0x45bf0b("activityContent");
    await bdy_0x45bf0b("getTaskStatus");
    if ($.hotFlag) {
      return;
    }
    if (!$.actorUuid) {
      console.log("获取uid失败");
      return;
    }
    if ($.hasEnd === true || $.endTime && Date.now() > $.endTime) {
      $.activityEnd = true;
      console.log("活动结束！！！");
      return;
    } else {
      $.index == 1 && console.log($.activityName);
      $.index == 1 && console.log("结束时间：" + bdy_0x283412($.endTime));
    }
    (!$.challenge || 1) && (await bdy_0x45bf0b("agreement"));
    await bdy_0x45bf0b("assist");
    await bdy_0x45bf0b("getMyTask");
    console.log("\n去做任务...");
    for (let _0x1c6f56 in $.taskList) {
      if ($.taskList[_0x1c6f56].completionFlag == undefined || _0x1c6f56 == "bqRecord") {
        continue;
      }
      if ($.taskList[_0x1c6f56].completionFlag) {
        console.log(_0x1c6f56 + " ---已完成");
        continue;
      }
      let _0x48b9a0 = $.taskList[_0x1c6f56].assignmentTimesLimit - $.taskList[_0x1c6f56].completionCnt;
      switch (_0x1c6f56) {
        case "assistTaskDetail":
          console.log("邀请好友 --- " + $.taskList[_0x1c6f56].completionCnt + "/" + $.taskList[_0x1c6f56].assignmentTimesLimit);
          break;
        case "browseShop":
          for (let _0x4333ad of $.taskList.browseShop.recordList) {
            if (_0x48b9a0 == 0) {
              break;
            }
            if (_0x4333ad.status == 2) {
              continue;
            }
            $.itemId = _0x4333ad.itemId || "";
            $.Type = "browseShop" || "";
            console.log("浏览  " + _0x4333ad.shopName || "");
            await bdy_0x45bf0b("saveTask");
            await $.wait(parseInt(Math.random() * 1000 + 800, 10));
            _0x48b9a0--;
          }
          break;
        case "followShop":
          for (let _0x5f1318 of $.taskList.followShop.recordList) {
            if (_0x48b9a0 == 0) {
              break;
            }
            if (_0x5f1318.status == 2) {
              continue;
            }
            $.itemId = _0x5f1318.itemId || "";
            $.Type = "followShop" || "";
            console.log("关注 " + _0x5f1318.shopName || "");
            await bdy_0x45bf0b("saveTask");
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            _0x48b9a0--;
          }
          break;
        case "shoppingActivity":
          for (let _0x59804c of $.taskList.shoppingActivity.recordList) {
            if (_0x48b9a0 == 0) {
              break;
            }
            if (_0x59804c.status == 2) {
              continue;
            }
            $.itemId = _0x59804c.itemId || "";
            $.Type = "shoppingActivity" || "";
            console.log("浏览会场 " + _0x59804c.title || "");
            await bdy_0x45bf0b("saveTask");
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            _0x48b9a0--;
          }
          break;
        case "brandMemberList":
          for (let _0x491686 of $.taskList.brandMemberList.recordList) {
            if (_0x48b9a0 == 0) {
              break;
            }
            if (_0x491686.status == 2) {
              continue;
            }
            $.itemId = _0x491686.itemId || "";
            $.Type = "brandMemberList" || "";
            console.log("不开卡尝试领取奖励 " + _0x491686.title || "");
            await bdy_0x45bf0b("saveTask");
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            _0x48b9a0--;
          }
          break;
      }
    }
    await bdy_0x45bf0b("getItemId");
    await $.wait(parseInt(Math.random() * 1000 + 500, 10));
    await $.wait(parseInt(Math.random() * 1000 + 500, 10));
    await bdy_0x45bf0b("activityContent");
    await $.wait(parseInt(Math.random() * 500 + 500, 10));
    console.log("\n吃货币余额：" + $.score + ",可抽奖次数:" + $.score);
    if (bdy_0x28ebbc != 0) {
      let _0x495e3d = Math.min($.score, bdy_0x28ebbc);
      console.log("\n去抽奖(" + _0x495e3d + "次)...");
      for (let _0x22e1b5 = 1; _0x22e1b5 <= _0x495e3d; _0x22e1b5++) {
        console.log("第 " + _0x22e1b5 + " 次抽奖:");
        await bdy_0x45bf0b("startDraw");
        if ($.runFalag == false) {
          break;
        }
        await $.wait(parseInt(Math.random() * 1500 + 1000, 10));
      }
    } else {
      console.log("\n已设置不抽奖！");
    }
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    $.index == 1 && ($.shareUuid = "ffacb1769a5e45bc88ec90bd053f3927", $.helpId = $.helpIdnow, console.log("\n后面的号都会助力 -> " + $.shareUuid));
await $.wait(parseInt(Math.random() * 1000 + 500, 10));
  } catch (_0x5f30c5) {
    console.log(_0x5f30c5);
  }
}
async function bdy_0x45bf0b(_0x50f9cc) {
  if ($.outFlag) {
    return;
  }
  let _0x1d348d = "https://517chjhdcpkf2-2404-dz.isvjcloud.com",
    _0x4f7660 = "",
    _0x44cd2a = "",
    _0x3d886a = "POST";
  switch (_0x50f9cc) {
    case "isvObfuscator":
      _0x44cd2a = "https://api.m.jd.com/client.action?functionId=isvObfuscator";
      _0x4f7660 = "";
      break;
    case "getSimpleActInfoVo":
      _0x44cd2a = _0x1d348d + "/dz/common/getSimpleActInfoVo";
      _0x4f7660 = "activityId=" + $.activityId;
      break;
    case "getSystemConfigForNew":
      _0x44cd2a = _0x1d348d + "/wxCommonInfo/getSystemConfigForNew";
      _0x4f7660 = "activityId=" + $.activityId + "&activityType=99&pin=";
      break;
    case "getMyPing":
      _0x44cd2a = _0x1d348d + "/customer/getMyPing";
      _0x4f7660 = "userId=" + ($.userId || "") + "&token=" + $.Token + "&fromType=APP";
      break;
    case "getMyCidPing":
      _0x44cd2a = _0x1d348d + "/customer/getMyCidPing";
      _0x4f7660 = "userId=" + ($.userId || "") + "&token=" + $.Token + "&fromType=APP&activityId=" + $.activityId + "&pin=";
      break;
    case "init":
      _0x44cd2a = _0x1d348d + "/dingzhi/taskact/common/init";
      _0x4f7660 = "activityId=" + $.activityId + "&dzActivityType=0&pin=";
      break;
    case "accessLogWithAD":
      _0x44cd2a = _0x1d348d + "/common/accessLogWithAD";
      let _0x29957d = _0x1d348d + "/m/unite/dzlh0001/?activityId=" + $.activityId + "&venderId=" + $.userId + "&adSource=&shareUuid=" + $.shareUuid + "&sid=&un_area=";
      _0x4f7660 = "venderId=" + ($.userId || "") + "&code=99&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(_0x29957d) + "&subType=app&adSource=";
      break;
    case "getUserInfo":
      _0x44cd2a = _0x1d348d + "/wxActionCommon/getUserInfo";
      _0x4f7660 = "pin=" + encodeURIComponent($.Pin);
      break;
    case "activityContent":
      _0x44cd2a = _0x1d348d + "/dingzhi/foodie/active/activityContent";
      _0x4f7660 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&pinImg=" + encodeURIComponent($.attrTouXiang) + "&nick=" + encodeURIComponent($.nickname) + "&cjyxPin=&cjhyPin=&shareUuid=" + $.shareUuid;
      break;
    case "agreement":
      _0x44cd2a = _0x1d348d + "/dingzhi/foodie/active/agreement";
      _0x4f7660 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid;
      break;
    case "startDraw":
      _0x44cd2a = _0x1d348d + "/dingzhi/foodie/active/startDraw";
      _0x4f7660 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid;
      break;
    case "getMyTask":
      _0x44cd2a = _0x1d348d + "/dingzhi/foodie/active/getMyTask";
      _0x4f7660 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid;
      break;
    case "saveTask":
      _0x44cd2a = _0x1d348d + "/dingzhi/foodie/active/saveTask";
      _0x4f7660 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&&recordType=" + $.Type + "&itemId=" + $.itemId;
      break;
    case "getItemId":
      _0x44cd2a = _0x1d348d + "/dingzhi/foodie/active/getItemId";
      _0x4f7660 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid;
      break;
    case "getTaskStatus":
      _0x44cd2a = _0x1d348d + "/dingzhi/foodie/active/getTaskStatus";
      _0x4f7660 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid;
      break;
    case "assist":
      _0x44cd2a = _0x1d348d + "/dingzhi/foodie/active/assist";
      _0x4f7660 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid + "&itemId=" + (encodeURIComponent($.helpId) || "");
      break;
    default:
      console.log("错误" + _0x50f9cc);
  }
  let _0x56857b = bdy_0x143311(_0x44cd2a, _0x4f7660, _0x3d886a);
  return new Promise(async _0x577468 => {
    $.dpost(_0x56857b, async (_0x47bc41, _0x320701, _0x4a9c16) => {
      try {
        if (_0x47bc41) {
          if (_0x320701 && typeof _0x320701.statusCode != "undefined") {
            if (_0x320701.statusCode == 493) {
              if (bdy_0x318e06 < 6) {
                bdy_0x318e06++;
                await bdy_0x45bf0b(_0x50f9cc);
                return;
              }
              console.log("ip可能被限制，过10分钟后再执行脚本\n");
              $.outFlag = true;
            }
          }
          console.log("" + $.toStr(_0x47bc41, _0x47bc41));
        } else {
          if (_0x4a9c16.includes("doctype") && bdy_0x318e06 < 6) {
            bdy_0x318e06++;
            await bdy_0x45bf0b(_0x50f9cc);
            return;
          }
          bdy_0x318e06 = 0;
          bdy_0x86448(_0x320701);
          bdy_0x3b6a2a(_0x50f9cc, _0x4a9c16);
        }
      } catch (_0x304e7c) {
        console.log(_0x304e7c, _0x320701);
      } finally {
        _0x577468();
      }
    });
  });
}
switch ($.type) {
  case "nb":
    const bdy_0x3f2b24 = {
      nb: nb
    };
    _0xf1f6le = bdy_0x3f2b24;
    break;
}
async function bdy_0x3b6a2a(_0x13b945, _0xb77048) {
  let _0x27a743 = "";
  try {
    (_0x13b945 != "accessLogWithAD" || _0x13b945 != "drawContent") && _0xb77048 && (_0x27a743 = JSON.parse(_0xb77048));
  } catch (_0x25c953) {
    console.log(_0x13b945 + " 执行任务异常");
  }
  try {
    switch (_0x13b945) {
      case "isvObfuscator":
        if (typeof _0x27a743 == "object") {
          _0x27a743.errcode == 0 ? typeof _0x27a743.token != "undefined" && ($.Token = _0x27a743.token) : _0x27a743.message ? console.log("isvObfuscator " + (_0x27a743.message || "")) : console.log(_0xb77048);
        }
        break;
      case "getSimpleActInfoVo":
        if (typeof _0x27a743 == "object") {
          _0x27a743.result && _0x27a743.result === true ? (typeof _0x27a743.data.shopId != "undefined" && ($.shopId = _0x27a743.data.shopId), typeof _0x27a743.data.venderId != "undefined" && ($.venderId = _0x27a743.data.venderId)) : _0x27a743.errorMessage ? console.log("" + _0x13b945 + (_0x27a743.errorMessage || "")) : console.log("" + _0x13b945 + _0xb77048);
        }
        break;
      case "init":
        _0x27a743.result == true && _0x27a743.data && ($.userId = _0x27a743.data.userId, $.venderId = _0x27a743.data.venderId, $.jdActivityId = _0x27a743.data.jdActivityId, $.activityType = _0x27a743.data.activityType, $.endTime = _0x27a743.data.endTime);
        break;
      case "getMyPing":
        if (typeof _0x27a743 == "object") {
          _0x27a743.result && _0x27a743.result === true ? (_0x27a743.data && typeof _0x27a743.data.secretPin != "undefined" && ($.Pin = _0x27a743.data.secretPin), _0x27a743.data && typeof _0x27a743.data.nickname != "undefined" && ($.nickname = _0x27a743.data.nickname)) : _0x27a743.errorMessage ? console.log("" + _0x13b945 + (_0x27a743.errorMessage || "")) : console.log("" + _0x13b945 + _0xb77048);
        }
        break;
      case "getMyCidPing":
        if (typeof _0x27a743 == "object") {
          _0x27a743.result && _0x27a743.result === true ? (_0x27a743.data && typeof _0x27a743.data.secretPin != "undefined" && ($.Pin = _0x27a743.data.secretPin), _0x27a743.data && typeof _0x27a743.data.nickname != "undefined" && ($.nickname = _0x27a743.data.nickname)) : _0x27a743.errorMessage ? console.log("" + _0x13b945 + (_0x27a743.errorMessage || "")) : console.log("" + _0x13b945 + _0xb77048);
        }
        break;
      case "getUserInfo":
        if (typeof _0x27a743 == "object") {
          _0x27a743.result && _0x27a743.result === true ? _0x27a743.data && typeof _0x27a743.data.yunMidImageUrl != "undefined" && ($.attrTouXiang = _0x27a743.data.yunMidImageUrl || "https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png") : _0x27a743.errorMessage ? console.log("" + _0x13b945 + (_0x27a743.errorMessage || "")) : console.log("" + _0x13b945 + _0xb77048);
        }
        break;
      case "activityContent":
        if (typeof _0x27a743 == "object") {
          if (_0x27a743.result && _0x27a743.result === true) {
            $.activityName = _0x27a743.data.activityName;
            $.score = _0x27a743.data.score || 0;
            $.actorUuid = _0x27a743.data.actorUuid || "";
            $.jdActivityId = _0x27a743.data.jdActivityId;
            $.endTime = _0x27a743.data.endTime || _0x27a743.data.activityVo && _0x27a743.data.activityVo.endTime || _0x27a743.data.activity.endTime || 0;
            $.hasEnd = _0x27a743.data.isEnd || false;
            $.shopId = _0x27a743.data.shopId;
            $.venderId = _0x27a743.data.venderId;
            $.challenge = _0x27a743.data.challenge;
          } else {
            if (_0x27a743.errorMessage.includes("结束")) {
              $.hasEnd = true;
            } else {
              _0x27a743.errorMessage ? console.log("" + _0x13b945 + (_0x27a743.errorMessage || "")) : console.log("" + _0x13b945 + _0xb77048);
            }
          }
        }
        break;
      case "saveTask":
        if (typeof _0x27a743 == "object") {
          if (_0x27a743.result && _0x27a743.result === true) {
            typeof _0x27a743.data == "object" ? console.log("任务完成，+" + _0x27a743.data.addScore + " 吃货币") : console.log(_0xb77048);
          } else {
            _0x27a743.errorMessage ? ($.runFalag = false, console.log(_0x27a743.errorMessage || "")) : console.log(_0xb77048);
          }
        } else {
          console.log(_0xb77048);
        }
        break;
      case "startDraw":
        if (typeof _0x27a743 == "object") {
          if (_0x27a743.result && _0x27a743.result === true) {
            if (typeof _0x27a743.data == "object") {
              if (_0x27a743.data.drawStatus) {
                switch (_0x27a743.data?.["value"]?.["rewardType"]) {
                  case 35:
                    console.log("恭喜获得 " + _0x27a743.data.value.prizeName + " 🤑");
                    break;
                  default:
                    console.log("----" + _0x27a743.data.value.prizeName);
                    break;
                }
              } else {
                console.log("空气 💨");
              }
            } else {
              console.log(_0xb77048);
            }
          } else {
            _0x27a743.errorMessage ? ($.runFalag = false, console.log("" + (_0x27a743.errorMessage || ""))) : console.log("" + _0x27a743);
          }
        } else {
          console.log("" + _0x27a743);
        }
        break;
      case "assist":
        if (typeof _0x27a743 == "object") {
          _0x27a743.result && _0x27a743.result === true && _0x27a743.data;
        }
        break;
      case "getMyTask":
        if (typeof _0x27a743 == "object") {
          _0x27a743.result && _0x27a743.result === true && _0x27a743.data ? $.taskList = _0x27a743.data : $.taskList = [];
        }
        break;
      case "getItemId":
        if (typeof _0x27a743 == "object") {
          _0x27a743.result == true && _0x27a743.data ? $.helpIdnow = _0x27a743.data.itemId : console.log(_0xb77048);
        }
        break;
      case "accessLogWithAD":
      case "drawContent":
      case "getTaskStatus":
      case "agreement":
      case "getSystemConfigForNew":
        break;
      default:
        console.log(_0x13b945 + " -> " + _0xb77048);
    }
    typeof _0x27a743 == "object" && _0x27a743.errorMessage && _0x27a743.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
  } catch (_0x15b6c4) {
    console.log(_0x13b945 + " " + _0x15b6c4);
  }
}
function bdy_0x143311(_0x555883, _0x5842ea, _0x2db1df = "POST") {
  const _0x210b11 = {
    Accept: "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Content-Type": "application/x-www-form-urlencoded",
    Cookie: bdy_0x2d6368,
    "User-Agent": $.UA
  };
  _0x555883.indexOf("https://517chjhdcpkf2-2404-dz.isvjcloud.com") > -1 && (_0x210b11.Referer = bdy_0x2bdbde, _0x210b11.Cookie = "AUTH_C_USER=" + ($.Pin || "") + ";" + bdy_0x159760);
  const _0x5551c0 = {
    url: _0x555883,
    method: _0x2db1df,
    headers: _0x210b11,
    body: _0x5842ea,
    timeout: 30000
  };
  return _0x5551c0;
}
function bdy_0x17cbca() {
  return new Promise(async _0x4ca29d => {
    const _0x34f9fb = {
      Accept: "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie: bdy_0x2d6368,
      Referer: bdy_0x2bdbde,
      "User-Agent": $.UA
    };
    let _0x4afc8f = {
      url: "https://517chjhdcpkf2-2404-dz.isvjcloud.com/wxCommonInfo/token?t=" + Date.now(),
      followRedirect: false,
      headers: _0x34f9fb,
      timeout: 30000
    };
    $.dget(_0x4afc8f, async (_0x558a9b, _0x1a7826, _0x323aba) => {
      try {
        if (_0x558a9b) {
          if (_0x1a7826 && typeof _0x1a7826.statusCode != "undefined") {
            _0x1a7826.statusCode == 493;
          }
          console.log("" + $.toStr(_0x558a9b));
        } else {
          bdy_0x86448(_0x1a7826);
        }
      } catch (_0x3f686d) {
        $.logErr(_0x3f686d, _0x1a7826);
      } finally {
        _0x4ca29d();
      }
    });
  });
}
function bdy_0x86448(_0x379dde) {
  if (_0x379dde.headers["set-cookie"]) {
    bdy_0x2d6368 = originCookie + ";";
    for (let _0x4f78e3 of _0x379dde.headers["set-cookie"]) {
      bdy_0x3f900c[_0x4f78e3.split(";")[0].substr(0, _0x4f78e3.split(";")[0].indexOf("="))] = _0x4f78e3.split(";")[0].substr(_0x4f78e3.split(";")[0].indexOf("=") + 1);
    }
    for (const _0x924c14 of Object.keys(bdy_0x3f900c)) {
      bdy_0x2d6368 += _0x924c14 + "=" + bdy_0x3f900c[_0x924c14] + ";";
    }
    bdy_0x159760 = bdy_0x2d6368;
  }
}
async function bdy_0x581d64() {
  $.UA = "jdapp;iPhone;10.1.5;13.1.2;" + bdy_0x4ff4f9(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}
function bdy_0x4ff4f9(_0x70bd0e) {
  _0x70bd0e = _0x70bd0e || 32;
  let _0x340bff = "abcdef0123456789",
    _0x34e7c0 = _0x340bff.length,
    _0x852df0 = "";
  for (i = 0; i < _0x70bd0e; i++) {
    _0x852df0 += _0x340bff.charAt(Math.floor(Math.random() * _0x34e7c0));
  }
  return _0x852df0;
}
function bdy_0x51fccc(_0x5c4421) {
  if (typeof _0x5c4421 == "string") {
    try {
      return JSON.parse(_0x5c4421);
    } catch (_0x16e336) {
      console.log(_0x16e336);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
async function bdy_0x5b34cf() {
  if (!$.joinVenderId) {
    return;
  }
  return new Promise(async _0x3a845e => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    $.shopactivityId = "";
    const _0x282cf2 = {
      venderId: "" + $.joinVenderId + "",
      shopId: "" + $.joinVenderId + "",
      bindByVerifyCodeFlag: 1,
      registerExtend: {},
      writeChildFlag: 0,
      channel: 406
    };
    let _0x50966d = _0x282cf2;
    $.shopactivityId == "" && delete _0x50966d.activityId;
    const _0x1dbfad = {
      appId: "27004",
      fn: "bindWithVender",
      body: _0x50966d,
      apid: "shopmember_m_jd_com",
      ver: "9.2.0",
      cl: "H5",
      user: $.UserName,
      code: 0,
      ua: $.UA
    };
    _0x50966d = await bdy_0x230bb1.getbody(_0x1dbfad);
    const _0x29fc4c = {
      accept: "*/*",
      "accept-encoding": "gzip, deflate, br",
      "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
      cookie: bdy_0x2d6368,
      origin: "https://shopmember.m.jd.com/",
      "user-agent": $.UA
    };
    const _0x5f40c8 = {
      url: "https://api.m.jd.com/client.action?" + _0x50966d + "&uuid=88888",
      headers: _0x29fc4c,
      timeout: 30000
    };
    $.dget(_0x5f40c8, async (_0x4dcdd0, _0x5338f0, _0x4a7254) => {
      try {
        _0x4a7254 = _0x4a7254 && _0x4a7254.match(/jsonp_.*?\((.*?)\);/) && _0x4a7254.match(/jsonp_.*?\((.*?)\);/)[1] || _0x4a7254;
        let _0x1fa220 = $.toObj(_0x4a7254, _0x4a7254);
        if (_0x1fa220 && typeof _0x1fa220 == "object") {
          if (_0x1fa220 && _0x1fa220.success === true) {
            console.log("    " + _0x1fa220.message);
            $.errorJoinShop = _0x1fa220.message;
            if (_0x1fa220.result && _0x1fa220.result.giftInfo) {
              for (let _0x573b9a of _0x1fa220.result.giftInfo.giftList) {
                console.log("入会获得:" + _0x573b9a.discountString + _0x573b9a.prizeName + _0x573b9a.secondLineDesc);
              }
            }
          } else {
            _0x1fa220 && typeof _0x1fa220 == "object" && _0x1fa220.message ? ($.errorJoinShop = _0x1fa220.message, console.log("" + (_0x1fa220.message || ""))) : console.log(_0x4a7254);
          }
        } else {
          console.log(_0x4a7254);
        }
      } catch (_0x12dc64) {
        $.logErr(_0x12dc64, _0x5338f0);
      } finally {
        _0x3a845e();
      }
    });
  });
}
async function bdy_0x2be7d6() {
  return new Promise(async _0x598eec => {
    const _0x287f63 = {
      venderId: $.joinVenderId,
      payUpShop: true,
      queryVersion: "10.5.2",
      appid: "ef79a",
      needSecurity: true,
      bizId: "shop_view_app",
      channel: 406
    };
    let _0x91e99f = _0x287f63;
    const _0x4fd1fa = {
      appId: "ef79a",
      fn: "getShopOpenCardInfo",
      body: _0x91e99f,
      apid: "jd_shop_member",
      ver: "9.2.0",
      cl: "H5",
      user: $.UserName,
      code: 0,
      ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
    };
    _0x91e99f = await bdy_0x230bb1.getbody(_0x4fd1fa);
    const _0x543f66 = {
      accept: "*/*",
      "accept-encoding": "gzip, deflate, br",
      "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
      cookie: bdy_0x2d6368,
      origin: "https://shopmember.m.jd.com/",
      "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
    };
    const _0x21d334 = {
      url: "https://api.m.jd.com/client.action?" + _0x91e99f + "&uuid=88888",
      headers: _0x543f66,
      timeout: 60000
    };
    $.get(_0x21d334, async (_0xbd973a, _0x5f5821, _0x38b0c6) => {
      try {
        _0x38b0c6 = _0x38b0c6 && _0x38b0c6.match(/jsonp_.*?\((.*?)\);/) && _0x38b0c6.match(/jsonp_.*?\((.*?)\);/)[1] || _0x38b0c6;
        let _0x4f6e66 = $.toObj(_0x38b0c6, _0x38b0c6);
        _0x4f6e66 && typeof _0x4f6e66 == "object" ? _0x4f6e66 && _0x4f6e66.success == true && (console.log("去加入 -> " + (_0x4f6e66.result[0].shopMemberCardInfo.venderCardName || "")), $.shopactivityId = _0x4f6e66.result[0].interestsRuleList && _0x4f6e66.result[0].interestsRuleList[0] && _0x4f6e66.result[0].interestsRuleList[0].interestsInfo && _0x4f6e66.result[0].interestsRuleList[0].interestsInfo.activityId || "") : console.log(_0x38b0c6);
      } catch (_0x4db135) {
        $.logErr(_0x4db135, _0x5f5821);
      } finally {
        _0x598eec();
      }
    });
  });
}
function bdy_0x3b8bf6(_0x5aa362, _0x3d4db4) {
  return Math.floor(Math.random() * (_0x3d4db4 - _0x5aa362)) + _0x5aa362;
}
function bdy_0x283412(_0x29f5f5 = +new Date()) {
  var _0x1649ce = new Date(_0x29f5f5 + 28800000);
  return _0x1649ce.toJSON().substr(0, 19).replace("T", " ").replace(/-/g, "/");
}
function bdy_0x587e81() {
  const _0x41e6b7 = {
    url: "https://src-dy-server-dmujhfwxmu.cn-hangzhou.fcapp.run/chb",
    timeout: 30000
  };
  return new Promise(_0x2e645a => {
    $.post(_0x41e6b7, async (_0x689425, _0x342c22, _0xdc8b53) => {
      try {
        if (!_0x689425) {
          if (_0xdc8b53) {
            _0xdc8b53 = JSON.parse(_0xdc8b53);
            if (_0xdc8b53.code === 200) {
              bdy_0x561537 = _0xdc8b53.data;
            }
          }
        }
      } catch (_0x496d84) {} finally {
        _0x2e645a(bdy_0x561537);
      }
    });
  });
}
function bdy_0x1a1150() {
  return new Promise(_0x2eb9f8 => {
    const _0x259d3c = {
      Cookie: bdy_0x2d6368,
      referer: "https://h5.m.jd.com/",
      "User-Agent": $.UA
    };
    const _0xa55a9d = {
      url: "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      headers: _0x259d3c,
      timeout: 10000
    };
    $.get(_0xa55a9d, (_0x3d757b, _0x346a30, _0xa65bc4) => {
      try {
        if (_0xa65bc4) {
          _0xa65bc4 = JSON.parse(_0xa65bc4);
          if (!(_0xa65bc4.islogin === "1")) {
            _0xa65bc4.islogin === "0" && ($.isLogin = false);
          }
        }
      } catch (_0x2aa276) {
        console.log(_0x2aa276);
      } finally {
        _0x2eb9f8();
      }
    });
  });
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
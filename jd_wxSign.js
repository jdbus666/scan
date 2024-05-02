/*
活动名称：批量店铺签到 · 超级无线/超级会员
活动链接：https://lzkj-isv.isvjd.com/sign/signActivity2?activityId=<活动id>
        https://lzkj-isv.isvjd.com/sign/sevenDay/signActivity?activityId=<活动id>
        https://cjhy-isv.isvjcloud.com/sign/signActivity?activityId=<活动id>
        https://cjhy-isv.isvjcloud.com/sign/sevenDay/signActivity?activityId=<活动id>
环境变量：jd_wxSign_sign_lzkj_Ids // 超级无线签到有礼活动id，多个用英文逗号分割
        jd_wxSign_sevenDay_lzkj_Ids // 超级无线7日签到活动id，多个用英文逗号分割
        jd_wxSign_sign_cjhy_Ids // 超级会员签到有礼活动id，多个用英文逗号分割
        jd_wxSign_sevenDay_cjhy_Ids // 超级会员7日签到活动id，多个用英文逗号分割
        jd_wxSign_lzkjInterval // 自定义超级无线活动签到间隔时长（整数，单位毫秒），默认500ms
        jd_wxSign_cjhyInterval // 自定义超级会员活动签到间隔时长（整数，单位毫秒），默认1000ms
        jd_wxSign_lzkjFilter // 账号pin过滤（跳过不跑），多个用户名用@分割
        jd_wxSign_cjhyFilter // 账号pin过滤（跳过不跑），多个用户名用@分割
        jd_wxSign_notify // 是否推送通知（true/false），默认不推送
        jd_wxSign_maxRetry // 签到失败时的最大重试次数（整数），默认0
        jd_wxSign_forbiddenQuit // 当连续请求IP被限制时是否跳出即停止运行脚本（true/false），默认停止运行

不同环境变量对应不同链接类型注意区分，官方接口垃圾，中奖一切随缘，打印仅供参考
脚本不判断黑号（响应擦肩），请主动设置过滤
此脚本为批量签到工具本，与 jd_shopSign.js 功能一致

cron:1 1 1 1 * jd_wxSign.js

*/

const $ = new Env('批量店铺签到（超级无线/超级会员）')
const jdCookie = require("./jdCookie"),
  common = require("./utils/Rebels_jdCommon"),
  notify = require("./utils/Rebels_sendJDNotify"),
  getToken = require("./utils/Rebels_Token"),
  {
    wuxianDefense
  } = require("./utils/Rebels_H"),
  {
    wuxian_savePrize
  } = require("./utils/Rebels_savePrize");
console.log("");
console.log("==========" + $.name + "变量说明==========");
console.log("jd_wxSign_sign_lzkj_Ids // 超级无线签到有礼活动id");
console.log("jd_wxSign_sevenDay_lzkj_Ids // 超级无线7日签到活动id");
console.log("jd_wxSign_sign_cjhy_Ids // 超级会员签到有礼活动id");
console.log("jd_wxSign_sevenDay_cjhy_Ids // 超级会员7日签到活动id");
console.log("jd_wxSign_lzkjInterval // 自定义超级无线活动签到间隔");
console.log("jd_wxSign_cjhyInterval // 自定义超级会员活动签到间隔");
console.log("jd_wxSign_lzkjFilter // 账号pin过滤（跳过不跑）");
console.log("jd_wxSign_cjhyFilter // 账号pin过滤（跳过不跑）");
console.log("jd_wxSign_notify // 是否推送通知（true/false），默认不推送");
console.log("jd_wxSign_maxRetry // 签到失败时的最大重试次数");
console.log("jd_wxSign_forbiddenQuit // 当连续请求IP被限制时是否跳出");
console.log("==========" + $.name + "提示结束==========");
console.log("");
const lzkj_signInterval = process.env.jd_wxSign_lzkjInterval || "500",
  cjhy_signInterval = process.env.jd_wxSign_cjhyInterval || "1000",
  isNotify = (process.env.jd_wxSign_notify || process.env.jd_wxSign_Notify) === "true";
let activityIdList1 = (process.env.jd_wxSign_sevenDay_lzkj_Ids || process.env.jd_wxSign_sevenDay_lzkj_Ids || "").split(","),
  activityIdList2 = (process.env.jd_wxSign_sign_lzkj_Ids || process.env.jd_wxSign_sign_lzkj_Ids || "").split(","),
  activityIdList3 = (process.env.jd_wxSign_sevenDay_cjhy_Ids || process.env.jd_wxSign_sevenDay_cjhy_Ids || "").split(","),
  activityIdList4 = (process.env.jd_wxSign_sign_cjhy_Ids || process.env.jd_wxSign_sign_cjhy_Ids || "").split(","),
  lzkjFilter = (process.env.jd_wxSign_lzkjFilter || "").split("@"),
  cjhyFilter = (process.env.jd_wxSign_cjhyFilter || "").split("@");
const forbiddenQuit = !(process.env.jd_wxSign_forbiddenQuit === "false");
let signFailMaxRetryTimes = process.env.jd_wxSign_maxRetry || "0";
const maxForbiddenRetryTimes = 5;
let cookie = "",
  originCookie = "",
  activityCookie = "";
const cookiesArr = Object.keys(jdCookie).map(l1i1I => jdCookie[l1i1I]).filter(l1llll => l1llll);
!cookiesArr[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  if (activityIdList1.length > 0) activityIdList1 = [...new Set(activityIdList1.filter(liiil1 => liiil1 !== ""))];
  if (activityIdList2.length > 0) activityIdList2 = [...new Set(activityIdList2.filter(lllII => lllII !== ""))];
  if (activityIdList3.length > 0) activityIdList3 = [...new Set(activityIdList3.filter(l11iII => l11iII !== ""))];
  if (activityIdList4.length > 0) activityIdList4 = [...new Set(activityIdList4.filter(l1i11i => l1i11i !== ""))];
  try {
    const l11iI1 = parseInt(signFailMaxRetryTimes);
    signFailMaxRetryTimes = l11iI1 > 0 ? l11iI1 : 0;
  } catch {
    signFailMaxRetryTimes = 0;
  }
  if (activityIdList1.length <= 0 && activityIdList2.length <= 0 && activityIdList3.length <= 0 && activityIdList4.length <= 0) {
    console.log("⚠ 请先定义必要的环境变量后再运行脚本！");
    return;
  }
  notify.config({
    "title": $.name
  });
  for (let lI111i = 0; lI111i < cookiesArr.length; lI111i++) {
    $.index = lI111i + 1;
    cookie = cookiesArr[lI111i];
    originCookie = cookiesArr[lI111i];
    $.UserName = decodeURIComponent(common.getCookieValue(cookie, "pt_pin"));
    $.UA = common.genUA($.UserName);
    $.UUID = common.genUuid("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    $.te = Math.floor(Math.random() * 9000) + 1000;
    $.message = notify.create($.index, $.UserName);
    $.nickName = "";
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
    await Main();
    if ($.lzkjOutFlag && $.cjhyOutFlag) {
      break;
    }
  }
  isNotify && notify.getMessage() && (notify.updateContent(notify.content), await notify.push());
})().catch(I1iI1I => $.logErr(I1iI1I)).finally(() => $.done());
async function Main() {
  try {
    $.jdToken = null;
    $.jdToken = await getToken(originCookie, "https://lzkj-isv.isvjd.com");
    if (!$.jdToken) {
      console.log("获取[Token]失败！");
      $.message.fix("获取[Token]失败");
      return;
    }
    if (activityIdList1.length >= 1 || activityIdList2.length >= 1) {
      if (lzkjFilter.length > 0 && (lzkjFilter.includes($.UserName) || lzkjFilter.includes(encodeURIComponent($.UserName)))) console.log("已设置跳过运行当前账号 - 超级无线");else {
        $.secretPin = null;
        $.formatPin = null;
        $.baseUrl = "https://lzkj-isv.isvjd.com";
        $.hostname = "lzkj-isv.isvjd.com";
        $.activityMode = "lzkj";
        $.origin = $.baseUrl;
        try {
          const i1I1l = parseInt(lzkj_signInterval),
            i1I1i = i1I1l < 10 && i1I1l > 0 ? i1I1l * 1000 : i1I1l;
          $.signIntervalTimes = i1I1i;
        } catch {
          $.signIntervalTimes = parseInt(lzkj_signInterval);
        }
        if (activityIdList2.length >= 1 && !$.lzkjOutFlag) {
          $.needRemoveActivityIds = [];
          console.log("❖ 签到类型（lzkj signActivity2）\n");
          await lzkjSign(activityIdList2, "/sign/signActivity2", "signUp");
          $.needRemoveActivityIds.length > 0 && (console.log("\n建议移除的活动："), $.needRemoveActivityIds.forEach(Ilill => {
            console.log(Ilill);
          }), activityIdList2 = activityIdList2.filter(I1ll1I => !$.needRemoveActivityIds.includes(I1ll1I)));
          console.log("");
        }
        $.outFlag && ($.outFlag = false, $.lzkjOutFlag = true);
        if (activityIdList1.length >= 1 && !$.lzkjOutFlag) {
          $.needRemoveActivityIds = [];
          console.log("❖ 签到类型（lzkj sevenDay）\n");
          await lzkjSign(activityIdList1, "/sign/sevenDay/signActivity", "sevenDay_signUp");
          $.needRemoveActivityIds.length > 0 && (console.log("\n建议移除的活动："), $.needRemoveActivityIds.forEach(l1iIii => {
            console.log(l1iIii);
          }), activityIdList1 = activityIdList1.filter(illllI => !$.needRemoveActivityIds.includes(illllI)));
          console.log("");
        }
        $.outFlag && ($.outFlag = false, $.lzkjOutFlag = true);
      }
    }
    if (activityIdList3.length >= 1 || activityIdList4.length >= 1) {
      if (cjhyFilter.length > 0 && (cjhyFilter.includes($.UserName) || cjhyFilter.includes(encodeURIComponent($.UserName)))) console.log("已设置跳过运行当前账号 - 超级会员");else {
        $.secretPin = null;
        $.formatPin = null;
        $.baseUrl = "https://cjhy-isv.isvjcloud.com";
        $.hostname = "cjhy-isv.isvjcloud.com";
        $.activityMode = "cjhy";
        $.origin = $.baseUrl;
        try {
          const ii1l11 = parseInt(cjhy_signInterval),
            IIIIii = ii1l11 < 10 && ii1l11 > 0 ? ii1l11 * 1000 : ii1l11;
          $.signIntervalTimes = IIIIii;
        } catch {
          $.signIntervalTimes = parseInt(cjhy_signInterval);
        }
        activityIdList4.length >= 1 && !$.cjhyOutFlag && ($.needRemoveActivityIds = [], console.log("❖ 签到类型（cjhy signActivity）\n"), await cjhySign(activityIdList4, "/sign/signActivity", "signUp"), $.needRemoveActivityIds.length > 0 && (console.log("\n建议移除的活动："), $.needRemoveActivityIds.forEach(I1ll11 => {
          console.log(I1ll11);
        }), activityIdList4 = activityIdList4.filter(Iii1Il => !$.needRemoveActivityIds.includes(Iii1Il))), console.log(""));
        $.outFlag && ($.outFlag = false, $.cjhyOutFlag = true);
        if (activityIdList3.length >= 1 && !$.cjhyOutFlag) {
          $.needRemoveActivityIds = [];
          console.log("❖ 签到类型（cjhy sevenDay）\n");
          await cjhySign(activityIdList3, "/sign/sevenDay/signActivity", "sevenDay_signUp");
          if ($.needRemoveActivityIds.length > 0) {
            console.log("\n建议移除的活动：");
            $.needRemoveActivityIds.forEach(llIl1 => {
              console.log(llIl1);
            });
            activityIdList3 = activityIdList3.filter(IIIIiI => !$.needRemoveActivityIds.includes(IIIIiI));
          }
        }
        $.outFlag && ($.outFlag = false, $.cjhyOutFlag = true);
      }
    }
  } catch (ii1l1I) {
    console.log("❌ 脚本运行遇到了错误\n" + ii1l1I);
  }
}
async function lzkjSign(lI1lII, lIill1, iiI1i1) {
  activityCookie = "";
  $.LZ_AES_PIN = "";
  let iIiil1 = 0;
  I1Ilil: for (let lilil1 = 0; lilil1 < lI1lII.length; lilil1++) {
    $.activityId = lI1lII[lilil1];
    $.activityUrl = "" + $.baseUrl + lIill1 + "?activityId=" + $.activityId;
    if (lilil1 === 0) {
      await getFirstLZCK($.activityUrl);
      if ($.skipRun) {
        $.skipRun = false;
        return;
      }
      await $.wait($.signIntervalTimes);
      if (!$.secretPin) {
        $.venderId = null;
        await sendRequest("getSimpleActInfoVo");
        await $.wait($.signIntervalTimes);
        await sendRequest("getMyPing");
        await $.wait($.signIntervalTimes);
      }
    }
    iIiil1 += 1;
    if (iIiil1 >= 5) {
      iIiil1 = 0;
      await getFirstLZCK($.activityUrl);
      if ($.skipRun) {
        $.skipRun = false;
        return;
      }
      await $.wait($.signIntervalTimes);
    }
    if (!$.secretPin) {
      console.log("未能获取用户鉴权信息！");
      $.message.insert("未能获取用户鉴权信息");
      break;
    }
    $.signRequestFailTimes = 0;
    $.signRequestForbbiden = false;
    $.signErrorMsg = "";
    $.signStop = false;
    $.signSuccess = false;
    for (let Illll1 = 1; Illll1 <= signFailMaxRetryTimes + 1; Illll1++) {
      await sendRequest(iiI1i1);
      lilil1 !== lI1lII.length - 1 && $.signSuccess && (await $.wait($.signIntervalTimes));
      if ($.signSuccess) break;
      if ($.signRequestFailTimes > 0 && $.signRequestFailTimes < maxForbiddenRetryTimes) {
        Illll1 -= 1;
        continue;
      }
      if ($.signStop || Illll1 >= signFailMaxRetryTimes + 1) {
        console.log($.activityId + " ➜ " + ($.signErrorMsg || "未知（活动可能已结束）"));
        $.signStop && !$.signErrorMsg && $.needRemoveActivityIds.push($.activityId);
        break;
      }
      if ($.signRequestForbbiden) {
        if (forbiddenQuit) {
          $.outFlag = true;
          break I1Ilil;
        }
      }
    }
  }
}
async function cjhySign(ilI11i, ilI11l, li1I) {
  activityCookie = "";
  $.LZ_AES_PIN = "";
  $.pinToken = "";
  $.te = Math.floor(Math.random() * 9000) + 1000;
  let ll1liI = 0;
  l1I1I1: for (let i1111i = 0; i1111i < ilI11i.length; i1111i++) {
    $.activityId = ilI11i[i1111i];
    $.activityUrl = "" + $.baseUrl + ilI11l + "?activityId=" + $.activityId;
    if (i1111i === 0) {
      await getFirstLZCK($.activityUrl);
      if ($.skipRun) {
        $.skipRun = false;
        return;
      }
      await $.wait($.signIntervalTimes);
      !$.secretPin && ($.venderId = null, await sendRequest("getSimpleActInfoVo"), await $.wait($.signIntervalTimes));
    }
    ll1liI += 1;
    if (ll1liI >= 5) {
      ll1liI = 0;
      await getFirstLZCK($.activityUrl);
      if ($.skipRun) {
        $.skipRun = false;
        return;
      }
      await $.wait($.signIntervalTimes);
    }
    $.initError = false;
    $.jdToken = await getToken(originCookie, $.baseUrl);
    if (!$.jdToken) {
      console.log("获取[Token]失败！");
      $.message.insert("获取[Token]失败");
      break;
    }
    $.pinToken = "";
    $.LZ_AES_PIN = "";
    $.te = Math.floor(Math.random() * 9000) + 1000;
    await sendRequest("initPinToken");
    if ($.initError && $.jdToken) {
      $.initError = false;
      await $.wait($.signIntervalTimes);
      await sendRequest("initPinToken");
      if ($.initError) {
        if ($.garbageAct) {
          $.garbageAct = false;
          $.needRemoveActivityIds.push($.activityId);
          continue;
        }
        console.log("未能获取用户鉴权信息！");
        $.message.insert("未能获取用户鉴权信息");
        break;
      }
    }
    await $.wait($.signIntervalTimes);
    if (!$.secretPin) {
      console.log("未能获取用户鉴权信息！");
      $.message.insert("未能获取用户鉴权信息");
      break;
    }
    $.signRequestFailTimes = 0;
    $.signRequestForbbiden = false;
    $.signErrorMsg = "";
    $.signStop = false;
    $.signSuccess = false;
    for (let lIili1 = 1; lIili1 <= signFailMaxRetryTimes + 1; lIili1++) {
      await sendRequest(li1I);
      i1111i !== ilI11i.length - 1 && $.signSuccess && (await $.wait($.signIntervalTimes));
      $.needRefreshPinToken && (await sendRequest("initPinToken"), $.needRefreshPinToken = false, await $.wait($.signIntervalTimes));
      if ($.signRequestFailTimes > 0 && $.signRequestFailTimes < maxForbiddenRetryTimes) {
        lIili1 -= 1;
        continue;
      }
      if ($.signSuccess) break;
      if ($.signStop || lIili1 >= signFailMaxRetryTimes + 1) {
        console.log($.activityId + " ➜ " + ($.signErrorMsg || "未知（活动可能已结束）"));
        $.signStop && !$.signErrorMsg && $.needRemoveActivityIds.push($.activityId);
        break;
      }
      if ($.signRequestForbbiden) {
        if (forbiddenQuit) {
          $.outFlag = true;
          break l1I1I1;
        }
      }
    }
  }
}
async function handleResponse(lIl1lI, iiI1ll) {
  try {
    switch (lIl1lI) {
      case "getMyPing":
        if (iiI1ll.result === true && iiI1ll.data) $.secretPin = iiI1ll.data?.["secretPin"], $.formatPin = $.secretPin, $.nickname = iiI1ll.data?.["nickname"];else iiI1ll.errorMessage ? (console.log(lIl1lI + " " + iiI1ll.errorMessage), $.message.fix(iiI1ll.errorMessage)) : console.log("❓" + lIl1lI + " " + JSON.stringify(iiI1ll));
        break;
      case "initPinToken":
        if (iiI1ll.result === true && iiI1ll.data) $.secretPin = iiI1ll.data?.["secretPin"], $.formatPin = encodeURIComponent($.secretPin), $.nickname = iiI1ll.data?.["nickname"];else iiI1ll.errorMessage ? ([".java."].some(Ii1III => iiI1ll.errorMessage.includes(Ii1III)) && ($.garbageAct = true), console.log(lIl1lI + " " + iiI1ll.errorMessage), $.message.fix(iiI1ll.errorMessage)) : console.log("❓" + lIl1lI + " " + JSON.stringify(iiI1ll));
        break;
      case "getSimpleActInfoVo":
        if (iiI1ll.result === true && iiI1ll.data) $.venderId = iiI1ll.data?.["venderId"], $.shopId = iiI1ll.data?.["shopId"], $.activityType = iiI1ll.data?.["activityType"];else iiI1ll.errorMessage ? console.log(lIl1lI + " " + iiI1ll.errorMessage) : console.log("❓" + lIl1lI + " " + JSON.stringify(iiI1ll));
        break;
      case "signUp":
      case "sevenDay_signUp":
        $.signRequestFailTimes = 0;
        if (!iiI1ll.isOk && typeof iiI1ll.isOk === "boolean") {
          $.signErrorMsg = iiI1ll.msg;
          if (iiI1ll.msg) {
            !["火爆", "擦肩", "缓存", "数据忙", ".java."].some(I1iilI => $.signErrorMsg.includes(I1iilI)) && ($.signStop = true);
            ["结束", "不存在", "不在"].some(Ii1II1 => $.signErrorMsg.includes(Ii1II1)) && $.needRemoveActivityIds.push($.activityId);
            ["会员"].some(lilili => $.signErrorMsg.includes(lilili)) && ($.signErrorMsg = "活动仅限店铺会员参与");
          } else $.signStop = true;
          return;
        }
        $.signSuccess = true;
        const lIl1ll = lIl1lI === "sevenDay_signUp" ? iiI1ll?.["signResult"]?.["gift"] : iiI1ll?.["gift"];
        if (lIl1ll) {
          const IliIll = lIl1ll.insufficient;
          let iIiili = "";
          process.stdout.write($.activityId + " ➜ ");
          switch (parseInt(lIl1ll.giftType)) {
            case 6:
              iIiili = "🎉 " + lIl1ll.giftName + " 🐶", $.message.insert(lIl1ll.giftName + "🐶");
              break;
            case 7:
              const lilill = iiI1ll.addressId;
              let IilI1 = lIl1ll.giftName;
              iIiili = "🎉 恭喜获得实物~  奖品名称：" + IilI1 + "，参考价值：" + lIl1ll.priceInfo + "（元）" + (lIl1ll.showImage ? "，预览图片：" + lIl1ll.showImage : "");
              const l1lI1 = {
                  "baseUrl": $.baseUrl,
                  "cookie": cookie,
                  "ua": $.UA,
                  "activityId": $.activityId,
                  "activityType": $.activityType,
                  "venderId": $.venderId,
                  "secretPin": $.secretPin,
                  "prizeName": IilI1,
                  "generateId": lilill,
                  "activityUrl": $.activityUrl
                },
                Ili1I1 = wuxian_savePrize(l1lI1) || false;
              !isNotify && Ili1I1 && (await notify.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + IilI1 + "，已成功自动登记收货地址\n\n" + $.activityUrl));
              $.message.insert(IilI1 + "(" + (Ili1I1 ? "已填地址" : "未填地址") + ")🎁");
              break;
            case 8:
              iIiili = "🗑️ 专享价", $.message.insert("专享价🗑️");
              break;
            case 9:
              iIiili = "🗑️ " + lIl1ll.giftName + " 🎟️", $.message.insert(lIl1ll.giftName + "🎟️");
              break;
            case 13:
            case 14:
            case 15:
              iIiili = "🎉 恭喜获得" + lIl1ll.giftName + " 🎁", $.message.insert(lIl1ll.giftName + "🎁");
              !isNotify && (await notify.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + lIl1ll.giftName + "\n\n" + $.activityUrl));
              break;
            case 16:
              iIiili = "🎉 " + lIl1ll.priceInfo + " 🧧", $.message.insert(lIl1ll.priceInfo + "红包🧧");
              break;
            default:
              if (lIl1ll.giftName.includes("券")) {
                iIiili = "🗑️ 优惠券";
                $.message.insert("优惠券🗑️");
              } else console.log(lIl1ll.giftName), $.message.insert(lIl1ll.giftName);
              break;
          }
          IliIll && (iIiili += "（可能未到账）", $.message.messages.pop());
          console.log(iIiili);
        } else console.log($.activityId + " ➜ 💨 空气");
    }
  } catch (i1Iii1) {
    console.log("❌ 未能正确处理 " + lIl1lI + " 请求响应 " + (i1Iii1.message || i1Iii1));
  }
}
async function sendRequest(l1liii) {
  if ($.outFlag) return;
  let l1liil = $.baseUrl,
    i1ll1 = null,
    lilI1I = null,
    lI1I1l = null,
    Il1Il = "POST";
  switch (l1liii) {
    case "getMyPing":
      l1liil += "/customer/getMyPing", i1ll1 = {
        "token": $.jdToken,
        "fromType": "APP",
        "userId": $.venderId
      };
      break;
    case "getSimpleActInfoVo":
      l1liil += "/customer/getSimpleActInfoVo", i1ll1 = {
        "activityId": $.activityId
      };
      break;
    case "initPinToken":
      Il1Il = "GET", l1liil += "/customer/initPinToken", lI1I1l = {
        "status": "1",
        "activityId": $.activityId,
        "jdToken": $.jdToken,
        "source": "01",
        "venderId": $.venderId,
        "uuid": $.UUID,
        "clientTime": Date.now()
      };
      break;
    case "accessLog":
      l1liil += "/common/accessLog", i1ll1 = {
        "venderId": $.venderId,
        "code": $.activityType,
        "pin": $.formatPin,
        "activityId": $.activityId,
        "pageUrl": $.activityUrl,
        "subType": "app",
        "adSource": ""
      };
      break;
    case "accessLogWithAD":
      l1liil += "/common/accessLogWithAD", i1ll1 = {
        "venderId": $.venderId,
        "code": $.activityType,
        "pin": $.formatPin,
        "activityId": $.activityId,
        "pageUrl": $.activityUrl,
        "subType": "app"
      };
      break;
    case "signUp":
      l1liil += "/sign/wx/signUp", i1ll1 = {
        "actId": $.activityId,
        "pin": $.formatPin
      };
      break;
    case "sevenDay_signUp":
      l1liil += "/sign/sevenDay/wx/signUp", i1ll1 = {
        "actId": $.activityId,
        "pin": $.formatPin
      };
      break;
    default:
      console.log("❌ 未知请求 " + l1liii);
      return;
  }
  const i1IiiI = $.activityMode === "cjhy" && wuxianDefense.isDefenseApi(l1liil.replace($.baseUrl, "").split("?")[0]);
  i1IiiI && (i1ll1?.["pin"] && (i1ll1.pin = encodeURIComponent($.secretPin)), lilI1I = {
    "ecyText": wuxianDefense.encrypt({
      "actId": $.activityId,
      ...i1ll1
    }, $.pinToken, $.te)
  });
  const lI1I1I = {
    "url": l1liil,
    "method": Il1Il,
    "headers": {
      "Accept": "application/json",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,en-GB;q=0.6",
      "Connection": "keep-alive",
      "Content-Type": i1IiiI ? "application/json" : "application/x-www-form-urlencoded",
      "Cookie": activityCookie.trim(),
      "Host": $.hostname,
      "Origin": $.origin,
      "Referer": $.activityUrl,
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      "User-Agent": $.UA,
      "X-Requested-With": "XMLHttpRequest",
      "Referer": $.activityUrl
    },
    "params": lI1I1l,
    "data": i1IiiI ? lilI1I : i1ll1,
    "timeout": 30000
  };
  Il1Il === "GET" && (delete lI1I1I.data, delete lI1I1I.headers["Content-Type"]);
  const l1lII = ["signUp", "sevenDay_signUp"].includes(l1liii) ? 1 : 3;
  let lilI1l = 0,
    l1liiI = null,
    I1iI1 = false;
  while (lilI1l < l1lII) {
    lilI1l > 0 && (await $.wait(1000));
    const liI1Ii = await common.request(lI1I1I);
    if (!liI1Ii.success) {
      !["signUp", "sevenDay_signUp"].includes(l1liii) ? l1liiI = l1liii + " 请求失败 ➜ " + liI1Ii.error : l1liiI = $.activityId + " ➜ 请求失败 " + liI1Ii.error;
      lilI1l++;
      if (liI1Ii.status) {
        if (liI1Ii.status === 500 && i1IiiI) lI1I1I.data = {
          "ecyText": wuxianDefense.encrypt({
            "actId": $.activityId,
            ...i1ll1
          }, $.pinToken, $.te)
        };else [403, 493].includes(liI1Ii.status) && (["signUp", "sevenDay_signUp"].includes(l1liii) ? $.signRequestForbbiden = true : I1iI1 = true);
      }
      $.signRequestFailTimes && ($.signRequestFailTimes += 1);
      continue;
    }
    if (["accessLog", "accessLogWithAD"].includes(l1liii)) break;
    if (!liI1Ii.data) {
      !["signUp", "sevenDay_signUp"].includes(l1liii) ? l1liiI = l1liii + " 请求失败 ➜ 无响应数据" : l1liiI = $.activityId + " ➜ 请求失败（无响应数据）";
      lilI1l++;
      i1IiiI && lilI1l < l1lII - 1 && ($.needRefreshPinToken = true, lilI1l < l1lII - 1 && (lI1I1I.data = {
        "ecyText": wuxianDefense.encrypt({
          "actId": $.activityId,
          ...i1ll1
        }, $.pinToken, $.te)
      }));
      continue;
    }
    const l1lil1 = common.getResponseCookie(liI1Ii, activityCookie);
    let i1lil = "";
    switch (l1liii) {
      case "getMyPing":
        i1lil = common.getCookieValue(l1lil1, "LZ_AES_PIN");
        i1lil ? $.LZ_AES_PIN = i1lil : (console.log("获取 LZ_AES_PIN 失败！"), $.message.fix("获取[LZ_AES_PIN]失败"), $.skipRun = true);
        break;
      case "initPinToken":
        activityCookie = activityCookie.replace(new RegExp("pToken=[^;]*;?\\s*", "g"), ""), activityCookie = activityCookie.replace(new RegExp("te=[^;]*;?\\s*", "g"), "");
        const I1iIi = common.getCookieValue(l1lil1, "pToken");
        if (I1iIi) {
          $.pinToken = I1iIi;
        } else {
          console.log("获取 pinToken 失败！");
          $.message.fix("获取[pinToken]失败");
          $.skipRun = true;
          break;
        }
        i1lil = common.getCookieValue(l1lil1, "LZ_AES_PIN");
        if (i1lil) $.LZ_AES_PIN = i1lil;else {
          console.log("获取 LZ_AES_PIN 失败！");
          $.message.fix("获取[LZ_AES_PIN]失败");
          $.skipRun = true;
          break;
        }
        const iiiI1I = common.getCookieValue(l1lil1, "te");
        iiiI1I && ($.te = iiiI1I);
        break;
    }
    ["getMyPing", "signUp", "sevenDay_signUp"].includes(l1liii) && (activityCookie = l1lil1);
    i1lil = common.getCookieValue(activityCookie, "LZ_AES_PIN");
    !i1lil && $.LZ_AES_PIN && (activityCookie += "LZ_AES_PIN=" + $.LZ_AES_PIN + "; ");
    const I1iIl = common.getCookieValue(activityCookie, "pToken");
    !I1iIl && $.pinToken && (activityCookie += "pToken=" + $.pinToken + "; ");
    const IilII = common.getCookieValue(activityCookie, "AUTH_C_USER");
    !IilII && $.secretPin && (activityCookie += "AUTH_C_USER=" + $.secretPin + "; ");
    const ili1l = common.getCookieValue(activityCookie, "te");
    !ili1l && $.te && (activityCookie += "te=" + $.te + "; ");
    await handleResponse(l1liii, liI1Ii.data);
    I1iI1 = false;
    break;
  }
  lilI1l >= l1lII && (console.log(l1liiI), !["accessLogWithAD", "accessLog"].includes(l1liii) && I1iI1 && forbiddenQuit && !["signUp", "sevenDay_signUp"].includes(l1liii) && ($.outFlag = true));
}
async function getFirstLZCK(III1I1) {
  $.skipRun = true;
  const I1IllI = {
      "url": III1I1,
      "method": "GET",
      "headers": {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Connection": "keep-alive",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "cross-site",
        "Referer": III1I1,
        "User-Agent": $.UA
      },
      "timeout": 30000
    },
    IIlI11 = 3;
  let iIIll1 = 0,
    llIIII = null,
    ilI11I = false;
  while (iIIll1 < IIlI11) {
    const i1li1 = await common.request(I1IllI);
    if (!i1li1.success) {
      llIIII = "getFirstLZCK 请求失败 ➜ " + i1li1.error;
      iIIll1++;
      i1li1.status && [403, 493].includes(i1li1.status) && (ilI11I = true);
      continue;
    }
    if (!i1li1.data) {
      llIIII = "getFirstLZCK 请求失败 ➜ 无响应数据";
      iIIll1++;
      continue;
    }
    activityCookie = common.getResponseCookie(i1li1);
    LZ_AES_PIN = common.getCookieValue(activityCookie, "LZ_AES_PIN");
    !LZ_AES_PIN && $.LZ_AES_PIN && (activityCookie += "LZ_AES_PIN=" + $.LZ_AES_PIN + "; ");
    const iIIllI = common.getCookieValue(activityCookie, "pToken");
    !iIIllI && $.pinToken && (activityCookie += "pToken=" + $.pinToken + "; ");
    const I1Ill1 = common.getCookieValue(activityCookie, "AUTH_C_USER");
    !I1Ill1 && $.secretPin && (activityCookie += "AUTH_C_USER=" + $.secretPin + "; ");
    const ili11 = common.getCookieValue(activityCookie, "te");
    !ili11 && $.te && (activityCookie += "te=" + $.te + "; ");
    $.skipRun = false;
    break;
  }
  iIIll1 >= IIlI11 && (console.log(llIIII), ilI11I && forbiddenQuit && ($.outFlag = true));
}// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}

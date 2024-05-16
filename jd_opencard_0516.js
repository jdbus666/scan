/*
5.16-5.23 甜蜜有礼 心动约惠

不会自动运行，请在有水的时候运行

//export jd_opencard_draw="3" //抽奖次数 3
//export jd_opencard_break="true" //IP限制后继续执行（true/false）

cron "1 1 1 1 *" script-path=jd_opencard_0516.js

*/

const $ = new Env('5.16-5.23 甜蜜有礼 心动约惠')
const jdCookie = require("./jdCookie"),
  notify = require("./utils/Rebels_sendJDNotify"),
  opencard_draw = process.env.jd_opencard_draw || 300,
  hotbreak = process.env.jd_opencard_break === "true",
  isNotify = process.env.jd_opencard_notify === "true";
console.log("");
console.log("==========" + $.name + "变量说明==========");
console.log("jd_opencard_draw // 最大抽奖次数，默认 3 次");
console.log("jd_opencard_break // IP限制后继续执行（true/false）");
console.log("==========" + $.name + "提示结束==========");
console.log("");
const common = require("./utils/Rebels_jdCommon.js"),
  getToken = require("./utils/Rebels_Token.js"),
  {
    lzdz_savePrize
  } = require("./utils/Rebels_savePrize.js");
let domains = "https://lzdz1-isv.isvjcloud.com",
  cookie = "",
  activityCookie = "",
  originCookie = "";
const cookiesArr = Object.keys(jdCookie).map(I1lIIl => jdCookie[I1lIIl]).filter(l1ilI1 => l1ilI1);
!cookiesArr[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  console.log("开卡类活动不会自动运行，请自行测试是否有水");
  authorCodeList = await getAuthorCodeList("http://km.jdbus.net/jd_joinCommon_opencard515.json");
  if (authorCodeList) console.log("\n服务状态正常，活动获取成功"), $.authorCode = authorCodeList[random(0, authorCodeList.length)];else {
    let l11iI1 = [""];
    $.authorCode = l11iI1[random(0, l11iI1.length)];
    console.log("\n服务状态异常，请检查网络是否正常\n");
  }
  $.activityId = "dfc40de03479497daac1c3d898b023e7";
  $.activityUrl = "https://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId;
  $.shareUuid = $.authorCode;
  notify.config({
    "title": $.name
  });
  for (let IliiI = 0; IliiI < cookiesArr.length; IliiI++) {
    $.index = IliiI + 1;
    cookie = cookiesArr[IliiI];
    originCookie = cookiesArr[IliiI];
    common.setCookie(cookie);
    $.UserName = decodeURIComponent(common.getCookieValue(cookie, "pt_pin"));
    $.UA = common.genUA($.UserName);
    $.message = notify.create($.index, $.UserName);
    $.nickName = "";
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
    await run();
    common.unsetCookie();
    if ($.outFlag || $.activityEnd) break;
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
  }
  isNotify && notify.getMessage() && (notify.appendContent("\n"), await notify.push());
})().catch(liIlll => $.logErr(liIlll)).finally(() => $.done());
async function run() {
  try {
    $.skipRun = false;
    $.hasEnd = true;
    $.drawStop = false;
    $.endTime = 0;
    $.Token = "";
    $.Pin = "";
    $.venderId == "";
    $.Token = await getToken(cookie, domains);
    if ($.Token == "") {
      console.log("缺少必要参数，请重新运行");
      return;
    }
    await getCk();
    if (activityCookie == "") {
      console.log("缺少必要参数，请重新运行");
      return;
    }
    if ($.activityEnd === true) return;
    if ($.outFlag) {
      console.log("IP被限制（493）\n");
      return;
    }
    await takePostRequest("init");
    if ($.venderId == "") {
      console.log("缺少必要参数，请重新运行");
      return;
    }
    await $.wait(500);
    await takePostRequest("getMyCidPing");
    if (!$.Pin) {
      console.log("获取用户信息失败，请重新运行");
      return;
    }
    await $.wait(500);
    await takePostRequest("accessLogWithAD");
    await $.wait(500);
    await takePostRequest("activityContent");
    if ($.hotFlag) return;
    if (!$.actorUuid) {
      console.log("获取不到[actorUuid]退出执行，请重新执行");
      return;
    }
    if ($.hasEnd === true || Date.now() > $.endTime) {
      $.activityEnd = true;
      console.log("活动结束");
      return;
    }
    if (!$.hasGetBasicInfo) {
      $.hasGetBasicInfo = true;
      const i1I11 = $.time("yyyy-MM-dd HH:mm", $.startTime),
        I1I1i1 = $.time("yyyy-MM-dd HH:mm", $.endTime);
      console.log(($.activityName && "活动名称：#" + $.activityName + "\n") + "活动ID：" + $.activityId);
      console.log("开始时间：" + i1I11 + "\n结束时间：" + I1I1i1 + "\n当前已邀请" + $.assistCount + "人，金币" + $.score + "枚\n");
      const i1I1l = Date.now();
      if ($.startTime && i1I1l < $.startTime) {
        console.log("活动将在 " + i1I11 + " 开始，晚点再来吧~");
        $.activityEnd = true;
        return;
      }
      if ($.endTime && i1I1l > $.endTime) {
        console.log("活动已于 " + I1I1i1 + " 结束，下次早点来吧~");
        $.activityEnd = true;
        return;
      }
    }
    console.log("助力码：" + $.actorUuid);
    $.openList = [];
    $.allOpenCard = false;
    await takePostRequest("taskInfo");
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    if ($.taskInfo) for (let IIiiII in $.taskInfo) {
      switch (IIiiII) {
        case "1":
          $.opencard_list = $.taskInfo[IIiiII].settingInfo;
          break;
      }
    }
    await takePostRequest("taskRecord");
    if ($.taskRecord) for (let llIiI in $.taskRecord) {
      if (llIiI == "1") continue;
      let Ilill = $.taskRecord[llIiI];
      if (Ilill?.["recordCount"] > 0) continue;
      if (Ilill?.["taskBeans"] === 0 && Ilill?.["taskScore"] === 0) continue;
      switch (llIiI) {
        case "20":
        case "23":
        case "24":
          $.taskType = $.taskRecord[llIiI]?.["taskType"], await takePostRequest("doTask"), await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
          break;
      }
    }
    await $.wait(500);
    await takePostRequest("assist");
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    if ($.assist?.["openCardInfo"]?.["openAll"] != true) {
      let Ilili = $.assist?.["openCardInfo"]?.["openVenderId"] || [];
      console.log("共有" + $.opencard_list.length + "张卡,还需开" + ($.opencard_list.length - Ilili.length) + "张卡");
      for (let I1ll1I of $.opencard_list) {
        $.openUrl = I1ll1I.toUrl;
        $.openName = I1ll1I.name;
        $.joinVenderId = common.getUrlParameter($.openUrl, "venderId");
        (!$.openUrl || !/^\d+$/.test($.joinVenderId)) && ($.joinVenderId = I1ll1I.value || I1ll1I.venderId);
        if (Ilili.includes(Number(I1ll1I.value))) continue;
        const Iii1I1 = await common.joinShopMember($.joinVenderId);
        if (Iii1I1) console.log("加入[" + $.openName + "]店铺会员成功"), await $.wait(parseInt(Math.random() * 1000 + 1000, 10));else {
          console.log("[" + $.openName + "]店铺开卡失败,跳过执行~");
          return;
        }
        await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
      }
      await takePostRequest("assist");
      await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    }
    if (opencard_draw && !$.drawStop) {
      await takePostRequest("activityContent");
      let llIlI = parseInt($.score / 100),
        l1iIil = Math.min(opencard_draw, llIlI);
      $.prize = [];
      console.log("已设置抽奖" + opencard_draw + "次,共有" + llIlI + "次抽奖,可抽奖" + l1iIil + "次");
      for (m = 1; l1iIil--; m++) {
        await takePostRequest("startDraw");
        if (Number(l1iIil) <= 0) break;
        if (m >= 10) {
          console.log("抽奖太多次，多余的次数请再执行脚本");
          break;
        }
        await $.wait(parseInt(Math.random() * 2000 + 2000, 10));
      }
      $.prize.length && console.log("抽奖获得: " + $.prize.join(", ") + "\n");
    }
    if ($.outFlag) {
      console.log("IP被限制（493）\n");
      return;
    }
    $.index == 1 && ($.shareUuid = $.authorCode, console.log("后面的号都会助力 -> " + $.shareUuid));
    if ($.index % 5 == 0) await $.wait(parseInt(Math.random() * 5000 + 15000, 10));
  } catch (II1II) {
    console.log(II1II);
  }
}
async function takePostRequest(IIIIii) {
  if ($.outFlag) return;
  let IIIIil = "",
    lI1lIl = null,
    lI1lIi = "POST";
  switch (IIIIii) {
    case "init":
      IIIIil = domains + "/dingzhi/taskact/common/init", lI1lIl = "activityId=" + $.activityId + "&dzActivityType=0&adSource=&pin=";
      break;
    case "getMyCidPing":
      IIIIil = domains + "/customer/getMyCidPing", lI1lIl = "activityId=" + $.activityId + "&token=" + $.Token + "&fromType=APP_shopGift&userId=" + $.venderId + "&pin=";
      break;
    case "accessLogWithAD":
      IIIIil = domains + "/common/accessLogWithAD";
      let IIlili = domains + "/m/unite/dzlh0001/?activityId=" + $.activityId + "&venderId=" + $.venderId + "&shareUuid=" + $.shareUuid;
      lI1lIl = "venderId=" + $.venderId + "&code=99&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(IIlili) + "&subType=app&adSource=";
      break;
    case "activityContent":
      IIIIil = domains + "/dingzhi/joinCommon/activityContent", lI1lIl = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&pinImg=" + encodeURIComponent("https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png") + "&nick=" + encodeURIComponent($.nickname) + "&shareUuid=" + $.shareUuid;
      break;
    case "taskInfo":
      IIIIil = domains + "/dingzhi/joinCommon/taskInfo", lI1lIl = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "assist":
      IIIIil = domains + "/dingzhi/joinCommon/assist", lI1lIl = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid;
      break;
    case "taskRecord":
      IIIIil = domains + "/dingzhi/joinCommon/taskRecord", lI1lIl = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.actorUuid + "&taskType=";
      break;
    case "doTask":
      IIIIil = domains + "/dingzhi/joinCommon/doTask", lI1lIl = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=" + $.taskType + "&taskValue=";
      break;
    case "startDraw":
      IIIIil = domains + "/dingzhi/joinCommon/startDraw", lI1lIl = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin);
      break;
    default:
      console.log("错误" + IIIIii);
  }
  const Iii1Ii = {
    "url": IIIIil,
    "method": lI1lIi,
    "headers": {
      "Accept": "application/json",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Connection": "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded",
      "Cookie": activityCookie.trim(),
      "User-Agent": $.UA,
      "X-Requested-With": "XMLHttpRequest",
      "Origin": "https://lzdz1-isv.isvjcloud.com/",
      "Referer": $.activityUrl
    },
    "data": lI1lIl,
    "timeout": 20000
  };
  lI1lIi === "GET" && (delete Iii1Ii.body, delete Iii1Ii.headers["Content-Type"]);
  const Iii1Il = 5;
  let i1l1I1 = 0,
    lI1lI1 = null,
    llIl1 = false;
  while (i1l1I1 < Iii1Il) {
    i1l1I1 > 0 && (await $.wait(1000));
    const IIlill = await common.request(Iii1Ii);
    if (!IIlill.success) {
      lI1lI1 = IIIIii + " 请求失败 ➜ " + IIlill.error;
      i1l1I1++;
      IIlill.status && [403, 493].includes(IIlill.status) && (llIl1 = true);
      continue;
    }
    if (["accessLog", "accessLogWithAD"].includes(IIIIii)) break;
    if (!IIlill.data) {
      lI1lI1 = IIIIii + " 请求失败 ➜ 无响应数据";
      i1l1I1++;
      continue;
    }
    const IllllI = common.getResponseCookie(IIlill, activityCookie);
    let liliil = "";
    switch (IIIIii) {
      case "getMyCidPing":
        liliil = common.getCookieValue(IllllI, "LZ_AES_PIN");
        liliil ? $.LZ_AES_PIN = liliil : (console.log("获取 LZ_AES_PIN 失败！"), $.skipRun = true);
        break;
    }
    ["getMyCidPing", "taskInfo", "startDraw"].includes(IIIIii) && (activityCookie = IllllI);
    liliil = common.getCookieValue(activityCookie, "LZ_AES_PIN");
    !liliil && $.LZ_AES_PIN && (activityCookie += "LZ_AES_PIN=" + $.LZ_AES_PIN + "; ");
    const I1iil1 = common.getCookieValue(activityCookie, "LZ_TOKEN_KEY");
    !I1iil1 && $.LZ_TOKEN_KEY && (activityCookie += "LZ_TOKEN_KEY=" + $.LZ_TOKEN_KEY + "; ");
    const lIillI = common.getCookieValue(activityCookie, "LZ_TOKEN_VALUE");
    !lIillI && $.LZ_TOKEN_VALUE && (activityCookie += "LZ_TOKEN_VALUE=" + $.LZ_TOKEN_VALUE + "; ");
    await handleResponse(IIIIii, IIlill.data);
    llIl1 = false;
    break;
  }
  i1l1I1 >= Iii1Il && (console.log(lI1lI1), llIl1 && !["getMyCidPing", "taskInfo", "accessLogWithAD", "accessLog"].includes(IIIIii) && !hotbreak && ($.outFlag = true));
}
async function handleResponse(l1lI1I, ll1llI) {
  try {
    switch (l1lI1I) {
      case "init":
        if (typeof ll1llI == "object") {
          if (ll1llI.result && ll1llI.result === true) {
            $.shopId = ll1llI.data?.["shopId"];
            $.venderId = ll1llI.data?.["venderId"];
            $.startTime = ll1llI.data?.["startTime"];
            $.endTime = ll1llI.data?.["endTime"];
            $.activityType = ll1llI.data?.["activityType"];
          } else ll1llI.errorMessage ? console.log("" + (ll1llI.errorMessage || "")) : console.log("" + ll1llI);
        } else console.log("" + ll1llI);
        break;
      case "getMyCidPing":
        if (typeof ll1llI == "object") {
          if (ll1llI.result && ll1llI.result === true) {
            if (ll1llI.data && typeof ll1llI.data?.["secretPin"] != "undefined") $.Pin = ll1llI.data?.["secretPin"];
            if (ll1llI.data && typeof ll1llI.data?.["nickname"] != "undefined") $.nickname = ll1llI.data?.["nickname"];
          } else ll1llI.errorMessage ? console.log("" + (ll1llI.errorMessage || "")) : console.log("" + ll1llI);
        } else console.log("" + ll1llI);
        break;
      case "activityContent":
        if (typeof ll1llI == "object") {
          if (ll1llI.result && ll1llI.result === true) $.activityName = ll1llI.data?.["activityName"] || "", $.endTime = ll1llI.data?.["endTime"] || ll1llI.data?.["activityVo"] && ll1llI.data?.["activityVo"]?.["endTime"] || ll1llI.data?.["activity"]?.["endTime"] || 0, $.hasEnd = ll1llI.data?.["isEnd"] || false, $.score = ll1llI.data?.["actorInfo"]?.["score"] || 0, $.actorUuid = ll1llI.data?.["actorInfo"]?.["uuid"] || "", $.assistCount = ll1llI.data?.["actorInfo"]?.["assistCount"] || 0;else ll1llI.errorMessage ? console.log("" + (ll1llI.errorMessage || "")) : console.log("" + ll1llI);
        } else console.log("" + ll1llI);
        break;
      case "assist":
        if (typeof ll1llI == "object") {
          if (ll1llI.result && ll1llI.result === true) {
            $.assist = ll1llI.data;
            if ($.assist) {
              $.assist?.["openCardInfo"]?.["hasNewOpen"] && console.log("开卡获得了" + ($.assist?.["openCardInfo"]?.["beans"] || 0) + "京豆");
              if ($.assist?.["openCardInfo"]?.["openAll"] == true) {
                console.log("已经全部开卡");
                switch ($.assist?.["assistState"]) {
                  case "":
                  case undefined:
                  case 0:
                    break;
                  case 1:
                    console.log("✅ 助力成功");
                    break;
                  case 2:
                  case 10:
                    console.log("已经助力过了哟~");
                    break;
                  case 3:
                  case 11:
                    console.log("已助力其他人~");
                    break;
                  case 20:
                    console.log("未全部开卡");
                    break;
                  case 21:
                    console.log("未全部开卡和关注");
                    break;
                  case 22:
                    console.log("不是新会员");
                    break;
                  case 77:
                    console.log("未关注");
                    break;
                  case 88:
                    console.log("未加入会员并关注店铺");
                    break;
                  case 99:
                    console.log("未加入会员");
                    break;
                  default:
                    console.log("未知助力返回码");
                    break;
                }
                return;
              }
            }
          } else ll1llI.errorMessage ? console.log("" + (ll1llI.errorMessage || "")) : console.log("" + ll1llI);
        } else console.log("" + ll1llI);
        break;
      case "taskRecord":
        if (typeof ll1llI == "object") {
          if (ll1llI.result && ll1llI.result === true) $.taskRecord = ll1llI.data;else ll1llI.errorMessage ? console.log("" + (ll1llI.errorMessage || "")) : console.log("" + ll1llI);
        } else {
          console.log("" + ll1llI);
        }
        break;
      case "taskInfo":
        if (typeof ll1llI == "object") {
          if (ll1llI.result && ll1llI.result === true) $.taskInfo = ll1llI.data;else ll1llI.errorMessage ? console.log("" + (ll1llI.errorMessage || "")) : console.log("" + ll1llI);
        } else console.log("" + ll1llI);
        break;
      case "doTask":
        if (typeof ll1llI == "object") {
          if (ll1llI.result && ll1llI.result === true) {
            let iiI1lI = "任务完成";
            ll1llI?.["data"]?.["beans"] > 0 && (iiI1lI += "," + (ll1llI?.["data"]?.["beans"] || 0) + "京豆");
            ll1llI?.["data"]?.["score"] > 0 && (iiI1lI += "," + (ll1llI?.["data"]?.["score"] || 0) + "金币");
            console.log(iiI1lI);
          } else ll1llI.errorMessage ? console.log("" + (ll1llI.errorMessage || "")) : console.log("" + ll1llI);
        } else console.log("" + ll1llI);
        break;
      case "startDraw":
        if (typeof ll1llI == "object") {
          if (ll1llI.result && ll1llI.result === true) {
            if (ll1llI.data?.["wdsrvo"]?.["drawState"]) {
              const iliiI1 = ll1llI.data?.["wdsrvo"];
              if (iliiI1) {
                switch (iliiI1.drawType) {
                  case 6:
                    $.prize.push("🎉 " + iliiI1.drawName + " 🐶");
                    break;
                  case 7:
                    const ilIIii = domains + "/dingzhi/joinCommon/saveAddress",
                      l1111 = iliiI1.addressId,
                      lIl1l1 = iliiI1.drawName;
                    $.prize.push("🎉 恭喜获得实物,奖品名称：" + lIl1l1);
                    const li1i = {
                        "baseUrl": domains,
                        "saveAddressurl": ilIIii,
                        "uuid": $.actorUuid,
                        "cookie": activityCookie,
                        "ua": $.UA,
                        "activityId": $.activityId,
                        "activityType": 99,
                        "venderId": $.venderId,
                        "secretPin": $.Pin,
                        "prizeName": lIl1l1,
                        "itemsId": l1111,
                        "activityUrl": $.activityUrl
                      },
                      ilIIil = await lzdz_savePrize(li1i);
                    ilIIil && (await notify.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + lIl1l1 + "，已成功自动登记收货地址\n\n" + $.activityUrl));
                    break;
                  case 8:
                    $.prize.push("🗑️ 专享价");
                    break;
                  case 9:
                    $.prize.push("🗑️ " + iliiI1.drawName + " 🎟️");
                    break;
                  case 13:
                  case 14:
                  case 15:
                    $.prize.push("🎉 恭喜获得" + iliiI1.drawName + " 🎁"), await notify.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + iliiI1.drawName + "\n\n" + $.activityUrl);
                    break;
                  case 16:
                    $.prize.push("🎉 " + iliiI1.priceInfo + " 🧧");
                    break;
                  default:
                    iliiI1.drawName.includes("券") ? $.prize.push("🗑️ 优惠券") : $.prize.push("获得：" + iliiI1.drawName);
                    break;
                }
              }
            } else $.prize.push("💨 空气");
          } else ll1llI.errorMessage && ($.drawError = ll1llI.errorMessage, ["上限", "不足", "超过", "非法操作", "明天"].some(iliiII => $.drawError.includes(iliiII)) && ($.drawStop = true, $.prize.push($.drawError)), ["未开始", "结束", "不存在", "不在"].some(iiI1li => $.drawError.includes(iiI1li)) && ($.activityEnd = true), ["会员", "开卡"].some(IIliii => $.drawError.includes(IIliii)) && ($.needJoinMember = true, $.prize.push($.drawError)), !["火爆", "擦肩", "缓存", "数据忙"].some(IliIl1 => $.drawError.includes(IliIl1)) && !$.drawStop && !$.needJoinMember && $.prize.push($.drawError || ""));
        } else console.log("❓" + l1lI1I + " " + JSON.stringify(ll1llI));
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      default:
        console.log(l1lI1I + "-> " + ll1llI);
    }
    typeof ll1llI == "object" && ll1llI.errorMessage && ll1llI.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
  } catch (Ii1IIi) {
    console.log(Ii1IIi);
  }
}
async function getCk() {
  $.skipRun = true;
  const l111I = {
      "url": $.activityUrl,
      "method": "GET",
      "headers": {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Connection": "keep-alive",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "cross-site",
        "Referer": $.activityUrl,
        "User-Agent": $.UA
      },
      "timeout": 30000
    },
    ll1lli = 3;
  let ll1lll = 0,
    Illlil = null,
    I1iili = false;
  while (ll1lll < ll1lli) {
    ll1lll > 0 && (await $.wait(1000));
    const lIilii = await common.request(l111I);
    if (!lIilii.success) {
      Illlil = "getCk ➜ " + lIilii.error;
      ll1lll++;
      lIilii.status && [403, 493].includes(lIilii.status) && (I1iili = true);
      continue;
    }
    if (!lIilii.data) {
      Illlil = "getCk ➜ 无响应数据";
      ll1lll++;
      continue;
    }
    lIilii.data.match(/(活动已经结束)/) && lIilii.data.match(/(活动已经结束)/)[1] && ($.activityEnd = true, console.log("活动已结束或不存在"));
    lIilii.data.match(/(活动未开始)/) && lIilii.data.match(/(活动未开始)/)[1] && ($.activityEnd = true, console.log("您来的太早了,活动尚未开始"));
    activityCookie = common.getResponseCookie(lIilii);
    let lIilil = "",
      lIl1ll = "";
    lIilil = common.getCookieValue(activityCookie, "LZ_TOKEN_KEY");
    lIl1ll = common.getCookieValue(activityCookie, "LZ_TOKEN_VALUE");
    if (lIilil) {
      $.LZ_TOKEN_KEY = lIilil;
    }
    lIl1ll && ($.LZ_TOKEN_VALUE = lIl1ll);
    $.skipRun = false;
    break;
  }
  ll1lll >= ll1lli && (console.log(Illlil), I1iili && !hotbreak && ($.outFlag = true));
}
async function getAuthorCodeList(I1iilI) {
  const Ii1II1 = await common.request({
      "url": I1iilI,
      "method": "GET",
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      },
      "proxy": null,
      "debug": false,
      "timeout": 30000
    }),
    lilili = Ii1II1.data;
  return lilili;
}
function random(IliIli, lI1ilI) {
  return Math.floor(Math.random() * (lI1ilI - IliIli)) + IliIli;
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }

/*
5.9-5.16 为爱献礼 惊喜惠聚

不会自动运行，请在有水的时候运行

//export jd_opencard_draw="3" //抽奖次数 3
//export jd_opencard_break="true" //IP限制后继续执行（true/false）

cron "1 1 1 1 *" script-path=jd_opencard_0509.js

*/

const $ = new Env('5.9-5.16 为爱献礼 惊喜惠聚')
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
    wuxian_savePrize
  } = require("./utils/Rebels_savePrize.js");
let domains = "https://lzdz1-isv.isvjcloud.com",
  cookie = "",
  activityCookie = "",
  originCookie = "";
const cookiesArr = Object.keys(jdCookie).map(lI1Ill => jdCookie[lI1Ill]).filter(lI1Ili => lI1Ili);
!cookiesArr[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  console.log("开卡类活动不会自动运行，请自行测试是否有水");
  authorCodeList = await getAuthorCodeList("http://km.jdbus.net/jd_joinCommon_opencard0509.json");
  if (authorCodeList) console.log("\n服务状态正常，活动获取成功"), $.authorCode = authorCodeList[random(0, authorCodeList.length)];else {
    let iillll = [""];
    $.authorCode = iillll[random(0, iillll.length)];
    console.log("\n服务状态异常，请检查网络是否正常\n");
  }
  $.activityId = "4b0d43de6bac4536b7bc3a08cc225780";
  $.activityUrl = "https://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId;
  $.shareUuid = $.authorCode;
  notify.config({
    "title": $.name
  });
  for (let lIIilI = 0; lIIilI < cookiesArr.length; lIIilI++) {
    $.index = lIIilI + 1;
    cookie = cookiesArr[lIIilI];
    originCookie = cookiesArr[lIIilI];
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
})().catch(II1li1 => $.logErr(II1li1)).finally(() => $.done());
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
    if ($.index === 1) {
      const IlI1iI = $.time("yyyy-MM-dd HH:mm", $.startTime),
        Iillil = $.time("yyyy-MM-dd HH:mm", $.endTime);
      console.log(($.activityName && "活动名称：#" + $.activityName + "\n") + "活动ID：" + $.activityId);
      console.log("开始时间：" + IlI1iI + "\n结束时间：" + Iillil + "\n当前已邀请" + $.assistCount + "人，金币" + $.score + "枚\n");
      const l1lIli = Date.now();
      if ($.startTime && l1lIli < $.startTime) {
        console.log("活动将在 " + IlI1iI + " 开始，晚点再来吧~");
        $.activityEnd = true;
        return;
      }
      if ($.endTime && l1lIli > $.endTime) {
        console.log("活动已于 " + Iillil + " 结束，下次早点来吧~");
        $.activityEnd = true;
        return;
      }
    }
    console.log("助力码：" + $.actorUuid);
    $.openList = [];
    $.allOpenCard = false;
    await takePostRequest("taskInfo");
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    if ($.taskInfo) for (let lIIiiI in $.taskInfo) {
      switch (lIIiiI) {
        case "1":
          $.opencard_list = $.taskInfo[lIIiiI].settingInfo;
          break;
      }
    }
    await takePostRequest("taskRecord");
    if ($.taskRecord) for (let II1lil in $.taskRecord) {
      if (II1lil == "1") continue;
      let IIli1l = $.taskRecord[II1lil];
      if (IIli1l?.["recordCount"] > 0) continue;
      if (IIli1l?.["taskBeans"] === 0 && IIli1l?.["taskScore"] === 0) continue;
      switch (II1lil) {
        case "20":
        case "23":
        case "24":
          $.taskType = $.taskRecord[II1lil]?.["taskType"], await takePostRequest("doTask"), await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
          break;
      }
    }
    await $.wait(500);
    await takePostRequest("assist");
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    if ($.assist?.["openCardInfo"]?.["openAll"] != true) {
      let II1lii = $.assist?.["openCardInfo"]?.["openVenderId"] || [];
      console.log("共有" + $.opencard_list.length + "张卡,还需开" + ($.opencard_list.length - II1lii.length) + "张卡");
      for (let lIIii1 of $.opencard_list) {
        $.openUrl = lIIii1.toUrl;
        $.openName = lIIii1.name;
        $.joinVenderId = common.getUrlParameter($.openUrl, "venderId");
        (!$.openUrl || !/^\d+$/.test($.joinVenderId)) && ($.joinVenderId = lIIii1.value || lIIii1.venderId);
        if (II1lii.includes(Number(lIIii1.value))) continue;
        const ll1i1 = await common.joinShopMember($.joinVenderId);
        if (ll1i1) console.log("加入[" + $.openName + "]店铺会员成功"), await $.wait(parseInt(Math.random() * 1000 + 1000, 10));else {
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
      let IIli1i = parseInt($.score / 100),
        I1iIi1 = Math.min(opencard_draw, IIli1i);
      $.prize = [];
      console.log("已设置抽奖" + opencard_draw + "次,共有" + IIli1i + "次抽奖,可抽奖" + I1iIi1 + "次");
      for (m = 1; I1iIi1--; m++) {
        await takePostRequest("startDraw");
        if (Number(I1iIi1) <= 0) break;
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
  } catch (lliil1) {
    console.log(lliil1);
  }
}
async function takePostRequest(IIllI) {
  if ($.outFlag) return;
  let lili1 = "",
    ll1l1 = null,
    IiiIi1 = "POST";
  switch (IIllI) {
    case "init":
      lili1 = domains + "/dingzhi/taskact/common/init", ll1l1 = "activityId=" + $.activityId + "&dzActivityType=0&adSource=&pin=";
      break;
    case "getMyCidPing":
      lili1 = domains + "/customer/getMyCidPing", ll1l1 = "activityId=" + $.activityId + "&token=" + $.Token + "&fromType=APP_shopGift&userId=" + $.venderId + "&pin=";
      break;
    case "accessLogWithAD":
      lili1 = domains + "/common/accessLogWithAD";
      let Illl11 = domains + "/m/unite/dzlh0001/?activityId=" + $.activityId + "&venderId=" + $.venderId + "&shareUuid=" + $.shareUuid;
      ll1l1 = "venderId=" + $.venderId + "&code=99&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(Illl11) + "&subType=app&adSource=";
      break;
    case "activityContent":
      lili1 = domains + "/dingzhi/joinCommon/activityContent", ll1l1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&pinImg=" + encodeURIComponent("https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png") + "&nick=" + encodeURIComponent($.nickname) + "&shareUuid=" + $.shareUuid;
      break;
    case "taskInfo":
      lili1 = domains + "/dingzhi/joinCommon/taskInfo", ll1l1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "assist":
      lili1 = domains + "/dingzhi/joinCommon/assist", ll1l1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid;
      break;
    case "taskRecord":
      lili1 = domains + "/dingzhi/joinCommon/taskRecord", ll1l1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.actorUuid + "&taskType=";
      break;
    case "doTask":
      lili1 = domains + "/dingzhi/joinCommon/doTask", ll1l1 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=" + $.taskType + "&taskValue=";
      break;
    case "startDraw":
      lili1 = domains + "/dingzhi/joinCommon/startDraw", ll1l1 = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin);
      break;
    default:
      console.log("错误" + IIllI);
  }
  const l1ii1 = {
    "url": lili1,
    "method": IiiIi1,
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
    "data": ll1l1,
    "timeout": 20000
  };
  IiiIi1 === "GET" && (delete l1ii1.body, delete l1ii1.headers["Content-Type"]);
  const ii1ll = 5;
  let IliI1l = 0,
    lliiil = null,
    lliiii = false;
  while (IliI1l < ii1ll) {
    IliI1l > 0 && (await $.wait(1000));
    const ii1lI = await common.request(l1ii1);
    if (!ii1lI.success) {
      lliiil = IIllI + " 请求失败 ➜ " + ii1lI.error;
      IliI1l++;
      ii1lI.status && [403, 493].includes(ii1lI.status) && (lliiii = true);
      continue;
    }
    if (["accessLog", "accessLogWithAD"].includes(IIllI)) break;
    if (!ii1lI.data) {
      lliiil = IIllI + " 请求失败 ➜ 无响应数据";
      IliI1l++;
      continue;
    }
    const I1ilIl = common.getResponseCookie(ii1lI, activityCookie);
    let I11iII = "";
    switch (IIllI) {
      case "getMyCidPing":
        I11iII = common.getCookieValue(I1ilIl, "LZ_AES_PIN");
        I11iII ? $.LZ_AES_PIN = I11iII : (console.log("获取 LZ_AES_PIN 失败！"), $.skipRun = true);
        break;
    }
    ["getMyCidPing", "taskInfo", "startDraw"].includes(IIllI) && (activityCookie = I1ilIl);
    I11iII = common.getCookieValue(activityCookie, "LZ_AES_PIN");
    !I11iII && $.LZ_AES_PIN && (activityCookie += "LZ_AES_PIN=" + $.LZ_AES_PIN + "; ");
    const I1ilIi = common.getCookieValue(activityCookie, "LZ_TOKEN_KEY");
    !I1ilIi && $.LZ_TOKEN_KEY && (activityCookie += "LZ_TOKEN_KEY=" + $.LZ_TOKEN_KEY + "; ");
    const IiiiI = common.getCookieValue(activityCookie, "LZ_TOKEN_VALUE");
    !IiiiI && $.LZ_TOKEN_VALUE && (activityCookie += "LZ_TOKEN_VALUE=" + $.LZ_TOKEN_VALUE + "; ");
    await handleResponse(IIllI, ii1lI.data);
    lliiii = false;
    break;
  }
  IliI1l >= ii1ll && (console.log(lliiil), lliiii && !["getMyCidPing", "taskInfo", "accessLogWithAD", "accessLog"].includes(IIllI) && !hotbreak && ($.outFlag = true));
}
async function handleResponse(llIlli, llIlll) {
  try {
    switch (llIlli) {
      case "init":
        if (typeof llIlll == "object") {
          if (llIlll.result && llIlll.result === true) $.shopId = llIlll.data?.["shopId"], $.venderId = llIlll.data?.["venderId"], $.startTime = llIlll.data?.["startTime"], $.endTime = llIlll.data?.["endTime"], $.activityType = llIlll.data?.["activityType"];else llIlll.errorMessage ? console.log("" + (llIlll.errorMessage || "")) : console.log("" + llIlll);
        } else console.log("" + llIlll);
        break;
      case "getMyCidPing":
        if (typeof llIlll == "object") {
          if (llIlll.result && llIlll.result === true) {
            if (llIlll.data && typeof llIlll.data?.["secretPin"] != "undefined") $.Pin = llIlll.data?.["secretPin"];
            if (llIlll.data && typeof llIlll.data?.["nickname"] != "undefined") $.nickname = llIlll.data?.["nickname"];
          } else llIlll.errorMessage ? console.log("" + (llIlll.errorMessage || "")) : console.log("" + llIlll);
        } else console.log("" + llIlll);
        break;
      case "activityContent":
        if (typeof llIlll == "object") {
          if (llIlll.result && llIlll.result === true) $.activityName = llIlll.data?.["activityName"] || "", $.endTime = llIlll.data?.["endTime"] || llIlll.data?.["activityVo"] && llIlll.data?.["activityVo"]?.["endTime"] || llIlll.data?.["activity"]?.["endTime"] || 0, $.hasEnd = llIlll.data?.["isEnd"] || false, $.score = llIlll.data?.["actorInfo"]?.["score"] || 0, $.actorUuid = llIlll.data?.["actorInfo"]?.["uuid"] || "", $.assistCount = llIlll.data?.["actorInfo"]?.["assistCount"] || 0;else llIlll.errorMessage ? console.log("" + (llIlll.errorMessage || "")) : console.log("" + llIlll);
        } else console.log("" + llIlll);
        break;
      case "assist":
        if (typeof llIlll == "object") {
          if (llIlll.result && llIlll.result === true) {
            $.assist = llIlll.data;
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
          } else llIlll.errorMessage ? console.log("" + (llIlll.errorMessage || "")) : console.log("" + llIlll);
        } else console.log("" + llIlll);
        break;
      case "taskRecord":
        if (typeof llIlll == "object") {
          if (llIlll.result && llIlll.result === true) $.taskRecord = llIlll.data;else llIlll.errorMessage ? console.log("" + (llIlll.errorMessage || "")) : console.log("" + llIlll);
        } else console.log("" + llIlll);
        break;
      case "taskInfo":
        if (typeof llIlll == "object") {
          if (llIlll.result && llIlll.result === true) $.taskInfo = llIlll.data;else llIlll.errorMessage ? console.log("" + (llIlll.errorMessage || "")) : console.log("" + llIlll);
        } else console.log("" + llIlll);
        break;
      case "doTask":
        if (typeof llIlll == "object") {
          if (llIlll.result && llIlll.result === true) {
            let l1l11i = "任务完成";
            llIlll?.["data"]?.["beans"] > 0 && (l1l11i += "," + (llIlll?.["data"]?.["beans"] || 0) + "京豆");
            llIlll?.["data"]?.["score"] > 0 && (l1l11i += "," + (llIlll?.["data"]?.["score"] || 0) + "金币");
            console.log(l1l11i);
          } else llIlll.errorMessage ? console.log("" + (llIlll.errorMessage || "")) : console.log("" + llIlll);
        } else console.log("" + llIlll);
        break;
      case "startDraw":
        if (typeof llIlll == "object") {
          if (llIlll.result && llIlll.result === true) {
            if (llIlll.data?.["wdsrvo"]?.["drawState"]) {
              const l1iIl = llIlll.data?.["wdsrvo"];
              if (l1iIl) switch (l1iIl.drawType) {
                case 6:
                  $.prize.push("🎉 " + l1iIl.drawName + " 🐶");
                  break;
                case 7:
                  const illIll = l1iIl.addressId,
                    iIli1I = l1iIl.drawName;
                  $.prize.push("🎉 恭喜获得实物,奖品名称：" + iIli1I);
                  const Iiil1 = {
                      "baseUrl": domains,
                      "cookie": activityCookie,
                      "ua": $.UA,
                      "activityId": $.activityId,
                      "activityType": 99,
                      "venderId": [$.venderId, $.shopId],
                      "secretPin": $.Pin,
                      "prizeName": iIli1I,
                      "generateId": illIll,
                      "activityUrl": $.activityUrl
                    },
                    iiilli = await wuxian_savePrize(Iiil1);
                  iiilli && (await notify.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + iIli1I + "，已成功自动登记收货地址\n\n" + $.activityUrl));
                  break;
                case 8:
                  $.prize.push("🗑️ 专享价");
                  break;
                case 9:
                  $.prize.push("🗑️ " + l1iIl.drawName + " 🎟️");
                  break;
                case 13:
                case 14:
                case 15:
                  $.prize.push("🎉 恭喜获得" + l1iIl.drawName + " 🎁"), await notify.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + l1iIl.drawName + "\n\n" + $.activityUrl);
                  break;
                case 16:
                  $.prize.push("🎉 " + l1iIl.priceInfo + " 🧧");
                  break;
                default:
                  l1iIl.drawName.includes("券") ? $.prize.push("🗑️ 优惠券") : $.prize.push("获得：" + l1iIl.drawName);
                  break;
              }
            } else $.prize.push("💨 空气");
          } else llIlll.errorMessage && ($.drawError = llIlll.errorMessage, ["上限", "不足", "超过", "非法操作", "明天"].some(l1iIIl => $.drawError.includes(l1iIIl)) && ($.drawStop = true, $.prize.push($.drawError)), ["未开始", "结束", "不存在", "不在"].some(iiilll => $.drawError.includes(iiilll)) && ($.activityEnd = true), ["会员", "开卡"].some(lI11Il => $.drawError.includes(lI11Il)) && ($.needJoinMember = true, $.prize.push($.drawError)), !["火爆", "擦肩", "缓存", "数据忙"].some(lIII1i => $.drawError.includes(lIII1i)) && !$.drawStop && !$.needJoinMember && $.prize.push($.drawError || ""));
        } else console.log("❓" + llIlli + " " + JSON.stringify(llIlll));
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      default:
        console.log(llIlli + "-> " + llIlll);
    }
    typeof llIlll == "object" && llIlll.errorMessage && llIlll.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
  } catch (l11i11) {
    console.log(l11i11);
  }
}
async function getCk() {
  $.skipRun = true;
  const lIII1l = {
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
    l1iIIi = 3;
  let lilIi = 0,
    l1l11I = null,
    lilIl = false;
  while (lilIi < l1iIIi) {
    lilIi > 0 && (await $.wait(1000));
    const l11i1I = await common.request(lIII1l);
    if (!l11i1I.success) {
      l1l11I = "getCk ➜ " + l11i1I.error;
      lilIi++;
      l11i1I.status && [403, 493].includes(l11i1I.status) && (lilIl = true);
      continue;
    }
    if (!l11i1I.data) {
      l1l11I = "getCk ➜ 无响应数据";
      lilIi++;
      continue;
    }
    l11i1I.data.match(/(活动已经结束)/) && l11i1I.data.match(/(活动已经结束)/)[1] && ($.activityEnd = true, console.log("活动已结束或不存在"));
    activityCookie = common.getResponseCookie(l11i1I);
    let IiII = "",
      llIIli = "";
    IiII = common.getCookieValue(activityCookie, "LZ_TOKEN_KEY");
    llIIli = common.getCookieValue(activityCookie, "LZ_TOKEN_VALUE");
    IiII && ($.LZ_TOKEN_KEY = IiII);
    llIIli && ($.LZ_TOKEN_VALUE = llIIli);
    $.skipRun = false;
    break;
  }
  lilIi >= l1iIIi && (console.log(l1l11I), lilIl && !hotbreak && ($.outFlag = true));
}
async function getAuthorCodeList(lIII1I) {
  const liIiI = await common.request({
      "url": lIII1I,
      "method": "GET",
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      },
      "proxy": null,
      "debug": false,
      "timeout": 30000
    }),
    l1il1I = liIiI.data;
  return l1il1I;
}
function random(Iiili, IilIli) {
  return Math.floor(Math.random() * (IilIli - Iiili)) + Iiili;
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }

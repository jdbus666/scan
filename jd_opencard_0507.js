/*
5.7-5.18 会员专享 宠粉福利

不会自动运行，请在有水的时候运行

//export jd_opencard_draw="3" //抽奖次数 3
//export jd_opencard_break="true" //IP限制后继续执行（true/false）

cron "1 1 1 1 *" script-path=jd_opencard_0507.js

*/

const $ = new Env('5.7-5.18 会员专享 宠粉福利')
const jdCookie = require("./jdCookie"),
  notify = require("./utils/Rebels_sendJDNotify"),
  opencard_draw = process.env.jd_opencard_draw || 3,
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
const cookiesArr = Object.keys(jdCookie).map(l1lIii => jdCookie[l1lIii]).filter(I11iI1 => I11iI1);
!cookiesArr[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  console.log("开卡类活动不会自动运行，请自行测试是否有水");
  authorCodeList = await getAuthorCodeList("http://km.jdbus.net/jd_joinCommon_opencard0507.json");
  if (authorCodeList) console.log("\n服务状态正常，活动获取成功"), $.authorCode = authorCodeList[random(0, authorCodeList.length)];else {
    let ll1iI = [""];
    $.authorCode = ll1iI[random(0, ll1iI.length)];
    console.log("\n服务状态异常，请检查网络是否正常\n");
  }
  $.activityId = "c699eb5b5a4a4edabb5883ab4526b804";
  $.activityUrl = "https://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId;
  $.shareUuid = $.authorCode;
  notify.config({
    "title": $.name
  });
  for (let iI1lll = 0; iI1lll < cookiesArr.length; iI1lll++) {
    $.index = iI1lll + 1;
    cookie = cookiesArr[iI1lll];
    originCookie = cookiesArr[iI1lll];
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
})().catch(l1lIll => $.logErr(l1lIll)).finally(() => $.done());
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
      const ll1lI = $.time("yyyy-MM-dd HH:mm", $.startTime),
        l1iii = $.time("yyyy-MM-dd HH:mm", $.endTime);
      console.log(($.activityName && "活动名称：#" + $.activityName + "\n") + "活动ID：" + $.activityId);
      console.log("开始时间：" + ll1lI + "\n结束时间：" + l1iii + "\n当前已邀请" + $.assistCount + "人，金币" + $.score + "枚\n");
      const IIlli = Date.now();
      if ($.startTime && IIlli < $.startTime) {
        console.log("活动将在 " + ll1lI + " 开始，晚点再来吧~");
        $.activityEnd = true;
        return;
      }
      if ($.endTime && IIlli > $.endTime) {
        console.log("活动已于 " + l1iii + " 结束，下次早点来吧~");
        $.activityEnd = true;
        return;
      }
    }
    console.log("助力码：" + $.actorUuid);
    $.openList = [];
    $.allOpenCard = false;
    await takePostRequest("taskInfo");
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    if ($.taskInfo) for (let l1iil in $.taskInfo) {
      switch (l1iil) {
        case "1":
          $.opencard_list = $.taskInfo[l1iil].settingInfo;
          break;
      }
    }
    await takePostRequest("taskRecord");
    if ($.taskRecord) for (let ii1l1 in $.taskRecord) {
      if (ii1l1 == "1") continue;
      let lIIill = $.taskRecord[ii1l1];
      if (lIIill?.["recordCount"] > 0) continue;
      if (lIIill?.["taskBeans"] === 0 && lIIill?.["taskScore"] === 0) continue;
      switch (ii1l1) {
        case "20":
        case "23":
        case "24":
          $.taskType = $.taskRecord[ii1l1]?.["taskType"], await takePostRequest("doTask"), await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
          break;
      }
    }
    await $.wait(500);
    await takePostRequest("assist");
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    if ($.assist?.["openCardInfo"]?.["openAll"] != true) {
      let I11iIi = $.assist?.["openCardInfo"]?.["openVenderId"] || [];
      console.log("共有" + $.opencard_list.length + "张卡,还需开" + ($.opencard_list.length - I11iIi.length) + "张卡");
      for (let I1ilII of $.opencard_list) {
        $.openUrl = I1ilII.toUrl;
        $.openName = I1ilII.name;
        $.joinVenderId = common.getUrlParameter($.openUrl, "venderId");
        (!$.openUrl || !/^\d+$/.test($.joinVenderId)) && ($.joinVenderId = I1ilII.value || I1ilII.venderId);
        if (I11iIi.includes(Number(I1ilII.value))) continue;
        const I11iIl = await common.joinShopMember($.joinVenderId);
        if (I11iIl) console.log("加入[" + $.openName + "]店铺会员成功"), await $.wait(parseInt(Math.random() * 1000 + 1000, 10));else {
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
      let l1l11l = parseInt($.score / 100),
        IilIil = Math.min(opencard_draw, l1l11l);
      $.prize = [];
      console.log("已设置抽奖" + opencard_draw + "次,共有" + l1l11l + "次抽奖,可抽奖" + IilIil + "次");
      for (m = 1; IilIil--; m++) {
        await takePostRequest("startDraw");
        if (Number(IilIil) <= 0) break;
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
  } catch (l1iIi) {
    console.log(l1iIi);
  }
}
async function takePostRequest(l1l11i) {
  if ($.outFlag) return;
  let illIll = "",
    iIli1I = null,
    l1iIIl = "POST";
  switch (l1l11i) {
    case "init":
      illIll = domains + "/dingzhi/taskact/common/init", iIli1I = "activityId=" + $.activityId + "&dzActivityType=0&adSource=&pin=";
      break;
    case "getMyCidPing":
      illIll = domains + "/customer/getMyCidPing", iIli1I = "activityId=" + $.activityId + "&token=" + $.Token + "&fromType=APP_shopGift&userId=" + $.venderId + "&pin=";
      break;
    case "accessLogWithAD":
      illIll = domains + "/common/accessLogWithAD";
      let l1il1I = domains + "/m/unite/dzlh0001/?activityId=" + $.activityId + "&venderId=" + $.venderId + "&shareUuid=" + $.shareUuid;
      iIli1I = "venderId=" + $.venderId + "&code=99&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(l1il1I) + "&subType=app&adSource=";
      break;
    case "activityContent":
      illIll = domains + "/dingzhi/joinCommon/activityContent", iIli1I = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&pinImg=" + encodeURIComponent("https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png") + "&nick=" + encodeURIComponent($.nickname) + "&shareUuid=" + $.shareUuid;
      break;
    case "taskInfo":
      illIll = domains + "/dingzhi/joinCommon/taskInfo", iIli1I = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "assist":
      illIll = domains + "/dingzhi/joinCommon/assist", iIli1I = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid;
      break;
    case "taskRecord":
      illIll = domains + "/dingzhi/joinCommon/taskRecord", iIli1I = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.actorUuid + "&taskType=";
      break;
    case "doTask":
      illIll = domains + "/dingzhi/joinCommon/doTask", iIli1I = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=" + $.taskType + "&taskValue=";
      break;
    case "startDraw":
      illIll = domains + "/dingzhi/joinCommon/startDraw", iIli1I = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin);
      break;
    default:
      console.log("错误" + l1l11i);
  }
  const iiilll = {
    "url": illIll,
    "method": l1iIIl,
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
    "data": iIli1I,
    "timeout": 20000
  };
  l1iIIl === "GET" && (delete iiilll.body, delete iiilll.headers["Content-Type"]);
  const lI11Il = 5;
  let lIII1i = 0,
    l11i11 = null,
    IilIl1 = false;
  while (lIII1i < lI11Il) {
    lIII1i > 0 && (await $.wait(1000));
    const Iiili = await common.request(iiilll);
    if (!Iiili.success) {
      l11i11 = l1l11i + " 请求失败 ➜ " + Iiili.error;
      lIII1i++;
      Iiili.status && [403, 493].includes(Iiili.status) && (IilIl1 = true);
      continue;
    }
    if (["accessLog", "accessLogWithAD"].includes(l1l11i)) break;
    if (!Iiili.data) {
      l11i11 = l1l11i + " 请求失败 ➜ 无响应数据";
      lIII1i++;
      continue;
    }
    const IilIli = common.getResponseCookie(Iiili, activityCookie);
    let li1 = "";
    switch (l1l11i) {
      case "getMyCidPing":
        li1 = common.getCookieValue(IilIli, "LZ_AES_PIN");
        li1 ? $.LZ_AES_PIN = li1 : (console.log("获取 LZ_AES_PIN 失败！"), $.skipRun = true);
        break;
    }
    ["getMyCidPing", "taskInfo", "startDraw"].includes(l1l11i) && (activityCookie = IilIli);
    li1 = common.getCookieValue(activityCookie, "LZ_AES_PIN");
    !li1 && $.LZ_AES_PIN && (activityCookie += "LZ_AES_PIN=" + $.LZ_AES_PIN + "; ");
    const illIl1 = common.getCookieValue(activityCookie, "LZ_TOKEN_KEY");
    !illIl1 && $.LZ_TOKEN_KEY && (activityCookie += "LZ_TOKEN_KEY=" + $.LZ_TOKEN_KEY + "; ");
    const l1llII = common.getCookieValue(activityCookie, "LZ_TOKEN_VALUE");
    !l1llII && $.LZ_TOKEN_VALUE && (activityCookie += "LZ_TOKEN_VALUE=" + $.LZ_TOKEN_VALUE + "; ");
    await handleResponse(l1l11i, Iiili.data);
    IilIl1 = false;
    break;
  }
  lIII1i >= lI11Il && (console.log(l11i11), IilIl1 && !["getMyCidPing", "taskInfo", "accessLogWithAD", "accessLog"].includes(l1l11i) && !hotbreak && ($.outFlag = true));
}
async function handleResponse(IilIll, lI11Ii) {
  try {
    switch (IilIll) {
      case "init":
        if (typeof lI11Ii == "object") {
          if (lI11Ii.result && lI11Ii.result === true) {
            $.shopId = lI11Ii.data?.["shopId"];
            $.venderId = lI11Ii.data?.["venderId"];
            $.startTime = lI11Ii.data?.["startTime"];
            $.endTime = lI11Ii.data?.["endTime"];
            $.activityType = lI11Ii.data?.["activityType"];
          } else lI11Ii.errorMessage ? console.log("" + (lI11Ii.errorMessage || "")) : console.log("" + lI11Ii);
        } else console.log("" + lI11Ii);
        break;
      case "getMyCidPing":
        if (typeof lI11Ii == "object") {
          if (lI11Ii.result && lI11Ii.result === true) {
            if (lI11Ii.data && typeof lI11Ii.data?.["secretPin"] != "undefined") $.Pin = lI11Ii.data?.["secretPin"];
            if (lI11Ii.data && typeof lI11Ii.data?.["nickname"] != "undefined") $.nickname = lI11Ii.data?.["nickname"];
          } else lI11Ii.errorMessage ? console.log("" + (lI11Ii.errorMessage || "")) : console.log("" + lI11Ii);
        } else console.log("" + lI11Ii);
        break;
      case "activityContent":
        if (typeof lI11Ii == "object") {
          if (lI11Ii.result && lI11Ii.result === true) {
            $.activityName = lI11Ii.data?.["activityName"] || "";
            $.endTime = lI11Ii.data?.["endTime"] || lI11Ii.data?.["activityVo"] && lI11Ii.data?.["activityVo"]?.["endTime"] || lI11Ii.data?.["activity"]?.["endTime"] || 0;
            $.hasEnd = lI11Ii.data?.["isEnd"] || false;
            $.score = lI11Ii.data?.["actorInfo"]?.["score"] || 0;
            $.actorUuid = lI11Ii.data?.["actorInfo"]?.["uuid"] || "";
            $.assistCount = lI11Ii.data?.["actorInfo"]?.["assistCount"] || 0;
          } else lI11Ii.errorMessage ? console.log("" + (lI11Ii.errorMessage || "")) : console.log("" + lI11Ii);
        } else console.log("" + lI11Ii);
        break;
      case "assist":
        if (typeof lI11Ii == "object") {
          if (lI11Ii.result && lI11Ii.result === true) {
            $.assist = lI11Ii.data;
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
          } else lI11Ii.errorMessage ? console.log("" + (lI11Ii.errorMessage || "")) : console.log("" + lI11Ii);
        } else console.log("" + lI11Ii);
        break;
      case "taskRecord":
        if (typeof lI11Ii == "object") {
          if (lI11Ii.result && lI11Ii.result === true) $.taskRecord = lI11Ii.data;else lI11Ii.errorMessage ? console.log("" + (lI11Ii.errorMessage || "")) : console.log("" + lI11Ii);
        } else console.log("" + lI11Ii);
        break;
      case "taskInfo":
        if (typeof lI11Ii == "object") {
          if (lI11Ii.result && lI11Ii.result === true) $.taskInfo = lI11Ii.data;else lI11Ii.errorMessage ? console.log("" + (lI11Ii.errorMessage || "")) : console.log("" + lI11Ii);
        } else console.log("" + lI11Ii);
        break;
      case "doTask":
        if (typeof lI11Ii == "object") {
          if (lI11Ii.result && lI11Ii.result === true) {
            let llliil = "任务完成";
            lI11Ii?.["data"]?.["beans"] > 0 && (llliil += "," + (lI11Ii?.["data"]?.["beans"] || 0) + "京豆");
            lI11Ii?.["data"]?.["score"] > 0 && (llliil += "," + (lI11Ii?.["data"]?.["score"] || 0) + "金币");
            console.log(llliil);
          } else lI11Ii.errorMessage ? console.log("" + (lI11Ii.errorMessage || "")) : console.log("" + lI11Ii);
        } else console.log("" + lI11Ii);
        break;
      case "startDraw":
        if (typeof lI11Ii == "object") {
          if (lI11Ii.result && lI11Ii.result === true) {
            if (lI11Ii.data?.["wdsrvo"]?.["drawState"]) {
              const liIl1 = lI11Ii.data?.["wdsrvo"];
              if (liIl1) switch (liIl1.drawType) {
                case 6:
                  $.prize.push("🎉 " + liIl1.drawName + " 🐶");
                  break;
                case 7:
                  const II1lll = liIl1.addressId,
                    II1lli = liIl1.drawName;
                  $.prize.push("🎉 恭喜获得实物,奖品名称：" + II1lli);
                  const ii1I1I = {
                      "baseUrl": domains,
                      "cookie": activityCookie,
                      "ua": $.UA,
                      "activityId": $.activityId,
                      "activityType": 99,
                      "venderId": [$.venderId, $.shopId],
                      "secretPin": $.Pin,
                      "prizeName": II1lli,
                      "generateId": II1lll,
                      "activityUrl": $.activityUrl
                    },
                    IiIl = await wuxian_savePrize(ii1I1I);
                  IiIl && (await notify.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + II1lli + "，已成功自动登记收货地址\n\n" + $.activityUrl));
                  break;
                case 8:
                  $.prize.push("🗑️ 专享价");
                  break;
                case 9:
                  $.prize.push("🗑️ " + liIl1.drawName + " 🎟️");
                  break;
                case 13:
                case 14:
                case 15:
                  $.prize.push("🎉 恭喜获得" + liIl1.drawName + " 🎁"), await notify.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + liIl1.drawName + "\n\n" + $.activityUrl);
                  break;
                case 16:
                  $.prize.push("🎉 " + liIl1.priceInfo + " 🧧");
                  break;
                default:
                  liIl1.drawName.includes("券") ? $.prize.push("🗑️ 优惠券") : $.prize.push("获得：" + liIl1.drawName);
                  break;
              }
            } else $.prize.push("💨 空气");
          } else {
            if (lI11Ii.errorMessage) {
              $.drawError = lI11Ii.errorMessage;
              ["上限", "不足", "超过", "非法操作", "明天"].some(l1il1l => $.drawError.includes(l1il1l)) && ($.drawStop = true, $.prize.push($.drawError));
              ["未开始", "结束", "不存在", "不在"].some(IllI1I => $.drawError.includes(IllI1I)) && ($.activityEnd = true);
              ["会员", "开卡"].some(liIil => $.drawError.includes(liIil)) && ($.needJoinMember = true, $.prize.push($.drawError));
              !["火爆", "擦肩", "缓存", "数据忙"].some(IlI1Il => $.drawError.includes(IlI1Il)) && !$.drawStop && !$.needJoinMember && $.prize.push($.drawError || "");
            }
          }
        } else console.log("❓" + IilIll + " " + JSON.stringify(lI11Ii));
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      default:
        console.log(IilIll + "-> " + lI11Ii);
    }
    typeof lI11Ii == "object" && lI11Ii.errorMessage && lI11Ii.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
  } catch (liIii) {
    console.log(liIii);
  }
}
async function getCk() {
  $.skipRun = true;
  const IlI1Ii = {
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
    i11I1I = 3;
  let l1il1i = 0,
    ll1 = null,
    iI1llI = false;
  while (l1il1i < i11I1I) {
    l1il1i > 0 && (await $.wait(1000));
    const i11I11 = await common.request(IlI1Ii);
    if (!i11I11.success) {
      ll1 = "getCk ➜ " + i11I11.error;
      l1il1i++;
      i11I11.status && [403, 493].includes(i11I11.status) && (iI1llI = true);
      continue;
    }
    if (!i11I11.data) {
      ll1 = "getCk ➜ 无响应数据";
      l1il1i++;
      continue;
    }
    i11I11.data.match(/(活动已经结束)/) && i11I11.data.match(/(活动已经结束)/)[1] && ($.activityEnd = true, console.log("活动已结束或不存在"));
    activityCookie = common.getResponseCookie(i11I11);
    let l1llIl = "",
      ii1I1l = "";
    l1llIl = common.getCookieValue(activityCookie, "LZ_TOKEN_KEY");
    ii1I1l = common.getCookieValue(activityCookie, "LZ_TOKEN_VALUE");
    l1llIl && ($.LZ_TOKEN_KEY = l1llIl);
    ii1I1l && ($.LZ_TOKEN_VALUE = ii1I1l);
    $.skipRun = false;
    break;
  }
  l1il1i >= i11I1I && (console.log(ll1), iI1llI && !hotbreak && ($.outFlag = true));
}
async function getAuthorCodeList(ii1I1i) {
  const llliI = await common.request({
      "url": ii1I1i,
      "method": "GET",
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      },
      "proxy": null,
      "debug": false,
      "timeout": 30000
    }),
    iI1li1 = llliI.data;
  return iI1li1;
}
function random(lllii1, liIli) {
  return Math.floor(Math.random() * (liIli - lllii1)) + lllii1;
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }

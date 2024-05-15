/*
活动名称：大牌联合（开卡）
环境变量：
        jd_dplh_viewShop // 是否（true/false）做浏览任务，默认不做
        jd_dplh_addCart // 是否（true/false）做加购任务，默认不做
        jd_dplh_draw // 抽奖次数，变量暂时无效
        jd_dplh_blacklist // 黑名单 用&隔开 pin值
        jd_dplh_Notify // 是否通知（true/false），默认不通知
        jd_dplh_break // IP限制后继续执行（true/false）

实物奖品需要填写地址变量才行，具体请查看 WIki

cron "1 1 1 1 *" script-path=jd_dplh.js

*/

const $ = new Env('大牌联合0510')
const jdCookie = require("./jdCookie"),
  common = require("./utils/Rebels_jdCommon"),
  notify = require("./utils/Rebels_sendJDNotify"),
  getToken = require("./utils/Rebels_Token"),
  CryptoJS = require("crypto-js");
console.log("");
console.log("==========" + $.name + "变量说明==========");
console.log("jd_dplh_viewShop // 是否（true/false）做浏览任务，默认不做");
console.log("jd_dplh_addCart // 是否（true/false）做加购任务，默认不做");
console.log("jd_dplh_wait // 延时参数，默认 1秒");
console.log("jd_dplh_draw // 抽奖次数，变量暂时无效");
console.log("jd_dplh_blacklist // 黑名单 用&隔开 pin值");
console.log("jd_dplh_Notify // 是否通知（true/false），默认不通知");
console.log("jd_dplh_break // IP限制后继续执行（true/false）");
console.log("==========" + $.name + "提示结束==========");
console.log("");
const activityUrl = process.env.jd_dplh_url || "94455b1bd357447_240510",
  dplh_viewShop = process.env.jd_dplh_viewShop === "true",
  dplh_AddCart = process.env.jd_dplh_addCart === "true",
  dplh_draw = process.env.jd_dplh_draw || 5,
  dplh_wait = process.env.jd_dplh_wait || 1,
  isNotify = process.env.jd_dplh_Notify === "true",
  hotbreak = process.env.jd_dplh_break === "true";
let waitTimes = parseInt(dplh_wait) * 1000;
const prize_type = {
  "jdMarket": "[京豆]",
  "coin": "[金币]",
  "point": "[积分]",
  "integral": "[积分]",
  "goods": "[实物]",
  "product": "[广告]",
  "coupon": "[优惠券]",
  "chance": "[次数]",
  "card": "[卡片]"
};
let cookie = "",
  originCookie = "",
  cookiesArr = Object.keys(jdCookie).map(IlI1ii => jdCookie[IlI1ii]).filter(lIIiii => lIIiii);
!cookiesArr[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
$.blacklist = process.env.jd_dplh_blacklist || "";
getBlacklist();
$.errMsgPin = [];
$.errOpencard = [];
!(async () => {
  if (!activityUrl) {
    console.log("⚠ 请先定义必要的环境变量后再运行脚本");
    return;
  }
  console.log("开卡类活动不会自动运行，请自行测试是否有水");
  authorCodeList = await getAuthorCodeList("http://km.jdbus.net/jd_dplh.json");
  authorCodeList ? (console.log("\n服务状态正常，活动获取成功"), $.authorCode = authorCodeList[random(0, authorCodeList.length)]) : ($.authorCode = "", console.log("\n服务状态异常，请检查网络是否正常\n"));
  $.activityUrl = activityUrl;
  $.activityUrl && ($.activityUrl.includes("actId=") ? $.activityId = common.getUrlParameter(activityUrl, "actId") : $.activityId = $.activityUrl);
  $.hostname = "jinggengjcq-isv.isvjcloud.com";
  $.baseUrl = "https://" + $.hostname;
  if (!$.activityId) {
    console.log("⚠ 请填写格式正确的变量");
    return;
  }
  notify.config({
    "title": $.name
  });
  $.userId = "10299171";
  $.inviteNick = $.authorCode;
  const ll1iI = process.env.WX_ADDRESS ? process.env.WX_ADDRESS : "";
  if (ll1iI && ll1iI != "") {
    const II1lil = ll1iI.split("|");
    $.randNum = Math.floor(Math.random() * II1lil.length);
    if (II1lil[$.randNum] === "") return console.log("❌ 随机抽取到的收货地址信息为空，请正确使用 \"|\" 管道符以用于分割多个收货地址！\n"), false;
    const [IIli1l, II1lii, lIIii1, ll1i1, IIli1i, I1iIi1] = II1lil[$.randNum].split("@");
    for (let lliil1 = 0; lliil1 < 6; lliil1++) {
      if (II1lil[lliil1] === "") return console.log("❌ 随机抽取到的收货地址信息格式存在错误（参数不能为空）\n"), false;
    }
    $.receiver = IIli1l;
    $.phone = II1lii;
    $.province = lIIii1;
    $.city = ll1i1;
    $.county = IIli1i;
    $.address = I1iIi1;
  }
  for (let IIllI = 0; IIllI < cookiesArr.length; IIllI++) {
    $.index = IIllI + 1;
    cookie = cookiesArr[IIllI];
    originCookie = cookiesArr[IIllI];
    common.setCookie(originCookie);
    $.UserName = decodeURIComponent(common.getCookieValue(cookie, "pt_pin"));
    $.UA = common.genUA($.UserName);
    $.message = notify.create($.index, $.UserName);
    $.nickName = "";
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
    await Main();
    common.unsetCookie();
    if ($.outFlag || $.runEnd) break;
  }
  if ($.errMsgPin.length > 0) {
    let lliilI = "\n以下账号可能是火爆，请加入黑名单\nexport jd_dplh_blacklist=\"" + $.errMsgPin.join("&") + "\"";
    console.log(lliilI);
  }
  if ($.errOpencard.length > 0) {
    let lili1 = "\n以下账号开卡火爆，请自行决定是否加入黑名单\n\"" + $.errOpencard.join("&") + "\"";
    console.log(lili1);
  }
  isNotify && notify.getMessage() && (notify.appendContent("\n【活动ID】" + $.activityId), await notify.push());
})().catch(ll1l1 => $.logErr(ll1l1)).finally(() => $.done());
async function Main() {
  try {
    $.skipRun = false;
    $.open_draw = false;
    $.jdToken = "";
    if ($.runEnd || $.outFlag) return;
    $.jdToken = await getToken(originCookie, $.baseUrl);
    if (!$.jdToken) {
      console.log("获取 Token 失败！");
      $.message.fix("获取[Token]失败");
      return;
    }
    $.activityload = "";
    await sendRequest("activity_load");
    if ($.MixNick == "") {
      console.log("获取[活动信息]失败，可能是黑号或者太卡了");
      return;
    }
    if ($.runEnd || $.outFlag || $.skipRun) return;
    if ($.index === 1) {
      const lI11Il = $.time("yyyy-MM-dd HH:mm", $.startTime),
        lIII1i = $.time("yyyy-MM-dd HH:mm", $.endTime);
      console.log("活动名称：#联合开卡[" + $.activityId + "]\n开始时间：" + lI11Il + "\n结束时间：" + lIII1i);
      notify.appendContent("活动名称：#联合开卡[" + $.activityId + "]\n开始时间：" + lI11Il + "\n结束时间：" + lIII1i);
      const l11i11 = Date.now();
      if ($.startTime && l11i11 < $.startTime) {
        console.log("活动将在 " + lI11Il + " 开始，晚点再来吧~");
        $.message.fix("活动尚未开始，开始时间：" + lI11Il);
        $.runEnd = true;
        return;
      }
      if ($.endTime && l11i11 > $.endTime) {
        console.log("活动已于 " + lIII1i + " 结束，下次早点来吧~");
        $.message.fix("活动已结束，结束时间：" + lIII1i);
        $.runEnd = true;
        return;
      }
    }
    console.log("账号活动信息：\n助力码：[" + $.MixNick + "]\n");
    $.inviteNick && (await sendRequest("绑定"), await $.wait(parseInt(waitTimes * 1 + 100, 10)));
    if ($.runEnd || $.outFlag) return;
    $.shopList = "";
    await sendRequest("shopList");
    await $.wait(parseInt(waitTimes * 1 + 100, 10));
    if ($.shopList) {
      let IilIl1 = ($.shopList || []).filter(lIII1l => lIII1l.open == false);
      console.log("共有" + $.shopList.length + "张卡,还需开" + IilIl1.length + "张卡");
      for (let l1iIIi of IilIl1 || []) {
        if (!l1iIIi.open) {
          $.missionType = "openCard";
          $.openUrl = l1iIIi.openCardUrl;
          $.shopTitle = l1iIIi.shopTitle;
          $.dplhVenderId = l1iIIi.userId;
          $.joinVenderId = common.getUrlParameter($.openUrl, "venderId");
          (!$.openUrl || !/^\d+$/.test($.joinVenderId)) && ($.joinVenderId = l1iIIi.userId);
          await sendRequest("mission");
          await $.wait(parseInt(waitTimes * 1 + 100, 10));
          const lilIi = await common.joinShopMember($.joinVenderId);
          if (lilIi) console.log("加入[" + $.shopTitle + "]店铺会员成功"), await $.wait(parseInt(waitTimes * 1 + 100, 10));else {
            console.log("[" + $.shopTitle + "]店铺开卡失败,跳过执行~");
            break;
          }
          await sendRequest("activity_load");
          await $.wait(parseInt(waitTimes * 1 + 100, 10));
          $.dplhVenderId = "";
        }
      }
    }
    $.hasCollectShop == 0 && ($.missionType = "uniteCollectShop", await sendRequest("mission"), await $.wait(parseInt(waitTimes * 1 + 100, 10)));
    dplh_AddCart ? $.hasAddCart == 0 && ($.missionType = "uniteAddCart", await sendRequest("mission"), await $.wait(parseInt(waitTimes * 1 + 100, 10))) : console.log("未设置加购任务变量，不执行加购任务\n");
    if (dplh_viewShop) {
      if ($.shopList) for (let l1l11I of $.shopList || []) {
        $.missionType = "viewShop";
        $.goodsNumId = l1l11I.userId;
        await sendRequest("mission");
        await $.wait(parseInt(waitTimes * 1 + 100, 10));
      }
    } else console.log("未设置浏览任务变量，不执行浏览任务\n");
    await sendRequest("list");
    await $.wait(parseInt(waitTimes * 1 + 100, 10));
    if (dplh_draw != 0) {
      if ($.open_draw) {
        let lilIl = parseInt($.remainPoint / 200);
        if (lilIl > dplh_draw) lilIl = dplh_draw;
        console.log("设定抽奖次数为:" + lilIl + "，当前积分：" + $.remainPoint);
        for (m = 1; lilIl--; m++) {
          console.log("第" + m + "次抽奖");
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await sendRequest("抽奖");
          if (Number(lilIl) <= 0) break;
          if (m >= 10) {
            console.log("抽奖太多次，多余的次数请再执行脚本");
            break;
          }
          await $.wait(parseInt(Math.random() * 2000 + 2000, 10));
        }
      }
    }
    console.log("当前助力:[" + ($.inviteNick || "未获取到数据") + "]");
    if ($.index == 1) {
    $.inviteNick = $.authorCode || authorCode;
    console.log("后面都助力:[" + $.inviteNick + "]");
  }    await $.wait(parseInt(waitTimes * 1 + 100, 10));
  } catch (l1llII) {
    console.log("❌ 脚本运行遇到了错误\n" + l1llII);
  }
}
async function handleResponse(iIli11, Iiiil) {
  try {
    switch (iIli11) {
      case "activity_load":
        if (Iiiil.success && Iiiil.data?.["status"] == 200) {
          $.activityload = Iiiil?.["data"]?.["data"];
          $.startTime = $.activityload?.["cusActivity"]?.["startTime"];
          $.endTime = $.activityload?.["cusActivity"]?.["endTime"];
          $.awardTime = $.activityload?.["cusActivity"]?.["awardTime"];
          $.MixNick = $.activityload?.["missionCustomer"]?.["buyerNick"];
          $.totalChance = $.activityload?.["missionCustomer"]?.["totalChance"];
          $.usedChance = $.activityload?.["missionCustomer"]?.["usedChance"];
          $.remainChance = $.activityload?.["missionCustomer"]?.["remainChance"];
          $.totalPoint = $.activityload?.["missionCustomer"]?.["totalPoint"];
          $.usedPoint = $.activityload?.["missionCustomer"]?.["usedPoint"];
          $.remainPoint = $.activityload?.["missionCustomer"]?.["remainPoint"];
          $.hasCollectShop = $.activityload?.["missionCustomer"]?.["hasCollectShop"];
          $.hasAddCart = $.activityload?.["missionCustomer"]?.["hasAddCart"];
          $.openCardStatus = $.activityload?.["openCardStatus"] || false;
          $.isGetRankGoods = $.activityload?.["isGetRankGoods"] || false;
          if ($.activityload?.["openCardMsg"]) console.log($.activityload?.["openCardMsg"]);
        } else Iiiil.data?.["status"] == 500 ? (console.log("" + Iiiil.errorMessage), $.errMsgPin.push($.UserName), $.message.fix("" + Iiiil.errorMessage), $.skipRun = true) : console.log("❓" + iIli11 + " " + JSON.stringify(Iiiil));
        break;
      case "绑定":
        if (Iiiil.success && Iiiil.data?.["status"] == 200) console.log("" + Iiiil.data?.["msg"]);else Iiiil.data?.["status"] == 500 ? (console.log("" + Iiiil.errorMessage), ["结束", "开始"].some(lIII11 => Iiiil.errorMessage.includes(lIII11)) && ($.runEnd = true)) : console.log("❓" + iIli11 + " " + JSON.stringify(Iiiil));
        break;
      case "shopList":
        if (Iiiil.success && Iiiil.data?.["status"] == 200) $.shopList = Iiiil?.["data"]?.["data"] || [];else Iiiil.data?.["status"] == 500 ? console.log("" + Iiiil.errorMessage) : console.log("❓" + iIli11 + " " + JSON.stringify(Iiiil));
        break;
      case "mission":
        if (Iiiil.success && Iiiil.data?.["status"] == 200) $.mission = Iiiil?.["data"]?.["data"], console.log("" + (Iiiil.msg || $.mission?.["remark"] || "")), $.message.fix("" + (Iiiil.msg || $.mission?.["remark"] || ""));else Iiiil.data?.["status"] == 500 ? console.log("" + Iiiil.errorMessage) : console.log("❓" + iIli11 + " " + JSON.stringify(Iiiil));
        break;
      case "getAwardSettingList":
        if (Iiiil.success && Iiiil.data?.["status"] == 200) $.getAwardSettingList = Iiiil?.["data"]?.["data"]?.["awardSettings"];else Iiiil.data?.["status"] == 500 ? console.log("" + Iiiil.errorMessage) : console.log("❓" + iIli11 + " " + JSON.stringify(Iiiil));
        break;
      case "exchangePost":
        if (Iiiil.success && Iiiil.data?.["status"] == 200) {
          $.exchangesuccess = true;
          $.exchangePost = Iiiil?.["data"]?.["data"];
          let IiilI = $.exchangePost?.["awardSendLog"],
            ii1I11 = IiilI?.["awardType"];
          switch (ii1I11) {
            case "jdMarket":
              console.log("🎉 " + IiilI?.["awardName"] + " 🐶"), $.message.fix("🎉 " + IiilI?.["awardName"] + " 🐶");
              break;
            case "point":
            case "integral":
              console.log("🗑️ " + IiilI?.["awardName"] + "  🎟️"), $.message.fix("🗑️ " + IiilI?.["awardName"] + "  🎟️");
              break;
            case "goods":
              $.generateId = IiilI?.["id"], $.prizeShiWu = IiilI?.["awardName"], console.log("🎉 恭喜获得实物~"), console.log("奖品名称：" + $.prizeShiWu);
              if (IiilI?.["awardPic"]) console.log("预览图片：" + IiilI?.["awardPic"]);
              $.message.fix("🎉 恭喜获得实物，奖品名称：" + $.prizeShiWu);
              process.env.WX_ADDRESS && (await sendRequest("updateAddress"), await $.wait(4000));
              break;
            case "coin":
            case "product":
            case "coupon":
            case "chance":
            case "card":
              console.log("🗑️ " + prize_type[prizeType]);
              break;
            default:
              console.log(ii1I11 + " 暂时未收录，请联系作者添加\n"), console.log("" + JSON.stringify($.exchangePost));
          }
        } else Iiiil.data?.["status"] == 500 ? console.log("" + Iiiil.errorMessage) : console.log("❓" + iIli11 + " " + JSON.stringify(Iiiil));
        break;
      case "inviteList":
        if (Iiiil.success && Iiiil.data?.["status"] == 200) $.inviteList = Iiiil?.["data"]?.["data"];else Iiiil.data?.["status"] == 500 ? console.log("" + Iiiil.errorMessage) : console.log("❓" + iIli11 + " " + JSON.stringify(Iiiil));
        break;
      case "list":
        if (Iiiil.success && Iiiil.data?.["status"] == 200) {
          let liIi1 = 0;
          for (let lI11II in Iiiil.data.data.list || []) {
            let l1llI1 = Iiiil.data.data.list[lI11II];
            liIi1 += Number(l1llI1.awardDes);
          }
          if (liIi1 > 0) console.log("查询奖励成功，累计获得" + liIi1 + "京豆\n");
        } else Iiiil.data?.["status"] == 500 ? console.log("" + Iiiil.errorMessage) : console.log("❓" + iIli11 + " " + JSON.stringify(Iiiil));
        break;
      case "updateAddress":
        if (Iiiil.success && Iiiil.data?.["status"] == 200) Iiiil?.["data"]?.["data"]?.["result"] ? (console.log("已提交收货地址 ✅\n登记为随机抽取到的第" + ($.randNum + 1) + "套收货地址信息\n联系信息：" + $.receiver + " (" + $.phone.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2") + "）\n"), !isNotify && (await notify.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + $.prizeShiWu + "，已成功自动登记收货地址\n\n活动ID：" + $.activityId)), $.message.insert($.prizeShiWu + "(已填地址)🎁")) : console.log(Iiiil.data.data);else Iiiil.data?.["status"] == 500 ? console.log("" + Iiiil.errorMessage) : console.log("❓" + iIli11 + " " + JSON.stringify(Iiiil));
        break;
      case "抽奖":
        console.log("❓" + iIli11 + " " + JSON.stringify(Iiiil));
        if (Iiiil.success && Iiiil.data?.["status"] == 200) {
          $.dplhdraw = Iiiil?.["data"]?.["data"];
          let llIIll = $.dplhdraw?.["awardSendLog"],
            IillIi = llIIll?.["awardType"];
          switch (IillIi) {
            case "jdMarket":
              console.log("🎉 " + llIIll?.["awardName"] + " 🐶"), $.message.fix("🎉 " + llIIll?.["awardName"] + " 🐶");
              break;
            case "point":
            case "integral":
              console.log("🗑️ " + llIIll?.["awardName"] + "  🎟️"), $.message.fix("🗑️ " + llIIll?.["awardName"] + "  🎟️");
              break;
            case "goods":
              $.generateId = llIIll?.["id"], $.prizeShiWu = llIIll?.["awardName"], console.log("🎉 恭喜获得实物~"), console.log("奖品名称：" + $.prizeShiWu);
              if (llIIll?.["awardPic"]) console.log("预览图片：" + llIIll?.["awardPic"]);
              $.message.fix("🎉 恭喜获得实物，奖品名称：" + $.prizeShiWu);
              process.env.WX_ADDRESS && (await sendRequest("updateAddress"), await $.wait(4000));
              break;
            case "coin":
            case "product":
            case "coupon":
            case "chance":
            case "card":
              console.log("🗑️ " + prize_type[prizeType]);
              break;
            default:
              console.log(IillIi + " 暂时未收录，请联系作者添加\n"), console.log("" + JSON.stringify($.exchangePost));
          }
        } else Iiiil.data?.["status"] == 500 ? console.log("" + Iiiil.errorMessage) : console.log("❓" + iIli11 + " " + JSON.stringify(Iiiil));
        break;
    }
  } catch (lii) {
    console.log("❌ 未能正确处理 " + iIli11 + " 请求响应 " + (lii.message || lii));
  }
}
async function sendRequest(IllI1i) {
  if ($.runEnd || $.outFlag) return;
  let lil = $.baseUrl,
    IllI1l = null,
    i11I1i = null,
    IillIl = "POST";
  switch (IllI1i) {
    case "activity_load":
      lil += "/dm/front/jdJoinCardtf/activity/load", i11I1i = {
        "open_id": "",
        "mix_nick": $.MixNick || "",
        "user_id": $.userId
      }, IllI1l = getSignBody("/jdJoinCardtf/activity/load", Object.assign({
        "jdToken": $.jdToken,
        "source": "01",
        "inviteNick": $.inviteNick || ""
      }, $.dplhVenderId ? {
        "shopId": "" + $.dplhVenderId
      } : {}));
      break;
    case "shopList":
      lil += "/dm/front/jdJoinCardtf/shop/shopList", i11I1i = {
        "open_id": "",
        "mix_nick": $.MixNick || "",
        "user_id": $.userId
      }, IllI1l = getSignBody("/jdJoinCardtf/shop/shopList", {});
      break;
    case "绑定":
      lil += "/dm/front/jdJoinCardtf/customer/inviteRelation", i11I1i = {
        "open_id": "",
        "mix_nick": $.MixNick || "",
        "user_id": $.userId
      }, IllI1l = getSignBody("/jdJoinCardtf/customer/inviteRelation", {
        "inviterNick": $.inviteNick || ""
      });
      break;
    case "mission":
      lil += "/dm/front/jdJoinCardtf/mission/completeMission", i11I1i = {
        "open_id": "",
        "mix_nick": $.MixNick || "",
        "user_id": $.userId
      }, IllI1l = getSignBody("/jdJoinCardtf/mission/completeMission", Object.assign({
        "missionType": $.missionType
      }, $.dplhVenderId ? {
        "shopId": $.dplhVenderId
      } : {}, $.goodsNumId ? {
        "goodsNumId": $.goodsNumId
      } : {}));
      break;
    case "getAwardSettingList":
      lil += "/dm/front/jdJoinCardtf/awards/getAwardSettingList", i11I1i = {
        "open_id": "",
        "mix_nick": $.MixNick || "",
        "user_id": $.userId
      }, IllI1l = getSignBody("/jdJoinCardtf/awards/getAwardSettingList", {
        "dataType": $.dataType
      });
      break;
    case "exchangePost":
      lil += "/dm/front/jdJoinCardtf/interactive/exchangePost", i11I1i = {
        "open_id": "",
        "mix_nick": $.MixNick || "",
        "user_id": $.userId
      }, IllI1l = getSignBody("/jdJoinCardtf/interactive/exchangePost", {
        "dataType": $.dataType,
        "awardId": $.awardId
      });
      break;
    case "抽奖":
      lil += "/dm/front/jdJoinCardtf/interactive/drawPost", i11I1i = {
        "open_id": "",
        "mix_nick": $.MixNick || "",
        "user_id": $.userId
      }, IllI1l = getSignBody("/jdJoinCardtf/interactive/drawPost", {
        "dataType": "draw",
        "usedGameNum": "2"
      });
      break;
    case "updateAddress":
      lil += "/dm/front/jdJoinCardtf/awards/updateAddress", i11I1i = {
        "open_id": "",
        "mix_nick": $.MixNick || "",
        "user_id": $.userId
      }, IllI1l = getSignBody("/jdJoinCardtf/awards/updateAddress", {
        "receiverName": $.receiver,
        "receiverMobile": $.phone,
        "receiverProvince": $.province,
        "receiverCity": $.city,
        "receiverDistrict": $.county,
        "receiverAddress": $.address,
        "logId": $.generateId
      });
      break;
    case "inviteList":
      lil += "/dm/front/jdJoinCardtf/customer/inviteList", i11I1i = {
        "open_id": "",
        "mix_nick": $.MixNick || "",
        "bizExtString": "",
        "user_id": $.userId
      }, IllI1l = getSignBody("/jdJoinCardtf/customer/inviteList", {});
      break;
    case "list":
      lil += "/dm/front/jdJoinCardtf/awards/list", i11I1i = {
        "open_id": "",
        "mix_nick": $.MixNick || "",
        "bizExtString": "",
        "user_id": $.userId
      }, IllI1l = getSignBody("/jdJoinCardtf/awards/list", {
        "pageNo": 1,
        "pageSize": 9999
      });
      break;
    default:
      console.log("❌ 未知请求 " + IllI1i);
      return;
  }
  const llliil = {};
  IllI1l && Object.assign(IllI1l, llliil);
  i11I1i && Object.assign(i11I1i, llliil);
  const liIl1 = {
    "url": lil,
    "method": IillIl,
    "headers": {
      "Accept": "application/json",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Connection": "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded",
      "Cookie": cookie,
      "User-Agent": $.UA,
      "X-Requested-With": "XMLHttpRequest"
    },
    "params": i11I1i,
    "data": IllI1l,
    "timeout": 30000
  };
  IillIl === "GET" && (delete liIl1.data, delete liIl1.headers["Content-Type"]);
  $.baseUrl.includes("jinggengjcq-isv.isvjcloud.com") && (Object.assign(liIl1.headers, {
    "Origin": "https://jinggengjcq-isv.isvjcloud.com",
    "Content-Type": "application/json; charset=utf-8"
  }), delete liIl1.headers.Cookie);
  const II1lll = 5;
  let II1lli = 0,
    ii1I1I = null,
    IiIl = false;
  while (II1lli < II1lll) {
    II1lli > 0 && (await $.wait(1000));
    const l1llIl = await common.request(liIl1);
    if (!l1llIl.success) {
      ii1I1I = "🚫 " + IllI1i + " 请求失败 ➜ " + l1llIl.error;
      II1lli++;
      continue;
    }
    if (!l1llIl.data) {
      ii1I1I = "🚫 " + IllI1i + " 请求失败 ➜ 无响应数据";
      II1lli++;
      continue;
    }
    await handleResponse(IllI1i, l1llIl.data);
    IiIl = false;
    break;
  }
  II1lli >= II1lll && (console.log(ii1I1I), IiIl && !hotbreak && ($.outFlag = true, $.message && $.message.fix(ii1I1I)));
}
function getSignBody(ii1I1l, ii1I1i) {
  const llliI = mpdzSign({
      "actId": $.activityId,
      ...ii1I1i,
      "method": ii1I1l,
      "userId": $.userId,
      "buyerNick": $.MixNick || ""
    }),
    iI1li1 = {
      "jsonRpc": "2.0",
      "params": {
        "commonParameter": {
          "m": "POST",
          "oba": llliI.sign,
          "timestamp": llliI.timeStamp,
          "userId": $.userId
        },
        "admJson": {
          "actId": $.activityId,
          ...ii1I1i,
          "method": ii1I1l,
          "userId": $.userId,
          "buyerNick": $.MixNick || ""
        }
      }
    };
  return ii1I1l.indexOf("missionInviteList") > -1 && delete iI1li1.params.admJson.actId, iI1li1;
}
function mpdzSign(iI1liI) {
  const llliiI = "6cc5dbd8900e434b94c4bdb0c16348ed",
    IilIiI = "c1614da9ac68",
    i1i1I1 = new Date().valueOf(),
    IlII1 = new RegExp("'", "g"),
    IiI11 = new RegExp("~", "g"),
    lli = encodeURIComponent(JSON.stringify(iI1liI)).replace(IlII1, "%27").replace(IiI11, "%7E"),
    liIlI = "f" + IilIiI + "D" + lli + "c" + i1i1I1 + llliiI,
    lll = CryptoJS.MD5(liIlI.toLowerCase()).toString();
  return {
    "sign": lll,
    "timeStamp": i1i1I1
  };
}
async function getAuthorCodeList(iI1lil) {
  const iIli1l = await common.request({
      "url": iI1lil,
      "method": "GET",
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      },
      "proxy": null,
      "debug": false,
      "timeout": 30000
    }),
    i1i1II = iIli1l.data;
  return i1i1II;
}
function random(liiIIl, iil1iI) {
  return Math.floor(Math.random() * (iil1iI - liiIIl)) + liiIIl;
}
function getBlacklist() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const IlIIi = Array.from(new Set($.blacklist.split("&")));
  console.log(IlIIi.join("&") + "\n");
  let IiI1l = IlIIi,
    illlII = [],
    iIII11 = false;
  for (let i1i1Ii = 0; i1i1Ii < cookiesArr.length; i1i1Ii++) {
    let lllii = decodeURIComponent(cookiesArr[i1i1Ii].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[i1i1Ii].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!lllii) break;
    let iI11Ii = false;
    for (let iIII1l of IiI1l) {
      if (iIII1l && iIII1l == lllii) {
        iI11Ii = true;
        break;
      }
    }
    !iI11Ii && (iIII11 = true, illlII.splice(i1i1Ii, -1, cookiesArr[i1i1Ii]));
  }
  if (iIII11) cookiesArr = illlII;
}
// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}

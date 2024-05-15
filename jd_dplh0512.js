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

const $ = new Env('大牌联合0512')
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
const activityUrl = process.env.jd_dplh_url || "5433db45f9754ee788334f326e1bc_240512",
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
  cookiesArr = Object.keys(jdCookie).map(IIliI => jdCookie[IIliI]).filter(ilI1ll => ilI1ll);
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
  const IlI1iI = process.env.WX_ADDRESS ? process.env.WX_ADDRESS : "";
  if (IlI1iI && IlI1iI != "") {
    const lili1 = IlI1iI.split("|");
    $.randNum = Math.floor(Math.random() * lili1.length);
    if (lili1[$.randNum] === "") return console.log("❌ 随机抽取到的收货地址信息为空，请正确使用 \"|\" 管道符以用于分割多个收货地址！\n"), false;
    const [ll1l1, IllIIi, IllIIl, IiiIi1, l1ii1, ii1ll] = lili1[$.randNum].split("@");
    for (let IliI1l = 0; IliI1l < 6; IliI1l++) {
      if (lili1[IliI1l] === "") return console.log("❌ 随机抽取到的收货地址信息格式存在错误（参数不能为空）\n"), false;
    }
    $.receiver = ll1l1;
    $.phone = IllIIi;
    $.province = IllIIl;
    $.city = IiiIi1;
    $.county = l1ii1;
    $.address = ii1ll;
  }
  for (let lliiil = 0; lliiil < cookiesArr.length; lliiil++) {
    $.index = lliiil + 1;
    cookie = cookiesArr[lliiil];
    originCookie = cookiesArr[lliiil];
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
    let lliiii = "\n以下账号可能是火爆，请加入黑名单\nexport jd_dplh_blacklist=\"" + $.errMsgPin.join("&") + "\"";
    console.log(lliiii);
  }
  if ($.errOpencard.length > 0) {
    let IliI1i = "\n以下账号开卡火爆，请自行决定是否加入黑名单\n\"" + $.errOpencard.join("&") + "\"";
    console.log(IliI1i);
  }
  isNotify && notify.getMessage() && (notify.appendContent("\n【活动ID】" + $.activityId), await notify.push());
})().catch(ll1ii => $.logErr(ll1ii)).finally(() => $.done());
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
      const IiI1 = $.time("yyyy-MM-dd HH:mm", $.startTime),
        liI = $.time("yyyy-MM-dd HH:mm", $.endTime);
      console.log("活动名称：#联合开卡[" + $.activityId + "]\n开始时间：" + IiI1 + "\n结束时间：" + liI);
      notify.appendContent("活动名称：#联合开卡[" + $.activityId + "]\n开始时间：" + IiI1 + "\n结束时间：" + liI);
      const illIli = Date.now();
      if ($.startTime && illIli < $.startTime) {
        console.log("活动将在 " + IiI1 + " 开始，晚点再来吧~");
        $.message.fix("活动尚未开始，开始时间：" + IiI1);
        $.runEnd = true;
        return;
      }
      if ($.endTime && illIli > $.endTime) {
        console.log("活动已于 " + liI + " 结束，下次早点来吧~");
        $.message.fix("活动已结束，结束时间：" + liI);
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
      let l11i1l = ($.shopList || []).filter(lIII11 => lIII11.open == false);
      console.log("共有" + $.shopList.length + "张卡,还需开" + l11i1l.length + "张卡");
      for (let IiilI of l11i1l || []) {
        if (!IiilI.open) {
          $.missionType = "openCard";
          $.openUrl = IiilI.openCardUrl;
          $.shopTitle = IiilI.shopTitle;
          $.dplhVenderId = IiilI.userId;
          $.joinVenderId = common.getUrlParameter($.openUrl, "venderId");
          (!$.openUrl || !/^\d+$/.test($.joinVenderId)) && ($.joinVenderId = IiilI.userId);
          await sendRequest("mission");
          await $.wait(parseInt(waitTimes * 1 + 100, 10));
          const ii1I11 = await common.joinShopMember($.joinVenderId);
          if (ii1I11) console.log("加入[" + $.shopTitle + "]店铺会员成功"), await $.wait(parseInt(waitTimes * 1 + 100, 10));else {
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
      if ($.shopList) for (let liIi1 of $.shopList || []) {
        $.missionType = "viewShop";
        $.goodsNumId = liIi1.userId;
        await sendRequest("mission");
        await $.wait(parseInt(waitTimes * 1 + 100, 10));
      }
    } else console.log("未设置浏览任务变量，不执行浏览任务\n");
    await sendRequest("list");
    await $.wait(parseInt(waitTimes * 1 + 100, 10));
    if (dplh_draw != 0) {
      if ($.open_draw) {
        let lI11II = parseInt($.remainPoint / 200);
        if (lI11II > dplh_draw) lI11II = dplh_draw;
        console.log("设定抽奖次数为:" + lI11II + "，当前积分：" + $.remainPoint);
        for (m = 1; lI11II--; m++) {
          console.log("第" + m + "次抽奖");
          await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
          await sendRequest("抽奖");
          if (Number(lI11II) <= 0) break;
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
  }
    await $.wait(parseInt(waitTimes * 1 + 100, 10));
  } catch (l1llI1) {
    console.log("❌ 脚本运行遇到了错误\n" + l1llI1);
  }
}
async function handleResponse(llIIll, IillIi) {
  try {
    switch (llIIll) {
      case "activity_load":
        if (IillIi.success && IillIi.data?.["status"] == 200) {
          $.activityload = IillIi?.["data"]?.["data"];
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
        } else IillIi.data?.["status"] == 500 ? (console.log("" + IillIi.errorMessage), $.errMsgPin.push($.UserName), $.message.fix("" + IillIi.errorMessage), $.skipRun = true) : console.log("❓" + llIIll + " " + JSON.stringify(IillIi));
        break;
      case "绑定":
        if (IillIi.success && IillIi.data?.["status"] == 200) console.log("" + IillIi.data?.["msg"]);else IillIi.data?.["status"] == 500 ? (console.log("" + IillIi.errorMessage), ["结束", "开始"].some(II1llI => IillIi.errorMessage.includes(II1llI)) && ($.runEnd = true)) : console.log("❓" + llIIll + " " + JSON.stringify(IillIi));
        break;
      case "shopList":
        if (IillIi.success && IillIi.data?.["status"] == 200) $.shopList = IillIi?.["data"]?.["data"] || [];else IillIi.data?.["status"] == 500 ? console.log("" + IillIi.errorMessage) : console.log("❓" + llIIll + " " + JSON.stringify(IillIi));
        break;
      case "mission":
        if (IillIi.success && IillIi.data?.["status"] == 200) $.mission = IillIi?.["data"]?.["data"], console.log("" + (IillIi.msg || $.mission?.["remark"] || "")), $.message.fix("" + (IillIi.msg || $.mission?.["remark"] || ""));else IillIi.data?.["status"] == 500 ? console.log("" + IillIi.errorMessage) : console.log("❓" + llIIll + " " + JSON.stringify(IillIi));
        break;
      case "getAwardSettingList":
        if (IillIi.success && IillIi.data?.["status"] == 200) $.getAwardSettingList = IillIi?.["data"]?.["data"]?.["awardSettings"];else IillIi.data?.["status"] == 500 ? console.log("" + IillIi.errorMessage) : console.log("❓" + llIIll + " " + JSON.stringify(IillIi));
        break;
      case "exchangePost":
        if (IillIi.success && IillIi.data?.["status"] == 200) {
          $.exchangesuccess = true;
          $.exchangePost = IillIi?.["data"]?.["data"];
          let i11I11 = $.exchangePost?.["awardSendLog"],
            l1llIl = i11I11?.["awardType"];
          switch (l1llIl) {
            case "jdMarket":
              console.log("🎉 " + i11I11?.["awardName"] + " 🐶"), $.message.fix("🎉 " + i11I11?.["awardName"] + " 🐶");
              break;
            case "point":
            case "integral":
              console.log("🗑️ " + i11I11?.["awardName"] + "  🎟️"), $.message.fix("🗑️ " + i11I11?.["awardName"] + "  🎟️");
              break;
            case "goods":
              $.generateId = i11I11?.["id"], $.prizeShiWu = i11I11?.["awardName"], console.log("🎉 恭喜获得实物~"), console.log("奖品名称：" + $.prizeShiWu);
              if (i11I11?.["awardPic"]) console.log("预览图片：" + i11I11?.["awardPic"]);
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
              console.log(l1llIl + " 暂时未收录，请联系作者添加\n"), console.log("" + JSON.stringify($.exchangePost));
          }
        } else IillIi.data?.["status"] == 500 ? console.log("" + IillIi.errorMessage) : console.log("❓" + llIIll + " " + JSON.stringify(IillIi));
        break;
      case "inviteList":
        if (IillIi.success && IillIi.data?.["status"] == 200) $.inviteList = IillIi?.["data"]?.["data"];else IillIi.data?.["status"] == 500 ? console.log("" + IillIi.errorMessage) : console.log("❓" + llIIll + " " + JSON.stringify(IillIi));
        break;
      case "list":
        if (IillIi.success && IillIi.data?.["status"] == 200) {
          let ii1I1l = 0;
          for (let ii1I1i in IillIi.data.data.list || []) {
            let llI = IillIi.data.data.list[ii1I1i];
            ii1I1l += Number(llI.awardDes);
          }
          if (ii1I1l > 0) console.log("查询奖励成功，累计获得" + ii1I1l + "京豆\n");
        } else IillIi.data?.["status"] == 500 ? console.log("" + IillIi.errorMessage) : console.log("❓" + llIIll + " " + JSON.stringify(IillIi));
        break;
      case "updateAddress":
        if (IillIi.success && IillIi.data?.["status"] == 200) IillIi?.["data"]?.["data"]?.["result"] ? (console.log("已提交收货地址 ✅\n登记为随机抽取到的第" + ($.randNum + 1) + "套收货地址信息\n联系信息：" + $.receiver + " (" + $.phone.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2") + "）\n"), !isNotify && (await notify.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + $.prizeShiWu + "，已成功自动登记收货地址\n\n活动ID：" + $.activityId)), $.message.insert($.prizeShiWu + "(已填地址)🎁")) : console.log(IillIi.data.data);else IillIi.data?.["status"] == 500 ? console.log("" + IillIi.errorMessage) : console.log("❓" + llIIll + " " + JSON.stringify(IillIi));
        break;
      case "抽奖":
        console.log("❓" + llIIll + " " + JSON.stringify(IillIi));
        if (IillIi.success && IillIi.data?.["status"] == 200) {
          $.dplhdraw = IillIi?.["data"]?.["data"];
          let llliI = $.dplhdraw?.["awardSendLog"],
            iI1li1 = llliI?.["awardType"];
          switch (iI1li1) {
            case "jdMarket":
              console.log("🎉 " + llliI?.["awardName"] + " 🐶"), $.message.fix("🎉 " + llliI?.["awardName"] + " 🐶");
              break;
            case "point":
            case "integral":
              console.log("🗑️ " + llliI?.["awardName"] + "  🎟️"), $.message.fix("🗑️ " + llliI?.["awardName"] + "  🎟️");
              break;
            case "goods":
              $.generateId = llliI?.["id"], $.prizeShiWu = llliI?.["awardName"], console.log("🎉 恭喜获得实物~"), console.log("奖品名称：" + $.prizeShiWu);
              if (llliI?.["awardPic"]) console.log("预览图片：" + llliI?.["awardPic"]);
              $.message.fix("🎉 恭喜获得实物，奖品名称：" + $.prizeShiWu);
              process.env.WX_ADDRESS && (await sendRequest("updateAddress"), await $.wait(4000));
              break;
            case "coin":
            case "product":
            case "coupon":
            case "chance":
            case "card":
              console.log("🗑️ " + prize_type[iI1li1]);
              break;
            default:
              console.log(iI1li1 + " 暂时未收录，请联系作者添加\n"), console.log("" + JSON.stringify($.exchangePost));
          }
        } else IillIi.data?.["status"] == 500 ? console.log("" + IillIi.errorMessage) : console.log("❓" + llIIll + " " + JSON.stringify(IillIi));
        break;
    }
  } catch (lllii1) {
    console.log("❌ 未能正确处理 " + llIIll + " 请求响应 " + (lllii1.message || lllii1));
  }
}
async function sendRequest(liIli) {
  if ($.runEnd || $.outFlag) return;
  let IilIi1 = $.baseUrl,
    iI1liI = null,
    l1lIiI = null,
    llliiI = "POST";
  switch (liIli) {
    case "activity_load":
      IilIi1 += "/dm/front/jdJoinCardtf/activity/load", l1lIiI = {
        "open_id": "",
        "mix_nick": $.MixNick || "",
        "user_id": $.userId
      }, iI1liI = getSignBody("/jdJoinCardtf/activity/load", Object.assign({
        "jdToken": $.jdToken,
        "source": "01",
        "inviteNick": $.inviteNick || ""
      }, $.dplhVenderId ? {
        "shopId": "" + $.dplhVenderId
      } : {}));
      break;
    case "shopList":
      IilIi1 += "/dm/front/jdJoinCardtf/shop/shopList", l1lIiI = {
        "open_id": "",
        "mix_nick": $.MixNick || "",
        "user_id": $.userId
      }, iI1liI = getSignBody("/jdJoinCardtf/shop/shopList", {});
      break;
    case "绑定":
      IilIi1 += "/dm/front/jdJoinCardtf/customer/inviteRelation", l1lIiI = {
        "open_id": "",
        "mix_nick": $.MixNick || "",
        "user_id": $.userId
      }, iI1liI = getSignBody("/jdJoinCardtf/customer/inviteRelation", {
        "inviterNick": $.inviteNick || ""
      });
      break;
    case "mission":
      IilIi1 += "/dm/front/jdJoinCardtf/mission/completeMission", l1lIiI = {
        "open_id": "",
        "mix_nick": $.MixNick || "",
        "user_id": $.userId
      }, iI1liI = getSignBody("/jdJoinCardtf/mission/completeMission", Object.assign({
        "missionType": $.missionType
      }, $.dplhVenderId ? {
        "shopId": $.dplhVenderId
      } : {}, $.goodsNumId ? {
        "goodsNumId": $.goodsNumId
      } : {}));
      break;
    case "getAwardSettingList":
      IilIi1 += "/dm/front/jdJoinCardtf/awards/getAwardSettingList", l1lIiI = {
        "open_id": "",
        "mix_nick": $.MixNick || "",
        "user_id": $.userId
      }, iI1liI = getSignBody("/jdJoinCardtf/awards/getAwardSettingList", {
        "dataType": $.dataType
      });
      break;
    case "exchangePost":
      IilIi1 += "/dm/front/jdJoinCardtf/interactive/exchangePost", l1lIiI = {
        "open_id": "",
        "mix_nick": $.MixNick || "",
        "user_id": $.userId
      }, iI1liI = getSignBody("/jdJoinCardtf/interactive/exchangePost", {
        "dataType": $.dataType,
        "awardId": $.awardId
      });
      break;
    case "抽奖":
      IilIi1 += "/dm/front/jdJoinCardtf/interactive/drawPost", l1lIiI = {
        "open_id": "",
        "mix_nick": $.MixNick || "",
        "user_id": $.userId
      }, iI1liI = getSignBody("/jdJoinCardtf/interactive/drawPost", {
        "dataType": "draw",
        "usedGameNum": "2"
      });
      break;
    case "updateAddress":
      IilIi1 += "/dm/front/jdJoinCardtf/awards/updateAddress", l1lIiI = {
        "open_id": "",
        "mix_nick": $.MixNick || "",
        "user_id": $.userId
      }, iI1liI = getSignBody("/jdJoinCardtf/awards/updateAddress", {
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
      IilIi1 += "/dm/front/jdJoinCardtf/customer/inviteList", l1lIiI = {
        "open_id": "",
        "mix_nick": $.MixNick || "",
        "bizExtString": "",
        "user_id": $.userId
      }, iI1liI = getSignBody("/jdJoinCardtf/customer/inviteList", {});
      break;
    case "list":
      IilIi1 += "/dm/front/jdJoinCardtf/awards/list", l1lIiI = {
        "open_id": "",
        "mix_nick": $.MixNick || "",
        "bizExtString": "",
        "user_id": $.userId
      }, iI1liI = getSignBody("/jdJoinCardtf/awards/list", {
        "pageNo": 1,
        "pageSize": 9999
      });
      break;
    default:
      console.log("❌ 未知请求 " + liIli);
      return;
  }
  const IilIiI = {};
  iI1liI && Object.assign(iI1liI, IilIiI);
  l1lIiI && Object.assign(l1lIiI, IilIiI);
  const i1i1I1 = {
    "url": IilIi1,
    "method": llliiI,
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
    "params": l1lIiI,
    "data": iI1liI,
    "timeout": 30000
  };
  llliiI === "GET" && (delete i1i1I1.data, delete i1i1I1.headers["Content-Type"]);
  $.baseUrl.includes("jinggengjcq-isv.isvjcloud.com") && (Object.assign(i1i1I1.headers, {
    "Origin": "https://jinggengjcq-isv.isvjcloud.com",
    "Content-Type": "application/json; charset=utf-8"
  }), delete i1i1I1.headers.Cookie);
  const IlII1 = 5;
  let IiI11 = 0,
    lli = null,
    liIlI = false;
  while (IiI11 < IlII1) {
    IiI11 > 0 && (await $.wait(1000));
    const llll1 = await common.request(i1i1I1);
    if (!llll1.success) {
      lli = "🚫 " + liIli + " 请求失败 ➜ " + llll1.error;
      IiI11++;
      continue;
    }
    if (!llll1.data) {
      lli = "🚫 " + liIli + " 请求失败 ➜ 无响应数据";
      IiI11++;
      continue;
    }
    await handleResponse(liIli, llll1.data);
    liIlI = false;
    break;
  }
  IiI11 >= IlII1 && (console.log(lli), liIlI && !hotbreak && ($.outFlag = true, $.message && $.message.fix(lli)));
}
function getSignBody(lil11l, i1i1Il) {
  const lil11i = mpdzSign({
      "actId": $.activityId,
      ...i1i1Il,
      "method": lil11l,
      "userId": $.userId,
      "buyerNick": $.MixNick || ""
    }),
    IlIIl = {
      "jsonRpc": "2.0",
      "params": {
        "commonParameter": {
          "m": "POST",
          "oba": lil11i.sign,
          "timestamp": lil11i.timeStamp,
          "userId": $.userId
        },
        "admJson": {
          "actId": $.activityId,
          ...i1i1Il,
          "method": lil11l,
          "userId": $.userId,
          "buyerNick": $.MixNick || ""
        }
      }
    };
  return lil11l.indexOf("missionInviteList") > -1 && delete IlIIl.params.admJson.actId, IlIIl;
}
function mpdzSign(iIII1l) {
  const iI11Il = "6cc5dbd8900e434b94c4bdb0c16348ed",
    iIII1i = "c1614da9ac68",
    iil1i1 = new Date().valueOf(),
    il1i11 = new RegExp("'", "g"),
    IlIll1 = new RegExp("~", "g"),
    IlIII = encodeURIComponent(JSON.stringify(iIII1l)).replace(il1i11, "%27").replace(IlIll1, "%7E"),
    ilil1l = "f" + iIII1i + "D" + IlIII + "c" + iil1i1 + iI11Il,
    illlIi = CryptoJS.MD5(ilil1l.toLowerCase()).toString();
  return {
    "sign": illlIi,
    "timeStamp": iil1i1
  };
}
async function getAuthorCodeList(I1lIil) {
  const liiII1 = await common.request({
      "url": I1lIil,
      "method": "GET",
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      },
      "proxy": null,
      "debug": false,
      "timeout": 30000
    }),
    IIIl1l = liiII1.data;
  return IIIl1l;
}
function random(lllll, i11ili) {
  return Math.floor(Math.random() * (i11ili - lllll)) + lllll;
}
function getBlacklist() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const lllli = Array.from(new Set($.blacklist.split("&")));
  console.log(lllli.join("&") + "\n");
  let iiili1 = lllli,
    ill11i = [],
    lllill = false;
  for (let il1i1l = 0; il1i1l < cookiesArr.length; il1i1l++) {
    let IlIlll = decodeURIComponent(cookiesArr[il1i1l].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[il1i1l].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!IlIlll) break;
    let IIIl1I = false;
    for (let iil1ii of iiili1) {
      if (iil1ii && iil1ii == IlIlll) {
        IIIl1I = true;
        break;
      }
    }
    !IIIl1I && (lllill = true, ill11i.splice(il1i1l, -1, cookiesArr[il1i1l]));
  }
  if (lllill) cookiesArr = ill11i;
}
// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}

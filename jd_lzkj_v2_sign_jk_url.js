/*
活动名称：签到（超级无线V2）
活动链接：https://lzkj-isv.isvjcloud.com/prod/cc/interaction/v2/<类型id>/<模板id>/?activityId=<活动id>&shopId=<店铺id>
环境变量：jd_lzkj_v2_sign_jk_url // 活动链接 多个用英文逗号，@，换行分割
		jd_lzkj_v2_sign_opencard // 是否入会（true/false），默认不入会
        jd_lzkj_v2_sign_notify // 是否推送通知（true/false），默认不推送
        jd_lzkj_v2_sign_break // IP被限制后继续执行，默认退出运行（true/false）

支持的活动类型：<类型id>
10001 10004 签到抽奖
10023 10040 签到有礼
10002 10003 累计签到有礼

cron:1 1 1 1 *

*/

const $ = new Env('签到（超级无线V2）监控版')
const jdCookie = require("./jdCookie"),
  common = require("./utils/Rebels_jdCommon"),
  notify = require("./utils/Rebels_sendJDNotify"),
  getToken = require("./utils/Rebels_Token"),
  {
    wuxianDefense
  } = require("./utils/Rebels_H"),
  {
    lzkjv2_savePrize
  } = require("./utils/Rebels_savePrize");
console.log("");
console.log("==========" + $.name + "变量说明==========");
console.log("jd_lzkj_v2_sign_jk_url // 活动链接");
console.log("jd_lzkj_v2_sign_opencard // 是否入会（true/false），默认不入会");
console.log("jd_lzkj_v2_sign_notify // 是否通知（true/false），默认不通知");
console.log("jd_lzkj_v2_sign_break // IP限制后继续执行（true/false）");
console.log("==========" + $.name + "提示结束==========");
console.log("");
const activityUrl = (process.env.jd_lzkj_v2_sign_jk_url || "").split(/[,@\n]+/g).map(I1ilI1 => I1ilI1.trim()).filter(Boolean),
  joinMember = process.env.jd_lzkj_v2_sign_opencard === "true",
  isNotify = process.env.jd_lzkj_v2_sign_notify === "true",
  hotbreak = process.env.jd_lzkj_v2_sign_break === "true";
let cookie = "",
  originCookie = "";
const cookiesArr = Object.keys(jdCookie).map(iillll => jdCookie[iillll]).filter(lIIilI => lIIilI);
!cookiesArr[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
const activityHandlers = {
  10001: handleCalendarAndSign,
  10004: handleCalendarAndSign,
  10002: handleActivity,
  10003: handleActivity,
  10023: handleCalendar,
  10040: handleCalendar
};
!(async () => {
  if (activityUrl.length === 0) {
    console.log("⚠ 请先定义必要的环境变量后再运行脚本");
    return;
  }
  const l1lIlI = [...new Set(activityUrl)];
  console.log("🏬  共计 " + l1lIlI.length + " 个签到活动");
  for (let I1l1Il = 0; I1l1Il < l1lIlI.length; I1l1Il++) {
    console.log("");
    const llIll1 = common.parseUrl(l1lIlI[I1l1Il]);
    if (!llIll1) {
      console.log("[" + l1lIlI[I1l1Il] + "]\n⚠ 请填写格式正确的变量");
      continue;
    }
    $.activityUrl = l1lIlI[I1l1Il];
    $.activityId = common.getUrlParameter(l1lIlI[I1l1Il], "activityId");
    $.shopId = common.getUrlParameter(l1lIlI[I1l1Il], "shopId");
    $.hostname = llIll1.hostname;
    $.pathname = llIll1.pathname;
    if ($.hostname) {
      $.baseUrl = "https://" + $.hostname;
      $.newbaseUrl = "https://" + $.hostname + "/prod/cc/interaction/v2";
      $.origin = $.baseUrl;
      try {
        const Illl1l = $.pathname.split("/prod/cc/interaction/v2/")[1];
        $.activityType = Illl1l.split("/")[0];
        $.templateCode = Illl1l.split("/")[1];
      } catch {}
    }
    if (!$.activityId || !$.shopId || !$.hostname || !$.activityType || !$.templateCode) {
      console.log("[" + l1lIlI[I1l1Il] + "]\n⚠ 请填写格式正确的变量");
      continue;
    }
    switch ($.activityType) {
      case "10001":
      case "10002":
      case "10003":
      case "10004":
      case "10023":
      case "10040":
        break;
      default:
        console.log("❌ 当前活动类型（" + $.activityType + "）暂不受本脚本支持，请联系作者进行反馈！");
        return;
    }
    $.activityUrl = "https://lzkj-isv.isvjcloud.com/prod/cc/interaction/v2/" + $.activityType + "/" + $.templateCode + "/?activityId=" + $.activityId + "&shopId=" + $.shopId;
    notify.config({
      "title": $.name
    });
    console.log("活动入口：" + $.activityUrl);
    $.runEnd = false;
    for (let Illl1i = 0; Illl1i < cookiesArr.length; Illl1i++) {
      $.index = Illl1i + 1;
      cookie = cookiesArr[Illl1i];
      originCookie = cookiesArr[Illl1i];
      common.setCookie(originCookie);
      $.UserName = decodeURIComponent(common.getCookieValue(cookie, "pt_pin"));
      $.UA = common.genUA($.UserName);
      $.message = notify.create($.index, $.UserName);
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      await Main();
      common.unsetCookie();
      await $.wait(500);
      if ($.outFlag || $.runEnd) break;
    }
    isNotify && notify.getMessage() && (notify.appendContent("\n【活动地址】" + $.activityUrl), await notify.push(), notify.updateContent(""));
    $.activityType = $.templateCode = $.activityId = $.shopId = "";
  }
})().catch(lIIiil => $.logErr(lIIiil)).finally(() => $.done());
async function Main() {
  try {
    $.skipRun = false;
    $.pinToken = "";
    if ($.runEnd || $.outFlag) return;
    $.jdToken = await getToken(originCookie, $.baseUrl);
    if (!$.jdToken) {
      console.log("获取 Token 失败！");
      $.message.fix("获取[Token]失败");
      return;
    }
    await sendRequest("login");
    if ($.runEnd || $.outFlag || $.skipRun) return;
    if (!$.pinToken) {
      console.log("未能获取用户鉴权信息！");
      $.message.fix("未能获取用户鉴权信息");
      return;
    }
    $.getActivityBase = "";
    await sendRequest("getActivityBase");
    await $.wait(500);
    if ($.runEnd || $.outFlag || $.skipRun) return;
    if (!$.getActivityBase) {
      console.log("未获取到任务信息");
      return;
    }
    if ($.index === 1) {
      $.shopName = $.getActivityBase.shopName;
      $.activityName = $.getActivityBase.activityName;
      $.actStartTime = $.getActivityBase.startTime;
      $.actEndTime = $.getActivityBase.endTime;
      await sendRequest("getPrizeList");
      if ($.runEnd || $.outFlag || $.skipRun) return;
      const iI1lli = $.time("yyyy-MM-dd HH:mm", $.actStartTime),
        ll1iI = $.time("yyyy-MM-dd HH:mm", $.actEndTime);
      switch ($.activityType) {
        case "10001":
        case "10002":
        case "10003":
        case "10004":
          if ($.prizeInfo && $.prizeInfo.length) {
            let iI1lll = "";
            for (let I1l1II = 0; I1l1II < $.prizeInfo.length; I1l1II++) {
              const IIli1I = $.prizeInfo[I1l1II],
                I1i11I = IIli1I.prizeName;
              let llIliI = "";
              IIli1I.remainNum >= 0 && (llIliI = "(剩余" + IIli1I.remainNum + "份)");
              iI1lll += "  " + I1i11I + llIliI + "\n";
            }
            console.log(($.shopName ? "店铺名称：#" + $.shopName + "\n" : "") + "店铺链接：https://shop.m.jd.com/?shopId=" + $.shopId + "\n活动名称：" + $.activityName + "\n开始时间：" + iI1lli + "\n结束时间：" + ll1iI + "\n活动奖品：\n" + iI1lll);
            notify.appendContent(($.shopName ? "\n【店铺名称】#" + $.shopName : "") + "\n【开始时间】" + iI1lli + "\n【结束时间】" + ll1iI + "\n【活动奖品】\n" + iI1lll + "\n");
            const l1lIll = Date.now();
            if ($.actStartTime && l1lIll < $.actStartTime) {
              console.log("活动将在 " + iI1lli + " 开始，晚点再来吧~");
              $.message.fix("活动尚未开始，开始时间：" + iI1lli);
              $.runEnd = true;
              return;
            }
            if ($.actEndTime && l1lIll > $.actEndTime) {
              console.log("活动已于 " + ll1iI + " 结束，下次早点来吧~");
              $.message.fix("活动已结束，结束时间：" + ll1iI);
              $.runEnd = true;
              return;
            }
          }
          break;
        case "10023":
        case "10040":
          if ($.prizeInfo && $.prizeInfo.length) {
            let I1l1I1 = false;
            const I1i111 = [];
            for (let IIliI = 0; IIliI < $.prizeInfo.length; IIliI++) {
              const ilI1ll = $.prizeInfo[IIliI],
                Iillii = ilI1ll.signDays,
                IlI1iI = ilI1ll.remainNum;
              IlI1iI >= 1 && (I1l1I1 = true);
              if (ilI1ll.signDays) {
                let Iillil = "  " + Iillii + "天-- " + (IlI1iI >= 1 ? "剩余" + IlI1iI + "份" : "已发完");
                I1i111.push(Iillil);
              } else {
                let l1lIli = "" + (IlI1iI >= 1 ? "剩余" + IlI1iI + "份" : "已发完");
                I1i111.push("  每日签到: " + l1lIli);
              }
            }
            console.log(($.shopName ? "店铺名称：#" + $.shopName + "\n" : "") + "店铺链接：https://shop.m.jd.com/?shopId=" + $.shopId + "\n活动名称：" + $.activityName + "\n开始时间：" + iI1lli + "\n结束时间：" + ll1iI + "\n活动奖品：\n" + I1i111.join("\n") + "\n");
            notify.appendContent(($.shopName ? "\n【店铺名称】#" + $.shopName : "") + "\n【开始时间】" + iI1lli + "\n【结束时间】" + ll1iI + "\n【活动奖品】\n" + I1i111.join("\n") + "\n");
            const ilI1li = Date.now();
            if ($.actStartTime && ilI1li < $.actStartTime) {
              console.log("活动将在 " + iI1lli + " 开始，晚点再来吧~");
              $.message.fix("活动尚未开始，开始时间：" + iI1lli);
              $.runEnd = true;
              return;
            }
            if ($.actEndTime && ilI1li > $.actEndTime) {
              console.log("活动已于 " + ll1iI + " 结束，下次早点来吧~");
              $.message.fix("活动已结束，结束时间：" + ll1iI);
              $.runEnd = true;
              return;
            }
            !I1l1I1 && (message.fix("奖品已发完"), runEnd = true);
          }
          break;
        default:
          console.log("❌ 当前活动类型（" + $.activityType + "）暂不受本脚本支持，请联系作者进行反馈！"), $.runEnd = true;
          return;
      }
    }
    const IilliI = $.getActivityBase.thresholdResponseList || [],
      IlI1ii = $.getActivityBase.supportLevels || "1,2,3,4,5",
      lIIiii = $.getActivityBase.memberLevel || 0;
    if (IilliI.length >= 0) for (const lIIiiI of IilliI) {
      switch (lIIiiI.type) {
        case 0:
          console.log("活动已结束"), $.message.fix("活动已结束"), $.runEnd = true;
          return;
        case 1:
          if (lIIiii === 0) {
            if (joinMember) {
              if (!IlI1ii.includes("1")) {
                console.log("活动不支持新入会员参与~");
                $.message.fix("活动不支持新入会员参与");
                return;
              }
              $.openUrl = $.getActivityBase.openCardLink;
              $.venderId = common.getUrlParameter($.openUrl, "venderId");
              const II1lil = await common.joinShopMember($.venderId);
              if (II1lil) console.log("加入店铺会员成功"), await sendRequest("followShop"), await $.wait(500);else {
                console.log("加入店铺会员失败，活动仅限店铺会员参与哦~");
                $.message.fix("加入店铺会员失败，活动仅限店铺会员参与");
                return;
              }
            } else {
              console.log("活动仅限店铺会员参与哦~");
              $.message.fix("活动仅限店铺会员参与");
              return;
            }
          } else {
            console.log("会员等级不足，无法参与活动~");
            $.message.fix("会员等级不足");
            return;
          }
          break;
        case 2:
          await sendRequest("followShop"), await $.wait(500);
          break;
        default:
          console.log("未适配的活动参与条件：" + JSON.stringify(lIIiiI));
          break;
      }
    }
    if ($.runEnd || $.outFlag || $.skipRun) return;
    switch ($.activityType) {
      case "10001":
      case "10002":
      case "10003":
      case "10004":
      case "10023":
      case "10040":
        await activityHandlers[$.activityType]();
        break;
      default:
        console.log("❌ 当前活动类型（" + $.activityType + "）暂不受本脚本支持，请联系作者进行反馈！"), $.runEnd = true;
        return;
    }
    await sendRequest("myPrize");
  } catch (IIli1l) {
    console.log("❌ 脚本运行遇到了错误\n" + IIli1l);
  }
}
async function handleCalendarAndSign() {
  $.calendar = "";
  await sendRequest("calendar");
  await $.wait(500);
  if ($.runEnd || $.outFlag || $.skipRun) return;
  const {
    signDays: lIIii1,
    sign: ll1i1,
    continuousSignDays: IIli1i
  } = $.calendar;
  ll1i1 ? console.log("今天已签到, 连签" + (lIIii1 || IIli1i) + "天") : await sendRequest("sign");
  await sendRequest("chanceNum");
  await $.wait(500);
  if ($.chanceNum > 0) {
    console.log("有" + $.chanceNum + "次抽奖机会");
    while ($.chanceNum > 0) {
      await sendRequest("lotteryDraw");
      await $.wait(500);
      $.chanceNum--;
    }
  }
}
async function handleActivity() {
  await sendRequest("activity");
  await $.wait(500);
  if ($.runEnd || $.outFlag || $.skipRun) return;
  const {
    signDays: l1ii1,
    sign: ii1ll,
    continuousSignDays: IliI1l
  } = $.calendar;
  ii1ll ? console.log("今天已签到, 连签" + (l1ii1 || IliI1l) + "天") : await sendRequest("sign");
}
async function handleCalendar() {
  await sendRequest("calendar");
  await $.wait(500);
  if ($.runEnd || $.outFlag || $.skipRun) return;
  const {
    signDays: IIll1,
    sign: ll1il,
    continuousSignDays: IiiIiI
  } = $.calendar;
  ll1il ? console.log("今天已签到, 连签" + (IIll1 || IiiIiI) + "天") : await sendRequest("sign");
}
async function handleResponse(lliiiI, lilil) {
  try {
    if (lilil.data && typeof lilil.data === "string") try {
      const l1iil = wuxianDefense.interactionV2.decrypt(lilil.data);
      lilil.data = l1iil;
    } catch {}
    switch (lliiiI) {
      case "login":
        if (lilil.code === 200 && lilil.data) {
          $.avatar = lilil.data.avatar;
          $.cid = lilil.data.cid;
          $.encryptPin = lilil.data.encryptPin;
          $.isWhiteUser = lilil.data.isWhiteUser;
          $.level = lilil.data.level;
          $.nickname = lilil.data.nickname;
          $.pinToken = lilil.data.pinToken;
        } else lilil.message ? (console.log(lilil.message), $.skipRun = true) : console.log("❓" + lliiiI + " " + JSON.stringify(lilil));
        break;
      case "followShop":
        if (lilil.code === 200 && lilil.data === null) {} else lilil.message ? console.log(lilil.message) : console.log("❓" + lliiiI + " " + JSON.stringify(lilil));
        break;
      case "getPrizeList":
        if (lilil.code === 200 && lilil.data) $.prizeInfo = lilil.data || [];else lilil.message ? console.log(lilil.message) : console.log("❓" + lliiiI + " " + JSON.stringify(lilil));
        break;
      case "getActivityBase":
        if (lilil.code === 200 && lilil.data) $.getActivityBase = lilil.data;else lilil.message ? (console.log(lilil.message), $.skipRun = true) : console.log("❓" + lliiiI + " " + JSON.stringify(lilil));
        break;
      case "calendar":
        if (lilil.code === 200) $.calendar = lilil.data;else lilil.message ? (console.log(lilil.message), $.skipRun = true) : console.log("❓" + lliiiI + " " + JSON.stringify(lilil));
        break;
      case "activity":
        if (lilil.code === 200) $.calendar = lilil.data;else lilil.message ? (console.log(lilil.message), $.skipRun = true) : console.log("❓" + lliiiI + " " + JSON.stringify(lilil));
        break;
      case "chanceNum":
        if (lilil.code === 200) $.chanceNum = lilil.data;else lilil.message ? (console.log(lilil.message), $.skipRun = true) : console.log("❓" + lliiiI + " " + JSON.stringify(lilil));
        break;
      case "sign":
        if (lilil.code === 200) switch ($.activityType) {
          case "10001":
          case "10002":
          case "10004":
          case "10003":
            console.log("签到成功 ✅ "), $.message.insert("签到成功 ✅ ");
            break;
          case "10023":
          case "10040":
            const I11iIi = lilil.data;
            if (I11iIi.status === 1) {
              process.stdout.write("签到成功 ➜ ");
              switch (I11iIi.prizeType) {
                case 0:
                case 4:
                case 11:
                  console.log("🗑️ " + I11iIi.prizeName + " 🎟️"), $.message.insert(I11iIi.prizeName + "🎟️");
                  break;
                case 1:
                  console.log("🗑️ 优惠券"), $.message.insert("优惠券🗑️");
                  break;
                case 2:
                  console.log("🎉 " + I11iIi.prizeName + " 🐶"), $.message.insert(I11iIi.prizeName + "🐶");
                  break;
                case 3:
                  const I1ilII = I11iIi.addressId,
                    I11iIl = I11iIi.activityPrizeId,
                    l1l11l = I11iIi.prizeName;
                  $.prize.push("🎉 恭喜获得实物,奖品名称：" + l1l11l);
                  const IilIil = {
                      "baseUrl": $.baseUrl,
                      "newbaseUrl": $.newbaseUrl,
                      "ua": $.UA,
                      "token": $.pinToken,
                      "activityId": $.activityId,
                      "shopId": $.shopId,
                      "activityType": $.activityType,
                      "prizeName": l1l11l,
                      "addressId": I1ilII,
                      "activityPrizeId": I11iIl,
                      "activityUrl": $.activityUrl
                    },
                    l1iIi = await lzkjv2_savePrize(IilIil);
                  !isNotify && l1iIi && (await notify.sendNotify($.name + "中奖通知", "【京东账号" + index + "】\n抽中实物 " + l1l11l + "，已成功自动登记收货地址\n\n" + $.activityUrl));
                  message.insert(l1l11l + "(" + (l1iIi ? "已填地址" : "未填地址") + ")🎁");
                  break;
                case 5:
                  console.log("🗑️ 专享价"), $.message.insert("专享价🗑️");
                  break;
                case 6:
                  console.log("🎉 " + I11iIi.prizeName + " 🧧"), $.message.insert(I11iIi.prizeName + "🧧");
                  break;
                case 7:
                case 8:
                case 9:
                case 10:
                case 12:
                  console.log("🎉 恭喜获得" + I11iIi.prizeName + " 🎁"), $.message.insert(I11iIi.prizeName + "🎁");
                  !isNotify && (await notify.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.UserName + "\n抽中 " + I11iIi.prizeName + "\n\n" + $.activityUrl));
                  break;
                default:
                  console.log("未支持的任务状态: " + JSON.stringify(I11iIi));
                  break;
              }
            } else console.log("签到成功 ✅ "), $.message.insert("签到成功 ✅ ");
            break;
          default:
            console.log("❌ 当前活动类型（" + $.activityType + "）暂不受本脚本支持，请联系作者进行反馈！"), $.runEnd = true;
            return;
        } else lilil.message ? console.log(lilil.message + "\n") : console.log("❓" + lliiiI + " " + JSON.stringify(lilil));
        break;
      case "lotteryDraw":
        if (lilil.code === 200) {
          const l1l11i = lilil.data;
          if (l1l11i.status === 1) {
            process.stdout.write("抽奖获得 ➜ ");
            switch (l1l11i.prizeType) {
              case 0:
              case 4:
              case 11:
                console.log("🗑️ " + l1l11i.prizeName + " 🎟️"), $.message.insert(l1l11i.prizeName + "🎟️");
                break;
              case 1:
                console.log("🗑️ 优惠券"), $.message.insert("优惠券🗑️");
                break;
              case 2:
                console.log("🎉 " + l1l11i.prizeName + " 🐶"), $.message.insert(l1l11i.prizeName + "🐶");
                break;
              case 3:
                const l1iIl = l1l11i.addressId,
                  illIll = l1l11i.activityPrizeId,
                  iIli1I = l1l11i.prizeName;
                $.prize.push("🎉 恭喜获得实物,奖品名称：" + iIli1I);
                const Iiil1 = {
                    "baseUrl": $.baseUrl,
                    "newbaseUrl": $.newbaseUrl,
                    "ua": $.UA,
                    "token": $.pinToken,
                    "activityId": $.activityId,
                    "shopId": $.shopId,
                    "activityType": $.activityType,
                    "prizeName": iIli1I,
                    "addressId": l1iIl,
                    "activityPrizeId": illIll,
                    "activityUrl": $.activityUrl
                  },
                  iiilli = await lzkjv2_savePrize(Iiil1);
                !isNotify && iiilli && (await notify.sendNotify($.name + "中奖通知", "【京东账号" + index + "】\n抽中实物 " + iIli1I + "，已成功自动登记收货地址\n\n" + $.activityUrl));
                message.insert(iIli1I + "(" + (iiilli ? "已填地址" : "未填地址") + ")🎁");
                break;
              case 5:
                console.log("🗑️ 专享价"), $.message.insert("专享价🗑️");
                break;
              case 6:
                console.log("🎉 " + l1l11i.prizeName + " 🧧"), $.message.insert(l1l11i.prizeName + "🧧");
                break;
              case 7:
              case 8:
              case 9:
              case 10:
              case 12:
                console.log("🎉 恭喜获得" + l1l11i.prizeName + " 🎁"), $.message.insert(l1l11i.prizeName + "🎁");
                !isNotify && (await notify.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.UserName + "\n抽中 " + l1l11i.prizeName + "\n\n" + $.activityUrl));
                break;
              default:
                console.log("未支持的任务状态: " + JSON.stringify(l1l11i));
                break;
            }
          } else console.log("💨 空气"), $.message.insert("空气💨");
        } else lilil.message ? console.log(lilil.message + "\n") : console.log("❓" + lliiiI + " " + JSON.stringify(lilil));
        break;
      case "myPrize":
        if (lilil.code === 200) {
          if (lilil.data.length == 0) console.log("我的奖品 ➜ 未获得奖励");else {
            console.log("\n🆕 我的奖品 ➜");
            for (let l1iIIl of lilil.data) {
              $.createTime = $.time("yyyy-MM-dd HH:mm:ss", l1iIIl.createTime);
              switch (l1iIIl.prizeType) {
                case 0:
                case 4:
                case 11:
                  console.log("🗑️ " + l1iIIl.prizeName + "(" + $.createTime + ") 🎟️");
                  break;
                case 1:
                  console.log("🗑️ 优惠券");
                  break;
                case 2:
                  console.log("🎉 " + l1iIIl.prizeName + "(" + $.createTime + ") 🐶");
                  break;
                case 3:
                  const iiilll = l1iIIl.prizeName;
                  console.log("🎉 恭喜获得实物，奖品名称：" + iiilll + "(" + $.createTime + ")");
                  !isNotify && (await notify.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + iiilll + "(" + $.createTime + ")\n\n" + $.activityUrl));
                  break;
                case 5:
                  console.log("🗑️ 专享价");
                  break;
                case 6:
                  console.log("🎉 " + l1iIIl.prizeName + "(" + $.createTime + ") 🧧");
                  break;
                case 7:
                case 8:
                case 9:
                case 10:
                case 12:
                  console.log("🎉 恭喜获得" + l1iIIl.prizeName + "(" + $.createTime + ") 🎁");
                  !isNotify && (await notify.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.UserName + "\n抽中 " + l1iIIl.prizeName + "(" + $.createTime + ")\n\n" + $.activityUrl));
                  break;
                default:
                  console.log("未支持的任务状态: " + JSON.stringify(l1iIIl));
                  break;
              }
            }
          }
        } else lilil.message ? (console.log(lilil.message), $.skipRun = true) : console.log("❓" + lliiiI + " " + JSON.stringify(lilil));
        break;
      default:
        break;
    }
  } catch (lI11Il) {
    console.log("❌ 未能正确处理 " + lliiiI + " 请求响应 " + (lI11Il.message || lI11Il));
  }
}
async function sendRequest(lIII1i) {
  if ($.runEnd || $.outFlag) return;
  let IilIl1 = $.newbaseUrl,
    lIII1l = null,
    l1iIIi = null,
    lilIi = null,
    l1l11I = "POST";
  switch (lIII1i) {
    case "login":
      IilIl1 += "/api/user/login", lIII1l = {
        "token": $.jdToken,
        "source": "01",
        "activityType": $.activityType,
        "templateCode": $.templateCode,
        "activityId": $.activityId,
        "shopId": $.shopId,
        "uuid": "",
        "timestamp": Date.now()
      };
      break;
    case "getActivityBase":
      IilIl1 += "/api/common/getActivityBase", lIII1l = undefined;
      break;
    case "followShop":
      IilIl1 += "/api/common/followShop", lIII1l = undefined;
      break;
    case "getPrizeList":
      IilIl1 += "/api/" + $.activityType + "/getPrizeList", lIII1l = undefined;
      break;
    case "activity":
      IilIl1 += "/api/" + $.activityType + "/activity", lIII1l = undefined;
      break;
    case "calendar":
      IilIl1 += "/api/" + $.activityType + "/calendar", lIII1l = undefined;
      break;
    case "sign":
      IilIl1 += "/api/" + $.activityType + "/sign", lIII1l = undefined;
      break;
    case "chanceNum":
      IilIl1 += "/api/" + $.activityType + "/chanceNum", lIII1l = undefined;
      break;
    case "lotteryDraw":
      IilIl1 += "/api/" + $.activityType + "/lotteryDraw", lIII1l = undefined;
      break;
    case "myPrize":
      IilIl1 += "/api/" + $.activityType + "/myPrize", lIII1l = undefined;
      break;
    default:
      console.log("❌ 未知请求 " + lIII1i);
      return;
  }
  l1iIIi = wuxianDefense.interactionV2.encrypt(lIII1l);
  const lilIl = {
    "url": IilIl1,
    "method": l1l11I,
    "headers": {
      "Accept": "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh;q=0.9",
      "Connection": "keep-alive",
      "Content-Type": "application/json; charset=UTF-8",
      "Cookie": "",
      "Host": $.hostname,
      "Origin": $.origin,
      "Referer": $.activityUrl,
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      "User-Agent": $.UA
    },
    "params": lilIi,
    "data": l1iIIi,
    "timeout": 30000
  };
  $.pinToken && Object.assign(lilIl.headers, {
    "Activity-Id": $.activityId,
    "Activity-Type": $.activityType,
    "Pin-Token": $.pinToken,
    "Shop-Id": $.shopId,
    "Template-Code": $.templateCode
  });
  l1l11I === "GET" && (delete lilIl.data, delete lilIl.headers["Content-Type"]);
  const IilIlI = 3;
  let iIli11 = 0,
    Iiiil = null,
    Iiiii = false;
  while (iIli11 < IilIlI) {
    iIli11 > 0 && (await $.wait(1000));
    const li1 = await common.request(lilIl);
    if (!li1.success) {
      Iiiil = lIII1i + " 请求失败 ➜ " + li1.error;
      iIli11++;
      continue;
    }
    if (!li1.data) {
      Iiiil = lIII1i + " 请求失败 ➜ 无响应数据";
      iIli11++;
      continue;
    }
    await handleResponse(lIII1i, li1.data);
    Iiiii = false;
    break;
  }
  iIli11 >= IilIlI && (console.log(Iiiil), Iiiii && !hotbreak && ($.outFlag = true, $.message && $.message.fix(Iiiil)));
}// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}

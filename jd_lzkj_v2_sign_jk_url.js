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
  } = require("./utils/Rebels_H");
console.log("");
console.log("==========" + $.name + "变量说明==========");
console.log("jd_lzkj_v2_sign_jk_url // 活动链接");
console.log("jd_lzkj_v2_sign_opencard // 是否入会（true/false），默认不入会");
console.log("jd_lzkj_v2_sign_notify // 是否通知（true/false），默认不通知");
console.log("jd_lzkj_v2_sign_break // IP限制后继续执行（true/false）");
console.log("==========" + $.name + "提示结束==========");
console.log("");
const activityUrl = (process.env.jd_lzkj_v2_sign_jk_url || "").split(/[,@\n]+/g).map(IIlIi => IIlIi.trim()).filter(Boolean),
  joinMember = process.env.jd_lzkj_v2_sign_opencard === "true",
  isNotify = process.env.jd_lzkj_v2_sign_notify === "true",
  hotbreak = process.env.jd_lzkj_v2_sign_break === "true";
let cookie = "",
  originCookie = "";
const cookiesArr = Object.keys(jdCookie).map(ili11i => jdCookie[ili11i]).filter(iiIi1l => iiIi1l);
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
  const lliiII = [...new Set(activityUrl)];
  console.log("🏬  共计 " + lliiII.length + " 个签到活动");
  for (let l1i1Ii = 0; l1i1Ii < lliiII.length; l1i1Ii++) {
    console.log("");
    const l1iI1 = common.parseUrl(lliiII[l1i1Ii]);
    if (!l1iI1) {
      console.log("[" + lliiII[l1i1Ii] + "]\n⚠ 请填写格式正确的变量");
      continue;
    }
    $.activityUrl = lliiII[l1i1Ii];
    $.activityId = common.getUrlParameter(lliiII[l1i1Ii], "activityId");
    $.shopId = common.getUrlParameter(lliiII[l1i1Ii], "shopId");
    $.hostname = l1iI1.hostname;
    $.pathname = l1iI1.pathname;
    if ($.hostname) {
      $.baseUrl = "https://" + $.hostname;
      $.newbaseUrl = "https://" + $.hostname + "/prod/cc/interaction/v2";
      $.origin = $.baseUrl;
      try {
        const lilII = $.pathname.split("/prod/cc/interaction/v2/")[1];
        $.activityType = lilII.split("/")[0];
        $.templateCode = lilII.split("/")[1];
      } catch {}
    }
    if (!$.activityId || !$.shopId || !$.hostname || !$.activityType || !$.templateCode) {
      console.log("[" + lliiII[l1i1Ii] + "]\n⚠ 请填写格式正确的变量");
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
    for (let IIIiI = 0; IIIiI < cookiesArr.length; IIIiI++) {
      $.index = IIIiI + 1;
      cookie = cookiesArr[IIIiI];
      originCookie = cookiesArr[IIIiI];
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
    isNotify && notify.getMessage() && (notify.updateContent(notify.content + ("\n【活动地址】" + $.activityUrl)), await notify.push(), notify.updateContent(""));
    $.activityType = $.templateCode = $.activityId = $.shopId = "";
  }
})().catch(l1i1Il => $.logErr(l1i1Il)).finally(() => $.done());
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
      const ii1iI = $.time("yyyy-MM-dd HH:mm", $.actStartTime),
        IIIil = $.time("yyyy-MM-dd HH:mm", $.actEndTime);
      switch ($.activityType) {
        case "10001":
        case "10002":
        case "10003":
        case "10004":
          if ($.prizeInfo && $.prizeInfo.length) {
            let iI111i = "";
            for (let iI111l = 0; iI111l < $.prizeInfo.length; iI111l++) {
              const i1lIii = $.prizeInfo[iI111l],
                III11i = i1lIii.prizeName;
              let i1lIil = "";
              i1lIii.remainNum >= 0 && (i1lIil = "(剩余" + i1lIii.remainNum + "份)");
              iI111i += "  " + III11i + i1lIil + "\n";
            }
            console.log(($.shopName && "店铺名称：#" + $.shopName + "\n") + "店铺链接：https://shop.m.jd.com/?shopId=" + $.shopId + "\n活动名称：" + $.activityName + "\n开始时间：" + ii1iI + "\n结束时间：" + IIIil + "\n活动奖品：\n" + iI111i);
            notify.updateContent(notify.content + (($.shopName && "\n【店铺名称】#" + $.shopName) + "\n【开始时间】" + ii1iI + "\n【结束时间】" + IIIil + "\n【活动奖品】\n" + iI111i + "\n"));
            const I1I1l1 = Date.now();
            if ($.actStartTime && I1I1l1 < $.actStartTime) {
              console.log("活动将在 " + ii1iI + " 开始，晚点再来吧~");
              $.message.fix("活动尚未开始，开始时间：" + ii1iI);
              $.runEnd = true;
              return;
            }
            if ($.actEndTime && I1I1l1 > $.actEndTime) {
              console.log("活动已于 " + IIIil + " 结束，下次早点来吧~");
              $.message.fix("活动已结束，结束时间：" + IIIil);
              $.runEnd = true;
              return;
            }
          }
          break;
        case "10023":
        case "10040":
          if ($.prizeInfo && $.prizeInfo.length) {
            let Iiil = false;
            const IIIli = [];
            for (let Iiii = 0; Iiii < $.prizeInfo.length; Iiii++) {
              const llIl11 = $.prizeInfo[Iiii],
                IIIll = llIl11.signDays,
                I1I1il = llIl11.remainNum;
              I1I1il >= 1 && (Iiil = true);
              if (llIl11.signDays) {
                let l1llii = "  " + IIIll + "天-- " + (I1I1il >= 1 ? "剩余" + I1I1il + "份" : "已发完");
                IIIli.push(l1llii);
              } else {
                let liII1 = "" + (I1I1il >= 1 ? "剩余" + I1I1il + "份" : "已发完");
                IIIli.push("  每日签到: " + liII1);
              }
            }
            console.log(($.shopName && "店铺名称：#" + $.shopName + "\n") + "店铺链接：https://shop.m.jd.com/?shopId=" + $.shopId + "\n活动名称：" + $.activityName + "\n开始时间：" + ii1iI + "\n结束时间：" + IIIil + "\n活动奖品：\n" + IIIli.join("\n") + "\n");
            notify.updateContent(notify.content + (($.shopName && "\n【店铺名称】#" + $.shopName) + "\n【开始时间】" + ii1iI + "\n【结束时间】" + IIIil + "\n【活动奖品】\n" + IIIli.join("\n") + "\n"));
            const ii1i1 = Date.now();
            if ($.actStartTime && ii1i1 < $.actStartTime) {
              console.log("活动将在 " + ii1iI + " 开始，晚点再来吧~");
              $.message.fix("活动尚未开始，开始时间：" + ii1iI);
              $.runEnd = true;
              return;
            }
            if ($.actEndTime && ii1i1 > $.actEndTime) {
              console.log("活动已于 " + IIIil + " 结束，下次早点来吧~");
              $.message.fix("活动已结束，结束时间：" + IIIil);
              $.runEnd = true;
              return;
            }
            if (!Iiil) {
              message.fix("奖品已发完");
              runEnd = true;
            }
          }
          break;
        default:
          console.log("❌ 当前活动类型（" + $.activityType + "）暂不受本脚本支持，请联系作者进行反馈！"), $.runEnd = true;
          return;
      }
    }
    const IiiIi = $.getActivityBase.thresholdResponseList || [],
      ii1l1i = $.getActivityBase.supportLevels || "1,2,3,4,5",
      l1iIl1 = $.getActivityBase.memberLevel || 0;
    if (IiiIi.length >= 0) for (const llIl1I of IiiIi) {
      switch (llIl1I.type) {
        case 0:
          console.log("活动已结束"), $.message.fix("活动已结束"), $.runEnd = true;
          return;
        case 1:
          if (l1iIl1 === 0) {
            if (joinMember) {
              if (!ii1l1i.includes("1")) {
                console.log("活动不支持新入会员参与~");
                $.message.fix("活动不支持新入会员参与");
                return;
              }
              $.openUrl = $.getActivityBase.openCardLink;
              $.venderId = common.getUrlParameter($.openUrl, "venderId");
              const i1lIl1 = await common.joinShopMember($.venderId);
              if (i1lIl1) console.log("加入店铺会员成功"), await sendRequest("followShop"), await $.wait(500);else {
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
          console.log("未适配的活动参与条件：" + JSON.stringify(llIl1I));
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
  } catch (l1iIll) {
    console.log("❌ 脚本运行遇到了错误\n" + l1iIll);
  }
}
async function handleCalendarAndSign() {
  $.calendar = "";
  await sendRequest("calendar");
  await $.wait(500);
  if ($.runEnd || $.outFlag || $.skipRun) return;
  const {
    signDays: i1lIlI,
    sign: l1lliI,
    continuousSignDays: I1I1iI
  } = $.calendar;
  if (l1lliI) console.log("今天已签到, 连签" + (i1lIlI || I1I1iI) + "天");else {
    await sendRequest("sign");
  }
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
    signDays: l1lllI,
    sign: llliIi,
    continuousSignDays: i1lIli
  } = $.calendar;
  if (llliIi) console.log("今天已签到, 连签" + (l1lllI || i1lIli) + "天");else {
    await sendRequest("sign");
  }
}
async function handleCalendar() {
  await sendRequest("calendar");
  await $.wait(500);
  if ($.runEnd || $.outFlag || $.skipRun) return;
  const {
    signDays: Iil1,
    sign: ll11lI,
    continuousSignDays: llliI1
  } = $.calendar;
  ll11lI ? console.log("今天已签到, 连签" + (Iil1 || llliI1) + "天") : await sendRequest("sign");
}
async function handleResponse(iiIiIl, IlI1l1) {
  try {
    if (IlI1l1.data && typeof IlI1l1.data === "string") try {
      const ll11iI = wuxianDefense.interactionV2.decrypt(IlI1l1.data);
      IlI1l1.data = ll11iI;
    } catch {}
    switch (iiIiIl) {
      case "login":
        if (IlI1l1.code === 200 && IlI1l1.data) {
          $.avatar = IlI1l1.data.avatar;
          $.cid = IlI1l1.data.cid;
          $.encryptPin = IlI1l1.data.encryptPin;
          $.isWhiteUser = IlI1l1.data.isWhiteUser;
          $.level = IlI1l1.data.level;
          $.nickname = IlI1l1.data.nickname;
          $.pinToken = IlI1l1.data.pinToken;
        } else IlI1l1.message ? (console.log(IlI1l1.message), $.skipRun = true) : console.log("❓" + iiIiIl + " " + JSON.stringify(IlI1l1));
        break;
      case "followShop":
        if (IlI1l1.code === 200 && IlI1l1.data === null) {} else IlI1l1.message ? console.log(IlI1l1.message) : console.log("❓" + iiIiIl + " " + JSON.stringify(IlI1l1));
        break;
      case "getPrizeList":
        if (IlI1l1.code === 200 && IlI1l1.data) $.prizeInfo = IlI1l1.data || [];else {
          if (IlI1l1.message) console.log(IlI1l1.message);else {
            console.log("❓" + iiIiIl + " " + JSON.stringify(IlI1l1));
          }
        }
        break;
      case "getActivityBase":
        if (IlI1l1.code === 200 && IlI1l1.data) $.getActivityBase = IlI1l1.data;else IlI1l1.message ? (console.log(IlI1l1.message), $.skipRun = true) : console.log("❓" + iiIiIl + " " + JSON.stringify(IlI1l1));
        break;
      case "calendar":
        if (IlI1l1.code === 200) {
          $.calendar = IlI1l1.data;
        } else {
          if (IlI1l1.message) console.log(IlI1l1.message), $.skipRun = true;else {
            console.log("❓" + iiIiIl + " " + JSON.stringify(IlI1l1));
          }
        }
        break;
      case "activity":
        if (IlI1l1.code === 200) $.calendar = IlI1l1.data;else IlI1l1.message ? (console.log(IlI1l1.message), $.skipRun = true) : console.log("❓" + iiIiIl + " " + JSON.stringify(IlI1l1));
        break;
      case "chanceNum":
        if (IlI1l1.code === 200) $.chanceNum = IlI1l1.data;else {
          if (IlI1l1.message) {
            console.log(IlI1l1.message);
            $.skipRun = true;
          } else {
            console.log("❓" + iiIiIl + " " + JSON.stringify(IlI1l1));
          }
        }
        break;
      case "sign":
        if (IlI1l1.code === 200) switch ($.activityType) {
          case "10001":
          case "10002":
          case "10004":
          case "10003":
            console.log("签到成功 ✅ "), $.message.insert("签到成功 ✅ ");
            break;
          case "10023":
          case "10040":
            const l1ilI1 = IlI1l1.data;
            if (l1ilI1.status === 1) {
              process.stdout.write("签到成功 ➜ ");
              switch (l1ilI1.prizeType) {
                case 0:
                case 4:
                case 11:
                  console.log("🗑️ " + l1ilI1.prizeName + " 🎟️"), $.message.insert(l1ilI1.prizeName + "🎟️");
                  break;
                case 1:
                  console.log("🗑️ 优惠券"), $.message.insert("优惠券🗑️");
                  break;
                case 2:
                  console.log("🎉 " + l1ilI1.prizeName + " 🐶"), $.message.insert(l1ilI1.prizeName + "🐶");
                  break;
                case 3:
                  const l1l1Il = l1ilI1.prizeName;
                  console.log("🎉 恭喜获得实物~"), console.log("奖品名称：" + l1l1Il);
                  !isNotify && (await notify.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.UserName + "\n抽中实物 " + l1l1Il + "\n\n" + $.activityUrl));
                  $.message.insert(l1l1Il + "(未填地址)🎁");
                  break;
                case 5:
                  console.log("🗑️ 专享价"), $.message.insert("专享价🗑️");
                  break;
                case 6:
                  console.log("🎉 " + l1ilI1.prizeName + " 🧧"), $.message.insert(l1ilI1.prizeName + "🧧");
                  break;
                case 7:
                case 8:
                case 9:
                case 10:
                case 12:
                  console.log("🎉 恭喜获得" + l1ilI1.prizeName + " 🎁"), $.message.insert(l1ilI1.prizeName + "🎁");
                  !isNotify && (await notify.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.UserName + "\n抽中 " + l1ilI1.prizeName + "\n\n" + $.activityUrl));
                  break;
                default:
                  console.log("未支持的任务状态: " + JSON.stringify(l1ilI1));
                  break;
              }
            } else console.log("签到成功 ✅ "), $.message.insert("签到成功 ✅ ");
            break;
          default:
            console.log("❌ 当前活动类型（" + $.activityType + "）暂不受本脚本支持，请联系作者进行反馈！"), $.runEnd = true;
            return;
        } else IlI1l1.message ? console.log(IlI1l1.message + "\n") : console.log("❓" + iiIiIl + " " + JSON.stringify(IlI1l1));
        break;
      case "lotteryDraw":
        if (IlI1l1.code === 200) {
          const l1l1Ii = IlI1l1.data;
          if (l1l1Ii.status === 1) {
            process.stdout.write("抽奖获得 ➜ ");
            switch (l1l1Ii.prizeType) {
              case 0:
              case 4:
              case 11:
                console.log("🗑️ " + l1l1Ii.prizeName + " 🎟️"), $.message.insert(l1l1Ii.prizeName + "🎟️");
                break;
              case 1:
                console.log("🗑️ 优惠券"), $.message.insert("优惠券🗑️");
                break;
              case 2:
                console.log("🎉 " + l1l1Ii.prizeName + " 🐶"), $.message.insert(l1l1Ii.prizeName + "🐶");
                break;
              case 3:
                const IIIIlI = l1l1Ii.prizeName;
                console.log("🎉 恭喜获得实物~"), console.log("奖品名称：" + IIIIlI);
                !isNotify && (await notify.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.UserName + "\n抽中实物 " + IIIIlI + "\n\n" + $.activityUrl));
                $.message.insert(IIIIlI + "(未填地址)🎁");
                break;
              case 5:
                console.log("🗑️ 专享价"), $.message.insert("专享价🗑️");
                break;
              case 6:
                console.log("🎉 " + l1l1Ii.prizeName + " 🧧"), $.message.insert(l1l1Ii.prizeName + "🧧");
                break;
              case 7:
              case 8:
              case 9:
              case 10:
              case 12:
                console.log("🎉 恭喜获得" + l1l1Ii.prizeName + " 🎁"), $.message.insert(l1l1Ii.prizeName + "🎁");
                !isNotify && (await notify.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.UserName + "\n抽中 " + l1l1Ii.prizeName + "\n\n" + $.activityUrl));
                break;
              default:
                console.log("未支持的任务状态: " + JSON.stringify(l1l1Ii));
                break;
            }
          } else console.log("💨 空气"), $.message.insert("空气💨");
        } else IlI1l1.message ? console.log(IlI1l1.message + "\n") : console.log("❓" + iiIiIl + " " + JSON.stringify(IlI1l1));
        break;
      case "myPrize":
        if (IlI1l1.code === 200) {
          if (IlI1l1.data.length == 0) {
            console.log("我的奖品 ➜ 未获得奖励");
          } else {
            console.log("\n🆕 我的奖品 ➜");
            for (let l1i11i of IlI1l1.data) {
              $.createTime = $.time("yyyy-MM-dd HH:mm:ss", l1i11i.createTime);
              switch (l1i11i.prizeType) {
                case 0:
                case 4:
                case 11:
                  console.log("🗑️ " + l1i11i.prizeName + "(" + $.createTime + ") 🎟️");
                  break;
                case 1:
                  console.log("🗑️ 优惠券");
                  break;
                case 2:
                  console.log("🎉 " + l1i11i.prizeName + "(" + $.createTime + ") 🐶");
                  break;
                case 3:
                  const l11iI1 = l1i11i.prizeName;
                  console.log("🎉 恭喜获得实物，奖品名称：" + l11iI1 + "(" + $.createTime + ")");
                  !isNotify && (await notify.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + l11iI1 + "(" + $.createTime + ")\n\n" + $.activityUrl));
                  break;
                case 5:
                  console.log("🗑️ 专享价");
                  break;
                case 6:
                  console.log("🎉 " + l1i11i.prizeName + "(" + $.createTime + ") 🧧");
                  break;
                case 7:
                case 8:
                case 9:
                case 10:
                case 12:
                  console.log("🎉 恭喜获得" + l1i11i.prizeName + "(" + $.createTime + ") 🎁");
                  !isNotify && (await notify.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.UserName + "\n抽中 " + l1i11i.prizeName + "(" + $.createTime + ")\n\n" + $.activityUrl));
                  break;
                default:
                  console.log("未支持的任务状态: " + JSON.stringify(l1i11i));
                  break;
              }
            }
          }
        } else IlI1l1.message ? (console.log(IlI1l1.message), $.skipRun = true) : console.log("❓" + iiIiIl + " " + JSON.stringify(IlI1l1));
        break;
      default:
        break;
    }
  } catch (liIlll) {
    console.log("❌ 未能正确处理 " + iiIiIl + " 请求响应 " + (liIlll.message || liIlll));
  }
}
async function sendRequest(I1iI1I) {
  if ($.runEnd || $.outFlag) return;
  let IIIIl1 = $.newbaseUrl,
    liiilI = null,
    lI111l = null,
    liiii1 = null,
    IIiiIl = "POST";
  switch (I1iI1I) {
    case "login":
      IIIIl1 += "/api/user/login", liiilI = {
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
      IIIIl1 += "/api/common/getActivityBase", liiilI = undefined;
      break;
    case "followShop":
      IIIIl1 += "/api/common/followShop", liiilI = undefined;
      break;
    case "getPrizeList":
      IIIIl1 += "/api/" + $.activityType + "/getPrizeList", liiilI = undefined;
      break;
    case "activity":
      IIIIl1 += "/api/" + $.activityType + "/activity", liiilI = undefined;
      break;
    case "calendar":
      IIIIl1 += "/api/" + $.activityType + "/calendar", liiilI = undefined;
      break;
    case "sign":
      IIIIl1 += "/api/" + $.activityType + "/sign", liiilI = undefined;
      break;
    case "chanceNum":
      IIIIl1 += "/api/" + $.activityType + "/chanceNum", liiilI = undefined;
      break;
    case "lotteryDraw":
      IIIIl1 += "/api/" + $.activityType + "/lotteryDraw", liiilI = undefined;
      break;
    case "myPrize":
      IIIIl1 += "/api/" + $.activityType + "/myPrize", liiilI = undefined;
      break;
    default:
      console.log("❌ 未知请求 " + I1iI1I);
      return;
  }
  lI111l = wuxianDefense.interactionV2.encrypt(liiilI);
  const l1ilIl = {
    "url": IIIIl1,
    "method": IIiiIl,
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
    "params": liiii1,
    "data": lI111l,
    "timeout": 30000
  };
  $.pinToken && Object.assign(l1ilIl.headers, {
    "Activity-Id": $.activityId,
    "Activity-Type": $.activityType,
    "Pin-Token": $.pinToken,
    "Shop-Id": $.shopId,
    "Template-Code": $.templateCode
  });
  IIiiIl === "GET" && (delete l1ilIl.data, delete l1ilIl.headers["Content-Type"]);
  const IIiiIi = 3;
  let l1ilIi = 0,
    l11iIi = null,
    ll11li = false;
  while (l1ilIi < IIiiIi) {
    l1ilIi > 0 && (await $.wait(1000));
    const I1iI11 = await common.request(l1ilIl);
    if (!I1iI11.success) {
      l11iIi = I1iI1I + " 请求失败 ➜ " + I1iI11.error;
      l1ilIi++;
      continue;
    }
    if (!I1iI11.data) {
      l11iIi = I1iI1I + " 请求失败 ➜ 无响应数据";
      l1ilIi++;
      continue;
    }
    await handleResponse(I1iI1I, I1iI11.data);
    ll11li = false;
    break;
  }
  l1ilIi >= IIiiIi && (console.log(l11iIi), ll11li && !hotbreak && ($.outFlag = true, $.message && $.message.fix(l11iIi)));
}// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}

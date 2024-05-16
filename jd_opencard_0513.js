/*
5.13-5.20 美礼速递 尽释爱意

环境变量：
export jd_opencard_draw="3" //抽奖次数 3
export jd_opencard_notify="true" // 是否推送

cron:1 1 1 1 *

*/

const $ = new Env('5.13-5.20 美礼速递 尽释爱意')
const notify = require("./utils/Rebels_sendJDNotify"),
  jdCookie = require("./jdCookie"),
  getToken = require("./utils/Rebels_Token"),
  common = require("./utils/Rebels_jdCommon");
console.log("");
console.log("==========" + $.name + "变量说明==========");
console.log("jd_opencard_draw // 最大抽奖次数，默认 3 次");
console.log("jd_opencard_notify // 是否推送通知，默认不推送");
console.log("==========" + $.name + "提示结束==========");
console.log("");
const isNotify = process.env.jd_opencard_notify === "true",
  opencard_draw = process.env.jd_opencard_draw || 300;
let domains = "https://szxyun-rc.isvjcloud.com",
  cookie = "";
const cookiesArr = Object.keys(jdCookie).map(i1IIl => jdCookie[i1IIl]).filter(I1lll1 => I1lll1);
!cookiesArr[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  authorCodeList = await getAuthorCodeList("http://km.jdbus.net/szxyun.json");
  $.myCodeRun = false;
  authorCodeList ? (console.log("✅ 服务状态正常...\n"), $.myCodeRun = true, $.authorCode = authorCodeList[random(0, authorCodeList.length)]) : console.log("未连通服务~\n");
  $.shopId = "1000100710";
  $.activeId = "unionOpenQB240514Dcss4MW8";
  $.activityUrl = "https://szxyun-rc.isvjcloud.com/pagec/unionOpenZDH240222/index.html";
  $.shareUuid = $.authorCode;
  notify.config({
    "title": $.name
  });
  for (let l1i111 = 0; l1i111 < cookiesArr.length; l1i111++) {
    $.index = l1i111 + 1;
    cookie = cookiesArr[l1i111];
    common.setCookie(cookie);
    $.UserName = decodeURIComponent(common.getCookieValue(cookie, "pt_pin"));
    $.UA = common.genUA($.UserName);
    $.message = notify.create($.index, $.UserName);
    $.nickName = "";
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
    await Main();
    common.unsetCookie();
    if ($.runEnd) break;
    await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
  }
  isNotify && notify.getMessage() && (notify.appendContent("\n"), await notify.push());
})().catch(iliII1 => $.logErr(iliII1)).finally(() => $.done());
async function Main() {
  try {
    $.endTime = 0;
    $.is_break = false;
    $.Token = "";
    $.Tokens = "";
    $.Token = await getToken(cookie, domains);
    if ($.Token == "") {
      console.log("缺少必要参数，请重新运行");
      $.message.fix("TOKEN获取失败~");
      return;
    }
    await $.wait(parseInt(Math.random() * 500 + 500, 10));
    await sendRequest("userLogin");
    if ($.Tokens) {
      $.active = "";
      await sendRequest("active");
      if ($.runEnd) return;
      if ($.active) {
        $.index === 1 && (console.log("" + ($.activeTitle && "活动名称：#" + $.activeTitle)), console.log("开始时间：" + $.startTime + "\n结束时间：" + $.endTime + "\n排行开奖时间：" + $.overTime + "\n"));
        console.log("当前已邀请:" + $.points + "人,积分可抽奖:" + $.points2 + "次\n助力码： " + $.joinId);
        for (let IilliI in $.active.jobMap) {
          let IlI1ii = $.active.jobMap[IilliI];
          IlI1ii.details = IlI1ii.details.filter(ll1iI => ll1iI.done === null);
          let lIIiii = IlI1ii.dayMax || 1,
            iI1lli = IlI1ii.finishNum || 0;
          for (let iI1lll = iI1lli; iI1lll < lIIiii; iI1lll++) {
            $.key = IilliI;
            $.task = IlI1ii;
            await sendRequest("job");
          }
        }
        $.opencard_list = $.active.bindCardInfo || [];
        let IlI1il = $.opencard_list.filter(l1lIll => !l1lIll.isBindCard) || [];
        console.log("共有" + $.opencard_list.length + "张卡,还需开" + IlI1il.length + "张卡");
        for (let I1l1II of IlI1il) {
          $.openUrl = I1l1II.openUrl;
          $.venderId = common.getUrlParameter($.openUrl, "venderId");
          (!$.openUrl || !/^\d+$/.test($.venderId)) && ($.venderId = I1l1II.val2);
          const IIli1I = await common.joinShopMember($.venderId);
          if (IIli1I) console.log("加入店铺会员成功"), await $.wait(parseInt(Math.random() * 1000 + 1000, 10));else {
            console.log("有店铺开卡失败,跳过执行~");
            break;
          }
        }
        if (opencard_draw) {
          await sendRequest("active");
          await $.wait(parseInt(Math.random() * 500 + 500, 10));
          let I1i11I = parseInt($.points2 / 1),
            llIliI = Math.min(opencard_draw, I1i11I);
          $.prize = [];
          console.log("已设置抽奖" + opencard_draw + "次,共有" + I1i11I + "次抽奖,可抽奖" + llIliI + "次");
          for (m = 1; llIliI--; m++) {
            await sendRequest("lottery");
            if (Number(llIliI) <= 0) break;
            if ($.is_break) break;
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
          }
          $.prize.length && console.log("抽奖获得: " + $.prize.join(", ") + "\n");
        }
        if ($.is_break || $.runEnd) return;
        await sendRequest("share");
        if ($.myCodeRun) for (let I1l1I1 = 0; I1l1I1 < authorCodeList.length; I1l1I1++) {
          $.myCode = authorCodeList[I1l1I1];
          await sendRequest("myshare");
          await $.wait(parseInt(Math.random() * 400 + 400, 10));
        }
        $.index == 1 && ($.shareUuid = $.authorCode, console.log("后面的号都会助力 -> " + $.shareUuid));
        await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
      } else console.log("主页参数获取失败，请重新运行");
    }
  } catch (I1i111) {
    console.log(I1i111.message);
  }
}
async function handleResponse(ilI1li, IIliI) {
  try {
    switch (ilI1li) {
      case "userLogin":
        if (IIliI.code === "200" && IIliI.success === true) $.Tokens = IIliI.data;else IIliI.message ? console.log("" + (IIliI.message || "")) : console.log("" + IIliI);
        break;
      case "active":
        if (IIliI.code === "200" && IIliI.success === true) {
          $.active = IIliI.data;
          $.activeTitle = $.active.activeVO.activeTitle;
          $.startTime = $.active.activeVO.startTime;
          $.endTime = $.active.activeVO.endTime;
          $.overTime = $.active.activeVO.overTime;
          $.joinId = $.active.userVO.joinId || "";
          $.points2 = $.active.userVO.points2 || 0;
          $.points = $.active.userVO.points || 0;
          $.points3 = $.active.userVO.points3 || 0;
          $.active.showBeanList.length > 0 && console.log("领取开卡或助力奖励: " + $.active.showBeanList.map(lliilI => (lliilI.sendNum || 0) + "京豆").join(", "));
        } else IIliI.message ? ($.drawError = IIliI.message, console.log("" + ($.drawError || "")), ["未开始", "结束", "不存在", "不在"].some(lili1 => $.drawError.includes(lili1)) && ($.runEnd = true, $.message.fix("活动已结束~"))) : console.log("❓" + ilI1li + " " + JSON.stringify(IIliI));
        break;
      case "job":
        if (IIliI.code === "200" && IIliI.success === true) {
          let {
              val = "",
              awardName = ""
            } = IIliI.data,
            ll1l1 = [];
          if (awardName) ll1l1.push(awardName);
          if (val) ll1l1.push(val + "次抽奖");
          console.log("完成任务[" + $.key + "]: " + ll1l1.join(","));
        } else IIliI.message ? console.log("" + (IIliI.message || "")) : console.log("❓" + ilI1li + " " + JSON.stringify(IIliI));
        break;
      case "lottery":
        if (IIliI.code === "200" && IIliI.success === true) {
          if (IIliI.data != null) switch (IIliI.data.awardType) {
            case 0:
              $.prize.push("未知奖品：" + IIliI.data.awardName);
              break;
            case 1:
              $.prize.push("🎉 " + IIliI.data.awardName + " 🐶"), $.message.insert(IIliI.data.awardName + "🐶");
              break;
            case 2:
              $.prize.push("🗑️ 优惠券");
              break;
            case 3:
              $.prize.push("🎉 恭喜获得实物,奖品名称：" + IIliI.data.awardName), $.message.insert("🎉 恭喜获得实物~,奖品名称：" + IIliI.data.awardName), await notify.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + IIliI.data.awardName + "，请手动去填写地址\n\n" + $.activityUrl);
              break;
            default:
              $.prize.push("未知奖品：" + IIliI.data.awardName + "-" + IIliI.data.awardType);
              break;
          } else $.prize.push("💨 空气");
        } else IIliI.message ? ($.prize.push("" + (IIliI.message || "")), ["开卡"].some(IllIIi => IIliI.message.includes(IllIIi)) && ($.is_break = true), ["结束"].some(IllIIl => IIliI.message.includes(IllIIl)) && ($.runEnd = true)) : console.log("❓" + ilI1li + " " + JSON.stringify(IIliI));
        break;
      case "share":
        if (IIliI.code === "200" && IIliI.success === true) {
          let IiiIi1 = IIliI.data.helpStatus || 0;
          switch (IiiIi1) {
            case "":
            case undefined:
            case 0:
              break;
            case 1:
              console.log("✅ 助力成功");
              break;
            case 2:
              console.log("已经助力过了哟~");
              break;
            case 3:
            case 12:
              console.log("没有助力次数了~");
              break;
            case 4:
              console.log("对方助力已达到限制");
              break;
            case 5:
              console.log("对方助力已满");
              break;
            case 7:
              console.log("未全部开卡");
              break;
            case 36:
              console.log("未浏览商品");
              break;
            case 37:
              console.log("对方未浏览商品");
              break;
            default:
              console.log("未知助力返回码");
              break;
          }
        } else IIliI.message ? console.log("" + (IIliI.message || "")) : console.log("❓" + ilI1li + " " + JSON.stringify(IIliI));
        break;
      case "myshare":
        if (IIliI.code === "200" && IIliI.success === true) {} else {
          if (IIliI.message) {} else {}
        }
        break;
    }
  } catch (l1ii1) {
    console.log("❌ 未能正确处理 " + ilI1li + " 请求响应 " + (l1ii1.message || l1ii1));
  }
}
async function sendRequest(ii1ll) {
  if ($.runEnd) return;
  let lliiil = "",
    lliiii = null,
    ll1ii = "POST",
    IllIII = {};
  switch (ii1ll) {
    case "userLogin":
      IllIII = {
        "shopId": $.shopId,
        "token": $.Token,
        "source": "01"
      }, lliiil = domains + "/webc/login/userLogin", lliiii = JSON.stringify(IllIII);
      break;
    case "active":
      IllIII = {
        "activeId": $.activeId,
        "shareId": $.shareUuid || null
      }, lliiil = domains + "/webc/unionOpen/active", lliiii = JSON.stringify(IllIII);
      break;
    case "job":
      IllIII = {
        "activeId": $.activeId,
        "jobForm": $.task.jobForm,
        "jobDetail": $.task.details.pop().config || 1,
        "joinId": $.joinId
      }, lliiil = domains + "/webc/unionOpen/job", lliiii = JSON.stringify(IllIII);
      break;
    case "lottery":
      IllIII = {
        "activeId": $.activeId,
        "joinId": $.joinId,
        "lotteryForm": 0
      }, lliiil = domains + "/webc/unionOpen/lottery", lliiii = JSON.stringify(IllIII);
      break;
    case "share":
      IllIII = {
        "activeId": $.activeId,
        "joinId": $.joinId,
        "shareId": $.shareUuid
      }, lliiil = domains + "/webc/unionOpen/share", lliiii = JSON.stringify(IllIII);
      break;
    case "myshare":
      IllIII = {
        "activeId": $.activeId,
        "joinId": $.joinId,
        "shareId": $.myCode
      }, lliiil = domains + "/webc/unionOpen/share", lliiii = JSON.stringify(IllIII);
      break;
    default:
      console.log("❌ 未知请求 " + ii1ll);
      return;
  }
  const ii1li = {
    "url": lliiil,
    "method": ll1ii,
    "headers": {
      "Accept": "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Connection": "keep-alive",
      "Content-Type": "application/json;charset=UTF-8",
      "jd-fast-token": $.Tokens || null,
      "Host": "szxyun-rc.isvjcloud.com",
      "Cookie": cookie,
      "Referer": domains,
      "Origin": domains,
      "User-Agent": $.UA
    },
    "data": lliiii,
    "timeout": 20000
  };
  ll1ii === "GET" && (delete ii1li.data, delete ii1li.headers["Content-Type"]);
  const IIll1 = 1;
  let ll1il = 0,
    IiiIiI = null,
    lilii = false;
  while (ll1il < IIll1) {
    ll1il > 0 && (await $.wait(1000));
    const I11iII = await common.request(ii1li);
    if (!I11iII.success) {
      IiiIiI = "🚫 " + ii1ll + " 请求失败 ➜ " + I11iII.error;
      ll1il++;
      continue;
    }
    if (!I11iII.data) {
      IiiIiI = "🚫 " + ii1ll + " 请求失败 ➜ 无响应数据";
      ll1il++;
      continue;
    }
    handleResponse(ii1ll, I11iII.data);
    lilii = false;
    break;
  }
  ll1il >= IIll1 && (console.log(IiiIiI), lilii && ($.outFlag = true, $.message && $.message.fix(IiiIiI)));
}
async function getAuthorCodeList(I1ilIi) {
  const IiiiI = await common.request({
      "url": I1ilIi,
      "method": "GET",
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      },
      "proxy": null,
      "debug": false,
      "timeout": 30000
    }),
    llIlli = IiiiI.data;
  return llIlli;
}
function random(llIlll, lliii1) {
  return Math.floor(Math.random() * (lliii1 - llIlll)) + llIlll;
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }

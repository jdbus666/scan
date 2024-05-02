/*
new Env('Rebels_savePrize');
部分活动填地址通用库
*/
const got = require("got"),
  fs = require("fs");
!fs.existsSync("./utils/prize") && fs.mkdirSync("./utils/prize");
const prize_record_path = "./utils/prize/addr_record.csv";
if (!fs.existsSync(prize_record_path)) {
  let text = "﻿奖品,收货人,手机,地址,活动链接,具体时间\n";
  fs.writeFileSync(prize_record_path, text, {
    "encoding": "utf-8",
    "flag": "a"
  });
  console.log("初始化奖品记录文件成功");
}
const currentTime = new Date();
currentTime.setMilliseconds(0);
async function wuxian_savePrize(l1ilIi) {
  let {
    baseUrl: ll11li,
    cookie: iliIlI,
    ua: lI111I,
    activityId: IlilI,
    activityType: llIi1,
    venderId: IliIII,
    secretPin: II1l,
    prizeName: liiiiI,
    generateId: II1i,
    activityUrl: illli1
  } = l1ilIi;
  const I1lII1 = process.env.WX_ADDRESS || "",
    Ill111 = process.env.WX_ADDRESS_BLOCK || "";
  if (I1lII1 === "") return false;
  const I1iI11 = I1lII1.split("|"),
    II11 = Math.floor(Math.random() * I1iI11.length);
  if (I1iI11[II11] === "") return console.log("❌ 随机抽取到的收货地址信息为空，请正确使用 \"|\" 管道符以用于分割多个收货地址！\n"), false;
  const [l1ilII, ii1II1, iliIll, llliIl, iliIli, illliI, ii1III, i11iIl] = I1iI11[II11].split("@");
  if (i11iIl === undefined) {
    return console.log("❌ 随机抽取到的收货地址信息格式存在错误（参数不足或过多）\n"), false;
  }
  for (let ilIlII = 0; ilIlII < 7; ilIlII++) {
    if (I1iI11[ilIlII] === "") return console.log("❌ 随机抽取到的收货地址信息格式存在错误（参数不能为空）\n"), false;
  }
  if (Ill111 !== "") {
    const l1lI1i = Ill111.split("@");
    if (l1lI1i.some(l1lI1l => liiiiI.includes(l1lI1l))) return console.log("\n🚫 触发实物奖品自动登记收货地址屏蔽关键词，跳过~\n"), false;
  }
  Array.isArray(IliIII) && (shopId = IliIII[1], IliIII = IliIII[0]);
  const ll11ll = {
      "headers": {
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Host": ll11li.match(/https?:\/\/([^/]+)/)[1],
        "Origin": ll11li,
        "Content-Type": "application/x-www-form-urlencoded",
        "Referer": ll11li + "/wxAddress/save",
        "Cookie": iliIlI,
        "User-Agent": lI111I
      },
      "body": "venderId=" + IliIII + "&pin=" + (ll11li.includes("cjhy") ? encodeURIComponent(encodeURIComponent(II1l)) : encodeURIComponent(II1l)) + "&activityId=" + IlilI + "&actType=" + llIi1 + "&prizeName=" + encodeURIComponent(liiiiI) + "&receiver=" + encodeURIComponent(l1ilII) + "&phone=" + ii1II1 + "&province=" + encodeURIComponent(iliIll) + "&city=" + encodeURIComponent(llliIl) + "&county=" + encodeURIComponent(iliIli) + "&areaCode=" + ii1III + "&address=" + encodeURIComponent(illliI) + "&generateId=" + II1i + "&postalCode=" + i11iIl,
      "timeout": 30000
    },
    l11iIl = 25;
  let i11iIi = 0,
    IIIIll = null;
  while (i11iIi < l11iIl) {
    let l1I1Ii = null;
    try {
      l1I1Ii = await got.post(ll11li + "/wxAddress/save", ll11ll);
    } catch (IIlili) {
      if (IIlili?.["response"]) {
        IIlili = IIlili.response;
        if (typeof IIlili === "string" && IIlili.includes("Timeout awaiting 'request'")) IIIIll = "请求超时，请检查网络重试";else {
          const IIlill = l1I1Ii?.["statusCode"];
          if (IIlill) {
            if ([403, 493].includes(IIlill)) IIIIll = "请求失败，IP被限制（Response code " + IIlill + "）";else [400, 404].includes(IIlill) ? IIIIll = "请求配置参数错误，请联系开发者进行反馈（Response code " + IIlill + "）" : IIIIll = "请求失败（Response code " + IIlill + "）";
          } else IIIIll = "API请求失败 " + (IIlili.message || IIlili);
        }
      } else {
        if (IIlili?.["response"]?.["body"]) IIIIll = "请求失败 " + IIlili.response.body + " ";else {
          IIIIll = "请求失败 " + (IIlili || "") + " ";
        }
      }
      i11iIi++;
    }
    if (l1I1Ii && typeof l1I1Ii === "object") {
      if (l1I1Ii?.["body"]) {
        try {
          const iIiiil = JSON.parse(l1I1Ii.body);
          if (iIiiil && iIiiil.result) {
            console.log("已提交收货地址 ✅\n登记为随机抽取到的第" + (II11 + 1) + "套收货地址信息\n联系信息：" + l1ilII + " (" + ii1II1.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2") + "）\n");
            let iIiiii = [l1ilII, ii1II1, liiiiI, illli1.toString(), currentTime];
            return fs.writeFileSync(prize_record_path, iIiiii.join(",") + "\n", {
              "encoding": "utf-8",
              "flag": "a"
            }), true;
          } else {
            if (i11iIi === 0 && shopId) ll11ll.body = "venderId=" + shopId + "&pin=" + (ll11li.includes("cjhy") ? encodeURIComponent(encodeURIComponent(II1l)) : encodeURIComponent(II1l)) + "&activityId=" + IlilI + "&actType=" + llIi1 + "&prizeName=" + encodeURIComponent(liiiiI) + "&receiver=" + encodeURIComponent(l1ilII) + "&phone=" + ii1II1 + "&province=" + encodeURIComponent(iliIll) + "&city=" + encodeURIComponent(llliIl) + "&county=" + encodeURIComponent(iliIli) + "&areaCode=" + ii1III + "&address=" + encodeURIComponent(illliI) + "&generateId=" + II1i + "&postalCode=" + i11iIl, i11iIi++;else {
              return console.log("🚫 保存收货地址失败 ➜ " + (iIiiil.errorMessage || JSON.stringify(l1I1Ii))), false;
            }
          }
        } catch (ll1llI) {
          return console.log("🚫 保存收货地址接口响应处理异常 ➜ " + (ll1llI.message || ll1llI)), false;
        }
      } else {
        IIIIll = "无响应数据";
        i11iIi++;
      }
    }
    l1I1Ii = null;
  }
  return i11iIi >= l11iIl && console.log("🚫 保存收货地址异常 ➜ " + IIIIll), false;
}
async function loreal_savePrize(i11lIi) {
  let {
    baseUrl: lilil1,
    newbaseUrl: lIilli,
    cookie: I1iiii,
    ua: iiI1iI,
    token: I1iiil,
    prizeName: Illll1,
    orderCode: lI1iil,
    activityUrl: lIilll
  } = i11lIi;
  const iIiiiI = process.env.WX_ADDRESS || "",
    ilI11i = process.env.WX_ADDRESS_BLOCK || "";
  if (iIiiiI === "") return false;
  const ilI11l = iIiiiI.split("|"),
    li1I = Math.floor(Math.random() * ilI11l.length);
  if (ilI11l[li1I] === "") return console.log("❌ 随机抽取到的收货地址信息为空，请正确使用 \"|\" 管道符以用于分割多个收货地址！\n"), false;
  const [IIliil, ll1liI, lI1iiI, i11lII, iIIlli, ll1li1] = ilI11l[li1I].split("@");
  for (let ilIIil = 0; ilIIil < 6; ilIIil++) {
    if (ilI11l[ilIIil] === "") {
      return console.log("❌ 随机抽取到的收货地址信息格式存在错误（参数不能为空）\n"), false;
    }
  }
  if (ilI11i !== "") {
    const iliiII = ilI11i.split("@");
    if (iliiII.some(iiI1li => Illll1.includes(iiI1li))) return console.log("\n🚫 触发实物奖品自动登记收货地址屏蔽关键词，跳过~\n"), false;
  }
  const iIIlll = lilil1.match(/https?:\/\/([^/]+)/)[1],
    I1iiiI = {
      "realName": IIliil,
      "mobile": ll1liI,
      "address": ll1li1,
      "orderCode": lI1iil,
      "province": lI1iiI,
      "city": i11lII,
      "county": iIIlli
    },
    iiI1il = {
      "headers": {
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Host": iIIlll,
        "Origin": lilil1,
        "Content-Type": "application/json;charset=UTF-8",
        "Referer": lIilli + "/api/my/prize/update",
        "token": I1iiil,
        "Cookie": I1iiii,
        "User-Agent": iiI1iI
      },
      "body": JSON.stringify(I1iiiI),
      "timeout": 30000
    },
    iiI1ii = 5;
  let I1iii1 = 0,
    lilii1 = null;
  while (I1iii1 < iiI1ii) {
    let IIliii = null;
    try {
      IIliii = await got.post(lIilli + "/api/my/prize/update", iiI1il);
    } catch (i1111I) {
      if (i1111I?.["response"]) {
        i1111I = i1111I.response;
        if (typeof i1111I === "string" && i1111I.includes("Timeout awaiting 'request'")) {
          lilii1 = "请求超时，请检查网络重试";
        } else {
          const lIl1lI = IIliii?.["statusCode"];
          if (lIl1lI) {
            if ([403, 493].includes(lIl1lI)) lilii1 = "请求失败，IP被限制（Response code " + lIl1lI + "）";else [400, 404].includes(lIl1lI) ? lilii1 = "请求配置参数错误，请联系开发者进行反馈（Response code " + lIl1lI + "）" : lilii1 = "请求失败（Response code " + lIl1lI + "）";
          } else {
            lilii1 = "API请求失败 " + (i1111I.message || i1111I);
          }
        }
      } else i1111I?.["response"]?.["body"] ? lilii1 = "请求失败 " + i1111I.response.body + " " : lilii1 = "请求失败 " + (i1111I || "") + " ";
      I1iii1++;
    }
    if (IIliii?.["body"]) try {
      const Ii1IIl = JSON.parse(IIliii.body);
      if (Ii1IIl && Ii1IIl.resp_code === 0) {
        console.log("已提交收货地址 ✅\n登记为随机抽取到的第" + (li1I + 1) + "套收货地址信息\n联系信息：" + IIliil + " (" + ll1liI.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2") + "）\n");
        let l111I = [IIliil, ll1liI, Illll1, lIilll.toString(), currentTime];
        return fs.writeFileSync(prize_record_path, l111I.join(",") + "\n", {
          "encoding": "utf-8",
          "flag": "a"
        }), true;
      } else {
        if (Ii1IIl && Ii1IIl.resp_code === 2) {
          return console.log("🚫 保存收货地址失败 ➜ " + (Ii1IIl.resp_msg || JSON.stringify(Ii1IIl))), false;
        } else {
          if (I1iii1 < 5) console.log("🚫 保存收货地址失败 ➜ " + (Ii1IIl.resp_msg || JSON.stringify(Ii1IIl))), I1iii1++;else return console.log("🚫 保存收货地址失败 ➜ " + (Ii1IIl.resp_msg || JSON.stringify(Ii1IIl))), false;
        }
      }
    } catch (ll1lll) {
      return console.log("🚫 保存收货地址接口响应处理异常 ➜ " + (ll1lll.message || ll1lll)), false;
    } else lilii1 = "无响应数据", I1iii1++;
    IIliii = null;
  }
  return I1iii1 >= iiI1ii && console.log("🚫 保存收货地址异常 ➜ " + lilii1), false;
}
async function jinggeng_savePrize(I1iili) {
  let {
    baseUrl: lI1ill,
    cookie: Illlii,
    ua: lI1ili,
    venderId: Il1II,
    prizeName: i1lll,
    orderCode: Ii11I,
    activityUrl: I1iill
  } = I1iili;
  const i1lli = process.env.WX_ADDRESS || "",
    i11111 = process.env.WX_ADDRESS_BLOCK || "";
  if (i1lli === "") return false;
  const lIl1li = i1lli.split("|"),
    Il1I1 = Math.floor(Math.random() * lIl1li.length);
  if (lIl1li[Il1I1] === "") return console.log("❌ 随机抽取到的收货地址信息为空，请正确使用 \"|\" 管道符以用于分割多个收货地址！\n"), false;
  const [lIilii, lIilil, lIl1ll, Ii111, Ii1III, ilIIi1] = lIl1li[Il1I1].split("@");
  for (let IilIl = 0; IilIl < 6; IilIl++) {
    if (lIl1li[IilIl] === "") return console.log("❌ 随机抽取到的收货地址信息格式存在错误（参数不能为空）\n"), false;
  }
  if (i11111 !== "") {
    const IilIi = i11111.split("@");
    if (IilIi.some(Ili1Il => i1lll.includes(Ili1Il))) return console.log("\n🚫 触发实物奖品自动登记收货地址屏蔽关键词，跳过~\n"), false;
  }
  const l111i = lI1ill.match(/https?:\/\/([^/]+)/)[1],
    l111l = "receiverName=" + encodeURIComponent(lIilii) + "&mobile=" + lIilil + "&address=" + encodeURIComponent(lIl1ll) + "+" + encodeURIComponent(Ii111) + "+" + encodeURIComponent(Ii1III) + encodeURIComponent(ilIIi1) + "&log_id=" + Ii11I + "&user_id=" + Il1II,
    I1iilI = {
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,en-GB;q=0.6",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Cookie": Illlii,
        "Host": l111i,
        "Origin": lI1ill,
        "Referer": I1iill,
        "User-Agent": lI1ili
      },
      "body": l111l,
      "timeout": 30000
    },
    Ii1II1 = 5;
  let lilili = 0,
    IliIli = null;
  while (lilili < Ii1II1) {
    let i1liI = null;
    try {
      i1liI = await got.post(lI1ill + "/ql/front/postBuyerInfo", I1iilI);
    } catch (I1iII) {
      if (I1iII?.["response"]) {
        I1iII = I1iII.response;
        if (typeof I1iII === "string" && I1iII.includes("Timeout awaiting 'request'")) IliIli = "请求超时，请检查网络重试";else {
          const IIlI1i = i1liI?.["statusCode"];
          if (IIlI1i) {
            if ([403, 493].includes(IIlI1i)) IliIli = "请求失败，IP被限制（Response code " + IIlI1i + "）";else {
              if ([400, 404].includes(IIlI1i)) {
                IliIli = "请求配置参数错误，请联系开发者进行反馈（Response code " + IIlI1i + "）";
              } else {
                IliIli = "请求失败（Response code " + IIlI1i + "）";
              }
            }
          } else {
            IliIli = "API请求失败 " + (I1iII.message || I1iII);
          }
        }
      } else I1iII?.["response"]?.["body"] ? IliIli = "请求失败 " + I1iII.response.body + " " : IliIli = "请求失败 " + (I1iII || "") + " ";
      lilili++;
    }
    if (i1liI?.["body"]) try {
      const iiiI11 = JSON.parse(i1liI.body);
      if (iiiI11 && iiiI11.succ) {
        console.log("已提交收货地址 ✅\n登记为随机抽取到的第" + (Il1I1 + 1) + "套收货地址信息\n联系信息：" + lIilii + " (" + lIilil.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2") + "）\n");
        let l1lilI = [lIilii, lIilil, i1lll, I1iill.toString(), currentTime];
        return fs.writeFileSync(prize_record_path, l1lilI.join(",") + "\n", {
          "encoding": "utf-8",
          "flag": "a"
        }), true;
      } else {
        if (iiiI11 && iiiI11.succ === false) return console.log("🚫 保存收货地址失败 ➜ " + (iiiI11.msg || JSON.stringify(iiiI11))), false;else {
          if (lilili < 5) console.log("🚫 保存收货地址失败 ➜ " + (iiiI11.msg || JSON.stringify(iiiI11))), lilili++;else {
            return console.log("🚫 保存收货地址失败 ➜ " + (iiiI11.msg || JSON.stringify(iiiI11))), false;
          }
        }
      }
    } catch (IilII) {
      return console.log("🚫 保存收货地址接口响应处理异常 ➜ " + (IilII.message || IilII)), false;
    } else {
      IliIli = "无响应数据";
      lilili++;
    }
    i1liI = null;
  }
  return lilili >= Ii1II1 && console.log("🚫 保存收货地址异常 ➜ " + IliIli), false;
}
async function wxSavePrize(i1lii, iilIII, liI1Il, I1iIi, iiiI1I, lilI11, Ili1II, ili1i, IiIi1) {
  const i1IilI = process.env.WX_ADDRESS || "",
    III1I1 = process.env.WX_ADDRESS_BLOCK ? process.env.WX_ADDRESS_BLOCK : "";
  let ilI111 = [];
  if (i1IilI != "") ilI111 = i1IilI.split("|");else return false;
  var I1IllI = Math.floor(Math.random() * ilI111.length);
  if (ilI111[I1IllI] == "") return console.log("❌ 随机抽取到的收货地址信息为空，请正确使用 \"|\" 管道符以用于分割多个收货地址！\n"), false;else ilI111 = ilI111[I1IllI];
  ilI111 = ilI111.split("@");
  if (ilI111.length != 8) return console.log("❌ 随机抽取到的收货地址信息格式存在错误（参数不足或过多）\n"), false;
  for (let illili = 0; illili < 7; illili++) {
    if (ilI111[illili] == "") return console.log("❌ 随机抽取到的收货地址信息格式存在错误（参数不能为空）\n"), false;
  }
  const IIlI11 = ilI111[0],
    iIIll1 = ilI111[1],
    llIIII = ilI111[2],
    ilI11I = ilI111[3],
    ili1I = ilI111[4],
    iilIIl = ilI111[5],
    i1Iili = ilI111[6],
    i1Iill = ilI111[7];
  if (III1I1 != "") {
    let liI111 = III1I1.split("@"),
      IiIlI = false;
    for (let iIlI1i of liI111) {
      if (ili1i.includes(iIlI1i)) {
        console.log("\n🚫 触发（" + iIlI1i + "）实物奖品自动登记收货地址屏蔽关键词，跳过~\n");
        IiIlI = true;
        break;
      }
    }
    if (IiIlI) return false;
  }
  const l1IiI = i1lii.includes("cjhy") ? encodeURIComponent(encodeURIComponent(Ili1II)) : encodeURIComponent(Ili1II),
    l1lill = i1lii.match(/https?:\/\/([^/]+)/)[1],
    i1li1 = "venderId=" + lilI11 + "&pin=" + l1IiI + "&activityId=" + I1iIi + "&actType=" + iiiI1I + "&prizeName=" + encodeURIComponent(ili1i) + "&receiver=" + encodeURIComponent(IIlI11) + "&phone=" + iIIll1 + "&province=" + encodeURIComponent(llIIII) + "&city=" + encodeURIComponent(ilI11I) + "&county=" + encodeURIComponent(ili1I) + "&areaCode=" + i1Iili + "&address=" + encodeURIComponent(iilIIl) + "&generateId=" + IiIi1 + "&postalCode=" + i1Iill;
  let iIIllI = false;
  try {
    let iII1Ii = await got.post(i1lii + "/wxAddress/save", {
      "headers": {
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Host": l1lill,
        "Origin": i1lii,
        "Content-Type": "application/x-www-form-urlencoded",
        "Referer": i1lii + "/wxAddress/save",
        "Cookie": iilIII,
        "User-Agent": liI1Il
      },
      "body": i1li1
    }).json().catch(iIlI1l => {
      console.error("🚫 wxSavePrize API请求失败 ➜ (" + iIlI1l.response.statusCode + " " + iIlI1l.response.statusMessage + ")\n");
    });
    if (iII1Ii && iII1Ii.result) {
      console.log("\n已自动提交收货地址 ✅\n");
      console.log("登记模板：采用第" + (I1IllI + 1) + "套收货地址信息（随机抽取）");
      console.log("联系信息：" + IIlI11 + " (" + iIIll1.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2") + "）");
      console.log("");
      iIIllI = true;
    } else iII1Ii.errorMessage ? console.log("🚫 保存收货地址失败 ➜ " + iII1Ii.errorMessage) : console.log("🚫 保存收货地址失败 ➜ " + JSON.stringify(iII1Ii)), console.log("");
  } catch (lIIi1I) {
    console.log("🚫 保存收货地址异常 ➜ " + lIIi1I);
  }
  return iIIllI;
}
module.exports = {
  "wxSavePrize": wxSavePrize,
  "wuxian_savePrize": wuxian_savePrize,
  "loreal_savePrize": loreal_savePrize,
  "jinggeng_savePrize": jinggeng_savePrize
};

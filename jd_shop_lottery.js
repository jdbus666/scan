/*
活动名称：店铺刮刮乐（刮一刮）
活动链接：https://shop.m.jd.com/shop/lottery?shopId=<店铺id>&venderId=<商家id>
环境变量：jd_shopLottery_venderIds // 商家id，多个用英文逗号分割
        jd_shopLottery_threads // 控制并发线程数（正整数），默认1
        jd_shopLottery_interval // 自定义运行间隔时长（整数，单位毫秒），默认500
        jd_shopLottery_notify // 是否推送通知（true/false），默认不推送

注：高并发脚本，每个店铺活动每天只能参与一次，访问活动需要同时包含店铺id和商家id

cron:1 1 1 1 *

*/

const $ = new Env('店铺刮刮乐（刮一刮）')
var iｉl='jsjiami.com.v7';const liil11=iii1II;(function(lllI1l,i11iii,llI1Ii,lllI1i,li1i1l,II1i1,lI1lll){return lllI1l=lllI1l>>0x2,II1i1='hs',lI1lll='hs',function(iIiII,iil1lI,iiiliI,li1i1I,illIii){const i1l1i1=iii1II;li1i1I='tfi',II1i1=li1i1I+II1i1,illIii='up',lI1lll+=illIii,II1i1=iiiliI(II1i1),lI1lll=iiiliI(lI1lll),iiiliI=0x0;const ii1il1=iIiII();while(!![]&&--lllI1i+iil1lI){try{li1i1I=-parseInt(i1l1i1(0x110,'2(xZ'))/0x1+parseInt(i1l1i1(0x1bf,'D0Oj'))/0x2*(-parseInt(i1l1i1(0x170,'Ie01'))/0x3)+parseInt(i1l1i1(0x1d3,'1@D^'))/0x4*(-parseInt(i1l1i1(0x129,'^J6M'))/0x5)+-parseInt(i1l1i1(0xd7,'%V5q'))/0x6+-parseInt(i1l1i1(0x14a,'mS38'))/0x7*(parseInt(i1l1i1(0x1c9,'PI&X'))/0x8)+-parseInt(i1l1i1(0xf9,'AZWR'))/0x9+-parseInt(i1l1i1(0x19e,'vDhJ'))/0xa*(-parseInt(i1l1i1(0x154,'IV0p'))/0xb);}catch(lI1llI){li1i1I=iiiliI;}finally{illIii=ii1il1[II1i1]();if(lllI1l<=lllI1i)iiiliI?li1i1l?li1i1I=illIii:li1i1l=illIii:iiiliI=illIii;else{if(iiiliI==li1i1l['replace'](/[QxOSADlMIXuNGnJHE=]/g,'')){if(li1i1I===iil1lI){ii1il1['un'+II1i1](illIii);break;}ii1il1[lI1lll](illIii);}}}}}(llI1Ii,i11iii,function(illIil,Ill1I,i11iiI,lIli11,lllI1I,lillI1,IlIlii){return Ill1I='\x73\x70\x6c\x69\x74',illIil=arguments[0x0],illIil=illIil[Ill1I](''),i11iiI='\x72\x65\x76\x65\x72\x73\x65',illIil=illIil[i11iiI]('\x76'),lIli11='\x6a\x6f\x69\x6e',(0x162698,illIil[lIli11](''));});}(0x2f0,0x9baef,Iii11l,0xbe),Iii11l)&&(iｉl=Iii11l);const jdCookie=require('./jdCookie'),common=require(liil11(0x145,'!wSy')),notify=require(liil11(0x1ac,'Qd#$'));console[liil11(0x133,'60[g')](''),console[liil11(0x10a,'CYJw')]('=========='+$['name']+liil11(0x10b,'Um)@')),console[liil11(0x1b0,'^J6M')]('jd_shopLottery_venderIds\x20//\x20活动ID'),console['log'](liil11(0x121,'7JDi')),console[liil11(0x1d0,'POHw')](liil11(0x127,'Um)@')),console[liil11(0x18d,'46R(')](liil11(0x146,'1@D^')),console['log'](liil11(0xde,'K02V')+$[liil11(0x114,'%V5q')]+liil11(0x13e,'&WLa')),console['log']('');const venderIdList=(process[liil11(0x161,'vDhJ')][liil11(0x116,'^J6M')]||'')['split'](',')[liil11(0x1bb,'5X9@')](liIl1=>liIl1[liil11(0xc6,'&WLa')]())[liil11(0x1a4,'V02K')](Boolean);let taskThreads=process[liil11(0x1aa,'POHw')]['jd_shopLottery_threads']||'1';function iii1II(_0xb72eb1,_0x470518){const _0x5129a3=Iii11l();return iii1II=function(_0x48d8cc,_0x1a4ae1){_0x48d8cc=_0x48d8cc-0xb4;let _0x312e76=_0x5129a3[_0x48d8cc];if(iii1II['bNBmge']===undefined){var _0x19bf66=function(_0x3ae7b8){const _0x3a46ca='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x32a2d9='',_0x42855b='';for(let _0x153cb3=0x0,_0x1e10fe,_0x3cbf06,_0x50750e=0x0;_0x3cbf06=_0x3ae7b8['charAt'](_0x50750e++);~_0x3cbf06&&(_0x1e10fe=_0x153cb3%0x4?_0x1e10fe*0x40+_0x3cbf06:_0x3cbf06,_0x153cb3++%0x4)?_0x32a2d9+=String['fromCharCode'](0xff&_0x1e10fe>>(-0x2*_0x153cb3&0x6)):0x0){_0x3cbf06=_0x3a46ca['indexOf'](_0x3cbf06);}for(let _0x512af3=0x0,_0x245fcc=_0x32a2d9['length'];_0x512af3<_0x245fcc;_0x512af3++){_0x42855b+='%'+('00'+_0x32a2d9['charCodeAt'](_0x512af3)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x42855b);};const _0x2fefcd=function(_0x4480ea,_0x28752c){let _0x463b98=[],_0x3b5357=0x0,_0x59783b,_0x37844b='';_0x4480ea=_0x19bf66(_0x4480ea);let _0x87ba1a;for(_0x87ba1a=0x0;_0x87ba1a<0x100;_0x87ba1a++){_0x463b98[_0x87ba1a]=_0x87ba1a;}for(_0x87ba1a=0x0;_0x87ba1a<0x100;_0x87ba1a++){_0x3b5357=(_0x3b5357+_0x463b98[_0x87ba1a]+_0x28752c['charCodeAt'](_0x87ba1a%_0x28752c['length']))%0x100,_0x59783b=_0x463b98[_0x87ba1a],_0x463b98[_0x87ba1a]=_0x463b98[_0x3b5357],_0x463b98[_0x3b5357]=_0x59783b;}_0x87ba1a=0x0,_0x3b5357=0x0;for(let _0x38a616=0x0;_0x38a616<_0x4480ea['length'];_0x38a616++){_0x87ba1a=(_0x87ba1a+0x1)%0x100,_0x3b5357=(_0x3b5357+_0x463b98[_0x87ba1a])%0x100,_0x59783b=_0x463b98[_0x87ba1a],_0x463b98[_0x87ba1a]=_0x463b98[_0x3b5357],_0x463b98[_0x3b5357]=_0x59783b,_0x37844b+=String['fromCharCode'](_0x4480ea['charCodeAt'](_0x38a616)^_0x463b98[(_0x463b98[_0x87ba1a]+_0x463b98[_0x3b5357])%0x100]);}return _0x37844b;};iii1II['SkuCOd']=_0x2fefcd,_0xb72eb1=arguments,iii1II['bNBmge']=!![];}const _0x230aff=_0x5129a3[0x0],_0x34c676=_0x48d8cc+_0x230aff,_0x22b679=_0xb72eb1[_0x34c676];return!_0x22b679?(iii1II['hpgUTL']===undefined&&(iii1II['hpgUTL']=!![]),_0x312e76=iii1II['SkuCOd'](_0x312e76,_0x1a4ae1),_0xb72eb1[_0x34c676]=_0x312e76):_0x312e76=_0x22b679,_0x312e76;},iii1II(_0xb72eb1,_0x470518);}const runInterval=process[liil11(0x1d5,'Ipm7')][liil11(0x136,'1@D^')]||liil11(0xc1,'60[g'),isNotify=(process[liil11(0x150,'%V5q')][liil11(0x16f,'PI&X')]||process[liil11(0x16b,'g27q')]['jd_shopLottery_Notify'])===liil11(0x18f,'AOcc'),cookiesArr=Object[liil11(0x13d,'7JDi')](jdCookie)[liil11(0x1c5,'S*)e')](II1lll=>jdCookie[II1lll])[liil11(0xdc,'g27q')](II1lli=>II1lli);!cookiesArr[0x0]&&($[liil11(0x162,'V02K')]($[liil11(0x156,'7JDi')],liil11(0x125,'Ie01')),process[liil11(0x119,'vDhJ')](0x1));!(async()=>{const iiillI=liil11;notify['config']({'title':$[iiillI(0xbf,'LXfj')]}),await Main(),isNotify&&notify['getMessage']()&&await notify[iiillI(0x148,'2(xZ')]();})()[liil11(0x12b,'AZWR')](ii1I1I=>$[liil11(0x1d1,'!wSy')](ii1I1I))[liil11(0xb5,'Qljz')](()=>$[liil11(0x132,'pAKC')]());function Iii11l(){const lIli1I=(function(){return[iｉl,'nujOMsjJiHaNMmniMQ.GMDcDAom.JvSX7IElOxMl==','cSomWRDPWPu','WO9jWOddNCor','W6xdNCk5W7FdHCkzWQVdSW','c2qOWPpcSCkxldXe','W4VdQmkrW4BdMG','fw7cImoeBqS','W40Ftmoh','FSkoW7W','5BM56zo456A05yQT8lACNE+5VG','W57cGsVdQLu','W73dPuJcP8ouWRtcSYJcK8oaWPyhESo5qCo4WR5jgmk8WQldSe8','bquGoMVcTmkXWPu','lLZcOMZcQXaEm8oEz15sWQK','6i2G5y+N5RwN5yMT5l225Ogx5AsS6lAG','WP7cVrHXWRFcVtVcKG','r1mcWRK8','f8o9ESodqG','W4XYeCoo','5O+Q56wV57Uc5P6yW7/dU3XSkCoFWP0QFSkS','wwbcoHu3WQJcQs7cNIyLxg/cJmkWW5uZlG','w0qabx9wkhbBWP7cTH8KWOW/WPekW7tcLZjnW7ldUfVcNvVdS8kyxCopW5JdV0Tn','56Ma5Rgb8jUbRW','Cbv3WPVcVW','56Qg5Roj8lkGQW','Fs9xWOFcKa','xwdcOCk4W4rAD0SQu8kotGLJW7ldVCkBWOL7mwj4WOe','W73dPuJcP8ouWRtcSYJcK8oaWPyhESo5qCo/WR9jfmkOWQ3cSqZdMvBMMytLKl7PGi3NNy5aW70MhXFcGGdcJ30fxZpVVjpPUilORztKUitMJitPGA0','qc45W7K','lCo6smoP','WRbDdmkYW5G','fx50W4ZdK8kIWPBdQmkC','ExJdVqqqWQmgBq','z0bLktu','q8kkWPZdJ1u','k8o6qCorBG','WRbukmkwW75FCW','WRxdOfW','WRHlWQFdOCoI','6lsm5yYo5PsR5PEU','gw9ygcaz','W6tdRCkpBCohEMNdPW','yb0jW4NdQG','W4L2bCoy','W5tcKdVdHKq','k8oQvCoLBXxdNK8','WQtcICoTW7bx','WOVcVmoEW7C','WPNcUCkixmow','5lUG5PsC5Bs55y2K5lI16lY3','odddM1qfaSo8WQxcQrm+','W6yhzmkuW6vst8o1W70','sJzdW4Sl','exLfWPbr','WQNdTCkd','WPhcRSoq','6lwF5y+85Psg5PER','qSoLW6xdKG','lSo6wmoIBXtdPa','W5hcIsxdGK8','bmoRWQj2WR0C','xYDJWQJcSa','W7FcPru7W48','4PQHmoIgSUwTGos4U+I8L+IHSUMxUEMzSUAxHUMuHEIUVUE/SoMxGEITTa','c8obAG','5z6R5zYR5RsC5yUG5lMH6lA15lMAWQu','4P+Rn+IfSUAEKEI/P+IIJUMaHEwiKEs4ToMuQUITN0a','W7RdI8keW7RdH8kf','W7NdNmkiW6ddImkeWPldM2PycdCQWPlcL2BdQbxcHSoaWOm','gsmFgr4oWO7cQZe','W6ZINiFdLq','5lUX6loj8jgITW','gSkeW4mmWOy','mJ4yW7ldLG','WPGpWO8','WRHekmkdW7TzEG','6lEs5y6x5Psi5Pw0','FtSLWPbwW6y','WRCpWOziymoslmoqCmockSkd','tUs6HEA0P+wiMCoT','aZhdLKGu','mSo8CSosEq','arvZpq','W6xcRb0xWRa','zCkaW7iFumo0WOxcLW','sCosW4ddTI8','WQBcTCkDumooCxddIIpcGtdcSCo4tuhcKq','W4pcKZurW4f4W77dQa','44c35O6F56s344kP6k6M5ysR6i6L5yYjW77cRSk7WRBdOv8','aY/dT1OI','4P2bWRBMNklOGQlMRzJNO5VLPPdNKltcOq','5lYk5Ocb5yQJ8kwNLE+6KG','fcRcOmkFW4rrAI0wumkd','mmoUt8oIyG','txBdMdCs','W5ZdP0SRW4/dOthcNmk5W5DRWQy','WPJcVmodW6i','eCoQDCoXyW','eMvR','W5idW6xdKCoTW5RcSSoOFq','W4hcHc4q'].concat((function(){return['u8o/W7NdPbhdHq','tCoLW7a','qmkwWQldIa','yZeX','oSkzW7ldTu4dkHPTpa','W7dcUt8NW6m','imkaW4yPWRVcICojW7W','W4XpWO4tvComW4zRW5G','WORcSqTmWPFcTdpcTmkbW4rV','W4xcTJ4','W7/dL8kW','W4eruCoYzrDuF8kolmkLW7ZcQ3KL','bmkJW4pdMgO','pt3dMKCWaSoCWQ8','W7NcRmoaWODhCCkYW5ZcKg/cScfaEq','W5zba8owtW','WRuoWPXltW','atRcUSkjW4ns','tsGGW73dRq','5yYs5lQa5AsB6ls/','WPRcTmoBW7DAW4S','mCoQvCoMFG8','4PUvuoIVT+weGEwTP+s5Row/K+IKREEANEEoPEwIUEwmU+MgUowsK+wfTUI/IUIHLEIgKUAEMq','pSkrW5W9WQ3dGCkVWRFdUmkGW6RcQmoAW63cRCoglx8rW4JcUKGnWPa/WPFdIKhdTCo8WPlcOCoZhGiYkCk1dIvrW5zhW6S','pX9jmmkY','lSoNvmoXvqBdP1VdKttdOe9zvXCdW5St','eb52','W5SvuCoxEWO','ucvzjGW9FSk0ymoVW5BdV8obFSoWW6bxDCkeu8o7DCoYlmo1eZ0','ymkeW6GEAmoP','aSoaEW','WOdcR8krwmoa','WOjTpa','W4pdSSkYW4ddLW','4PI8WR7OH6tLRzBKUO/OV5/OO7tPLz/PMzZMLkxPL5tORBhNVjZPL4pORAW','gIiwFfWGWQZcUqJcTXK','rSkwWQW','itpdKKWe','W4/cNGmXW5C','WQDeWPtdL8of','vJP2','BYz/WR7cPa','g8obFSoBFG','tmoRW6C','omkjWQtdMXrz','W4dcTZO/WPubWQuD','44oD6iYS5yYJ5RAp5yUE5l6K5OoS5AED6lEJ','bWjatt4zFWDWWORcLW','bmoeESoEWRy','6i625y+g5RwJ5yMY5l6t5OkO5Asp6lsO','W45WbCoyEG','WQpcLmktv8oB','W5jbWPq4nCklWPSG','rmogaG','WRVdUSkCW4aIlmoUWOK','eWLegSkU','WQFcUCkls8oQyxa','WQdcJSoIWQBcKSoBWQNdS05FeHK','WOVcOGzCWPa','wSodjfjP','hmottCoKyW','hmoACSo0WOK3','WQ3dQMZcIq','FCoCrGvk','gr9N','hYdcS8kjW59e','W7VdMCkKW4pdKSkcWOZdO0rpcbS2WO3cPW','WQxcTIBdOmkmWP/cSWBcS8oZWRO','5BUK6zkA56AH5yMy8jYTME+7TW','W7NdShG','g8ohrmo2rW','WRTEoW','WPXtoSo4W48','CCkoW7uiumo8WPVcMq','xKmt','WQddTmks','f2rppHa1AmoO','kutcTCo3','vJb/WQdcTSkU','jCkFW7i','m8oiz8ouAW','bmkGW6S9WR8','WOVcVrf+WPlcVYq','x18t','W49YcCozuSkWmq','WQpdNKD5WPi','xCkCW4G','W5reWRuvna','W43dT3ZcPSkT','tY5+W6GJcNZcQ8o8WQlcOmkuW6zCW5K','FmkaW7yo','bZpdTvS5','WRtdQMJcMa','bSosWR1WWOG','j8orWQS','W5BcHd4uW5bV','FYDQWQ/cQq','i8ksWRNdUWHj','44oL5BU36zcs5OIQ5Rs+5yIu5lMv5A6L5zYm','tID4WQO','qCoce2b8nXW','ctBdTxq3'].concat((function(){return['WRZdOu0','rhPa','WORcMdbkWPC','5y6j5lMw5AAf6lsg','eGmuW5JdK8o5','W63dKwNcRSko','8lUOK8o3','WORcRHzVW5ldSZNcMmkjW45HWRKCmxyBW58','jCoUB8oIWPa','xtbLWPtcQ8kHlW','W5hcTJ7dIhy','uv8BgwKnAq','WPCpWOXz','W5xcGshdPa','W6hcVr4UW6NcJSoPzSkYmXVdPq','W5ZcKtODW6u','rfu6awK','ANJdObe','WRlcUCkoDmokuq','cmogCmofWOiH','W4RcTJ02','D8obW7FcO0CaW7/dNh/cNW','WPRcVHjvWPC','W5boWRSukG','nWVcP8kUW5u','pCkDWQpdQI5uWQ/cHa','WP1uWR7dT8oWW6NcL8oO','lCoetSoyWR0','WRrOf8odW6m','jCkmW48JWP/cMmo0W7hdVCkHW7hcOCkMW7xdR8oj','fmoNWQbMWR0CWQ1k','W5ziWPi7mCkqWP8RWPZdN20','WRJdSCkdW7CZ','WPdcSSoq','W4ZcVHuHW6K','W4OFt8kmjeGkACk6nSo/W5/cOxiLumk0DwS','tCkvWPVdKxq','5lUT5PAQ5BE/5y265lMF6l6K','WOtcNZ5qWOq','n21GW5qmWQlcHt/cNuBcGMq','WQ3dQMZcIvpcR3WD','W7FcJY3dV28','x3ropdGnWRhcVG','lUIVRUAZLUwsVEw7KmoQ','W4PuWRW/aW','8jY+SNBLHPtORPVcSG','pmoGz8oBDG','tSo5zITEW5VdOb/dLu5iW4m','w8kXW787W6HAW5vCWQimhuVcSa','44gj6iYD5y+65RAj5yQm5l2c5OkX5Aw86lEE','W4jfWOKpdSknWP0SWO3dGgJcMmk3yW','WPSvWPX6ACoDpW','leFcRCoPBG','WO9yWQpdHCot','oCkrW6K+WRW','WRXVcSoyW5i','WP7cVbbOWQ7cOttcK8kBW6TK','W5VcUJmxWRq','W4z0hmouqCkRnLJdP0hdNa','5lQf6loH8koWSG','pSodva','qui0CCopug7dTfnUCG','c1Lpkd8','WPdORi7MSiRLKz3LUPBdTq','vJOJW53dJSkx','Bx8/','5y6o6ysQ6k2C5PMdW6pdHSk9WQxcTSo1WRJdPCojWR0','mK1cWO1v','vIO+W63dJmkh','DxWda0O','eMvl','zCk8dCkWpfFdPf/dJdBdGgO','WR5wmCkGW5O','qoIUGEAWUowMRoI2Mmk94P+/WRxMLjxLKPhLUilMLOVMJy4','bCkDWP7dVr8','WR7dR0D/','sYDWWQ/cLW','WOrMbmoyW43dRqhcUCoGzZ7cP0RdR8osaNVdHrBcL8oDW6rVgW','rvuAewKEtJS','mwlcHmoiwa','WQNdO8kCW4a','nmoSWRDVWRC','W4uFrq','W6xdS8kzW77dUq','cwTLWRD2CN3dIa','AhC1WR8/','W4/dQ8kcWRynWONcGSkiW7tdT8oKdq','jZFdKW','W41Zn8oox8kTmM3dNuFdHc8gBKbeASkzDmk+W58oW7XOmCoh5O+45yU55BQb5y6w57MF56UX5Pwg772e6BU/6k2PW5S','stX2WQK','W7JdQNJcU8kH','ACo/EWL9','44c45O+f56sD44gz6k6B5ysS6i2R5yYnbmkFlHPArq','W5ZcNcBdT3BcVq','pmkbW7C+WRBcLmoWW5tdPmk8W7hcVCkgW7NdNmofjYuxW5xcOqysW5H/W4JdHEIhH+wSGos7GEI8TUIIIoMvTEMBS+AxI+MuU++9GoM4G+IVJNutWQ8','WQtcVqDyWPS','W5CWBSoPW53dGX3cKCoF','4PY/qoADPoIcO+ATREEIQowNVoEtT8oR','aCoJWRPHWRa'];}()));}()));}());Iii11l=function(){return lIli1I;};return Iii11l();};async function Main(){const l1l111=liil11,IiIl={'disVF':function(IiIi,iI1ll1){return IiIi>iI1ll1;},'hgemH':function(IlI1Il,l1il1l){return IlI1Il!==l1il1l;},'LakAX':l1l111(0x183,'peHw'),'weNte':l1l111(0x16a,'CYJw'),'RESZO':'⚠\x20请先定义必要的环境变量后再运行脚本','BSNNk':function(liIil,IllI1I){return liIil===IllI1I;},'qOgbH':l1l111(0x13c,'Gw9t'),'iKAOz':l1l111(0x12d,'g@b6'),'DRDQJ':function(liIii,II1ll1){return liIii!==II1ll1;},'ONLGO':l1l111(0x160,'46R('),'glPwO':'uFyRx','vKNmY':function(IlI1Ii,i11I1I){return IlI1Ii(i11I1I);},'iHTpw':l1l111(0x12c,'AZWR'),'tjvCE':function(l1il1i,ll1){return l1il1i(ll1);},'XTZsh':function(iI1llI,llliii){return iI1llI>=llliii;},'OUBaY':l1l111(0xe0,'#*xI'),'IFFZu':'gnPhw','aOvXt':'PNWII','WjrRi':function(IllI11,l1llIi){return IllI11!==l1llIi;},'LuDDP':'qwMJW','wqQnH':function(II1llI,i11I11){return II1llI<i11I11;},'ASigu':function(l1llIl,ii1I1l){return l1llIl!==ii1I1l;},'EOdRG':function(ii1I1i,llI){return ii1I1i-llI;},'oRpfJ':l1l111(0x1c3,'IV0p'),'RHbok':'scrUy','JZnGa':l1l111(0xbb,'Ipm7')};try{if(IiIl['BSNNk'](IiIl[l1l111(0xce,'Ipm7')],IiIl[l1l111(0xef,'Qljz')])){const iI1li1=IlI1I(II11Ii);IiIl[l1l111(0xfe,'g@b6')](iI1li1,0x0)&&IiIl['hgemH'](iI1li1,0x1)&&(IlI11=iI1li1);}else{if(venderIdList[l1l111(0x126,'mfgt')]===0x0){if(IiIl[l1l111(0x155,'mS38')](l1l111(0x17c,'2(xZ'),IiIl['ONLGO']))ilI1li[l1l111(0xc9,'%V5q')](IIliI),ilI1ll&&(IlI1iI[l1l111(0xfc,'Ga!E')]=!![]);else{console[l1l111(0x10a,'CYJw')](l1l111(0x1a6,'POHw'));return;}}const lllii1=[...new Set(venderIdList)];try{if(IiIl[l1l111(0xed,'!T*b')]===IiIl[l1l111(0x149,'njsi')]){const liIll=IiIl[l1l111(0x11c,'PI&X')](parseInt,taskThreads);IiIl[l1l111(0x157,'mfgt')](liIll,0x0)&&IiIl['DRDQJ'](liIll,0x1)&&(taskThreads=liIll);}else l1lIil=IiiIli+l1l111(0x172,'2(xZ');}catch{taskThreads=0x1;}$[l1l111(0x1c4,'#*xI')]=null;if(runInterval){if(l1l111(0x144,'5Caz')===IiIl['iHTpw'])try{const iI1liI=IiIl[l1l111(0xe9,'vDhJ')](parseInt,runInterval);IiIl[l1l111(0x159,'V02K')](iI1liI,0x0)&&(IiIl[l1l111(0x169,'AOcc')](IiIl[l1l111(0x14c,'Ie01')],IiIl['IFFZu'])?(lilIl1[l1l111(0x1da,'D0Oj')](i1l1ii['name'],IiIl[l1l111(0x173,'Um)@')]),i1l1[l1l111(0xd6,'mfgt')](0x1)):$[l1l111(0x1c6,'vDhJ')]=iI1liI);}catch{IiIl['BSNNk'](l1l111(0xe5,'^J6M'),IiIl[l1l111(0xd3,'mfgt')])?i1l1li[l1l111(0xea,'V02K')](IiIl[l1l111(0xd9,'D0Oj')]):console[l1l111(0x1b0,'^J6M')](l1l111(0x1b2,'Ipm7'));}else{IiilI1[l1l111(0x10f,'Qd#$')](IiIl['RESZO']);return;}}$[l1l111(0x15d,'HFp!')]=![];IiIl[l1l111(0x124,'R3Nw')](lllii1['length'],0x1)&&(IiIl['WjrRi'](IiIl[l1l111(0x1b7,'g@b6')],IiIl[l1l111(0x17e,'Aw@C')])?(!Iliill['includes']('券')&&(I1llil=!![]),i1illi[l1l111(0x10f,'Qd#$')](i1illl)):(console['log']('🏬\x20共计\x20'+lllii1[l1l111(0x1de,'&WLa')]+'\x20个活动\x0a'),$[l1l111(0xe8,'#*xI')]=!![]));for(let IlII1=0x0;IiIl['wqQnH'](IlII1,lllii1[l1l111(0x131,'peNN')]);IlII1++){$[l1l111(0x19d,'HFp!')]=lllii1[IlII1],$[l1l111(0x103,'7JDi')]=l1l111(0x1a7,'Um)@')+$[l1l111(0x137,'0lAp')],await common[l1l111(0x1d9,'60[g')](taskThreads,cookiesArr,taskFnc),$[l1l111(0xbc,'peHw')]=![],$[l1l111(0x1cd,'g27q')]=![],IiIl['ASigu'](IlII1,IiIl[l1l111(0x195,'AOcc')](lllii1['length'],0x1))&&(IiIl['oRpfJ']!=='aEuau'?console[l1l111(0x11b,'pAKC')]('\x0a'):i1ill1[l1l111(0xc9,'%V5q')]('\x0a'));}}}catch(lli){IiIl['BSNNk'](IiIl[l1l111(0x174,'C$&C')],IiIl['JZnGa'])?(I1iIiI[l1l111(0x175,'Ga!E')](l1l111(0xf6,'o)8G')+li1I1[l1l111(0x1de,'&WLa')]+l1l111(0x17a,'g27q')),i1ilil['showPrintId']=!![]):console[l1l111(0x191,'5X9@')]('❌\x20脚本运行遇到了错误\x0a'+lli);}}async function taskFnc(lll,llli1){const l1iIII=liil11,iIli1i={'UJxmW':function(lI1li1,iI11II){return lI1li1(iI11II);},'sdVVp':'⚠\x20自定义运行间隔时长设置错误','LyaTV':l1iIII(0x177,'Ga!E'),'hXWWP':function(iIII1I,ilil1i){return iIII1I===ilil1i;},'igahA':function(IlIIi,IiI1l){return IlIIi>IiI1l;},'otAsb':function(illlII,iIII11){return illlII!==iIII11;},'JoIyO':'etYwb','DDsbx':'HhJGb','cKYEK':function(IiI1i,llll1){return IiI1i!==llll1;},'LerbY':l1iIII(0x1af,'IV0p'),'XPFUz':function(lil11l,i1i1Il){return lil11l===i1i1Il;},'OaTce':'KAsSw','FLhqr':l1iIII(0x16c,'Ie01'),'wjmJi':function(I1lIl1,lil11i){return I1lIl1===lil11i;},'jFDCt':l1iIII(0x1cf,'R3Nw'),'sPmcJ':l1iIII(0x187,'!wSy'),'LkAxl':function(IlIIl,lI1liI){return IlIIl===lI1liI;},'rQaSj':'SYSTEM_ERROR','zhXDs':function(i1i1Ii,lllii){return i1i1Ii===lllii;},'WWcgE':l1iIII(0x18c,'2(xZ'),'IixGe':l1iIII(0xc0,'AZWR'),'igmeM':'sign','qdHYU':function(iI11Ii,iIII1l){return iI11Ii===iIII1l;},'yHNTM':function(lllil,iI11Il){return lllil===iI11Il;},'Vnymo':'ROCrY','CmhDc':function(iIII1i,iil1i1){return iIII1i||iil1i1;},'Gveom':l1iIII(0x141,'&WLa'),'LGNNw':l1iIII(0x184,'HFp!'),'DyaVG':function(il1i11,IlIll1){return il1i11===IlIll1;},'rcjDT':l1iIII(0x19c,'Aouc'),'gLOUi':'rUthN','uSczZ':function(IlIII,ilil1l){return IlIII!==ilil1l;},'nxczW':l1iIII(0xe4,'g27q'),'BnAWb':l1iIII(0x1dd,'peNN'),'HibkA':l1iIII(0x140,'D0Oj'),'Usnyf':l1iIII(0x1a9,'2(xZ'),'HvHdg':l1iIII(0xb9,'^SEe'),'CKPRn':l1iIII(0xd0,'Qljz'),'RECpa':'zh-Hans-CN;q=1,\x20en-CN;q=0.9,\x20zh-Hant-CN;q=0.8','AfrGD':'keep-alive','fyDSS':'application/x-www-form-urlencoded','fvyCn':'empty','lVurg':l1iIII(0x164,'5X9@'),'FxNkN':'same-origin','ULKJw':l1iIII(0xec,'pAKC'),'CoLGV':function(illlIi,I1lIii){return illlIi<I1lIii;},'dtvwg':function(IiI1I,illlIl){return IiI1I!==illlIl;},'FCZcN':'kbKfO','apmRM':function(i11ill,IIIIIi,IIIIIl){return i11ill(IIIIIi,IIIIIl);},'HwWPG':l1iIII(0x19f,'7JDi'),'hNvUM':'pt_pin','RmQsw':function(I1lIil,IIIl1i){return I1lIil===IIIl1i;},'AntwJ':l1iIII(0xd4,'D0Oj'),'jkfoQ':'woFjF','LeEDL':function(liiII1,IIIl1l){return liiII1(IIIl1l);},'dJKiR':l1iIII(0xe6,'Um)@'),'myNsZ':function(lllll,i11ili){return lllll(i11ili);},'PJeSw':l1iIII(0x151,'g@b6')};if($[l1iIII(0x109,'mS38')])return{'runEnd':!![]};const iI1lii=decodeURIComponent(common[l1iIII(0xfb,'#*xI')](lll,iIli1i['hNvUM'])),IilIii='【账号'+llli1+'】'+iI1lii+'：'+($[l1iIII(0x101,'Qljz')]?$[l1iIII(0x117,'D0Oj')]+l1iIII(0x171,'vDhJ'):''),iI1lil=notify[l1iIII(0xc2,'AOcc')](llli1,iI1lii),l1lIi1=await common['getLoginStatus'](lll);if(!l1lIi1&&iIli1i[l1iIII(0x100,'^J6M')](typeof l1lIi1,iIli1i[l1iIII(0x1a0,'Ga!E')])){console['log'](IilIii+l1iIII(0x163,'peNN')),iI1lil[l1iIII(0x105,'Gw9t')](l1iIII(0x152,'!T*b'));return;}const iIli1l=common['genUA'](iI1lii),i1i1II=common[l1iIII(0xdb,'IV0p')](iI1lii),liiIIl=common[l1iIII(0x153,'Qd#$')]();if($[l1iIII(0xcd,'C$&C')])return{'runEnd':!![]};if(!$[l1iIII(0x1d2,'PI&X')]){if(iIli1i['hXWWP'](iIli1i[l1iIII(0x1c0,'g27q')],iIli1i[l1iIII(0x1b5,'HFp!')])){$[l1iIII(0x19b,'pAKC')]=!![],await iIli1i['LeEDL'](il1i1I,iIli1i[l1iIII(0xf7,'Gw9t')]);if($['runEnd'])return{'runEnd':!![]};if($['waitTime'])await $[l1iIII(0x1ce,'LXfj')]($[l1iIII(0xf1,'LXfj')]);}else iIIIIi=iii1I1;}let iil1iI;await iIli1i[l1iIII(0x15f,'peHw')](il1i1I,l1iIII(0x198,'Qljz'));if($[l1iIII(0x14b,'Zk4m')])await $[l1iIII(0x15a,'V02K')]($[l1iIII(0xf3,'Ie01')]);if(iil1iI===0x2)console[l1iIII(0xca,'Ie01')](IilIii+l1iIII(0xee,'peHw'));else{if(iIli1i[l1iIII(0x1b1,'PI&X')]!==l1iIII(0x10e,'D0Oj')){await il1i1I(iIli1i[l1iIII(0x111,'njsi')]);if($[l1iIII(0x17f,'60[g')])await $['wait']($[l1iIII(0x11d,'46R(')]);}else lIIil1[l1iIII(0xc9,'%V5q')](IIli1+l1iIII(0x139,'njsi'));}function IlIllI(iiili1,ill11i){const llI1I1=l1iIII,lllill={'AyHPq':iIli1i['LyaTV']};try{switch(iiili1){case'signActivityRule':if(iIli1i[llI1I1(0x180,'5X9@')](ill11i[llI1I1(0xd5,'Ga!E')],'0')&&ill11i[llI1I1(0x10d,'mS38')]){let {awardDescription:ill11l}=ill11i['result'];if(ill11l&&Array['isArray'](ill11l)&&iIli1i[llI1I1(0xd8,'AOcc')](ill11l['length'],0x0)){if(iIli1i[llI1I1(0xff,'Um)@')](llI1I1(0x142,'5Caz'),iIli1i[llI1I1(0x1a8,'POHw')])){lI1Ill[llI1I1(0x1b0,'^J6M')]('【'+lI1Ili['venderId']+llI1I1(0x1be,'vDhJ')),IliilI[llI1I1(0x1a1,'!wSy')]=!![];return;}else ill11l=ill11l[llI1I1(0x167,'AZWR')](IliiiI=>IliiiI!=='');}else ill11l=[];if(ill11l[llI1I1(0x1a5,'2(xZ')]===0x0){if(iIli1i[llI1I1(0xf5,'#*xI')](iIli1i[llI1I1(0xe1,'!wSy')],iIli1i[llI1I1(0xe1,'!wSy')]))ill11I[llI1I1(0x1ae,'g27q')](Iliiil+llI1I1(0x15c,'!T*b'));else{console[llI1I1(0x175,'Ga!E')]('【'+$[llI1I1(0xe7,'AZWR')]+'】店铺或活动不存在'),$['runEnd']=!![];return;}}console[llI1I1(0xb6,'D0Oj')]('店铺ID：'+$['venderId']);let I1lIiI=![];for(const liiIII of ill11l){iIli1i['cKYEK'](iIli1i['LerbY'],iIli1i[llI1I1(0x15b,'IV0p')])?l1lIli[llI1I1(0x176,'njsi')]=!![]:(!liiIII['includes']('券')&&(I1lIiI=!![]),console[llI1I1(0x1df,'Aouc')](liiIII));}!I1lIiI&&(iIli1i[llI1I1(0x130,'PI&X')](iIli1i[llI1I1(0x113,'K02V')],llI1I1(0xd1,'g27q'))?(console['log'](iIli1i['FLhqr']),$['runEnd']=!![]):(delete I1l1II[llI1I1(0x18b,'V02K')],delete IIli1I[llI1I1(0xb7,'7JDi')][llI1I1(0xf8,'R3Nw')])),console['log']('');}else{if(iIli1i[llI1I1(0xdf,'Qljz')](iIli1i[llI1I1(0xc3,'5Caz')],llI1I1(0x115,'&WLa'))){I1iIll[llI1I1(0xea,'V02K')]('【'+I1lliI[llI1I1(0xe3,'g@b6')]+'】店铺或活动不存在'),llIllI['runEnd']=!![];return;}else{console['log']('【'+$[llI1I1(0x182,'AOcc')]+llI1I1(0xfa,'Gw9t')),$['runEnd']=!![];return;}}break;case iIli1i[llI1I1(0xb8,'%V5q')]:if(iIli1i[llI1I1(0xbe,'HFp!')](ill11i,iIli1i[llI1I1(0x1d8,'^J6M')])){console['log']('【'+$[llI1I1(0x196,'Um)@')]+llI1I1(0xc5,'Ga!E')),$[llI1I1(0x1bc,'K02V')]=!![];return;}if(iIli1i[llI1I1(0x1b6,'AOcc')](ill11i['code'],'0')&&ill11i[llI1I1(0x1ab,'pAKC')]){if(iIli1i['WWcgE']===iIli1i['WWcgE'])iil1iI=ill11i[llI1I1(0x1ad,'60[g')]?.[llI1I1(0x13a,'Qljz')]?.[llI1I1(0x16e,'PI&X')];else{i1III['log'](Ii1iIi+'账号无效'),iliIIl['fix'](lllill['AyHPq']);return;}}else iIli1i[llI1I1(0x128,'Qljz')]===iIli1i['IixGe']?console[llI1I1(0x1b8,'&WLa')](IilIii+llI1I1(0x1c1,'CYJw')):I1i11i=I1i11l+llI1I1(0x1d4,'0lAp');break;case iIli1i[llI1I1(0x1a2,'mS38')]:if(iIli1i[llI1I1(0xba,'#*xI')](ill11i[llI1I1(0xdd,'Aw@C')],'0')&&ill11i[llI1I1(0x178,'o)8G')]){if(iIli1i['yHNTM']('ROCrY',iIli1i[llI1I1(0x11a,'AZWR')])){const iil1ii=ill11i['result'][llI1I1(0x14d,'!T*b')];let IlIlli=ill11i['result']?.[llI1I1(0x194,'Aouc')]?.[llI1I1(0xbd,'60[g')]||'';if(iIli1i[llI1I1(0x1d6,'Gw9t')](!iil1ii,!IlIlli)){console[llI1I1(0x1db,'vDhJ')](IilIii+llI1I1(0x143,'V02K')),iI1lil[llI1I1(0xc4,'K02V')](iIli1i[llI1I1(0xf2,'mfgt')]);return;}IlIlli[llI1I1(0x1bd,'Aw@C')]('：')&&(IlIlli=IlIlli['split']('：')[0x1]);let il1i1i='';while(!il1i1i){if(['京豆','积分']['some'](lil111=>IlIlli[llI1I1(0x1dc,'Qd#$')](lil111))){if(/\d/[llI1I1(0x17d,'POHw')](IlIlli)){const i11ilI=IlIlli[llI1I1(0x188,'2(xZ')](/\d+/g)[llI1I1(0x192,'!T*b')]('');if(IlIlli['includes']('京豆'))il1i1i=i11ilI+llI1I1(0x104,'S*)e');else{if(IlIlli['includes']('积分')){if(iIli1i['LGNNw']===iIli1i[llI1I1(0x10c,'46R(')])il1i1i=i11ilI+llI1I1(0x134,'^J6M');else try{const llllI=iIli1i['UJxmW'](li1II,IliI11);llllI>=0x0&&(i1l1lI['waitTime']=llllI);}catch{I1iIii[llI1I1(0x1b4,'!T*b')](iIli1i[llI1I1(0x1cb,'S*)e')]);}}}break;}}else{if(IlIlli['includes']('券')){if(iIli1i[llI1I1(0x1cc,'Gw9t')](iIli1i[llI1I1(0x102,'Aw@C')],iIli1i[llI1I1(0xcb,'Qljz')]))IIlil[llI1I1(0x1d0,'POHw')](ilI1lI+llI1I1(0xcc,'HFp!'));else{il1i1i=llI1I1(0x186,'60[g');break;}}}il1i1i=IlIlli;break;}console[llI1I1(0x19a,'PI&X')](''+IilIii+il1i1i),iI1lil['insert'](il1i1i);}else IlI1ii[llI1I1(0x120,'HFp!')](llI1I1(0x185,'R3Nw')+lIIiii+llI1I1(0x108,'mfgt')+(iI1lli['message']||ll1iI));}else console['log'](IilIii+llI1I1(0x1a3,'%V5q'));break;}}catch(ilil1I){console[llI1I1(0x1b0,'^J6M')](llI1I1(0x12a,'0lAp')+iiili1+llI1I1(0xf4,'Zk4m')+(ilil1I['message']||ilil1I));}}async function il1i1I(i11il1){const IlIlil=l1iIII;if(iIli1i[IlIlil(0x107,'Qd#$')](iIli1i[IlIlil(0x135,'mfgt')],IlIlil(0x1ba,'Gw9t'))){const lllilI=i1l1I(IiilIi);lllilI>=0x0&&(iii1Ii[IlIlil(0xe2,'K02V')]=lllilI);}else{if($[IlIlil(0x190,'5X9@')])return;let ilil11='',illlI1=null,IIIl11=null,I1lIi1=iIli1i[IlIlil(0xc8,'HFp!')],liiIIi={};switch(i11il1){case IlIlil(0x181,'IV0p'):case iIli1i[IlIlil(0x14e,'Gw9t')]:ilil11=iIli1i[IlIlil(0x17b,'HFp!')],liiIIi={'vendorId':$[IlIlil(0x158,'2(xZ')]},IIIl11={'functionId':i11il1},illlI1=common['queryStringToObject'](await common[IlIlil(0xd2,'&WLa')](i11il1,liiIIi));break;case iIli1i[IlIlil(0x1c2,'7JDi')]:ilil11=iIli1i[IlIlil(0x118,'peNN')],liiIIi={'vendorId':$[IlIlil(0x12e,'PI&X')],'sourceRpc':iIli1i[IlIlil(0x1b9,'&WLa')]},IIIl11={'functionId':IlIlil(0x122,'&WLa')},illlI1=common[IlIlil(0x13f,'Ie01')](await common[IlIlil(0x14f,'njsi')](iIli1i[IlIlil(0x11e,'CYJw')],liiIIi));break;default:console[IlIlil(0x193,'o)8G')]('❌\x20未知请求\x20'+i11il1);return;}const lil11I={'url':ilil11,'method':I1lIi1,'headers':{'Accept':iIli1i['HvHdg'],'Accept-Encoding':iIli1i['CKPRn'],'Accept-Language':iIli1i[IlIlil(0xb4,'Um)@')],'Connection':iIli1i['AfrGD'],'Content-Type':iIli1i[IlIlil(0x1c7,'POHw')],'Cookie':lll,'J-E-H':liiIIl,'J-E-C':i1i1II,'Sec-Fetch-Dest':iIli1i[IlIlil(0x1ca,'Qljz')],'Sec-Fetch-Mode':iIli1i['lVurg'],'Sec-Fetch-Site':iIli1i['FxNkN'],'User-Agent':iIli1l,'x-referer-package':iIli1i[IlIlil(0xfd,'peNN')],'x-rp-client':IlIlil(0x197,'#*xI')},'params':IIIl11,'data':illlI1,'timeout':0x7530};iIli1i[IlIlil(0xeb,'AOcc')](I1lIi1,'GET')&&(delete lil11I['data'],delete lil11I[IlIlil(0xc7,'S*)e')][IlIlil(0x179,'Ga!E')]);const Iliii1=0x1;let iIiIi=0x0,iil1ll=null,iiilil=![];while(iIli1i[IlIlil(0x189,'Zk4m')](iIiIi,Iliii1)){const iil1li=await common[IlIlil(0x1c8,'IV0p')](lil11I);if(!iil1li[IlIlil(0x165,'2(xZ')]){if(iIli1i[IlIlil(0x123,'Ipm7')](iIli1i[IlIlil(0x13b,'CYJw')],IlIlil(0x1e0,'Gw9t')))iliIII[IlIlil(0x1d7,'njsi')](IlIlil(0x16d,'7JDi')+iIIl1i);else{iil1ll=IlIlil(0xcf,'PI&X')+i11il1+'\x20请求失败\x20➜\x20'+iil1li[IlIlil(0x168,'&WLa')],iIiIi++;continue;}}if(!iil1li[IlIlil(0xda,'Zk4m')]){iil1ll='🚫\x20'+i11il1+IlIlil(0x112,'C$&C'),iIiIi++;continue;}iIli1i[IlIlil(0x166,'mfgt')](IlIllI,i11il1,iil1li[IlIlil(0x147,'mS38')]),iiilil=![];break;}iIiIi>=Iliii1&&(console[IlIlil(0x199,'Aw@C')](iil1ll),iiilil&&(iIli1i['HwWPG']==='qVkkx'?$['outFlag']=!![]:lilIll=!![]));}}}var version_ = 'jsjiami.com.v7';
// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
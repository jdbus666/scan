/*
活动名称：gzsl-幸运抽奖
活动链接：https://gzsl-isv.isvjcloud.com/wuxian/mobileForApp/dist2/views/pages/gameDZP_36.html?activityId=<活动id>
环境变量：jd_gzsl_lottery_url // 活动链接
         jd_gzsl_lottery_Notify // 是否通知（true/false），默认不通知
         jd_gzsl_lottery_opencard // 是否入会（true/false），默认不入会


cron:1 1 1 1 * jd_gzsl_lottery.js

*/

const $ = new Env('gzsl-幸运抽奖');
var iｉl='jsjiami.com.v7';const ililIl=iii1II;(function(lIli1l,lillIi,illIi1,ii1ili,liil1i,lI1lil,i1l1iI){return lIli1l=lIli1l>>0x1,lI1lil='hs',i1l1iI='hs',function(liil1l,lI1lii,Iiili1,Iil1l1,i1i11I){const lilIIl=iii1II;Iil1l1='tfi',lI1lil=Iil1l1+lI1lil,i1i11I='up',i1l1iI+=i1i11I,lI1lil=Iiili1(lI1lil),i1l1iI=Iiili1(i1l1iI),Iiili1=0x0;const il1iIl=liil1l();while(!![]&&--ii1ili+lI1lii){try{Iil1l1=parseInt(lilIIl(0x2ad,'t&#%'))/0x1*(parseInt(lilIIl(0x30a,'nq^L'))/0x2)+-parseInt(lilIIl(0x33a,'D44L'))/0x3*(parseInt(lilIIl(0x2ae,'uxF!'))/0x4)+parseInt(lilIIl(0x35e,'O7NY'))/0x5+parseInt(lilIIl(0x379,'G6kK'))/0x6+parseInt(lilIIl(0x212,'^H@Q'))/0x7+parseInt(lilIIl(0x2bc,'PD$g'))/0x8+parseInt(lilIIl(0x2a3,'2Mzb'))/0x9*(-parseInt(lilIIl(0x386,'!sBR'))/0xa);}catch(iii1ii){Iil1l1=Iiili1;}finally{i1i11I=il1iIl[lI1lil]();if(lIli1l<=ii1ili)Iiili1?liil1i?Iil1l1=i1i11I:liil1i=i1i11I:Iiili1=i1i11I;else{if(Iiili1==liil1i['replace'](/[IkMqDwVKdNSUBgpeOCJYG=]/g,'')){if(Iil1l1===lI1lii){il1iIl['un'+lI1lil](i1i11I);break;}il1iIl[i1l1iI](i1i11I);}}}}}(illIi1,lillIi,function(il1iIi,iii1il,II11li,I1l11i,iIIiiI,liiI1i,ililIi){return iii1il='\x73\x70\x6c\x69\x74',il1iIi=arguments[0x0],il1iIi=il1iIi[iii1il](''),II11li=`\x72\x65\x76\x65\x72\x73\x65`,il1iIi=il1iIi[II11li]('\x76'),I1l11i=`\x6a\x6f\x69\x6e`,(0x152886,il1iIi[I1l11i](''));});}(0x18e,0xe3f16,Iii11l,0xc9),Iii11l)&&(iｉl=Iii11l);const liiIIl=require(ililIl(0x30e,'kd#c')),iil1iI=require(ililIl(0x37c,'5i3@')),IlIllI=require('./utils/Rebels_sendJDNotify'),il1i1I=require(ililIl(0x256,'t&#%'));console[ililIl(0x2a9,'5#9G')](''),console[ililIl(0x2d0,'$ETg')](ililIl(0x25c,'lC3G')+$['name']+ililIl(0x338,'CM9l')),console[ililIl(0x308,'!sBR')]('jd_gzsl_lottery_url\x20//\x20活动链接'),console['log'](ililIl(0x22b,'qUv*')),console[ililIl(0x352,'!JFX')](ililIl(0x23e,'uxF!')),console['log'](ililIl(0x2a4,'!Er7')),console[ililIl(0x2f1,'3ebv')](ililIl(0x2dd,'D44L')+$[ililIl(0x34d,'r5Wb')]+ililIl(0x303,'DyS#')),console[ililIl(0x26e,'bJsB')]('');const lI1li1=process[ililIl(0x2d7,'2z(e')][ililIl(0x382,'!Er7')]||'',iI11II=process[ililIl(0x260,'CM9l')]['jd_gzsl_lottery_opencard']===ililIl(0x1ff,'!Er7'),iIII1I=process[ililIl(0x202,'m(Ld')][ililIl(0x241,'2z(e')]==='true',ilil1i=process[ililIl(0x275,'!JFX')]['jd_gzsl_lottery_draw']||'5',IlIIi={0x0:'',0x1:'[京豆]',0x2:'[优惠券]',0x3:ililIl(0x2d8,'O7NY'),0x4:'[积分]',0x5:ililIl(0x271,'5#9G'),0x6:ililIl(0x36f,'1YBI'),0x7:ililIl(0x332,'d!&F'),0x8:ililIl(0x2c4,'TzdT'),0x9:ililIl(0x208,'PD$g')},IiI1l={0x1:ililIl(0x317,'1YBI'),0x2:'isFollowGoods',0x3:'isAddCart',0x5:'isViewActivity',0x8:'isContactShop'};function iii1II(_0x5882db,_0x253c41){const _0x171254=Iii11l();return iii1II=function(_0x5c45a,_0x146d60){_0x5c45a=_0x5c45a-0x1eb;let _0x4c5e44=_0x171254[_0x5c45a];if(iii1II['qigFtJ']===undefined){var _0x2e4b33=function(_0x5dafac){const _0x273c8b='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x504979='',_0x45c69a='';for(let _0x16e827=0x0,_0x444bfa,_0x16303c,_0x10bea0=0x0;_0x16303c=_0x5dafac['charAt'](_0x10bea0++);~_0x16303c&&(_0x444bfa=_0x16e827%0x4?_0x444bfa*0x40+_0x16303c:_0x16303c,_0x16e827++%0x4)?_0x504979+=String['fromCharCode'](0xff&_0x444bfa>>(-0x2*_0x16e827&0x6)):0x0){_0x16303c=_0x273c8b['indexOf'](_0x16303c);}for(let _0x5bf34e=0x0,_0x3adcce=_0x504979['length'];_0x5bf34e<_0x3adcce;_0x5bf34e++){_0x45c69a+='%'+('00'+_0x504979['charCodeAt'](_0x5bf34e)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x45c69a);};const _0x15f22b=function(_0xba2078,_0x2ba82a){let _0x5794e9=[],_0x1a2f9d=0x0,_0x17d41b,_0x9939e1='';_0xba2078=_0x2e4b33(_0xba2078);let _0x374f82;for(_0x374f82=0x0;_0x374f82<0x100;_0x374f82++){_0x5794e9[_0x374f82]=_0x374f82;}for(_0x374f82=0x0;_0x374f82<0x100;_0x374f82++){_0x1a2f9d=(_0x1a2f9d+_0x5794e9[_0x374f82]+_0x2ba82a['charCodeAt'](_0x374f82%_0x2ba82a['length']))%0x100,_0x17d41b=_0x5794e9[_0x374f82],_0x5794e9[_0x374f82]=_0x5794e9[_0x1a2f9d],_0x5794e9[_0x1a2f9d]=_0x17d41b;}_0x374f82=0x0,_0x1a2f9d=0x0;for(let _0x205e08=0x0;_0x205e08<_0xba2078['length'];_0x205e08++){_0x374f82=(_0x374f82+0x1)%0x100,_0x1a2f9d=(_0x1a2f9d+_0x5794e9[_0x374f82])%0x100,_0x17d41b=_0x5794e9[_0x374f82],_0x5794e9[_0x374f82]=_0x5794e9[_0x1a2f9d],_0x5794e9[_0x1a2f9d]=_0x17d41b,_0x9939e1+=String['fromCharCode'](_0xba2078['charCodeAt'](_0x205e08)^_0x5794e9[(_0x5794e9[_0x374f82]+_0x5794e9[_0x1a2f9d])%0x100]);}return _0x9939e1;};iii1II['GbrKVA']=_0x15f22b,_0x5882db=arguments,iii1II['qigFtJ']=!![];}const _0x48a373=_0x171254[0x0],_0x16d97f=_0x5c45a+_0x48a373,_0x1dd22a=_0x5882db[_0x16d97f];return!_0x1dd22a?(iii1II['HUGrts']===undefined&&(iii1II['HUGrts']=!![]),_0x4c5e44=iii1II['GbrKVA'](_0x4c5e44,_0x146d60),_0x5882db[_0x16d97f]=_0x4c5e44):_0x4c5e44=_0x1dd22a,_0x4c5e44;},iii1II(_0x5882db,_0x253c41);}function Iii11l(){const lilIIi=(function(){return[...[iｉl,'KVjqsBOjpJiGwaCmVgikI.UNcoSqmwe.vMBS7YdD==','WQRcP8kN','W4SECmotW4yMWOtdOMyIW4aPkW','bhz9WPG3','dmoFmSk4','5RAm5yUz5Bsu57IJ5P6t772P57UF5PYq5Pw/6zEf77+4','WOZNUOVMNApML43PLAFVVzK','8lQDKSo7','6i+F5y2OhCknWQRdLmkcWPVdN+wLHoI3Uq','g8oknmkWWQVdMmkoWPpdUW','WQddK3vLzq','kweBbsRdMG','8jEtUdbm56Up5Rgg','5A235OMP5lQ55yILrG','CuLQWQv9','FHZcNXJcOq','dIhcSLu','WPzge8kRWQ8','WQ/dKsu','W6BMTP/PHkxLJAJdJW','wM9FWOma','WQ/cHg4xdG','EXBcOsC','W7usxxldOq','AxXvWQfv','W7FcTSoHWRldNG','quRdOCofW63dHatdJLC','W4lLVzFLPz3VV6VMMkpNGjBLHzRMNRpLKOFcJa','W7pcL8kKkmor','peRdV3ddSr7cPSoiW7T2fCk+sa','FMD7WOnc','mclcQCo2ovpcOa','xv55WOHHWQvqW5BdT8kzWRBdTmkvWQNdRuxcVCkgkcRcO0Ow','W4LBpSor','kZ7cHW','cSoCWRBdU3tcO3pcQG','WPddPNL4','W6e9shFdVdD1uCk8W4W','rqpcKrVcLqqVC3S+WRNcPWfLWOlcT8o2ASoa','dSomtWS2','dWrBWPNcSx0ufxG','W4CfWRNcGmkLcW','W6FdRdtcMeS7CCkXtGpdUf0bW70','fEIUNUAWSUwrLow5G2K','WPjbm8kuWPT/W5NdJW','4PMMW6JORlFLOiZLH6/MO7JLV73MROJNOzpNMzNLJllPHze','FmkcWQa','D8oMW6lcK1XepW','W5XbWQtcT8k3kCowka','quRdSSoyW7BdKa','5P605B+y5Awo','rSo0WQVdPSkT','vgDnWPCJ','WQ7dMZhdU1xcUge','ydagW5RcSG','5OUe5Asw5P+H5lY7','qCkdW5ZdLrm','WO3cKmkFW7u7','5RAf5yQs5BAL57M25P+u772m57Qx5P6i5Pwr6zsM77YF','eCo9WRBdMeG','WRpJGlpMTB7LI5xLPzNLK5NJG4i','AbRcUa7cRvRdOmooW693','WPZdQhbK','W7pcR8owWOtdKa','wXxcUXK','pZlcI8oUEG','W5GaWP7cG8kM','ymknha','tSkPWOaMsq','WORcV8kFfCkR','WRddIIpdVehcRa','ahXgWRi/W4n6W44','WPOAnSoTA8kwWPzcqCo6','W6BNP43LI5BcGW','rZv+oCo0','W7JcSSk1','4PYkWQFOHlpMNB/OV4tOOipPGyBLIiZKU7/PLkdOR4NdNq','5Rw25yU/5lI66zUm5BQu6zg55lYi5zgi5yYe5lIg5zkTtG','FSotWQJdOSkf','x2Dt','5yIU5ywj5BIs6zgL5l+55zkp5AAr6lsR77+q5Rsa5yUt5lU86zMN5BIX6zoK5l615zke5y6B5lUJ5zkbfq','W7qTuN7dVsC','W7pdKxhcNXnRi8owxSo2','lCk3WQpdKGWtBxddM8okF8o9W4m','ddpcGuVcJW','rKCdWPJcVa','WP3dVgLhWPKZW70','5yQp5ysc5BMz6zkg5l+15zcV5AwY6lsj77YB5RwQ5yML5lIw6zI05BQa6zcb5l+Y5zoB5y+A5lQI','W47cJmomWPZdKG','lmkTW67cRuCi','cJtcQuJcMv/dLstcVq','ACk/WO3dMmo8','lmoJFtX/kM8','nCo0W6tcMfrcnc7dT8oZCmoRWOulWRSyBxZdQCkYW6VdQmkHahRcJ8kK','mq3cN3xcGa','vmkxk8kmzW','p+A1KUwlMowNJ+wqLU+9KW','W6C8wh/dOsj2ymkNW5JdJ8k1','rJX/g8oMoJju','wvaBWOZcIKmvpKbY','Cmk/WQeAwG','E8ooW5FcUK8','kCkmW7xdQSkLsb8fjqWPW7/cLCotWR7cN8ogeq','ASkzWRhdSCo3hmkEWOa0','qCkNWOu','rGeFW6NcNI0','mJn+WOXW','usfDdCoN','WPJdRujMWO8HW7BdPHf0W7BdOWuDW5VcN8kHW63dSHldVspdQSoT5P+x5AEe5OMU5AwD5Q+S5PAq77+X6BUg6k6kb8ofWRVMR7y','5RE55yQx5Bcs5z6Eda','DCk6W4RdPHpcMdyVW5e8','WRddMGBdJua','Fw/dHSoOW6C','W45wWRhcRmk1fmolpmoP','WRpcUg7dMc9Rj8oX','F8o3W4tcG0K','W5RcU8kEomoGW4pcPmkeWQ7dGSkCW5iexuq','v8k2W5ddUWdcNZz7W4WHWOxdLW','W7/dGwi','CSk0WP0WD8k9W5aF','CmkEW67dTSkPwZHo','WPNcR8kJiwy','WRpcJM4dmW','WRfyl8kyWRe','zXdcVZBcRe/dUCoo','t8kfWQRdMCk4','WOtdUXy','gxb2WQulW5f7W7rLaJyzifmAWOFcJwa1ACkFuMKdWQdcIH/dHEAAKowqHEwfQEs8S++/SaVcJCkdW6lcRYu3BmoTWQhVVQBVV4FPUBxORy3KURdLHydKVle','abPLWOXAWRXn','nmoYrXz6kW','WOVcMCkTgCkHW5u7WQVdTCoOwmo9WRb8t2yqW7VdKtxcOsm','umk7WRutwW','qJfJcCoGide','b31DWQ4u','W5tcSmkocmoQ','WQNdR1HhEX7cJCkj','WOaAD002imoNumoZz8kjW609','WP0vlCoZtSkxWO1l'],...(function(){return[...['WOVcMCkMeCkWW4m5','W5KqWOVcLq','WPHBeCkQWRW','WPlcICktdmkVW7i+WPNdVa','W6akAu3dQW','WQpdO0y','WRxcRCk0jbNcQ8kzWOjy','WR/cR8kSpXG','ASkuW6C','wgPpWQqAE8oQmCo3WQBcG8os','wGbfj8o5','WQfqESoqrCoG','W5zZnb5b','dN9LgmoCpI4lzmkEWRBcV2PYDdlcRCoQWOrP','sfabWQtcGeuOpW','xCkPWQhdMSo7','d8oaWQi','W6xORB3MSBZLPilOTiPx4P28W4W','xgr/','WQpdPCk4W6RcMYhcNmoRC0i','WPRcT8kzlwa','ymk/WOyPt8k1W4Kdw2zO','ktlcNmoTj0u','v1ddPq','4PQHW7ZORixLOkVLHQdMO6dLVRlMRjNNOAdNMPdPK7RMJRK','44gY5O2J56E/44kE6k+T5yAk6i6P5yYzgmo5W4n4WPJcMG','Bmk5WOeZwmk7W5G','WR4kkSonEW','fXb4WP0','WRTOlSkOWOu','ACoCWR7dL8kytH7dRCk8W7JdTmo7qwi','BaJcOaJcIHK3aumOWR3cTG','pJJcI8oSuCo2Fa','WPCwjq','vwfm','pCkOW6NcOum','WOZdOeDvrG','W5jvma','vWGdW7ZcGJVcIa','5yMJ5yEB5BUv6zgY5lYU5zkh5As16lAw772K5RsX5yQc5lQR6zIH5BU/6zgI5l+y5zku5yYD5lQi5zc8WPm','oCo25y6KW5i','qWJcQq','WO3cKSkv','EmkVW6/dUX8','W6TcW7m','W74RWPxcNSki','4PQzlUIVNowgQowVSUs5K+w9MoINPoEyMUEnPowHPEwnUEMfSowqMowfLEI+SoIGUEIhPUACQG','W4/MIQlLIPO','WPRcJmkNW6Sq','E8kBWQJdP8o7m8kwWOCPymk0k8keWOpcQCk6W7bSw8kIffpcOCoOWQa3z8k5W5LyWPP6nG','D3fTWOf8','mIpcNmo9n0tcVq','WPfljCkqW5H/W5JdG10d','uCkyWPNdRCo1','WPBcLvmFefy','W6PEW6tdQa','y2LpWOmy','WR1rW4y','fsxcTuBcG1a','va0uW53cPsJcKWddShJcNsW','WRRcOxxdQrbIlW','vMjG','hXtcJ8otwW','nSoZxIiHWQBcVq','Emk2W5K','AmkoWQZdUCoR','W43cV8kEbCo8W47cMCka','C8kfWRVdP8oNnmksWOa','5yQM5yAE5BIx6zgO5l+w5zgX5OMH5yQ1','WOW2W7VcGG','dKLCWRZdL0TvjWm','WO44W7e','DCkEWQZdJCo+mCkq','W5tcRmo2WOBdGa','qhLXWQ9GftWUCG','DSk3p8kYxW','W5PKWQBcUCkr','oYxcICoWjf/cUHdcTSkX','cg8FdaS','W4TwkZHHFa','WO7cICkdmCkY','5BUb6l+Z5OU45AsR','WRxdPh1BBG','gSokm8kZWPC','D8kghSktsa','cZxcTwtcMvW','W6LBiZD7','dZxcMmoRhfFcOWW','jEw7SoMqToMsGUAnIU+9RsTyyYhcVSoPsZJcImkaW6XOWOlcVHO7W5dcStZcGCkXDWtdO8kxd8kdW6D3Amo5hG','WOZcQmkLpKBdU8kn','uCoyimk4WQ/dMCkW','rqpcKrVcLqqVC3S+WRNcPWfLWOlcT8onD8oyWRPskmkuWRbWW47MM7pLKB7PGkhNNBdVV7OvWPxdT2aoW7TcBCkEdo+9Oo++LUM5K+IUMos4SoMbNEECGW','WQNdPvK','eCohWRFdPNtcPxFcQsi','jJ/cPSo1qG','uCkgW7BcVsNdSIZcRd3dRSo9z8kO','dSoCWQi','q8kOhCkjvq','WOKozCkxWRPWC8kMW77cMg/dL1a','t8kjWOxdImki','eweKnCoHgcHQFa','sIuDW7DeWPbMW5XQkdyO','WPRcK8kNivK','bfLMWPic','W7HDdCowW6O','fxWtkcO','xGWjW6O','lmkTW73cSfWCW7pcNCkt','sf5EWQnV','WOq+W7RcKXZdNq','qqJcUq','5A+w5OMw5lIg5yI4cq','sMm1WPzlDs81pwpcNSkQhmkutSkCWQ3cRSoLWQ7cS0BcNGVcTmkSW5jWomkABu1qfmkPaSkTWQGQWRP4EWdcUmkqlSkR','W7r4i8owW7W','z8kSW53dRadcGJe','WOqBW6ldRSo4EmkwpSojW7iJwmoM','WPOAnSoTA8kwWPzc','W4HFoCobW64YdCkZ','zmkahSkir8oDutRdP2NdLW','5yQv5ysm5BUN6zgJ5l+n5zcr5OU05yUl','hMDo','W7q5uL/dVc4','bZbpWPDq','WPNKUkZKUR/KUyfX','WRpdPMTJWRO','W5vAlJrb','W58aWQ7cMCki','5REe5yMR5Bs+5lUana','ACkmdq','WRFcTM4rpa','gH9OWPLW','lxabeI3cImooWR0','WOS5W7xcIWZdI8kYWQu','zmoDWP7dU8kCrbS','tmkKWPqyCq','DSkeWR8','WO0IW6lcOrxdJSkW','qCkpW5NdIWO','WO3cTSkIc3RdQG'],...(function(){return['WPFcJhBdTrO','WRxdUfDjsJVcICkFW4a','DSklbCkrF8ovscy','WOtcK8ke','WQhLRRdNIkNcVq','amoMk8kUWQ8','W5RcPmkdhCk+WO/cKmkaWRRdJ8kqW4mvfbBdIYG','W5BdOMlcUYC','yXdcQW','pmoHW499bmoHWObhmYK','W5rEa8okW6aLkG','dmoVxdWN','W4JORj7MSPhLPQJOTyZcSUkEISo75Pw75zg+5BIv5PAu5O6Z','5A6+5OIU5lMO5yInW5G','WOXllSkeWPbSW73dJG','hCoFysyN','n2ebecC','WQBcV2JdNY52jG','WOxcJmkGW6OiW7vZ','W6O3wW','8y65O8oG','WQFdJcpdV2dcSepdLHXDsXWu','DCkpW6hdOmk4FrHhnq','W5pdSvxcVc0','4P25sEADMUIbPoAUToEGP+wNOoErKSk5','ot7cKSo5','WOWJomoorq','xCkPWPddG8kOfSomW40','WPNcJmk7W68N','fs/cVa','WPhcImkbfG','5Rsw5yMG5Bsq5lI+W60','B8kcW6pdK8kh','BNO8WPq','tmkRWPBdMCk7kSokW5H3W5e','WRBdJIBdQudcUKFdNaz+tWaf','4P6zW7tOHjVMNOpOVQZOOy/PGi/LIRhKUPRPLBNORzyC','DCkpW6hdPSk5wG','mmoIrZDXpuHy','W6BcR8k6W6aUW4JcLmkkW50','BW4uW7RcPW','WOhdOxjXWRW2','WQtdQuPAwr7cLmkvW73dGa','WQHQCSoesG','WONcISkNW7aFW7TIWQldKSox','CSkca8kv','W5xcSCkzgCo8W47cMCka','5O+G56sX57Ul5P6kogrOydSVWP7cPW/cKa','q2n3WQvmpq','zmkYWPyuumkXW5G','W5/cOSoxWPBdRW','WO/cJmkNW5ugW6zIWR7dQCok','WRNcU2y','fx1r','da1CW7xdKx0ZaLPzaq','WRRcRmkUW6OZW73cK8oiW41GFvlcLXazgKVdOCoLwhdcVmkIwq','cCoDmSkWWRpdLSktWOW','rdfKdq','DgNcL8o9evNcOqlcLSkW','WRpcVxK','W5rgnG5UF8k2','v29gWOu','kdpcK8oCpfi','WQ7cPmklhxy','qhhdRXtdGGRdJtxcPXjSvG','qCkCW6FdUbm','zUE5LoADTU+9N+s4N+ATRUAxQoEcHEACNowqNLG','W5tcRCkVa8oMW4RcHSk2WRtdJmkb','tqBcVrNcUGuV','rGeFW6NcMsJcIte','WPhcJK4/cNfrWQ5ha8ol','W5/NUiFMNz7MLzNPLOJVVjK','xaZcPWZcVqiT','W5zFnSobW64YnW','4PIDW77ORj3LOiBLHiVMOPpLV7VMROBNORlNMkFLJkNPHBG','W5bhWQpcRCkGj8oh','WQFdU1HlxG','WP7dPNO','W4DgW7ZdUCkk','WQ3cJSkvphO','W44PAghdVG','BrpcPsBcOa','vSkbW4NdLqm','ySkjW6hdPCkyrJzpjcGTW7/dNW','W45claK','W4NcOCo0WRRdGq','s3JdRHBdGadcHxlcLJrzwmkhWP4','4PU/W7NORBJLHPhLRQJKUllLVz/OPBRNMA7NJP3LOz/LJjRPHjJLKRVLHQVOV6ZOORFOH7/MNjm','W4xcR8k7j8oW','nEwMJ+I1O8oJW6u','tYvKkSozmZO','5BIf6zgi5zci56sg772/iq','v8kDWQ3dUCk+','W7NcJSknimoq','yUwUKoEjGSk9','qGlcVq/cJHaM','h3To','4P28k+ACSUIaQoATPUEGT+wLKEErMYy','WQJcQCkTaG','mYqbW4Pcmmk35B2L5Awv44oB5lMk5lQ96lAz5y+H','5y+Q6yEX6k2N5PQIWR7cNLdcLrpcLmoCW4Suta','AxHiWQGo','mmoUWQyVFmk+W68/','W5ysWPlcMCk6dhG2W5XdWO4','td93','W63cT8oXWQFdTgNdJW','W5fnWRC','C8k8W4RdGWRcHtyZW6OH','W71yW7FdTSknWRddIwJcPq','bbbLWOG','kx9EWQKC','5Q+t5OI05Awl5PY75l+VFUwmOEAiHa','6i6f5y+OWRpdUmoSW4GiW4yo5AAy6lEe77+3','WOBdOgLTWPa','55sf5A2e5lMK','aW7cO8kFWRdcM13dOgpdRCkWWPvG','W47cTSkfhCoCW47cMCka','itJcMa','WPJcImkNW7ehW7n7WR4','hdJcSLu','W41kmrfQ','W5DckbG','WOJcJ1OFdea','WP7cM8kyW70+','wWBcVrFcSbWMvq','WQJdSMDerG','W6jdW6i','44gk5O6w56Eh44ki6k6L5yw+6i255y6/WRZcUNZcOaP0','wqyx','eUE7REAFJo++Oos6IoAUGUAwHoEaKEADI+wsJSkF','WPxdRgLnWPOMW67dNa9I','DCkuW7tdOSkExb8','amosWRBdQK/cShi','vwv8WOfSnda','kmk4W6BcRq','W5JcSmkooCo7W4lcKq','sNPzWOKgFCo0a8oN'];}())];}())];}());Iii11l=function(){return lilIIi;};return Iii11l();};let illlII='',iIII11='';const IiI1i=Object[ililIl(0x2b3,'a$Ue')](liiIIl)['map'](I1lIl1=>liiIIl[I1lIl1])[ililIl(0x2b6,'jwZu')](lil11i=>lil11i);!IiI1i[0x0]&&($['msg']($[ililIl(0x336,'oSH6')],ililIl(0x353,'kd#c')),process[ililIl(0x34b,'3ebv')](0x1));!(async()=>{const liiI1l=ililIl,IlIIl={'FXukM':liiI1l(0x2c0,'a$Ue'),'tHORe':liiI1l(0x32b,'v78r'),'UVgDo':'CSIWX','ZKSNe':liiI1l(0x261,'D44L'),'DPgMB':function(i1i1Ii,lllii){return i1i1Ii===lllii;},'NfVtS':liiI1l(0x324,'(LKx'),'sTUSn':function(iI11Ii,iIII1l){return iI11Ii+iIII1l;},'sNsWR':'活动入口：','AFnHp':function(lllil,iI11Il){return lllil<iI11Il;},'qehvN':function(iIII1i,iil1i1){return iIII1i+iil1i1;},'MxfXH':function(il1i11,IlIll1){return il1i11(IlIll1);},'gFvgP':liiI1l(0x385,'YHnv'),'KtjdM':'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx','aMFZr':function(IlIII,ilil1l){return IlIII+ilil1l;},'avRoG':function(illlIi,I1lIii){return illlIi*I1lIii;},'xqQJb':function(IiI1I){return IiI1I();},'Wyqmg':liiI1l(0x201,'YHnv')};if(!lI1li1){console['log'](IlIIl['tHORe']);return;}const lI1liI=iil1iI[liiI1l(0x2ef,'CG[u')](lI1li1);if(!lI1liI){if(IlIIl[liiI1l(0x2d2,'dzS9')]===IlIIl['UVgDo']){console[liiI1l(0x26e,'bJsB')](IlIIl['ZKSNe']);return;}else IlI1il[liiI1l(0x200,'Sa$f')]=!![],IilliI[liiI1l(0x2e7,'(LKx')](IlIIl['FXukM']);}$['activityUrl']=lI1li1,$['activityId']=iil1iI[liiI1l(0x233,'1YBI')](lI1li1,liiI1l(0x300,'I2&1')),$['hostname']=lI1liI[liiI1l(0x1eb,'O7NY')],$[liiI1l(0x28b,'1YBI')]=lI1liI[liiI1l(0x34a,'I2&1')],$[liiI1l(0x243,'t&#%')]=liiI1l(0x2cc,'xf^D')+$[liiI1l(0x23b,'G6kK')];if(!$['activityId']||!$[liiI1l(0x37f,'5#9G')]){if(IlIIl[liiI1l(0x331,'1YBI')](IlIIl['NfVtS'],liiI1l(0x239,']F8n')))II11II[liiI1l(0x2a9,'5#9G')]('❓'+Ii1iI1+'\x20'+lilIli[liiI1l(0x2a6,'5#9G')](Iliili));else{console[liiI1l(0x2a5,'0*dI')](liiI1l(0x1ec,'oSH6'));return;}}IlIllI[liiI1l(0x254,'TzdT')]({'title':$[liiI1l(0x1fd,'qUv*')]}),console[liiI1l(0x273,'2z(e')](IlIIl[liiI1l(0x294,'m(Ld')](IlIIl[liiI1l(0x1fa,'5#9G')],$[liiI1l(0x2bf,'m(Ld')]));for(let IIIIIi=0x0;IlIIl[liiI1l(0x266,'O7NY')](IIIIIi,IiI1i[liiI1l(0x283,'3ebv')]);IIIIIi++){$[liiI1l(0x245,'1YBI')]=IlIIl[liiI1l(0x2f0,'I2&1')](IIIIIi,0x1),illlII=IiI1i[IIIIIi],iIII11=IiI1i[IIIIIi],iil1iI[liiI1l(0x24f,'oSH6')](iIII11),$['UserName']=IlIIl[liiI1l(0x2cf,'D44L')](decodeURIComponent,iil1iI[liiI1l(0x267,'6POk')](illlII,IlIIl[liiI1l(0x295,'PD$g')])),$['UA']=iil1iI[liiI1l(0x209,'t&#%')]($['UserName']),$['UUID']=iil1iI['genUuid'](IlIIl['KtjdM']),$['te']=IlIIl[liiI1l(0x224,'^H@Q')](Math[liiI1l(0x238,'X8TX')](IlIIl['avRoG'](Math[liiI1l(0x2c2,'(LKx')](),0x2328)),0x3e8),$[liiI1l(0x2e6,'I2&1')]=IlIllI['create']($['index'],$['UserName']),$['nickName']='',console['log'](liiI1l(0x337,'d!&F')+$[liiI1l(0x375,'lC3G')]+'】'+($['nickName']||$[liiI1l(0x2a0,'kd#c')])+'******\x0a'),await IlIIl[liiI1l(0x32c,'1YBI')](llll1),iil1iI[liiI1l(0x31a,']F8n')]();if($[liiI1l(0x291,'$ETg')]||$[liiI1l(0x2d3,'X8TX')])break;}iIII1I&&IlIllI['getMessage']()&&(IlIIl[liiI1l(0x2db,'rF^h')](IlIIl[liiI1l(0x329,'lC3G')],IlIIl[liiI1l(0x2df,'dnHw')])?(IlIllI['updateContent'](IlIIl[liiI1l(0x21a,'$ETg')](IlIllI['content'],'\x0a【活动地址】'+$[liiI1l(0x33b,'YHnv')])),await IlIllI[liiI1l(0x2f2,'2z(e')]()):i1l1lI+='\x0a\x20\x20再来一次');})()[ililIl(0x370,'d!&F')](I1lIil=>$[ililIl(0x34e,']F8n')](I1lIil))['finally'](()=>$['done']());async function llll1(){const i1l1II=ililIl,IIIl1i={'zPUKL':i1l1II(0x268,'!Er7'),'NlcVG':i1l1II(0x20f,'!JFX'),'NINEC':function(liiII1,IIIl1l,lllll){return liiII1(IIIl1l,lllll);},'sJaIr':function(i11ili,iil1l1){return i11ili!==iil1l1;},'hqHiD':i1l1II(0x2ac,'CG[u'),'PfbIn':i1l1II(0x20d,'6POk'),'mxYwi':i1l1II(0x344,'CM9l'),'RMYrn':i1l1II(0x364,'2Mzb'),'hLbWb':function(lllli,iiili1){return lllli(iiili1);},'ACPJH':'getLottery','GzuTy':'yyyy-MM-dd\x20HH:mm','khYiA':function(ill11i,lllill){return ill11i+lllill;},'iycAK':function(ill11l,I1lIiI){return ill11l>I1lIiI;},'Ijyfi':function(lllili,IliiiI){return lllili===IliiiI;},'PxfJt':i1l1II(0x258,'$ETg'),'QgGSb':function(Ill11,liiIII){return Ill11(liiIII);},'sUxzQ':i1l1II(0x374,'DyS#'),'HMDTw':i1l1II(0x264,'VVNN'),'MkjnU':i1l1II(0x28f,'nq^L'),'SVSKB':function(li1i11,iI11I1){return li1i11(iI11I1);},'wZzJX':i1l1II(0x248,'VVNN'),'eYKVJ':'draw','QtAmV':i1l1II(0x27e,'$ETg'),'JtsQf':'kXCNR'};try{$['skipRun']=![],$[i1l1II(0x33d,'lC3G')]=!![],$[i1l1II(0x29d,'m(Ld')]=![],activityCookie='';if($[i1l1II(0x240,'SAo$')]||$[i1l1II(0x32e,'t&#%')])return;$[i1l1II(0x37b,'kd#c')]=await IIIl1i[i1l1II(0x378,'1YBI')](il1i1I,iIII11,$[i1l1II(0x318,'!Er7')]);if(!$[i1l1II(0x2de,'bJsB')]){if(IIIl1i[i1l1II(0x373,'(LKx')](IIIl1i[i1l1II(0x2c7,'YHnv')],IIIl1i['PfbIn'])){console['log'](IIIl1i[i1l1II(0x351,'0*dI')]),$[i1l1II(0x263,'D44L')][i1l1II(0x309,'uxF!')](IIIl1i[i1l1II(0x323,'X8TX')]);return;}else delete ll1i1[i1l1II(0x380,'qUv*')],delete IIli1i[i1l1II(0x27c,'kd#c')][IIIl1i[i1l1II(0x253,'t&#%')]];}await IIIl1i['hLbWb'](i1i1Il,IIIl1i[i1l1II(0x2eb,'rF^h')]);if($[i1l1II(0x29e,'3ebv')]||$[i1l1II(0x2d1,'jwZu')]||$[i1l1II(0x31c,'!Er7')])return;await $[i1l1II(0x36c,'3ebv')](0x3e8);if($[i1l1II(0x2cb,'5i3@')]===0x1){$[i1l1II(0x236,'D44L')]=$[i1l1II(0x381,'(LKx')]?.['activity']?.[i1l1II(0x2d6,'m(Ld')],$[i1l1II(0x244,'uxF!')]=$[i1l1II(0x1fc,'G6kK')]?.['activity']?.[i1l1II(0x345,'qUv*')],$[i1l1II(0x2e2,'O7NY')]=$['getLottery']?.[i1l1II(0x30c,'2Mzb')]?.['customerId'],$[i1l1II(0x2fd,'qUv*')]=$[i1l1II(0x307,'I2&1')]?.['activity']?.[i1l1II(0x228,'a$Ue')],$['startTime']=$[i1l1II(0x222,'nq^L')]?.[i1l1II(0x2bd,'VVNN')]?.[i1l1II(0x2fb,'jL2@')],$[i1l1II(0x305,'D44L')]=$[i1l1II(0x33f,'dzS9')]?.[i1l1II(0x1ef,'PD$g')]?.['endTime'],$[i1l1II(0x293,'DyS#')]=$[i1l1II(0x356,'qUv*')]?.[i1l1II(0x2d5,'0*dI')];const iil1ii=$[i1l1II(0x2ed,'Sa$f')]('yyyy-MM-dd\x20HH:mm',$[i1l1II(0x24c,'2z(e')]),IlIlli=$[i1l1II(0x372,'G6kK')](IIIl1i[i1l1II(0x27b,'DyS#')],$[i1l1II(0x35b,'1YBI')]);let il1i1i='';for(let i11ilI=0x0;i11ilI<$['prizeList'][i1l1II(0x367,'xf^D')];i11ilI++){const ii1ii1=$[i1l1II(0x226,'$ETg')][i11ilI],llllI=ii1ii1[i1l1II(0x28e,'jwZu')],lllil1=ii1ii1['source'];lllil1==='0'?il1i1i+='\x0a\x20\x20再来一次':il1i1i+='\x0a\x20\x20'+llllI+IlIIi[lllil1];}console[i1l1II(0x289,'dzS9')](($[i1l1II(0x319,'a$Ue')]&&i1l1II(0x32f,'rF^h')+$['shopName']+'['+($[i1l1II(0x34c,'r5Wb')]||i1l1II(0x29a,'r5Wb'))+']')+i1l1II(0x2a1,'!Er7')+$[i1l1II(0x2be,'bJsB')]+'\x0a开始时间：'+iil1ii+i1l1II(0x31b,'!sBR')+IlIlli+i1l1II(0x21f,'a$Ue')+il1i1i+'\x0a'),IlIllI[i1l1II(0x2f7,'XDhK')](IIIl1i[i1l1II(0x2a7,'Sa$f')](IlIllI['content'],($[i1l1II(0x348,'1YBI')]&&'\x0a【店铺名称】#'+$[i1l1II(0x206,'uxF!')])+'\x0a开始时间：'+iil1ii+i1l1II(0x362,'(LKx')+IlIlli+i1l1II(0x1fb,'r5Wb')+il1i1i+'\x0a'));const lil111=Date[i1l1II(0x2b7,'!Er7')]();if($[i1l1II(0x2ea,'mvtj')]&&lil111<$[i1l1II(0x230,'PD$g')]){console[i1l1II(0x26b,'d!&F')](i1l1II(0x22c,'TzdT')+iil1ii+i1l1II(0x377,'jwZu')),$[i1l1II(0x333,'!Er7')][i1l1II(0x20e,'d!&F')]('活动尚未开始，开始时间：'+iil1ii),$['runEnd']=!![];return;}if($[i1l1II(0x359,'DyS#')]&&IIIl1i[i1l1II(0x2f4,'mvtj')](lil111,$['endTime'])){if(IIIl1i[i1l1II(0x322,'!JFX')](IIIl1i[i1l1II(0x2b2,'xf^D')],IIIl1i[i1l1II(0x29f,'r5Wb')])){console[i1l1II(0x273,'2z(e')](i1l1II(0x2f3,'CG[u')+IlIlli+i1l1II(0x316,'SAo$')),$[i1l1II(0x288,'dnHw')]['fix'](i1l1II(0x361,'YHnv')+IlIlli),$['runEnd']=!![];return;}else{ll1iI['skipRun']=!![],iI1lll['log'](IIIl1i[i1l1II(0x37a,'DyS#')]),l1lIll['message'][i1l1II(0x286,'DyS#')]('加入店铺会员失败，活动仅限店铺会员参与');return;}}if($[i1l1II(0x210,'(LKx')]||$[i1l1II(0x32e,'t&#%')]||$[i1l1II(0x2a2,'X8TX')])return;}await $[i1l1II(0x341,'5i3@')](0x3e8);let il1i1l=$['getLottery']?.[i1l1II(0x246,'0*dI')]||0x0,IlIlll=Math[i1l1II(0x20a,'jL2@')](ilil1i,il1i1l);;console[i1l1II(0x25b,'DyS#')]('有'+il1i1l+i1l1II(0x343,'qUv*')+IlIlll+'次');while(IIIl1i['iycAK'](IlIlll--,0x0)&&$[i1l1II(0x357,'mvtj')]&&!$[i1l1II(0x2a2,'X8TX')]){await IIIl1i[i1l1II(0x242,'D44L')](i1i1Il,i1l1II(0x280,'!JFX')),await $[i1l1II(0x37d,'bJsB')](0xbb8);if($[i1l1II(0x28a,'$ETg')]){if(IIIl1i[i1l1II(0x26d,'0*dI')](IIIl1i['sUxzQ'],IIIl1i[i1l1II(0x21d,'3ebv')]))IIliI[i1l1II(0x2e4,'xf^D')]=!![];else{const i11il1=IIIl1i[i1l1II(0x297,'xf^D')]['split']('|');let ii1iiI=0x0;while(!![]){switch(i11il1[ii1iiI++]){case'0':await IIIl1i[i1l1II(0x2ca,']F8n')](i1i1Il,IIIl1i[i1l1II(0x2ee,'VVNN')]);continue;case'1':$[i1l1II(0x279,'I2&1')]=![];continue;case'2':await IIIl1i[i1l1II(0x313,'X8TX')](i1i1Il,IIIl1i[i1l1II(0x366,'0*dI')]);continue;case'3':await $[i1l1II(0x301,'m(Ld')](0x3e8);continue;case'4':await $[i1l1II(0x328,'r5Wb')](0xbb8);continue;}break;}}}}}catch(lllilI){IIIl1i['Ijyfi'](IIIl1i[i1l1II(0x21e,'m(Ld')],IIIl1i[i1l1II(0x292,'lC3G')])?(ll1li[i1l1II(0x285,'!sBR')]=!![],Illl1I[i1l1II(0x31f,'PD$g')]&&ll1ll['message'][i1l1II(0x24e,'0*dI')](Illl11)):console[i1l1II(0x2c9,'m(Ld')](i1l1II(0x2f8,'!sBR')+lllilI);}}async function lil11l(illlI1,IIIl11){const i1ill=ililIl,I1lIi1={'kBmkp':i1ill(0x262,'5#9G'),'tACkX':'getLottery','yglXn':function(liiIIi,lil11I){return liiIIi==lil11I;},'nxMCc':function(Iliii1,iIiIi){return Iliii1==iIiIi;},'qcSZc':function(iil1ll,iiilil){return iil1ll===iiilil;},'nupzP':'YUHbA','OQUDd':'KjMRG','YufFg':i1ill(0x231,'!sBR'),'ABrpx':function(iil1li,lillIl){return iil1li==lillIl;},'sHYzR':i1ill(0x2d4,'!sBR'),'wHyeH':i1ill(0x2e9,'XDhK'),'mifwK':function(iIiIl,iiilii){return iIiIl==iiilii;},'hGycG':i1ill(0x383,'dnHw'),'KdSMp':i1ill(0x220,'(LKx'),'gnQBA':function(li1i1i,IlIli1){return li1i1i!==IlIli1;},'PvcHf':i1ill(0x213,'3ebv'),'HMarZ':i1ill(0x330,'CG[u'),'rtujR':i1ill(0x368,'t&#%'),'fRUvx':i1ill(0x2c6,'r5Wb'),'UYvCe':function(illIiI,lI1lli){return illIiI+lI1lli;},'FgZsa':function(Ill1l,llI1Il){return Ill1l==llI1Il;},'UEYwv':function(ii1iii,i11iil){return ii1iii==i11iil;},'etUct':function(Ill1i,ii1iil){return Ill1i===ii1iil;},'otqOi':i1ill(0x276,'YHnv'),'eyLlR':i1ill(0x325,'G6kK'),'xUFvj':i1ill(0x270,'XDhK'),'YEKsf':i1ill(0x216,'!Er7'),'Zkwkm':i1ill(0x20c,'Sa$f'),'Ourfp':'活动仅限店铺会员参与','FILwg':function(lllI1l,i11iii){return lllI1l==i11iii;},'xrlXY':function(llI1Ii,lllI1i){return llI1Ii!==lllI1i;},'rGjjA':i1ill(0x287,'Sa$f'),'hXmwj':i1ill(0x1f6,'3ebv'),'JBtsw':function(li1i1l,II1i1){return li1i1l===II1i1;},'lvQtz':'RCwIi','ePkoM':i1ill(0x1f1,'lC3G'),'glZTd':function(lI1lll,iIiII){return lI1lll===iIiII;},'pnChA':i1ill(0x217,'lC3G'),'tCZej':i1ill(0x22e,'XDhK')};try{switch(illlI1){case I1lIi1[i1ill(0x2c3,'5i3@')]:if(IIIl11&&I1lIi1[i1ill(0x250,'oSH6')](IIIl11['status'],0x1))$['getLottery']=IIIl11;else I1lIi1['nxMCc'](IIIl11['status'],-0x64)?I1lIi1[i1ill(0x36b,'G6kK')](I1lIi1['nupzP'],I1lIi1[i1ill(0x22f,'CM9l')])?Iliiil['log'](li1Il['msg']):console[i1ill(0x33e,'PD$g')](IIIl11['msg']):console[i1ill(0x354,'a$Ue')]('❓'+illlI1+'\x20'+JSON['stringify'](IIIl11));break;case I1lIi1['YufFg']:if(IIIl11&&I1lIi1[i1ill(0x229,'5i3@')](IIIl11['status'],0x1)){}else i1ill(0x326,'dzS9')===I1lIi1['sHYzR']?console[i1ill(0x33e,'PD$g')]('❓'+illlI1+'\x20'+JSON[i1ill(0x219,'3ebv')](IIIl11)):I11iII[i1ill(0x310,'r5Wb')][i1ill(0x30f,'!sBR')](I1ilIi);break;case I1lIi1['wHyeH']:if(IIIl11&&I1lIi1[i1ill(0x1f3,'d!&F')](IIIl11[i1ill(0x1f0,'CM9l')],0x1)){if(i1ill(0x1f7,'dzS9')!==I1lIi1['hGycG']){IiilI1[i1ill(0x272,'!Er7')](i1ill(0x277,'d!&F'));return;}else $[i1ill(0x327,'mvtj')]=IIIl11;}else console['log']('❓'+illlI1+'\x20'+JSON['stringify'](IIIl11));break;case I1lIi1[i1ill(0x371,']F8n')]:IIIl11&&I1lIi1['yglXn'](IIIl11['status'],0x1)?I1lIi1['gnQBA'](I1lIi1[i1ill(0x339,'d!&F')],I1lIi1[i1ill(0x1f2,'6POk')])?console[i1ill(0x321,'qUv*')](i1ill(0x2e1,'CM9l')+$['task_key']+']成功'):ill111[i1ill(0x251,'mvtj')](i1ill(0x20b,'SAo$')+Iliil1):($['addDrawTimes']=IIIl11,console[i1ill(0x308,'!sBR')]('完成任务['+$[i1ill(0x350,'!Er7')]+']失败:\x20'+JSON[i1ill(0x35c,'d!&F')](IIIl11)),console[i1ill(0x334,'uxF!')]('❓'+illlI1+'\x20'+JSON[i1ill(0x2b4,'v78r')](IIIl11)));break;case'draw':if(IIIl11&&I1lIi1[i1ill(0x36a,'DyS#')](IIIl11[i1ill(0x2f9,'mvtj')],0x1))IIIl11[i1ill(0x265,'5i3@')]==-0x1?$[i1ill(0x290,'jwZu')](I1lIi1[i1ill(0x29c,'2Mzb')]):I1lIi1[i1ill(0x223,'D44L')]('ZsEAc',I1lIi1[i1ill(0x24d,'(LKx')])?lI1Ill['log'](i1ill(0x369,'VVNN')+lI1Ili['task_key']+i1ill(0x278,'rF^h')):console[i1ill(0x321,'qUv*')](I1lIi1[i1ill(0x1f5,'a$Ue')](i1ill(0x363,'jL2@'),IIIl11['data'][i1ill(0x24a,'YHnv')]));else{if(IIIl11&&I1lIi1[i1ill(0x2b1,'bJsB')](IIIl11[i1ill(0x205,'XDhK')],-0xe)||IIIl11&&I1lIi1[i1ill(0x315,'dzS9')](IIIl11[i1ill(0x25f,'kd#c')],-0x7)){if(iI11II){const lI1llI=await iil1iI['joinShopMember']($[i1ill(0x257,'nq^L')]);if(lI1llI)I1lIi1[i1ill(0x232,'^H@Q')](I1lIi1[i1ill(0x299,'2z(e')],I1lIi1[i1ill(0x1f8,'I2&1')])?(lilIl1[i1ill(0x2c1,'uxF!')](i1l1ii[i1ill(0x311,'d!&F')],I1lIi1[i1ill(0x204,'2z(e')]),i1l1['exit'](0x1)):($['retry']=!![],console['log'](i1ill(0x28d,'mvtj')));else{$[i1ill(0x23f,'5i3@')]=!![],console[i1ill(0x26a,'VVNN')](I1lIi1[i1ill(0x2b5,'DyS#')]),$[i1ill(0x1f4,'XDhK')][i1ill(0x1ed,'$ETg')](I1lIi1['YEKsf']);return;}}else{$[i1ill(0x2e5,'!sBR')]=!![],console[i1ill(0x36e,'XDhK')](I1lIi1[i1ill(0x342,'uxF!')]),$[i1ill(0x31f,'PD$g')]['fix'](I1lIi1[i1ill(0x203,'D44L')]);return;}}else{if(IIIl11&&I1lIi1[i1ill(0x2e3,'dnHw')](IIIl11[i1ill(0x218,'v78r')],-0x3))$['retry']=!![];else{if(I1lIi1[i1ill(0x214,'nq^L')]('RCpOX',I1lIi1['rGjjA'])){IlI1I[i1ill(0x35d,'oSH6')](i1ill(0x31e,'1YBI'));return;}else{console['log'](IIIl11[i1ill(0x259,'5#9G')]),err=IIIl11[i1ill(0x235,'rF^h')];for(let i11iiI of['不足','火爆','上限',i1ill(0x346,'CG[u'),'擦肩',I1lIi1[i1ill(0x2d9,'2Mzb')],'达到','已完成']){if(err[i1ill(0x2cd,'jwZu')](i11iiI)){if(I1lIi1[i1ill(0x2ba,'bJsB')](i1ill(0x34f,'I2&1'),I1lIi1[i1ill(0x274,'dzS9')])){lilIii[i1ill(0x33c,'t&#%')](i1ill(0x2c8,'X8TX')+i1ill1+i1ill(0x355,'CM9l')),iIIl1l[i1ill(0x31f,'PD$g')]['fix'](i1ill(0x1f9,'bJsB')+llIli1),iliIII[i1ill(0x27f,']F8n')]=!![];return;}else{$[i1ill(0x269,'Sa$f')]=![];break;}}}for(let lllI1I of['结束',I1lIi1[i1ill(0x2af,'X8TX')]]){if(I1lIi1['glZTd'](i1ill(0x320,'0*dI'),i1ill(0x26c,'v78r'))){if(err[i1ill(0x28c,'$ETg')](lllI1I)){if(I1lIi1[i1ill(0x25d,'X8TX')](I1lIi1[i1ill(0x29b,'0*dI')],I1lIi1['tCZej']))II1li1[i1ill(0x252,'d!&F')]=l1lIlI,IiiIl1['log'](i1ill(0x2b8,'kd#c')+lIIil1['task_key']+i1ill(0x32d,'2Mzb')+IIli1[i1ill(0x376,'CM9l')](II1liI)),IlI1i1['log']('❓'+l1lIl1+'\x20'+IiiIlI[i1ill(0x340,'!JFX')](Iilli1));else{$[i1ill(0x298,'r5Wb')]=!![];break;}}}else lI1Iil+=i1ill(0x282,'YHnv')+lilIiI+i1l1I[IiilIi];}}}}}break;}}catch(i1l1i1){console[i1ill(0x2dc,'G6kK')](i1ill(0x2ec,'a$Ue')+illlI1+'\x20请求响应\x20'+(i1l1i1[i1ill(0x1ee,'^H@Q')]||i1l1i1));}}async function i1i1Il(liil11){const I1l11l=ililIl,iiillI={'buQJI':I1l11l(0x2f5,'nq^L'),'mwSSv':'getLottery','wMOPs':'drawToGetWare','DuCAj':I1l11l(0x280,'!JFX'),'qqMaR':I1l11l(0x284,'a$Ue'),'acofU':I1l11l(0x221,'t&#%'),'oPqcN':I1l11l(0x27a,'$ETg'),'wbTZF':I1l11l(0x2da,'1YBI'),'bMHiu':I1l11l(0x27d,'O7NY'),'AzRAI':'application/x-www-form-urlencoded;\x20charset=UTF-8','uLNwA':I1l11l(0x23d,'XDhK'),'nnpDw':I1l11l(0x2ff,'TzdT'),'lhSKZ':I1l11l(0x23a,'O7NY'),'AovbO':function(I1lIli,II1ii){return I1lIli===II1ii;},'Zgdcp':I1l11l(0x2aa,'m(Ld'),'qXpXf':function(IIIIII,lillII,ii1ilI){return IIIIII(lillII,ii1ilI);}};if($[I1l11l(0x312,'kd#c')]||$[I1l11l(0x215,'qUv*')])return;let l1l111=$[I1l11l(0x26f,'a$Ue')],l1iIII={},llI1I1=iiillI[I1l11l(0x24b,'O7NY')];switch(liil11){case iiillI[I1l11l(0x1fe,'lC3G')]:l1l111+=I1l11l(0x30b,'jL2@')+$[I1l11l(0x2fe,'0*dI')],l1iIII={'activityId':$[I1l11l(0x22d,'dzS9')],'token':$[I1l11l(0x2ce,'6POk')],'source':'01'};break;case iiillI[I1l11l(0x2b0,'uxF!')]:l1l111+=I1l11l(0x21c,'^H@Q')+$['activityId'],l1iIII={'activityId':$[I1l11l(0x296,'kd#c')],'token':$['jdToken'],'source':'01'};break;case iiillI['DuCAj']:l1l111+=I1l11l(0x225,'mvtj')+$[I1l11l(0x207,'VVNN')],l1iIII={'activityId':$[I1l11l(0x211,'rF^h')],'token':$[I1l11l(0x21b,'SAo$')],'source':'01'};break;case iiillI[I1l11l(0x22a,'t&#%')]:l1l111+='/wuxian/user/addDrawTimes/'+$[I1l11l(0x2f6,'CG[u')]+'/'+$['task_type'],l1iIII={'activityId':$['activityId'],'type':0x1,'token':$['jdToken'],'source':'01'};break;case iiillI['acofU']:l1l111+='/wuxian/user/flowShop/'+$[I1l11l(0x304,'DyS#')]+'/'+$[I1l11l(0x237,'mvtj')],l1iIII={'shopId':$['shopId'],'venderId':$[I1l11l(0x2fa,'SAo$')],'token':$[I1l11l(0x249,'2z(e')],'source':'01'};break;default:console[I1l11l(0x349,'Sa$f')]('❌\x20未知请求\x20'+liil11);return;}const IlIlil={'url':l1l111,'method':llI1I1,'headers':{'Accept':iiillI[I1l11l(0x255,'r5Wb')],'Accept-Encoding':iiillI[I1l11l(0x35f,'uxF!')],'Accept-Language':I1l11l(0x2b9,'DyS#'),'Connection':iiillI[I1l11l(0x23c,'CG[u')],'Content-Type':iiillI[I1l11l(0x306,'lC3G')],'Cookie':illlII,'Host':$[I1l11l(0x302,'1YBI')],'Origin':$[I1l11l(0x358,'5#9G')],'Referer':$[I1l11l(0x25e,'D44L')],'User-Agent':$['UA']},'body':JSON[I1l11l(0x365,'2Mzb')](l1iIII),'timeout':0x7530};llI1I1===iiillI['uLNwA']&&(iiillI['nnpDw']!==iiillI[I1l11l(0x36d,'O7NY')]?(delete IlIlil[I1l11l(0x380,'qUv*')],delete IlIlil[I1l11l(0x31d,'bJsB')][I1l11l(0x234,'dzS9')]):l1lIli[I1l11l(0x227,'CG[u')](I1l11l(0x335,'DyS#')+lIIiiI+I1l11l(0x387,'a$Ue')+(II1lil['message']||IIli1l)));const lIli1I=0x5;let II1il=0x0,lllI11=null,I1lIll=![];while(II1il<lIli1I){II1il>0x0&&(iiillI[I1l11l(0x2c5,'qUv*')](iiillI[I1l11l(0x281,'d!&F')],iiillI[I1l11l(0x2fc,'a$Ue')])?await $[I1l11l(0x35a,'v78r')](0x3e8):I1lll1[I1l11l(0x321,'qUv*')]('❓'+i1IIi+'\x20'+IIII1I['stringify'](Iii111)));const iIiI1=await iil1iI['request'](IlIlil);if(!iIiI1[I1l11l(0x2bb,'dzS9')]){lllI11=I1l11l(0x2e8,'oSH6')+liil11+I1l11l(0x25a,'0*dI')+iIiI1['error'],II1il++;continue;}if(!iIiI1?.[I1l11l(0x360,'2Mzb')]){lllI11='🚫\x20'+liil11+I1l11l(0x2e0,'I2&1'),II1il++;continue;}iiillI['qXpXf'](lil11l,liil11,iIiI1[I1l11l(0x30d,'t&#%')]),I1lIll=![];break;}II1il>=lIli1I&&(console[I1l11l(0x25b,'DyS#')](lllI11),I1lIll&&($['outFlag']=!![],$[I1l11l(0x1ee,'^H@Q')]&&$['message'][I1l11l(0x37e,'Sa$f')](lllI11)));}var version_ = 'jsjiami.com.v7';
// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}

let CookieJDs = []
if (process.env.JD_COOKIE) {
    if (process.env.JD_COOKIE.indexOf('&') > -1) {
        CookieJDs = process.env.JD_COOKIE.split('&')
    } else if (process.env.JD_COOKIE.indexOf('\n') > -1) {
        CookieJDs = process.env.JD_COOKIE.split('\n')
    } else {
        CookieJDs = [process.env.JD_COOKIE]
    }
    process.env.JD_COOKIE = ''
}
CookieJDs = [...new Set(CookieJDs.filter((item) => !!item))]
console.log(`\n==================== 共${CookieJDs.length}个京东账号Cookie ====================\n`)
console.log(`============ 脚本执行 - 北京时间(UTC+8) ${new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000).toLocaleString()} ============\n`)
if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {}
for (let i = 0; i < CookieJDs.length; i++) {
    if (!CookieJDs[i].match(/pt_pin=(.+?);/) || !CookieJDs[i].match(/pt_key=(.+?);/)) console.log(`\n友情提示：京东 cookie 【${CookieJDs[i]}】填写不规范可能会影响脚本的正常使用。正确格式为: pt_key=xxx;pt_pin=xxx;（分号;不可少）\n`)
    const index = i + 1 === 1 ? '' : i + 1
    exports['CookieJD' + index] = CookieJDs[i].trim()
}

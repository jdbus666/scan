


## 拉库

- ### 青龙面板

    ```bash
    ql repo https://github.com/jdbus666/scan.git "jd_" "" "^jd[^_]|USER|function|sendNotify|magic|h5sts"
    ```



## 需要安装的依赖库

需要 Node.js® 16 及以上版本，推荐 Node.js® 18 LTS

```bash
npm install -g ds crypto-js jsdom got@11
```

## 功能配置

- ### 自定义 `Token` 缓存

  > `Token` 是关联账号的重要信息，它的有效期为30分钟左右因此不用每次都用新的，默认缓存在本地文件中，缓存时间为29分钟，同时也支持使用 `Redis` 数据库进行缓存以实现跨设备共用

  - #### 自定义缓存文件路径

    ```bash
    export JD_ISV_TOKEN_CUSTOM_CACHE="" # 绝对路径，建议以 token.json 命名
    ```
    > 此文件默认存储在仓库 `function/cache` 目录下

  - #### 使用 `Redis` 数据库

    ```bash
    export JD_ISV_TOKEN_REDIS_CACHE_URL="" # 数据库地址，例：redis://password@127.0.0.1:6379/0
    export JD_ISV_TOKEN_REDIS_CACHE_KEY="" # 自定义提取或提交的键名规则，详见下方说明
    export JD_ISV_TOKEN_REDIS_CACHE_SUBMIT="" # 是否向数据库提交新的缓存token（true/false），默认是
    ```
    > 需要额外安装依赖库才能使用 `npm install -g redis`，默认从键名为用户名的字符串对象中提取键值，用户名是解码后的  
    > 如果你想自定义键名格式则需要将用户名位置设为 `<pt_pin>` 例如：`isv_token:<pt_pin>`，否则将自动在末尾追加

- ### 配置代理

  - #### 全局代理

    ```bash
    ## 启用代理
    export JD_ISV_GLOBAL_PROXY="true"
    ## 代理组件库相关控制变量
    # 定义 HTTP 代理地址（必填）
    export GLOBAL_AGENT_HTTP_PROXY="" # 例：http://127.0.0.1:8080
    # 过滤不需要代理的地址（必填）
    export GLOBAL_AGENT_NO_PROXY='127.0.0.1,172.17.0.1,*.telegram.org,oapi.dingtalk.com' # 用英文逗号分割多个地址，这里特别注意要把用到的内网ip过滤掉
    ```
    全局代理适用于本仓库绝大多数脚本，更多配置方法详见 [gajus/global-agent](https://github.com/gajus/global-agent)
    需要额外安装代理依赖库才能使用 `npm install -g global-agent`
    > 如果你正在使用 Arcadia 面板则无需重复安装此代理依赖库，并且可以通过命令选项 `--agent` 在任意脚本上便捷的实现全局代理功能，具体详见配置文件和文档

  - #### 获取 `Token` 局部代理

    ```bash、
    export JD_ISV_TOKEN_PROXY_API="" # 代理接口地址
    ```
    目前受限于官方接口策略，同一IP段请求多个账号后会频繁响应 `403`，因此可能需要配合代理使用，使用代理时会自动重试请求至多3次  
    需要额外安装代理依赖库才能使用 `npm install -g hpagent`

    - ##### 通过 API 提取的动态代理

      如果你需要使用的是代理商接口所动态提供的代理地址，那么请定义下方的变量
      ```bash
      export JD_ISV_TOKEN_PROXY_API="" # 代理接口地址，例：http://example.com/api/getProxy?sevret=xxx
      export JD_ISV_TOKEN_PROXY_API_MAX="" # 每个代理地址的使用次数，默认为1次
      ```
      为了避免不必要的浪费建议将接口每次响应的代理地址数量设置为1个，另外建议将接口响应格式设置为单行文本的 `ip:port` 格式，同时也支持 `json` 格式不过仅适配了部分代理商  
      启用此模式后由环境变量 `JD_ISV_TOKEN_PROXY_API` 指定的固定代理地址将会自动被忽略，届时会使用接口响应数据所动态提供的代理地址

- ### 自定义签名

  > 本仓库绝大部分脚本需要使用签名，不自定义签名也能正常使用脚本

  · 默认通过请求 [杂货铺公益API](http://api.nolanstore.cc) 在线获取签名（不会泄露任何隐私），可通过环境变量 `JD_SIGN_API` 自定义接口地址（杂货铺接口格式）  
  · 如果存在本地签名生成脚本则会优先加载本地签名，具体规范如下：
    1. 需要将脚本命名为 genSign.js 并存储在与 getSign 脚本同一目录下
    2. 调用函数名为 genSign 并且需要 export 导出
    3. 函数固定两个传参，分别是 functionId（函数id） 和 bodyParams（body参数对象）
    4. 函数需要返回含有 body、st、sign、sv 等关键字段的url参数形式的签名字符串

- ### 自动登记实物奖品收货地址

  ```bash
  export WX_ADDRESS="" # 变量格式：收件人@手机号@省份@城市@区县@详细地址@6位行政区划代码@邮编，需按照顺序依次填写，多个用管道符分开（6位行政区划代码自己查地图，也可用身份证号前六位）
  export WX_ADDRESS_BLOCK="" # 黑名单关键词，多个关键词用@分开
  ```
  此变量是通用的，不过部分脚本具有与此功能相同的独特变量，届时将优先使用独特变量

- ### 账号消息推送通知过滤

  ```bash
  export JD_NOTIFY_FILTER_KEYWORDS="" # 过滤关键词，多个用@分割
  ```
  只对定义了推送通知开关独特环境变量的部分脚本有效，且默认均为不推送通知


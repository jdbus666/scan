Version = 16793783222
import re
from plugins.jiexi import BasePlugin  # 导入基础插件类

class ShopSignPlugin(BasePlugin):  # 继承 BasePlugin
    def __init__(self):
        super().__init__()
        self.plugin_name = "shop_sign_plugin"
        self.trigger_keywords = ["#店铺签到"]  # 触发关键词

    def parse_shop_sign(self, message):
        """解析店铺签到消息"""
        pattern = r'^(\d{2}\.\d{2}\.\d{2}新增)\s*#店铺签到\s*(.*)$'
        match = re.search(pattern, message, re.DOTALL)
        if not match:
            return None
        _, details = match.groups()
        codes = re.findall(r'([A-F0-9]{40}:\d+:\d+)', details)
        return f"jd_dpqd_tokens={'@'.join(codes)}" if codes else None

    def run(self, message_list):
        """插件入口：处理消息列表"""
        for msg in message_list:
            if any(keyword in msg for keyword in self.trigger_keywords):
                env_var = self.parse_shop_sign(msg)
                if env_var:
                    return [{
                        "type": "env",
                        "value": env_var,
                        "message": "解析成功",
                        "script": "jd_dpqd_main.js"
                    }]
        return None
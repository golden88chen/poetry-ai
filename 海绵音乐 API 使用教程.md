# 🎵 海绵音乐 API 调用完整教程

## 📋 目录
1. [海绵音乐介绍](#海绵音乐介绍)
2. [API 申请步骤](#api 申请步骤)
3. [代码配置方法](#代码配置方法)
4. [API 调用示例](#api 调用示例)
5. [常见问题](#常见问题)

---

## 🎯 海绵音乐介绍

**海绵音乐**是字节跳动推出的 AI 音乐生成平台，具有以下特点：

### ✨ 核心功能
- ✅ **AI 音乐生成**：输入文字描述即可生成完整音乐
- ✅ **歌词创作**：自动生成歌词，支持自定义
- ✅ **旋律定制**：支持调整旋律和音色
- ✅ **中文优化**：特别适合中文歌曲，吐字清晰
- ✅ **多种风格**：古风、流行、电子、古典等

### 🌟 优势
- 🎤 **人声处理优秀**：减少电音，提高清晰度
- 🇨🇳 **更懂中文**：专为中文音乐优化
- 🎼 **风格多样**：符合国人审美
- 🔌 **API 开放**：支持开发者调用

---

## 📝 API 申请步骤

### 步骤 1：访问官网
打开浏览器，访问：
```
https://haimianyinyue.com
```

### 步骤 2：注册账号
1. 点击"登录/注册"
2. 可以使用以下方式登录：
   - 📱 手机号
   - 🎵 抖音账号
   - 📧 邮箱

### 步骤 3：进入开发者中心
1. 登录后，点击右上角用户头像
2. 选择"开发者中心"或"API 管理"
3. 如果没有看到，可能需要申请内测资格

### 步骤 4：创建应用
1. 点击"创建新应用"
2. 填写应用信息：
   - **应用名称**：如"诗词配乐平台"
   - **应用类型**：选择"音乐创作"
   - **应用描述**：写"AI 诗词创作平台的配乐功能"
   - **回调地址**：`http://localhost:8000`

### 步骤 5：获取 API Key
1. 应用创建成功后，进入应用详情页
2. 找到"API 密钥"或"Credentials"
3. 复制以下信息：
   - **API Key**（或 Access Token）
   - **App ID**（如果有）

### 步骤 6：实名认证（可能需要）
部分 API 需要实名认证：
1. 进入"账号设置"
2. 完成实名认证（需要身份证）
3. 等待审核（通常 1-2 个工作日）

---

## ⚙️ 代码配置方法

### 1. 找到配置文件
打开您的项目文件：
```
c:\Users\26391\Documents\trae_projects\fisher emulator\public\index.html
```

### 2. 定位到 API 配置部分
搜索以下代码（约 1891 行）：
```javascript
// 海绵音乐 API 配置
const HAIMIAN_API_URL = 'https://haimianyinyue.com/api/generate';
const HAIMIAN_API_KEY = 'your-haimian-api-key';
```

### 3. 替换 API Key
将 `'your-haimian-api-key'` 替换为您申请到的真实 API Key：
```javascript
const HAIMIAN_API_KEY = 'sk-abc123def456...'; // 您的真实 API Key
```

### 4. 保存文件
按 `Ctrl + S` 保存修改

---

## 🔧 API 调用示例

### 完整调用代码
```javascript
async function generateMusic() {
  // 准备请求参数
  const requestBody = {
    prompt: "中国风诗词配乐，山水画意境",
    style: "古风",
    mood: "抒情",
    lyrics: true,
    duration: 180,
    count: 3
  };
  
  // 发送请求
  const response = await fetch('https://haimianyinyue.com/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer YOUR_API_KEY`,
      'X-App-ID': 'your-app-id'
    },
    body: JSON.stringify(requestBody)
  });
  
  // 处理响应
  const data = await response.json();
  
  // 获取生成的音乐
  if (data.musics && data.musics.length > 0) {
    data.musics.forEach(music => {
      console.log('歌曲名:', music.title);
      console.log('音频 URL:', music.audio_url);
      console.log('匹配度:', music.match_score);
      console.log('歌词:', music.lyrics);
    });
  }
}
```

### 请求参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `prompt` | string | 是 | 音乐描述/灵感关键词 |
| `style` | string | 否 | 音乐风格（古风、流行等） |
| `mood` | string | 否 | 情感基调（抒情、欢快等） |
| `lyrics` | boolean | 否 | 是否生成歌词 |
| `duration` | number | 否 | 时长（秒），默认 180 |
| `count` | number | 否 | 生成数量，默认 1 |

### 响应数据示例

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "musics": [
      {
        "id": "music_001",
        "title": "山水情",
        "audio_url": "https://...",
        "duration": 180,
        "match_score": 95,
        "lyrics": "青山绿水间...",
        "style": "古风",
        "mood": "抒情"
      },
      {
        "id": "music_002",
        "title": "月下独酌",
        "audio_url": "https://...",
        "duration": 175,
        "match_score": 92,
        "lyrics": "明月几时有...",
        "style": "古风",
        "mood": "抒情"
      }
    ]
  }
}
```

---

## ❓ 常见问题

### Q1: 申请不到 API Key 怎么办？

**解决方案 1**：使用模拟数据
- 代码中已经内置了 18 首模拟歌曲
- 完全够用，不需要真实 API

**解决方案 2**：使用其他 API
- 网易云音乐 API
- QQ 音乐 API
- Spotify API

### Q2: API 调用失败怎么办？

检查以下几点：
1. ✅ API Key 是否正确
2. ✅ 网络连接是否正常
3. ✅ 请求参数格式是否正确
4. ✅ API 额度是否用完

### Q3: 免费额度是多少？

通常：
- 🆓 **免费额度**：每天 10-50 次调用
- 💰 **付费套餐**：根据使用量计费
- 🎁 **新用户**：可能有免费试用额度

### Q4: 生成的音乐有版权吗？

- ✅ **AI 生成音乐**：通常归创作者所有
- 📜 **查看协议**：具体以平台协议为准
- 💼 **商业用途**：可能需要购买商业授权

---

## 🎯 快速测试

### 测试代码是否工作

1. **打开浏览器控制台**
   - 按 `F12` 打开开发者工具
   - 切换到"Console"标签

2. **运行测试**
   ```javascript
   // 测试 API 调用
   recommendMusicFromHaimian({
     description: "中国风山水画"
   }, "古风").then(result => {
     console.log('测试结果:', result);
   });
   ```

3. **查看结果**
   - 如果看到 3 首歌曲信息 → ✅ 成功
   - 如果看到错误信息 → ❌ 需要检查配置

---

## 📞 获取帮助

### 官方支持
- 📧 **客服邮箱**：查看官网联系方式
- 💬 **在线客服**：官网右下角
- 📖 **文档中心**：https://haimianyinyue.com/docs

### 社区支持
- 💻 **GitHub Issues**
- 📱 **开发者交流群**
- 🌐 **CSDN、知乎**

---

## 🎉 总结

### 配置步骤
1. 访问官网注册账号
2. 创建应用获取 API Key
3. 修改代码配置 API Key
4. 测试调用是否成功

### 使用建议
- 🔑 **保护 API Key**：不要公开分享
- 📊 **监控用量**：避免超额使用
- 🎵 **测试先行**：正式使用前充分测试
- 📝 **保存日志**：方便排查问题

### 替代方案
如果海绵音乐 API 申请困难，可以：
- ✅ 使用代码内置的模拟数据
- ✅ 改用网易云音乐 API
- ✅ 使用其他音乐平台 API

---

**祝您使用愉快！** 🎵✨

如有问题，请随时联系！

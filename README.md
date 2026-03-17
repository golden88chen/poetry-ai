# 诗魂续作：AI 古诗今唱 🎨

一个融合中国风水墨风格的 AI 诗词创作平台

## ✨ 功能特色

### 🖋️ 古诗续作
- 输入上句诗，AI 生成符合古诗特点的下句
- 支持 5 种诗人风格：李白、李清照、杜甫、苏轼、王维
- 支持 4 种主题：思乡、咏物、送别、山水

### 🖼️ 图片分析写诗
- 上传图片，AI 分析画面意境创作古诗
- 支持选择诗风和主题

### 🎵 图片配乐 AI
- 上传一张图片，AI 推荐 3 首最匹配的背景音乐
- 显示匹配度百分比
- 支持播放/暂停控制
- 历史记录保存 7 天

### ⚔️ 挑战 AI 对诗
- AI 出上句，用户对下句
- 实时评分系统
- 积分升级：诗童→诗秀→诗杰→诗圣→诗仙

### 🌸 飞花令闯关
- 4 个关卡难度递增
- 关键字飞花令挑战
- 连击加分机制

### 📜 诗词广场
- 经典诗词展示
- 本周热门诗句
- 用户创作排行榜

## 🚀 快速开始

### 本地运行
```bash
# 使用 Python 启动
python -m http.server 8000

# 访问 http://localhost:8000/public/
```

### 公网部署（推荐 Vercel）

1. **安装 Vercel CLI**
```bash
npm install -g vercel
```

2. **登录 Vercel**
```bash
vercel login
```

3. **部署**
```bash
vercel --prod
```

4. **获得公网链接**
```
https://your-project.vercel.app
```

## 📁 项目结构
```
fisher emulator/
├── public/              # 网站主目录
│   └── index.html      # 主页面
├── vercel.json         # Vercel 配置
├── .gitignore         # Git 忽略文件
└── README.md          # 项目说明
```

## 🔑 API 配置

### DeepSeek API（古诗生成）
在 `public/index.html` 中配置：
```javascript
const DEEPSEEK_API_KEY = 'your-api-key';
```

### 网易云音乐 API（音乐推荐）
在 `public/index.html` 中配置：
```javascript
const NETEASE_API_KEY = 'your-api-key';
const NETEASE_API_SECRET = 'your-api-secret';
```

## 🎨 技术栈
- HTML5 + CSS3 + JavaScript (原生)
- DeepSeek AI API（诗词生成）
- 网易云音乐 API（音乐推荐）
- LocalStorage（本地存储）

## 🌟 特色功能
- ✅ 中国风水墨背景
- ✅ 动态花瓣飘落效果
- ✅ 古风配色方案
- ✅ 响应式设计
- ✅ Toast 提示系统
- ✅ 历史记录管理（7 天）

## 📱 用户等级
- 诗童（0 分）
- 诗秀（100 分）
- 诗杰（200 分）
- 诗圣（500 分）
- 诗仙（1000 分）

## 🎯 使用场景
- 诗词爱好者创作
- 学生学习古诗
- 文案配乐需求
- 娱乐挑战

## 📄 License
MIT License

---
**诗魂续作** - 与古代诗人合作，共创经典诗作 🎭

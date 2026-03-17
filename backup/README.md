# 诗魂续作：AI 古诗今唱

## 项目简介
这是一个使用 DeepSeek AI 生成古诗续作的项目，可以根据用户输入的上句诗，结合所选的风格和主题，生成符合古诗特点的续句。

## 使用前必须配置

### 获取 DeepSeek API 密钥

1. **访问 DeepSeek 官网**
   - 网址：https://www.deepseek.com/

2. **注册/登录账号**
   - 创建新账户或使用已有账户登录

3. **进入 API 管理**
   - 登录后进入控制台或 API 管理页面

4. **创建 API Key**
   - 点击"创建新的 API Key"
   - 复制生成的 API 密钥（格式类似：`sk-xxxxxxxxxxxxxxxx`）

5. **配置到项目中**
   - 打开 `public/index.html` 文件
   - 找到第 170 行左右的代码：
     ```javascript
     const DEEPSEEK_API_KEY = 'sk-your-api-key-here';
     ```
   - 将 `'sk-your-api-key-here'` 替换为您获取到的真实 API 密钥

## 功能特点

1. **DeepSeek AI 驱动**
   - 每次生成都调用 DeepSeek API 进行深度分析
   - 确保生成的诗句符合古诗格律和意境

2. **多风格支持**
   - 李白式豪放
   - 李清照式婉约
   - 杜甫式沉郁
   - 苏轼式豪放
   - 王维式田园

3. **多主题支持**
   - 思乡
   - 咏物
   - 送别
   - 山水

4. **智能分析**
   - 分析输入诗句的字数，确保续句长度对称
   - 根据所选风格和主题生成合适的诗句
   - 使用古诗风格的词汇和表达方式

## 使用方法

### 方法 1：直接打开 HTML 文件
1. 在浏览器中打开 `public/index.html`
2. 输入上句诗（如"床前明月光"）
3. 选择风格和主题
4. 点击"生成续句"
5. 等待 DeepSeek 生成结果

### 方法 2：使用本地服务器
1. 打开终端，进入项目目录
2. 运行 Python 内置服务器：
   ```bash
   python -m http.server 8000
   ```
3. 在浏览器中访问：http://localhost:8000/public/index.html

## 注意事项

1. **API 密钥安全**
   - 不要将包含真实 API 密钥的代码提交到公开仓库
   - 建议使用环境变量管理 API 密钥

2. **API 使用费用**
   - DeepSeek API 可能会产生费用
   - 请查看官方定价政策

3. **网络连接**
   - 使用本工具需要能够访问 DeepSeek API 服务器
   - 如遇网络问题可能导致生成失败

## 故障排除

### 问题：点击生成后没有反应
- 检查是否已配置正确的 API 密钥
- 按 F12 打开浏览器控制台查看错误信息
- 确认网络连接正常

### 问题：生成失败，显示错误信息
- 检查 API 密钥是否正确
- 确认 API 密钥是否有足够的额度
- 查看浏览器控制台的详细错误信息

### 问题：生成的诗句不符合要求
- 尝试调整提示词或参数
- 检查所选风格和主题是否合适
- 多次生成获取最佳结果

## 技术栈

- **前端**：HTML5 + CSS3 + JavaScript
- **AI 服务**：DeepSeek API
- **服务器**：Python HTTP Server（可选）

## 项目结构

```
fisher emulator/
├── public/
│   ├── index.html          # 主页面
│   ├── simple.html         # 简化测试页面
│   └── test2.html          # 测试页面
├── lib/
│   ├── poetryGenerator.js  # 古诗生成器（后端版本）
│   └── imageAnalyzer.js    # 图片分析器（后端版本）
├── uploads/                # 图片上传目录
├── index.js                # Node.js 服务器入口
├── package.json            # Node.js 依赖配置
└── README.md               # 项目说明文档
```

## 许可证

MIT License

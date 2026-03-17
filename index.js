const express = require('express');
const multer = require('multer');
const path = require('path');
const poetryGenerator = require('./lib/poetryGenerator');
const imageAnalyzer = require('./lib/imageAnalyzer');

const app = express();
const port = 3000;

// 配置静态文件服务
app.use(express.static('public'));
app.use(express.json());

// 配置文件上传
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// 路由
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 古诗续作API
app.post('/api/continue-poetry', async (req, res) => {
  try {
    const { line, style, theme } = req.body;
    const result = await poetryGenerator.continuePoetry(line, style, theme);
    res.json({ success: true, result });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

// 图片分析写诗API
app.post('/api/image-poetry', upload.single('image'), async (req, res) => {
  try {
    const { style } = req.body;
    const imagePath = req.file.path;
    const result = await imageAnalyzer.generatePoetryFromImage(imagePath, style);
    res.json({ success: true, result });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

// 启动服务器
app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
});
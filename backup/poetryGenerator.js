// 古诗续作核心功能
class PoetryGenerator {
  constructor() {
    // 初始化模型和数据
    this.poetryData = this.loadPoetryData();
    this.apiKey = 'YOUR_DEEPSEEK_API_KEY'; // 替换为真实的DeepSeek API密钥
    this.deepSeekApiUrl = 'https://api.deepseek.com/v1/chat/completions';
  }

  // 加载古诗数据
  loadPoetryData() {
    // 这里应该加载真实的古诗数据集
    // 为了演示，使用模拟数据
    return {
      李白: [
        "床前明月光，疑是地上霜。",
        "举头望明月，低头思故乡。",
        "飞流直下三千尺，疑是银河落九天。",
        "桃花潭水深千尺，不及汪伦送我情。"
      ],
      李清照: [
        "寻寻觅觅，冷冷清清，凄凄惨惨戚戚。",
        "莫道不销魂，帘卷西风，人比黄花瘦。",
        "常记溪亭日暮，沉醉不知归路。",
        "一种相思，两处闲愁。"
      ],
      杜甫: [
        "国破山河在，城春草木深。",
        "感时花溅泪，恨别鸟惊心。",
        "烽火连三月，家书抵万金。",
        "白头搔更短，浑欲不胜簪。"
      ],
      苏轼: [
        "大江东去，浪淘尽，千古风流人物。",
        "明月几时有，把酒问青天。",
        "但愿人长久，千里共婵娟。",
        "横看成岭侧成峰，远近高低各不同。"
      ],
      王维: [
        "空山新雨后，天气晚来秋。",
        "明月松间照，清泉石上流。",
        "竹喧归浣女，莲动下渔舟。",
        "随意春芳歇，王孙自可留。"
      ],
      思乡: [
        "独在异乡为异客，每逢佳节倍思亲。",
        "举头望明月，低头思故乡。",
        "露从今夜白，月是故乡明。",
        "春风又绿江南岸，明月何时照我还。"
      ],
      咏物: [
        "墙角数枝梅，凌寒独自开。",
        "采菊东篱下，悠然见南山。",
        "接天莲叶无穷碧，映日荷花别样红。",
        "碧玉妆成一树高，万条垂下绿丝绦。"
      ],
      送别: [
        "劝君更尽一杯酒，西出阳关无故人。",
        "莫愁前路无知己，天下谁人不识君。",
        "桃花潭水深千尺，不及汪伦送我情。",
        "海内存知己，天涯若比邻。"
      ],
      山水: [
        "天门中断楚江开，碧水东流至此回。",
        "两岸青山相对出，孤帆一片日边来。",
        "日照香炉生紫烟，遥看瀑布挂前川。",
        "飞流直下三千尺，疑是银河落九天。"
      ]
    };
  }

  // 分析诗句风格
  analyzeStyle(line) {
    // 简单的风格分析逻辑
    const豪放关键词 = ["飞", "千", "万", "天", "海", "江", "山"];
    const婉约关键词 = ["愁", "思", "泪", "梦", "月", "花", "雨"];
    const田园关键词 = ["田", "园", "山", "水", "竹", "菊", "梅"];
    
    let豪放计数 = 0;
    let婉约计数 = 0;
    let田园计数 = 0;
    
    for (const word of豪放关键词) {
      if (line.includes(word))豪放计数++;
    }
    for (const word of婉约关键词) {
      if (line.includes(word))婉约计数++;
    }
    for (const word of田园关键词) {
      if (line.includes(word))田园计数++;
    }
    
    const maxCount = Math.max(豪放计数, 婉约计数, 田园计数);
    if (maxCount === 豪放计数) return "豪放";
    if (maxCount === 婉约计数) return "婉约";
    return "田园";
  }

  // 调用外部AI模型API (DeepSeek)
  async callAIModel(prompt) {
    try {
      console.log('调用DeepSeek AI模型:', prompt);
      
      // 构建DeepSeek API请求
      const response = await fetch(this.deepSeekApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            {
              role: 'system',
              content: '你是一位精通中国古典诗词的AI助手，擅长模仿不同诗人的风格创作诗句。请确保生成的诗句符合古诗的格律和意境，语言优美，可以结合诗人的风格特点，不一定要求完全原创。'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 50,
          temperature: 0.7
        })
      });
      
      if (!response.ok) {
        throw new Error(`API请求失败: ${response.status}`);
      }
      
      const data = await response.json();
      const generatedContent = data.choices[0].message.content.trim();
      
      // 提取生成的诗句部分
      // 通常DeepSeek会返回完整的诗句，我们需要提取续句部分
      let continuation = generatedContent;
      
      // 如果返回的是完整的诗句（包含上句），只提取续句部分
      if (continuation.includes('，')) {
        const parts = continuation.split('，');
        if (parts.length > 1) {
          continuation = parts[1].replace('。', '');
        }
      }
      
      console.log('DeepSeek生成结果:', continuation);
      return continuation;
    } catch (error) {
      console.error('DeepSeek API调用失败:', error);
      // API调用失败时返回null，使用本地数据
      return null;
    }
  }

  // 分析诗句
  analyzePoetryLine(line) {
    // 分析诗句的长度
    const length = line.length;
    
    // 分析诗句的风格倾向
    const style = this.analyzeStyle(line);
    
    // 分析诗句的主题倾向
    const theme = this.analyzeTheme(line);
    
    // 分析诗句的结构
    const structure = this.analyzeStructure(line);
    
    return {
      length,
      style,
      theme,
      structure
    };
  }

  // 分析诗句主题
  analyzeTheme(line) {
    const themes = {
      思乡: ["乡", "家", "归", "故", "亲"],
      咏物: ["花", "鸟", "山", "水", "月"],
      送别: ["送", "别", "离", "友", "君"],
      山水: ["山", "水", "峰", "流", "川"]
    };
    
    let maxCount = 0;
    let detectedTheme = "未知";
    
    for (const [theme, keywords] of Object.entries(themes)) {
      let count = 0;
      for (const keyword of keywords) {
        if (line.includes(keyword)) count++;
      }
      if (count > maxCount) {
        maxCount = count;
        detectedTheme = theme;
      }
    }
    
    return detectedTheme;
  }

  // 分析诗句结构
  analyzeStructure(line) {
    // 简单分析诗句的结构，如是否有对仗等
    return {
      hasParallelism: this.checkParallelism(line),
      hasMetaphor: this.checkMetaphor(line)
    };
  }

  // 检查是否有对仗
  checkParallelism(line) {
    // 简单检查是否有对仗结构
    const words = line.split('');
    if (words.length % 2 === 0) {
      // 检查前半部分和后半部分是否有对仗
      const mid = words.length / 2;
      const firstHalf = words.slice(0, mid).join('');
      const secondHalf = words.slice(mid).join('');
      return firstHalf.length === secondHalf.length;
    }
    return false;
  }

  // 检查是否有比喻
  checkMetaphor(line) {
    const metaphorKeywords = ["如", "似", "若", "像", "仿佛"];
    for (const keyword of metaphorKeywords) {
      if (line.includes(keyword)) return true;
    }
    return false;
  }

  // 续作古诗
  async continuePoetry(line, style, theme) {
    // 分析输入诗句
    const analysis = this.analyzePoetryLine(line);
    console.log('诗句分析结果:', analysis);
    
    // 构建AI模型提示词
    let prompt = `请根据上句诗"${line}"，`;
    
    // 添加诗句分析结果
    prompt += `上句诗分析：长度${analysis.length}字，风格倾向${analysis.style}，主题倾向${analysis.theme}。`;
    
    if (style) {
      prompt += `以${style}的风格，`;
    } else {
      prompt += `以${analysis.style}风格，`;
    }
    
    if (theme) {
      prompt += `围绕"${theme}"的主题，`;
    } else {
      prompt += `围绕"${analysis.theme}"的主题，`;
    }
    
    prompt += `续写下一句诗，要求：1. 符合古诗的格律和意境 2. 语言优美，符合古诗的断句规则 3. 结合所选诗人的风格特点 4. 与上句诗的内容和意境相呼应 5. 与上句诗在字数和结构上保持对称，上句有${line.length}字，续句也应该有${line.length}字 6. 使用古诗风格的词汇和表达方式，避免现代用语 7. 符合古诗的韵律和节奏`;
    
    // 调用外部AI模型
    let continuation = await this.callAIModel(prompt);
    
    // 确保生成的诗句符合古诗断句要求，并且与上句保持对称
    continuation = this.formatPoetryLine(continuation, line.length);
    
    return {
      original: line,
      continuation: continuation,
      fullPoetry: line + "，" + continuation + "。",
      style: style || analysis.style,
      theme: theme || analysis.theme,
      analysis: analysis
    };
  }

  // 格式化诗句，确保符合古诗的特点和对称要求
  formatPoetryLine(line, targetLength) {
    // 移除多余的标点符号
    line = line.replace(/[，。；：！？]/g, '');
    
    // 移除现代用语，确保语言符合古诗风格
    const modernWords = ["手机", "电脑", "汽车", "火车", "飞机", "互联网", "科技", "现代", "城市", "工厂"];
    for (const word of modernWords) {
      line = line.replace(new RegExp(word, 'g'), '');
    }
    
    // 确保诗句长度与目标长度一致
    if (line.length > targetLength) {
      // 截取到目标长度
      line = line.substring(0, targetLength);
    } else if (line.length < targetLength) {
      // 如果太短，添加一些符合意境的字
      const补足词 = ["兮", "矣", "也", "然", "尔", "哉", "乎", "耶"];
      while (line.length < targetLength) {
        line += 补足词[Math.floor(Math.random() * 补足词.length)];
      }
    }
    
    // 确保诗句语言符合古诗特点
    line = this.ensurePoetryLanguage(line);
    
    return line;
  }

  // 确保诗句语言符合古诗特点
  ensurePoetryLanguage(line) {
    // 替换一些常见的现代表达为古诗风格的表达
    const replacements = {
      "看": "望",
      "说": "言",
      "听": "闻",
      "想": "思",
      "笑": "乐",
      "哭": "泣",
      "走": "行",
      "跑": "奔",
      "飞": "翔",
      "吃": "食",
      "喝": "饮",
      "睡": "眠",
      "死": "亡",
      "生": "活",
      "爱": "恋",
      "恨": "怨",
      "美": "丽",
      "丑": "陋",
      "大": "巨",
      "小": "微",
      "多": "繁",
      "少": "稀"
    };
    
    for (const [modern, classical] of Object.entries(replacements)) {
      line = line.replace(new RegExp(modern, 'g'), classical);
    }
    
    return line;
  }

  // 从本地数据获取续句
  getLocalContinuation(line, style, theme) {
    // 根据风格和主题选择合适的续句
    let candidates = [];
    
    if (style === "李白式豪放") {
      candidates = this.poetryData["李白"];
    } else if (style === "李清照式婉约") {
      candidates = this.poetryData["李清照"];
    } else if (style === "杜甫式沉郁") {
      candidates = this.poetryData["杜甫"];
    } else if (style === "苏轼式豪放") {
      candidates = this.poetryData["苏轼"];
    } else if (style === "王维式田园") {
      candidates = this.poetryData["王维"];
    } else if (theme === "思乡") {
      candidates = this.poetryData["思乡"];
    } else if (theme === "咏物") {
      candidates = this.poetryData["咏物"];
    } else if (theme === "送别") {
      candidates = this.poetryData["送别"];
    } else if (theme === "山水") {
      candidates = this.poetryData["山水"];
    } else {
      // 默认使用李白的诗句
      candidates = this.poetryData["李白"];
    }
    
    // 随机选择一个续句
    const randomIndex = Math.floor(Math.random() * candidates.length);
    const continuation = candidates[randomIndex].split("，")[1].replace("。", "");
    
    return continuation;
  }
}

module.exports = new PoetryGenerator();
import express from 'express';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();
const port = 3000;

// __dirname を ESモジュールで定義するための設定
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 静的ファイルのルートを設定
app.use(express.static(path.join(__dirname, 'contents')));
app.use(express.json());

app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        // Ollama APIを呼び出して応答を取得
        const response = await axios.post('http://127.0.0.1:11434/', { // Ollama APIエンドポイントを修正
            model: "gemma2:2b",
//            messages: [{ role: "user", content: "Your message here" }],
            messages: [{ role: "user", content: userMessage }],
            stream: true
        }, {
            responseType: 'stream'
        });

        // 逐次応答をストリームでクライアントに転送
        response.data.pipe(res);
    } catch (error) {
        console.error('Error communicating with the AI model:', error.message);
        console.error('Full error details:', error);  // エラー詳細をログに表示
        res.status(500).send("Error communicating with the AI model");
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://127.0.0.1:${port}`);
});

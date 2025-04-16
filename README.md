# N8N 表單自動化工作流服務

這個專案包含兩個主要組件：
1. n8n-nodes-form-automation：自定義的 N8N 表單自動化節點
2. auto_node：獨立的表單自動化服務

## 快速開始

### 前置需求
- Docker
- Docker Compose
- Git

### 安裝步驟

1. 克隆專案
```bash
git clone [你的 GitHub 倉庫 URL]
cd workflow_n8n_service_local
```

2. 設置環境變數
複製 `.env.example` 到 `.env` 並根據需要修改配置：
```bash
cp .env.example .env
```

3. 啟動服務
```bash
docker-compose up -d
```

服務將在以下位置啟動：
- N8N 工作流界面：http://localhost:5679 （或您在 .env 中設置的端口）
- 自動化服務將在後台運行

### 目錄結構
```
./
├── docker-compose.yml    # Docker 配置文件
├── .env                 # 環境變數配置
├── n8n-nodes-form-automation/  # N8N 自定義節點
│   ├── nodes/          # 節點程式碼
│   └── package.json    # 節點依賴配置
└── auto_node/          # 自動化服務
    ├── src/            # 源代碼
    ├── Dockerfile      # Docker 配置
    └── package.json    # 依賴配置
```

### 使用方法

1. 訪問 N8N 工作流界面 (http://localhost:5678)
2. 在工作流中使用 "表單自動化" 節點
3. 配置表單 URL 和其他必要參數
4. 啟動工作流

### 管理命令

啟動服務：
```bash
docker-compose up -d
```

查看日誌：
```bash
# 查看所有服務的日誌
docker-compose logs -f

# 查看特定服務的日誌
docker-compose logs n8n
docker-compose logs auto-service
```

停止服務：
```bash
docker-compose down
```

重新啟動服務：
```bash
docker-compose restart
```

### 注意事項
- 首次啟動時需要等待一段時間以完成所有依賴的安裝
- 確保環境變數正確配置
- 如果遇到權限問題，可能需要調整目錄權限

## 開發指南

### 開發 N8N 節點
1. 進入節點目錄：
```bash
cd n8n-nodes-form-automation
```

2. 安裝依賴：
```bash
npm install
```

3. 編譯節點：
```bash
npm run build
```

### 開發自動化服務
1. 進入服務目錄：
```bash
cd auto_node
```

2. 安裝依賴：
```bash
npm install
```

3. 啟動開發模式：
```bash
npm run dev
```

## 貢獻指南
1. Fork 本倉庫
2. 創建您的特性分支 (git checkout -b feature/AmazingFeature)
3. 提交您的更改 (git commit -m 'Add some AmazingFeature')
4. 推送到分支 (git push origin feature/AmazingFeature)
5. 開啟一個 Pull Request

## 授權
本項目採用 MIT 授權 - 查看 [LICENSE](LICENSE) 文件了解更多細節。 
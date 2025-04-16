FROM mcr.microsoft.com/playwright:v1.42.1-focal

WORKDIR /app

# 安裝系統依賴
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    curl \
    gnupg \
    dbus \
    && rm -rf /var/lib/apt/lists/*

# 安裝 Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝依賴
RUN npm install

# 安裝 Playwright 瀏覽器
RUN npx playwright install chromium

# 複製源代碼
COPY . .

# 創建數據目錄
RUN mkdir -p /app/data

# 啟動命令
CMD ["node", "src/main.js"] 
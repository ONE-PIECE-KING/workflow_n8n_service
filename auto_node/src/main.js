const { chromium } = require('playwright');
const logger = require('./utils/logger');

async function main() {
    logger.info('Starting form automation service...');
    
    // 檢查環境變數
    const formUrl = process.env.FORM_URL;
    const excelFile = process.env.EXCEL_FILE;
    
    if (!formUrl || !excelFile) {
        logger.error('Missing required environment variables: FORM_URL or EXCEL_FILE');
        process.exit(1);
    }

    try {
        // 初始化瀏覽器
        const browser = await chromium.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage'
            ]
        });

        logger.info('Browser initialized successfully');

        // 保持服務運行
        process.on('SIGTERM', async () => {
            logger.info('Received SIGTERM signal, cleaning up...');
            await browser.close();
            process.exit(0);
        });

        logger.info('Service is ready and waiting for tasks');
    } catch (error) {
        logger.error('Failed to initialize service:', error);
        process.exit(1);
    }
}

main().catch(error => {
    logger.error('Unhandled error:', error);
    process.exit(1);
}); 
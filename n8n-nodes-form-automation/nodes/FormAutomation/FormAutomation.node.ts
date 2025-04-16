import { INodeType, INodeTypeDescription, IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { chromium } from 'playwright';

export class FormAutomation implements INodeType {
    description: INodeTypeDescription = {
        displayName: '表單自動化',
        name: 'formAutomation',
        group: ['automation'],
        version: 1,
        description: '使用 Playwright 自動填寫網頁表單',
        icon: 'file:./form-automation.svg',
        defaults: {
            name: 'Form Automation',
        },
        inputs: ['main'],
        outputs: ['main'],
        properties: [
            // 選擇模式
            {
                displayName: '操作模式',
                name: 'mode',
                type: 'options',
                options: [
                    {
                        name: '使用模板',
                        value: 'template'
                    },
                    {
                        name: '直接配置',
                        value: 'direct'
                    }
                ],
                default: 'direct',
                description: '選擇使用已有模板或直接配置表單'
            },

            // 模板模式的配置
            {
                displayName: '模板 ID',
                name: 'templateId',
                type: 'string',
                displayOptions: {
                    show: {
                        mode: ['template']
                    }
                },
                default: '',
                description: '選擇要使用的表單模板 ID'
            },

            // 直接配置模式的配置
            {
                displayName: '表單 URL',
                name: 'formUrl',
                type: 'string',
                displayOptions: {
                    show: {
                        mode: ['direct']
                    }
                },
                default: '',
                description: '要填寫的表單 URL'
            },
            {
                displayName: '表單欄位',
                name: 'fields',
                type: 'fixedCollection',
                displayOptions: {
                    show: {
                        mode: ['direct']
                    }
                },
                typeOptions: {
                    multipleValues: true,
                },
                default: {},
                options: [
                    {
                        name: 'field',
                        displayName: '欄位',
                        values: [
                            {
                                displayName: '欄位名稱',
                                name: 'name',
                                type: 'string',
                                default: '',
                                description: '欄位的名稱'
                            },
                            {
                                displayName: '選擇器',
                                name: 'selector',
                                type: 'string',
                                default: '',
                                description: '欄位的 CSS 選擇器'
                            },
                            {
                                displayName: '欄位類型',
                                name: 'type',
                                type: 'options',
                                options: [
                                    {
                                        name: '文字',
                                        value: 'text'
                                    },
                                    {
                                        name: '下拉選單',
                                        value: 'select'
                                    },
                                    {
                                        name: '複選框',
                                        value: 'checkbox'
                                    },
                                    {
                                        name: '單選框',
                                        value: 'radio'
                                    }
                                ],
                                default: 'text'
                            },
                            {
                                displayName: '值',
                                name: 'value',
                                type: 'string',
                                default: '',
                                description: '要填入的值'
                            }
                        ]
                    }
                ]
            },
            {
                displayName: '提交按鈕選擇器',
                name: 'submitSelector',
                type: 'string',
                displayOptions: {
                    show: {
                        mode: ['direct']
                    }
                },
                default: '',
                description: '提交按鈕的 CSS 選擇器'
            },
            {
                displayName: '成功提示選擇器',
                name: 'successSelector',
                type: 'string',
                displayOptions: {
                    show: {
                        mode: ['direct']
                    }
                },
                default: '',
                description: '表單提交成功後的提示元素選擇器'
            }
        ]
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const mode = this.getNodeParameter('mode', 0) as string;
        let formConfig: any;

        if (mode === 'template') {
            const templateId = this.getNodeParameter('templateId', 0) as string;
            const response = await fetch(`http://localhost:3000/api/templates/${templateId}`);
            if (!response.ok) {
                throw new Error(`獲取模板失敗: ${response.statusText}`);
            }
            formConfig = await response.json();
        } else {
            formConfig = {
                url: this.getNodeParameter('formUrl', 0) as string,
                fields: (this.getNodeParameter('fields', 0) as any).field || [],
                submitSelector: this.getNodeParameter('submitSelector', 0) as string,
                successSelector: this.getNodeParameter('successSelector', 0) as string
            };
        }

        const browser = await chromium.launch({ headless: true });
        const page = await browser.newPage();

        try {
            await page.goto(formConfig.url);

            for (const field of formConfig.fields) {
                const element = await page.waitForSelector(field.selector);
                if (!element) {
                    throw new Error(`找不到元素: ${field.selector}`);
                }
                
                switch (field.type) {
                    case 'text':
                        await element.fill(field.value);
                        break;
                    case 'select':
                        await element.selectOption(field.value);
                        break;
                    case 'checkbox':
                        if (field.value === 'true') {
                            await element.check();
                        } else {
                            await element.uncheck();
                        }
                        break;
                    case 'radio':
                        await element.check();
                        break;
                }
            }

            const submitButton = await page.waitForSelector(formConfig.submitSelector);
            if (!submitButton) {
                throw new Error(`找不到提交按鈕: ${formConfig.submitSelector}`);
            }
            await submitButton.click();

            await page.waitForSelector(formConfig.successSelector);

            const screenshot = await page.screenshot();
            const base64Screenshot = screenshot.toString('base64');

            return [[{
                json: {
                    success: true,
                    message: '表單填寫成功',
                    screenshot: base64Screenshot
                }
            }]];

        } catch (error: any) {
            throw new Error(`表單填寫失敗: ${error.message}`);
        } finally {
            await browser.close();
        }
    }
} 
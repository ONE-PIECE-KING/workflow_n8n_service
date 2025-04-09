# 项目结构

## 根目录

- **.git/**  
  Git版本控制目录，包含所有版本历史记录和配置。

- **.gitignore**  
  Git忽略文件，指定哪些文件和目录不应被Git跟踪。

- **package-lock.json**  
  锁定文件，确保项目依赖的版本一致性。

- **package.json**  
  项目配置文件，定义项目的元数据、依赖和脚本。

- **node_modules/**  
  依赖模块目录，存放通过npm安装的所有依赖包。

- **nodes/**  
  自定义节点目录，存放n8n节点的实现文件。

- **dist/**  
  编译输出目录，存放编译后的文件。

- **README.md**  
  项目说明文件，提供项目的基本信息和使用说明。

- **tsconfig.json**  
  TypeScript配置文件，定义编译选项和文件包含规则。

- **USAGE.md**  
  使用说明文件，详细描述如何使用项目中的功能。

## nodes 目录

- **FormAutomation/**  
  存放FormAutomation节点的实现文件。

  - **FormAutomation.node.ts**  
    TypeScript文件，定义FormAutomation节点的逻辑和功能。

  - **FormAutomation.node.json**  
    JSON文件，描述FormAutomation节点的配置和属性。
# 依赖工具安装

命令行依赖工具

```
	apt install git make gcc g++ xz-utils
```

下载nodejs

```
https://nodejs.org/en/download
```

我下载的版本是

```
node-v22.14.0-linux-x64.tar.xz
```

下载后解压到指定目录，然后修改 ~/.bashrc 文件，将 nodejs 相关可执行程序路径添加到 PATH 中。示例如下：

```
NODEJS=/home/szf/docusaurus/node-v22.14.0-linux-x64/bin
export PATH=$NODEJS:$PATH

```



# nodejs 插件安装

执行如下操作安装之：

```
npx create-docusaurus@latest my-website classic
cd ./my-website
npm install @easyops-cn/docusaurus-search-local --save-dev --registry=https://registry.npmmirror.com
npm install prism-react-renderer --save-dev --registry=https://registry.npmmirror.com
npm install @node-rs/jieba --save-dev --registry=https://registry.npmmirror.com
```



# 项目 clone

```
git clone https://github.com/shaozongfan/shaozongfan.github.io.git
```

克隆 docusaurus 项目到本地，此时不能直接编译，需要先安装依赖的 node_modules。

```
cd shaozongfan.github.io.git
cp -rf ../my-website .
```

修改添加内容到docusaurus.config.js

```
 const config = {
 url: 'https://shaozongfan.github.io',
  projectName: 'shaozongfan.github.io', // Usually your repo name.
  deploymentBranch: 'gh-pages',

```

# 编译项目

进入 my-website目录中，执行 `npm run build`来编译，编译成功的主要日志如下：

```
rlk@rlk:my-website$ npm run build

> my-website@0.0.0 build
> docusaurus build

[INFO] [en] Creating an optimized production build...

✔ Client


✔ Server
  Compiled successfully in 1.60m


✔ Client


● Server █████████████████████████ cache (99%) shutdown IdleFileCachePlugin
 stored

[SUCCESS] Generated static files in "build".
[INFO] Use `npm run serve` command to test your build locally.

```

# 配置 deploy

### 1. 生成SSH密

如果你还没有SSH密钥对，你可以通过在终端运行以下命令来生成它们：

bash复制

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

- 这条命令会生成一个新的SSH密钥对（公钥和私钥）。
- 按照提示操作，你可以为密钥设置密码，也可以直接按回车键留空。
- 默认情况下，公钥会保存在`~/.ssh/id_ed25519.pub`，私钥会保存在`~/.ssh/id_ed25519`。

### 2. 查看公钥

在添加SSH密钥到GitHub之前，你需要查看公钥的内容。可以通过以下命令查看：

bash复制

```bash
cat ~/.ssh/id_ed25519.pub
```

这将显示你的公钥，你需要复制这部分内容。

### 3. 添加SSH密钥到GitHub

1. 登录到你的GitHub账户。
2. 点击右上角的头像，选择“Settings”（设置）。
3. 在设置页面的侧边栏中，点击“SSH and GPG keys”（SSH和GPG密钥）。
4. 点击“New SSH key”（新建SSH密钥）按钮。
5. 在“Title”（标题）字段中，为你的密钥设置一个描述性的标题，例如你的笔记本电脑的名称。
6. 在“Key”（密钥）字段中，粘贴你之前复制的公钥内容。
7. 点击“Add SSH key”（添加SSH密钥）按钮。

### 4. 测试SSH密钥

添加SSH密钥后，你应该测试它以确保一切正常工作。可以通过以下命令测试：

bash复制

```bash
ssh -T git@github.com
```



### 5.执行一次如下步骤

一定要执行这一步，完成认证过程

```
 git clone --depth 1 --branch gh-pages git@github.com:shaozongfan/shaozongfan.github.io.git /tmp/shaozongfan.github.io.git-gh-pagesUOkBdR-tes
```

### 6.终端设置

```
 export USE_SSH=true
```

### 7.执行

```
npm run deploy
```





# 国内访问github

```
https://github.com/maxiaof/github-hosts
```


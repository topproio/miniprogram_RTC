# RTC小程序

## 开发

```
//安装依赖
yarn install

//打包到生成环境
yarn build

//开发监听
yarn dev

//矫正eslint
yarn fix

//新建page
yarn page (名称)

//新建component
yarn com (名称)
```

## 目录结构
```
src //开发目录
|__ assets //静态资源 存放image style
|__ components //组建文件
|__ global //业务库
|__ models //模型层
|__ pages //页面文件
|__ utils //公共库
|__ app.js //入口
|__ app.json //app配置
|__ app.less //app样式
|__ project.config.json //配置

task //gulp打包文件

gulp.config.js //gulp配置文件

gulpfile.js //gulp入口

template //page 与 component模版文件

.eslintrc.js //eslint配置文件
```
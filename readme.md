## 1 打包配置
- 目的：通过npm run build 实现将src/web/vue.runtime.js 和src/web/vue.complier.js打包到dist(没有就新建一个)目录下并且符合对应配置文件里面的umd的格式 输出 
并且通过examples里面创建index.html来引入dist下面的vue.js来验证打包流程是否成功， 打包工具使用的是rollup需要配置为devDependencies并且npm install，打包的脚本统一写在scripts下面
  并且通过配置package.json里面的` "build": "node scripts/build.js"`来指定build的脚本 可以通过根目录下面执行这个命令来生成dist下面新的文件` npm run build` 
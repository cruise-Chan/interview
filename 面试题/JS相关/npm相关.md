# 1、npm包的发布
## 1. 代码准备
> - 在gituhb上新建仓库，新建仓库时License选择MIT。（一定要有License才能发布npm包）
> - 拉取代码到本地。
> - 初始化项目，安装依赖等。
> - 完善功能
> - 打包，并在package.json中指明入口

## 2.注册账号

## 3.npm发布
### 3.1 登录npm账号
> - 执行npm login命令登录npm（如果登录失败，需要使用nrm切换镜像为npm）
### 3.1 首次发布成功
执行命令<font color="yellow">npm publish</font>
### 3.1 删除npm包
命令<font color="yellow">npm unpublish <包名> -force</font>
### 3.1 更新npm包
- 第一步：执行<font color="yellow">npm version</font> <版本号类型>
- 第二步：执行<font color="yellow">npm publish</font>

# 2、nrm
## nrm用于管理镜像
> -nrm -V 查看当前版本\
> -nrm -h 现实所有命令\
> -nrm current 显示当前镜像名称\
> -nrm use <name> 切换镜像\
> -nrm add <name> <url> 新增镜像\
> -nrm del <name> 删除镜像\
> -nrm ls 查看镜像列表\
> -nrm test <name> 测试镜像\
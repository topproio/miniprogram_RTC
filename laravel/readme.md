# RTC小程序接口

## 开发
```
//安装依赖
composer install

//拷贝环境配置
cp .env.example .env

//配置小程序appid appsecret 腾讯rtc项目id
WECHAT_MINI_PROGRAM_APPID 
WECHAT_MINI_PROGRAM_SECRET
TRTC_APPID

//存放腾讯rtc的公密钥到rtckeys
rtckeys/private_key > 密钥 rtckeys/public_key > 公钥

//生成密钥
php artisan make:auth

//生成jwt密钥
php artisan jwt:secret

//生成数据库文件
php artisan migrate 
```
# CDN优化方案
- 增加缓存时间
- 控制域名数量（2-4）
- dns-preftech (预检)
    - 默认情况下会有隐式预检，对与当前域名不同的域名进行preftech
- 使用 CDN 域名加速
- 自己搭建 DNS 服务  
- 尽可能使用 A 或 AAAA 记录代替 CNAME
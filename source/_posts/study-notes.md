---
title: Study-Notes
tags:
  - leanning
abbrlink: 188b5aa6
date: 2024-01-08T13:55:04.000Z
updated: '2026-02-10 23:22:41 +08:00'
---

# 学习笔记

创建SpringBoot项目
添加依赖

- Lombok
- Spring Boot DevTools
- Spring Web
- MySQL Driver
- MyBatis Framework

## 工程搭建

```
#启动端口
server.port=8088
#数据源
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql:///220706a
spring.datasource.username=root
spring.datasource.password=123456
# 日志登记
logging.level.com.codingfuture.mybatis_demo = debug
#xml配置
mybatis.mapper-locations=classpath:mapper/*Mapper.xml
#驼峰映射
mybatis.configuration.map-underscore-to-camel-case=true
#配置别名
mybatis.type-aliases-package = com.codingfuture.mybatis_demo.entity
#主键返回
mybatis.configuration.use-generated-keys=true
# 延迟加载
mybatis.configuration.lazy-loading-enabled=true
#二级缓存
mybatis.configuration.cache-enabled=true
```

## 分页

导入依赖

```
<pagehelper-version>1.4.1</pagehelper-version>
<dependency>
     <groupId>com.github.pagehelper</groupId>
     <artifactId>pagehelper-spring-boot-starter</artifactId>
     <version>${pagehelper-version}</version>
</dependency>
```

分页助手

```
Page<SpAttribute> page1 = PageHelper.offsetPage(pageNum, pageSize);
Page<SpAttribute> page2 = PageHelper.startPage(pageNum, pageSize);
```

offsetPage偏移页
startPage起始页

## 测试

```
 @GetMapping("/findByPage2")
    public Result<PageData<SpAttribute>> findByPage2(Integer pageNum, Integer pageSize) {
        // 分页助手
        Page<SpAttribute> result = PageHelper.startPage(pageNum, pageSize);
        // 调用查询方法
        spAttributeService.findByPage();
        // 接收结果，计数
        PageData<SpAttribute> pageData = new PageData<>(result.getResult(), result.getTotal());
        return Result.ok(pageData);
 }
```

## 前端传参

指定默认值
@RequestParam(defaultValue = "1")
@RequestParam(defaultValue = "10")

```
    @GetMapping("/findByPage")
    public Result<PageData<SpAttribute>> findByPage(@RequestParam(defaultValue = "1") Integer pageNum,
                                                    @RequestParam(defaultValue = "10") Integer pageSize) {
      pageSize = pageSize >= 50 ? 50 : pageSize;
      return ...
    }
```

## 分页助手注意事项

原理：在查询语句后面拼接limit参数

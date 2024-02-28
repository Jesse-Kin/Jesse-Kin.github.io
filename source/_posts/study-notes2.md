---
title: leanning
tags:
  - study
abbrlink: 6a15de41
date: 2024-01-09 09:13:23
---
# Mybatis概述
持久层 半自动ORM框架，

### 快速入门
引入依赖
```
 <dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>2.1.4</version>
 </dependency>
 <dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <scope>runtime</scope>
</dependency>
```
配置数据库连接参数
```
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost:3306/jdbcDemo
spring.datasource.username=root
spring.datasource.password=123456
```
创建实体类
创建mapper接口
添加映射文件
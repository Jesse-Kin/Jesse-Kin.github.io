---
title: 重点笔记-反射
date: 2024-01-10 09:03:58
tags: ["notes"]
---
# 反射概述
### 反射是什么
反射允许运行中的Java程序获取自身的信息，并且可有操作类或对象的内部属性。
### 反射的作用
- 在运行时判断任意一个对象所属的类；
- 在运行时创建任意一个类的对象；
- 在运行时判断任意一个类所具有的成员变量和方法；
- 在运行时调用任意一个对象的方法。
### 反射的使用
- Class与Object的关系
  Java的对象模型中
  - Object是Class类的一个实例
  - Class继承自Object
### 获取Class的方式有三种
```
// 1.通过类，直接获取某个类的class
Class<Person> personClass = Person.class;

// 2.调用某个对象的getClass()方法，getClass()是Object的方法
Person person = new Person();
Class<? extends Person> personClass = person.getClass();// 泛型表示Person 或者Person的子类

// 3.调用Class类的forName()静态方法(类的全限定)
Class<?> personClass = Class.forName("com.codingfuture.entity.Person");
```
### 反射的应用
#### 反射封装JDBC框架

---

# Spring概述
### Spring是什么
Spring是Java企业级应用JavaEE的开源开发框架。
主要用来开发Java应用，针对构建JavaEE平台的web应用
### Spring的作用
- 降低耦合，简化开发
- AOP编程的支持
- 声明式事务的支持
- 方便程序的测试
- 方便集成各种优秀框架
- 降低JavaEE API 的使用难度
### Spring IoC是什么
IoC(Inversion of Control,控制反转)是Spring的一个核心思想，实现将类实例化的时机以及细节交给Spring来管理。

创建对象时不需要自己new 依赖的对象，交给IoC容器去

### Spring快速入门
策略模式
```
@Scope("singleton") // 单例模式（默认）
@Scope("prototype") // 原型模式
```

与@Component注解等效的三个注解：
- @Repository
  用于对Dao实现类进行标注，数据层/持久层
- @Service
  用于对Service实现类进行标注，业务层
- @Controller
  用于对Controller实现类进行标注，就是web层
- @Cmponent
  声明此类是一个Spring管理的类，通常用于无法用于上述三者注解描述带的Spring管理类

# http
### Servlet相关配置
- 可以定义多个访问路径
- 多层路径
- 通配符
- 任意字符

### 网络分层模型
- 应用层
- 表示层
- 会话层
- 运输层
- 网络层
- 数据链路层
- 物理层
TCP（基于连接）
UDP（基于非连接）
### 会话技术
Cookie(客户端)
Session(服务器)

### 请求转发
特点
- 浏览器地址栏路径不发生变化
- 只能转发到当前服务器内部资源中
- 转发是一次请求
### 三大域对象
request 服务器间同一请求不同页面之间的参数传递 仅在当前请求中有效,
session 登录验证界面 打开浏器会话开始，关闭浏览器会话结束,
ServletContext 服务器启动时创建，服务器关闭时销毁。
### Response响应
#### forward和redirect区别
+ 重定向的特点：redirect
  + 地址栏发生变化
  + 重定向可以访问其它站点的资源
  + 重定向是两次请求。不能使用request对象来共享数据
+ 转发的特点：forward
  + 转发地址栏路径不变
  + 转发只能访问当前服务器下的资源
  + 转发是一次请求，可以使用request对象来共享数据
# Mybatis概述
持久层 半自动ORM框架

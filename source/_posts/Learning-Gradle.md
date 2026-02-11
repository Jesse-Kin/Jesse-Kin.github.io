---
title: 学习 Gradle
date: 2026-02-11 23:49:59
tags:
---

## 学习 Gradle

Gradle 项目在拉取依赖时非常慢，需要将依赖源修改为阿里源，加快依赖拉取速度。

```
    maven{ url 'https://maven.aliyun.com/repository/central' }
    maven{ url 'https://maven.aliyun.com/repository/public' }
    maven{ url 'https://maven.aliyun.com/repository/gradle-plugin'}
```

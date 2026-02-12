---
title: 学习 Gradle
abbrlink: 55f60165
date: 2026-02-11 23:49:59
tags:
---

## 学习 Gradle

修改二进制包下载地址，在使用官方下载地址时出现下载不下来的情况。将地址修改为国内地址加速下载。

```
#Sat Aug 02 22:16:06 CST 2025
distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
#distributionUrl=https\://services.gradle.org/distributions/gradle-8.13-bin.zip
distributionUrl=https\://repo.huaweicloud.com/gradle/gradle-8.13-bin.zip

zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists

```

Gradle 项目在拉取依赖时非常慢，需要将依赖源修改为阿里源，加快依赖拉取速度。

```
    maven{ url 'https://maven.aliyun.com/repository/central' }
    maven{ url 'https://maven.aliyun.com/repository/public' }
    maven{ url 'https://maven.aliyun.com/repository/gradle-plugin'}
```

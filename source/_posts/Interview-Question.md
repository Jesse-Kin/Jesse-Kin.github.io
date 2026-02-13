---
title: Interview Question
abbrlink: 54155ccf
date: 2024-02-27T15:49:38.000Z
tags: null
updated: '2024-02-28 09:55:52 +08:00'
---

# Git
Git 分布式版本控制系统，用于管理项目的源代码版本
# Spring
Spring 框架的核心功能：
- Spring 容器作为超级大工厂，负责创建、管理所有的Java对象，这些Java对象被称为Bean。
- Spring容器管理容器中Bean之间的依赖关系，Spring使用一种被称为 "依赖注入" 的方式来管理Bean之间的依赖关系。
AOP（Aspect Orient Programming）也就是面向切面编程。
AOP专门用于处理系统中分布于各个模块（不同方法）中的交叉关注点的问题，在JavaEE应用中，常用来处理具有横切性质的系统级服务，如事务管理、安全检查、缓存、对象池管理等。
# 算法
Bubble Sort (冒泡排序)
```
public class BubbleSort implements IArraySort {

    @Override
    public int[] sort(int[] sourceArray) throws Exception {
        // 对 arr 进行拷贝，不改变参数内容
        int[] arr = Arrays.copyOf(sourceArray, sourceArray.length);

        for (int i = 1; i < arr.length; i++) {
            // 设定一个标记，若为true，则表示此次循环没有进行交换，也就是待排序列已经有序，排序已经完成。
            boolean flag = true;

            for (int j = 0; j < arr.length - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    int tmp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = tmp;

                    flag = false;
                }
            }

            if (flag) {
                break;
            }
        }
        return arr;
    }
}
```
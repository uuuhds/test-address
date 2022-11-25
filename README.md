介于找人帮忙定位视频号小店的地址问题比较费劲，自己写了一个判断工具

步骤如下：
- 去铺货系统进行铺货
- 去es搜索`createTemplate`
- 把对应的地址信息截取出来放入到`requestFile.json`文件中，结构可以参考现有文件
- 执行`node index.js`，有问题的地址会打印到`result.txt`文件中
# SSWaveAnimation
Canvas大波纹灌水效果

#### 效果图


![](https://user-gold-cdn.xitu.io/2018/2/8/16174ca3ac6c6d94?w=226&h=228&f=gif&s=197072)

#### 涉及到的知识点
##### 贝塞尔曲线

- 线性贝塞尔曲线

线性贝塞尔曲线函数中的t会经过由P0至P1的B（t）所描述的曲线。例如当t=0.25时，B（t）即一条由点P0至P1路径的四分之一处。就像由0至1的连续t，B（t）描述一条由P0至P1的直线。

![](https://user-gold-cdn.xitu.io/2018/2/8/1617489a6082bfb9?w=360&h=150&f=gif&s=115568)

- 二次方贝塞尔曲线

为建构二次方贝塞尔曲线，可以中介点Q0和Q1作为由0至1的t：

由P0至P1的连续点Q0，描述一条线性贝塞尔曲线。
由P1至P2的连续点Q1，描述一条线性贝塞尔曲线。
由Q0至Q1的连续点B（t），描述一条二次贝塞尔曲线。

![](https://user-gold-cdn.xitu.io/2018/2/8/16174900572c2ee1?w=480&h=200&f=png&s=12440)
![](https://user-gold-cdn.xitu.io/2018/2/8/16174904ce723269?w=360&h=150&f=gif&s=153902)

我们在这里用到的是下面这个方法。
`CanvasRenderingContext2D.quadraticCurveTo()` 是 `Canvas 2D API` 新增二次贝塞尔曲线路径的方法。它需要2个点。 第一个点是控制点，第二个点是终点。 起始点是当前路径最新的点，当创建二次贝赛尔曲线之前，可以使用 `moveTo()` 方法进行改变。

由此我们就可以绘制出波浪

```
    ctx.beginPath();
    var offsetY = startY - radius*2*process/100;
    ctx.moveTo(startX - offset, offsetY);
    ctx.fillStyle = waveColorDeep;
    for (var i = 0; i < kWaveCount; i++) {
        var dx = i * kWaveWidth;
        var offsetX = dx + startX - offset;
        ctx.quadraticCurveTo(offsetX + kWaveWidth/4, offsetY + kWaveHeight, offsetX + kWaveWidth/2, offsetY);
        ctx.quadraticCurveTo(offsetX + kWaveWidth/4 + kWaveWidth/2, offsetY - kWaveHeight, offsetX + kWaveWidth, offsetY);
    }
    ctx.lineTo(startX + kWaveWidthAll, canvas.height);
    ctx.lineTo(startX, canvas.height);
    ctx.fill();
    ctx.closePath();
```

##### 请求动画帧

`window.requestAnimationFrame()` 方法告诉浏览器您希望执行动画并请求浏览器在下一次重绘之前调用指定的函数来更新动画。

这么我们就可以每次调整波浪的起始点使得产生一个波浪滚动的效果。
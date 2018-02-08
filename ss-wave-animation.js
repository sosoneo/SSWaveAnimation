/**
 * Created by sosoneo on 2018/2/8.
 */

var canvas = document.getElementById('wave');
var ctx = canvas.getContext('2d');
// 中点坐标
var centerX = canvas.width/2;
var centerY = canvas.height/2;
// 波浪总宽度
var kWaveWidthAll = 300;
// 波浪高度
var kWaveHeight = 10;
// 波浪个数
var kWaveCount = 4;
// 偏移量
var offset = 0;
// 遮罩半径
var radius = 90;
// 起始x
var startX = -100;
// 起始y
var startY = centerY + radius;
// 单个波浪的宽度
var kWaveWidth = kWaveWidthAll / kWaveCount;
// 将360度分成100份，那么每一份就是rad度
var rad = Math.PI*2/100;
// 加载进度
var process = 0;
// 目标进度
var targetProcess = 20;
// 波浪颜色
var waveColorDeep = "rgba(0, 0, 255, 1)";
var waveColorLight = "rgba(0, 0, 255, 0.5)";
// 遮罩颜色
var maskColor = "rgb(255, 0, 0)";
// 环形进度条颜色
var processBgColor = "rgb(0,255,0)";
var processColor = "rgb(0,0,0)";
// 文字颜色
var textColor = "rgb(0, 0, 0)";

function draw() {
    offset -= 5;
    if (-1 * offset === kWaveWidth) offset = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 第一个波浪
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

    // 第二个波浪
    ctx.beginPath();
    ctx.moveTo(startX - offset, offsetY);
    ctx.fillStyle = waveColorLight;
    for (var i = 0; i < kWaveCount; i++) {
        var dx = i * kWaveWidth;
        var offsetX = dx + startX - offset - offset;
        ctx.quadraticCurveTo(offsetX + kWaveWidth/4, offsetY + kWaveHeight, offsetX + kWaveWidth/2, offsetY);
        ctx.quadraticCurveTo(offsetX + kWaveWidth/4 + kWaveWidth/2, offsetY - kWaveHeight, offsetX + kWaveWidth, offsetY);
    }
    ctx.lineTo(startX + kWaveWidthAll, canvas.height);
    ctx.lineTo(startX, canvas.height);
    ctx.fill();
    ctx.closePath();

    // 遮罩
    ctx.fillStyle = maskColor;
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.arc(centerX,centerY,radius,0,Math.PI*2,true);
    ctx.fill();
    ctx.closePath();

    // 环形进度条不变部分
    ctx.strokeStyle = processBgColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX,centerY,radius,0,Math.PI*2,true);
    ctx.stroke();
    ctx.closePath();

    // 环境进度条变化部分
    ctx.lineWidth = 5; //设置线宽
    ctx.strokeStyle = processColor;
    ctx.beginPath();
    ctx.arc(centerX,centerY,radius,-Math.PI/2,-Math.PI/2 + process*rad,false);
    ctx.stroke();
    ctx.closePath();

    // 进度文字
    ctx.beginPath();
    ctx.textBaseline = 'middle'; // 设置文本的垂直对齐方式
    ctx.textAlign = 'center';    // 设置文本的水平对齐方式
    ctx.strokeStyle = textColor;    // 设置描边样式
    ctx.font = "40px Arial";     // 设置字体大小和字体
    ctx.strokeText(process.toFixed(0)+"%", 100, 100); //绘制字体，并且指定位置
    ctx.stroke(); //执行绘制
    ctx.closePath();

    if(process > targetProcess) {
        // 无限循环
        // process = 0;

        // 关闭无限循环
        cancelAnimationFrame(draw);
        return;
    };
    process += 0.1;

    requestAnimationFrame(draw);
}
draw();
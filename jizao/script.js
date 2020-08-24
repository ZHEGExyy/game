//掌握游戏进程的flag变量，flag=0，开始的聊天界面；flag=1，聊天界面转换至街道地址；
//flag=2，街道地址转到第一摊，开始解决问题；flag=3，进度条降落；
//flag=4，第一摊转到第二摊；重复……；
//flag=10，第四摊转到第二次的聊天界面，开始聊天,至结束。
let flag = 0
//动效所需值
let easing = 0.05

//sound
let diu, wrong, right, complete, biji//sound，消息冒泡声，错误点击声，正确点击声，完成进度条点击声，对话框biji声

//首页聊天
let imgFirst, yFirst = 0, pyFirst = 0//游戏封面“消息通知”
let imgChatBackground//背景浅蓝图片
let imgChat, yChat, pyChat //聊天内容（拜托任务）
//结尾聊天
let imgChat2, yChat2, pyChat2//聊天内容（表扬）
let img5, imgZan, y5, y5Target//img5是（竖起大拇指），imgZan是（赞扬文字）
//
let i = 0//聊天新消息冒泡，i++
let itime = 0//对方连续消息计时出现，首页聊天的位置共享，结尾聊天的图片发送


//背景，后景
let x0, y0, x0Target = 0
let img0//高楼背景
//
let x1, y1, x1Target = 350
let img1noise, img1quiet, flagn = 0//二的大背景，噪音，反馈

//前景（主体地摊所在图层）
let x2, y2, x2Target = 950
let img2
//////第一摊
let imgBadFruit, flag2f = 0
let imgAnger
let imgHappy//反馈
//////第二摊
let img2noise//噪音
//////第三摊
let imgLitter, flag2l = 0
let imgBox, flag2b = 0//马路摊（上）
let imgBikeStop, imgBikeRide, xBike, yBike//反馈
//////第四摊
let imgNoMask, imgMask, flag2m = 0
let imgGasFall, imgGasUp, flag2g = 0
let imgWireOutOfOrder, imgWireInOrder, flag2w = 0
let imgHotdog//反馈

//马路
let x3, y3, x3Target = 550
let img3Wrong, img3Right//马路摊（下）

//对话框
let flagBiji = 0
let img4, time4 = 0

//标志
let x00, y00, x00Target = 0
let img00//街道门

let rectX = 300
let rectY, rectYTarget
let rectS, rectSTarget
let n = 0, nn = 1//进度条

let time0 = 0///////很重要的工具使用时间，超过300，即提示位置
///////第一摊使用工具1个
let x11, y11, x11Target, flag11 = 0
let img11
///////第二摊使用工具1个
let x21, y21, x21Target, flag21 = 0
let img21
///////第三摊使用工具2个
let x30, x30Target
let x31, y31, flag31 = 0
let x32, y32, flag32 = 0
let img31
///////第四摊使用工具3个
let x40, x40Target
let x41, y41, flag41 = 0
let x42, y42, flag42 = 0
let x43, y43, flag43 = 0
let img41, img42, img43///////////ok

function preload() {
    //聊天
    imgFirst = loadImage("https://cdn.jsdelivr.net/gh/ZHEGExyy/-/封面-01.png")
    imgChatBackground = loadImage("https://cdn.jsdelivr.net/gh/ZHEGExyy/-/聊天背景.png")
    imgChat = loadImage("https://cdn.jsdelivr.net/gh/ZHEGExyy/-/聊天.png")

    imgChat2 = loadImage("https://cdn.jsdelivr.net/gh/ZHEGExyy/-/聊天(2).png")
    img5 = loadImage("https://cdn.jsdelivr.net/gh/ZHEGExyy/-/nb.png")//点赞大拇指
    imgZan = loadImage("https://cdn.jsdelivr.net/gh/ZHEGExyy/-/赞扬.png")
    //音效
    diu = loadSound("https://cdn.jsdelivr.net/gh/ZHEGExyy/-/diu.mp3")
    wrong = loadSound("https://cdn.jsdelivr.net/gh/ZHEGExyy/-/错误.mp3")
    right = loadSound("https://cdn.jsdelivr.net/gh/ZHEGExyy/-/正确.mp3")
    complete = loadSound("https://cdn.jsdelivr.net/gh/ZHEGExyy/-/完成进度.mp3")
    biji = loadSound("https://cdn.jsdelivr.net/gh/ZHEGExyy/-/biji.mp3")
    //地摊第一部分：背景，后景
    //x0,y0
    img0 = loadImage("https://cdn.jsdelivr.net/gh/ZHEGExyy/-/0.png")
    //x1,y1
    img1noise = loadImage("https://cdn.jsdelivr.net/gh/ZHEGExyy/-/1吵.png")//可切换图片
    img1quiet = loadImage("https://cdn.jsdelivr.net/gh/ZHEGExyy/-/1静.png")///////flagn=3,反馈
    //地摊第二部分：前景//x2,y2
    img2 = loadImage("https://cdn.jsdelivr.net/gh/ZHEGExyy/-/2静.png")
    imgBadFruit = loadImage("https://cdn.jsdelivr.net/gh/ZHEGExyy/-/2烂水果.png")//消失
    imgAnger = loadImage("https://cdn.jsdelivr.net/gh/ZHEGExyy/-/2吵架.png")//可切换图片
    imgHappy = loadImage("https://cdn.jsdelivr.net/gh/ZHEGExyy/-/2和好.png")///////flag2f=3,反馈

    img2noise = loadImage("https://cdn.jsdelivr.net/gh/ZHEGExyy/-/噪音啊.png")//消失

    imgLitter = loadImage("https://cdn.jsdelivr.net/gh/ZHEGExyy/-/2有垃圾.png")//消失
    imgBox = loadImage("https://cdn.jsdelivr.net/gh/ZHEGExyy/-/箱子整理.png")//消失,,,,联合img3
    imgBikeStop = loadImage("https://cdn.jsdelivr.net/gh/ZHEGExyy/-/车子停.png")//flag2l!=2,falg2b!=2
    imgBikeRide = loadImage("https://cdn.jsdelivr.net/gh/ZHEGExyy/-/车子走.png")///////flag2l=2,反馈


    imgNoMask = loadImage("https://cdn.jsdelivr.net/gh/ZHEGExyy/-/口罩无.png")//可切换图片
    imgMask = loadImage("https://cdn.jsdelivr.net/gh/ZHEGExyy/-/口罩有.png")
    imgGasFall = loadImage("https://cdn.jsdelivr.net/gh/ZHEGExyy/-/燃气倒.png")//可切换图片
    imgGasUp = loadImage("https://cdn.jsdelivr.net/gh/ZHEGExyy/-/燃气起.png")
    imgWireOutOfOrder = loadImage("https://cdn.jsdelivr.net/gh/ZHEGExyy/-/电线乱.png")//可切换图片
    imgWireInOrder = loadImage("https://cdn.jsdelivr.net/gh/ZHEGExyy/-/电线齐.png")
    imgHotdog = loadImage("https://cdn.jsdelivr.net/gh/ZHEGExyy/-/热狗.png")
    //////////////////对话框
    img4 = loadImage("https://cdn.jsdelivr.net/gh/ZHEGExyy/-/对话框.png")

    //地摊第三部分：马路
    img3Wrong = loadImage("https://cdn.jsdelivr.net/gh/ZHEGExyy/-/3有衣服.png")
    img3Right = loadImage("https://cdn.jsdelivr.net/gh/ZHEGExyy/-/3无衣服.png")

    //地摊第四部分：
    ////////街道门
    img00 = loadImage("https://cdn.jsdelivr.net/gh/ZHEGExyy/-/街道门.png")
    ////////工具
    img11 = loadImage("https://cdn.jsdelivr.net/gh/ZHEGExyy/-/11扔水果.png")//排除不合格
    img21 = loadImage("https://cdn.jsdelivr.net/gh/ZHEGExyy/-/21音量减少.png")//调小音量
    img31 = loadImage("https://cdn.jsdelivr.net/gh/ZHEGExyy/-/31扫帚.png")//扫垃圾
    img32 = loadImage("https://cdn.jsdelivr.net/gh/ZHEGExyy/-/32纸箱.png")//收拾马路
    img41 = loadImage("https://cdn.jsdelivr.net/gh/ZHEGExyy/-/41插头.png")//电线
    img42 = loadImage("https://cdn.jsdelivr.net/gh/ZHEGExyy/-/42扶煤气.png")//煤气
    img43 = loadImage("https://cdn.jsdelivr.net/gh/ZHEGExyy/-/43口罩.png")//口罩//////ok
}

function setup() {
    createCanvas(1000, 600)
    //聊天
    yChat = height - 10
    pyChat = height - 10

    yChat2 = height
    pyChat2 = height

    y5Target = height
    y5 = y5Target

    //背景 后景 前景
    x0 = x0Target
    y0 = height
    x1 = x1Target
    y1 = height + 120
    x2 = x2Target
    y2 = height + 220
    x3 = x3Target
    y3 = height + 320

    //进度条
    rectYTarget = height
    rectY = rectYTarget
    rectSTarget = 0
    rectS = rectSTarget
    //街道门
    x00 = 0
    y00 = height

    //工具
    //第一摊
    x11Target = width + 300
    x11 = x11Target
    y11 = 360
    //第二摊
    x21Target = width + 300
    x21 = x21Target
    y21 = 230
    //第三摊
    x30Target = width + 300
    x30 = x30Target
    y31 = 100
    y32 = 230
    //第四摊
    x40Target = width + 300
    x40 = x40Target
    y41 = 100
    y42 = 230
    y43 = 360

}
function draw() {
    //游戏前情提要

    image(imgChatBackground, 0, 0, width, height)

    pyFirst = pyFirst + (yFirst - pyFirst) * easing
    image(imgFirst, 0, pyFirst, imgFirst.width, imgFirst.height)
    pyChat = pyChat + (yChat - pyChat) * easing
    image(imgChat, 0, pyChat, imgChat.width, imgChat.height)

    if (i > 4 & flag == 0) {
        itime += 1
        if (itime == 60) {
            diu.play()
            yChat = yChat - 300
        }
    }
    //游戏开始
    if (flag == 1) {
        yChat = -imgChat.height - 20
        y0 = y0 + (0 - y0) * easing
        y1 = y1 + (0 - y1) * easing
        y2 = y2 + (0 - y2) * easing
        y3 = y3 + (0 - y2) * easing
        y00 = y00 + (0 - y00) * easing
        itime = 1
    }


    //背景
    image(img0, x0, y0, img0.width, img0.height)

    //后景
    if (flagn == 0 || flagn == 1) {
        image(img1noise, x1, y1, img1noise.width, img1noise.height)
    } else {
        image(img1quiet, x1, y1, img1quiet.width, img1quiet.height)
    }

    //前景
    image(img2, x2, y2, img2.width, img2.height)
    /////////////////////////第一摊
    //坏水果
    if (flag2f == 0) {
        image(imgBadFruit, x2, y2, imgBadFruit.width, imgBadFruit.height)
        image(imgAnger, x2, y2, imgAnger.width, imgAnger.height)
    } else if (flag2f == 1) {
        image(imgAnger, x2, y2, imgAnger.width, imgAnger.height)
    } else {
        image(imgHappy, x2, y2, imgHappy.width, imgHappy.height)
    }
    /////////////////////////第二摊
    //卖唱的噪音闪电
    if (flagn == 0) {
        image(img2noise, x2, y2, img2noise.width, img2noise.height)
    }
    /////////////////////////第三摊
    //垃圾
    if (flag2l == 0) {
        image(imgLitter, x2, y2, imgLitter.width, imgLitter.height)
    }
    //收摊
    if (flag2b == 1 || flag2b == 2) {
        image(imgBox, x2, y2, imgBox.width, imgBox.height)
    }
    /////////////////////////第四摊
    //口罩
    if (flag2m == 0) {
        image(imgNoMask, x2, y2, imgNoMask.width, imgNoMask.height)
    } else {
        image(imgMask, x2, y2, imgMask.width, imgMask.height)
    }
    //天然气
    if (flag2g == 0) {
        image(imgGasFall, x2, y2, imgGasFall.width, imgGasFall.height)
    } else {
        image(imgGasUp, x2, y2, imgGasUp.width, imgGasUp.height)
    }
    //电线
    if (flag2w == 0) {
        image(imgWireOutOfOrder, x2, y2, imgWireOutOfOrder.width, imgWireOutOfOrder.height)
    } else {
        image(imgWireInOrder, x2, y2, imgWireInOrder.width, imgWireInOrder.height)
    }
    if (flag2m == 2 & flag2w == 2 & flag2g == 2) {
        image(imgHotdog, x2, y2, imgHotdog.width, imgHotdog.height)
    }


    //马路
    if (flag2b == 0) {
        image(img3Wrong, x3, y3, img3Wrong.width, img3Wrong.height)
    } else {
        image(img3Right, x3, y3, img3Right.width, img3Right.height)
    }

    //自行车
    if (flag2b == 1 || flag2b == 2) {
        if (flag2l == 2) {
            xBike -= 10
            xBike = constrain(xBike, -500, width)
        }

        image(imgBikeRide, xBike, yBike, imgBikeRide.width / 3, imgBikeRide.height / 3)
    } else {
        xBike = x3 + 2680
        yBike = height - imgBikeStop.height / 3 - 10
        image(imgBikeStop, xBike, yBike, imgBikeStop.width / 3, imgBikeStop.height / 3)
    }

    //街道名字
    image(img00, x00 + width / 2 - img00.width / 6, y00 + height / 2 - img00.height / 6 - 50, img00.width / 3, img00.height / 3)



    //对话框
    if ((x2 - x2Target) < 1 & flag != 0 & flag != 1 & flag != 3 & flag != 5 & flag != 7) {
        fill(20)
        textSize(10)
        image(img4, x2, y2, img4.width, img4.height)
        if (flagBiji == 0) {
            biji.play()
            flagBiji = 1
        }
        if (flag == 2) {

            text('老板您看看您这水', 474, 235)
            text('果质量是认真的吗', 474, 250)

        }
        if (flag == 4) {
            text('天哪这个音乐', 670, 160)
            text('声太吵了！！', 670, 175)
        }
        if (flag == 6) {
            text('这样直接在马路', 820, 335)
            text('上摆摊不好吧', 820, 350)
        }
        if (flag == 8) {
            text('宝子你能帮忙看看', 547, 130)
            text('我这的安全问题吗', 547, 145)
        }
        if (flag == 9 & rectY > height) {
            text('谢谢你呀宝子', 547, 135)
            text('奖励你一个热狗', 547, 150)
        }

    }

    //进度条
    noStroke()
    fill(255, 220, 220)
    n = constrain(n, 0, nn)
    rectSTarget = (width - rectX * 2) / nn * n
    rectY = rectY + (rectYTarget - rectY) * easing
    rectS = rectS + (rectSTarget - rectS) * easing
    rect(rectX, rectY, width - rectX * 2, 10)
    fill(255, 10, 100)
    rect(rectX, rectY, rectS, 10)





    //
    x0 = x0 + (x0Target - x0) * easing////////
    x1 = x1 + (x1Target - x1) * easing////////
    x2 = x2 + (x2Target - x2) * easing//重复//
    x3 = x3 + (x3Target - x3) * easing////////修改Target,起到移动作用（背景后景前景马路）




    //工具使用
    if (flag == 2) {
        x00 = x00 + (x00Target - x00) * easing

        x11 = x11 + (x11Target - x11) * easing
        if (flag11 == 0) {
            x11 = x11
        } else if (flag11 == 1) {
            x11 = mouseX - 50
            y11 = mouseY - 50
            clickedplaying(330, 170, 460, 230, mouseX, mouseY)
            if (time0 == 0) {
                flag11 = 2
            }
        } else if (flag11 == 2) {
            x11 = width
            y11 = height
            flag2f = 1
        }
        image(img11, x11, y11, img11.width / 2, img11.height / 2)//收拾烂水果
    }

    if (flag == 4) {
        x21 = x21 + (x21Target - x21) * easing
        if (flag21 == 0) {
            x21 = x21
        } else if (flag21 == 1) {
            x21 = mouseX - 50
            y21 = mouseY - 50
            clickedplaying(370, 340, 430, 450, mouseX, mouseY)
            if (time0 == 0) {
                flag21 = 2
            }
        } else if (flag21 == 2) {
            x21 = width
            y21 = height
            flagn = 1
        }
        image(img21, x21, y21, img21.width / 2, img21.height / 2)//减小音量
    }

    if (flag == 6) {
        x30 = x30 + (x30Target - x30) * easing
        if (flag31 == 0) {
            x31 = x30
        } else if (flag31 == 1) {
            x31 = mouseX - 50
            y31 = mouseY - 50
            clickedplaying(100, 370, 270, 430, mouseX, mouseY)
            if (time0 == 0) {
                flag31 = 2
            }
        } else if (flag31 == 2) {
            x31 = width
            y31 = height
            flag2l = 1
        }//扫把
        if (flag32 == 0) {
            x32 = x30
        } else if (flag32 == 1) {
            x32 = mouseX - 50
            y32 = mouseY - 50
            clickedplaying(515, 510, 855, 600, mouseX, mouseY)
            if (time0 == 0) {
                flag32 = 2
            }
        } else if (flag32 == 2) {
            x32 = width
            y32 = height
            flag2b = 1
        }//箱子
        image(img31, x31, y31, img31.width / 2, img31.height / 2)//扫把
        image(img32, x32, y32, img32.width / 2, img32.height / 2)//箱子
    }
    if (flag == 8) {

        x40 = x40 + (x40Target - x40) * easing
        if (flag41 == 0) {
            x41 = x40
        } else if (flag41 == 1) {
            x41 = mouseX - 50
            y41 = mouseY - 50
            clickedplaying(320, 110, 360, 220, mouseX, mouseY)
            if (time0 == 0) {
                flag41 = 2
            }//电线
        } else if (flag41 == 2) {
            x41 = width
            y41 = height
            flag2w = 1

        }
        if (flag42 == 0) {
            x42 = x40
        } else if (flag42 == 1) {
            x42 = mouseX - 50
            y42 = mouseY - 50
            clickedplaying(590, 210, 680, 260, mouseX, mouseY)
            if (time0 == 0) {
                flag42 = 2
            }//煤气瓶
        } else if (flag42 == 2) {
            x42 = width
            y42 = height
            flag2g = 1
        }
        if (flag43 == 0) {
            x43 = x40
        } else if (flag43 == 1) {
            x43 = mouseX - 50
            y43 = mouseY - 50
            time0++
            clickedplaying(460, 130, 530, 200, mouseX, mouseY)
            if (time0 == 0) {
                flag43 = 2
            }//口罩
        } else if (flag43 == 2) {
            x43 = width
            y43 = height
            flag2m = 1
        }
        image(img41, x41, y41, img41.width / 2, img41.height / 2)//收拾插座电线
        image(img42, x42, y42, img42.width / 2, img42.height / 2)//扶起煤气瓶
        image(img43, x43, y43, img43.width / 2, img43.height / 2)//戴口罩
    }


    //切换至结尾聊天
    if (flag == 10) {
        y0 = y0 + (-height - 10 - y0) * easing
        y1 = y1 + (-height - 10 - y1) * easing
        y2 = y2 + (-height - 10 - y2) * easing
        y3 = y3 + (-height - 10 - y2) * easing
    }
    if (i > 4 & flag == 10) {
        itime += 1
        if (itime == 70) {
            diu.play()
            yChat2 = yChat2 - 120
        }
    }//此时【点击查看图片】的消息弹出
    pyChat2 = pyChat2 + (yChat2 - pyChat2) * easing
    image(imgChat2, 0, pyChat2, imgChat2.width, imgChat2.height)

    //结尾图片
    y5 = y5 + (y5Target - y5) * easing
    noStroke()
    fill(250)
    rect(width / 2 - 460, y5 + height / 2 - 260, 920, 520)
    fill(255)
    rect(width / 2 - 450, y5 + height / 2 - 250, 900, 500)
    for (y = 50; y < 550; y += 50) {
        for (x = 50; x < 950; x += 50) {
            image(img5, x, y5 + y, img5.width, img5.height)
        }
    }
    fill(250)
    rect(width / 2 - 150, y5 + height / 2 - 100 - 50, 300, 100)
    rect(width / 2 - 250, y5 + height / 2 + 75 - 75, 500, 150)
    fill(255, 80)
    rect(width / 2 - 450, y5 + height / 2 - 250, 900, 500)
    image(imgZan, 0, y5, imgZan.width, imgZan.height)

}



function mousePressed() {
    //位置共享前起作用
    if (itime == 0) {
        if (i == 0) {
            yChat = yChat - 100
            yFirst -= 600
        } else if (i == 1) {
            yChat = yChat - 90
        } else if (i == 2) {
            yChat = yChat - 130
        } else if (i == 3) {
            yChat = yChat - 80
        } else if (i == 4) {
            yChat = yChat - 90
        } else {
            yChat = yChat
        }
        diu.play()
        i++
    }

    //位置共享出现，只执行一次
    if (itime > 60 & flag == 0) {
        flag = 1
        itime += 0
        i = 0
    }
    //第一题切换，只执行一次
    if (flag == 1 & itime == 1) {
        flag = 2
        y0 = 0
        y1 = 0
        y2 = 0
        y3 = 0
        //背景后景前景马路 坐标控制
        x0Target -= 200
        x1Target -= 480
        x2Target -= 770
        x3Target -= 0
        //标志
        x00Target = -1000//街道门向左边消失
        x11Target = 750//11工具出现
        rectYTarget = 478//进度条
        nn = 1////////////////////////////////单数flag重设nn
    }
    if (flag == 2) {
        //第一题
        if (flag11 == 0 & mouseX > x11 & mouseX < x11 + 100 & mouseY > y11 & mouseY < y11 + 100) {
            flag11 = 1
        }
        // //口罩坐标
        completed(rectX, rectS)
    }

    //第二题切换
    if (rectY > height & flag == 3) {
        //背景后景前景马路 坐标控制
        x0Target -= 400
        x1Target -= 650
        x2Target -= 920
        x3Target -= 1000

        x21Target = 750

        n = 0
        rectS = 0
        rectYTarget = 478

        flagBiji = 0

        flag = 4
    }
    if (flag == 4) {
        if (flag21 == 0 & mouseX > x21 & mouseX < x21 + 100 & mouseY > y21 & mouseY < y21 + 100) {
            flag21 = 1
        }
        completed(rectX, rectS)
    }


    //第三题切换
    if (rectY > height & flag == 5) {
        //背景后景前景马路 坐标控制
        x0Target -= 400
        x1Target -= 450
        x2Target -= 1110
        x3Target -= 1400

        x30Target = 750

        n = 0
        nn = 2
        rectS = 0
        rectYTarget = 478

        flagBiji = 0

        flag = 6

    }
    if (flag == 6) {
        if (flag31 == 0 & mouseX > x31 & mouseX < x31 + 100 & mouseY > y31 & mouseY < y31 + 100) {
            flag31 = 1
        }
        if (flag32 == 0 & mouseX > x32 & mouseX < x32 + 100 & mouseY > y32 & mouseY < y32 + 100) {
            flag32 = 1
        }
        completed(rectX, rectS)
    }

    //第四题切换
    if (rectY > height & flag == 7) {
        //背景后景前景马路 坐标控制
        x0Target -= 400
        x1Target -= 600
        x2Target -= 905
        x3Target -= 1000

        x40Target = 750

        n = 0
        nn = 3
        rectS = 0
        rectYTarget = 478

        flagBiji = 0

        flag = 8

    }
    if (flag == 8) {
        if (flag41 == 0 & mouseX > x41 & mouseX < x41 + 100 & mouseY > y41 & mouseY < y41 + 100) {
            flag41 = 1
        }
        if (flag42 == 0 & mouseX > x42 & mouseX < x42 + 100 & mouseY > y42 & mouseY < y42 + 100) {
            flag42 = 1
        }
        if (flag43 == 0 & mouseX > x43 & mouseX < x43 + 100 & mouseY > y43 & mouseY < y43 + 100) {
            flag43 = 1
        }
        completed(rectX, rectS)
    }
    if (rectY > height & flag == 9) {
        flag = 10
    }

    //结尾聊天冒泡距离
    if (flag == 10) {
        if (i < 5) {
            if (i == 0) {
                yChat2 = yChat2 - 110
            } else if (i == 1) {
                yChat2 = yChat2 - 85
            } else if (i == 2) {
                yChat2 = yChat2 - 85
            } else if (i == 3) {
                yChat2 = yChat2 - 100
            } else if (i == 4) {
                yChat2 = yChat2 - 91
            } else {
                yChat2 = yChat2
            }
            diu.play()
            i++
        } else if (itime > 60) {
            y5Target = 0
        }

    }
}



//鼠标已控制工具位置，点击正确或错误位置的音效
function clickedplaying(beginX, beginY, endX, endY, mX, mY) {
    time0++
    if (time0 > 300) {
        fill(255, 150)
        let r = min(endX - beginX, endY - beginY)
        ellipse((beginX + endX) / 2, (beginY + endY) / 2, r, r)
    }
    if (mouseIsPressed == true) {
        if (mX > beginX & mX < endX & mY > beginY & mY < endY) {
            time0 = 0
            right.play()
            n++
        } else {
            if (time0 > 20) {
                wrong.play()
            }
        }
    }
}

//进度条满了，点击降落，同时有音效，flag++
function completed(rectX, rectS) {
    if ((width - rectX * 2 - rectS) < 1) {
        complete.play()
        rectYTarget = height + 100
        flag += 1
    }
    if (flag == 3) {
        flag2f = 2
    }
    if (flag == 5) {
        flagn = 2
    }
    if (flag == 7) {
        flag2l = 2
        flag2b = 2
    }
    if (flag == 9) {
        flag2m = 2
        flag2w = 2
        flag2g = 2
    }
}
//游戏规则重申：
//A D 二键控制左右门关闭
//mistake++情况：1.不同色的球进门，2.阻挡了同色的球进门
//score++情况  ：同色的球进门
//游戏失败：当mistake大于4
//游戏成功：当score达到8
//难度增加情况  ：score达到4，增加中间黑球“黑鬼”，必须两个门神齐力阻挡，即两扇门一起关闭

//游戏彩蛋：春联来历与门神有关，春联隐约可以看出二神的名字。旁边的桃树呼应门神传说。
//         贴门神形象讲究“左神荼右郁垒”，二者相对视，神荼执金戢，郁垒伴白虎

//以下draw里的注释 分五个阶段备注 介绍代码。例如：//////////////一阶段：设置好背景

class Ghost {
  constructor(x, y, r, g, b) {
      this.pos = createVector(x, y)

      this.r = r
      this.g = g
      this.b = b


      this.dir = createVector(0, -1.5)

      this.dia = 55

      this.t = 255
  }
  show() {

      noStroke()


      if (this.pos.y <= height & this.pos.y >= 0) {
          this.pos.x = 0.997 * this.pos.x
          this.dia = 0.999 * this.dia
      }
      fill(0, 20)
      ellipse(this.pos.x, this.pos.y + 30, this.dia, 0.6 * this.dia)
      fill(this.r, this.g, this.b, this.t)
      ellipse(this.pos.x, this.pos.y, this.dia, this.dia)


  }
  fall() {
      if (this.pos.y <= height & this.pos.y >= 0) {
          this.dir.y = 0.999 * this.dir.y
      }
      this.pos.add(this.dir)
  }
}

//赛道颜色
let colorLeft
let colorRight

//左右“小鬼”
let lx, ly, rx, ry, lc, rc
let pry//一个“虚”右边小鬼坐标
let leftEnemy = []
let rightEnemy = []
let leflag = []
let reflag = []
//后期增加的“黑鬼”
let midEnemy = []
let midflag = []
let midfburn = 0
let my = 700

//分数计数
let score = 0
let mistake = 0
//判断左右开关状态的参数，等于1代表开
let lp = 1
let rp = 1
//色彩库
let c = []
//图片定义
let imgBackground
let imgTree
let imgLeftOpen
let imgLeftClose
let imgRightOpen
let imgRightClose
let imgWin
let imgLose
let imgStart
//游戏状态
let gameStart = 0

let grid = 220
let get = 100
let stayY
let stayX=0


function preload() {

  imgBackground = loadImage("https://i.loli.net/2020/06/11/8luPOwtAsp23W4C.png")
  imgTree = loadImage("https://i.loli.net/2020/06/11/X3CSD7eIJW9qR1B.png")
  imgLeftOpen = loadImage("https://i.loli.net/2020/06/11/ice1rXLKNSD8kIu.png")
  imgLeftClose = loadImage("https://i.loli.net/2020/06/11/ZfAR28H6onPcua1.png")
  imgRightOpen = loadImage("https://i.loli.net/2020/06/11/3GIY9eiLAKguqlt.png")
  imgRightClose = loadImage("https://i.loli.net/2020/06/11/dOBf5aFRunvTN8A.png")
  imgWin = loadImage("https://i.loli.net/2020/06/11/Zcw3IF1YQsonDzJ.png")
  imgLose = loadImage("https://i.loli.net/2020/06/11/XwWa23kdxmKnzCT.png")
  imgStart = loadImage("https://i.loli.net/2020/06/11/ma7JigYd8uxQTIH.png")
}


function setup() {

  //建立画布
  createCanvas(800, 600)
  //定义一个“虚”右边小鬼坐标
  pry = height
  stayY = width
  
  //色彩库输入数据，每三个数据一组RGB
  c[0] = 86
  c[1] = 97
  c[2] = 188
  c[3] = 200
  c[4] = 86
  c[5] = 111
  c[6] = 59
  c[7] = 133
  c[8] = 117
  c[9] = 52
  c[10] = 104
  c[11] = 144

  //左右各三十个“小鬼”
  //定义每个“小鬼”颜色
  //赋予状态值，有助于分数计数
  ry = pry//ry载入“虚”的右边小鬼坐标
  for (let i = 0; i < 30; i++) {
      leflag[i] = 0//赋予状态值0，触发分数计数后会变成1，避免重复计数
      reflag[i] = 0
      lc = floor(random(0, 4)) * 3
      ly = ry + random(120, 180)
      lx = - width / 4//lx在进入画布前的初始值，进入画布后根据“enemy”类的程序向中心轴偏移
      leftEnemy[i] = new Ghost(lx, ly, c[lc], c[lc + 1], c[lc + 2])
      rc = floor(random(0, 4)) * 3
      ry = ly + random(120, 180)
      rx = + width / 4
      rightEnemy[i] = new Ghost(rx, ry, c[rc], c[rc + 1], c[rc + 2])
  }

}









function draw() {
//////////////一阶段：设置好背景
  //移动坐标轴，为了方便 左右“小鬼”在画布上偏移
  translate(width / 2, 0)
  //设定背景图片
  image(imgBackground, -width / 2, 0, imgBackground.width, imgBackground.height)

  noStroke()
  if (colorLeft == colorRight) {
      colorLeft = floor(random(0, 4)) * 3
  }//////为了使colorLeft不等于colorRight，加上后面代码里有关的代码，假如这个情况发生，意味colorLeft被定义3次了，主要作用只能减小colorLeft等于colorRight可能性。
  //赛道
  fill(c[colorLeft], c[colorLeft + 1], c[colorLeft + 2])
  beginShape()
  vertex(0, get)
  vertex(-75, get)
  vertex(-340, height)
  vertex(0, height)
  endShape(CLOSE)
  fill(c[colorRight], c[colorRight + 1], c[colorRight + 2])
  beginShape()
  vertex(0, get)
  vertex(75, get)
  vertex(340, height)
  vertex(0, height)
  endShape(CLOSE)
  //树
  image(imgTree, -width / 2, 0, imgTree.width, imgTree.height)

//////////////二阶段：lp,rp值 影响分数计数机制，小球位移变换
  //键盘“A”“D”键控制左右门开关
  if (keyIsPressed) {
      if (keyCode == 65) {

          lp = 0

      }
      if (keyCode == 68) {
          rp = 0

      }
  } else {
      lp = 1//左门开
      rp = 1
  }
  //以左边参数为例说明
  //c[colorLeft]------赛道颜色R值
  //leftEnemy[i].r----左边小鬼的颜色R值
  //leflag[i] --------状态值  == 0--未到达特定区状态  ==1----已触发特定区域
  //以此来发生计数一次，避免重复计数
  //lp----------------开关门时的特定区域不同
  for (let i = 0; i < 30; i++) {
      if (lp == 1) {
          if (leftEnemy[i].pos.y < get & leflag[i] == 0) {
              if (c[colorLeft] == leftEnemy[i].r) {
                  score++
              } else {
                  mistake++
              }
              leflag[i] = 1
              leftEnemy[i].dir = createVector(0, 0)
              leftEnemy[i].pos.x = stayX
              leftEnemy[i].pos.y = stayY
          }
      } else {
          if (leftEnemy[i].pos.y > grid - 10 & leftEnemy[i].pos.y <= grid & leflag[i] == 0 & lp == 0) {//左门关起的情况
              if (c[colorLeft] == leftEnemy[i].r) {
                  mistake++
              } else {
                  mistake = mistake
              }
              leflag[i] = 1
              leftEnemy[i].dir = createVector(0, 0)
              leftEnemy[i].pos.x = stayX
              leftEnemy[i].pos.y = stayY
          }
      }
  }
  //右边
  for (let i = 0; i < 30; i++) {
      if (rp == 1) {
          if (rightEnemy[i].pos.y < get & reflag[i] == 0) {
              if (c[colorRight] == rightEnemy[i].r) {
                  score++
              } else {
                  mistake++
              }
              reflag[i] = 1
              rightEnemy[i].dir = createVector(0, 0)
              rightEnemy[i].pos.x = stayX
              rightEnemy[i].pos.y = stayY
          }
      } else {
          if (rightEnemy[i].pos.y > grid - 10 & rightEnemy[i].pos.y < grid & reflag[i] == 0) {
              if (c[colorRight] == rightEnemy[i].r) {
                  mistake++
              } else {
                  mistake = mistake
              }
              reflag[i] = 1
              rightEnemy[i].dir = createVector(0, 0)
              rightEnemy[i].pos.x = stayX
              rightEnemy[i].pos.y = stayY
          }
      }
  }

  //分数 错误次数
  fill(150, 100, 150)
  textSize(17)
  text(score, -width / 2 + 140, 100)
  text(mistake, -width / 2 + 140, 130)
  textSize(20)
  text("score", -width / 2 + 80, 100)
  text("mistake", -width / 2 + 60, 130)
  
  
//////////////三阶段：restart的有关代码，重新开始游戏可以点击未开始、成功、失败的界面开始游戏，并且重新设定有关游戏元素（赛道，小鬼）参数初始值
  //gameStart=0----还未开始游戏的状态
  //gameStart=1----正在游戏的状态
  //gameStart=2----游戏失败
  //gameStart=3----游戏成功

  //0，2，3状态时鼠标点击可以切换回1的状态，重新设定“小鬼”数组的值（初始位置）。
  if (mouseIsPressed & (gameStart == 0 || gameStart == 2 || gameStart == 3)) {

      gameStart = 1
      //以下与setup里的相同
      ry = pry
      for (let i = 0; i < 30; i++) {
          leflag[i] = 0
          reflag[i] = 0
          lc = floor(random(0, 4)) * 3
          ly = ry + random(120, 180)
          lx = - width / 4
          leftEnemy[i] = new Ghost(lx, ly, c[lc], c[lc + 1], c[lc + 2])
          rc = floor(random(0, 4)) * 3
          ry = ly + random(120, 180)
          rx = + width / 4
          rightEnemy[i] = new Ghost(rx, ry, c[rc], c[rc + 1], c[rc + 2])
      }

  }
  //0，2，3状态时分别显示不同图片，并且都在随机刷新赛道颜色
  if (gameStart == 0 || gameStart == 2 || gameStart == 3) {
      colorLeft = floor(random(0, 4)) * 3
      colorRight = floor(random(0, 4)) * 3
      if (colorLeft == colorRight) {
          colorLeft = floor(random(0, 4)) * 3
      }
      if (gameStart == 0) {
          image(imgStart, -width / 2, 0, imgStart.width, imgStart.height)
      }
      if (gameStart == 2) {
          image(imgWin, -width / 2, 0, imgWin.width, imgWin.height)
      }
      if (gameStart == 3) {
          image(imgLose, -width / 2, 0, imgLose.width, imgLose.height)
      }
  }
////////////////四阶段：左中右“小鬼”移动更新代码
//分数到达4，midfburn = 0时 创造“黑鬼”，midfburn = 1实行“黑鬼”移动效果
  if (score >= 4 & score <= 8) {
      
      if (midfburn == 0) {
          midfburn = 1
          for (let i = 0; i < 30; i++) {
              midflag[i] = 0
              midEnemy[i] = new Ghost(0, my, 0, 0, 0)
              my = my + random(300, 600)
          }
      } else {
          for (let i = 0; i < 30; i++) {
              midEnemy[i].show()
              midEnemy[i].fall()
          }
          for (let i = 0; i < 30; i++) {
              if (rp == 0 & lp == 0) {
                  if (midEnemy[i].pos.y > grid - 10 & midEnemy[i].pos.y < grid & midflag[i] == 0) {
                      mistake = mistake
                      midflag[i] = 1
                      midEnemy[i].dir = createVector(0, 0)
                      midEnemy[i].pos.x = stayX
                      midEnemy[i].pos.y = stayY
                  }

              } else {
                  if (midEnemy[i].pos.y < get & midflag[i] == 0) {
                      mistake++
                      midflag[i] = 1

                      midEnemy[i].pos.x = stayX
                      midEnemy[i].pos.y = stayY
                      midEnemy[i].dir = createVector(0, 0)

                  }
              }
          }
      }
  }

  //gameStart=0----还未开始游戏的状态
  //gameStart=1----正在游戏的状态
  //gameStart=2----游戏失败
  //gameStart=3----游戏成功
      //当gamestart==1进入可游戏状态，
      //更新“小鬼”位置，小鬼移动并缩小
      //左右门开关的发生
      //以上两者根据lp，rp状态值，排布两者先后发生顺序。原因：图案绘制忘记考虑小球经过路线，否则会导致奇怪的现象
   if (gameStart == 1) {
      if (lp == 1) {
          lDoor(lp)
          for (let i = 0; i < 30; i++) {
              leftEnemy[i].show()
              leftEnemy[i].fall()
          }
      } else {

          for (let i = 0; i < 30; i++) {
              leftEnemy[i].show()
              leftEnemy[i].fall()
          }
          lDoor(lp)
      }

      if (rp == 1) {
          rDoor(rp)
          for (let i = 0; i < 30; i++) {
              rightEnemy[i].fall()
              rightEnemy[i].show()
          }
      } else {
          for (let i = 0; i < 30; i++) {
              rightEnemy[i].fall()
              rightEnemy[i].show()
          }
          rDoor(rp)
      }
  }
  
////////////////五阶段：游戏成功或失败，画面内的左中右“小鬼”都要停止运动并且呆在画布外某一位置，并且更新gameStart状态值，score mistake 清零，并且midfburn回归初始值0。
  //score 达到8时，游戏成功
  if (score == 8) {
      for (let i = 0; i < 30; i++) {

          midEnemy[i].dir = createVector(0, 0)
          midEnemy[i].pos = createVector(stayX, stayY)

          rightEnemy[i].dir = createVector(0, 0)
          leftEnemy[i].dir = createVector(0, 0)

          rightEnemy[i].pos = createVector(stayX, stayY)
          leftEnemy[i].pos = createVector(stayX, stayY)
      }
      gameStart = 2
      score = 0
      mistake = 0
      midfburn = 0
  }
  //mistake最大值为3，超过则游戏失败
  if (mistake == 4) {
      for (let i = 0; i < 30; i++) {
          if (score >= 5 & score <= 9) {
              midEnemy[i].dir = createVector(0, 0)
              midEnemy[i].pos = createVector(stayX, stayY)
          }
          rightEnemy[i].dir = createVector(0, 0)
          leftEnemy[i].dir = createVector(0, 0)
          rightEnemy[i].pos = createVector(stayX, stayY)
          leftEnemy[i].pos = createVector(stayX, stayY)
      }
      gameStart = 3
      score = 0
      mistake = 0
      midfburn = 0
  }
  print(gameStart,score,mistake)//用于测试游戏
}
//////////////////draw终于结束了嘎嘎嘎


//左门状态
function lDoor(lp) {
  fill(c[colorRight], c[colorRight + 1], c[colorRight + 2], 100)
  if (lp == 1) {

      image(imgLeftOpen, -width / 2, 0, imgLeftOpen.width, imgLeftOpen.height)
  } else {

      image(imgLeftClose, -width / 2, 0, imgLeftClose.width, imgLeftClose.height)
  }
}
//右门状态
function rDoor(rp) {
  fill(c[colorLeft], c[colorLeft + 1], c[colorLeft + 2], 100)
  if (rp == 1) {

      image(imgRightOpen, -width / 2, 0, imgRightOpen.width, imgRightOpen.height)
  } else {

      image(imgRightClose, -width / 2, 0, imgRightClose.width, imgRightClose.height)
  }
}
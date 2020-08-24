//重大申明：背景图是符合自己喜欢的风格的网搜图，并非原创，改动了面部表情。

let img1;
let img2;
let img3;
let img4;

let easing = 0.05;

let mx = 220;
let my = 370;
let bx = 320;
let by = 370;

let y1 = 0;
let x1 =540;

function setup() {
  createCanvas(540, 620);
  background(100,40,40);
  // 加载图像
  img1 = loadImage('https://cdn.jsdelivr.net/gh/ZHEGExyy/front/beij.jpg');
  img2 = loadImage('https://cdn.jsdelivr.net/gh/ZHEGExyy/front/嘴巴.png');
  img3 = loadImage('https://i.loli.net/2020/06/01/ulJOZ9msSUj8FRw.png');
  img4 = loadImage('https://i.loli.net/2020/06/01/PtjU2FIAvO6cHYq.png');
  
  rectMode(CENTER)
}

function draw() {
  background(100,40,40);
  image(img1, 0, 0, img1.width  , img1.height  );

  //眼睛部分  眼珠随鼠标转动
  strokeWeight(3);
  stroke(92,26,30);
  fill(255);
  ellipse(width/2-41,370,41,20);//左眼眶
  ellipse(width/2+39,370,41,20);//右眼眶
  if (abs(mouseX - mx) > 0.1) {
    mx = mx + (mouseX - mx) * easing;
  }
  if (abs(mouseY - my) > 0.1) {
    my = my + (mouseY - my) * easing;
  }
  if (abs(mouseX - bx) > 0.1) {
    bx = bx + (mouseX - bx) * easing;
  }
  if (abs(mouseY - by) > 0.1) {
    by = by + (mouseY - by) * easing;
  }
  mx = constrain(mx, width/2-51, width/2-31);
  my = constrain(my, 370-3, 370+3);
  bx = constrain(bx, width/2+29, width/2+49);
  by = constrain(by, 370-3, 370+3);
  fill(92,26,30);
  ellipse(mx, my, 10, 10);//左眼珠
  ellipse(bx, by, 10, 10);//右眼珠

  //点击鼠标，供品降落
  image(img4, x1, y1, img4.width/4, img4.height/4);
  y1 = y1+1;
  if(mouseIsPressed == true){
     x1 = random(0,520);
     y1 = -img4.height/4  ;
  }

  //供品随鼠标左右移动
  if(x1<520){
    if(mouseX<(x1+65.6)){
    x1=x1-1;
    }
    if(mouseX>(x1+65.6)){
    x1=x1+1;
    }
  }
  
  //桌子
  fill(200);
  rect(270,620,150,80);
  rect(270,580,200,20);
  

  //供品落桌，笑脸
  if(x1<370 & x1>170 &  y1>508){
    
    y1=508;
    x1=250;
    image(img1, 0, 0, img1.width  , img1.height  );//背景
    image(img2, 0, 50, img2.width  , img2.height  );//嘴角
    image(img3, 185, 460, img3.width/4  ,img3.height/4  );//元宝
    rect(270,620,150,80);
    rect(270,580,200,20);//桌子
  } 
}
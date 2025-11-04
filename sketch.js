let t = 0.0;
let vel = 0.02;
let num;
let paletteSelected;
let paletteSelected1;
let paletteSelected2;
let menuVisible = false;
let menuItems = ['第一單元作品連結', '第一單元作品筆記', '測驗考試系統', '期中作業筆記'];
let profileImg = null; // <- 請將 photo.jpg 放在專案根目錄 (與 index.html 同一層)
let menuColors = ['#4a4e69', '#9a8c98', '#588157', '#2b7a78'];

function setup() {
    createCanvas(windowWidth, windowHeight);
    pixelDensity(2);
    angleMode(DEGREES);
    num = random(100000);
    paletteSelected = random(palettes);
    paletteSelected1 = random(palettes);
    paletteSelected2 = random(palettes);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function preload(){
    // 嘗試載入名為 photo.png 的照片（若不存在則不顯示）
    // 使用者請將照片命名為 photo.png 並放到專案根目錄
    profileImg = loadImage('photo.png', () => {}, () => { profileImg = null; });
}

function draw() {
    randomSeed(num);
    background(bgCol());
    stroke("#355070");
    circlePacking();
   
    // --- 中央自我介紹區塊（白底黑字）: 正方形，大圖在底部 ---
    let boxHeight = min(width, height) * 0.5; // 正方形邊長，視窗大小自適應
    let boxWidth = min(width, height) * 0.5 * 0.75;
    push();
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    // 白色框（長方形，圓角）
    fill('rgba(100%, 100%, 100%, 0.3)');
    stroke(0);
    strokeWeight(2);
    rect(width/2, height/2, boxWidth, boxHeight , 12);

    // 自我介紹文字（黑色）放在方塊上方區域
    fill("#000000ff");
    stroke("#ffffff98")
    textSize(28);
    let offset = boxHeight / 10;
    let textTopY = height/2 - boxHeight/2 + offset;
    text('教育科技A班', width/2, textTopY);
    text('許詠鈐', width/2, textTopY + offset);
    text('414730092', width/2, textTopY + offset * 2);

    // 若有照片，顯示在白框下方（方塊內底部，置中且放大）
    if (profileImg) {
        push();
        imageMode(CENTER);
       
        // 圖片寬高設定為方塊寬度的 70%
        profileImg.resize(parseInt(boxWidth *  0.55), 0);

        // 圖片 Y 放在方塊底部內側
        image(profileImg, width / 2 ,  textTopY + offset * 5.5 );
        pop();
    }
    pop();
   
    // 檢查滑鼠位置並顯示選單（左側）
    if (mouseX < width * 0.2) {
        menuVisible = true;
    } else {
        menuVisible = false;
    }
   
    // 繪製選單
    if (menuVisible) {
        drawMenu();
    }
}

function drawMenu() {
    let menuX = 0;
    let menuWidth = width * 0.2;
    let itemHeight = 50;
   
    // 選單背景
    fill(255, 255, 255, 220);
    noStroke();
    rect(menuX, 0, menuWidth, height);

    // 選單標題（大字）
    textAlign(CENTER, TOP);
    textSize(28);
    fill(0);
    text('選單', menuX + menuWidth / 2, 16);
   
    // 選單項目（自訂顏色陣列）
    textSize(20);
    textAlign(CENTER, CENTER);
    for (let i = 0; i < menuItems.length; i++) {
        let y = height * 0.15 + i * itemHeight;
        // 決定顏色（若 menuColors 不夠長，使用最後一個顏色）
        let col = menuColors[i] || menuColors[menuColors.length - 1];
        // 檢查滑鼠是否懸停在選單項目上，若懸停則將文字變深
        if (mouseX > menuX && mouseX < menuX + menuWidth &&
            mouseY > y && mouseY < y + itemHeight) {
            // 以黑色加強懸停效果
            fill(0);
        } else {
            fill(col);
        }
        text(menuItems[i], menuX + menuWidth/2, y + itemHeight/2);
    }
}

// 新增：當選單可見且點選某一項時處理連結（點選「淡江大學」開新分頁）
function mousePressed() {
    // 只有在選單顯示時才處理
    if (!menuVisible) return;

    let menuX = 0;
    let menuWidth = width * 0.2;
    let itemHeight = 50;

    // 確認點擊在選單區域內
    if (!(mouseX > menuX && mouseX < menuX + menuWidth)) return;

    // 計算點擊的項目索引
    let idx = floor((mouseY - height * 0.15) / itemHeight);
    if (idx < 0 || idx >= menuItems.length) return;

    let label = menuItems[idx];
    if (label === '期中作業筆記') {
        window.open('https://hackmd.io/@ZnnkzZffSzSuGRRbEzKzjA/SykocQARgl', '_blank');
    } else if (label === '第一單元作品連結') {
        window.open('https://skilar0313-pixel.github.io/20251014/', '_blank');
    } else if (label === '第一單元作品筆記') {
        window.open('https://hackmd.io/@ZnnkzZffSzSuGRRbEzKzjA/SkVxtdknxe', '_blank');
    } else if (label === '測驗考試系統') {
        window.open('https://skilar0313-pixel.github.io/20251028/', '_blank');
    }
}

function circlePacking() {
    push();
    translate(width / 2, height / 2);
    let points = [];
    let count = 2000;
    for (let i = 0; i < count; i++) {
        let a = random(360);
        let d = random(width * 0.35);
        let s = random(200);
        let x = cos(a) * (d - s / 2);
        let y = sin(a) * (d - s / 2);
        let add = true;
        for (let j = 0; j < points.length; j++) {
            let p = points[j];
            if (dist(x, y, p.x, p.y) < (s + p.z) * 0.6) {
                add = false;
                break;
            }
        }
        if (add) points.push(createVector(x, y, s));
    }
    for (let i = 0; i < points.length; i++) {
        let p = points[i];
        let rot = random(360);
        push();
        translate(p.x, p.y);
        rotate(rot);
        blendMode(OVERLAY);
        let r = p.z - 5;
        gradient(r);
        shape(0, 0, r);
        pop();
    }
    pop();
}

function shape(x, y, r) {
    push();
    noStroke();
    translate(x, y);
    let radius = r;
    let nums = 8;
    for (let i = 0; i < 360; i += 360 / nums) {
        let ex = radius * sin(i);
        let ey = radius * cos(i);
        push();
        translate(ex, ey);
        rotate(atan2(ey, ex));
        distortedCircle(0, 0, r);
        pop();
        stroke(randomCol());
        strokeWeight(0.5);
        line(0, 0, ex, ey);
        ellipse(ex, ey, 2);
    }
    pop();
}

function distortedCircle(x, y, r) {
    push();
    translate(x, y);
    let p1 = createVector(0, -r / 2);
    let p2 = createVector(r / 2, 0);
    let p3 = createVector(0, r / 2);
    let p4 = createVector(-r / 2, 0);
    let val = 0.3;
    let random_a8_1 = random(-r * val, r * val);
    let random_a2_3 = random(-r * val, r * val);
    let random_a4_5 = random(-r * val, r * val);
    let random_a6_7 = random(-r * val, r * val);
    let ran_anker_lenA = r * random(0.2, 0.5);
    let ran_anker_lenB = r * random(0.2, 0.5);
    let a1 = createVector(ran_anker_lenA, -r / 2 + random_a8_1);
    let a2 = createVector(r / 2 + random_a2_3, -ran_anker_lenB);
    let a3 = createVector(r / 2 - random_a2_3, ran_anker_lenA);
    let a4 = createVector(ran_anker_lenB, r / 2 + random_a4_5);
    let a5 = createVector(-ran_anker_lenA, r / 2 - random_a4_5);
    let a6 = createVector(-r / 2 + random_a6_7, ran_anker_lenB);
    let a7 = createVector(-r / 2 - random_a6_7, -ran_anker_lenA);
    let a8 = createVector(-ran_anker_lenB, -r / 2 - random_a8_1);
    beginShape();
    vertex(p1.x, p1.y);
    bezierVertex(a1.x, a1.y, a2.x, a2.y, p2.x, p2.y);
    bezierVertex(a3.x, a3.y, a4.x, a4.y, p3.x, p3.y);
    bezierVertex(a5.x, a5.y, a6.x, a6.y, p4.x, p4.y);
    bezierVertex(a7.x, a7.y, a8.x, a8.y, p1.x, p1.y);
    endShape();
    pop();
}

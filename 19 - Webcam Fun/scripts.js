const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');


// navigator 可以用來查詢當前瀏覽器的相關訊息，並使用一個擴展功能，
// mediaDeivces 使 navigator 的只讀屬性，該對象可以供相機或麥克風等媒體輸入設備的連結訪問。
// mediaDeivces.getUserMedia 會提示用戶給予使用媒體的輸入許可，媒體輸入會產生一個 Media Stream，裡面包含了媒體類型。可以包含一個視頻 / 虛擬視頻 / 音頻 / 或其他類型
// 他會返回一個 Promise 對象，成功 resolve 會回傳一個 Media Stream 對象，若是使用者拒絕了或使媒體無法使用 reject 會回傳一個 PermissionDeniedError or NotFoundError
// 返回的 Promise 可能都不會回傳，因為使用者不需一定要選擇允許或拒絕
// URL.createObjectURL() 建立一個帶有 URL 的 DOMString 代表參數中傳入的物件，而 URL 的生命週期與創造它的 window 中的 document 一樣。
function getVideo(){
    navigator.mediaDevices.getUserMedia({ video : true, audio : false })
        .then( localMediaStream => {
            // 將 Media Stream 物件 轉為 URL 字串
            video.src = window.URL.createObjectURL( localMediaStream );
            // 由於 video 設置了 URL 並不會持續更新影片，只會出現 1 frame，除非讓他執行 play()
            video.play();
        })
        .catch( error =>{
            console.error(`OH NO!!!` , error);
        })
} 

// videoWidth / videoHeight 是屬於 HTMLVideoElement 底下的屬性，以 CSS pixels 的單位給出視頻資源的實際寬/高
// canvas.drawImage(image or video , x , y , width , height) ， 在 canvas 上繪製圖像或視頻
// ctx.getImageDate(x, y, w, h) 取得 canvas 區中最基礎的像素，從 (x,y) 為起點，取得 (w,h) 範圍內的像素資料
// imageDate 物件表示了 canvas 區域中的像素，包含的可屬性 width / height 為影像中的寬度及高度，以 piexls 為單位，另一個可讀屬性為 data
// data 是回傳一個 Uint8ClampedArray 代表一維陣列包含了 RGBA 格式，數值介於 0 -255之間。 每一個 pixel用4個1byte直代表 紅/綠/藍/透明值。
// 組成一個陣列是被分配為一個連續索引，由左到又，再由上到下依序排列，index 0 開始為紅色，然後依序排列RGBA
function paintToCanvas(){
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;
    // 每 16 毫秒就更新一次
    return setInterval(() => {
        ctx.drawImage(video, 0 , 0 ,width , height); 
        // get Image Data
        let pixels = ctx.getImageData(0, 0, width, height);
        // amend Image Data
        // pixels = redEffect(pixels);  // 紅色效果
        pixels = rgbSplit(pixels); // 色彩分離效果
        ctx.globalAlpha = 0.1; // 透明值改變
        // put them back
        ctx.putImageData(pixels, 0, 0);
    },16)
}

// canvas.toDataURL(type, encoderOptions) 將 canvas 的內容內容轉為base64的圖檔資訊
// type 為圖像個是，defult 為 image/png.  
// encoderOptions 表示圖像的品質，為 0-1 之間，如果輸入其他值，將會直接使用預設值，其他的值就忽略 
// 如果 canvas 的高或寬為 0 ，將會回傳字串 "data:,"
// Node.insertBefore() 在節點的位置之前插入一個節點，做一個指定父層的子節點，EX: parentElement.insertBefor(insertElement, referenceElement);
function takePhoto(){
    // 設定執行時的音效.. [喀擦喀擦]
    snap.currentTime = 0;
    snap.play();

    // 將 canvas 中的影像內容轉為圖檔資訊
    const data =canvas.toDataURL('image/jpeg',1);
    const link = document.createElement('a');
    link.href = data ;
    link.setAttribute('download', 'Hey!you');
    link.innerHTML = `<img src="${data}" alt="This is me"/>`;
    // 將 link 插入在 strip 的第一個子節點之前
    strip.insertBefore(link, strip.firstChild);
}

// 紅色濾鏡效果
function redEffect(pixels){
    for(let i = 0 ; i < pixels.data.length; i+=4){
        pixels.data[i + 0] = pixels.data[i + 0] + 150; //r
        pixels.data[i + 1] = pixels.data[i + 1] - 20; //g
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // b
    }
    return pixels;
}

// 色彩分離效果
function rgbSplit(pixels){
    for(let i = 0 ; i < pixels.data.length; i+=4){
        pixels.data[i - 500] = pixels.data[i + 0]+100; //r
        pixels.data[i + 500] = pixels.data[i + 1]+100; //g
        pixels.data[i - 500] = pixels.data[i + 2]+100; // b
    }
    return pixels;
}

getVideo();

// canplay 當可以播放媒體文件時觸發事件
video.addEventListener('canplay',paintToCanvas);



# Javascript 30 - Day 2 Javascript and CSS Clock


利用div跟css做出一個時鐘樣式，在用Javascript取得當下時間，進行動態更新，讓指針指到當下位置。


## 要點
* 指針的旋轉效果
* 每一秒執行時間更新
* 取得當下時間，並設置時針/分針/秒針


## 重點整理

### CSS 設定

`````css
    .hand {
        transform-origin: 100%;
        transition:.2s cubic-bezier(0.01, 1.1, 0.4, 1.24);
        transform: rotate(90deg);
    }
`````

#### `transform-oragin` 改變元素中心點
>`transform-oragin` 是可以更改一個元素的變形起始點，例如當一個物件需要旋轉時，旋轉的中心點是在物件的正中央。
> 所有物件的初始值為：50% 50% 0 ; (X軸 Y軸 Z軸)
> X軸跟Y軸可設定的值：left / center / right / 長度 / 百分比
> Z軸可設定的值：長度

在這個範例中將中心點位置修改為100% or right 讓指針可以依時鐘的中心點旋轉。

#### `transition` 過渡效果
> `transition` 可以在一個元素中不同的狀態效果添加過渡，，是一個簡寫屬性
包含 transition-property / transition-duration / transition-timing-function / transition-delay
> 參數初始值  `transition:all 0s ease 0s` 參數順序  property / duration / timing-function / delay

#### `transition-timing-function` 
> `transition-timing-function` 屬性規定過渡效果的速度曲線
> 參數設定 `linear` 相同速度開始至结束的過渡效果 / `ease` 慢速開始，然後變快之後再減速結束 / `ease-in` 以慢速開始的過渡效果 / `ease-out` 以慢速结束的過渡效果 / `ease-in-out` 慢速開始和结束的過渡效果 / `cubic-bezier(n,n,n,n)` 自定義得值，值皆為0-1

### 設定每秒執行function / 取得現在時間 / 設定指針

`````javascript
    function setDate(){
        const now = new Date(); 

        const sec = now.getSeconds();
        const secondDegrees = ((sec/60)*360) + 90; 
        secondHand.style.transform = `rotate(${secondDegrees}deg)`;

        const min = now.getMinutes(); 
        const minDegrees = ((min/60)*360) + 90; 
        minHand.style.transform = `rotate(${minDegrees}deg)`;

        const hour = now.getHours(); 
        const hourDegrees = ((hour/12)*360) + 90; 
        hourHand.style.transform = `rotate(${hourDegrees}deg)`;
    }

    setInterval(setDate,1000);
`````

#### `setInterval` 
> `setInterval(Function , Seconds)` 以定期的時間不斷呼叫函式。
> 終止呼叫的方式為 `clearInterval()`

利用定期更新的方式，設定每一秒呼叫一次 `setDate()` 的function，讓指針在每一秒能夠進行更新，實現指針轉動的效果。

#### `Date()` 取得時間
> `new Date()` 是建立一個 Date 物件來指向某一個時間點。
> 取得時間的參數 `getSeconds` / `getMinutes` / `getHours` 可以取得 秒數/分鐘/小時

建立Date物件後取得時間。

````` javascript
const sec = now.getSeconds();
`````

* [更多Date屬性](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Date#Date.prototype_方法)

#### 設定指針位置

得到時間後，計算指針旋轉的角度。<br>

一分鐘為60秒除以現在秒數，再乘上360度(一圈的度數)，會得到現在秒數該在的度數，
必須再加上預設的90度，才會等於秒針該有的度數。<br>

取得秒數後再利用 `style.transform` 來賦予指針角度。
`````javascript
const secondDegrees = ((sec/60)*360) + 90; 
secondHand.style.transform = `rotate(${secondDegrees}deg)`;
`````


### 改善旋轉至12時，指針閃退現象

導致這個現象的原因是因為設定了 `transition:.2s`，當指針轉到59秒/59分/11點，要進入到下一秒(分/時)的時候，得到的會是0秒，因此會從 <br>
`((59/60)*360)+90` 轉跳到 `((0/60)*360)+90` <br>
相當於從444度跳回90度，造成閃退的狀況。

#### 解決辦法
將角度持續累加上去，就可以避免該狀況

* 宣告初始值

````` javascript
    let secondDegrees = 0;
    let minDegrees = 0;
    let hourDegrees = 0;
`````

* 初始時間設定

````` javascript
    function initDate(){
        const now = new Date(); 

        const sec = now.getSeconds(); 
        secondDegrees = ((sec/60)*360) + 90; 
        
        const min = now.getMinutes(); 
        minDegrees = ((min/60)*360) + 90; 

        const hour = now.getHours(); 
        hourDegrees = ((hour/12)*360) + 90;
        
        setDate();
    }

    function setDate(){
        secondHand.style.transform = `rotate(${secondDegrees}deg)`;
        minHand.style.transform = `rotate(${minDegrees}deg)`;
        hourHand.style.transform = `rotate(${hourDegrees}deg)`;
    }

    initDate();
`````

* 每秒更新累加角度

`````javascript
    function updateDate(){
        secondDegrees += (1/60)*360; 
        minDegrees += (1/60/60)*360; 
        hourDegrees += (1/12/60/60)*360; 

        setDate();
    }

    setInterval(updateDate,1000);
`````
所有指針皆以每秒更新一次角度，
秒針角度 = 1/60秒*360 = 每秒增加6度
分針角度 = 1/60分/60秒*360 = 每秒增加0.1度
時針角度 = 1/12時/60分/60秒*360 = 每秒增加0.008333..度

______________
### END










# Javascript 30 - Day 1 Javascript Drum Kit 


練習利用JS模擬打鼓的效果，使用者在按下鍵盤上的指定案件後，會發出與頁面上相對應的按鈕指定的聲音與增加按鍵效果。


## 要點
* 偵聽鍵盤按下的事件，確認按下的按鈕。
* 按鍵按下後觸發音檔及視覺效果。
* 當按鍵按住不放時連續播放音效。
* 效果完成後，移除視覺效果


## 重點整理

### HTML 中的 data-* Attribute 屬性
由於製作網頁的過程中，常會需要添加自定義的屬性，為了避免大家隨意的添加，因此HTML5中多了一個 `data-*`的屬性。

位於`-`後面的`*`號可以遵循以下的規則來自定名稱的
1.名字絕對不能以 xml 起頭，無論是否用於 xml。
2.名字絕對不能包含大寫。
3.名字絕對不能包含分號。

頁面透過了`data-key`的值來判斷是否播放音檔及視覺效果
</br>
`````html
  <audio data-key="65" src="sounds/clap.wav"></audio>
`````

### keyCode 鍵盤代碼
將`data-key`的值與按下按鍵後取得的keyCode判斷是否有相對應的物件。

* keyCode查詢 - [http://keycode.info/](http://keycode.info/)

### 監聽事件 / 選取相對應元素 / 執行動畫及音檔
`````javascript
function playAudio(e){
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
  if(!audio) return; 
  
  key.classList.add('playing'); 
  audio.currentTime = 0 ; 
  audio.play();
}

window.addEventListener('keydown',playAudio);
`````

#### DOM `querySelector()` and `querySelectorAll()` 
 `querySelector()` 可以取得指定的CSS選擇器元素的第一個子元素 </br>
 `querySelectorAll()` 可以取得所有匹配的元素 </br>
 
* 注意事項
  * 若找不到相對應的元素就會回傳null。
  * 傳入`querySelector`是由Selectors API引入的選擇器，傳入的字串必須遵循CSS與法。若要選取未遵循 CSS 語法的 ID 或選擇器（例如不當使用冒號或空格），必須強制加上兩個反斜線來跳脫錯誤的字元。

因此可以使用上述方式來判斷輸入的值是否有相對應的元素

#### Template Literals ES6 `${value}`
Template Literals是允許崁入變數的字串
在ES5時必須把字串拆散，利用 `+` 號來加入字串，而ES6則容許通過語法${value}把變數崁入。
`````javascript
var firstName = Yang,
    lastName = Yu-zhen;
// ES5
var name = "My name is" + firstName + lastName + "。";
// ES6
var name = `MY name is ${firstName} ${lastName}。`;
`````

#### currentTime 設定當前時間
`element.currentTime`會以秒為單位反為當前媒體的播放時間。 </br>

當判斷有該對應元素及音檔後就必須觸發音檔播放`audio.play()`</br>
而當連續按即時，為避免第一下因檔未播放完畢，就點擊第二下時，音檔可能還在持續播放，而造成聲音沒有出現，所以必須要重置音源。
`````javascript
audio.currentTime = 0;
`````

### 移除效果
`````javascript
const keys = document.querySelectorAll(`.key`);
keys.forEach(key => key.addEventListener('transitionend', removestyle));
`````

#### `transitionend` 監聽事件效果是否結束
該事件會在CSS transition 結束後觸發

由於在這個頁面中transition的樣式屬性不止一個，必須要選擇時間最長的那個屬性來執行remove(雖然頁面中設定的長度都一樣)。
`````javascript
function removestyle(key){
   if(key.propertyName !== 'transform') return; 
   this.classList.remove('playing');
}
`````
______________
### END


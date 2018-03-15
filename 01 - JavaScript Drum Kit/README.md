# Javascript 30 - Day 1 Javascript Drum Kit 


練習利用JS模擬打鼓的效果，使用者在按下鍵盤上的指定案件後，會發出與頁面上相對應的按鈕指定的聲音與增加按鍵效果。


## 要點
* 偵聽鍵盤按下的事件，確認按下的按鈕。
* 按鍵按下後觸發音檔及視覺效果。
* 當按鍵按住不放時連續播放音效。
* 效果完成後，移除視覺效果


## 重點整理

#### HTML 中的 data-* Attribute 屬性
由於製作網頁的過程中，常會需要添加自定義的屬性，為了避免大家隨意的添加，因此HTML5中多了一個 `data-*`的屬性。

位於`-`後面的`*`號可以遵循以下的規則來自定名稱的
1.名字絕對不能以 xml 起頭，無論是否用於 xml。
2.名字絕對不能包含大寫。
3.名字絕對不能包含分號。

頁面透過了`data-key`的值來判斷是否播放音檔及視覺效果
`````html
  <audio data-key="65" src="sounds/clap.wav"></audio>
`````


#### keyCode 鍵盤代碼
將`data-key`的值與按下按鍵後取得的keyCode判斷是否有相對應的物件。

* keyCode查詢 - [http://keycode.info/](http://keycode.info/)

#### 判斷








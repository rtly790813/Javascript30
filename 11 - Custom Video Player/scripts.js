/* Get Element */
const player = document.querySelector('.player');
const view = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggleBtn = player.querySelector('.player__button');
const skips = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/* Build out functions */

// paused 會回傳 true / false，來表示影片是否暫停
// view.play(); or view.pause(); 控制影片暫停或播放
function playVideo(){
    // 當影片暫停時，會傳入play的值，使其影片進行播放，當影片為播放狀態則反之。 
    const method = view.paused ? 'play':'pause';
    view[method]();
    // 當影片切換狀態時，icon狀態一併更新
    const icon = view.paused ? '►':'❚❚';
    toggleBtn.textContent = icon;
}
// video.volume 設定或回傳音頻/視頻的當前音量，value 設定1.0為最高音量(預設)/ 0為靜音
// video.playbackRate 設定或回傳音頻/視頻的播放速度, value 設定1.0為正常播放速度 / 0.5(半速) / 2.0(快速) / -1.0(倒退播放,正常速度) ... 
function handleRangeUpdate(){
    // 取得range的值來設定，video的音量或播放速度
    view[this.name] = this.value
}

// element.dataset.* 用來存/取物件 data-* 屬性的值
// video.currentTime 設定或回傳音頻/視頻的當前秒數
function skipVideo(){
    // 取得data-skip的值，來+-當前的秒數，由於取出的值為字串，因此必須使用 parseFloat()轉為數值
    view.currentTime += parseFloat(this.dataset.skip);
}

// video.duration 取得當前音頻/視頻總長度，長度為秒數呈現
function updataVideoTime(e){
    // 進度條除以滑鼠位置乘上總長 = 取得滑鼠位置的秒數
    const sec = (e.offsetX / progress.offsetWidth) * view.duration;
    view.currentTime = sec;
}

function handleProgress(){
    // 總長度除以當前秒數*100 = 所佔進度條的％數
    const precen = (view.currentTime/view.duration)*100;
    progressBar.style.flexBasis = `${precen}%`;
}

/* Event listeners */
view.addEventListener('click', playVideo );
view.addEventListener('timeupdate',handleProgress);
toggleBtn.addEventListener('click', playVideo );


ranges.forEach(range => range.addEventListener('click',handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove',handleRangeUpdate)); // 若沒有監聽mousemove時，click button 移動位置時，值並不會連續被取得
skips.forEach(skip => skip.addEventListener('click',skipVideo));

let isMouseDown = false;

progress.addEventListener('click' ,updataVideoTime);
// 由於click的時候不需要確認 mousedown 這件事，因此並不能夠直接在 updataVideoTime 這個 function 內寫入判斷 MouseDown 這件事情
// 而 Mousemove 必須要確認滑鼠是否已按下
progress.addEventListener('mousemove' ,(e) => isMouseDown && updataVideoTime(e));
// progress.addEventListener('mousemove',function(e){
//     if(isMouseDown){
//         updataVideoTime(e);
//     }
// })
progress.addEventListener('mousedown',() => isMouseDown = true);
progress.addEventListener('mouseup',() => isMouseDown = false);


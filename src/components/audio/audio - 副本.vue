<template>
  <section class="player">
    <audio :src="music" id="audioPlayer" @canplay="getDuration" @timeupdate="updateTime" ref="audio"></audio>
    <div class="player-container">
      <div class="container clearfix">
        <div class="player-works">
          <p class="player-works-cover">
            <span class="ui-image" style="width: 50px; height: 50px; border-radius: 2px;">
              <img src="../../assets/images/74efcd23dd797457e03a9962ed3e6d5c.jpg_50x50.jpg">
            </span>
          </p>
          <p class="player-works-title">失落街角（Meu Coração）</p>
          <p class="player-works-text">司徒嘉伟</p>
        </div>
        <div class="player-control">
          <div title="上一首" class="player-control-btn">
            <span class="icon icon-prev"></span>
          </div>
          <div title="播放/暂停" class="player-control-btn" @click="controlAudio()">
            <span class="icon" :class="audioPlayShow ? 'icon-play':'icon-startPlayer'"></span>
          </div>
          <div title="下一首" class="player-control-btn">
            <span class="icon icon-next"></span>
          </div>
        </div>
        <div class="player-progress">
          <div class="player-progress-top">
            <div class="player-nowtime">{{format(currentTime)}}</div>
            <div class="player-duration">{{format(duration)}}</div>
          </div>
          <div class="player-progress-bar" @click="progressClick">
            <div class="player-progress-load" style="width: 0%;"></div>
            <div class="player-progress-play" :style="'width:'+progressing_audio+'%'"></div>
            <div class="player-progress-spot-bar">
              <div class="player-progress-spot" :style="'left:'+progressing_audio+'%'"></div>
            </div>
          </div>
          <div class="player-message">播放列表是空的</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'IndexAudio',
  props: {
    params: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      progressing_audio :0,
      music : 'http://up.mcyt.net/?down/46426.mp3',
      playFlag : false ,
      audioPlayShow : true,
      timer : "" ,
      second : 0,
      currentTime:0, //时间播放进度
      duration:0, //时间总长
      maxTime:0
    }
  },
   methods:{
    //获取时间总长
    getDuration() {
      this.duration = this.$refs.audio.duration;
    },
    //获取时间播放进度
    updateTime(e){ 
      this.currentTime = e.target.currentTime;
    },
    //时间格式化
    format(interval) {
      interval = interval | 0
      const minute = this._pad(interval / 60 | 0)
      const second = this._pad(interval % 60)
      return `${minute}:${second}`
    },
    //补零(n表示需要补的字符串的长度)
    _pad(num, n = 2) {
      let len = num.toString().length
      while (len < n) {
        num = '0' + num
        len++
      }
      return num
    },
    //点击暂停或播放
    controlAudio(){
      let audioPlayer = document.getElementById('audioPlayer');
      let leng = audioPlayer.duration;
      if (this.audioPlayShow){
         audioPlayer.play(); 
         this.audioPlayShow = false;
         this.timer = setInterval(() => {
          // console.log(1/leng);
          this.progressing_audio = (this.progressing_audio/100 + 0.1/leng)*100;
          this.second = this.second + 0.1; 
          if (this.progressing_audio >= 100 ) {
            clearInterval(this.timer);
            this.audioPlayShow = true;
            this.progressing_audio = 0; 
            this.second = 0;
            this.currentTime = 0;
          }
          // console.log(this.progressing_audio);
  　　　　　}, 100)           
      } else {
         audioPlayer.pause()
         this.audioPlayShow = true;
         clearInterval(this.timer);
      }
    },
    progressClick(){
      index = parseInt(this.audio.maxTime / 100 * index)
    }
  },
  mounted(){
    this.getDuration(); //挂载计算时间总长的方法
  }
}
</script>

<style lang="stylus" scoped>
.icon
  font-family: iconfont!important;
  speak: none;
  font-style: normal;
  font-weight: 400;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  letter-spacing: 0;
  -webkit-font-feature-settings: "liga";
  -ms-font-feature-settings: "liga" 1;
  font-feature-settings: "liga";
  -webkit-font-variant-ligatures: discretionary-ligatures;
  font-variant-ligatures: discretionary-ligatures;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  transition: all .2s ease;
  position: relative;
.icon:before
  position: relative
  z-index: 5
.player
  width:100%
  position:fixed
  left:0
  top:59px
  z-index:1000
  .player-container
    padding:5px 0
    background:#f5f5f5
    border-bottom:1px solid #e5e5e5
    .container
      width:1200px
      margin:0 auto
      position:relative
    .container .player-works
      float: left
      width: 240px
      height: 50px
      line-height: 25px
      padding-left: 60px
      overflow: hidden
      position: relative
      .player-works-cover
        width: 50px
        height: 50px
        position: absolute
        left: 0
        top: 0
        max-width: 100%
        overflow: hidden
        -webkit-text-overflow: ellipsis
        -moz-text-overflow: ellipsis
        text-overflow: ellipsis
        white-space: nowrap
        background-image: url('../../assets/images/none-image.png')
        background-position: 0 0
        background-repeat: no-repeat
        background-size: 100% 100%
      .player-works-title
        max-width: 100%
        overflow: hidden
        -webkit-text-overflow: ellipsis
        -moz-text-overflow: ellipsis
        text-overflow: ellipsis
        white-space: nowrap
        font-size: 14px
        color: #333
        font-weight: 400
      .player-works-text
        max-width: 100%
        overflow: hidden
        -webkit-text-overflow: ellipsis
        -moz-text-overflow: ellipsis
        text-overflow: ellipsis
        white-space: nowrap
        position:relative
        font-size:12px
        color:#666
    .player-control
      float: left
      margin-left: 20px
      margin-right: 20px
      margin-top: 10px
      .player-control-btn
        float: left
        width: 32px
        height: 32px
        line-height: 32px
        margin-left: 5px
        position: relative
        border: 1px solid #e5e5e5
        border-radius: 50%
        text-align: center
        cursor: pointer
      .player-control-btn .icon
        width: 12px
        height: 12px
        position: absolute
        left: 9px
        top: 9px
      .player-control-btn .icon.icon-prev:before
        content: ""
        width:12px
        height:12px
        background:url('../../assets/images/prev-btn.png') center no-repeat
        display:block
      .player-control-btn .icon-pause, .player-control-btn .icon-play 
        width: 16px
        height: 16px
        left: 7px
        top: 7px
        font-size: 16px
      .player-control-btn .icon
        width: 12px
        height: 12px
        position: absolute
        left: 9px
        top: 9px
      .player-control-btn .icon.icon-play:before
        content: ""
        width:30px
        height:30px
        background:url('../../assets/images/pause.png') 2px 0 no-repeat
        background-size: 14px
        display:block
      .player-control-btn .icon.icon-startPlayer:before
        content: ""
        width:30px
        height:30px
        background:url('../../assets/images/startPlayer.png') -8px -9px no-repeat
        background-size: 30px
        display:block
      .player-control-btn .icon-next:before
        content: ""
        width:12px
        height:12px
        background:url('../../assets/images/next-btn.png') center no-repeat
        display:block
    .player-progress
      float: left
      width: 320px
      margin-top: 8px
      margin-left: 20px
      margin-right: 20px
      position: relative
    .player-progress .player-progress-top
      height: 20px
      line-height: 20px
      margin-bottom: 5px
      .player-progress-top:after, .player-progress-top:before
        content: "";
        display: table;
      .player-nowtime
        float:left
      .player-duration
        float:right
      .player-duration, .player-nowtime
        font-size: 11px
        color: #999
      .player-progress-top:after
        clear: both;
    .player-progress-bar
      background-color: #e5e5e5
      cursor: pointer
    .player-progress-bar, .player-progress-bar .player-progress-load, .player-progress-bar .player-progress-play, .player-progress-bar .player-progress-spot-bar
      clear: both
      height: 4px
      line-height: 0
      position: relative
      border-radius: 2px
      .player-progress-load
        position: absolute
        background-color: #ccc
      .player-progress-play
        position: absolute
        background-color: #c20c0c
      .player-progress-spot-bar
        margin: 0 6px
        .player-progress-spot
          width: 10px
          height: 10px
          margin-left: -6px
          margin-top: -6px
          position: absolute
          left: 0
          top: 50%
          border: 1px solid #c20c0c
          box-shadow: 0 0 1px #28c17d
          background-color: #fff
          border-radius: 100%
          cursor: -webkit-grab
          cursor: grab
        .player-progress-spot:before
          display: block
          content: ""
          width: 4px
          height: 4px
          margin-top: -2px
          margin-left: -2px
          position: absolute
          left: 50%
          top: 50%
          background-color: #c20c0c
          border-radius: 100%
    .player-message
      height: 20px
      line-height: 20px
      position: absolute
      right: 80px
      top: 0
      color: #999
.player .icon
  float: left
  color: #bbb
  cursor: pointer
.player .icon-pause, .player .icon-play, .player .icon:hover
  color: #687786;
</style>
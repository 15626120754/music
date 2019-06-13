<template>
  <section class="player">
    <audio ref="music" :src="music_audio"></audio>
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
        <div class="player-progress">
          <div class="player-progress-top">
            <div class="player-nowtime">{{formatTime(music.currentTime)}}</div>
            <div class="player-duration">{{formatTime(music.maxTime)}}</div>
          </div>
          <div class="player-slider" style="height: 10px;margin-top: -12px">
            <el-slider @change="changeTime" :format-tooltip="formatTime" :max="music.maxTime" v-model="music.currentTime" style="width: 100%;"></el-slider>
          </div>
          <!-- <div class="player-message">播放列表是空的</div> -->
        </div>
        <div class="player-control">
          <!-- <div title="上一首" class="player-control-btn">
            <span class="icon icon-prev"></span>
          </div> -->
          <div title="播放/暂停" class="player-control-btn" id="play" @click="play">
            <span class="icon" :class="music.isPlay? 'icon-startPlayer':'icon-play'"></span>
          </div>
          <!-- <div title="下一首" class="player-control-btn">
            <span class="icon icon-next"></span>
          </div> -->
        </div>
        <!--播放音量-->
        <div class="volume-ul">
          <ul class="clearfix">
            <li class="volume-li sprites-icon" :class="isFlag? 'volume-mute':'volume-horn'" @click="isVoicePlay" title="播放音量"></li>
            <!-- <li class="volume-li sprites-icon icon-order" title="播放模式"></li>
            <li class="volume-li sprites-icon icon-shuffle" title="播放模式"></li>
            <li class="volume-li sprites-icon icon-loop" title="播放模式"></li>
            <li class="volume-li sprites-icon icon-single" title="播放模式"></li> -->
          </ul>
        </div>
        <!--收藏/音乐列表-->
        <div class="collection-playlist">
          <ul class="clearfix">
            <li class="sprites-icon" :class="isColl? 'collection-icon':'collection'" @click="isCollection" title="歌曲收藏"></li>
            <!-- <li class="playlist sprites-icon" title="播放列表"></li> -->
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'IndexAudio',
  props:{
    music_audio:String,
    music_name:String
  },
  data () {
    return {
      music:{
        isPlay:true,
        currentTime:0,
        maxTime:0,
        volume:100
      },
      // music_audio:'http://sc1.111ttt.cn:8282/2018/1/03m/13/396131232171.m4a?tflag=1519095601&pin=6cd414115fdb9a950d827487b16b5f97#.mp3',
      isColl:false,//收藏
      isFlag:false//音量
    }
  },
  methods:{
    listenMusic(){
      if(!this.$refs.music){
        return
      }
      if(this.$refs.music.readyState){
        this.music.maxTime = this.$refs.music.duration
      }
      this.music.isPlay=!this.$refs.music.paused
      this.music.currentTime = this.$refs.music.currentTime
    },
    play(){
      if(this.$refs.music.paused){
        this.$refs.music.play()
      }else{
        this.$refs.music.pause()
      }
      this.music.isPlay=!this.$refs.music.paused
      this.$nextTick(()=>{
        document.getElementById('play').blur()
      })
    },
    changeTime(time){
      this.$refs.music.currentTime = time
    },
    formatTime(time){
      let it = parseInt(time)
      let m = parseInt(it/60)
      let s = parseInt(it%60)
      return (m<10?"0":"")+parseInt(it/60)+":"+(s<10?"0":"")+parseInt(it%60)
    },
    isVoicePlay(){
      this.isFlag = !this.isFlag;
    },
    //收藏
    isCollection(){
      this.isColl = !this.isColl;
    }
  },
  mounted(){
    this.$nextTick(()=>{
      setInterval(this.listenMusic,1000)
    })
  },
  watch:{
    //监听音乐列表点击获取到props，把props中的music_audio当成一个方法，触发播发器play()的方法
    music_audio(){
      this.$nextTick(()=>{
        this.play();
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.player-slider >>> .el-slider__button
  width:12px
  height:12px
  border:2px solid #c20c0c
.player-slider >>> .el-slider__bar
  background-color: #c20c0c;
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
.sprites-icon
  background: url(../../assets/images/sprites-cion.png) no-repeat 0 9999px
.player
  width:100%
  position:fixed
  left:0
  bottom:0
  z-index:1000
  .player-container
    padding:8px 0
    background:#1c1c1c
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
        color: #fff
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
        color:#fff
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
        width:30px
        height:30px
        background:url('../../assets/images/sprites-cion.png') center no-repeat
        background-position:-1px -33px
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
        background:url('../../assets/images/sprites-cion.png') 2px 0 no-repeat
        background-position:-4px -144px
        display:block
        margin-top: -2px
      .player-control-btn .icon.icon-startPlayer:before
        content: ""
        width:30px
        height:30px
        background:url('../../assets/images/sprites-cion.png') 2px 0 no-repeat
        background-position:-5px -113px
        display:block
      .player-control-btn .icon-next:before
        content: ""
        width:30px
        height:30px
        background:url('../../assets/images/sprites-cion.png') center no-repeat
        background-position:0 0
        display:block
    .player-progress
      float: left
      width: 500px
      margin-top: 8px
      margin-left: 20px
      margin-right: 20px
      position: relative
    .player-progress .player-progress-top
      height: 20px
      line-height: 20px
      margin-bottom: 2px
      .player-progress-top:after, .player-progress-top:before
        content: "";
        display: table;
      .player-nowtime
        float:left
      .player-duration
        float:right
      .player-duration, .player-nowtime
        font-size: 11px
        color: #fff
      .player-progress-top:after
        clear: both;
    .player-message
      height: 20px
      line-height: 20px
      position: absolute
      right: 80px
      top: 0
      color: #999
    .volume-ul
      float:left
      cursor: pointer
    .volume-ul .volume-li
      width:16px
      height:16px
      float:left
    .volume-ul .volume-horn
      width:16px
      height:16px
      background-position:right 0
      margin-top:20px
    .volume-ul .volume-mute
      width:16px
      height:16px
      background-position:right -31px
      margin-top:20px
    .volume-ul .icon-order
      content: ""
      width:30px
      height:16px
      background-position: -32px 0
      margin-top: 25px
    /* icon-shuffle icon-loop icon-single播放模式切换*/
    .volume-ul .icon-shuffle
      content: ""
      width:30px
      height:16px
      background-position: -64px 0px
      margin-top: 25px
    .volume-ul .icon-loop
      content: ""
      width:30px
      height:16px
      background-position: -98px 0px
      margin-top: 25px
    .volume-ul .icon-single
      content: ""
      width:30px
      height:16px
      background-position: -129px 0px
      margin-top: 25px
    .collection-playlist
      float:right
    .collection-playlist li
      float:left
      cursor: pointer
    .collection-playlist li.collection
      content: ""
      width: 30px
      height: 20px
      background-position: right -76px
      margin-top: 17px
      margin-right: 10px;
    .collection-playlist li.collection-icon
      content: ""
      width: 30px
      height: 20px
      background-position: right -111px
      margin-top: 17px
      margin-right: 10px;
    .collection-playlist li.playlist
      content: ""
      width: 30px
      height: 20px
      background-position: right -144px
      margin-top: 18px
.player .icon
  float: left
  color: #bbb0
  cursor: pointer
.player .icon-pause, .player .icon-play, .player .icon:hover
  color: #687786;
</style>
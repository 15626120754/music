<template>
  <div>
  	<index-header v-on:listenToChildEvent="listenAudioChild"></index-header>
  	<transition name="fade">
      <index-audio v-show="audioShow"></index-audio>   
    </transition>
    <div class="banner">
    	<h3>有爱音乐（KTV入驻）</h3>
    	<p>入驻全国各地KTV，让你的音乐场遍全国每个角落</p>
    	<router-link to="/make-manage" tag="a">立 即 入 驻</router-link>
    </div>
    <div class="enter-introduce curs-active">
    	<div class="enter-inner">
    		<h3>入驻介绍</h3>
    		<ul class="clearfix">
    			<li>
    				<div class="first-enter"></div>
    			</li>
    			<li>
    				<div class="seconds-enter"></div>
    			</li>
    			<li>
    				<div class="thids-enter"></div>
    			</li>
    		</ul>
    	</div>
    </div>
    <div class="enter-introduce marginBttoms">
    	<div class="enter-inner">
    		<h3>入驻流程</h3>
    		<div class="enter00-project">
    			<img src="../../assets/images/liuanchengimg.png">
    		</div>
    		<div class="enBoxs">
    			<router-link to="/make-manage" tag="a" class="entr-a78">立 即 入 驻</router-link>
    		</div>
    	</div>
    </div>
    <index-footer></index-footer>
  </div>
</template>

<script>
import IndexHeader from '../header/header'
import IndexFooter from '../footer/footer'
import IndexAudio from '../audio/audio'
export default {
  name: 'KtvEntry',
  components:{
  	IndexHeader,
    IndexFooter,
    IndexAudio
  },
  data () {
    return {
      audioShow:false
    }
  },
  methods:{
    listenAudioChild:function(data){
      this.audioShow = data
    }
  }
}
</script>

<style lang="stylus" scoped>
.banner
  width:100%
  height:380px
  background:#fff url('../../assets/images/bannerKTV.png') center no-repeat
  background-size:100% 100%
  margin-top: 61px
  text-align:center
.banner h3
  color:#fff
  font-size:36px
  padding-top:82px
.banner p
  color:#fff
  font-size:24px
  padding-top:32px
.banner a
  width:150px
  height:40px
  line-height:40px;
  background:#bc1b21
  color:#fff
  font-size:18px
  display:inline-block
  border-radius:4px
  margin-top:50px
.banner a:hover,.enter-introduce .enter-inner .entr-a78:hover
  background:#8c151a
.curs-active
  background:#f8f8f8
.marginBttoms
  margin-bottom:76px
.enter-introduce
  width:100%
  height:388px
  padding-top:42px
  box-sizing: border-box
.enter-introduce .enter-inner
  width:1200px
  margin:0 auto
.enter-introduce .enter-inner .enBoxs
  text-align:center
  margin-top:45px
.enter-introduce .enter-inner .entr-a78
  width:150px
  height:40px
  line-height:40px;
  background:#bc1b21
  color:#fff
  font-size:18px
  display:inline-block
  border-radius:4px
  text-align:center
.enter-introduce .enter-inner h3
  width:100%
  height:36px
  line-height:36px
  border-left:5px solid #c80110
  font-size:24px
  color:#333
  padding-left:18px
  box-sizing: border-box
.enter-introduce .enter-inner ul
    width:100%
    margin-top:37px
.enter-introduce .enter-inner ul li
    width:33.33%
    height:195px
    float:left
.enter-introduce .enter-inner ul li .first-enter
	width:294px
	height:100%
	background:#fff url('../../assets/images/enter-img.png') center no-repeat
	background-size:100% 100%
	margin:0 auto
.enter-introduce .enter-inner ul li .seconds-enter
	width:294px
	height:100%
	background:#fff url('../../assets/images/enter-img2.png') center no-repeat
	background-size:100% 100%
	margin:0 auto
.enter-introduce .enter-inner ul li .thids-enter
	width:294px
	height:100%
	background:#fff url('../../assets/images/enter-img3.png') center no-repeat
	background-size:100% 100%
	margin:0 auto
.enter-introduce .enter-inner .enter00-project
	width:1099px
	margin:62px auto 0 auto
.enter-introduce .enter-inner .enter00-project img
    width:100%
</style>
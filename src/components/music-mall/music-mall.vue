<template>
  <div>
  	<index-header v-on:listenToChildEvent="listenAudioChild"></index-header>	
    <transition name="fade">
      <index-audio v-show="audioShow" :music_audio="audioChild"></index-audio>   
    </transition>
    <div class="creative-search">
        <div class="search-input clearfix">
          <input type="text" name="" placeholder="专辑、歌曲名、演唱者、歌词" class="sprites-cion">
          <button class="search btn">搜索</button>
        </div>
    </div>
    <div class="container">
      <div class="description clearfix">
        <div class="des-left">
          <div class="items" @mouseenter="enter()" @mouseleave="leave()">
            <p>{{styleData}}<span class="sprites-cion"></span></p>
          </div>
          <div class="items" @mouseenter="moodHover()" @mouseleave="moodLeave()">
            <p>{{moodData}}<span class="sprites-cion"></span></p>
          </div>
          <div class="items" @mouseenter="isMusicHover()" @mouseleave="isMusicLeave()">
            <p>{{inStrumentData}}<span class="sprites-cion"></span></p>
          </div>
        </div>
        <!-- <div class="des-right">
          <span class="span-items border-new" :class="{cur:showFlag == 1}" @click="newest">最新</span>
          <span class="span-items popular" :class="{cur:showFlag == 2}" @click="hottest">热门</span>
        </div> -->
        <div class="ms-list-bxo" v-loading="loading">
          <ul class="clearfix" v-show="isShow" @mouseenter="enter()" @mouseleave="leave()">
            <li v-for="item of classifyData.mStyleList" :key="item.id" :data-styleName="item.name" @click="isStyle">{{item.name}}</li>
          </ul>
          <ul class="clearfix" v-show="isMood" @mouseenter="moodHover()" @mouseleave="moodLeave()">
            <li v-for="item of classifyData.languagesList" :key="item.id" :data-moodName="item.name" @click="isLanguages">{{item.name}}</li>
          </ul>
          <ul class="clearfix" v-show="isMusic" @mouseenter="isMusicHover()" @mouseleave="isMusicLeave()">
            <li v-for="item of classifyData.mInstrumentList" :key="item.id" :data-instrumentsName="item.name" @click="inStrument">{{item.name}}</li>
          </ul>
        </div>
      </div>
      <div class="music-list">
        <div class="list-items newest" :class="{active:showFlag == 1}">
          <ul>
            <li v-for="item in searchMusicData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)">
              <div class="music-audio clearfix">
                <div class="left">
                  <div class="head" :key="item.id" @click="audioPlay(item.url)">
                    <img class="j-img" src="http://p2.music.126.net/p9U80ex1B1ciPFa125xV5A==/5931865232210340.jpg?param=62y62">
                  </div>
                  <div class="ifo">
                    <h4>{{item.name}}</h4>
                    <p class="f-thide">{{item.singer}}</p>
                    <p class="s-fc3">{{item.albumName}}</p>
                  </div>
                </div>
                <div class="right">
                  <p>02:58</p>
                  <img src="../../assets/images/cart.png" class="cart" :data-cart="item.id">
                  <img src="../../assets/images/collection.png" class="collection" :data-collect="item.id" @click="collect">
                </div>
              </div>
            </li>
          </ul>
          <div class="pagination-box">
             <el-pagination
               background
               layout="prev, pager, next"
               :total="searchMusicData.length"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="pageSize">
          </el-pagination>
          </div>
        </div>
        <<!-- div class="list-items hottest":class="{active:showFlag == 2}">
          2
        </div> -->
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
  name: 'MusicMall',
  components:{
  	IndexHeader,
    IndexFooter,
    IndexAudio
  },
  data () {
    return {
      audioShow:false, 
      showFlag:1,
      isShow:false, //风格
      isMood:false, //语言
      isMusic:false, //乐器
      classifyData:[], //音乐分类
      loading: true,  //加载icon
      searchMusicData:[], //音乐搜索
      currentPage:1,//分页
      pageSize:2,//分页数
      styleData:'风格',
      moodData:'语言',
      inStrumentData:'乐器',
      audioChild:''
    }
  },
  methods:{
    listenAudioChild:function(data){
      this.audioShow = data;
    },
    //最新
    // newest:function(){
    //   this.showFlag = 1;
    // },
    //热门
    // hottest:function(){
    //   this.showFlag = 2;
    // },
    //风格
    enter(index) {
      this.isShow = true;
    },
    leave(index) {
      this.isShow = false;
    },
    //语言
    moodHover(index) {
      this.isMood = true;
    },
    moodLeave(index) {
      this.isMood = false;
    },
    //乐器
    isMusicHover(index) {
      this.isMusic = true;
    },
    isMusicLeave(index) {
      this.isMusic = false;
    },
    //音乐分类列表
    classify:function(){
      this.$http.get('/api_config/api/find/music/classify').then((response) => {
        this.classifyData = response.data.data;
        if (response.data.msg == '成功') {
          this.loading = false;
        }
      },(response) => {
        console.log(response)
      })
    },
    //音乐搜索
    searchMusic:function(styleData,moodData,inStrumentData){
      this.$http.get('/api_config/api/music/searchMusic',{
        params:{
          keyword:'',
          styleId:styleData,
          languagesId:moodData,
          instrumentId:inStrumentData
        }
      }).then((response) => {
        this.searchMusicData = response.data.data
      },(response) => {
        console.log(response)
      })
    },
    //收藏
    collect:function(e){
      console.log(e.srcElement.dataset.collect)
    },
    //分页
    handleCurrentChange(val){
      this.currentPage = val;
    },
    //风格
    isStyle:function(e){
      let name = e.currentTarget.dataset.stylename;
      this.styleData = name;
      this.searchMusic(this.styleData)
    },
    //语言
    isLanguages:function(e){
      let name = e.currentTarget.dataset.moodname;
      this.moodData = name;
    },
    //乐器
    inStrument:function(e){
      let name = e.currentTarget.dataset.instrumentsname;
      this.inStrumentData = name;
    },
    //播放
    audioPlay:function(url){
      this.audioChild = url;
    }
  },
  mounted() {
    this.classify();
    this.searchMusic();
  }
}
</script>

<style lang="stylus" scoped>
.fade-enter-active, .fade-leave-active
    transition: opacity .5s
.fade-enter, .fade-leave-active
  opacity: 0
.sprites-cion
  background:url('../../assets/images/sprites-cion.png') center no-repeat
.creative-search
  width:100%
  height:454px
  background:#e6e3e2
  margin-top: 61px
  position:relative
  .search-input
    width:719px
    height:48px
    border:1px solid #aaa6a6
    position:absolute
    left:50%
    top:60%
    margin-left:-359.5px
    background:#fff
    border-radius:5px
  .search-input input
    width:645px
    height:48px
    float:left
    border-radius: .6rem 0 0 .6rem
    background-position: 9px -176px
    padding-left:43px
    box-sizing: border-box
    font-size:16px
  .search-input button.search
    width:74px
    height:48px
    background:#b11929
    color:#fff
    font-size:18px
    border-radius:4px
    cursor: pointer
    position:relative
    overflow:hidden
.container
  width:1200px
  margin:0 auto
.container .description
  width:100%
  font-size: 12px
  background-color: #fff
  border: 1px solid #e8e8e8
  border-radius: 4px
  margin-top:25px
  position:relative
  .des-left
    margin-left:19px 
    height:48px
    line-height:48px
    float:left
  .des-left .items
    float:left
    font-size:14px
    cursor: pointer
    position:relative
  .des-left .items p
    padding:0 18px
    box-sizing: border-box
    border: 1px solid #e8e8e8
    margin-right:10px
    height:34px
    line-height:34px
    margin-top:6px
  .des-left .items p span
    width: 24px
    height: 16px
    display: inline-block
    background-position: -70px -78px
  .des-right 
    float:right
    margin-right:22px
    height:48px
    line-height:48px
  .des-right .span-items
    box-sizing: border-box
    cursor:pointer
  .des-right .span-items.border-new
    border-right:1px solid #333
    padding-right:12px
  .des-right .span-items.popular
    padding-left:12px
  .des-right .span-items.cur,.des-right .span-items:hover,.ms-list-bxo ul li:hover
    color:#b11929
  .ms-list-bxo
    position: absolute
    width: 100%
    top: 39px
    background: #fff
    z-index: 1000
  .ms-list-bxo ul
    width:100%
    border:1px solid #e8e8e8
    padding:12px 19px
    box-sizing: border-box
  .ms-list-bxo ul.active
    display:none
  .ms-list-bxo ul li
    line-height:30px
    float:left
    margin-right:40px
    cursor:pointer
.music-list
  width:1200px
  margin-top:22px
.music-list .newest,.music-list .hottest
  display:none
.music-list .newest.active,.music-list .hottest.active
  display:block
.music-list .list-items ul
  width:100%
.music-list .list-items ul li
  width:100%
  border:1px solid #e8e8e8
  border-radius:4px
  margin-bottom:15px
  .music-audio
    padding:14px 19px
    box-sizing: border-box
  .music-audio .left
    float:left
  .music-audio .left .head
    width:90px
    height:90px
    float:left
    margin-right:23px
  .music-audio .left .head img
    width:90px
    height:90px
  .music-audio .left .ifo
    float:left
  .music-audio .left .ifo h4
    font-weight:bold
    font-size:18px
    margin-bottom:21px
    margin-top:8px
  .music-audio .left .ifo p
    font-size:12px
    color:#7b7879
    margin-bottom:4px
  .music-audio .right
    float: right
    height: 90px
    line-height: 90px
  .music-audio .right p
    float:left
    margin-right:47px
  .music-audio .right img
    width:36px
    height:36px
  .music-audio .right img.collection
    margin-left:24px
    margin-right:28px
.pagination-box
  width:1200px
  text-align:center
  margin-top:35px
  margin-bottom:50px
</style>
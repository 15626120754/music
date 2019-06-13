<template>
  <div>
  	<index-header v-on:listenToChildEvent="listenAudioChild"></index-header>	
    <transition name="fade">
      <index-audio v-show="audioShow" :music_audio="audioChild"></index-audio>   
    </transition>
    <div class="creative-search">
        <div class="search-input clearfix">
          <input type="text" name="" placeholder="专辑、歌曲名、演唱者、歌词" class="sprites-cion" v-model="search">
          <button class="search btn" @click="searchBtn">搜索</button>
        </div>
    </div>
    <div class="container">
      <div class="description clearfix">
        <div class="des-left">
          <div class="items" @mouseenter="enter()" @mouseleave="leave()">
            <p>{{styleName}}<span class="sprites-cion"></span></p>
          </div>
          <div class="items" @mouseenter="moodHover()" @mouseleave="moodLeave()">
            <p>{{moodName}}<span class="sprites-cion"></span></p>
          </div>
          <div class="items" @mouseenter="isMusicHover()" @mouseleave="isMusicLeave()">
            <p>{{instrumentName}}<span class="sprites-cion"></span></p>
          </div>
        </div>
        <!-- <div class="des-right">
          <span class="span-items border-new" :class="{cur:showFlag == 1}" @click="newest">最新</span>
          <span class="span-items popular" :class="{cur:showFlag == 2}" @click="hottest">热门</span>
        </div> -->
        <div class="ms-list-bxo" v-loading="loading">
          <ul class="clearfix" v-show="isShow" @mouseenter="enter()" @mouseleave="leave()">
            <li v-for="item of classifyData.mStyleList" :key="item.id" :data-styleName="item.name" :data-styleId="item.id" @click="isStyle">{{item.name}}</li>
          </ul>
          <ul class="clearfix" v-show="isMood" @mouseenter="moodHover()" @mouseleave="moodLeave()">
            <li v-for="item of classifyData.languagesList" :key="item.id" :data-moodName="item.name" :data-moodId="item.id" @click="isLanguages">{{item.name}}</li>
          </ul>
          <ul class="clearfix" v-show="isMusic" @mouseenter="isMusicHover()" @mouseleave="isMusicLeave()">
            <li v-for="item of classifyData.mInstrumentList" :key="item.id" :data-instrumentName="item.name" :data-instrumentId="item.id" @click="inStrument">{{item.name}}</li>
          </ul>
        </div>
      </div>
      <div class="music-list">
        <div class="list-items newest" :class="{active:showFlag == 1}">
          <ul>
            <li v-for="(item,index) of searchMusicData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)">
              <div class="music-audio clearfix">
                <div class="left">
                  <div class="head" :key="item.id" @click="audioPlay(item.url,item.id)">
                    <img class="j-img" :src="item.coverImage">
                    <div class="play-button-wrapper">
                      <div class="music-play-button">
                        <!-- <i class="spritesList-icon pause-icon" :class="activePlayItem(item)"></i> -->
                        <i class="spritesList-icon pause-icon" :class="activePlayItem(item)"></i>
                      </div>
                    </div>
                  </div>
                  <div class="ifo">
                    <h4>{{item.name}}</h4>
                    <p class="f-thide">{{item.singer}}</p>
                    <!-- <p class="s-fc3">{{item.albumName}}</p> -->
                  </div>
                </div>
                <div class="right">
                  <p>{{formatTime(item.duration)}}</p>
                  <img src="../../assets/images/cart.png" class="cart" :data-cart="item.id">
                  <img src="../../assets/images/unSelected.png" class="collection" :data-collect="item.id" @click="collect">
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
        <!-- <div class="list-items hottest":class="{active:showFlag == 2}">
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
      pageSize:8,//分页数
      styleData:'',
      moodData:'',
      inStrumentData:'',
      audioChild:'',
      currentSongId:null,
      search:null,
      styleName:'风格',
      moodName:'语言',
      instrumentName:'乐器'
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
    searchMusic:function(){
      this.$http.get('/api_config/api/music/searchMusic',{
        params:{
          keyword:'',
          styleId:this.styleData,
          languagesId:this.moodData,
          instrumentId:this.inStrumentData
        }
      }).then((response) => {
        this.searchMusicData = response.data.data
      },(response) => {
        console.log(response)
      })
    },
    searchBtn(){
      this.$http.get('/api_config/api/music/searchMusic',{
        params:{
          keyword:this.search,
          styleId:'',
          languagesId:'',
          instrumentId:''
        }
      }).then((response) => {
        this.searchMusicData = response.data.data
      },(response) => {
        console.log(response)
      })
    },
    //收藏
    collect:function(e){
      // console.log(e.srcElement.dataset.collect)
      // console.log('userId:'+sessionStorage.getItem("userId"));
      this.$http.post('/api_config/api/collet/add',{
        userId:sessionStorage.getItem("userId"),
        keyId:e.srcElement.dataset.collect,
        type:1
      },{
        emulateJSON: true
      }).then((response) => {
        console.log(response)
      },(response) => {
        console.log(response)
      })
    },
    //分页
    handleCurrentChange(val){
      this.currentPage = val;
    },
    //风格
    isStyle:function(e){
      let styleId = e.currentTarget.dataset.styleid;
      this.styleData = styleId;
      let styleName = e.currentTarget.dataset.stylename
      this.styleName = styleName;
      this.searchMusic()
    },
    //语言
    isLanguages:function(e){
      let moodId = e.currentTarget.dataset.moodid;
      this.moodData = moodId;
      let moodName = e.currentTarget.dataset.moodname;
      this.moodName = moodName;
      this.searchMusic()
    },
    //乐器
    inStrument:function(e){
      let instrumentId = e.currentTarget.dataset.instrumentid;
      this.inStrumentData = instrumentId;
      let instrumentName = e.currentTarget.dataset.instrumentname;
      this.instrumentName = instrumentName;
      this.searchMusic()
    },
    //播放
    audioPlay:function(url,id){
      this.audioChild = url;
      this.currentSongId = id;
    },
    activePlayItem:function(item,index){
      if (this.currentSongId === item.id) { // 当前播放是选中的歌曲
        return 'start-icon';
      }else{
        return 'pause-icon';
      }
    },
    formatTime(time){
      let it = parseInt(time)
      let m = parseInt(it/60)
      let s = parseInt(it%60)
      return (m<10?"0":"")+parseInt(it/60)+":"+(s<10?"0":"")+parseInt(it%60)
    },
  },
  mounted() {
    this.classify();
    this.searchMusic();
  }
}
</script>

<style lang="stylus" scoped>
.pagination-box >>> .el-pagination.is-background .el-pager li:not(.disabled).active
  background-color: #C80110;
.fade-enter-active, .fade-leave-active
  transition: opacity .5s
.fade-enter, .fade-leave-active
  opacity: 0
.spritesList-icon
  background: url(../../assets/images/sprites-cion.png) no-repeat 0 9999px
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
  .music-audio .left
    float:left
    margin-top: 20px
    margin-left: 20px
  .music-audio .left .head
    width:60px
    height:60px
    float:left
    margin-right:23px
    position:relative
    border-radius:3px
    overflow:hidden
  .music-audio .left .head img
    width:60px
    height:60px
  .music-audio .left .head .play-button-wrapper .music-play-button
    position: absolute
    top: 0
    left: 50%
    display: -webkit-box
    display: -ms-flexbox
    display: flex
    -webkit-transform: translateX(-50%)
    transform: translateX(-50%)
    -webkit-box-pack: center
    -ms-flex-pack: center
    justify-content: center
    -webkit-box-align: center
    -ms-flex-align: center
    align-items: center
    width: 60px
    height: 60px
    -webkit-transition: all .6s
    transition: all .6s
    background-color: rgba(0,0,0,.4)
  .music-audio .left .head .play-button-wrapper .music-play-button:hover
    background-color:rgba(0,0,0,.1)
  .music-audio .left .head .play-button-wrapper .music-play-button .pause-icon
    width:30px
    height:30px
    display:block
    background-position: -4px -144px
    margin-top: 10px
    margin-left: 12px
    cursor: pointer
  .music-audio .left .head .play-button-wrapper .music-play-button .start-icon
    width:30px
    height:30px
    display:block
    background-position: -5px -113px;
    margin-top: 16px;
    margin-left: 12px
    cursor: pointer
  .music-audio .left .ifo
    float:left
  .music-audio .left .ifo h4
    font-weight:bold
    font-size:18px
    margin-bottom:12px
    margin-top:8px
  .music-audio .left .ifo p
    font-size:12px
    color:#7b7879
    margin-bottom:4px
  .music-audio .right
    float: right
    height: 100px
    line-height: 100px
  .music-audio .right p
    float:left
    margin-right:47px
    font-size:14px
  .music-audio .right img
    width:20px
    height:20px
    cursor: pointer
  .music-audio .right img.collection
    margin-left:24px
    margin-right:28px
.pagination-box
  width:1200px
  text-align:center
  margin-top:35px
  margin-bottom:50px
</style>
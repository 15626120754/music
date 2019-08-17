<template>
  <div>
    <index-header v-on:listenToChildEvent="listenAudioChild"></index-header>
    <div class="wrapper">
	    <swiper :options="swiperOption">
	      <swiper-slide class="swiper-slide" v-for="item of carouselData" :key="item.id" :style="{background:item.backgroundColor}">
	        <a :href="item.url" class="slide-img" :style="{backgroundImage:'url(' + item.coverImage + ')',backgroundRepeat:'no-repeat', backgroundPosition:'center center', backgroundSize: cover}"></a>
	      </swiper-slide>
	      <div class="swiper-pagination"  slot="pagination"></div>
        <div class="swiper-button-prev swiper-button-white"></div>
        <div class="swiper-button-next swiper-button-white"></div>
	    </swiper>
  	</div>
    <transition name="fade">
      <index-audio v-show="audioShow"></index-audio>   
    </transition>
    <div class="discover-module-main">
      <div class="list">
        <div class="content">
          <div class="version">
            <div class="version-title">
              <h3>版本授权</h3>
              <i class="ver-borderBottom"></i>
            </div>
            <ul class="list-version-box clearfix">
              <li>
                <a href="#">
                  <img src="../../assets/images/18696095720518497.png">
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="../../assets/images/18713687906568048.png">
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="../../assets/images/18740076185638788.png">
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="../../assets/images/18740076111111.png">
                </a>
              </li>
            </ul>
            <div class="transcribe-box clearfix">
              <div class="tsb-left">
                <div class="tsb-img-box">
                  <img src="../../assets/images/201942820207.png">  
                </div>
              </div>
              <div class="wxt-right">
                <h3>音乐商品制作授权</h3>
                <p>
                  词曲作品录音制作授权，是指录音制作者对其录制的录音制品依法享有的一种独占性权利，属于著作邻接权。 被授权人有权使用被授权的词曲作品的相关著作权利(复制、发行、通过信息网络向公众传播录音录像制品)。
                </p>
                <a href="#" class="come-mall">进入音乐商城<i class="el-icon-d-arrow-right"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="list music-bgColor">
        <div class="content">
          <div class="version">
            <div class="version-title title-padding">
              <h3>有爱音乐人</h3>
              <i class="ver-borderBottom"></i>
            </div>
            <div class="music-person clearfix">
              <div class="music-ps-left">
                <div class="boxs-item">
                  <div class="music-item">版权作品管理</div>
                  <div class="music-item">歌曲推荐展示</div>
                  <div class="music-item">歌曲制作发行</div>
                  <div class="music-item">KTV制作入驻</div>
                  <div class="about-musician-description">我们最大的期望就是给音乐带来最大的收益。<br>有爱音乐期待着您的加入！</div>
                  <a href="#" class="authent-person">认证音乐人</a>
                </div>
              </div>
              <div class="music-ps-right">
                <div class="music-right">
                  <div class="music-img-box">
                    <img src="../../assets/images/201942820207.png">  
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="list">
        <div class="content">
          <div class="version">
            <div class="version-title">
              <h3>制作发行</h3>
              <i class="ver-borderBottom"></i>
            </div>
            <div class="make-issue">
              <ul class="clearfix">
                <li>
                  <div class="li-inner">
                    <div class="about-public-container clearfix">
                      <div class="top-img">
                        <img src="../../assets/images/20198230456987.png">
                      </div>
                      <div class="bottom-text">
                        <h2>MV制作</h2>
                        <p>驻有爱音乐，上传你的音乐作品，将可免费申请制作MV视频，并发行至全球各大音乐平台。让您的音樂展现到全球每个角落。</p>
                      </div>
                      <a class="about-event-link">查看更多</a>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="li-inner">
                    <div class="about-public-container clearfix">
                      <div class="top-img">
                        <img src="../../assets/images/20198230456987.png">
                      </div>
                      <div class="bottom-text">
                        <h2>KTV制作</h2>
                        <p>驻有爱音乐，上传你的音乐作品，将可免费申请制作MV视频，并发行至全球各大音乐平台。让您的音樂展现到全球每个角落。</p>
                      </div>
                      <a class="about-event-link">查看更多</a>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="li-inner">
                    <div class="about-public-container clearfix">
                      <div class="top-img">
                        <img src="../../assets/images/20198230456987.png">
                      </div>
                      <div class="bottom-text">
                        <h2>数位发行</h2>
                        <p>驻有爱音乐，上传你的音乐作品，将可免费申请制作MV视频，并发行至全球各大音乐平台。让您的音樂展现到全球每个角落。</p>
                      </div>
                      <a class="about-event-link">查看更多</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="list music-bgColor">
        <div class="content">
          <div class="version">
            <div class="version-title title-padding">
              <h3>企业合作</h3>
              <i class="ver-borderBottom"></i>
            </div>
            <div class="enterprise">
              <ul class="about-partner-box clearfix">
                <li v-for="item of cooperativeData" :key="item.id">
                  <img :src="item.url">
                </li>
              </ul>
            </div>
          </div>
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
  name: 'HomeIndex',
  components:{
  	IndexHeader,
    IndexFooter,
    IndexAudio
  },
  data () {
    return {
      swiperOption: {
        // 如果需要分页器
	    pagination: {
	      el: '.swiper-pagination',
	      clickable:true
	    },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
        spaceBetween: 100,
        effect: 'fade',
        autoplay: {
    	　　delay:5000,
    		　disableOnInteraction: true
    	　}
      },
      carouselData:[],
      cooperativeData:[],
      audioShow:false
    }
  },
  methods: {
    //轮播
    carousel() {
      this.$http.get('/api_config/api/advertisement/getList').then((response) => {
        this.carouselData = response.data.data
      },(response) => {
        console.log(response)
      })
    },
    listenAudioChild:function(data){
      this.audioShow = data
    },
    cooperative() {
      this.$http.get('/api_config/api/partners/findList',{'limit':20}).then((response) => {
        this.cooperativeData = response.data.data
      },(response) => {
        console.log(response)
      })
    }
  },
  mounted() {
    this.carousel();
    this.cooperative();
  }
}
</script>

<style lang="stylus" scoped>
  .fade-enter-active, .fade-leave-active
    transition: opacity .5s
  .fade-enter, .fade-leave-active
    opacity: 0
  .wrapper >>> .swiper-pagination-bullet-active
    background-color: #C20C0C
  .wrapper >>> .swiper-button-prev 
    margin-left:2%
  .wrapper >>> .swiper-button-next
    margin-right:2%
  .wrapper
    overflow: hidden
    width: 100%
    height:445px
    background: #eee
    margin-top:60px
    .swiper-slide
      text-align:center
    .swiper-slide a
      display:block
      width:100%
      height:445px
      margin:0 auto
  .discover-module-main .list
    width:100%
  .discover-module-main .list.music-bgColor
    background:#f8f8f8
    padding-bottom: 70px
  .discover-module-main .content
    width:1200px
    margin:0 auto
    .version
      width:100%
      margin-top:70px
    .version.music-bgColor
      background:#f8f8f8
    .version .version-title
      width:100%
      text-align:center
    .version .version-title.title-padding
      padding-top:69px
    .version .version-title h3
      font-size:24px
      padding-bottom:25px
    .version .version-title .ver-borderBottom
      width:65px
      height:0
      border-bottom:4px solid #C80110
      display:block
      margin:0 auto
    .version .music-person
      width:100%
    .version .music-person .music-ps-left
      width:600px
      height:350px
      float:left
    .music-ps-left .boxs-item
      width:100%
    .music-ps-left .music-item
      width:328px
      height:47px
      line-height:47px
      text-align:center
      border:1px solid #d0d0d0
      border-radius:4px
      margin:0 auto 10px auto
      font-size:16px
      background:#fff
    .about-musician-description
      width:328px
      height:47px
      line-height: 20px
      margin:0 auto
      font-size:14px
    .authent-person
      width:328px
      height:47px
      line-height:47px
      text-align:center
      background:#bc1b21
      display:block
      border-radius:4px
      color:#fff
      margin: 8px auto 0 auto
    .list-version-box
      width:100%
      margin-top:80px
    .list-version-box li
      width:25%
      float:left
      text-align:center
    .list-version-box li img
      width:140px
      height:140px
      border-radius:50%
      object-fit: cover
    .transcribe-box
      width:100%
      padding-top:69px
    .transcribe-box .tsb-left,.music-right
      width:600px
      float:left
      padding:0 40px
      box-sizing:border-box
    .tsb-img-box,.music-right .music-img-box
      width:100%
      height:338px
      border:1px solid #dfdfdf
      border-radius:9px
      padding:8px
      box-sizing:border-box
    .transcribe-box .tsb-img-box img,.music-right .music-img-box img
      width:100%
      height:320px
      object-fit: cover
    .transcribe-box .wxt-right
      width:600px
      height:338px
      float:right
      position:relative
      padding: 0 64px 0 37px
      box-sizing: border-box
    .transcribe-box .wxt-right h3
      height:25px;
      line-height:25px
      font-size:25px
      font-weight:bold
      margin-bottom:45px
      padding-left:15px
      box-sizing:border-box
      position:relative
    .transcribe-box .wxt-right h3::after
      content:''
      position:absolute
      left:0
      top:2px
      width:4px
      height:25px
      background:#C80110
    .transcribe-box .wxt-right p
      margin-bottom:10px
      line-height:20px
      padding-left:20px
      box-sizing:border-box
    .transcribe-box .wxt-right .come-mall
      width:178px
      height:33px
      line-height:30px
      display:block
      border:1px solid #797979
      padding-left:27px
      box-sizing:border-box
      color:#363636
      font-size:16px
      border-radius:4px
      position:absolute
      right:64px
      bottom:30px
    .transcribe-box .wxt-right .come-mall:hover
      background:#C80110
      color:#fff
      border:1px solid #bc1b21
    .transcribe-box .wxt-right .come-mall i
      margin-left:20px
    .music-person
      padding-top:69px
      box-sizing:border-box
      .music-right
        padding-right:63px
        padding-left: 17px
        box-sizing:border-box
    .make-issue
      width:100%
      padding-top:69px
    .make-issue ul
      padding-left:40px
      box-sizing:border-box
    .make-issue li
      width:33.33%
      float:left
      padding-right:60px
      box-sizing:border-box
    .make-issue li .li-inner
      border:1px solid #d0d0d0
      border-radius:9px
    .make-issue li .about-public-container
      display:block
      padding:8px
      box-sizing:border-box
      .top-img
        overflow:hidden
      .top-img img
        width:309px
        height:201px
        object-fit:cover
        overflow:hidden
        top: 0
        position: relative
        left: 0
        -webkit-transform: scale(1.1)
        -moz-transform: scale(1.1)
        -ms-transform: scale(1.1)
        -o-transform: scale(1.1)
        transform: scale(1.1)
        transition: transform 0.3s, opacity 0.3s
        -moz-transition: -moz-transform 0.3s
        -o-transition: -o-transform 0.3s
      .top-img img:hover
        -webkit-transform: scale(1)
        -moz-transform: scale(1)
        -ms-transform: scale(1)
        -o-transform: scale(1)
        transform: scale(1)
        transition: all 0.4s
        -moz-transition: all 0.4s
        -o-transition: all 0.4s
      .bottom-text h2
        width:100%
        height:69px
        line-height:64px
        color:#333
        position:relative
        padding-left:18px
        box-sizing:border-box
        font-size:25px
      .bottom-text h2:after
        content:''
        position:absolute
        left:0
        top:22px
        width:4px
        height:25px
        background:#C80110  
      .bottom-text p
        font-size:14px
        color#333
        text-align:left
        line-height:20px
      .about-event-link
        width:117px
        height:28px
        line-height:28px
        display:block
        text-align:center
        border:1px solid #d0d0d0
        border-radius:4px
        color:#797979
        float:right
        cursor: pointer
        font-size:16px
        margin-bottom:4px
      .about-event-link:hover
        background:#bc1b21
        color:#fff
        border:1px solid #bc1b21
    .enterprise
      width:100%
      padding-top:69px
      box-sizing:border-box
    .enterprise .about-partner-box
      width:100%
      margin-left:40px
    .enterprise .about-partner-box li
      width:218px
      height:76px
      border:1px solid #d0d0d0
      border-radius:4px
      float:left
      margin: 0 73px 32px 0
      background:#fff
      overflow:hidden
    .enterprise .about-partner-box li:nth-child(4n)
      margin-right:0
    .enterprise .about-partner-box li img
      width:100%
      height:100%
</style>
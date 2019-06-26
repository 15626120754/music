<template>
  <div>
    <div class="music-list">
      <div class="list-items newest">
        <ul>
          <li v-for="(item,index) of searchMusicData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)">
            <div class="music-audio clearfix">
              <div class="left">
                <div class="head" :key="item.id" @click="audioPlay(item.url,item.id)">
                  <img class="j-img" :src="item.coverImage">
                  <div class="play-button-wrapper">
                    <div class="music-play-button">
                      <!-- <i class="spritesList-icon pause-icon" :class="activePlayItem(item)"></i> -->
                      <!-- <i class="spritesList-icon pause-icon" :class="activePlayItem(item)"></i> -->
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
                <!-- <p class="red">入驻中</p> -->
                <!-- <p class="blue">制作中</p> -->
                <p class="orange" :class="item.status == 1?'':'none'">审核中</p>
                <p class="green" :class="item.status == 2?'':'none'">通过</p>
                <p class="gray" :class="item.status == 3?'':'none'">未通过</p>
                <p>{{formatTime(item.duration)}}</p>
                <!-- <img src="../../assets/images/cart.png" class="cart" :data-cart="item.id">
                <img src="../../assets/images/unSelected.png" class="collection" :data-collect="item.id" @click="collect"> -->
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
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'KtvSettled',
  data () {
    return {
      currentPage:1,//分页
      pageSize:8,//分页数
      searchMusicData:[], //音乐搜索
      audioChild:'',
      currentSongId:null
    }
  },
  methods:{
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
        if (response.data.code == -10001) {
          this.$message.error(response.data.msg);
          return false;
        }else{
          this.$message({
            message: '收藏成功',
            type: 'success'
          });
        }
      },(response) => {
        console.log(response)
      })
    },
    //音乐搜索
    searchMusic:function(){
      this.$http.get('/api_config/api/ktv/myKtv').then((response) => {
        this.searchMusicData = response.data.data
      },(response) => {
        console.log(response)
      })
    },
    //分页
    handleCurrentChange(val){
      this.currentPage = val;
    },
    activePlayItem:function(item,index){
      if (this.currentSongId === item.id) { // 当前播放是选中的歌曲
        return 'start-icon';
      }else{
        return 'pause-icon';
      }
    },
    //播放
    audioPlay:function(url,id){
      this.audioChild = url;
      this.currentSongId = id;
    },
    formatTime(time){
      let it = parseInt(time)
      let m = parseInt(it/60)
      let s = parseInt(it%60)
      return (m<10?"0":"")+parseInt(it/60)+":"+(s<10?"0":"")+parseInt(it%60)
    },
  },
  mounted() {
    this.searchMusic();
  }
}
</script>

<style lang="stylus" scoped>
.pagination-box >>> .el-pagination.is-background .el-pager li:not(.disabled).active
  background-color: #C80110;
.spritesList-icon
  background: url(../../assets/images/sprites-cion.png) no-repeat 0 9999px
.music-list
  width:890px
  margin-top:22px
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
    background: rgba(0,0,0,.4) url(../../assets/images/17d18b7a1ae19b5dd3c2edd4f1d163e.jpg) no-repeat
    background-size:100% 100%;
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
  .music-audio .right p.green
    height:30px
    line-height:30px
    color:#00CC99
    border:1px dashed #00CC99
    padding:0 20px
    box-sizing: border-box
    margin-top: 36px
  .music-audio .right p.red
    height:30px
    line-height:30px
    color:#c20c0c
    border:1px dashed #c20c0c
    padding:0 20px
    box-sizing: border-box
    margin-top: 36px
  .music-audio .right p.blue
    height:30px
    line-height:30px
    color:#0066FF
    border:1px dashed #0066FF
    padding:0 20px
    box-sizing: border-box
    margin-top: 36px
  .music-audio .right p.orange
    padding:0 20px
    box-sizing: border-box
    height:30px
    line-height:30px
    color:#FF6600
    border:1px dashed #FF6600
    margin-top: 36px
  .music-audio .right p.gray
    padding:0 20px
    box-sizing: border-box
    height:30px
    line-height:30px
    color:#8D7979
    border:1px dashed #8D7979
    margin-top: 36px
    margin-top: 36px
  .music-audio .right p.none
    display:none
.pagination-box
  text-align:center
  margin-top:35px
  margin-bottom:50px
</style>
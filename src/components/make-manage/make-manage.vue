<template>
  <div>
  	<index-header v-on:listenToChildEvent="listenAudioChild"></index-header>
  	<transition name="fade">
      <index-audio v-show="audioShow"></index-audio>   
    </transition>
    <div class="content clearfix">
      <div class="content-left">
        <div class="release">
          <a href="#">发 布 作 品</a>
        </div>
        <ul>
          <li><a href="#">管理中心</a></li>
          <li><a href="#">音乐管理</a></li>
          <li><a href="#" class="router-active">制作管理</a></li>
        </ul>
      </div>
      <div class="content-right">
        <div class="makeType">
          <ul class="clearfix">
            <li  v-for="(item,index) in items" :class="{active:index==nowIndex}" @click="tab(item,index)">{{item.name}}</li>
          </ul>
          <div class="settledIn">入驻KTV</div>
        </div>
        <div class="list" v-show="showFlag">
          <ktv-template></ktv-template>
        </div>
        <div class="list" v-show="!showFlag">
          2
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
import KtvTemplate from '../ktv-template/ktv-template'
export default {
  name: 'MakeManage',
  components:{
  	IndexHeader,
    IndexFooter,
    IndexAudio,
    KtvTemplate
  },
  data () {
    return {
      audioShow:false,
      showFlag:true,
      nowIndex:1,
      items: [
          {name:'MV制作',istrue:true},
          {name:'KTV制作',istrue:false}
      ]
    }
  },
  methods:{
    listenAudioChild:function(data){
      this.audioShow = data
    },
    tab:function(item,index){
      this.showFlag = !this.showFlag;
      this.nowIndex = index;
      for(var i=0;i<this.items.length;i++){
        this.items[i].istrue=false;
        if(i==index){
            this.items[index].istrue=true;
        }
    }
    }
  }
}
</script>

<style lang="stylus" scoped>
.el-scrollbar__view >>> .el-select-dropdown__item.selected,.content-right >>> .el-step__title.is-success
  color:#c20c0c
.content-right >>> .el-step__head.is-success
  color: #c20c0c
  border-color: #c20c0c
.content-right >>> .el-input__inner:focus,.content-right >>> .el-textarea__inner:focus
  border-color: #c20c0c
.content-right >>> .el-upload-dragger:hover
  border: 1px dashed #c20c0c;
.content
  width:1200px
  min-height:600px
  margin:80px auto 22px auto
  border:1px solid #e5e5e5
  .content-left,.content-right
    float:left
  .content-left
    width:249px
    min-height:1140px
    border-right:1px solid #e5e5e5
    .release
      width:100%
      height:70px
      text-align:center
      border-bottom:1px solid #e5e5e5
    .release a
      width:140px
      height:34px
      line-height:34px
      text-align:center
      background:#bc1b21
      color:#fff
      font-size:14px
      display:inline-block
      border-radius:4px
      margin-top:20px
    .release a:hover
      background:#8c151a
  .content-left ul
    width:100%
  .content-left ul li
    width:100%
    height:42px
    line-height:40px
    border-bottom:1px solid #e5e5e5
    text-align:center
  .content-left ul li a
    width:100%
    height:40px
    line-height:40px
    color:#333
    display:block
    font-size:14px
    border: 1px solid transparent;
    border-width: 1px 0 1px 4px;
  .content-left ul li a.router-active,.content-left ul li a:hover  
    color: #C20C0C
    border-left-color: #C20C0C
  .content-right
    width:950px
    padding:20px 30px
    box-sizing: border-box
  .content-right .makeType
    width:100%
    height:30px
    line-height:30px
    margin-bottom:20px;
    border-bottom:1px solid #DCDFE6
  .content-right .makeType ul
    width:400px
    padding-left:20px
    float:left
  .content-right .makeType ul li
    float:left
    padding-right:20px
    cursor:pointer
    font-size:14px
  .content-right .makeType ul li:last-child
    border-left:1px solid #DCDFE6
    padding-left:20px
  .content-right .makeType ul li.active
    color:#C20C0C
  .content-right .makeType .settledIn
    background:#C20C0C
    width:80px
    height:30px
    line-height:30px
    color:#fff
    float:right
    text-align:center
</style>
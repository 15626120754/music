<template>
  <div class="conKTV">
    <div class="box clearfix">
      <el-input v-model="songName" placeholder="歌曲名称" class="inputSong"></el-input>
      <el-input v-model="singerName" placeholder="歌手名" class="inputSong"></el-input>
    </div>
    <div class="box clearfix">
      <el-input v-model="lyricist" placeholder="作词者" class="inputSong"></el-input>
      <el-input v-model="composer" placeholder="作曲者" class="inputSong"></el-input>
    </div>
    <div class="textarea">
      <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 4}" placeholder="歌词" v-model="textarea"></el-input>
    </div>
    <div class="upload clearfix">
      <div class="el-upload-box">
        <el-upload
          class="upload-demo"
          drag
          action="/api_config/api/upload/ktv"
          accept=''
          multiple
          :before-upload="beforeUpload">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">歌曲（wav或mp3）可拖到此处</div>
          <div class="el-upload__tip" slot="tip">只能上传文件，且不超过20M</div>
        </el-upload>
      </div>
      <div class="el-upload-box">
        <el-upload
          class="upload-demo"
          drag
          action="/api_config/api/upload/ktv"
          accept=''
          multiple
          :before-upload="accompanyUpload">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">伴奏（wav或mp3）可拖到此处</div>
          <div class="el-upload__tip" slot="tip">只能上传文件，且不超过20M</div>
        </el-upload>
      </div>
    </div>
    <div class="uploadMV">
      <el-upload
        class="upload-demo"
        drag
        action="/api_config/api/upload/ktv"
        accept=''
        multiple
        :before-upload="uploadMV">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">MV视频.mp4（选填）可拖到此处</div>
        <div class="el-upload__tip" slot="tip">只能上传文件，且不超过20M</div>
      </el-upload>
    </div>
    <div class="uploadMV">
      <el-upload
        class="upload-demo"
        drag
        action="/api_config/api/upload/ktv"
        accept=''
        multiple
        :before-upload="uploadKTV">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">KTV文件.mpg（选填）可拖到此处</div>
        <div class="el-upload__tip" slot="tip">只能上传文件，且不超过20M</div>
      </el-upload>
    </div>
    <div class="agreement">
      <el-checkbox v-model="checked"><span>已阅读同意授权协议</span></el-checkbox>
    </div>
    <div class="btn-box">
      <el-button>取消</el-button>
      <el-button type="danger" @click="formSubmit">确认</el-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'KtvTemplate',
  data () {
    return {
      songName:'',
      singerName:'',
      lyricist:'',
      composer:'',
      textarea:'',
      checked: false
    }
  },
  methods:{
    //歌曲
    beforeUpload(file){
      let data = new FormData();
      data.append('file',file);//传文件
      axios.post('/api_config/api/upload/ktv?type=2',data).then(function(res){
        console.log(res.data.data);
      })
    },
    //伴奏
    accompanyUpload(file){
      let data = new FormData();
      data.append('file',file);//传文件
      axios.post('/api_config/api/upload/ktv?type=1',data).then(function(res){
        console.log(res.data.data);
      })
    },
    //MV
    uploadMV(file){
      let data = new FormData();
      data.append('file',file);//传文件
      axios.post('/api_config/api/upload/ktv?type=4',data).then(function(res){
        console.log(res.data.data);
      })
    },
    //KTV
    uploadKTV(file){
      let data = new FormData();
      data.append('file',file);//传文件
      axios.post('/api_config/api/upload/ktv?type=5',data).then(function(res){
        console.log(res.data.data);
      })
    },
    // 提交KTV信息
    formSubmit(){
      if (this.songName == '') {
        this.$message.error('ktv歌曲名称不能为空');
        return;
      }
      if (this.singerName == '') {
        this.$message.error('演唱者不能为空');
        return;
      }
      if (this.composer == '') {
        this.$message.error('作曲者不能为空');
        return;
      }
      if (this.lyricist == '') {
        this.$message.error('作词者不能为空');
        return;
      }
      if (this.textarea == '') {
        this.$message.error('歌词不能为空');
        return;
      }
      // if (this.originalFile == '') {
      //   this.$message.error('歌曲文件不能为空');
      //   return;
      // }
      // if (this.accompanimentFile == '') {
      //   this.$message.error('伴奏文件不能为空');
      //   return;
      // }
      if (this.checked == false) {
        this.$message.error('请阅读同意授权协议，比勾选');
        return;
      }
      axios.post('/api_config/api/ktv/sureSave',{
        name:this.songName, //ktv歌曲名称
        singer:this.singerName, //演唱者
        composer:this.composer, //作曲者
        author:this.lyricist, //作词者
        lyric:this.textarea, //歌词
        originalFile:'1', //歌曲文件
        accompanimentFile:'1', //伴奏文件
        ktvFile:'', //ktv文件
        mvFile:'' //mv文件
      }).then(function(res){
        console.log(res.data.data);
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.conKTV .upload >>> .el-upload-dragger
  width:440px
.conKTV .box
  margin-bottom:10px
.conKTV .box .inputSong
  width:440px
  float:left
.conKTV .box .inputSong:last-child
  float:right
.conKTV .textarea
  margin-bottom:10px
.conKTV .upload
  margin-bottom:15px
.conKTV .el-upload-box
  width:440px
  float:left
.conKTV .el-upload-box:last-child
  float:right
.conKTV .uploadMV
  margin-bottom:15px
.conKTV .uploadMV >>> .el-upload,.conKTV .uploadMV >>> .el-upload .el-upload-dragger
  width:100%
.conKTV .agreement
  margin-top:10px
.content .btn-box
  width:100%
  text-align:center
  margin-bottom:40px
  margin-top:40px
.content .btn-box >>> .el-button--danger
  color: #FFF;
  background-color: #C20C0C;
  border-color: #C20C0C;
.content .btn-box >>> .el-button--danger:hover
  color:#F2F8FE
  background-color:#db3a41
  border-color:#db3a41
</style>
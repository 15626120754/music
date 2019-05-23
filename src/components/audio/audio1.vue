<template>
  <div>
    <audio :src="music" id="audio"></audio>
    <div class="audio-box bbb">
      <span class="time-font">
        {{second/60 > 9 ? parseInt(second/60) : '0'+parseInt(second/60) }}:{{second%60 >= 10 ? parseInt(second%60) : '0'+parseInt(second%60)}}
      </span>
        <el-progress :percentage="progressing_audio" status="success" :stroke-width="4"  style="margin-top:.1rem;margin-left:.3rem;float:left;width:4.14rem;"></el-progress>
        <img class="rong-circle-control" :src="audioPlayShow ? imgA : imgB" @click="controlAudio()"></img>
    </div>
  </div>
</template>

<script>
  //https://github.com/phoebeCodeSpace/blog/issues/22
export default {
  name: 'IndexAudio',
  props: {
    params: {
      type: Object,
      default: () => ({
        message: 'hello'
      })
    }
  },
  data () {
  	return {
      'progressing_audio' :0,
      'music' : 'http://wechatapppro-1252524126.file.myqcloud.com/appG1VMUALC2470/audio_compressed/1505377565_4fd15d83213bceb23a97ad6af45f1dae.mp3',
      'playFlag' : false ,
      'audioPlayShow' : true,
      "timer" : "" ,
      "length-music" : 0 , 
      'second' : 0,
      "imgA" : '../../assets/images/audioStart.png',
      "imgB" : '../../assets/images/audioStop.png'
  	}
  },
   methods:{
    controlAudio : function (){
      if ( !this.params){
        return false 
      } else {
        console.log(this.params);
        this.music = this.params.url;
        let audio0 = document.getElementById('audio');
        let leng = audio0.duration;
        console.log(audio0.duratuion)
        if ( this.audioPlayShow ){
           audio0.play(); 
          
           this.audioPlayShow = false ;
           this.timer = setInterval( () => {
            console.log(1/leng);
            this.progressing_audio = (this.progressing_audio/100 + 0.1/leng)*100 ;
            this.second = this.second + 0.1 ; 
            if (this.progressing_audio >= 100 ) {
              clearInterval(this.timer);
              this.progressing_audio = 0; 
              this.second = 0 ;
            }
            console.log(this.progressing_audio);
    　　　　　}, 100)           
        } else {
           audio0.pause()
           this.audioPlayShow = true ;
           clearInterval(this.timer);
        }
      }
    },
  }
}
</script>

<style lang="stylus" scoped>
.rong-circle-control
    width : .56rem
    height : .56rem
    margin-left : .46rem
    float : left 
    border-radius : 50% 
  .time-font
    margin-top:.1rem
    font-size:.24rem
    font-family:PingFangSC-Regular
    font-weight:400
    color:rgba(153,153,153,1)
    line-height:.34rem
    float:left 
    margin-left : 0rem 
  .audio-box
    height : .56rem
    width : 6.1rem
    padding :.2rem .3rem
    margin:.4rem
    background:rgba(255,255,255,1)
    box-shadow:0px 14px 30px 0px rgba(154,159,182,0.1)
    border-radius:.20rem
</style>
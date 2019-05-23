<template>
  <div>
  	<index-header v-on:listenToChildEvent="listenAudioChild"></index-header>
  	<transition name="fade">
      <index-audio v-show="audioShow"></index-audio>   
    </transition>
    <div class="container">
      <div class="form-box">
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="checkName">
            <el-input type="text" v-model="ruleForm2.checkName"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input type="email" v-model="ruleForm2.email"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-input type="text" v-model="ruleForm2.code" style="width: 70%"></el-input>
            <img id="imgIdentifyingCode" class="imgCode" title="验证码" @click="getIdentifyingCode()">
          </el-form-item>
          <el-form-item label="邮箱验证码" prop="emailCode">
            <el-input type="text" v-model="ruleForm2.emailCode" style="width: 70%"></el-input>
            <el-button class="imgCode" @click="emailRegisterCode()">点击获取</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" @click="submitForm('ruleForm2')" style="width: 300px;">立即注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div> 
</template>

<script>
import IndexHeader from '../header/header'
import IndexAudio from '../audio/audio'
export default {
  name: 'Register',
  components:{
  	IndexHeader,
    IndexAudio
  },
  data () {
    //密码
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass');
        }
        callback();
      }
    };
    //确认密码
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      audioShow:false,
      // codeData:'',
      ruleForm2: {
        checkName:'',
        pass: '',
        checkPass: '',
        email: '',
        code:'',
        emailCode:''
      },
      rules2: {
        email: [
          { message: '请输入邮箱', required: true, trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur,change' }
        ],
        checkName: [
          { message: '请输入用户名', required: true, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, required: true, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, required: true, trigger: 'blur' }
        ],
        code: [
          { message: '请输入验证码', required: true, trigger: 'blur' }
        ],
        emailCode: [
          { message: '请输入邮箱验证码', required: true, trigger: 'blur' }
        ],
      }
    }
  },
   methods:{
    listenAudioChild:function(data){
      this.audioShow = data;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //图片验证码
    getIdentifyingCode: function () {
      let identifyCodeSrc =  "http://www.youaimusic.com/api/verify/code/generation?type=2&"+ Math.random();
      let objs = document.getElementById("imgIdentifyingCode");
      objs.src = identifyCodeSrc;
    },
    //邮箱注册码
    emailRegisterCode:function(){
      this.$http.post('/api_config/api/email/send',{
        verifyCode: this.ruleForm2.code,
        email: this.ruleForm2.email
      }).then((response) => {
        console.log(response)
      },(response) => {
        console.log(response)
      })
    }
  },
  mounted(){
    this.getIdentifyingCode();
  }
}
</script>

<style lang="stylus" scoped>
.container
  width:1200px
  margin:90px auto 0 auto
  border:1px solid #DCDFE6
  border-radius:4px
  .form-box
    width:680px
    padding:30px 0
    box-sizing: border-box
    margin:0 auto
    .imgCode
      width:98px
      height:40px
      float:right
</style>
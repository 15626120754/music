<template>
  <div>
  	<index-header v-on:listenToChildEvent="listenAudioChild"></index-header>
  	<transition name="fade">
      <index-audio v-show="audioShow"></index-audio>   
    </transition>
    <div class="container">
      <div class="form-box">
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户账号" prop="checkName">
            <el-input type="text" v-model="ruleForm2.checkName"></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="nickName">
            <el-input type="text" v-model="ruleForm2.nickName"></el-input>
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
          <el-form-item label="邮箱验证码" prop="emailCode">
            <el-input type="text" v-model="ruleForm2.emailCode" style="width: 200px"></el-input>
            <el-button class="countTime" @click="emailRegisterCode()" id="countTime">获取验证码</el-button>
          </el-form-item>
          <el-form-item prop="checkbox">
            <el-checkbox-group v-model="ruleForm2.checkbox">
              <p><el-checkbox class="checkbox-input">我已阅读并同意<a href="#">《有爱服务条款》</a></el-checkbox></p>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <el-button type="button" @click="submitForm('ruleForm2')" style="width: 300px;" class="buttonRegister">立即注册</el-button>
          </el-form-item>
        </el-form>
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
  name: 'Register',
  components:{
  	IndexHeader,
    IndexFooter,
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
      } else if (value != this.ruleForm2.pass) {
        callback(new Error('两次输入密码不一致'));
      } else {
        callback();
      }
    };
    return {
      audioShow:false,
      ruleForm2: {
        checkName:'',
        nickName:'',
        pass: '',
        checkPass: '',
        email: '',
        emailCode:'',
        checkbox:''
      },
      rules2: {
        email: [
          { message: '请输入邮箱', required: true, trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur,change' }
        ],
        checkName: [
          { message: '请输入用户名', required: true, trigger: 'blur' }
        ],
        nickName: [
          { message: '请输入昵称', required: true, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, required: true, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, required: true, trigger: 'blur' }
        ],
        emailCode: [
          { message: '请输入邮箱验证码', required: true, trigger: 'blur' }
        ],
        checkbox: [
          {message: '请阅读且同意有爱用户注册协议', required: true, trigger: 'change' }
        ]
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
          this.$http.post('/api_config/api/register',{
            username: this.ruleForm2.checkName,
            nickname: this.ruleForm2.nickName,
            password: this.ruleForm2.pass,
            email: this.ruleForm2.email,
            emailCode: this.ruleForm2.emailCode
          },{
            emulateJSON: true
          }).then((response) => {
            this.$message({
              message: '恭喜你，注册成功！',
              type: 'success'
            });
          },(response) => {
             this.$message.error('很抱歉，注册失败了！');
          })
        } else {
          return false;
        }
      });
    },
    //cookies设置
    uuid:function () {
      var s = [];
      var hexDigits = "0123456789abcdef";
      for (var i = 0; i < 36; i++) {
          s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[14] = "4";
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
      s[8] = s[13] = s[18] = s[23] = "-";
      var uuid = s.join("");
      return uuid;
    },
    setCookie: function (name, value, days) {
      var d = new Date;
      d.setTime(d.getTime() + 24*60*60*1000*days);
      console.log(  name + "=" + value + "; path=/;domain=localhost; expires=" + d.toGMTString());
      window.document.cookie = name + "=" + value + "; path=/;domain=localhost; expires=" + d.toGMTString(); 
    },
    getCookie: function (name) {
      var v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
      return v ? v[2] : null;
    },
    //邮箱注册码
    emailRegisterCode:function(){
     //判断是否有cookie
     console.log(document.cookie);
      var user_cookie=this.getCookie("user_cookie");
      if(user_cookie==null || user_cookie=='null'){
        this.setCookie("user_cookie",this.uuid(),1);
      }
      if (this.ruleForm2.email == '') {
        this.$message({
          message: '邮箱不能为空！',
          type: 'warning'
        });
      }else{
        this.$http.post('/api_config/api/email/send',{
          email: this.ruleForm2.email
        },{
          emulateJSON: true
        }).then((response) => {
          var countTime = document.getElementById("countTime");
          var num = 60
          var timer = setInterval(function () {
          num--
          countTime.innerHTML = num + '秒后重新获取'
          countTime.style.color = ' #ccc'
          countTime.disabled = ' disabled'
          if (num === 0) {
            countTime.disabled = ''
            countTime.innerHTML = '获取验证码'
            clearInterval(timer)
          }
        }, 1000)
        console.log(response)
        },(response) => {
          console.log(response)
        })
      }
    }
  },
  mounted(){
    
  }
}
</script>

<style lang="stylus" scoped>
.container
  width:1200px
  margin:90px auto 0 auto
  border:1px solid #DCDFE6
  border-radius:4px
  margin-bottom:109px
  .form-box
    width:680px
    padding:30px 0
    box-sizing: border-box
    margin:0 auto
    .countTime
      height:40px
      margin-left:10px
    .buttonRegister
      background:#C80110
      color:#fff
    .checkbox-input
      font-size:14px
    .checkbox-input input
      margin-top:-2px
      margin-right:10px
    .checkbox-input a
      color:#C80110
</style>
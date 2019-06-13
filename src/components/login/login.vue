<template>
  <div>
  	<el-dialog 
      title="登录"
      :visible.sync="dialogFormVisible" :modal-append-to-body='false'>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
            <el-form-item prop="userName">
              <el-input placeholder="手机号码/邮箱" v-model="ruleForm.userName"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" placeholder="密码" v-model="ruleForm.password"></el-input>
            </el-form-item>
            <router-link to="/register" tag="a" class="register"><span>新用户注册</span></router-link>
            <router-link to="/forgetPws" tag="a" class="forgetPws"><span>忘记密码？</span></router-link>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="danger" @click="submitForm('ruleForm')">登录</el-button>
        </div>
</el-dialog>
  </div> 
</template>

<script>
import Transfer from '../../transferJs/transfer.js'
export default {
  name: 'Login',
  data () {
    return {
      dialogFormVisible:false,
      ruleForm:{
        userName:'',
        password:''
      },
      rules: {
        userName: [
          { message: '请输入用户名', required: true, trigger: 'blur' }
        ],
        password: [
          { message: '密码不能为空', required: true, trigger: 'blur' }
        ]
      }
    }
  },
   methods:{
    //用户登录
    submitForm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post('/api_config/api/login',{
             username: this.ruleForm.userName,
             password: this.ruleForm.password,
          },{
             emulateJSON: true
          }).then((response) => {
            if (response.data.code == 1) {
              this.$message({
                message: '登录成功！',
                type: 'success'
              });
              this.dialogFormVisible = false;
              this.isLogin = !this.isLogin;
              //将用户名和用户Id放入sessionStorage
              sessionStorage.setItem("userName",response.data.data.nickname);
              sessionStorage.setItem("userId",response.data.data.userId);
              //将用户名放入vuex
              this.$store.dispatch('setUser',response.data.data.nickname);
              // this.$store.dispatch('setUserId',response.data.data.userId);
              // console.log(this.$store.state.isLogin);
              // console.log(this.$store.state.currentUser);
            }else{
              this.$message.error(response.data.msg);
            }
          },(response) => {
              this.$message.error('登录失败了！');
          })
        }else{

        }
      });
    }
  },
  created(){
    var that=this;
    //监听header点击弹窗登录页
    Transfer.$on('dialogEvent',param=>{
      that.dialogFormVisible = param 
    })
  }
}
</script>

<style lang="stylus" scoped>
.el-dialog__wrapper >>> .el-dialog
  width:405px
.dialog-footer >>> .el-button
  width:100%
  margin-bottom:30px
.forgetPws,.register  
    display:block
    text-align:right
    color:#666
    font-size:14px
    float:right
  .register 
    color:#ff6e52
</style>
<template>
  <div class="header">
  	<div class="headerCenter clearfix">
  		<router-link to="/">
	  		<div class="logo sprites-icon">
		  		<a href="#" class="logoLink"></a>
		  	</div>
	  	</router-link>
	  	<ul class="m-nav">
	  		<li>
	  			<router-link to="/music-mall" tag="a" class="header-router" active-class="active">	
	  				音乐商城
	  			</router-link>
	  		</li>
	  		<li>
	  			<a href="#" class="header-router">我的音乐</a>
	  		</li>
	  		<li>
	  			<a href="#" class="header-router">音乐人</a>
	  		</li>
	  		<li  @mouseenter="issueHover()" @mouseleave="issueLeave()">
	  			<a href="#" class="header-router">制作发行</a>
	  			<transition name="fade">
		  			<div class="issue" v-show="isHover">
		  				<div class="listDiv">
		  					<a href="#">MV制作</a>
		  				</div>
		  				<div class="listDiv"><router-link to="/ktv-entry" tag="a" active-class="cur">KTV入驻</router-link></div>
		  				<div class="listDiv"><a href="#">数字发行</a></div>
		  			</div>
	  			</transition>
	  		</li>
	  		<li>
	  			<a href="#" class="header-router">版权登记</a>
	  		</li>
	  		<li>
	  			<a href="#" class="header-router">授权查询</a>
	  		</li>
	  	</ul>
	  	<div class="header-nav">
	  		<div class="item sprites-icon mc-item" v-on:click="audioToggle"></div>
	  		<div class="item sprites-icon msg-item" v-show="isLogin"></div>
	  		<div class="item sprites-icon user-item" @click="userLogin" v-show="!isLogin"></div>
	  		<div class="item logged-item" v-show="isLogin">
	  			<div class="user-login" @mouseenter="enter()" @mouseleave="leave()">
			  		<a href="javascript:;" class="user-icon">
			  			<img src="../../assets/images/21313.jpg">
			  		</a>
			  		<transition name="fade">
				  		<div class="m-tlist" v-show="isShow">
				  			<ul>
					  			<li>
					  				<a href="#">
					  					<i class="pi-icon-i sprites-icon"></i>
					  					<em>个人信息</em>
					  				</a>
					  			</li>
					  			<li>
					  				<a href="#">
					  					<i class="ida-icon-i sprites-icon"></i>
					  					<em>身份认证</em>
					  				</a>
					  			</li>
					  			<li>
					  				<a href="#">
					  					<i class="mk-icon-i sprites-icon"></i>
					  					<em>我的制作</em>
					  				</a>
					  			</li>
					  			<li>
					  				<a href="#">
					  					<i class="ms-icon-i sprites-icon"></i>
					  					<em>我的消息</em>
					  				</a>
					  			</li>
					  			<li @click="loginOut()">
					  				<a href="javascipt:;">
					  					<i class="ql-icon-i sprites-icon"></i>
					  					<em>退出登录</em>
					  				</a>
					  			</li>
					  		</ul>
				  		</div>
				  	</transition>
			  	</div>
	  		</div>
	  	</div>
  	</div>
	<Login></Login>
  </div>
</template>
<script>
import Transfer from '../../transferJs/transfer.js'
import Login from '../login/login'
export default {
  name: 'IndexHeader',
  components:{
  	Login
  },
  data () {
  	return {
  		isShow:false,
  		isHover:false,
  		audioShow:false,
  		dialogFlag:false,
  		dialogFormVisible:false
  	}
  },
  methods: {
  	enter(index) {
  		this.isShow = true;
  	},
  	leave(index) {
  		this.isShow = false;
  	},
  	issueHover() {
  		this.isHover = true;
  	},
  	issueLeave() {
  		this.isHover = false;
  	},
  	audioToggle:function(){
  		this.audioShow = !this.audioShow;
  		this.$emit('listenToChildEvent', this.audioShow);
  	},
  	//用户登录弹窗
  	userLogin(){
  		// this.dialogFormVisible = true
  		this.dialogFlag = true;
  		Transfer.$emit('dialogEvent', this.dialogFlag);
  	},
  	//退出登录
  	loginOut(){
	    this.$confirm('您确认退出登录吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
	  		this.$http.get('/api_config/api/logout').then((response) => {
        		sessionStorage.clear();//清除sessionStorage
                this.$message({type: 'success',message: '退出成功'});
                this.$store.dispatch('setUser',null);
		    },(response) => {
		        console.log(response)
		    })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
  	}
  },
  computed:{
	isLogin(){
	  //通过sessionStorage获取vuex里isLogin的状态
	  if (sessionStorage.getItem("userName") && sessionStorage.getItem("userId")) {
	    this.$store.commit("userStatus",sessionStorage.getItem("userName"));
	  }else{
	    this.$store.commit("userStatus",null);
	  }
	  return this.$store.getters.isLogin;
	}
  }
}
</script>

<style lang="stylus" scoped>
.sprites-icon
  background: url(../../assets/images/sprites.png) no-repeat 0 9999px
.header
  width:100%
  height:60px
  background:#fff
  position:fixed
  top:0
  z-index:1000
  border-bottom: 1px solid #e5e5e5
  .headerCenter
  	width:1200px
  	margin:0 auto
  	position:relative
  	.logo
  	   width:190px
  	   height:59px
  	   float:left
  	   padding-right:15px
  	   background-position:-100px -135px
  	.m-nav
  	  float:left
  	 .m-nav li
  	 	float:left
  	 	height:60px
  	 	font-size:14px
  	 	position:relative
  	 .m-nav li a.header-router
  	    padding:0 19px
  	    text-align:center
  	    height:60px
  	    line-height:60px
  	    color:#333
  	    display:block
  	 .m-nav li a.header-router.active,.issue .listDiv a.cur,.m-nav li a.header-router:hover
	    color: #C20C0C
	 .issue
	 	width:100%
	 	position:absolute
	 	border:1px solid #e5e5e5
	 	background:#fff
	 .issue .listDiv
	 	height:40px
	 .issue .listDiv a
	 	width:100%
	 	height:40px
	 	line-height:40px
	 	display:block
	 	text-align:center
	 	color:#333
	 .issue .listDiv a:hover
	 	background:#f2f2f2
	.header-nav
	  height:48px
	  float:right
	  padding-top:19px
	  box-sizing:border-box
	.header-nav .item
	  float:left
	  width:24px
	  height:24px
	  margin-left:30px
	  cursor:pointer
	.header-nav .item.mc-item
      background-position:-46px -56px
    .header-nav .item.msg-item
      background-position:-111px -56px
    .header-nav .item.user-item
      background-position:-43px -108px
    .logged-item
      margin-top:-4px
	.logged-item .user-login a.user-icon img
	   width:30px
	   height:30px
	   margin-right: 5px
	   border-radius:50%
	   object-fit: cover
	.logged-item .user-login .m-tlist
	  position: absolute
	  top: 56px
	  right: -43px
	  width: 158px
	  background: #fff
	  box-shadow: 0 8px 24px 0 rgba(0,0,0,0.50)
	  border-radius: 4px
	  z-index:1000
	.logged-item .user-login .m-tlist li
	  width:100%
	  height:38px
	  line-height:38px
	.logged-item .user-login .m-tlist li a
	  display:block
	  color: #333
	  padding-left:24px
	  box-sizing:border-box
	.logged-item .user-login .m-tlist li a .pi-icon-i
	  float:left
	  width:18px
	  height:18px
	  background-position:-111px 0
	  margin:10px 10px 0 0
	.logged-item .user-login .m-tlist li a .ida-icon-i
	  float:left
	  width:18px
	  height:18px
	  background-position:0 0
	  margin:12px 10px 0 0
	.logged-item .user-login .m-tlist li a .mk-icon-i
	  float:left
	  width:18px
	  height:18px
	  background-position:0 -60px
	  margin:11px 10px 0 0
	.logged-item .user-login .m-tlist li a .ms-icon-i
	  float:left
	  width:18px
	  height:18px
	  background-position:right 0
	  margin:11px 10px 0 0
	.logged-item .user-login .m-tlist li a .ql-icon-i
	  float:left
	  width:18px
	  height:18px
	  background-position:right -57px
	  margin:11px 10px 0 0
	.logged-item .user-login .m-tlist li a:hover
	  background:#f2f2f2
	.fade-enter-active, .fade-leave-active
	  transition: opacity .25s;
	.fade-enter, .fade-leave-to
	  opacity: 0;
  
</style>
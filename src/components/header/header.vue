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
	  			<router-link to="/music-mall" tag="a" active-class="active">	
	  				音乐商城
	  			</router-link>
	  		</li>
	  		<li>
	  			<a href="#">我的音乐</a>	`
	  		</li>
	  		<li>
	  			<a href="#">音乐人</a>
	  		</li>
	  		<li>
	  			<a href="#">制作发行</a>
	  			<!-- <ul>
	  				<li><a href="#">1</a></li>
	  				<li><a href="#">1</a></li>
	  				<li><a href="#">1</a></li>
	  			</ul> -->
	  		</li>
	  		<li>
	  			<a href="#">版权登记</a>
	  		</li>
	  		<li>
	  			<a href="#">授权查询</a>
	  		</li>
	  	</ul>
	  	<div class="header-nav">
	  		<div class="item sprites-icon mc-item" v-on:click="audioToggle"></div>
	  		<div class="item sprites-icon msg-item"></div>
	  		<div class="item sprites-icon user-item" @click="userLogin"></div>
	  		<div class="item logged-item">
	  			<div class="user-login" @mouseenter="enter()" @mouseleave="leave()">
			  		<a href="javascript:;" class="user-icon">
			  			<img src="../../assets/images/13085f7ec5.jpg">
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
					  			<li>
					  				<a href="#">
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
	<el-dialog 
	    title="登录"
	    :visible.sync="dialogFormVisible" :modal-append-to-body='false'>
	        <el-form>
	            <el-form-item>
	            	<el-input placeholder="手机号码/邮箱"></el-input>
	            </el-form-item>
	            <el-form-item>
	                <el-input placeholder="密码"></el-input>
	            </el-form-item>
	            <router-link to="/register">
		            <span class="register">新用户注册</span>
		        </router-link>
	        </el-form>
	        <div slot="footer" class="dialog-footer">
	            <el-button type="danger" @click="dialogFormVisible = false">登录</el-button>
	        </div>
	</el-dialog>
  </div>
</template>

<script>
export default {
  name: 'IndexHeader',
  data () {
  	return {
  		isShow:false,
  		audioShow:false,
  		dialogFormVisible:false,
  	}
  },
  methods: {
  	enter(index) {
  		this.isShow = true;
  	},
  	leave(index) {
  		this.isShow = false;
  	},
  	audioToggle:function(){
  		this.audioShow = !this.audioShow;
  		this.$emit('listenToChildEvent', this.audioShow);
  	},
  	//用户登录
  	userLogin(){
  		this.dialogFormVisible = true;
  	}
  }
}
</script>

<style lang="stylus" scoped>
.el-dialog__wrapper >>> .el-dialog
  width:405px
.dialog-footer >>> .el-button
  width:100%
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
  	 .m-nav li a
  	    padding:0 19px
  	    text-align:center
  	    height:60px
  	    line-height:60px
  	    color:#333
  	    display:block
  	 .m-nav li a.active,.m-nav li a:hover
	    color: #C20C0C
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
      display:none
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
  .register
  	display:block
  	text-align:right
  	color:#ff6e52	
</style>
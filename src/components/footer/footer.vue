<template>
  <footer>
  	<div class="footer">
  		<div class="footer-inner">
  			<div class="footer-text clearfix">
  				<div class="footer-left clearfix">
  					<p class="title">有爱音乐</p>
  					<p class="ms-love">让音乐充满爱</p>
  				</div>
  				<div class="footer-center">
  					<p class="top001">官方</p>
  					<div class="fc-div">
  						<p class="first-p0">各大媒体号</p>
  						<p class="second-p0">微信公众号</p>
  					</div>
  				</div>
  				<div class="footer-right">
  					<p class="right-pr">官网</p>
  					<ul class="clearfix">
  						<li>
  							<a href="#">关于我们</a>
  						</li>
  						<li>
  							<a href="#">服务条款</a>
  						</li>
  						<li>
  							<a href="#">帮助中心</a>
  						</li>
  						<li>
  							<a href="#">联系我们</a>
  						</li>
  					</ul>
  				</div>
  			</div>
  			<p class="put-file">Copyright © 2019 YouAiMusic. 深圳市有爱网络传媒有限公司 版权所有  粤ICP备********号-*</p>
  		</div>
  	</div>
  </footer>
</template>

<script>
export default {
  name: 'IndexFooter',
  data () {
  	return {

  	}
  }
}
</script>

<style lang="stylus" scoped>
.footer
  width:100%
  height:213px
  background:#2f2f2f
  .footer-inner
  	width:1200px
  	color:#fff
  	margin:0 auto
  	padding:0 62px 0 35px
  	box-sizing:border-box
  	.footer-text
  	  padding-bottom:39px
  	  border-bottom:1px solid #505050
  	.footer-text .footer-left
  	  margin-top:52px
  	.footer-text .footer-center,.footer-text .footer-right
  	  margin-top:70px;
  	.footer-text .footer-left,.footer-text .footer-center,.footer-text .footer-right
  	  width:33.33%
  	  float:left
  	.footer-left p.title
  	  color:#d5d5d5
  	  font-size:30px
  	  margin-bottom:19px
  	.footer-left p.ms-love
  	  color:#d5d5d5
  	  font-size:18px
  	.footer-center
  	  padding-left:78px
  	  box-sizing:border-box
  	.footer-right
  	  padding-left:83px
  	  box-sizing:border-box
  	.footer-center p.top001,.footer-right .right-pr
  	  color:#d5d5d5
  	  font-size:20px
  	  margin-bottom:10px
  	.footer-center .fc-div p
  	  float:left
  	.footer-center .fc-div p.first-p0
      padding-right:10px
      position:relative
      color:#d5d5d5
    .footer-center .fc-div p.first-p0:after
      content:''
      width:1px
      height:16px
      background:#fff
      position:absolute
      right:0
    .footer-center .fc-div p.second-p0
      padding-left:10px
      color:#d5d5d5
    .footer-right ul li
      float:left
      padding-right:10px
      padding-left:10px
      position:relative
      font-size:14px
    .footer-right ul li:first-child
      padding-left:0
    .footer-right ul li:last-child
      padding-right:0
    .footer-right ul li:after
      position:absolute
      right:0
      content:''
      width:1px
      height:16px
      background:#fff
    .footer-right ul li:last-child:after
      width:0
    .footer-right ul li a
      color:#d5d5d5
  .put-file
    width:100%
    line-height:44px
    text-align:center
    color:#d5d5d5
</style>
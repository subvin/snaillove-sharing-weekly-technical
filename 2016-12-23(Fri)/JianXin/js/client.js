(function () {
	var d = document,
	w = window;


	w.CHAT = {
		contentObj:d.getElementById("publicChat"),
		username:null,
		userid:null,
		tx:null,
		socket:null,
		//让浏览器滚动条保持在最低部
		//退出，本例只是一个简单的刷新
		logout:function(){
			//this.socket.disconnect();
			location.reload();
		},
		//提交聊天消息内容
		submit:function(){
			var content = $("#content").html();
			if(content != ''){
				var recipient=$("#recipient").val();
				var obj = {
					userid: this.userid,
					touid:recipient,
					username: this.username,
					tx:this.tx,
					content: content
				};
				this.socket.emit('message', obj);
			}else{
				layer.msg('不能发送空消息', {
				  shift: 6
				});
			}
			return false;
		},
		//更新系统消息，本例中在用户加入、退出的时候调用
		updateSysMsg:function(o, action){
			//当前在线用户列表
			var onlineUsers = o.onlineUsers;
			var onlineUserTx = o.onlineUserTx;
			//当前在线人数
			var onlineCount = o.onlineCount-1;
			//新加入用户的信息
			var user = o.user;

			var contentDiv=$("#contentDiv");
			//更新在线人数
			for(key in onlineUsers) {
				//console.log(onlineUserTx[a]+onlineUsers[key]);
		        	if(onlineUsers.hasOwnProperty(key)){
					//$("#"+key).remove();
					if($("#"+key).length < 1){
						var userHead='image/pichead/' +onlineUserTx[key]+ '.png';
						var userlist="<li title="+onlineUsers[key]+" name='userListli' onclick=\"switchroom('"+key+"')\" id="+key+">";
						userlist+='<img class="avatar" width="30" height="30" alt='+onlineUsers[key]+' src='+userHead+'>';
						userlist+='<p class="name">'+onlineUsers[key]+'</p><a style="display:none" class="badgea">';
						userlist+='<span class="badgemsg"></span></a></li>';
						$("#userList").append(userlist);
					}
					if($("#private"+key).length < 1){
						var html="<ul style='display:none' name='chatul' id=\"private"+key+"\"></ul>";
						contentDiv.append(html);
					}
				}
		    	}
		    	//移除当前登录用户的私人房间以及用户列表的显示
		    	$("#private"+this.userid).remove();
			$("#"+this.userid).remove();

			var meHead='image/pichead/' +this.tx+ '.png';
			var meDiv='<header><img class="avatar" width="40" height="40" alt='+this.username+' src='+meHead+'>';
			meDiv+='<p title='+this.username+' class="name">'+this.username+'</p></header>';
			meDiv+='<footer><span class="search">在线：'+onlineCount+' 人</span></footer>';
			$("#meDiv").html(meDiv);

			if(action != 'login'){
				switchroom("public");
				//$("#private"+user.userid).remove();
				$("#"+user.userid).remove();
			}

			//弹幕提醒 加入或退出聊天室~
			if(user.userid!=this.userid){
				var html=(action == 'login') ? user.username+' 加入了聊天室' : user.username+' 退出了聊天室';
				var imgUrl='image/pichead/' +user.tx+ '.png';
				var item={
				   img:imgUrl, //图片
				   info:html, //文字
				   close:true, //显示关闭按钮
				   speed:8, //延迟,单位秒,默认6
				   color:'#fff', //颜色,默认白色
				   old_ie_color:'#000000', //ie低版兼容色,不能与网页背景相同,默认黑色
				 }
				$('body').barrager(item);
			}
		},
		init:function(username,uid,tx){
			$("#chat").show();
			$("#myphoto").hide();
			$("#recipient").val("public");
			/*
			随机数加字母生成uid,这样使得聊天室用户名称可以重复。
			实际项目中，如果是需要用户登录，那么直接采用用户的uid来做标识就可以
			*/
			this.userid = uid;
			this.username = username;
			this.tx= tx;

			//连接websocket后端服务器
			this.socket = io.connect('ws://test.snaillove.com/:3000');

			//告诉服务器端有用户登录
			this.socket.emit('login', {userid:this.userid, username:this.username,tx:this.tx});

			//监听新用户登录
			this.socket.on('login', function(o){
				CHAT.updateSysMsg(o, 'login');
			});

			//监听用户退出
			this.socket.on('logout', function(o){
				CHAT.updateSysMsg(o, 'logout');
			});

			//监听消息发送
			this.socket.on('message', function(obj){
				var isme = (obj.userid == CHAT.userid) ? true : false;
				var myDate = new Date();
				var imgUrl='image/pichead/' +obj.tx+ '.png';
				var html='<li><p class="time"><span>'+myDate.toLocaleTimeString()+'</span></p>';
				if(isme){
					$("#content").html("");
					html+='<div class="main self"><img class="avatar" width="30" height="30" src='+imgUrl+'>';
					html+='<div class="text">'+obj.content+'</div></div></li>';
				} else {
					html+='<div class="main"><img class="avatar" width="30" height="30" src='+imgUrl+'>'+obj.username+'<br>';
					html+='<div class="text">'+obj.content+'</div></div></li>';

					var timerArr = $.blinkTitle.show();
					setTimeout(function() {
						$.blinkTitle.clear(timerArr);
					}, 6000);
				}

				if(obj.touid=="public"){
					$("#publicChat").append(html);
					if($("#publicChat").is(":hidden")&&!isme){
						$("#publicUser").find("a").show();
						var a=$("#publicUser").find("span").html();
					       $("#publicUser").find("span").html(Number(a)+1);
					}
				}

				if(obj.touid==CHAT.userid){
					$("#private"+obj.userid).append(html);
					if($("#private"+obj.userid).is(":hidden")&&!isme){
						$("#"+obj.userid).find("a").show();
						var b=$("#"+obj.userid).find("span").html();
					       $("#"+obj.userid).find("span").html(Number(b)+1);
					}
				}

				if(obj.userid==CHAT.userid){
					$("#private"+obj.touid).append(html);
					if($("#private"+obj.touid).is(":hidden")&&!isme){
						$("#"+obj.touid).find("a").show();
						var c=$("#"+obj.touid).find("span").html();
					       $("#"+obj.touid).find("span").html(Number(c)+1);
					}
				}

				$('#contentDiv').scrollTop( $('#contentDiv')[0].scrollHeight );
			});

		}
	};
	//通过“回车”提交信息
	$('#content').keydown(function(e){
		if(e.which == 13) {
			CHAT.submit();
		}
	});
})();

function switchroom(key){
	$("li[name='userListli']").each(function(){
		$(this).removeClass("active");
	})
	$("ul[name='chatul']").each(function(){
		$(this).hide();
	})
	if(key=="public"){
		$("#recipient").val("public");
		$("#publicUser").addClass("active");
		$("#publicUser").find("a").hide();
		$("#publicUser").find("span").html("");
		$("#publicChat").show();
	}else{
		$("#recipient").val(key)
		$("#"+key).addClass("active");
		$("#"+key).find("a").hide();
		$("#"+key).find("span").html("");
		$("#private"+key).show();
	}
	$('#contentDiv').scrollTop( $('#contentDiv')[0].scrollHeight );
}

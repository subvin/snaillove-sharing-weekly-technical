<h1>Chat</h1>
Nodejs+websocket 开发在线聊天室

<h3>需求分析：</h3>
1、允许用户名相同。<br/>
2、支持头像自定义。<br/>
3、支持一对一单聊。<br/>
4、用户上线或退出，所有在线的用户收到通知消息。<br/>
5、用户发送消息，所有在线用户实时收取。<br/>


<h3>搭建步骤：</h3>
1.安装Node.js <br/>
&nbsp;&nbsp;&nbsp;&nbsp;根据自己的操作系统，去<a href="https://nodejs.org" target="_blank">Node.js官网</a>下载安装即可。<br/>
2.搭建WebSocket服务端<br/>
&nbsp;&nbsp;&nbsp;&nbsp;下载package.json文件到你的工作目录，当前目录下使用npm命令安装express和socket.io<br/>
&nbsp;&nbsp;&nbsp;&nbsp;npm install --save express<br/>
&nbsp;&nbsp;&nbsp;&nbsp;npm install --save socket.io<br/>
&nbsp;&nbsp;&nbsp;&nbsp;执行完成后会在当前目录生成两个文件夹 分别是express和socket.io<br/>
&nbsp;&nbsp;&nbsp;&nbsp;接下来命令行运行node index.js<br/>
&nbsp;&nbsp;&nbsp;&nbsp;浏览器中打开http://localhost:3000 应该可以看到websocket的欢迎页<br/>
3.安装nginx<br/>
&nbsp;&nbsp;&nbsp;&nbsp;根据自己操作系统，去<a href="http://nginx.org/" target="_blank">nginx官网</a>下载nginx服务器<br/>
&nbsp;&nbsp;&nbsp;&nbsp;下载的newChat文件夹拷贝到nginx的webserver,启动即可。<br/>

(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{34:function(e,t,a){e.exports=a(63)},39:function(e,t,a){},40:function(e,t,a){},63:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),r=a(31),o=a.n(r),l=(a(39),a(17),a(4)),i=a(14),u=a(5),c=a(6),m=a(9),p=a(7),h=a(8),d=(a(40),function(e){function t(){return Object(u.a)(this,t),Object(m.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return s.a.createElement("div",null,s.a.createElement("nav",{className:"navbar navbar-dark bg-dark navbar-expand-lg"},s.a.createElement("div",{className:"collpase navbar-collapse"},s.a.createElement("div",{className:"navbar-nav mr-auto"},s.a.createElement("h1",{style:{color:"white"}},"Splits"),s.a.createElement("div",{className:"row",style:{justifyContent:"center"}},s.a.createElement("p",{className:"navbar-item"},s.a.createElement(l.b,{to:"/home/workout",className:"nav-link"},"View Today's Workout")),s.a.createElement("p",{className:"navbar-item"},s.a.createElement(l.b,{to:"/home/switch",className:"nav-link"},"Choose Split")))))))}}]),t}(n.Component)),b=a(10),g=a(13),f=a.n(g),v=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(m.a)(this,Object(p.a)(t).call(this,e))).onChangeUsername=a.onChangeUsername.bind(Object(b.a)(a)),a.onSubmit=a.onSubmit.bind(Object(b.a)(a)),a.onChangePassword=a.onChangePassword.bind(Object(b.a)(a)),a.state={email:"",password:"",loggedin:!1,user:{}},a}return Object(h.a)(t,e),Object(c.a)(t,[{key:"onChangeUsername",value:function(e){this.setState({email:e.target.value})}},{key:"onChangePassword",value:function(e){this.setState({password:e.target.value})}},{key:"onSubmit",value:function(e){var t=this;e.preventDefault();var a={email:this.state.email,password:this.state.password};f.a.post("https://splits-app.herokuapp.com/User/signin",a).then((function(e){200==e.status&&t.setState({loggedin:!0})})),this.setState({email:"",password:"",user:a})}},{key:"render",value:function(){return this.state.loggedin?s.a.createElement(i.a,{to:{pathname:"/home",state:{user:this.state.user}}}):s.a.createElement("div",{style:{textAlign:"center",justifyContent:"center"}},s.a.createElement("h3",null,"Sign In"),s.a.createElement("form",{onSubmit:this.onSubmit},s.a.createElement("div",{className:"form-group"},s.a.createElement("label",null,"Username: "),s.a.createElement("input",{type:"text",style:{width:"50%",marginLeft:"auto",marginRight:"auto"},required:!0,className:"form-control",value:this.state.username,onChange:this.onChangeUsername}),s.a.createElement("label",null,"Password: "),s.a.createElement("input",{type:"password",style:{width:"50%",marginLeft:"auto",marginRight:"auto"},required:!0,className:"form-control",value:this.state.password,onChange:this.onChangePassword})),s.a.createElement("div",{className:"row",style:{textAlign:"center",justifyContent:"center"}},s.a.createElement("div",{className:"form-group",style:{marginRight:"5px"}},s.a.createElement("input",{type:"submit",value:"Sign In",className:"btn btn-primary"})),s.a.createElement("div",{className:"form-group",style:{marginLeft:"5px"}},s.a.createElement(l.b,{to:"/signup",className:"btn btn-primary"},"Sign Up")))))}}]),t}(n.Component),w=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(m.a)(this,Object(p.a)(t).call(this,e))).onChangeUsername=a.onChangeUsername.bind(Object(b.a)(a)),a.onSubmit=a.onSubmit.bind(Object(b.a)(a)),a.onChangePassword=a.onChangePassword.bind(Object(b.a)(a)),a.state={email:"",password:"",signup:!1},a}return Object(h.a)(t,e),Object(c.a)(t,[{key:"onChangeUsername",value:function(e){this.setState({email:e.target.value})}},{key:"onChangePassword",value:function(e){this.setState({password:e.target.value})}},{key:"onSubmit",value:function(e){var t=this;e.preventDefault();var a={email:this.state.email,password:this.state.password};f.a.post("https://splits-app.herokuapp.com/User/signup",a).then((function(e){200==e.status&&t.setState({signup:!0})})),this.setState({email:"",password:""})}},{key:"render",value:function(){return this.state.signup?s.a.createElement(i.a,{to:"/"}):s.a.createElement("div",null,s.a.createElement("h3",null,"Create New User"),s.a.createElement("form",{onSubmit:this.onSubmit},s.a.createElement("div",{className:"form-group"},s.a.createElement("label",null,"Username: "),s.a.createElement("input",{type:"text",required:!0,className:"form-control",value:this.state.username,onChange:this.onChangeUsername}),s.a.createElement("label",null,"Password: "),s.a.createElement("input",{type:"text",required:!0,className:"form-control",value:this.state.password,onChange:this.onChangePassword})),s.a.createElement("div",{className:"form-group"},s.a.createElement("input",{type:"submit",value:"Create User",className:"btn btn-primary"}))))}}]),t}(n.Component),k=function(e){function t(e){var a;Object(u.a)(this,t);return(a=Object(m.a)(this,Object(p.a)(t).call(this,e))).state={user:a.props.user,split:"",workoutId:"",workout:{},isLoading:!0},console.log("Email : "+a.state.user.email),a}return Object(h.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;this._isMounted=!0,f.a.post("https://splits-app.herokuapp.com/User/workout",this.state.user).then((function(t){if(200==t.status&&1==e._isMounted){var a,n=t.data._id;switch(e.setState({split:n}),(new Date).getDay()){case 0:break;case 1:"ppl"==n?a="push1":"upper/lower"==n?a="upper1":"full"==n&&(a="full1"),e.setState({workout:t.data[n][a],workoutId:a});break;case 2:"ppl"==n?a="pull1":"upper/lower"==n?a="lower1":"full"==n&&(a=""),e.setState({workout:t.data[n][a],workoutId:a});break;case 3:"ppl"==n?a="leg1":"upper/lower"==n?a="":"full"==n&&(a=""),e.setState({workout:t.data[n][a],workoutId:a});break;case 4:"ppl"==n?a="push2":"upper/lower"==n?a="upper2":"full"==n&&(a="full2"),e.setState({workout:t.data[n][a],workoutId:a});break;case 5:"ppl"==n?a="pull2":"upper/lower"==n?a="lower2":"full"==n&&(a=""),e.setState({workout:t.data[n][a],workoutId:a});break;case 6:"ppl"==n?a="leg1":"upper/lower"==n?a="":"full"==n&&(a=""),e.setState({workout:t.data[n][a],workoutId:a})}e.setState({isLoading:!1})}else console.log("Unmounted")}))}},{key:"componentWillUnmount",value:function(){this._isMounted=!1}},{key:"render",value:function(){return""==this.state.workoutId?s.a.createElement("div",{style:{textAlign:"center"}},s.a.createElement("h1",null,"REST DAY")):s.a.createElement("div",{style:{textAlign:"center"}},s.a.createElement("h1",null,this.state.split," - ",this.state.workoutId),s.a.createElement("pre",null,JSON.stringify(this.state.workout,null,2)))}}]),t}(n.Component),E=function(e){function t(e){var a;Object(u.a)(this,t);return(a=Object(m.a)(this,Object(p.a)(t).call(this,e))).state={user:a.props.user,isMounted:!1,split:"",isLoading:!0},a.handleClick=a.handleClick.bind(Object(b.a)(a)),a}return Object(h.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;this._isMounted=!0,f.a.post("https://splits-app.herokuapp.com/User/switch2",this.state.user).then((function(t){(t.status=e._isMounted)?e.setState({split:t.data.split,isLoading:!1}):console.log("Unable to qeury data")}))}},{key:"componentWillUnmount",value:function(){this._isMounted=!1}},{key:"handleClick",value:function(e,t){var a=this;t.preventDefault(),f.a.post("https://splits-app.herokuapp.com/User/switch",{user:this.state.user,split:e}).then((function(e){(e.status=a._isMounted)?a.setState({split:e.data.split}):console.log("Unable to change split")}))}},{key:"render",value:function(){var e=this;return s.a.createElement("div",null,s.a.createElement("h1",{style:{textAlign:"center"}},"Current split : ",this.state.split),s.a.createElement("div",{className:"row",style:{display:"flex",alignItems:"center",justifyContent:"center"}},s.a.createElement("button",{onClick:function(t){return e.handleClick("ppl",t)},href:"/"},"Push-Pull-Legs"),s.a.createElement("button",{onClick:function(t){return e.handleClick("upper/lower",t)},href:"/"},"Upper - Lower"),s.a.createElement("button",{onClick:function(t){return e.handleClick("full",t)},href:"/"},"Full Body")))}}]),t}(n.Component),y=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(m.a)(this,Object(p.a)(t).call(this,e))).state={user:a.props.location.state.user,split:a.props.location.state.user.split},console.log(a.state.user.email),a}return Object(h.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return s.a.createElement(l.a,null,s.a.createElement("div",{className:"container"},s.a.createElement(d,null),s.a.createElement("br",null),s.a.createElement(i.b,{exact:!0,path:"/home"},s.a.createElement(i.a,{to:"/home/workout"})),s.a.createElement(i.b,{path:"/home/workout",render:function(t){return s.a.createElement(k,Object.assign({},t,{user:e.state.user}))}}),s.a.createElement(i.b,{path:"/home/switch",render:function(t){return s.a.createElement(E,Object.assign({},t,{user:e.state.user}))}})))}}]),t}(n.Component);var j=function(){return s.a.createElement(l.a,null,s.a.createElement(i.b,{exact:!0,path:"/",component:v}),s.a.createElement(i.b,{path:"/home",component:y}),s.a.createElement(i.b,{path:"/signup",component:w}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(s.a.createElement(j,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[34,1,2]]]);
//# sourceMappingURL=main.4da17d5f.chunk.js.map
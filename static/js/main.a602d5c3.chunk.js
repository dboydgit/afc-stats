(this["webpackJsonpultimate-stats"]=this["webpackJsonpultimate-stats"]||[]).push([[0],{40:function(e,t,a){e.exports=a(66)},45:function(e,t,a){},46:function(e,t,a){},50:function(e,t,a){},51:function(e,t,a){},56:function(e,t,a){},57:function(e,t,a){},58:function(e,t,a){},59:function(e,t,a){},63:function(e,t,a){},66:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(17),c=a.n(s),l=(a(45),a(5)),o=a(2),m=a(10),i=a(15),u=(a(46),a(25));a(50),a(51);function d(){return r.a.createElement("header",{className:"app-header"},r.a.createElement("h1",null,"AFC Premier League Stats"))}function b(e){var t=Object(n.useState)(""),a=Object(o.a)(t,2),s=a[0],c=a[1];return r.a.createElement("div",{className:"App"},r.a.createElement(d,null),r.a.createElement("div",{className:"home-content"},!e.userID&&r.a.createElement("div",{className:"home-form"},r.a.createElement("p",null,"Who is taking stats?"),r.a.createElement("form",{onSubmit:function(t){t.preventDefault(),e.setUserID(s),localStorage.setItem("userID",s)}},r.a.createElement("input",{id:"home-input",type:"text",value:s,onChange:function(e){c(e.target.value)}}),r.a.createElement("button",{className:"btn",type:"submit"},"Start"))),e.userID&&r.a.createElement("div",null,r.a.createElement("p",null,"Welcome, ".concat(e.userID)),r.a.createElement("div",{className:"home-btn-group"},r.a.createElement(m.b,{className:"btn",to:"/stats"},"Stats"),r.a.createElement(m.b,{className:"btn",to:"/subs"},"Subs"),r.a.createElement(m.b,{className:"btn",to:"/teams"},"Teams"),r.a.createElement(m.b,{className:"btn",to:"/games"},"Past Games")))))}var p=a(14),g=a(30);a(56);function f(e){var t=Object(n.useState)("25"),a=Object(o.a)(t,2),s=a[0],c=a[1],l=Object(n.useState)(""),m=Object(o.a)(l,2),i=m[0],u=m[1],d=Object(n.useState)(""),b=Object(o.a)(d,2),p=b[0],g=b[1],f=Object(n.useState)(""),S=Object(o.a)(f,2),h=S[0],v=S[1],E=Object(n.useState)(""),y=Object(o.a)(E,2),T=y[0],O=y[1],k=Object(n.useState)(""),N=Object(o.a)(k,2),j=N[0],C=N[1],w=[r.a.createElement("option",{value:"",key:""})],P=!0,G=!1,D=void 0;try{for(var F,H=e.teams[Symbol.iterator]();!(P=(F=H.next()).done);P=!0){var I=F.value;w.push(r.a.createElement("option",{value:I.name,key:I.name},I.name))}}catch(A){G=!0,D=A}finally{try{P||null==H.return||H.return()}finally{if(G)throw D}}return r.a.createElement("div",{className:"game-setup card"},r.a.createElement("h3",{id:"setup-title"},"Game Setup"),r.a.createElement("label",{htmlFor:"game-length"},"Game Length (mins)"),r.a.createElement("input",{name:"game-length",type:"number",min:"1",max:"120",value:s,onChange:function(e){return c(e.target.value)}}),r.a.createElement("label",{htmlFor:"dark-team"},"Select Dark Team"),r.a.createElement("select",{name:"dark-team",value:i,onChange:function(e){return u(e.target.value)}},w),r.a.createElement("label",{htmlFor:"light-team"},"Select Light Team"),r.a.createElement("select",{name:"light-team",value:p,onChange:function(e){return g(e.target.value)}},w),r.a.createElement("label",{htmlFor:"stat-team"},"Tracking ".concat(e.forStats?"Stats":"Subs"," For")),r.a.createElement("select",{name:"stat-team",value:h,onChange:function(e){return v(e.target.value)}},r.a.createElement("option",null),r.a.createElement("option",null,"".concat(i)),r.a.createElement("option",null,"".concat(p))),e.forStats&&r.a.createElement(r.a.Fragment,null,r.a.createElement("label",{htmlFor:"offence-team"},"Team on Offence"),r.a.createElement("select",{name:"offence-team",value:T,onChange:function(e){return O(e.target.value)}},r.a.createElement("option",null),r.a.createElement("option",null,"".concat(i)),r.a.createElement("option",null,"".concat(p)))),r.a.createElement("div",{id:"test-game-checkbox",onChange:function(t){t.target.checked?e.setTestGame(!0):e.setTestGame(!1)}},r.a.createElement("input",{type:"checkbox"}),r.a.createElement("span",null,"Check for test game")),r.a.createElement("button",{className:"btn",onClick:function(){var t;(function(e){var t=parseInt(e);return t>=1&&t<=120})(s)?i&&p&&h&&(!e.forStats||T)?(t=e.forStats?h===T:"subs",e.finishSetup(s,i,p,h,t)):C("Please choose all options"):C("Time should be between 1 - 120 mins")}},"Finish Setup"),j&&r.a.createElement("span",{className:"form-err"},j))}function S(e){return r.a.createElement("div",{className:"game-info"},r.a.createElement("div",{className:"score-card dark"},r.a.createElement("span",{id:"team-name"},e.darkTeam),e.score&&r.a.createElement("span",{className:"score dark"},e.score.dark)),r.a.createElement("div",{className:"game-clock"},r.a.createElement("span",null,"".concat(e.gameTime)),r.a.createElement("div",{className:"timer-controls"},r.a.createElement("i",{className:"material-icons timer-control",onClick:function(){e.startTimer(),e.setPaused(!1),console.log("start timer")}},"play_arrow"),!e.paused&&r.a.createElement("i",{className:"material-icons timer-control",onClick:function(){e.pauseTimer(),e.setPaused(!0),console.log("pause timer")}},"pause"),e.score&&e.paused&&r.a.createElement("i",{className:"material-icons timer-control",onClick:function(){e.resetTimer(),e.pauseTimer(),e.setPaused(!1),console.log("reset timer")}},"replay"))),r.a.createElement("div",{className:"score-card light"},r.a.createElement("span",{id:"team-name"},e.lightTeam),e.score&&r.a.createElement("span",{className:"score light"},e.score.light)))}function h(e){var t=!1,a=!0,n=!1,s=!1;return e.prevEntry.action&&!e.prevEntry.turnover||(t=!0),e.prevEntry.turnover||e.prevEntry.player!==e.player.name||(n=!0,a=!1,s=!0),r.a.createElement("div",{className:"stat-btns"},r.a.createElement("button",{className:"btn stat-btn ".concat(n?"btn-inactive":""),name:"Touch",onClick:function(t){return e.handleStatClick(t,e.player.name,!1)}},"Touch",r.a.createElement("div",{className:"score-badge"},e.player.Touch),0!==e.player.Assist&&r.a.createElement("div",{className:"score-badge assist"},"".concat(e.player.Assist,"-A"))),r.a.createElement("button",{className:"btn stat-btn ".concat(t?"btn-inactive":""),name:"Point",onClick:function(t){return e.handleStatClick(t,e.player.name)}},"Point",r.a.createElement("div",{className:"score-badge"},e.player.Point)),r.a.createElement("button",{className:"btn stat-btn ".concat(t||a?"btn-inactive":""),name:"T-Away",onClick:function(t){return e.handleStatClick(t,e.player.name)}},"T-Away",r.a.createElement("div",{className:"score-badge"},e.player["T-Away"])),r.a.createElement("button",{className:"btn stat-btn ".concat(t||s?"btn-inactive":""),name:"Drop",onClick:function(t){return e.handleStatClick(t,e.player.name)}},"Drop",r.a.createElement("div",{className:"score-badge"},e.player.Drop)))}function v(e){return r.a.createElement("div",{className:"stat-btns"},r.a.createElement("button",{className:"btn stat-btn",name:"D-Play",onClick:function(t){return e.handleStatClick(t,e.player.name)}},"D-Play",r.a.createElement("div",{className:"score-badge"},e.player["D-Play"])),r.a.createElement("button",{className:"btn stat-btn",name:"GSO",onClick:function(t){return e.handleStatClick(t,e.player.name)}},"GSO",r.a.createElement("div",{className:"score-badge"},e.player.GSO)),r.a.createElement("button",{className:"btn stat-btn",name:"GSO-Mark",onClick:function(t){return e.handleStatClick(t,e.player.name)}},"GSO-Mark",r.a.createElement("div",{className:"score-badge"},e.player["GSO-Mark"])))}function E(e){var t=e.playerStats.map((function(t){return r.a.createElement("div",{key:t.name,className:"player-input"},r.a.createElement("div",{className:"player-name ".concat(e.darkTeam===e.statTeam?"dark":"")},r.a.createElement("span",{className:"player-text"},t.name)),e.offense&&r.a.createElement(h,{player:t,handleStatClick:e.handleStatClick,prevEntry:e.prevEntry}),!e.offense&&r.a.createElement(v,{player:t,handleStatClick:e.handleStatClick}))}));return r.a.createElement("div",{className:"player-list"},t)}a(57);var y=a(4);function T(e){window.onbeforeunload=function(t){e.showStatSetup||(t.returnValue="Game will not be saved.")};var t=Object(n.useState)(!1),a=Object(o.a)(t,2),s=a[0],c=a[1],m=Object(n.useState)(""),i=Object(o.a)(m,2),u=i[0],d=i[1],b=Object(n.useState)({action:"",player:"",turnover:!1}),h=Object(o.a)(b,2),v=h[0],T=h[1],O=function(t){var a,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",r=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];y.c.dismiss();var s=t.currentTarget.name,c=Object(l.a)(e.gameHistory),o=c[c.length-1]||"",m=c[c.length-2]||"",i="",u="";if(!o||"Point"!==s&&"Drop"!==s||(i=o.player||"",u=m.player||""),!e.offense||"Touch"===s||!o.turnover&&c.length)if("Drop"!==s||o.player!==n){if("Touch"===s&&!o.turnover){if(n===o.player)return void y.c.error("Cannot touch the disc twice in a row");i=o.player||"",u=m.player||""}if("T-Away"===s){if("Touch"!==o.action)return void y.c.error("Throwaway can only be recorded following a touch");if(o.player!==n)return console.log(o.player),void y.c.error("Only player in possession (".concat(o.player,") can throwaway"))}var d=Object(g.a)({},e.score);"Point"===s&&(e.statTeam===e.darkTeam?d.dark++:d.light++),"GSO"!==s&&"GSO-Mark"!==s||(e.statTeam===e.darkTeam?d.light++:d.dark++),e.setScore(d);var b=new Date,f=(a={date:b.toDateString(),time:b.toTimeString(),gameTime:e.gameTime,statTeam:e.statTeam},Object(p.a)(a,"".concat(e.darkTeam,"_score"),d.dark),Object(p.a)(a,"".concat(e.lightTeam,"_score"),d.light),Object(p.a)(a,"action",s),Object(p.a)(a,"player",n),Object(p.a)(a,"lastPlayer",i),Object(p.a)(a,"secLastPlayer",u),Object(p.a)(a,"turnover",r),a),S=Object(l.a)(e.playerStats);S.forEach((function(e){e.name===n&&(i===n||"Drop"!==s&&"Point"!==s||e.Touch++,e[s]++),"Point"===s&&e.name===i&&e.Assist++})),e.setPlayerStats(S),console.log("".concat(n,": ").concat(s,": gameClock: ").concat(e.gameTime,": \n            time: ").concat(f.time)),y.c.success("Last Entry: ".concat(s).concat(n?" - "+n:""," ").concat(i?" from "+i:"")),T({action:s,player:n,turnover:r}),r&&e.toggleOffense(),c.push(f),e.setGameHistory(c)}else y.c.error("Cannot drop own throw");else y.c.error("First action of a possession must be a touch")};return r.a.createElement("div",{className:"App"},r.a.createElement("div",{className:"stats"},!e.showSubSetup&&r.a.createElement("p",null,"Currently tracking Subs."),e.showSubSetup&&e.showStatSetup&&r.a.createElement(f,{teams:e.teams,finishSetup:e.finishSetup,setTestGame:e.setTestGame,forStats:!0}),e.showSubSetup&&!e.showStatSetup&&r.a.createElement("div",{className:"game-stats"},e.testGame&&r.a.createElement("div",{id:"test-notification"},r.a.createElement("p",{id:"test-text"},"Test Game")),r.a.createElement(S,{darkTeam:e.darkTeam,lightTeam:e.lightTeam,score:e.score,gameTime:e.gameTime,gameLength:e.gameLength,startTimer:e.startTimer,pauseTimer:e.pauseTimer,resetTimer:e.resetTimer,paused:e.paused,setPaused:e.setPaused,forStats:!0}),r.a.createElement("div",{className:"game-options"},r.a.createElement("button",{className:"btn opt-btn",onClick:function(){window.confirm("Cancel Game? Progress will not be saved.")&&(y.c.dismiss(),y.c.error("Game Deleted",{autoClose:2500}),e.resetGame())}},"Exit Game"),r.a.createElement("button",{className:"btn ".concat(e.paused?"":"btn-inactive"," opt-btn"),onClick:function(){e.paused?(y.c.dismiss(),y.c.success("Game Saved",{autoClose:3e3}),e.saveGame("stats")):y.c.error("Cannot finish game when timer is running. Pause timer to finish game early.",{autoClose:2500})}},"Finish & Save"),r.a.createElement("button",{className:"btn opt-btn",onClick:function(){y.c.dismiss();var t=Object(l.a)(e.gameHistory),a=Object(g.a)({},e.score),n=t.pop();if(n){console.log("UNDO");var r=Object(l.a)(e.playerStats);if(r.forEach((function(e){e.name===n.player&&("Drop"===n.action&&e.Touch--,e[n.action]--),"Point"===n.action&&n.lastPlayer===e.name&&e.Assist--})),e.setPlayerStats(r),n.turnover&&e.toggleOffense(),"Point"===n.action&&(e.statTeam===e.darkTeam?a.dark--:a.light--),"GSO"!==n.action&&"GSO-Mark"!==n.action||(e.statTeam===e.darkTeam?a.light--:a.dark--),y.c.info("UNDO: ".concat(n.action," by ").concat(n.player)),e.setScore(a),e.setGameHistory(t),t.length){var s=t[t.length-1];T({action:s.action,player:s.player,turnover:s.turnover})}else T({action:"",player:"",turnover:!1})}else y.c.info("Nothing to undo")}},"Undo",r.a.createElement("i",{className:"material-icons md-18"},"undo"))),r.a.createElement(E,{offense:e.offense,playerStats:e.playerStats,setPlayerStats:e.setPlayerStats,statTeam:e.statTeam,darkTeam:e.darkTeam,handleStatClick:O,gameHistory:e.gameHistory,prevEntry:v}),!e.offense&&r.a.createElement("button",{className:"btn stat-btn stat-btn-after",name:"O-Error",onClick:function(e){return O(e)}},"Offensive Error"),!s&&r.a.createElement("button",{className:"btn stat-btn stat-btn-after",onClick:function(){return c(!0)}},"Add Player"),s&&r.a.createElement("div",{className:"add-player-input"},r.a.createElement("i",{className:"material-icons",onClick:function(){return c(!1)}},"close"),r.a.createElement("input",{placeholder:"player name",onChange:function(e){return d(e.target.value)},value:u}),r.a.createElement("button",{className:"btn stat-btn stat-btn-after",onClick:function(){return function(t){var a=Object(l.a)(e.playerStats);a.push({name:t,Touch:0,Assist:0,Point:0,"T-Away":0,Drop:0,"D-Play":0,GSO:0,"GSO-Mark":0}),e.setPlayerStats(a),c(!1),d("")}(u)}},"Save")))))}a(58);var O=function(e){var t=Math.floor(e/60),a=Math.round(e-60*t);return"".concat(t.toString(),":").concat(a.toString().padStart(2,0))},k=function(e){if(!e)return 0;var t=e.split(":");return 60*parseInt(t[0])+parseInt(t[1])};function N(e){var t=e.subStats.map((function(t,a){return r.a.createElement("div",{key:t.name,className:"player-input sub-player"},r.a.createElement("div",{className:"player-name sub-name ".concat(e.darkTeam===e.statTeam?"dark":"")},r.a.createElement("span",{className:"player-text"},t.name),a<4?r.a.createElement("span",null,"Point: ".concat(t.lastTimeIn?function(e,t){var a=k(e)-k(t);return O(a)}(t.lastTimeIn,e.gameTime):"0:00")):r.a.createElement("span",null,"Total: ".concat(O(t.timeOnField)))),a<4&&r.a.createElement("button",{className:"btn sub-btn ".concat(e.subPlayerSelected===t.name?"btn-sec":""),onClick:function(){return e.handleOut(t)}},"Sub Out"),a>=4&&r.a.createElement("button",{className:"btn sub-btn ".concat(e.subPlayerSelected===t.name?"btn-sec":""),onClick:function(){return e.handleIn(t)}},"Sub In"))}));return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"player-list sub-list"},t))}function j(e){var t=function(t,a){var n=Object(l.a)(e.subStats),r=n.findIndex((function(e){return e.name===t})),s=n.findIndex((function(e){return e.name===a})),c=k(n[s].lastTimeIn)-k(e.gameTime);n[s].timeOnField+=c,n[s].shiftLengths.push(c),e.addSubHistory(n[r].name,n[s].name,n[s].timeOnField),n[r].lastTimeIn=e.gameTime;var o=n.splice(n.findIndex((function(e){return e.name===t})),1),m=n.splice(n.findIndex((function(e){return e.name===a})),1);n.unshift(o[0]),n.push(m[0]),e.setSubStats(n),e.setSubInSelected(!1),e.setSubOutSelected(!1),e.setSubPlayerSelected(""),y.c.dismiss(),y.c.success("Subbed in ".concat(t," for ").concat(a))};return r.a.createElement("div",{className:"App"},!e.showStatSetup&&r.a.createElement("p",null,"Currently tracking Stats."),e.showStatSetup&&e.showSubSetup&&r.a.createElement(f,{teams:e.teams,finishSetup:e.finishSetup,setTestGame:e.setTestGame,forStats:!1}),e.showStatSetup&&!e.showSubSetup&&r.a.createElement("div",{className:"game-stats"},r.a.createElement(S,{darkTeam:e.darkTeam,lightTeam:e.lightTeam,gameTime:e.gameTime,gameLength:e.gameLength,startTimer:e.startTimer,pauseTimer:e.pauseTimer,resetTimer:e.resetTimer,paused:e.paused,setPaused:e.setPaused,forStats:!1}),r.a.createElement("div",{className:"game-options"},r.a.createElement("button",{className:"btn opt-btn",onClick:function(){window.confirm("Cancel Game? Progress will not be saved.")&&(y.c.dismiss(),y.c.error("Game Deleted",{autoClose:2500}),e.resetGame())}},"Exit Game"),r.a.createElement("button",{className:"btn ".concat(e.paused?"":"btn-inactive"," opt-btn"),onClick:function(){e.paused?(!function(){for(var t=Object(l.a)(e.subStats),a=0;a<4;a++){var n=k(t[a].lastTimeIn)-k(e.gameTime);t[a].timeOnField+=n,t[a].shiftLengths.push(n)}var r=!0,s=!1,c=void 0;try{for(var o,m=t[Symbol.iterator]();!(r=(o=m.next()).done);r=!0){var i=o.value;i.timeMMSS=O(i.timeOnField),i.shifts=i.shiftLengths.length,i.averageTimeOnSecs=i.timeOnField/i.shifts||0,i.averageTimeOnMMSS=O(i.averageTimeOnSecs)}}catch(u){s=!0,c=u}finally{try{r||null==m.return||m.return()}finally{if(s)throw c}}e.setSubStats(t)}(),y.c.dismiss(),y.c.success("Game Saved",{autoClose:3e3}),e.saveGame("subs")):y.c.error("Cannot finish game when timer is running. Pause timer to finish game early.",{autoClose:2500})}},"Finish & Save")),r.a.createElement(N,{subStats:e.subStats,setSubStats:e.setSubStats,darkTeam:e.darkTeam,lightTeam:e.lightTeam,statTeam:e.statTeam,handleIn:function(a){e.subInSelected?e.setSubPlayerSelected(a.name):e.subOutSelected?t(a.name,e.subPlayerSelected):(e.setSubPlayerSelected(a.name),e.setSubInSelected(!0))},handleOut:function(a){e.subOutSelected?e.setSubPlayerSelected(a.name):e.subInSelected?t(e.subPlayerSelected,a.name):(e.setSubPlayerSelected(a.name),e.setSubOutSelected(!0))},subPlayerSelected:e.subPlayerSelected,gameLength:e.gameLength,gameTime:e.gameTime})))}var C=function(e){var t=Object(n.useState)(e.player),a=Object(o.a)(t,2),s=a[0],c=a[1];return r.a.createElement("div",{className:"player-list-item"},r.a.createElement("i",{className:"material-icons player-del",onClick:function(){e.deletePlayer(s)}},"delete"),r.a.createElement("input",{className:"player-card",name:e.ind,value:s,onChange:function(t){c(t.target.value);var a=Object(l.a)(e.teams),n=a.findIndex((function(t){return t.name===e.team.name})),r=parseInt(t.target.name);a[n].players[r]=t.target.value,e.setTeams(a)}}))},w=function(e){var t=e.team.players.map((function(t,a){return r.a.createElement(C,{player:t,ind:a,key:a,teams:e.teams,setTeams:e.setTeams,team:e.team,deletePlayer:e.deletePlayer})}));return r.a.createElement("div",{className:"player-list"},t)};function P(e){var t=Object(n.useState)(!1),a=Object(o.a)(t,2),s=a[0],c=a[1],m=function(){c(!s)};return r.a.createElement("div",{className:"card team-card"},r.a.createElement("div",{className:"team-name"},r.a.createElement("span",null,"".concat(e.team.name))),r.a.createElement("div",{className:"card-info"},r.a.createElement("span",{className:"gm-name"},"GM: ".concat(e.team.gm)),r.a.createElement("span",{className:"card-link",onClick:m},r.a.createElement("span",null,"Players"),!s&&r.a.createElement("i",{className:"material-icons md-18"},"arrow_drop_down"),s&&r.a.createElement("i",{className:"material-icons md-18"},"arrow_drop_up"))),s&&r.a.createElement("div",{className:"card-players"},r.a.createElement(w,{team:e.team,teams:e.teams,setTeams:e.setTeams,deletePlayer:function(t){var a=Object(l.a)(e.teams),n=!0,r=!1,s=void 0;try{for(var c,o=a[Symbol.iterator]();!(n=(c=o.next()).done);n=!0){var m=c.value;if(m.name!==e.team.name);else{var i=m.players.findIndex((function(e){return e===t}));m.players.splice(i,1)}}}catch(u){r=!0,s=u}finally{try{n||null==o.return||o.return()}finally{if(r)throw s}}e.setTeams(a)}}),r.a.createElement("button",{className:"btn team-btn btn-del",name:e.ind,onClick:e.deleteTeam},"Delete Team"),r.a.createElement("button",{className:"btn team-btn",onClick:function(){var t=Object(l.a)(e.teams),a=!0,n=!1,r=void 0;try{for(var s,c=t[Symbol.iterator]();!(a=(s=c.next()).done);a=!0){var o=s.value;o.name!==e.team.name||o.players.push("New Player")}}catch(m){n=!0,r=m}finally{try{a||null==c.return||c.return()}finally{if(n)throw r}}e.setTeams(t)}},"Add Player"),r.a.createElement("button",{className:"btn team-btn",onClick:function(){e.saveTeams(),m()}},"Save Changes")))}a(59);var G=function(e){var t=e.teams.map((function(t,a){return r.a.createElement(P,{team:t,ind:a,key:t.name,teams:e.teams,setTeams:e.setTeams,saveTeams:e.saveTeams,deleteTeam:e.deleteTeam})}));return r.a.createElement("div",{className:"team-list"},t)};function D(e){var t=e.localDB,a=Object(n.useState)(""),s=Object(o.a)(a,2),c=s[0],m=s[1],i=Object(n.useState)(""),u=Object(o.a)(i,2),d=u[0],b=u[1],p=Object(n.useState)(!1),g=Object(o.a)(p,2),f=g[0],S=g[1],h=["Player1","Player2","Player3","Player4","Player5","Player6","Player7","Player8","Player9","Player10"],v=function(e){switch(e.target.name){case"team-name":m(e.target.value);break;case"team-gm":b(e.target.value);break;default:console.log("State not updated!")}};return r.a.createElement("div",{className:"App"},r.a.createElement("h1",{className:"page-header"},"Teams"),r.a.createElement(G,{teams:e.teams,setTeams:e.setTeams,saveTeams:function(){console.log("Saving Teams");var a=Object(l.a)(e.teams);t.get("team-doc").then((function(e){return e.teams=a,t.put(e)})).then((function(e){return console.log(e)})).catch((function(e){return console.log(e)}))},deleteTeam:function(a){var n=parseInt(a.target.name),r=Object(l.a)(e.teams);r.splice(n,1),e.setTeams(r),t.get("team-doc").then((function(e){return e.teams=r,t.put(e)})).then((function(e){return console.log(e)})).catch((function(e){return console.log(e)}))}}),!f&&r.a.createElement("button",{className:"btn",onClick:function(){S(!0)}},"Add Team"),f&&r.a.createElement("div",{className:"add-team-form"},r.a.createElement("label",{htmlFor:"team-name"},"Team Name: "),r.a.createElement("input",{name:"team-name",onChange:v,value:c}),r.a.createElement("label",{htmlFor:"team-gm"},"Team GM: "),r.a.createElement("input",{name:"team-gm",onChange:v,value:d}),r.a.createElement("button",{className:"btn",onClick:function(a){a.preventDefault();var n,r=Object(l.a)(e.teams);r.push({name:c,gm:d,players:h}),e.setTeams(r),n=r,t.get("team-doc").then((function(e){return e.teams=n,t.put(e)})).then((function(e){return console.log(e)})).catch((function(e){"not_found"===e.name?(t.put({_id:"team-doc",teams:n}),console.log("New Team doc created")):console.log(e)})),m(""),b(""),S(!1)}},"Create Team"),r.a.createElement("button",{className:"btn nmt",onClick:function(){return S(!1)}},"Cancel")))}var F=a(21),H=(a(63),a(18));function I(e){var t=Object(n.useMemo)((function(){return[{Header:"Name",accessor:"name"},{Header:"Point",accessor:"Point",sortDescFirst:!0},{Header:"Assist",accessor:"Assist",sortDescFirst:!0},{Header:"Touch",accessor:"Touch",sortDescFirst:!0},{Header:"DPlay",accessor:"D-Play",sortDescFirst:!0},{Header:"TAway",accessor:"T-Away",sortDescFirst:!0},{Header:"Drop",accessor:"Drop",sortDescFirst:!0},{Header:"GSO",accessor:"GSO",sortDescFirst:!0},{Header:"GSO-Mark",accessor:"GSO-Mark",sortDescFirst:!0}]}),[]),a=Object(n.useMemo)((function(){return e.stats}),[e.stats]),s=Object(H.b)({data:a,columns:t},H.a),c=s.getTableProps,l=s.getTableBodyProps,o=s.headerGroups,m=s.rows,i=s.prepareRow;return r.a.createElement(r.a.Fragment,null,r.a.createElement("p",{className:"stat-table stat-table-title"},"Game Stats - Touch headers to sort"),r.a.createElement("table",Object.assign({className:"stat-table"},c()),r.a.createElement("thead",null,o.map((function(e){return r.a.createElement("tr",e.getHeaderGroupProps(),e.headers.map((function(e){return r.a.createElement("th",e.getHeaderProps(e.getSortByToggleProps()),e.render("Header"),r.a.createElement("span",null,e.isSorted?e.isSortedDesc?r.a.createElement("i",{className:"material-icons md-18"},"arrow_drop_down"):r.a.createElement("i",{className:"material-icons md-18"},"arrow_drop_up"):""))})))}))),r.a.createElement("tbody",l(),m.map((function(e,t){return i(e),r.a.createElement("tr",e.getRowProps(),e.cells.map((function(e){return r.a.createElement("td",e.getCellProps(),e.render("Cell"))})))})))))}function A(e){var t=Object(n.useMemo)((function(){return[{Header:"Name",accessor:"name"},{Header:"Last In",accessor:"lastTimeIn",sortDescFirst:!0},{Header:"Time On Field",accessor:"timeMMSS",sortDescFirst:!0},{Header:"Total Shifts",accessor:"shifts",sortDescFirst:!0},{Header:"Average Time On",accessor:"averageTimeOnMMSS",sortDescFirst:!0}]}),[]),a=Object(n.useMemo)((function(){return e.stats}),[e.stats]),s=Object(H.b)({data:a,columns:t},H.a),c=s.getTableProps,l=s.getTableBodyProps,o=s.headerGroups,m=s.rows,i=s.prepareRow;return r.a.createElement(r.a.Fragment,null,r.a.createElement("p",{className:"stat-table stat-table-title"},"Game Stats - Touch headers to sort"),r.a.createElement("table",Object.assign({className:"stat-table"},c()),r.a.createElement("thead",null,o.map((function(e){return r.a.createElement("tr",e.getHeaderGroupProps(),e.headers.map((function(e){return r.a.createElement("th",e.getHeaderProps(e.getSortByToggleProps()),e.render("Header"),r.a.createElement("span",null,e.isSorted?e.isSortedDesc?r.a.createElement("i",{className:"material-icons md-18"},"arrow_drop_down"):r.a.createElement("i",{className:"material-icons md-18"},"arrow_drop_up"):""))})))}))),r.a.createElement("tbody",l(),m.map((function(e,t){return i(e),r.a.createElement("tr",e.getRowProps(),e.cells.map((function(e){return r.a.createElement("td",e.getCellProps(),e.render("Cell"))})))})))))}var _=function(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement("span",null,"Game Deleted..."),r.a.createElement("button",{className:"btn toast-btn",onClick:function(){e.toggleDeleteGame(e.game.date),e.closeToast()}},"Undo",r.a.createElement("i",{className:"material-icons md-18"},"undo")))},M=function(e){var t=Object(n.useState)(!1),a=Object(o.a)(t,2),s=a[0],c=a[1],l=e.game,m=new Date(l.date),i=function(e){return"".concat(m.getFullYear(),"-").concat(m.getMonth()+1,"-").concat(m.getDay(),"-").concat(l.darkTeam,"-vs-").concat(l.lightTeam,"-").concat(e,"-").concat(l.statTeam,".csv")},u=function(){return c(!s)};return r.a.createElement("div",{className:"card game-list-card"},r.a.createElement("div",{className:"game-list-info"},r.a.createElement("span",null,new Date(l.date).toDateString()),r.a.createElement("span",null,"Stat Taker: ".concat(l.statTaker))),r.a.createElement("div",{className:"game-list-info"},r.a.createElement("span",null,"".concat(l.playerStats?"Stats":"Subs"," For: ").concat(l.statTeam)),l.testGame&&r.a.createElement("span",{className:"test-game"},"Test Game")),r.a.createElement("div",{className:"game-score"},r.a.createElement("div",{className:"score-card score-card-games dark"},r.a.createElement("span",{id:"team-name"},l.darkTeam),l.score&&r.a.createElement("span",{className:"score dark"},l.score.dark)),r.a.createElement("div",{className:"score-card score-card-games light"},r.a.createElement("span",{id:"team-name"},l.lightTeam),l.score&&r.a.createElement("span",{className:"score light"},l.score.light))),r.a.createElement("div",{className:"game-list-btns"},r.a.createElement(F.CSVLink,{className:"btn game-list-btn",data:l.gameHistory||l.subHistory,filename:l.gameHistory?i("GAME"):i("SUBS"),target:"_blank"},l.gameHistory?"Game CSV":"Subs CSV",r.a.createElement("i",{className:"material-icons md-18"},"get_app")),l.playerStats&&r.a.createElement(F.CSVLink,{className:"btn game-list-btn",data:l.playerStats,headers:[{label:"Name",key:"name"},{label:"Touches",key:"Touch"},{label:"Points",key:"Point"},{label:"Assists",key:"Assist"},{label:"D-Plays",key:"D-Play"},{label:"Drops",key:"Drop"},{label:"Throwaways",key:"T-Away"},{label:"GSO",key:"GSO"},{label:"GSO-Mark",key:"GSO-Mark"}],filename:i("STATS"),target:"_blank"},"Stats CSV",r.a.createElement("i",{className:"material-icons md-18"},"get_app")),l.subStats&&r.a.createElement(F.CSVLink,{className:"btn game-list-btn",data:l.subStats,filename:i("SubStats"),target:"_blank"},"Stats CSV",r.a.createElement("i",{className:"material-icons md-18"},"get_app")),!s&&r.a.createElement("button",{className:"btn game-list-btn",onClick:u},"Show Stats",r.a.createElement("i",{className:"material-icons md-18"},"arrow_drop_down")),s&&r.a.createElement("button",{className:"btn game-list-btn",onClick:u},"Hide Stats",r.a.createElement("i",{className:"material-icons md-18"},"arrow_drop_up"))),s&&l.playerStats&&r.a.createElement(r.a.Fragment,null,r.a.createElement(I,{stats:l.playerStats}),r.a.createElement("button",{className:"btn btn-del game-list-btn",onClick:function(){e.toggleDeleteGame(l.date),y.c.error(r.a.createElement(_,{game:l,toggleDeleteGame:e.toggleDeleteGame}),{autoClose:4e3,hideProgressBar:!1})}},"Delete Game")),s&&l.subStats&&r.a.createElement(r.a.Fragment,null,r.a.createElement(A,{stats:l.subStats}),r.a.createElement("button",{className:"btn btn-del game-list-btn",onClick:function(){e.toggleDeleteGame(l.date),y.c.error(r.a.createElement(_,{game:l,toggleDeleteGame:e.toggleDeleteGame}),{autoClose:4e3,hideProgressBar:!1})}},"Delete Game")))},x=function(e){var t=e.games.filter((function(e){return!e.deleted})).map((function(t){return r.a.createElement(M,{key:t.date,game:t,toggleDeleteGame:e.toggleDeleteGame})}));return r.a.createElement("div",{className:"team-list"},t)};function L(e){return r.a.createElement("div",{className:"App"},r.a.createElement("h1",{className:"page-header"},"Recorded Games"),r.a.createElement(x,{games:e.allGameHistory,toggleDeleteGame:function(t){var a=Object(l.a)(e.allGameHistory),n=!0,r=!1,s=void 0;try{for(var c,o=a[Symbol.iterator]();!(n=(c=o.next()).done);n=!0){var m=c.value;m.date===t&&(m.deleted=!m.deleted)}}catch(i){r=!0,s=i}finally{try{n||null==o.return||o.return()}finally{if(r)throw s}}e.setAllGameHistory(a),e.saveAllGames(a)}}))}var B=a(39),V=a.n(B),U=(a(65),Object(y.b)({enter:"toast-in",exit:"toast-out",duration:[500,100]}));var R=function(){var e=Object(n.useState)(!0),t=Object(o.a)(e,2),a=t[0],s=t[1],c=Object(n.useState)(localStorage.getItem("userID")||""),d=Object(o.a)(c,2),p=d[0],g=d[1],f=Object(n.useState)(new u.a("".concat("https://db-couchdb.duckdns.org","/ultimate-stats"))),S=Object(o.a)(f,1)[0],h=Object(n.useState)(new u.a("ultimate-stats")),v=Object(o.a)(h,1)[0],E=Object(n.useState)([]),O=Object(o.a)(E,2),k=O[0],N=O[1],C=Object(n.useState)([]),w=Object(o.a)(C,2),P=w[0],G=w[1],F=Object(n.useState)(25),H=Object(o.a)(F,2),I=H[0],A=H[1],_=Object(n.useState)(""),M=Object(o.a)(_,2),x=M[0],B=M[1],R=Object(n.useState)(""),W=Object(o.a)(R,2),J=W[0],Y=W[1],$=Object(n.useState)(!0),q=Object(o.a)($,2),z=q[0],K=q[1],Q=Object(n.useState)(!0),X=Object(o.a)(Q,2),Z=X[0],ee=X[1],te=Object(n.useState)(""),ae=Object(o.a)(te,2),ne=ae[0],re=ae[1],se=Object(n.useState)([]),ce=Object(o.a)(se,2),le=ce[0],oe=ce[1],me=Object(n.useState)(!0),ie=Object(o.a)(me,2),ue=ie[0],de=ie[1],be=Object(n.useState)({dark:0,light:0}),pe=Object(o.a)(be,2),ge=pe[0],fe=pe[1],Se=Object(n.useState)([]),he=Object(o.a)(Se,2),ve=he[0],Ee=he[1],ye=Object(n.useState)(""),Te=Object(o.a)(ye,2),Oe=Te[0],ke=Te[1],Ne=Object(n.useState)(!1),je=Object(o.a)(Ne,2),Ce=je[0],we=je[1],Pe=Object(n.useState)(!1),Ge=Object(o.a)(Pe,2),De=Ge[0],Fe=Ge[1],He=Object(n.useState)(new V.a({countdown:!0,callback:function(e){ke(e.getTimeValues().toString(["minutes","seconds"]))}})),Ie=Object(o.a)(He,1)[0],Ae=Object(n.useState)(!1),_e=Object(o.a)(Ae,2),Me=_e[0],xe=_e[1],Le=Object(n.useState)([]),Be=Object(o.a)(Le,2),Ve=Be[0],Ue=Be[1],Re=Object(n.useState)(!1),We=Object(o.a)(Re,2),Je=We[0],Ye=We[1],$e=Object(n.useState)(!1),qe=Object(o.a)($e,2),ze=qe[0],Ke=qe[1],Qe=Object(n.useState)(""),Xe=Object(o.a)(Qe,2),Ze=Xe[0],et=Xe[1],tt=Object(n.useState)([]),at=Object(o.a)(tt,2),nt=at[0],rt=at[1],st=Object(n.useCallback)((function(){S&&(s(!0),S.allDocs({include_docs:!0}).then((function(e){console.log("Documents fetched"),console.log(e),s(!1),e.rows.forEach((function(e){"team-doc"===e.doc._id&&N(e.doc.teams),"game-history"===e.doc._id&&G(e.doc.games)}))})))}),[S]);Object(n.useEffect)((function(){S&&(S.info(),st())}),[S,st]),Object(n.useEffect)((function(){var e;if(!a&&v&&S)return e=v.sync(S,{live:!0,retry:!0,include_docs:!0}).on("change",(function(e){console.log("Database Change"),console.log(e);var t,a=e.change.docs[0];"pull"===e.direction?(t=a,console.log(t),console.log("Updated: ".concat(a._id))):console.log("This was a local change")})).on("active",(function(){return console.log("Sync Active")})).on("error",(function(){return console.log("Database Sync Error")})),function(){e.cancel(),console.log("Sync Cancelled")}}),[a,v,S]),Object(n.useEffect)((function(){ke("".concat(I.toString().padStart(2,0),":00"))}),[I]);var ct=function(e,t,a,n,r){A(parseInt(e)),B(t),Y(a),re(n),"subs"===r?ee(!1):K(!1);var s=k.find((function(e){return e.name===n}));if("subs"===r){var c=[],l=!0,o=!1,m=void 0;try{for(var i,u=s.players[Symbol.iterator]();!(l=(i=u.next()).done);l=!0){var d=i.value;c.push({name:d,timeOnField:0,lastTimeIn:"".concat(e,":00"),shiftLengths:[]})}}catch(E){o=!0,m=E}finally{try{l||null==u.return||u.return()}finally{if(o)throw m}}Ue(c)}else{de(r);var b=[],p=!0,g=!1,f=void 0;try{for(var S,h=s.players[Symbol.iterator]();!(p=(S=h.next()).done);p=!0){var v=S.value;b.push({name:v,Touch:0,Assist:0,Point:0,"T-Away":0,Drop:0,"D-Play":0,GSO:0,"GSO-Mark":0})}}catch(E){g=!0,f=E}finally{try{p||null==h.return||h.return()}finally{if(g)throw f}}oe(b)}},lt=function(e){v.get("game-history").then((function(t){return t.games=e,v.put(t)})).then((function(e){return console.log(e)})).catch((function(t){"not_found"===t.name?v.put({_id:"game-history",games:e}):console.log(t)}))},ot=function(){A(25),Ie.stop(),B(""),Y(""),re(""),K(!0),ee(!0),oe([]),Ue([]),Ee([]),rt([]),xe(!1),et(""),Ye(!1),Ke(!1),ke("25:00"),we(!1),Fe(!1),fe({dark:0,light:0})},mt=function(e){var t={date:new Date,darkTeam:x,lightTeam:J,statTeam:ne,gameLength:I,testGame:De,statTaker:p};"stats"===e&&(t.playerStats=le,t.score=ge,t.gameHistory=ve),"subs"===e&&(t.subStats=Ve,t.subHistory=nt);var a=Object(l.a)(P);a.unshift(t),G(a),lt(a),ot()};return r.a.createElement(m.a,null,r.a.createElement(i.d,null,r.a.createElement(i.b,{path:"/",exact:!0},r.a.createElement(b,{userID:p,setUserID:g,localDB:v})),r.a.createElement(i.b,{path:"/stats"},p?r.a.createElement(T,{userID:p,teams:k,showStatSetup:z,showSubSetup:Z,finishSetup:ct,gameLength:I,darkTeam:x,lightTeam:J,statTeam:ne,offense:ue,score:ge,setScore:fe,gameHistory:ve,setGameHistory:Ee,gameTime:Oe,startTimer:function(){Ie.start({startValues:{minutes:I}}),Me||(xe(!0),Ie.addEventListener("targetAchieved",(function(e){console.log("Time Finished"),we(!0)})))},pauseTimer:function(){return Ie.pause()},stopTimer:function(){return Ie.stop()},resetTimer:function(){Ie.reset(),ke("".concat(I.toString().padStart(2,0),":00"))},paused:Ce,setPaused:we,playerStats:le,setPlayerStats:oe,toggleOffense:function(){de(!ue)},testGame:De,setTestGame:Fe,saveGame:mt,resetGame:ot}):r.a.createElement(i.a,{to:"/"})),r.a.createElement(i.b,{path:"/subs"},p?r.a.createElement(j,{userID:p,teams:k,darkTeam:x,lightTeam:J,statTeam:ne,finishSetup:ct,setTestGame:Fe,showSubSetup:Z,showStatSetup:z,gameLength:I,gameTime:Oe,startTimer:function(){Ie.start({startValues:{minutes:I}}),Me||(xe(!0),Ie.addEventListener("targetAchieved",(function(e){console.log("Time Finished"),we(!0)})),function(){for(var e=[],t=new Date,a=0;a<4;a++)e.push({date:t.toDateString(),time:t.toTimeString(),gameTime:Oe,darkTeam:x,lightTeam:J,statTeam:ne,player:Ve[a].name,action:"In",timeOnField:""});rt(e)}())},pauseTimer:function(){return Ie.pause()},stopTimer:function(){return Ie.stop()},resetTimer:function(){Ie.reset(),ke("".concat(I.toString().padStart(2,0),":00"))},paused:Ce,setPaused:we,subStats:Ve,setSubStats:Ue,subInSelected:Je,setSubInSelected:Ye,subOutSelected:ze,setSubOutSelected:Ke,subPlayerSelected:Ze,setSubPlayerSelected:et,addSubHistory:function(e,t,a){var n=Object(l.a)(nt),r=new Date,s={date:r.toDateString(),time:r.toTimeString(),gameTime:Oe,darkTeam:x,lightTeam:J,statTeam:ne,player:e,action:"In",timeOnField:""},c={date:r.toDateString(),time:r.toTimeString(),gameTime:Oe,darkTeam:x,lightTeam:J,statTeam:ne,player:t,action:"Out",timeOnField:a};n.push(c,s),rt(n)},resetGame:ot,saveGame:mt}):r.a.createElement(i.a,{to:"/"})),r.a.createElement(i.b,{path:"/teams"},p?r.a.createElement(D,{teams:k,setTeams:N,localDB:v}):r.a.createElement(i.a,{to:"/"})),r.a.createElement(i.b,{path:"/games"},r.a.createElement(L,{allGameHistory:P,setAllGameHistory:G,saveAllGames:lt}))),r.a.createElement("div",{className:"bottom-nav"},r.a.createElement(m.c,{className:"nav-link",to:"/",exact:!0,activeClassName:"nav-active"},"Home"),r.a.createElement(m.c,{className:"nav-link",to:"/stats",activeClassName:"nav-active"},"Stats"),r.a.createElement(m.c,{className:"nav-link",to:"/subs",activeClassName:"nav-active"},"Subs"),r.a.createElement(m.c,{className:"nav-link",to:"/teams",activeClassName:"nav-active"},"Teams"),r.a.createElement(m.c,{className:"nav-link",to:"/games",activeClassName:"nav-active"},"Games")),r.a.createElement(y.a,{position:"bottom-center",transition:U,autoClose:!1,hideProgressBar:!0,newestOnTop:!1,closeOnClick:!1,rtl:!1,pauseOnVisibilityChange:!1,draggable:!1,pauseOnHover:!1}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(R,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[40,1,2]]]);
//# sourceMappingURL=main.a602d5c3.chunk.js.map
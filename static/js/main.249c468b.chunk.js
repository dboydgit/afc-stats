(this["webpackJsonpultimate-stats"]=this["webpackJsonpultimate-stats"]||[]).push([[0],{40:function(e,a,t){e.exports=t(65)},45:function(e,a,t){},46:function(e,a,t){},50:function(e,a,t){},51:function(e,a,t){},56:function(e,a,t){},57:function(e,a,t){},58:function(e,a,t){},62:function(e,a,t){},65:function(e,a,t){"use strict";t.r(a);var n=t(0),c=t.n(n),r=t(17),s=t.n(r),l=(t(45),t(2)),m=t(10),o=t(15),i=(t(46),t(23));t(50),t(51);function u(){return c.a.createElement("header",{className:"app-header"},c.a.createElement("h1",null,"AFC Premier League Stats"))}function d(e){var a=Object(n.useState)(""),t=Object(l.a)(a,2),r=t[0],s=t[1];return c.a.createElement("div",{className:"App"},c.a.createElement(u,null),c.a.createElement("div",{className:"home-content"},!e.userID&&c.a.createElement("div",{className:"home-form"},c.a.createElement("p",null,"Who is taking stats?"),c.a.createElement("form",{onSubmit:function(a){a.preventDefault(),e.setUserID(r),localStorage.setItem("userID",r)}},c.a.createElement("input",{id:"home-input",type:"text",value:r,onChange:function(e){s(e.target.value)}}),c.a.createElement("button",{className:"btn",type:"submit"},"Start"))),e.userID&&c.a.createElement("div",null,c.a.createElement("p",null,"Welcome, ".concat(e.userID)),c.a.createElement("div",{className:"home-btn-group"},c.a.createElement(m.b,{className:"btn",to:"/stats"},"Stats"),c.a.createElement(m.b,{className:"btn",to:"/subs"},"Subs"),c.a.createElement(m.b,{className:"btn",to:"/teams"},"Teams"),c.a.createElement(m.b,{className:"btn",to:"/games"},"Past Games")))))}var b=t(14),g=t(28),p=t(5);t(56);function f(e){var a=Object(n.useState)("25"),t=Object(l.a)(a,2),r=t[0],s=t[1],m=Object(n.useState)(""),o=Object(l.a)(m,2),i=o[0],u=o[1],d=Object(n.useState)(""),b=Object(l.a)(d,2),g=b[0],p=b[1],f=Object(n.useState)(""),E=Object(l.a)(f,2),v=E[0],h=E[1],y=Object(n.useState)(""),S=Object(l.a)(y,2),T=S[0],O=S[1],k=Object(n.useState)(""),N=Object(l.a)(k,2),j=N[0],C=N[1],G=[c.a.createElement("option",{value:"",key:""})],D=!0,P=!1,w=void 0;try{for(var A,H=e.teams[Symbol.iterator]();!(D=(A=H.next()).done);D=!0){var _=A.value;G.push(c.a.createElement("option",{value:_.name,key:_.name},_.name))}}catch(F){P=!0,w=F}finally{try{D||null==H.return||H.return()}finally{if(P)throw w}}return c.a.createElement("div",{className:"game-setup card"},c.a.createElement("h3",{id:"setup-title"},"Game Setup"),c.a.createElement("label",{htmlFor:"game-length"},"Game Length (mins)"),c.a.createElement("input",{name:"game-length",type:"number",min:"1",max:"120",value:r,onChange:function(e){return s(e.target.value)}}),c.a.createElement("label",{htmlFor:"dark-team"},"Select Dark Team"),c.a.createElement("select",{name:"dark-team",value:i,onChange:function(e){return u(e.target.value)}},G),c.a.createElement("label",{htmlFor:"light-team"},"Select Light Team"),c.a.createElement("select",{name:"light-team",value:g,onChange:function(e){return p(e.target.value)}},G),c.a.createElement("label",{htmlFor:"stat-team"},"Taking Stats For"),c.a.createElement("select",{name:"stat-team",value:v,onChange:function(e){return h(e.target.value)}},c.a.createElement("option",null),c.a.createElement("option",null,"".concat(i)),c.a.createElement("option",null,"".concat(g))),c.a.createElement("label",{htmlFor:"offence-team"},"Team on Offence"),c.a.createElement("select",{name:"offence-team",value:T,onChange:function(e){return O(e.target.value)}},c.a.createElement("option",null),c.a.createElement("option",null,"".concat(i)),c.a.createElement("option",null,"".concat(g))),c.a.createElement("div",{id:"test-game-checkbox",onChange:function(a){a.target.checked?e.setTestGame(!0):e.setTestGame(!1)}},c.a.createElement("input",{type:"checkbox"}),c.a.createElement("span",null,"Check for test game")),c.a.createElement("button",{className:"btn",onClick:function(){var a;(function(e){var a=parseInt(e);return a>=1&&a<=120})(r)?i&&g&&v&&T?(a=v===T,e.finishSetup(r,i,g,v,a)):C("Please choose all options"):C("Time should be between 1 - 120 mins")}},"Finish Setup"),j&&c.a.createElement("span",{className:"form-err"},j))}function E(e){return c.a.createElement("div",{className:"game-info"},c.a.createElement("div",{className:"score-card dark"},c.a.createElement("span",{id:"team-name"},e.darkTeam),c.a.createElement("span",{className:"score dark"},e.score.dark)),c.a.createElement("div",{className:"game-clock"},c.a.createElement("span",null,"".concat(e.gameTime)),c.a.createElement("div",{className:"timer-controls"},c.a.createElement("i",{className:"material-icons timer-control",onClick:function(){e.startTimer(),e.setPaused(!1),console.log("start timer")}},"play_arrow"),!e.paused&&c.a.createElement("i",{className:"material-icons timer-control",onClick:function(){e.pauseTimer(),e.setPaused(!0),console.log("pause timer")}},"pause"),e.paused&&c.a.createElement("i",{className:"material-icons timer-control",onClick:function(){e.resetTimer(),e.pauseTimer(),e.setPaused(!1),console.log("reset timer")}},"replay"))),c.a.createElement("div",{className:"score-card light"},c.a.createElement("span",{id:"team-name"},e.lightTeam),c.a.createElement("span",{className:"score light"},e.score.light)))}t(57);var v=t(7),h=function(e){return c.a.createElement("div",{className:"stat-btns"},c.a.createElement("button",{className:"btn stat-btn",name:"Touch",onClick:function(a){return e.handleStatClick(a,e.player.name,!1)}},"Touch",c.a.createElement("div",{className:"score-badge"},e.player.Touch),0!==e.player.Assist&&c.a.createElement("div",{className:"score-badge assist"},"".concat(e.player.Assist,"-A"))),c.a.createElement("button",{className:"btn stat-btn",name:"Point",onClick:function(a){return e.handleStatClick(a,e.player.name)}},"Point",c.a.createElement("div",{className:"score-badge"},e.player.Point)),c.a.createElement("button",{className:"btn stat-btn",name:"T-Away",onClick:function(a){return e.handleStatClick(a,e.player.name)}},"T-Away",c.a.createElement("div",{className:"score-badge"},e.player["T-Away"])),c.a.createElement("button",{className:"btn stat-btn",name:"Drop",onClick:function(a){return e.handleStatClick(a,e.player.name)}},"Drop",c.a.createElement("div",{className:"score-badge"},e.player.Drop)))},y=function(e){return c.a.createElement("div",{className:"stat-btns"},c.a.createElement("button",{className:"btn stat-btn",name:"D-Play",onClick:function(a){return e.handleStatClick(a,e.player.name)}},"D-Play",c.a.createElement("div",{className:"score-badge"},e.player["D-Play"])),c.a.createElement("button",{className:"btn stat-btn",name:"GSO",onClick:function(a){return e.handleStatClick(a,e.player.name)}},"GSO",c.a.createElement("div",{className:"score-badge"},e.player.GSO)),c.a.createElement("button",{className:"btn stat-btn",name:"GSO-Mark",onClick:function(a){return e.handleStatClick(a,e.player.name)}},"GSO-Mark",c.a.createElement("div",{className:"score-badge"},e.player["GSO-Mark"])))},S=function(e){var a=e.playerStats.map((function(a){return c.a.createElement("div",{key:a.name,className:"player-input"},c.a.createElement("div",{className:"player-name ".concat(e.darkTeam===e.statTeam?"dark":"")},c.a.createElement("span",{className:"player-text"},a.name)),e.offense&&c.a.createElement(h,{player:a,handleStatClick:e.handleStatClick}),!e.offense&&c.a.createElement(y,{player:a,handleStatClick:e.handleStatClick}))}));return c.a.createElement("div",{className:"player-list"},a)};function T(e){window.onbeforeunload=function(a){e.showSetup||(a.returnValue="Game will not be saved.")};var a=Object(n.useState)(!1),t=Object(l.a)(a,2),r=t[0],s=t[1],m=Object(n.useState)(""),o=Object(l.a)(m,2),i=o[0],u=o[1],d=Object(n.useState)({action:"",player:""}),h=Object(l.a)(d,2),y=h[0],T=(h[1],function(a){var t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",c=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];v.c.dismiss(),c&&e.toggleOffense();var r=a.currentTarget.name,s=Object(p.a)(e.gameHistory),l=s[s.length-1]||"",m="";!l||"Point"!==r&&"Drop"!==r||(m=l.player),"Touch"!==r||l.turnover||(m=l.player);var o=Object(g.a)({},e.score);"Point"===r&&(e.statTeam===e.darkTeam?o.dark++:o.light++),"GSO"!==r&&"GSO-Mark"!==r||(e.statTeam===e.darkTeam?o.light++:o.dark++),e.setScore(o);var i=new Date,u=(t={date:i.toDateString(),time:i.toTimeString(),gameTime:e.gameTime,statTeam:e.statTeam},Object(b.a)(t,"".concat(e.darkTeam,"_score"),o.dark),Object(b.a)(t,"".concat(e.lightTeam,"_score"),o.light),Object(b.a)(t,"action",r),Object(b.a)(t,"player",n),Object(b.a)(t,"lastPlayer",m),Object(b.a)(t,"turnover",c),t),d=Object(p.a)(e.playerStats);d.forEach((function(e){e.name===n&&("Drop"===r&&e.Touch++,e[r]++),"Point"===r&&e.name===m&&e.Assist++})),e.setPlayerStats(d),console.log("".concat(n,": ").concat(r,": gameClock: ").concat(e.gameTime,": \n            time: ").concat(u.time)),v.c.success("Last Entry: ".concat(r).concat(n?" - "+n:""," ").concat(m?" from "+m:"")),s.push(u),e.setGameHistory(s)});return c.a.createElement("div",{className:"App"},c.a.createElement("div",{className:"stats"},e.showSetup&&c.a.createElement(f,{teams:e.teams,finishSetup:e.finishSetup,setTestGame:e.setTestGame}),!e.showSetup&&c.a.createElement("div",{className:"game-stats"},e.testGame&&c.a.createElement("div",{id:"test-notification"},c.a.createElement("p",{id:"test-text"},"Test Game")),c.a.createElement(E,{darkTeam:e.darkTeam,lightTeam:e.lightTeam,score:e.score,gameTime:e.gameTime,gameLength:e.gameLength,startTimer:e.startTimer,pauseTimer:e.pauseTimer,resetTimer:e.resetTimer,paused:e.paused,setPaused:e.setPaused}),c.a.createElement("div",{className:"game-options"},c.a.createElement("button",{className:"btn opt-btn",onClick:function(){window.confirm("Cancel Game? Progress will not be saved.")&&(v.c.dismiss(),v.c.error("Game Deleted",{autoClose:2e3}),e.resetGame())}},"Exit Game"),c.a.createElement("button",{className:"btn opt-btn",onClick:function(){v.c.dismiss(),v.c.success("Game Saved",{autoClose:2e3});var a={date:new Date,darkTeam:e.darkTeam,lightTeam:e.lightTeam,statTeam:e.statTeam,gameLength:e.gameLength,playerStats:e.playerStats,score:e.score,testGame:e.testGame,statTaker:e.userID,gameHistory:e.gameHistory},t=Object(p.a)(e.allGameHistory);t.unshift(a),e.setAllGameHistory(t),e.saveAllGames(t),e.resetGame()}},"Finish & Save"),c.a.createElement("button",{className:"btn opt-btn",onClick:function(){v.c.dismiss();var a=Object(p.a)(e.gameHistory),t=Object(g.a)({},e.score),n=a.pop();if(n){console.log("UNDO");var c=Object(p.a)(e.playerStats);c.forEach((function(e){e.name===n.player&&("Drop"===n.action&&e.Touch--,e[n.action]--),"Point"===n.action&&n.lastPlayer===e.name&&e.Assist--})),e.setPlayerStats(c),n.turnover&&e.toggleOffense(),"Point"===n.action&&(e.statTeam===e.darkTeam?t.dark--:t.light--),"GSO"!==n.action&&"GSO-Mark"!==n.action||(e.statTeam===e.darkTeam?t.light--:t.dark--),v.c.info("UNDO: ".concat(n.action," by ").concat(n.player)),e.setScore(t),e.setGameHistory(a)}else v.c.info("Nothing to undo")}},"Undo",c.a.createElement("i",{className:"material-icons md-18"},"undo"))),c.a.createElement(S,{offense:e.offense,playerStats:e.playerStats,setPlayerStats:e.setPlayerStats,statTeam:e.statTeam,darkTeam:e.darkTeam,handleStatClick:T,gameHistory:e.gameHistory,lastAction:y}),!e.offense&&c.a.createElement("button",{className:"btn stat-btn stat-btn-after",name:"O-Error",onClick:function(e){return T(e)}},"Offensive Error"),!r&&c.a.createElement("button",{className:"btn stat-btn stat-btn-after",onClick:function(){return s(!0)}},"Add Player"),r&&c.a.createElement("div",{className:"add-player-input"},c.a.createElement("i",{className:"material-icons",onClick:function(){return s(!1)}},"close"),c.a.createElement("input",{placeholder:"player name",onChange:function(e){return u(e.target.value)},value:i}),c.a.createElement("button",{className:"btn stat-btn stat-btn-after",onClick:function(){return function(a){var t=Object(p.a)(e.playerStats);t.push({name:a,Touch:0,Assist:0,Point:0,"T-Away":0,Drop:0,"D-Play":0,GSO:0,"GSO-Mark":0}),e.setPlayerStats(t),s(!1),u("")}(i)}},"Save")))))}function O(e){return c.a.createElement("div",{className:"App"},c.a.createElement("h1",{className:"page-header"},"SUBS - TODO"))}var k=function(e){var a=Object(n.useState)(e.player),t=Object(l.a)(a,2),r=t[0],s=t[1];return c.a.createElement("div",{className:"player-list-item"},c.a.createElement("i",{className:"material-icons player-del",onClick:function(){e.deletePlayer(r)}},"delete"),c.a.createElement("input",{className:"player-card",name:e.ind,value:r,onChange:function(a){s(a.target.value);var t=Object(p.a)(e.teams),n=t.findIndex((function(a){return a.name===e.team.name})),c=parseInt(a.target.name);t[n].players[c]=a.target.value,e.setTeams(t)}}))},N=function(e){var a=e.team.players.map((function(a,t){return c.a.createElement(k,{player:a,ind:t,key:t,teams:e.teams,setTeams:e.setTeams,team:e.team,deletePlayer:e.deletePlayer})}));return c.a.createElement("div",{className:"player-list"},a)};function j(e){var a=Object(n.useState)(!1),t=Object(l.a)(a,2),r=t[0],s=t[1],m=function(){s(!r)};return c.a.createElement("div",{className:"card team-card"},c.a.createElement("div",{className:"team-name"},c.a.createElement("span",null,"".concat(e.team.name))),c.a.createElement("div",{className:"card-info"},c.a.createElement("span",{className:"gm-name"},"GM: ".concat(e.team.gm)),c.a.createElement("span",{className:"card-link",onClick:m},c.a.createElement("span",null,"Players"),!r&&c.a.createElement("i",{className:"material-icons md-18"},"arrow_drop_down"),r&&c.a.createElement("i",{className:"material-icons md-18"},"arrow_drop_up"))),r&&c.a.createElement("div",{className:"card-players"},c.a.createElement(N,{team:e.team,teams:e.teams,setTeams:e.setTeams,deletePlayer:function(a){var t=Object(p.a)(e.teams),n=!0,c=!1,r=void 0;try{for(var s,l=t[Symbol.iterator]();!(n=(s=l.next()).done);n=!0){var m=s.value;if(m.name!==e.team.name);else{var o=m.players.findIndex((function(e){return e===a}));m.players.splice(o,1)}}}catch(i){c=!0,r=i}finally{try{n||null==l.return||l.return()}finally{if(c)throw r}}e.setTeams(t)}}),c.a.createElement("button",{className:"btn team-btn btn-del",name:e.ind,onClick:e.deleteTeam},"Delete Team"),c.a.createElement("button",{className:"btn team-btn",onClick:function(){var a=Object(p.a)(e.teams),t=!0,n=!1,c=void 0;try{for(var r,s=a[Symbol.iterator]();!(t=(r=s.next()).done);t=!0){var l=r.value;l.name!==e.team.name||l.players.push("New Player")}}catch(m){n=!0,c=m}finally{try{t||null==s.return||s.return()}finally{if(n)throw c}}e.setTeams(a)}},"Add Player"),c.a.createElement("button",{className:"btn team-btn",onClick:function(){e.saveTeams(),m()}},"Save Changes")))}t(58);var C=function(e){var a=e.teams.map((function(a,t){return c.a.createElement(j,{team:a,ind:t,key:a.name,teams:e.teams,setTeams:e.setTeams,saveTeams:e.saveTeams,deleteTeam:e.deleteTeam})}));return c.a.createElement("div",{className:"team-list"},a)};function G(e){var a=e.localDB,t=Object(n.useState)(""),r=Object(l.a)(t,2),s=r[0],m=r[1],o=Object(n.useState)(""),i=Object(l.a)(o,2),u=i[0],d=i[1],b=Object(n.useState)(!1),g=Object(l.a)(b,2),f=g[0],E=g[1],v=["Player1","Player2","Player3","Player4","Player5","Player6","Player7","Player8","Player9","Player10"],h=function(e){switch(e.target.name){case"team-name":m(e.target.value);break;case"team-gm":d(e.target.value);break;default:console.log("State not updated!")}};return c.a.createElement("div",{className:"App"},c.a.createElement("h1",{className:"page-header"},"Teams"),c.a.createElement(C,{teams:e.teams,setTeams:e.setTeams,saveTeams:function(){console.log("Saving Teams");var t=Object(p.a)(e.teams);a.get("team-doc").then((function(e){return e.teams=t,a.put(e)})).then((function(e){return console.log(e)})).catch((function(e){return console.log(e)}))},deleteTeam:function(t){var n=parseInt(t.target.name),c=Object(p.a)(e.teams);c.splice(n,1),e.setTeams(c),a.get("team-doc").then((function(e){return e.teams=c,a.put(e)})).then((function(e){return console.log(e)})).catch((function(e){return console.log(e)}))}}),!f&&c.a.createElement("button",{className:"btn",onClick:function(){E(!0)}},"Add Team"),f&&c.a.createElement("div",{className:"add-team-form"},c.a.createElement("label",{htmlFor:"team-name"},"Team Name: "),c.a.createElement("input",{name:"team-name",onChange:h,value:s}),c.a.createElement("label",{htmlFor:"team-gm"},"Team GM: "),c.a.createElement("input",{name:"team-gm",onChange:h,value:u}),c.a.createElement("button",{className:"btn",onClick:function(t){t.preventDefault();var n,c=Object(p.a)(e.teams);c.push({name:s,gm:u,players:v}),e.setTeams(c),n=c,a.get("team-doc").then((function(e){return e.teams=n,a.put(e)})).then((function(e){return console.log(e)})).catch((function(e){"not_found"===e.name?(a.put({_id:"team-doc",teams:n}),console.log("New Team doc created")):console.log(e)})),m(""),d(""),E(!1)}},"Create Team"),c.a.createElement("button",{className:"btn nmt",onClick:function(){return E(!1)}},"Cancel")))}var D=t(29),P=(t(62),t(30));function w(e){var a=Object(n.useMemo)((function(){return[{Header:"Name",accessor:"name"},{Header:"Point",accessor:"Point",sortDescFirst:!0},{Header:"Assist",accessor:"Assist",sortDescFirst:!0},{Header:"Touch",accessor:"Touch",sortDescFirst:!0},{Header:"DPlay",accessor:"D-Play",sortDescFirst:!0},{Header:"TAway",accessor:"T-Away",sortDescFirst:!0},{Header:"Drop",accessor:"Drop",sortDescFirst:!0},{Header:"GSO",accessor:"GSO",sortDescFirst:!0},{Header:"GSO-Mark",accessor:"GSO-Mark",sortDescFirst:!0}]}),[]),t=Object(n.useMemo)((function(){return e.stats}),[e.stats]),r=Object(P.b)({data:t,columns:a},P.a),s=r.getTableProps,l=r.getTableBodyProps,m=r.headerGroups,o=r.rows,i=r.prepareRow;return c.a.createElement(c.a.Fragment,null,c.a.createElement("p",{className:"stat-table stat-table-title"},"Game Stats - Touch headers to sort"),c.a.createElement("table",Object.assign({className:"stat-table"},s()),c.a.createElement("thead",null,m.map((function(e){return c.a.createElement("tr",e.getHeaderGroupProps(),e.headers.map((function(e){return c.a.createElement("th",e.getHeaderProps(e.getSortByToggleProps()),e.render("Header"),c.a.createElement("span",null,e.isSorted?e.isSortedDesc?c.a.createElement("i",{className:"material-icons md-18"},"arrow_drop_down"):c.a.createElement("i",{className:"material-icons md-18"},"arrow_drop_up"):""))})))}))),c.a.createElement("tbody",l(),o.map((function(e,a){return i(e),c.a.createElement("tr",e.getRowProps(),e.cells.map((function(e){return c.a.createElement("td",e.getCellProps(),e.render("Cell"))})))})))))}var A=function(e){return c.a.createElement(c.a.Fragment,null,c.a.createElement("span",null,"Game Deleted..."),c.a.createElement("button",{className:"btn toast-btn",onClick:function(){e.toggleDeleteGame(e.game.date),e.closeToast()}},"Undo",c.a.createElement("i",{className:"material-icons md-18"},"undo")))},H=function(e){var a=Object(n.useState)(!1),t=Object(l.a)(a,2),r=t[0],s=t[1],m=e.game,o=new Date(m.date),i="".concat(o.getFullYear(),"-").concat(o.getMonth()+1,"-").concat(o.getDay(),"-").concat(m.darkTeam,"-vs-").concat(m.lightTeam,"-GAME-").concat(m.statTeam,".csv"),u="".concat(o.getFullYear(),"-").concat(o.getMonth()+1,"-").concat(o.getDay(),"-").concat(m.darkTeam,"-vs-").concat(m.lightTeam,"-STATS-").concat(m.statTeam,".csv"),d=function(){return s(!r)};return c.a.createElement("div",{className:"card game-list-card"},c.a.createElement("div",{className:"game-list-info"},c.a.createElement("span",null,new Date(m.date).toDateString()),c.a.createElement("span",null,"Stat Taker: ".concat(m.statTaker))),c.a.createElement("div",{className:"game-list-info"},c.a.createElement("span",null,"Stats For: ".concat(m.statTeam)),m.testGame&&c.a.createElement("span",{className:"test-game"},"Test Game")),c.a.createElement("div",{className:"game-score"},c.a.createElement("div",{className:"score-card score-card-games dark"},c.a.createElement("span",{id:"team-name"},m.darkTeam),c.a.createElement("span",{className:"score dark"},m.score.dark)),c.a.createElement("div",{className:"score-card score-card-games light"},c.a.createElement("span",{id:"team-name"},m.lightTeam),c.a.createElement("span",{className:"score light"},m.score.light))),c.a.createElement("div",{className:"game-list-btns"},c.a.createElement(D.CSVLink,{className:"btn game-list-btn",data:m.gameHistory,filename:i,target:"_blank"},"Game CSV",c.a.createElement("i",{className:"material-icons md-18"},"get_app")),c.a.createElement(D.CSVLink,{className:"btn game-list-btn",data:m.playerStats,headers:[{label:"Name",key:"name"},{label:"Touches",key:"Touch"},{label:"Points",key:"Point"},{label:"Assists",key:"Assist"},{label:"D-Plays",key:"D-Play"},{label:"Drops",key:"Drop"},{label:"Throwaways",key:"T-Away"},{label:"GSO",key:"GSO"},{label:"GSO-Mark",key:"GSO-Mark"}],filename:u,target:"_blank"},"Stats CSV",c.a.createElement("i",{className:"material-icons md-18"},"get_app")),!r&&c.a.createElement("button",{className:"btn game-list-btn",onClick:d},"Show Stats",c.a.createElement("i",{className:"material-icons md-18"},"arrow_drop_down")),r&&c.a.createElement("button",{className:"btn game-list-btn",onClick:d},"Hide Stats",c.a.createElement("i",{className:"material-icons md-18"},"arrow_drop_up"))),r&&c.a.createElement(c.a.Fragment,null,c.a.createElement(w,{stats:m.playerStats}),c.a.createElement("button",{className:"btn btn-del game-list-btn",onClick:function(){e.toggleDeleteGame(m.date),v.c.error(c.a.createElement(A,{game:m,toggleDeleteGame:e.toggleDeleteGame}),{autoClose:4e3,hideProgressBar:!1})}},"Delete Game")))},_=function(e){var a=e.games.filter((function(e){return!e.deleted})).map((function(a){return c.a.createElement(H,{key:a.date,game:a,toggleDeleteGame:e.toggleDeleteGame})}));return c.a.createElement("div",{className:"team-list"},a)};function F(e){return c.a.createElement("div",{className:"App"},c.a.createElement("h1",{className:"page-header"},"Recorded Games"),c.a.createElement(_,{games:e.allGameHistory,toggleDeleteGame:function(a){var t=Object(p.a)(e.allGameHistory),n=!0,c=!1,r=void 0;try{for(var s,l=t[Symbol.iterator]();!(n=(s=l.next()).done);n=!0){var m=s.value;m.date===a&&(m.deleted=!m.deleted)}}catch(o){c=!0,r=o}finally{try{n||null==l.return||l.return()}finally{if(c)throw r}}e.setAllGameHistory(t),e.saveAllGames(t)}}))}var I=t(39),x=t.n(I),M=(t(64),Object(v.b)({enter:"toast-in",exit:"toast-out",duration:[500,100]}));var L=function(){var e=Object(n.useState)(!0),a=Object(l.a)(e,2),t=a[0],r=a[1],s=Object(n.useState)(localStorage.getItem("userID")||""),u=Object(l.a)(s,2),b=u[0],g=u[1],p=Object(n.useState)(new i.a("".concat("https://db-couchdb.duckdns.org","/ultimate-stats"))),f=Object(l.a)(p,1)[0],E=Object(n.useState)(new i.a("ultimate-stats")),h=Object(l.a)(E,1)[0],y=Object(n.useState)([]),S=Object(l.a)(y,2),k=S[0],N=S[1],j=Object(n.useState)([]),C=Object(l.a)(j,2),D=C[0],P=C[1],w=Object(n.useState)(25),A=Object(l.a)(w,2),H=A[0],_=A[1],I=Object(n.useState)(""),L=Object(l.a)(I,2),B=L[0],U=L[1],V=Object(n.useState)(""),W=Object(l.a)(V,2),R=W[0],J=W[1],Y=Object(n.useState)(!0),$=Object(l.a)(Y,2),q=$[0],z=$[1],K=Object(n.useState)(""),Q=Object(l.a)(K,2),X=Q[0],Z=Q[1],ee=Object(n.useState)([]),ae=Object(l.a)(ee,2),te=ae[0],ne=ae[1],ce=Object(n.useState)(!0),re=Object(l.a)(ce,2),se=re[0],le=re[1],me=Object(n.useState)({dark:0,light:0}),oe=Object(l.a)(me,2),ie=oe[0],ue=oe[1],de=Object(n.useState)([]),be=Object(l.a)(de,2),ge=be[0],pe=be[1],fe=Object(n.useState)(""),Ee=Object(l.a)(fe,2),ve=Ee[0],he=Ee[1],ye=Object(n.useState)(!1),Se=Object(l.a)(ye,2),Te=Se[0],Oe=Se[1],ke=Object(n.useState)(!1),Ne=Object(l.a)(ke,2),je=Ne[0],Ce=Ne[1],Ge=Object(n.useState)(new x.a({countdown:!0,callback:function(e){he(e.getTimeValues().toString(["minutes","seconds"]))}})),De=Object(l.a)(Ge,1)[0],Pe=Object(n.useCallback)((function(){f&&(r(!0),f.allDocs({include_docs:!0}).then((function(e){console.log("Documents fetched"),console.log(e),r(!1),e.rows.forEach((function(e){"team-doc"===e.doc._id&&N(e.doc.teams),"game-history"===e.doc._id&&P(e.doc.games)}))})))}),[f]);Object(n.useEffect)((function(){f&&(f.info(),Pe())}),[f,Pe]),Object(n.useEffect)((function(){var e;if(!t&&h&&f)return e=h.sync(f,{live:!0,retry:!0,include_docs:!0}).on("change",(function(e){console.log("Database Change"),console.log(e);var a,t=e.change.docs[0];"pull"===e.direction?(a=t,console.log(a),console.log("Updated: ".concat(t._id))):console.log("This was a local change")})).on("active",(function(){return console.log("Sync Active")})).on("error",(function(){return console.log("Database Sync Error")})),function(){e.cancel(),console.log("Sync Cancelled")}}),[t,h,f]),Object(n.useEffect)((function(){he("".concat(H.toString().padStart(2,0),":00"))}),[H]);var we=function(e){h.get("game-history").then((function(a){return a.games=e,h.put(a)})).then((function(e){return console.log(e)})).catch((function(a){"not_found"===a.name?h.put({_id:"game-history",games:e}):console.log(a)}))};return c.a.createElement(m.a,null,c.a.createElement(o.d,null,c.a.createElement(o.b,{path:"/",exact:!0},c.a.createElement(d,{userID:b,setUserID:g,localDB:h})),c.a.createElement(o.b,{path:"/stats"},b?c.a.createElement(T,{userID:b,teams:k,showSetup:q,finishSetup:function(e,a,t,n,c){_(parseInt(e)),U(a),J(t),Z(n),le(c),z(!1);var r=k.find((function(e){return e.name===n})),s=[],l=!0,m=!1,o=void 0;try{for(var i,u=r.players[Symbol.iterator]();!(l=(i=u.next()).done);l=!0){var d=i.value;s.push({name:d,Touch:0,Assist:0,Point:0,"T-Away":0,Drop:0,"D-Play":0,GSO:0,"GSO-Mark":0})}}catch(b){m=!0,o=b}finally{try{l||null==u.return||u.return()}finally{if(m)throw o}}ne(s)},gameLength:H,darkTeam:B,lightTeam:R,statTeam:X,offense:se,score:ie,setScore:ue,allGameHistory:D,setAllGameHistory:P,gameHistory:ge,setGameHistory:pe,gameTime:ve,startTimer:function(){return De.start({startValues:{minutes:H}})},pauseTimer:function(){return De.pause()},stopTimer:function(){return De.stop()},resetTimer:function(){De.reset(),he("".concat(H.toString().padStart(2,0),":00"))},paused:Te,setPaused:Oe,playerStats:te,setPlayerStats:ne,toggleOffense:function(){le(!se)},testGame:je,setTestGame:Ce,saveAllGames:we,resetGame:function(){_(25),De.stop(),U(""),J(""),Z(""),z(!0),ne([]),pe([]),he("25:00"),Oe(!1),Ce(!1),ue({dark:0,light:0})}}):c.a.createElement(o.a,{to:"/"})),c.a.createElement(o.b,{path:"/subs"},b?c.a.createElement(O,{userID:b}):c.a.createElement(o.a,{to:"/"})),c.a.createElement(o.b,{path:"/teams"},b?c.a.createElement(G,{teams:k,setTeams:N,localDB:h}):c.a.createElement(o.a,{to:"/"})),c.a.createElement(o.b,{path:"/games"},c.a.createElement(F,{allGameHistory:D,setAllGameHistory:P,saveAllGames:we}))),c.a.createElement("div",{className:"bottom-nav"},c.a.createElement(m.c,{className:"nav-link",to:"/",exact:!0,activeClassName:"nav-active"},"Home"),c.a.createElement(m.c,{className:"nav-link",to:"/stats",activeClassName:"nav-active"},"Stats"),c.a.createElement(m.c,{className:"nav-link",to:"/subs",activeClassName:"nav-active"},"Subs"),c.a.createElement(m.c,{className:"nav-link",to:"/teams",activeClassName:"nav-active"},"Teams"),c.a.createElement(m.c,{className:"nav-link",to:"/games",activeClassName:"nav-active"},"Games")),c.a.createElement(v.a,{position:"bottom-center",transition:M,autoClose:!1,hideProgressBar:!0,newestOnTop:!1,closeOnClick:!1,rtl:!1,pauseOnVisibilityChange:!1,draggable:!1,pauseOnHover:!1}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(c.a.createElement(L,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[40,1,2]]]);
//# sourceMappingURL=main.249c468b.chunk.js.map
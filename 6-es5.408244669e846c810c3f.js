!function(){function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){for(var i=0;i<e.length;i++){var a=e[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}function i(t,i,a){return i&&e(t.prototype,i),a&&e(t,a),t}(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{fbRY:function(e,a,r){"use strict";r.r(a),r.d(a,"AssignTaskModule",(function(){return j}));var s=r("tyNb"),n=r("ofXK"),o=r("Mm0v"),c=r("LPYB"),b=r("OWtv"),d=r("XNiG"),p=r("1G5W"),u=r("5+WD"),l=r("jfZ1"),f=r("PSD3"),h=r.n(f),g=r("fXoL"),m=r("7zfz"),v=r("JqCM"),k=r("VJ5I"),y=r("3Pt+");function P(t,e){if(1&t){var i=g.Qb();g.Pb(0,"div",23),g.Pb(1,"p",24),g.Pb(2,"span"),g.Cc(3,"Task Id "),g.Ob(),g.Cc(4),g.Ob(),g.Pb(5,"p",24),g.Pb(6,"span"),g.Cc(7,"Assigned To"),g.Ob(),g.Cc(8),g.Ob(),g.Pb(9,"div",25),g.Wb("click",(function(){g.tc(i);var t=e.$implicit;return g.Yb().ViewTask(t)})),g.Kb(10,"i",26),g.Ob(),g.Ob()}if(2&t){var a=e.$implicit;g.yb(4),g.Ec("- ",a.id,""),g.yb(4),g.Ec(" - ",a.assigned_name,"")}}function O(t,e){if(1&t){var i=g.Qb();g.Pb(0,"div",23),g.Pb(1,"p",24),g.Pb(2,"span"),g.Cc(3,"Task Id "),g.Ob(),g.Cc(4),g.Ob(),g.Pb(5,"p",24),g.Pb(6,"span"),g.Cc(7,"Assigned To"),g.Ob(),g.Cc(8),g.Ob(),g.Pb(9,"div",25),g.Wb("click",(function(){g.tc(i);var t=e.$implicit;return g.Yb().ViewTask(t)})),g.Kb(10,"i",26),g.Ob(),g.Ob()}if(2&t){var a=e.$implicit;g.yb(4),g.Ec("- ",a.id,""),g.yb(4),g.Ec(" - ",a.assigned_name,"")}}function D(t,e){if(1&t){var i=g.Qb();g.Pb(0,"div",23),g.Pb(1,"p",24),g.Pb(2,"span"),g.Cc(3,"Task Id "),g.Ob(),g.Cc(4),g.Ob(),g.Pb(5,"p",24),g.Pb(6,"span"),g.Cc(7,"Assigned To"),g.Ob(),g.Cc(8),g.Ob(),g.Pb(9,"div",25),g.Wb("click",(function(){g.tc(i);var t=e.$implicit;return g.Yb().ViewTask(t)})),g.Kb(10,"i",26),g.Ob(),g.Ob()}if(2&t){var a=e.$implicit;g.yb(4),g.Ec("- ",a.id,""),g.yb(4),g.Ec(" - ",a.assigned_name,"")}}var L,w=function(t,e){return[t,e]},C=((L=function(){function e(i,a,r,s,n,o,c,b,p){t(this,e),this.commonMethodService=i,this.commonDataService=a,this.mastersService=r,this.el=s,this.router=n,this.primeNgMessageService=o,this.notificationService=c,this.spinner=b,this.cd=p,this.onDestroy=new d.a,this.taskList=[]}return i(e,[{key:"ngOnInit",value:function(){this.highPriorityTaskList=[],this.mediumPriorityTaskList=[],this.lowPriorityTaskList=[],null==this.commonDataService.oClientConfigurationsFromJsonFile&&null!=localStorage.getItem("config")&&(this.commonDataService.oClientConfigurationsFromJsonFile=JSON.parse(localStorage.getItem("config"))),null==this.commonDataService.taskList?null!=localStorage.getItem("taskList")&&(this.taskList=JSON.parse(localStorage.getItem("taskList"))):this.taskList=this.commonDataService.taskList,this.taskList.length>0?(this.highPriorityTaskList=this.taskList.filter((function(t){return"1"==t.priority})),this.mediumPriorityTaskList=this.taskList.filter((function(t){return"2"==t.priority})),this.lowPriorityTaskList=this.taskList.filter((function(t){return"3"==t.priority}))):(this.highPriorityTaskList=[],this.mediumPriorityTaskList=[],this.lowPriorityTaskList=[])}},{key:"ngAfterViewInit",value:function(){}},{key:"RouteToPage",value:function(t){this.router.navigate(["/modify/update"])}},{key:"drop",value:function(t){t.previousContainer!==t.container&&(Object(u.d)(t.previousContainer.data,t.container.data,t.previousIndex,t.currentIndex),"dropList1"==t.container.id?(this.droppedItem=this.highPriorityTaskList[t.currentIndex],this.droppedItem.priority="1"):"dropList2"==t.container.id?(this.droppedItem=this.mediumPriorityTaskList[t.currentIndex],this.droppedItem.priority="2"):"dropList3"==t.container.id&&(this.droppedItem=this.lowPriorityTaskList[t.currentIndex],this.droppedItem.priority="3"),this.PrepCrudData())}},{key:"ViewTask",value:function(t){this.commonDataService.redirectorPage="Reshuffle",this.commonDataService.itemToUpdateOrView=t,this.router.navigate(["/create"])}},{key:"PrepCrudData",value:function(){var t=new FormData;t.append("taskid",this.droppedItem.id),t.append("message",this.droppedItem.message),t.append("due_date",this.droppedItem.due_date),t.append("priority",this.droppedItem.priority),t.append("assigned_to",this.droppedItem.assigned_to),this.Save(t,"Edit")}},{key:"Save",value:function(t,e){var i=this;this.mastersService.SaveTask(t,e).pipe(Object(p.a)(this.onDestroy)).subscribe((function(t){"success"==t.status?(i.successheader="SUCCESS",i.successmsg="Task priority has been updated successfully",i.SweetSuccess(),i.commonDataService.isNewTaskAdded.next(!0)):"error"==t.status&&(i.errormsg=t.error,i.SweetFailure())}),(function(t){i.errormsg="Unable to update task priority",i.SweetFailure()}))}},{key:"SweetSuccess",value:function(){h.a.fire(this.successheader+"!",this.successmsg,"success")}},{key:"SweetFailure",value:function(){h.a.fire("Failed",this.errormsg,"error")}},{key:"ngOnDestroy",value:function(){this.onDestroy.next()}}]),e}()).\u0275fac=function(t){return new(t||L)(g.Jb(l.b),g.Jb(l.a),g.Jb(l.c),g.Jb(g.l),g.Jb(s.c),g.Jb(m.g),g.Jb(l.d),g.Jb(v.b),g.Jb(g.h))},L.\u0275cmp=g.Db({type:L,selectors:[["app-reshuffle"]],decls:38,vars:18,consts:[[1,"wrapper"],[1,"main-panel"],[1,"content"],[1,"page-inner"],[1,"row"],[1,"col-md-1"],[1,"col-sm-12","col-md-10"],[1,"card","mb-0"],[1,"card-header"],[1,"d-flex","align-items-center","justify-content-between"],[1,"page-title"],["type","button",1,"btn","btn-primary","mr-1",3,"click"],[1,"card-body"],[2,"display","flex","justify-content","space-between"],["cdkDropList","","id","dropList1",2,"width","30%",3,"cdkDropListData","cdkDropListConnectedTo","cdkDropListDropped"],["firstList","cdkDropList"],[1,"shuffleListHeader"],[1,"popWrapper"],["class","pop","cdkDrag","",4,"ngFor","ngForOf"],["cdkDropList","","id","dropList2",2,"width","30%",3,"cdkDropListData","cdkDropListConnectedTo","cdkDropListDropped"],["secondList","cdkDropList"],["cdkDropList","","id","dropList3",2,"width","30%",3,"cdkDropListData","cdkDropListConnectedTo","cdkDropListDropped"],["thirdList","cdkDropList"],["cdkDrag","",1,"pop"],[1,"taskData"],[1,"viewTaskDetail",3,"click"],[1,"fa","fa-eye"]],template:function(t,e){if(1&t&&(g.Pb(0,"div",0),g.Kb(1,"app-header"),g.Pb(2,"div",1),g.Pb(3,"div",2),g.Pb(4,"div",3),g.Pb(5,"div",4),g.Kb(6,"div",5),g.Pb(7,"div",6),g.Pb(8,"div",7),g.Pb(9,"div",8),g.Pb(10,"div",9),g.Pb(11,"h4",10),g.Cc(12,"Reshuffle Task"),g.Ob(),g.Kb(13,"div"),g.Pb(14,"button",11),g.Wb("click",(function(){return e.RouteToPage("back")})),g.Cc(15,"Back"),g.Ob(),g.Ob(),g.Ob(),g.Pb(16,"div",12),g.Pb(17,"form"),g.Pb(18,"div",13),g.Pb(19,"div",14,15),g.Wb("cdkDropListDropped",(function(t){return e.drop(t)})),g.Pb(21,"span",16),g.Cc(22,"High"),g.Ob(),g.Pb(23,"div",17),g.Ac(24,P,11,2,"div",18),g.Ob(),g.Ob(),g.Pb(25,"div",19,20),g.Wb("cdkDropListDropped",(function(t){return e.drop(t)})),g.Pb(27,"span",16),g.Cc(28,"Medium"),g.Ob(),g.Pb(29,"div",17),g.Ac(30,O,11,2,"div",18),g.Ob(),g.Ob(),g.Pb(31,"div",21,22),g.Wb("cdkDropListDropped",(function(t){return e.drop(t)})),g.Pb(33,"span",16),g.Cc(34,"Low"),g.Ob(),g.Pb(35,"div",17),g.Ac(36,D,11,2,"div",18),g.Ob(),g.Ob(),g.Ob(),g.Ob(),g.Ob(),g.Ob(),g.Ob(),g.Kb(37,"div",5),g.Ob(),g.Ob(),g.Ob(),g.Ob(),g.Ob()),2&t){var i=g.rc(20),a=g.rc(26),r=g.rc(32);g.yb(19),g.fc("cdkDropListData",e.highPriorityTaskList)("cdkDropListConnectedTo",g.jc(9,w,a,r)),g.yb(5),g.fc("ngForOf",e.highPriorityTaskList),g.yb(1),g.fc("cdkDropListData",e.mediumPriorityTaskList)("cdkDropListConnectedTo",g.jc(12,w,i,r)),g.yb(5),g.fc("ngForOf",e.mediumPriorityTaskList),g.yb(1),g.fc("cdkDropListData",e.lowPriorityTaskList)("cdkDropListConnectedTo",g.jc(15,w,i,a)),g.yb(5),g.fc("ngForOf",e.lowPriorityTaskList)}},directives:[k.a,y.k,y.f,y.g,u.b,n.k,u.a],styles:[".popWrapper{height:60vh;width:100%;box-shadow:0 5px 15px rgba(0,0,0,.35);padding:20px 10px;overflow:auto;background-color:hsla(0,0%,100%,.7)}.pop{height:50px;width:90%;margin:3px auto;border:2px solid rgba(54,173,167,.2);border-radius:5px;overflow:hidden;display:block;position:relative;padding-left:10px}.pop .taskData{padding:0;margin:0}.pop .taskData span{font-weight:700}.pop .viewTaskDetail{position:absolute;display:flex;justify-content:center;align-items:center;height:100%;width:50px;background-color:rgba(54,173,167,.5);top:0;right:0}.pop .viewTaskDetail i{font-size:16px}.cdk-drop-list-dragging .cdk-drag{transition:transform .25s cubic-bezier(0,0,.2,1)}.cdk-drag-animating{transition:transform .3s cubic-bezier(0,0,.2,1)}.shuffleListHeader{margin-left:20px;width:100%;text-transform:uppercase;font-weight:700;display:flex;justify-content:center}"],encapsulation:2}),L),T=r("njyG");function S(t,e){1&t&&(g.Pb(0,"span",37),g.Cc(1,"Low"),g.Ob())}function I(t,e){if(1&t){var i=g.Qb();g.Pb(0,"span",38),g.Wb("click",(function(){g.tc(i);var t=g.Yb().$implicit;return g.Yb().SweetConfirm(t,"update")})),g.Cc(1,"Pending"),g.Ob()}}function x(t,e){1&t&&(g.Pb(0,"span",39),g.Cc(1,"Medium"),g.Ob())}function J(t,e){1&t&&(g.Pb(0,"span",40),g.Cc(1,"High"),g.Ob())}function F(t,e){if(1&t){var i=g.Qb();g.Pb(0,"tr"),g.Pb(1,"td"),g.Cc(2),g.Ob(),g.Pb(3,"td"),g.Cc(4),g.Ob(),g.Pb(5,"td"),g.Cc(6),g.Ob(),g.Pb(7,"td",26),g.Cc(8),g.Zb(9,"date"),g.Ob(),g.Pb(10,"td",26),g.Cc(11),g.Zb(12,"date"),g.Ob(),g.Pb(13,"td",26),g.Ac(14,S,2,0,"span",27),g.Ac(15,I,2,0,"span",28),g.Ac(16,x,2,0,"span",29),g.Ac(17,J,2,0,"span",30),g.Ob(),g.Pb(18,"td",26),g.Pb(19,"div",31),g.Pb(20,"button",32),g.Wb("click",(function(){g.tc(i);var t=e.$implicit;return g.Yb().UpdateTask(t)})),g.Kb(21,"i",33),g.Ob(),g.Ob(),g.Ob(),g.Pb(22,"td",34),g.Wb("click",(function(){g.tc(i);var t=e.$implicit;return g.Yb().SweetConfirm(t.id)})),g.Pb(23,"div",31),g.Pb(24,"button",35),g.Pb(25,"h3"),g.Kb(26,"i",36),g.Ob(),g.Ob(),g.Ob(),g.Ob(),g.Ob()}if(2&t){var a=e.$implicit;g.yb(2),g.Dc(a.id),g.yb(2),g.Dc(a.message),g.yb(2),g.Dc(a.assigned_name),g.yb(2),g.Ec("",g.bc(9,9,a.created_on,"d-MMM-yyyy HH:mm")," "),g.yb(3),g.Ec("",g.bc(12,12,a.due_date,"d-MMM-yyyy HH:mm")," "),g.yb(3),g.fc("ngIf","3"==a.priority),g.yb(1),g.fc("ngIf","PFA"==a.status),g.yb(1),g.fc("ngIf","2"==a.priority),g.yb(1),g.fc("ngIf","1"==a.priority)}}var A,W,E=function(t){return{active:t}},M=s.g.forChild([{path:"update",component:(A=function(){function e(i,a,r,s,n,o,c,b,p){var u=this;t(this,e),this.commonMethodService=i,this.commonDataService=a,this.mastersService=r,this.el=s,this.router=n,this.primeNgMessageService=o,this.notificationService=c,this.spinner=b,this.cd=p,this.onDestroy=new d.a,this.dtOptions={},this.dtData=[],this.dtTrigger=new d.a,this.taskList=[],this.commonDataService.isTaskListReloaded.subscribe((function(t){t&&u.LoadTaskList()}))}return i(e,[{key:"ngOnInit",value:function(){this.isLink1=!0,this.isLink2=!1,this.dtOptions={pagingType:"simple_numbers",pageLength:5},null==this.commonDataService.oClientConfigurationsFromJsonFile&&null!=localStorage.getItem("config")&&(this.commonDataService.oClientConfigurationsFromJsonFile=JSON.parse(localStorage.getItem("config")))}},{key:"ngAfterViewInit",value:function(){this.dtTrigger.next(),this.LoadTaskList()}},{key:"RouteToPage",value:function(t){"back"==t?this.router.navigate(["/home"]):"reshuffle"==t&&this.router.navigate(["/modify/reshuffle"])}},{key:"LoadTaskList",value:function(){this.rerender(),null==this.commonDataService.taskList?null!=localStorage.getItem("taskList")&&(this.taskList=JSON.parse(localStorage.getItem("taskList"))):this.taskList=this.commonDataService.taskList}},{key:"UpdateTask",value:function(t){this.commonDataService.redirectorPage="Update",this.commonDataService.itemToUpdateOrView=t,this.router.navigate(["/create"])}},{key:"PrepCrudData",value:function(t){var e=new FormData;e.append("taskid",t),this.Save(e)}},{key:"Save",value:function(t){var e=this;this.mastersService.DeleteTask(t).pipe(Object(p.a)(this.onDestroy)).subscribe((function(t){"success"==t.status?(e.commonDataService.isNewTaskAdded.next(!0),e.successheader="SUCCESS",e.successmsg="Task has been deleted successfully",e.SweetSuccess()):"error"==t.status&&(e.errormsg=t.error,e.SweetFailure())}),(function(t){e.errormsg="Unable to delete task",e.SweetFailure()}))}},{key:"SweetConfirm",value:function(t){var e=this;this.errormsg="Delete cancelled",h.a.fire({title:"Please confirm",text:"Are you sure you want to delete this task?",icon:"warning",showCancelButton:!0,confirmButtonText:"Yes",cancelButtonText:"No"}).then((function(i){i.value&&e.PrepCrudData(t)}))}},{key:"SweetSuccess",value:function(){h.a.fire(this.successheader+"!",this.successmsg,"success")}},{key:"SweetFailure",value:function(){h.a.fire("Failed",this.errormsg,"error")}},{key:"rerender",value:function(){var t=this;this.dtElement.dtInstance.then((function(e){e.destroy(),t.dtTrigger.next()}))}},{key:"ngOnDestroy",value:function(){this.onDestroy.next(),this.dtTrigger.unsubscribe()}}]),e}(),A.\u0275fac=function(t){return new(t||A)(g.Jb(l.b),g.Jb(l.a),g.Jb(l.c),g.Jb(g.l),g.Jb(s.c),g.Jb(m.g),g.Jb(l.d),g.Jb(v.b),g.Jb(g.h))},A.\u0275cmp=g.Db({type:A,selectors:[["app-main"]],viewQuery:function(t,e){var i;1&t&&g.Gc(T.a,!0),2&t&&g.qc(i=g.Xb())&&(e.dtElement=i.first)},decls:48,vars:9,consts:[[1,"wrapper"],[1,"main-panel"],[1,"content"],[1,"page-inner"],[1,"row"],[1,"col-md-1"],[1,"col-sm-12","col-md-10"],[1,"card","mb-0"],[1,"card-header"],[1,"d-flex","align-items-center"],[1,"page-title"],["role","tablist",1,"nav","nav-pills","nav-default","nav-pills-no-bd","nav-sm","ml-auto"],[1,"nav-item"],[1,"nav-link",3,"ngClass"],[1,"nav-link",3,"ngClass","click"],[1,"seperator"],["type","button",1,"btn","btn-primary","mr-1",3,"click"],[1,"card-body"],[1,"table-responsive"],["datatable","",1,"table","table-striped","table-bordered","table-sm","hover",3,"dtOptions","dtTrigger"],["width","5%"],["width","11%"],["width","11%",1,"text-center"],["width","8%",1,"text-center"],["width","3%",1,"text-center"],[4,"ngFor","ngForOf"],[1,"text-center"],["class","badge badge-success",4,"ngIf"],["class","badge badge-secondary handcursor",3,"click",4,"ngIf"],["class","badge badge-warning",4,"ngIf"],["class","badge badge-danger",4,"ngIf"],[1,"form-button-action"],["type","button","data-toggle","modal","data-target","#addDept","title","","data-original-title","Edit",1,"btn","btn-link","btn-primary","btn-lg",3,"click"],[1,"fa","fa-edit"],[1,"text-center",3,"click"],["type","button","data-toggle","tooltip","title","","data-original-title","Delete","aria-describedby","tooltip352135",1,"btn","btn-link","btn-danger"],[1,"fa","fa-times"],[1,"badge","badge-success"],[1,"badge","badge-secondary","handcursor",3,"click"],[1,"badge","badge-warning"],[1,"badge","badge-danger"]],template:function(t,e){1&t&&(g.Pb(0,"div",0),g.Kb(1,"app-header"),g.Pb(2,"div",1),g.Pb(3,"div",2),g.Pb(4,"div",3),g.Pb(5,"div",4),g.Kb(6,"div",5),g.Pb(7,"div",6),g.Pb(8,"div",7),g.Pb(9,"div",8),g.Pb(10,"div",9),g.Pb(11,"h4",10),g.Pb(12,"span"),g.Cc(13,"Update Task"),g.Ob(),g.Ob(),g.Pb(14,"ul",11),g.Pb(15,"li",12),g.Pb(16,"a",13),g.Cc(17,"Update"),g.Ob(),g.Ob(),g.Pb(18,"li",12),g.Pb(19,"a",14),g.Wb("click",(function(){return e.RouteToPage("reshuffle")})),g.Cc(20,"Reshuffle"),g.Ob(),g.Ob(),g.Kb(21,"div",15),g.Pb(22,"button",16),g.Wb("click",(function(){return e.RouteToPage("back")})),g.Cc(23,"Back"),g.Ob(),g.Ob(),g.Ob(),g.Ob(),g.Pb(24,"div",17),g.Pb(25,"div",18),g.Pb(26,"table",19),g.Pb(27,"thead"),g.Pb(28,"tr"),g.Pb(29,"th",20),g.Cc(30,"Id"),g.Ob(),g.Pb(31,"th"),g.Cc(32,"Task Description"),g.Ob(),g.Pb(33,"th",21),g.Cc(34,"Assigned To"),g.Ob(),g.Pb(35,"th",22),g.Cc(36,"Created On"),g.Ob(),g.Pb(37,"th",22),g.Cc(38,"Due Date"),g.Ob(),g.Pb(39,"th",23),g.Cc(40,"Prirotiy"),g.Ob(),g.Pb(41,"th",24),g.Cc(42,"Edit"),g.Ob(),g.Pb(43,"th",24),g.Cc(44,"Delete"),g.Ob(),g.Ob(),g.Ob(),g.Pb(45,"tbody"),g.Ac(46,F,27,15,"tr",25),g.Ob(),g.Ob(),g.Ob(),g.Ob(),g.Ob(),g.Ob(),g.Kb(47,"div",5),g.Ob(),g.Ob(),g.Ob(),g.Ob(),g.Ob()),2&t&&(g.yb(16),g.fc("ngClass",g.ic(5,E,e.isLink1)),g.yb(3),g.fc("ngClass",g.ic(7,E,e.isLink2)),g.yb(7),g.fc("dtOptions",e.dtOptions)("dtTrigger",e.dtTrigger),g.yb(20),g.fc("ngForOf",e.taskList))},directives:[k.a,n.j,T.a,n.k,n.l],pipes:[n.e],styles:[".seperator[_ngcontent-%COMP%]{height:40px;width:1px;background-color:rgba(0,0,0,.1);margin:0 20px}"]}),A),canActivate:[b.a]},{path:"reshuffle",component:C,canActivate:[b.a]}]),j=((W=function e(){t(this,e)}).\u0275mod=g.Hb({type:W}),W.\u0275inj=g.Gb({factory:function(t){return new(t||W)},imports:[[n.c,o.a,M,c.a]]}),W)}}])}();
!function(){function e(e,t){for(var i=0;i<t.length;i++){var r=t[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function t(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{H451:function(i,r,a){"use strict";a.r(r),a.d(r,"CreateTaskModule",(function(){return V}));var s=a("tyNb"),o=a("ofXK"),n=a("Mm0v"),c=a("LPYB"),d=a("OWtv"),u=a("XNiG"),b=a("1G5W"),l=a("jfZ1"),m=a("PSD3"),p=a.n(m),h=a("fXoL"),f=a("7zfz"),g=a("JqCM"),v=a("VJ5I"),D=a("3Pt+"),y=a("zFJ7"),S=a("eO1q"),P=a("arFO"),w=["priorityForm"],O=["refCloseBtn"];function C(e,t){1&e&&(h.Pb(0,"span",29),h.Cc(1,"Task Description is required"),h.Ob())}function k(e,t){1&e&&h.Kb(0,"i",32)}function A(e,t){if(1&e){var i=h.Qb();h.Pb(0,"button",30),h.Wb("click",(function(){return h.tc(i),h.Yb().SetCrudActionName("Add")})),h.Ac(1,k,1,0,"i",31),h.Cc(2," Save "),h.Ob()}if(2&e){var r=h.Yb();h.yb(1),h.fc("ngIf",r.showLoaderIcon)}}function L(e,t){1&e&&h.Kb(0,"i",32)}function M(e,t){if(1&e){var i=h.Qb();h.Pb(0,"button",30),h.Wb("click",(function(){return h.tc(i),h.Yb().SetCrudActionName("Edit")})),h.Ac(1,L,1,0,"i",31),h.Cc(2," Update "),h.Ob()}if(2&e){var r=h.Yb();h.yb(1),h.fc("ngIf",r.showLoaderIcon)}}var T,F,I=function(){return{width:"100%"}},J=function e(){t(this,e),this.id="",this.TaskDescription="",this.DueDate=null,this.SelectedPriority={},this.SelectedAssignee={}},N=s.g.forChild([{path:"",component:(T=function(){function i(e,r,a,s,o,n,c,d,b,l){t(this,i),this.commonMethodService=e,this.commonDataService=r,this.mastersService=a,this.datepipe=s,this.el=o,this.router=n,this.primeNgMessageService=c,this.notificationService=d,this.spinner=b,this.cd=l,this.onDestroy=new u.a,this.priorityList=[],this.userList=[]}var r,a,s;return r=i,(a=[{key:"ngOnInit",value:function(){this.crudData=new J,this.isAdd=!0,this.isView=!1,this.minimumDate=new Date,null==this.commonDataService.oClientConfigurationsFromJsonFile&&null!=localStorage.getItem("config")&&(this.commonDataService.oClientConfigurationsFromJsonFile=JSON.parse(localStorage.getItem("config"))),null==this.commonDataService.userList?null!=localStorage.getItem("userList")&&(this.userList=JSON.parse(localStorage.getItem("userList"))):this.userList=this.commonDataService.userList,null==this.commonDataService.priorityList?null!=localStorage.getItem("priorityList")&&(this.priorityList=JSON.parse(localStorage.getItem("priorityList"))):this.priorityList=this.commonDataService.priorityList,"update"==this.commonDataService.redirectorPage.toLowerCase()&&this.GetSetForCrud("Edit"),"reshuffle"!=this.commonDataService.redirectorPage.toLowerCase()&&"report"!=this.commonDataService.redirectorPage.toLowerCase()||this.GetSetForCrud("View")}},{key:"ngAfterViewInit",value:function(){}},{key:"RouteToPage",value:function(e){"back"==e&&this.router.navigate("Home"==this.commonDataService.redirectorPage?["/home"]:"Update"==this.commonDataService.redirectorPage?["/modify/update"]:"Reshuffle"==this.commonDataService.redirectorPage?["/modify/reshuffle"]:"Report"==this.commonDataService.redirectorPage?["/report"]:["/home"])}},{key:"GetSetForCrud",value:function(e){var t=this;if(this.crudData=new J,"Add"==e)this.isAdd=!0,this.isView=!1,this.priorityForm.resetForm();else{this.isAdd=!1,this.isView="View"==e,this.crudData.id=this.commonDataService.itemToUpdateOrView.id,this.crudData.TaskDescription=this.commonDataService.itemToUpdateOrView.message,this.crudData.DueDate=this.GetDate(this.commonDataService.itemToUpdateOrView.due_date);var i=this.priorityList.filter((function(e){return e.id==t.commonDataService.itemToUpdateOrView.priority}));this.crudData.SelectedPriority=i[0],i=this.userList.filter((function(e){return e.id==t.commonDataService.itemToUpdateOrView.assigned_to})),this.crudData.SelectedAssignee=i[0]}}},{key:"GetDate",value:function(e){var t=e.split(" ")[0],i=Number(t.split("-")[0]),r=Number(t.split("-")[1]),a=Number(t.split("-")[2]);return new Date(i,r-1,a)}},{key:"PrepCrudData",value:function(){if(this.isAdd){var e=new FormData;e.append("message",this.crudData.TaskDescription),e.append("due_date",this.datepipe.transform(this.crudData.DueDate,"yyyy-MM-dd HH:mm:ss")),e.append("priority",this.crudData.SelectedPriority.id),e.append("assigned_to",this.crudData.SelectedAssignee.id),this.Save(e,"Add")}else{var t=new FormData;t.append("taskid",this.crudData.id),t.append("message",this.crudData.TaskDescription),t.append("due_date",this.datepipe.transform(this.crudData.DueDate,"yyyy-MM-dd HH:mm:ss")),t.append("priority",this.crudData.SelectedPriority.id),t.append("assigned_to",this.crudData.SelectedAssignee.id),this.Save(t,"Edit")}}},{key:"Save",value:function(e,t){var i=this,r=t;this.showLoaderIcon=!0,this.mastersService.SaveTask(e,r).pipe(Object(b.a)(this.onDestroy)).subscribe((function(e){i.showLoaderIcon=!1,"success"==e.status?(i.commonDataService.isNewTaskAdded.next(!0),i.successheader="SUCCESS",i.isAdd?(i.priorityForm.resetForm(),i.successmsg="Task has been added successfully"):i.successmsg="Task has been updated successfully",i.SweetSuccess()):"error"==e.status&&(i.errormsg=e.error,i.SweetFailure())}),(function(e){i.isAdd?(i.priorityForm.resetForm(),i.errormsg="Unable to add task"):i.errormsg="Unable to update task",i.SweetFailure()}))}},{key:"SweetSuccess",value:function(){p.a.fire(this.successheader+"!",this.successmsg,"success")}},{key:"SweetFailure",value:function(){p.a.fire("Failed",this.errormsg,"error")}},{key:"SetCrudActionName",value:function(e){this.crudActionName=e}},{key:"ngOnDestroy",value:function(){this.onDestroy.next()}}])&&e(r.prototype,a),s&&e(r,s),i}(),T.\u0275fac=function(e){return new(e||T)(h.Jb(l.b),h.Jb(l.a),h.Jb(l.c),h.Jb(o.e),h.Jb(h.l),h.Jb(s.c),h.Jb(f.g),h.Jb(l.d),h.Jb(g.b),h.Jb(h.h))},T.\u0275cmp=h.Db({type:T,selectors:[["app-crud"]],viewQuery:function(e,t){var i;1&e&&(h.Gc(w,!0),h.Gc(O,!0)),2&e&&(h.qc(i=h.Xb())&&(t.priorityForm=i.first),h.qc(i=h.Xb())&&(t.refCloseBtn=i.first))},decls:50,vars:15,consts:[[1,"wrapper"],[1,"main-panel"],[1,"content"],[1,"page-inner"],[1,"row"],[1,"col-md-1"],[1,"col-sm-12","col-md-10"],[1,"card","mb-0"],[3,"ngSubmit"],["priorityForm","ngForm"],[1,"card-header"],[1,"d-flex","align-items-center","justify-content-between"],[1,"page-title"],["type","button",1,"btn","btn-primary","mr-1",3,"click"],[1,"card-body"],[1,"row","mt-2"],[1,"col-md-12"],[1,"col-sm-12"],[1,"pb-3"],["rows","5","cols","35","pInputTextarea","","name","TaskDescription","autoResize","autoResize","required","",3,"ngModel","ngModelChange"],["refTD","ngModel"],[1,"pt-1"],["class","text-danger",4,"ngIf"],["name","DueDate","dateFormat","dd-M-yy","appendTo","body",3,"minDate","ngModel","ngModelChange"],["name","selectedPriority","placeholder","Select priority","optionLabel","name",3,"options","ngModel","showClear","ngModelChange"],["name","SelectedAssignee","placeholder","Select assignee","optionLabel","name",3,"options","ngModel","showClear","ngModelChange"],[1,"card-footer"],[1,"d-flex","align-items-center"],["type","submit","class","btn btn-primary mr-1",3,"click",4,"ngIf"],[1,"text-danger"],["type","submit",1,"btn","btn-primary","mr-1",3,"click"],["class","fas fa-circle-notch fa-spin",4,"ngIf"],[1,"fas","fa-circle-notch","fa-spin"]],template:function(e,t){if(1&e){var i=h.Qb();h.Pb(0,"div",0),h.Kb(1,"app-header"),h.Pb(2,"div",1),h.Pb(3,"div",2),h.Pb(4,"div",3),h.Pb(5,"div",4),h.Kb(6,"div",5),h.Pb(7,"div",6),h.Pb(8,"div",7),h.Pb(9,"form",8,9),h.Wb("ngSubmit",(function(){return h.tc(i),h.rc(10).form.valid&&t.PrepCrudData()})),h.Pb(11,"div",10),h.Pb(12,"div",11),h.Pb(13,"h4",12),h.Cc(14,"Create Task"),h.Ob(),h.Pb(15,"button",13),h.Wb("click",(function(){return t.RouteToPage("back")})),h.Cc(16,"Back"),h.Ob(),h.Ob(),h.Ob(),h.Pb(17,"div",14),h.Pb(18,"div",15),h.Pb(19,"div",16),h.Pb(20,"div",4),h.Pb(21,"div",17),h.Pb(22,"div",18),h.Pb(23,"h5"),h.Cc(24,"Task Description"),h.Ob(),h.Pb(25,"textarea",19,20),h.Wb("ngModelChange",(function(e){return t.crudData.TaskDescription=e})),h.Cc(27,"                                                        "),h.Ob(),h.Pb(28,"div",21),h.Ac(29,C,2,0,"span",22),h.Ob(),h.Ob(),h.Ob(),h.Pb(30,"div",17),h.Pb(31,"div",18),h.Pb(32,"label"),h.Cc(33,"Due Date"),h.Ob(),h.Pb(34,"p-calendar",23),h.Wb("ngModelChange",(function(e){return t.crudData.DueDate=e})),h.Ob(),h.Ob(),h.Ob(),h.Pb(35,"div",17),h.Pb(36,"div",18),h.Pb(37,"label"),h.Cc(38,"Priority"),h.Ob(),h.Pb(39,"p-dropdown",24),h.Wb("ngModelChange",(function(e){return t.crudData.SelectedPriority=e})),h.Ob(),h.Ob(),h.Ob(),h.Pb(40,"div",17),h.Pb(41,"div",18),h.Pb(42,"label"),h.Cc(43,"Assign To"),h.Ob(),h.Pb(44,"p-dropdown",25),h.Wb("ngModelChange",(function(e){return t.crudData.SelectedAssignee=e})),h.Ob(),h.Ob(),h.Ob(),h.Ob(),h.Ob(),h.Ob(),h.Ob(),h.Pb(45,"div",26),h.Pb(46,"div",27),h.Ac(47,A,3,1,"button",28),h.Ac(48,M,3,1,"button",28),h.Ob(),h.Ob(),h.Ob(),h.Ob(),h.Ob(),h.Kb(49,"div",5),h.Ob(),h.Ob(),h.Ob(),h.Ob(),h.Ob()}if(2&e){var r=h.rc(10),a=h.rc(26);h.yb(25),h.yc(h.hc(14,I)),h.fc("ngModel",t.crudData.TaskDescription),h.yb(4),h.fc("ngIf",r.submitted&&(null==a.errors?null:a.errors.required)),h.yb(5),h.fc("minDate",t.minimumDate)("ngModel",t.crudData.DueDate),h.yb(5),h.fc("options",t.priorityList)("ngModel",t.crudData.SelectedPriority)("showClear",!0),h.yb(5),h.fc("options",t.userList)("ngModel",t.crudData.SelectedAssignee)("showClear",!0),h.yb(3),h.fc("ngIf",t.isAdd&&!t.isView),h.yb(1),h.fc("ngIf",!t.isAdd&&!t.isView)}},directives:[v.a,D.k,D.f,D.g,D.a,y.a,D.j,D.e,D.h,o.l,S.a,P.a],styles:[""]}),T),canActivate:[d.a]}]),V=((F=function e(){t(this,e)}).\u0275mod=h.Hb({type:F}),F.\u0275inj=h.Gb({factory:function(e){return new(e||F)},imports:[[o.c,n.a,N,c.a]]}),F)}}])}();
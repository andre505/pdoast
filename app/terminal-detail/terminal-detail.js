const app = require("tns-core-modules/application");
var view = require("ui/core/view");
const httpModule = require("http");
const ListPicker = require("tns-core-modules/ui/list-picker").ListPicker;
const fromObject = require("tns-core-modules/data/observable").fromObject;
const switchModule = require("tns-core-modules/ui/switch");


function onNavigatingTo(args) {
    const page = args.object;
    const navigationContext = page.navigationContext;
    page.bindingContext = navigationContext;         
}

function onCloseTap(args){    
    const button = args.object;
    const page = button.page;
    var ac = view.getViewById(page, "myIndicator");
    ac.busy = true;
    var tskcloselbl= view.getViewById(page, "taskcloselabel");
    var commentlbl= view.getViewById(page, "commentlabel");
    var closesuccesslbl = view.getViewById(page, "closesuccesslabel");
    //buttons
    var closebt = view.getViewById(page, "closebtn");
    var escalatebt = view.getViewById(page, "escalatebtn");
    var returnbtn = view.getViewById(page, "terminalreturn");
    var idOftask = button.bindingContext.terminal.id;
    var comment = commentlbl.text;
    var token = button.bindingContext.param3;
    //update request
    httpModule.request({
        url: "http://172.19.15.88:5000/api/task/UpdateTask",
        method: "POST",
        headers: { "Content-Type": "application/json","Authorization":"Bearer"+ " "+token },
        content: JSON.stringify({
            Id : idOftask,
            PdoComment: comment,
            TaskStatus: 1            
        })
        }).then((response1) => {
        const result = response1.content.toJSON();

        if (result.Success = true){ 
            tskcloselbl.class="pone";
            commentlbl.class="pone";
            closebt.class="pone";
            escalatebt.class="pone";
            //
            closesuccesslbl.class="taskclosed";
            closesuccesslbl.text="Task closed successfully";      
            ac.busy = false;
            returnbtn.class="btn, btn-outline";           
            

        }
        else 
        {   
            closesuccesslbl.class="taskclosederror";
            closesuccesslbl.text="An error occurred, please try again";
           
            //page.frame.navigate("login/home-page"); 
            //var signedinpdo = new pdo; --------------formerly before navigation entry
            //signedinpdo.token = usertoken;
            //signedinpdo.Username = useridentity;           
        }

        //response.forEach(x => navigationContext.myterminalist.push(x));    
    }, (e) => {       
       
    }); 
    
}



function tapToReturn(args) {

    const button = args.object;
    const page = button.page;
    var ac = view.getViewById(page, "myIndicator");
    var returnbtn = view.getViewById(page, "terminalreturn");
    returnbtn.class="pone";
    ac.busy = true;
    var terminalinfo =  button.bindingContext.terminal.id;
    var fullName = button.bindingContext.param1;
    var userEmail = button.bindingContext.param2;
    var usertoken = button.bindingContext.param3;
    var useridentity = button.bindingContext;
    var user = button.bindingContext;

    //remove item    
    //navigate back to page
    httpModule.getJSON({
        url: "http://172.19.15.88:5000/api/task/index",
        method: "GET",
        headers: {"Content-Type": "application/json","Authorization":"Bearer"+ " "+usertoken}
    }).then((response) => {               
    myterminalist = response;
    const navigationEntry = {
        moduleName: "terminal/terminal",
       context: {
                param1: fullName,
                param2: userEmail,
                param3: usertoken,
                terminalist: myterminalist},
        animated: false               
    };
    page.frame.navigate(navigationEntry);   

    
        //response.forEach(x => navigationContext.myterminalist.push(x));    
    }, (e) => {       
       
    });  
}

function onEscalateTap(args){
    const button = args.object;
    const page = button.page;
    var ac = view.getViewById(page, "myIndicator");
    ac.busy = true;
    var tskcloselbl= view.getViewById(page, "taskcloselabel");
    var commentlbl= view.getViewById(page, "commentlabel");
    var closesuccesslbl = view.getViewById(page, "closesuccesslabel");
    //buttons
    var closebt = view.getViewById(page, "closebtn");
    var escalatebt = view.getViewById(page, "escalatebtn");
    var returnbtn = view.getViewById(page, "terminalreturn");
    var idOftask = button.bindingContext.terminal.id;
    var comment = commentlbl.text;
    var token = button.bindingContext.param3;
    //escalate request
    httpModule.request({
        url: "http://172.19.15.88:5000/api/task/EscalateTask",
        method: "POST",
        headers: { "Content-Type": "application/json","Authorization":"Bearer"+ " "+token},
        content: JSON.stringify({
            Id : idOftask,
            PdoComment: comment,
            TaskStatus: 2            
        })
        }).then((response1) => {
        const result = response1.content.toJSON();

        if (result.Success = true){ 
            tskcloselbl.class="pone";
            commentlbl.class="pone";
            closebt.class="pone";
            escalatebt.class="pone";
            //
            closesuccesslbl.class="taskclosed";    
            closesuccesslbl.text="Task escalated successfully";          
            ac.busy = false;
            returnbtn.class="btn, btn-outline";           
            

        }
        else 
        {   
            closesuccesslbl.class="taskclosederror";
            closesuccesslbl.text="An error occurred, please try again";
           
            //page.frame.navigate("login/home-page"); 
            //var signedinpdo = new pdo; --------------formerly before navigation entry
            //signedinpdo.token = usertoken;
            //signedinpdo.Username = useridentity;           
        }

        //response.forEach(x => navigationContext.myterminalist.push(x));    
    }, (e) => {       
       
    }); 

}

function onDrawerButtonTap(args) {
    const sideDrawer = app.getRootView();
    sideDrawer.bindingContext = args.object.bindingContext;
    sideDrawer.showDrawer();
}

exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;
exports.onCloseTap = onCloseTap;
exports.tapToReturn = tapToReturn;
exports.onEscalateTap = onEscalateTap;
const app = require("tns-core-modules/application");
const httpModule = require("http");
var view = require("ui/core/view");
const ResetPassViewModel = require("./resetpass-view-model");
const appSettings = require("application-settings");

function onNavigatingTo(args) {
    const page = args.object;
    const navigationContext = page.navigationContext;
    page.bindingContext = navigationContext;         
    }

function onResetTap(args) {
    const button = args.object;
    const page = button.page;
    var ac = view.getViewById(page, "myIndicator1");
    ac.busy = true;
    var oldpas = view.getViewById(page, "oldpasss");
    var newpas = view.getViewById(page, "newpasss");
    var newpasrpt = view.getViewById(page, "rptnewpasss");
    var resetsuccesslbl = view.getViewById(page, "resetstatus1");      
    var resetbt = view.getViewById(page, "resetbtn");      
    var token = button.bindingContext.param3;
    var email = button.bindingContext.param2;

    //values
    var oldp =oldpas.text;
    var newp = newpas.text;
    var newprpt = newpasrpt.text;
    if (newp == newprpt)
    {
    //escalate request
    httpModule.request({
        url: "http://172.19.8.170:8484/api/auth/resetpass",
        method: "POST",
        headers: { "Content-Type": "application/json","Authorization":"Bearer"+ " "+token},
        content: JSON.stringify({
            Email : email,
            Password: oldp,
            ConfirmPassword: newprpt            
        })
        }).then((response1) => {
        const result = response1.content.toJSON();

        if (result.successful == true){ 
            ac.busy = false;      
            oldpas.class = "pone";
            newpas.class = "pone"; 
            newpasrpt.class = "pone"; 
            resetbt.class = "pone";       
            resetsuccesslbl.class="closed";
            resetbt.class = "pone";       
            appSettings.setString("pdoPassword", newprpt);
            resetsuccesslbl.text="Password changed successfully";      
            resetsuccesslbl.class="resetpassclass";             
        }
        else 
        {  
            ac.busy = false;
            resetsuccesslbl.class="taskclosederrorb";
            resetsuccesslbl.text="An error occurred, please try again";           
           
        }

    }, (e) => {                        
    }); 
    }
    else{
        ac.busy = false;
            resetsuccesslbl.class="taskclosederrorb";
            resetsuccesslbl.text="Passwords dont match";   
    }
}  

function onDrawerButtonTap(args) {
    const sideDrawer = app.getRootView();      
    sideDrawer.bindingContext = args.object.bindingContext;
    sideDrawer.showDrawer();
}


exports.onNavigatingTo = onNavigatingTo;
exports.onResetTap = onResetTap;
exports.onDrawerButtonTap = onDrawerButtonTap;
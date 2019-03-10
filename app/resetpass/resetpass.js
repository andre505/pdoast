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
    var ac = view.getViewById(page, "myIndicator");
    ac.busy = true;
    var oldpas = view.getViewById(page, "oldpass");
    var newpas = view.getViewById(page, "newpass");
    var newpasrpt = view.getViewById(page, "newpassrpt");
    var resetsuccesslbl = view.getViewById(page, "resetstatus");      
    var token = button.bindingContext.param3;
    var email = button.bindingContext.param1;

    //values
    var oldp =oldpas.text;
    var newp = newpas.text;
    var newprpt = newpasrpt.text;
    
    //escalate request
    httpModule.request({
        url: "http://172.19.15.88:5000/api/auth/resetpass",
        method: "POST",
        headers: { "Content-Type": "application/json","Authorization":"Bearer"+ " "+token},
        content: JSON.stringify({
            Email : email,
            Password: oldp,
            ConfirmPassword: newprpt            
        })
        }).then((response1) => {
        const result = response1.content.toJSON();

        if (result.Success = true){ 
            
            resetsuccesslbl.class="taskclosed";    
            resetsuccesslbl.text="Task escalated successfully";          
            ac.busy = false;
            returnbtn.class="btn, btn-outline";
        }
        else 
        {   ac.busy = false;
            resetsuccesslbl.class="taskclosederror";
            resetsuccesslbl.text="An error occurred, please try again";
           
           
        }

    }, (e) => {                        
    }); 

}  



exports.onNavigatingTo = onNavigatingTo;
exports.onResetTap = onResetTap;
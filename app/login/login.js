const app = require("tns-core-modules/application");
const httpModule = require("http");
var view = require("ui/core/view");
const LoginViewModel = require("./login-view-model");
const appSettings = require("application-settings");

function onNavigatingTo(args) {
    const page = args.object;
    page.bindingContext = new LoginViewModel();
    }

function onLoginTap(args) {
    
    const button = args.object;
    const page = button.page;
    var ac = view.getViewById(page, "myIndicator");
    ac.busy = true;
    var loginredirectURL ="";  
    var textfield= view.getViewById(page, "usrtxtfld");
    var textfield2= view.getViewById(page, "passtxtfld");
    var txtfldstatus = view.getViewById(page, "loginstatus");
    var user = textfield.text;
    var pass = textfield2.text;
    var usertoken = "";
    var useridentity = ""; 
    var myterminalist = [];   
    
    //logic for validation
    httpModule.request({
        url: "http://172.19.15.88:5000/api/auth/token",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        content: JSON.stringify({
            Username: user,
            Password: pass
        })
        }).then((response1) => {
        const result = response1.content.toJSON();

        if (result.success){    
            usertoken = result.status;
            useridentity = result.name;            
            appSettings.setString(user, usertoken);
            //var toke = appSettings.getString(user);
            //Get Terminal List
            httpModule.getJSON({
                url: "http://172.19.15.88:5000/api/task/index",
                method: "GET",
                headers: {"Content-Type": "application/json","Authorization":"Bearer"+ " "+usertoken}
            }).then((response) => {               
            myterminalist = response;
            const navigationEntry = {
                moduleName: "terminal/terminal",
               context: {param1: useridentity,
                        param2: user,
                        param3: usertoken,
                        terminalist: myterminalist},
                        animated: true,
                        transition: {
                            name: "slide",
                            duration: 380,
                            curve: "easeIn"
                        },
                //clearHistory: true               
            };
            page.frame.navigate(navigationEntry)    

            
                //response.forEach(x => navigationContext.myterminalist.push(x));    
            }, (e) => {       
               
            });  
            //
            //==================const navigation entry used to be here

          // page.frame.navigate(navigationEntry)=====================================
            
            //frame.navigate(navigationEntry);            
            //page.frame.navigate(navigationEntry);       
        }
        else 
        {     
            txtfldstatus.text = "Invalid Login";
            ac.busy = false;
            //page.frame.navigate("login/home-page"); 
            //var signedinpdo = new pdo; --------------formerly before navigation entry
            //signedinpdo.token = usertoken;
            //signedinpdo.Username = useridentity;           
        }


    }, (e) => {
        console.log("Error: ");
            console.log(e);
    });
    //end validation logic

        
   // return page;
    //page.frame.navigate ("\""+loginredirectURL+"\"");
}


exports.onNavigatingTo = onNavigatingTo;
exports.onLoginTap = onLoginTap;
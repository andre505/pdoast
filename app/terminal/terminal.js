const app = require("tns-core-modules/application");
const TerminalViewModel = require("./terminal-view-model");
const httpModule = require("http");
var view = require("ui/core/view");
const fromObject = require("tns-core-modules/data/observable").fromObject;
const appSettings = require("application-settings");


function onNavigatingTo(args) {
    
    var usertoken = appSettings.getString("pdoToken");    
      
    httpModule.getJSON({
       url: "http://172.19.8.170:8484/api/task/index",
        method: "GET",
        headers: {"Content-Type": "application/json","Authorization":"Bearer"+ " "+usertoken}
   }).then((response) => {               
       myterminalist = response;
      const page = args.object;
      const navigationContext = page.navigationContext;
         
     navigationContext.terminalist = response; 
       page.bindingContext = navigationContext;
   });

     //const page = args.object;
        //const navigationContext = page.navigationContext;
       // page.bindingContext = navigationContext;    
           
     ///===============
}

function onItemTap(args){
    const button = args.object;
    const page = button.page;
    const indexOfRecord = args.index;
    var allterminals = button.bindingContext.terminalist;
    var record = button.bindingContext.terminalist[indexOfRecord];
    var userName = button.bindingContext.param1;
    var userEmail = button.bindingContext.param2;
    var token = button.bindingContext.param3;
    const navigationEntry = {
        moduleName: "terminal-detail/terminal-detail",
       context: {
           param1: userName,
           param2: userEmail,
           param3: token,
           terminalist: allterminals,
           terminal: record,
           
        },
        animated: true,
        transition: {
            name: "slideLeft",
            duration: 380,
            curve: "easeIn"            
        },     
                      
    };
    page.frame.navigate(navigationEntry);


//.................
    //const newcontext = args.navigationContext;

}
function onDrawerButtonTap(args) {
    const sideDrawer = app.getRootView();      
    sideDrawer.bindingContext = args.object.bindingContext;
    sideDrawer.showDrawer();
}

exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;
exports.onItemTap = onItemTap;
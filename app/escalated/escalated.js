const app = require("tns-core-modules/application");

const EscalatedViewModel = require("./escalated-view-model");

function onNavigatingTo(args) {
    const page = args.object;
    const navigationContext = page.navigationContext;
    page.bindingContext = navigationContext;
    var userToken = navigationContext.param3;        
}

function onItemTap(args){
    const button = args.object;
    const page = button.page;
    const indexOfRecord = args.index;
    var allterminals = button.bindingContext.escalatedterminalist;
    var record = button.bindingContext.escalatedterminalist[indexOfRecord];
    var userName = button.bindingContext.param1;
    var userEmail = button.bindingContext.param2;
    var token = button.bindingContext.param3;
    const navigationEntry = {
        moduleName: "escalated-detail/escalated-detail",
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
const app = require("tns-core-modules/application");
const TerminalViewModel = require("./terminal-view-model");
const httpModule = require("http");
var view = require("ui/core/view");
const fromObject = require("tns-core-modules/data/observable").fromObject;

function onNavigatingTo(args) {
    const page = args.object;
    const navigationContext = page.navigationContext;
    page.bindingContext = navigationContext;       
    ///
    

    ///
    //var label = view.getViewById(page, "tokeholder");
    //var bearertoken = label.text;
     
}

function onItemTap(args){
    const button = args.object;
    const page = button.page;
    const indexOfRecord = args.index;
    var allterminals = button.bindingContext.terminalist;
    var record = button.bindingContext.terminalist[indexOfRecord];
    var token = button.bindingContext.param3;
    const navigationEntry = {
        moduleName: "terminal-detail/terminal-detail",
       context: {
           terminals: allterminals,
           terminal: record,
           tokenparam: token 
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
    sideDrawer.showDrawer();
}

exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;
exports.onItemTap = onItemTap;
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


function onDrawerButtonTap(args) {
    const sideDrawer = app.getRootView();      
    sideDrawer.bindingContext = args.object.bindingContext;
    sideDrawer.showDrawer();
}

exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;
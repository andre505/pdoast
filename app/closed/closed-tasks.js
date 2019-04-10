const app = require("tns-core-modules/application");

const ClosedTViewModel = require("./closed-tasks-view-model");

function onNavigatingTo(args) {
    const page = args.object;
    const navigationContext = page.navigationContext;
    page.bindingContext = navigationContext;
    var userToken = navigationContext.param3;        
}

function onDrawerButtonTap(args) {
    const sideDrawer = app.getRootView();
    sideDrawer.bindingContext = args.object.bindingContext;
    sideDrawer.showDrawer();
}

exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;
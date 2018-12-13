const app = require("tns-core-modules/application");

const HomeViewModel = require("./home-view-model");
var mytoken = "";
var myname = "";
function onNavigatingTo(args) {
    var mytoken = "";
    var myname = "";
    const page = args.object;
    page.bindingContext = new HomeViewModel();
    const context = page.navigationContext;
    var gotData = context.navigationContext;
    mytoken = gotData.usrtoke;
    myname = gotData.pdoname;
}
function onDrawerButtonTap(args) {
    const sideDrawer = app.getRootView();
    sideDrawer.showDrawer();
}
exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;

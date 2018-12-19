const app = require("tns-core-modules/application");

const FaqsViewModel = require("./faqs-view-model");

function onNavigatingTo(args) {
    const page = args.object;
    page.bindingContext = new FaqsViewModel();
}

function onDrawerButtonTap(args) {
    const sideDrawer = app.getRootView();
    sideDrawer.showDrawer();
}

exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;

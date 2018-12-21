const application = require("tns-core-modules/application");
const frameModule = require("tns-core-modules/ui/frame");
const httpModule = require("http");
const AppRootViewModel = require("./app-root-view-model");
var view = require("ui/core/view");


function onLoaded(args) {
    const drawerComponent = args.object;
    drawerComponent.bindingContext = new AppRootViewModel();
}

function onNavigationItemTap(args) {
    const component = args.object;
    const componentRoute = component.route;
    const componentTitle = component.title;
    //activity indicator 
    //const page = args.object.page;   
    
    
    //
    const bindingContext = component.bindingContext;
    var fullName = bindingContext.param1;
    var userEmail = bindingContext.param2;
    var userToken = bindingContext.param3;
    var oldterminalist = bindingContext.terminalist;
    var clsdterminalist = [];
    var escldterminalist = [];   
    
    //bindingContext.set("selectedPage", componentTitle);

    if (componentRoute == "closed/closed-tasks"){
        var ac = component.getViewById("closedIndicator");
        ac.busy = true;
        //Get Closed Tasks Request
        httpModule.getJSON({
        url: "http://172.19.15.88:5000/api/task/closedtasks",
        method: "GET",
        headers: {"Content-Type": "application/json","Authorization":"Bearer"+ " "+userToken} 
            }).then((response) => {               
            clsdterminalist = response;
               
            frameModule.topmost().navigate({
                moduleName: componentRoute,
                context: {param1: fullName,
                          param2: userEmail,
                          param3: userToken,                          
                         closedterminalist: clsdterminalist,
                         terminalist: oldterminalist
                        },
                transition: {
                    name: "fade"
                }
            });
            ac.busy = false;
            const drawerComponent = application.getRootView();
            drawerComponent.closeDrawer();
        //response.forEach(x => navigationContext.myterminalist.push(x));    
    }, (e) => {       
       
    });  

    }
    else if (componentRoute == "terminal/terminal"){
        frameModule.topmost().navigate({
            moduleName: componentRoute, 
            context: bindingContext,       
            transition: {
                name: "fade"
            }
        }); 
        const drawerComponent = application.getRootView();
        drawerComponent.closeDrawer();   
    }
    else if (componentRoute == "escalated/escalated"){
        var ac = component.getViewById("escalateIndicator");
        var ifTreated = component.getViewById("treat");
        ac.busy = true;
        //Get Closed Tasks Request
        httpModule.getJSON({
        url: "http://172.19.15.88:5000/api/task/escalatedtasks",
        method: "GET",
        headers: {"Content-Type": "application/json","Authorization":"Bearer"+ " "+userToken} 
            }).then((response) => {               
            escldterminalist = response;
            escldterminalist.sort(function(a, b){return parseInt(b.taskStatus) - parseInt(a.taskStatus)});

            //if (response.taskStatus == 3){
              //  treaTed = "Treated";
            //}
            for(var i = 0; i < escldterminalist.length; i++) {
               var obj = escldterminalist[i];
               if (obj.taskStatus == 3){
                obj.taskStatus = "Treated";                
               }  
               else{
                obj.taskStatus = "";                
               }           
                               
            }

            frameModule.topmost().navigate({
                moduleName: componentRoute,
                context: {param1: fullName,
                          param2: userEmail,
                          param3: userToken,                          
                         escalatedterminalist: escldterminalist,
                         terminalist: oldterminalist
                        },
                transition: {
                    name: "fade"
                }
            });
            ac.busy = false;
            const drawerComponent = application.getRootView();
            drawerComponent.closeDrawer();
        //response.forEach(x => navigationContext.myterminalist.push(x));    
    }, (e) => {       
       
    });    
    }
    else {   
    frameModule.topmost().navigate({
        moduleName: componentRoute,
        context: bindingContext,        
        transition: {
            name: "fade"
        }
    }); 
    const drawerComponent = application.getRootView();
    drawerComponent.closeDrawer();   
    }

    
}

exports.onLoaded = onLoaded;
exports.onNavigationItemTap = onNavigationItemTap;

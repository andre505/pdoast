const observableModule = require("tns-core-modules/data/observable");
const SelectedPageService = require("../shared/selected-page-service");
const appSettings = require("application-settings");

function LoginViewModel() {
    SelectedPageService.getInstance().updateSelectedPage("Login");
    var pdoemail = "";
    var pdopass = "";     

        if (!appSettings.hasKey("pdoName"))
        {
            pdoemail = "";
            pdopass = "";            
        }
        else {
            pdoemail = appSettings.getString("pdoEmail");
            pdopass = appSettings.getString("pdoPassword");
        }        
    
        const viewModel = observableModule.fromObject({
            pdoe: pdoemail,
            pdop: pdopass
        });

    return viewModel;
}

module.exports = LoginViewModel;

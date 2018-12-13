const observableModule = require("tns-core-modules/data/observable");
const SelectedPageService = require("../shared/selected-page-service");

function LoginViewModel() {
    SelectedPageService.getInstance().updateSelectedPage("Login");
    var pdouser = {
        Username:"",
        Password:"",
        token:""        
    };
    const viewModel = observableModule.fromObject({
        /* Add your view model properties here */
            
    });

    return viewModel;
}

module.exports = LoginViewModel;

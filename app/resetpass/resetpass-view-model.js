const observableModule = require("tns-core-modules/data/observable");
const SelectedPageService = require("../shared/selected-page-service");

function ResetPassViewModel() {
    SelectedPageService.getInstance().updateSelectedPage("Reset");
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

module.exports = ResetPassViewModel;

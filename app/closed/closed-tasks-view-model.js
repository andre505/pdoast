const observableModule = require("tns-core-modules/data/observable");

const SelectedPageService = require("../shared/selected-page-service");

function ClosedTViewModel() {
    SelectedPageService.getInstance().updateSelectedPage("Closedtasks");

    const viewModel = observableModule.fromObject({
        /* Add your view model properties here */
    });

    return viewModel;
}

module.exports = ClosedTViewModel;

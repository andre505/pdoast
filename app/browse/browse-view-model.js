const observableModule = require("tns-core-modules/data/observable");

const SelectedPageService = require("../shared/selected-page-service");

function BrowseViewModel() {
    SelectedPageService.getInstance().updateSelectedPage("Browse");
    var tempSessions = [
        {
            id:'0',
            title:'session 1',
            description:'This is the first session'
        },
    
        {
            id:'1',
            title:'session 2',
            description:'This is the second session'
        },
    
        {
            id:'2',
            title:'session 3',
            description:'This is the third session'
        },

        {
            id:'3',
            title:'session 4',
            description:'This is the fourth session'
        },

        {
            id:'4',
            title:'session 5',
            description:'This is the fifth session'
        },
    ];
    const viewModel = observableModule.fromObject({
        sessions: tempSessions
        /* Add your view model properties here */
    });

    return viewModel;
}

module.exports = BrowseViewModel;

const observableModule = require("tns-core-modules/data/observable");

const SelectedPageService = require("../shared/selected-page-service");

function TerminalViewModel() {
    SelectedPageService.getInstance().updateSelectedPage("Terminal");
    var tempSessions = [
        {
            id:'0',
            title:'Terminal 1',
            description:'This is the first terminal'
        },
    
        {
            id:'1',
            title:'Terminal 2',
            description:'This is the second terminal'
        },
    
        {
            id:'2',
            title:'Terminal 3',
            description:'This is the third terminal'
        },

        {
            id:'3',
            title:'Terminal 4',
            description:'This is the fourth terminal'
        },
    ];    
       

    const viewModel = observableModule.fromObject({
        sessions: tempSessions
      
               /* Add your view model properties here */});

    return viewModel;
}

module.exports = TerminalViewModel;

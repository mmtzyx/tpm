var createViewModel = require("../../shared/view-models/main-view-model").createViewModel;


function onNavigatingTo(args) {
    var page = args.object;
    page.bindingContext = createViewModel();
}
exports.onNavigatingTo = onNavigatingTo;
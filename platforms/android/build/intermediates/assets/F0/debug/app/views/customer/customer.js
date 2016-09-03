var Sqlite = require("nativescript-sqlite");
var FrameModule = require("ui/frame");
var createViewModel = require("./customer-view-model").createViewModel;

function onNavigatingTo(args) {
    var page = args.object;
    (new Sqlite("my.db")).then(db => {
        db.execSQL("CREATE TABLE IF NOT EXISTS customer (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT)").then(id => {
            page.bindingContext = createViewModel(db);
        }, error => {
            console.log("CREATE TABLE ERROR", error);
        });
    }, error => {
        console.log("OPEN DB ERROR", error);
    });
}

function navigateToTasks(args) {
    FrameModule.topmost().navigate({moduleName: "views/people/peopleedit", context: {listId: args.object.bindingContext.lists.getItem(args.index).id}});
    console.log("id : ", args.object.bindingContext.lists.getItem(args.index).id);
}

function navigateToAddNew() {
    FrameModule.topmost().navigate("views/people/people");
}


exports.onNavigatingTo = onNavigatingTo;
exports.navigateToTasks = navigateToTasks;
exports.navigateToAddNew = navigateToAddNew;
var Sqlite = require("nativescript-sqlite");
var FrameModule = require("ui/frame");
var createViewModel = require("./customerdetail-view-model").createViewModel;

function onNavigatingTo(args) {
    var page = args.object;
    (new Sqlite("my.db")).then(db => {
        db.execSQL("CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, customer_id INTEGER, task_name TEXT)").then(id => {
            page.bindingContext = createViewModel(db, page.navigationContext.listId);
        }, error => {
            console.log("CREATE TABLE ERROR", error);
        });
    }, error => {
        console.log("OPEN DB ERROR", error);
    });
}

exports.onNavigatingTo = onNavigatingTo;
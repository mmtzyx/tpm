var Sqlite = require("nativescript-sqlite");
var createViewModel = require("./people-view-model").createViewModel;

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
 
exports.onNavigatingTo = onNavigatingTo;
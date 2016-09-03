var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var Sqlite = require("nativescript-sqlite");
var Dialogs = require("ui/dialogs");

function createViewModel(database) {
    var viewModel = new Observable();
    //viewModel.lists = new ObservableArray([]);
    viewModel.firstname = "";
    viewModel.lastname = "";

    viewModel.select = function() {
        this.lists = new ObservableArray([]);
        database.all("SELECT id, firstname FROM Customer").then(rows => {
            for(var row in rows) {
                this.lists.push({id: rows[row][0], firstname: rows[row][1]});
            }
        }, error => {
            console.log("SELECT ERROR", error);
        });
    }

    viewModel.select();

    return viewModel;
}

exports.createViewModel = createViewModel;


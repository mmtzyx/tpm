var Observable = require("data/observable").Observable;
var Sqlite = require("nativescript-sqlite");

function createViewModel(database, listId) {
    var viewModel = new Observable();
    viewModel.listId = listId;
 
    viewModel.update = function() {
        database.execSQL("UPDATE customer set firstname = ?, lastname = ? WHERE id = ?", [this.firstname, this.lastname, this.listId]).then(id => {
            console.log("UPDATE RESULT", page.navigationContext.listId);
        }, error => {
            console.log("UPDATE ERROR", error);
        });
    }

    viewModel.hapus = function() {
        database.execSQL("DELETE FROM customer WHERE id = ?", [this.listId]).then(id => {
            console.log("DELETE RESULT", page.navigationContext.listId);
        }, error => {
            console.log("DELETE ERROR", error);
        });
    }
 
    viewModel.select = function() {
        database.all("SELECT firstname, lastname FROM customer WHERE id = ?", [this.listId]).then(rows => {
            for(var row in rows) {
                console.log("RESULT : ", [rows[row][0], rows[row][1]]);
                this.set("firstname", rows[row][0]);
                this.set("lastname", rows[row][1]);        
            }
        }, error => {
            console.log("SELECT ERROR", error);
        });
    }

    viewModel.select(); 

    return viewModel;
}
 
exports.createViewModel = createViewModel;
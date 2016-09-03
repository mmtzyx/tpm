var observableModule = require( "data/observable" ),
observableArray = require( "data/observable-array" ),
dialogs = require("ui/dialogs"),
localSettings = require("application-settings"),
Customer = require( "../../shared/view-models/customer-view-model" ),
defaultValues = [
    new Customer( "a"),
    new Customer( "b"),
    new Customer( "c") 
], 
data = new observableModule.Observable();

var customerList = localSettings.getString('customerList');

if(typeof customerList == "undefined"){
	localSettings.setString('customerList', JSON.stringify(defaultValues));
}

data.set( "Customers", new observableArray.ObservableArray(JSON.parse(customerList)));

data.promptTambahCustomer = function(args) {
  dialogs.prompt({
	  title: "Tambah Customer",
	  message: "Masukkan Nama Customer:",
	  okButtonText: "Tambah",
	  cancelButtonText: "Batal",
	  defaultText: "",
	  inputType: dialogs.inputType.text
	}).then(function (promptResult) {
    if (promptResult.result) {
    		defaultValues = JSON.parse(customerList);
    		var newCustomer = new Customer(promptResult.text);
        defaultValues.push(newCustomer);
        
        localSettings.setString('customerList', JSON.stringify(defaultValues));
        customerList = localSettings.getString('customerList');
        
        data.set( "Customers", new observableArray.ObservableArray(JSON.parse(customerList)));
    }
  });
}

data.CustomersTap = function(args){
	var actionBtns = ["Done", "Edit", "Delete"];
	
	customerList = localSettings.getString('customerList');
	defaultValues = JSON.parse(customerList);
	
	var currentList = defaultValues[args.index];
	
	if(currentList.complete){
		actionBtns = ["Undone", "Edit", "Delete"];
	}

	dialogs.action({
	  message: "Update Customer status:",
	  cancelButtonText: "Close",
	  actions: actionBtns
	}).then(function (result) {
	  if(result=='Delete'){
	  	dialogs.confirm({
			  title: currentList.name,
			  message: "Yakin ingin menghapus?",
			  okButtonText: "Ya",
			  cancelButtonText: "Batal",
			}).then(function (res) {
			  if(res){
			  	defaultValues.splice(args.index,1);
			  	localSettings.setString('customerList', JSON.stringify(defaultValues));
			    customerList = localSettings.getString('customerList');
			    data.set( "Customers", new observableArray.ObservableArray(JSON.parse(customerList)));
			  }
			})
	  }else if(result == 'Edit'){
	  	dialogs.prompt({
			  title: "Edit",
			  message: "Edit Customer:",
			  okButtonText: "Update",
			  cancelButtonText: "Batal",
			  defaultText: currentList.name,
			  inputType: dialogs.inputType.text
			}).then(function (promptResult){
	  		if (promptResult.result) {
	  			defaultValues[args.index].nama = promptResult.text;
	  			localSettings.setString('customerList', JSON.stringify(defaultValues));
			    customerList = localSettings.getString('customerList');
			    data.set( "Customers", new observableArray.ObservableArray(JSON.parse(customerList)));
	  		}
	  	})
	  }else if(result == 'Done'){
	  	dialogs.confirm({
			  title: currentList.name,
			  message: "Are you sure this todo is done?",
			  okButtonText: "Yes",
			  cancelButtonText: "Cancel",
			}).then(function (res) {
			  if(res){
			  	defaultValues[args.index].complete = true;
			  	localSettings.setString('customerList', JSON.stringify(defaultValues));
			    customerList = localSettings.getString('customerList');
			    data.set( "Customers", new observableArray.ObservableArray(JSON.parse(customerList)));
			  }
			});
	  }else if(result == 'Undone'){
	  	dialogs.confirm({
			  title: currentList.name,
			  message: "This todo ain't done yet?",
			  okButtonText: "Yep",
			  cancelButtonText: "Cancel",
			}).then(function (res) {
			  if(res){
			  	defaultValues[args.index].complete = false;
			  	localSettings.setString('customerList', JSON.stringify(defaultValues));
			    customerList = localSettings.getString('customerList');
			    data.set( "Customers", new observableArray.ObservableArray(JSON.parse(customerList)));
			  }
			});
	  }

	  // this for debugging purpose
	  // data.set("logs", result+'#'+args.index+'#'+customerList);
	});
}

module.exports = data;
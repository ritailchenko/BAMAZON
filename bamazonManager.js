var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root", 
    password: "root", 
    database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;

    bamazonManager();
});

function bamazonManager() {
    inquirer
    .prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
           "view products for sale",
           "view low inventory",
           "add to inventory",
           "add new product",
           "EXIT"
        ]
    })
    .then(function(answer) {
        switch (answer.action) {
            case "view products for sale":
            saleSearch();
            break;

            case "view low inventory":
            inventoryView();
            break;

            case "add to inventory":
            restock();
            break;

            case "add new product":
            addProduct();
            break;

            case "EXIT":
            exit();
            break;
        }
    });
}

function saleSearch() {
    connection.query('SELECT * FROM products', function(err, results){
        if (err) throw err;

        for (var i = 0; i < results.length; i++) {
            console.log("ID: " + results[i].id + " || Name: " + results[i].product_name + " || Price: " + results[i].retail_price + "$");
        }
        bamazonManager();
    });
}

function inventoryView() {
    connection.query("SELECT stock_quantity, product_name FROM products WHERE stock_quantity <= 500", function(err,res) {
           
        if (res.length < 1) {
            console.log("no low quantity items")
        }
        for (var i = 0; i < res.length; i++) {
            console.log("restock these items: " + res[i].product_name);
        }
        bamazonManager();
    });
   
}


 function restock() {
     connection.query("SELECT * FROM products", function (err, res) {
         if (err) throw err;

         inquirer
          .prompt([
              {
                  name: "choice",
                  type: "rawlist",
                  choices: function() {
                      var itemsArray = [];
                      for (var i = 0; i < res.length; i++) {
                          itemsArray.push(res[i].product_name);
                      }
                      return itemsArray;
                  },
              },
              {
                  name: "quantity",
                  type: "input",
                  message: "how many items would you like to add?"
              }
          ])
          .then(function(answer) {
              var chosenItem;
              for ( var i = 0; i < res.length; i++) {
                  if (res[i].product_name === answer.choice) {
                      chosenItem = res[i];
                      
                  }
                };
                connection.query(
                    "SELECT stock_quantity FROM products WHERE ?", {product_name: chosenItem.product_name}, function(err,res) {
                        if (err) throw err;
                        var restocked = res[0].stock_quantity + parseInt(answer.quantity);
                        
                        connection.query(
                            "UPDATE products SET ? WHERE ?",
                            [
                                {
                                    stock_quantity: restocked
                                },
                                {
                                    product_name: chosenItem.product_name
                                }
                            ],
                            function(err) {
                                if (err) throw err;
                                console.log("You added " + chosenItem.product_name + " in quantity of " + answer.quantity);
                                bamazonManager();
                            });
                    }
                    
                )
               
            });
        }
    )
   
 }

function addProduct() {
    inquirer
        .prompt ([
            {
                name: "item",
                type: "input",
                message: "which item would you like to add?",
            },
            {
                name: "department",
                type: "input",
                message: "in which department would you like to add item?",
            },
            {
                name: "price",
                type: "input",
                message: "how much is the retail price?",
            },
            {
                name: "quantity",
                type: "input",
                message: "how many items would you like to add?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO products SET ?",
                {
                product_name: answer.item,
                department_name: answer.department,
                retail_price: answer.price,
                stock_quantity: answer.quantity
                },
                function (err) {
                    if (err) throw err;
                    console.log("You added: " + answer.item + " in " + answer.department + " department in quantity of " + answer.quantity + " for " + answer.price + " dollars a piece");
                    bamazonManager();
                }
               
            )
        });
}

function exit() {
    connection.end();
}


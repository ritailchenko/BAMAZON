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

    bamazonCustomer();
});

function bamazonCustomer() {
    inquirer
    .prompt([
        {
        name: "id",
        type: "input",
        message: "what is the id of the product you would like to buy?"
        }
        ,{
        name: "ammount",
        message: "how many units of the product you would like to buy?"
        }
    ]).then (function(answer) {
        var desiredAmount = parseInt(answer.ammount);
        var total;
        var query = "SELECT product_name, stock_quantity FROM products WHERE ?";
        connection.query(query, {id: answer.id}, function(err, res) {
            if(err) throw err;

            for (var i = 0; i < res.length; i++) {
                if (desiredAmount < parseInt(res[i].stock_quantity)) {

                    console.log(res[i].product_name + " " + desiredAmount + " units");

                    var newQantity = parseInt(res[i].stock_quantity) - desiredAmount;
                    
                    connection.query(
                        "UPDATE products SET ? WHERE ?",  
                            [
                                {
                                    stock_quantity: newQantity
                                },
                                {
                                    id: answer.id
                                }
                            ], function(err, res) {

                            }
                        
                    )
                    var query = "SELECT retail_price FROM products WHERE ?";
                    connection.query(query, {id: answer.id}, function(err, res) {
                        if(err) throw err;

                        for (var i = 0; i < res.length; i++) {
                            total = parseInt(res[i].retail_price) * desiredAmount;
                            console.log("your total is " + total + "$");
                        }
                        nextStep();
                    });

                } else {
                    console.log("sorry, we ran out of these item");
                }    
            } 
        })
      
    });

}

function nextStep() {
    inquirer
    .prompt(
        {
        name: "nextStep",
        type: "list",
        message: "would you like to buy another item?",
        choices: ["YES" , "NO"]
        }
        
    ).then (function(answer) {
        if(answer.nextStep === "YES") {
            bamazonCustomer();
        } else {
            connection.end();
        }
});
}


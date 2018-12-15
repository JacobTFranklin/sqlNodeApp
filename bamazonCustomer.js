var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "bamazon9",
    database: "bamazon"
});

connection.connect(function(err){
    if (err) throw err;
    console.log("Connected as id"+ connection.threadId);
    console.log("-----------------------------------");
    displayProducts();
    purchaser();
});

function displayProducts(){
    connection.query("SELECT item_id, product_name, price FROM products", function (err,res){
        console.log("-----------------------------------");
        console.log("Item ID | Item Name | Price");
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price );
          }
          console.log("-----------------------------------");
      
    })
};

function purchaser(){
    inquirer.prompt([
            {
            type:"input",
            message:"Which item would you like to purchase? Please enter the item ID to continue.", 
            name: "id",
            validate: function(value){
                var valid = !isNaN(parseFloat(value));
                return valid || "Please enter a number";
                }
            },
            {
            type:"input",
            message:"How many would you like to purchase?", 
            name: "quantity",
            validate: function(value){
                var valid = !isNaN(parseFloat(value));
                return valid || "Please enter a number";
                }
            }
        ])
    .then(function(answers){
        var id = answers.id;
        var quantity = answers.quantity;
        connection.query("SELECT item_id, stock_quantity, price FROM products WHERE item_id="+id, function (err,res){
            if (err) throw err;
            else if(res[0].stock_quantity > quantity){
                console.log("Purchased!");
                var newQuantity= res[0].stock_quantity - quantity;
                var price = res[0].price*quantity;
                console.log("Your total cost is: $"+price);
                connection.query("UPDATE products SET stock_quantity ='"+newQuantity+"'WHERE item_id="+id, function (err,res){
                    if (err) throw err;
                });
                connection.end();
            }
            else{
                console.log("Sorry, we do not have the stock available for that large of a purchase.");
                connection.end();
            }
        })
        });
};


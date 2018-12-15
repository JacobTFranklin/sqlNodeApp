var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "bamazon9",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected as id" + connection.threadId);
    console.log("-----------------------------------");
    menu();
});

function displayProducts(){
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("-----------------------------------");
        console.log("Item ID | Item Name | Price | Quantity");
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        }
        console.log("-----------------------------------");
        })
};

function menu() {
    inquirer.prompt(
        {
            type: "list",
            message: "Welcome to the Bamazon Management Application. Please select a function from the menu below.",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
            name: "menu"
        }
    )
        .then(function (answers) {
            if (answers.menu === "View Products for Sale") {
                console.log("Products for Sale:");
                displayProducts();
                connection.end();
            };
            if (answers.menu === "View Low Inventory") {
                console.log("Products with low inventory:");
                connection.query("SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity<5", function (err, res) {
                    if (err) throw err;
                    console.log("-----------------------------------");
                    console.log("Item ID | Item Name | Price | Quantity");
                    for (var i = 0; i < res.length; i++) {
                        console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price + " | " + res[i].stock_quantity);
                    }
                    console.log("-----------------------------------");
                    connection.end();
                })
            };
            if (answers.menu === "Add to Inventory") {
                displayProducts();
                inquirer.prompt([
                    {
                        type: "input",
                        message: "Which product inventory would you like to add to?",
                        name: "addInventoryProduct"
                    },
                    {
                        type: "input",
                        message: "How many would you like to add?",
                        name: "addProductQuantity"
                    }
                ])
                    .then(function (answers) {
                        var productName = answers.addInventoryProduct;
                        var productQuantity = answers.addProductQuantity;
                        connection.query("UPDATE products SET stock_quantity = stock_quantity +" + productQuantity + " WHERE product_name = '" + productName + "'", function (err, res) {
                            if (err) throw err;
                            console.log("Product found! Adding " + productQuantity + " to the inventory.");
                        });
                        connection.end();
                    });
            };
            if (answers.menu === "Add New Product") {
                inquirer.prompt([
                    {
                        type: "input",
                        message: "What is the name of the product you would like to add?",
                        name: "addProductName"
                    },
                    {
                        type: "input",
                        message: "Which department would you like to add this item to?",
                        name: "addDepartment"
                    },
                    {
                        type: "input",
                        message: "What is the cost of this product?",
                        name: "addProductCost"
                    },
                    {
                        type: "input",
                        message: "How many are you adding?",
                        name: "addProductQuantity"
                    }
                ])
                    .then(function (answers) {
                        var productName = answers.addProductName;
                        var departmentName = answers.addDepartment;
                        var productCost = answers.addProductCost;
                        var productQuantity = answers.addProductQuantity;
                        connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity) values('" + productName + "','" + departmentName + "','" + productCost + "','" + productQuantity + "')", function (err, res) {
                            if (err) throw err;
                            console.log(productName+" has been added to the database!");
                            connection.end();
                        });
                    }
                    )
            }
        })
};
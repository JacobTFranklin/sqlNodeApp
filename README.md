# Bamazon sqlNodeApp
###Overview
The Bamazon sqlNodeApp is a command line, node-based javascript applicatio that allows customers to view and purchase items stored in a mySQL database. It also allows managers to view products, view low inventory, add to inventory, and add new products.

This application requires node.js, as well as the mySQL and Inquirer node packages:

https://nodejs.org/en/

https://www.npmjs.com/package/inquirer

https://www.npmjs.com/package/mysql

### Bamazon Customer
The Bamazon customer application has two main functions: displaying products available for sale, and allowing users to purchase products available for sale. Both of these functions query a mySQL database to pull product information. 

Below you can see that starting the app via the command line will display the products currently in the database and prompt the user for which item they would like to purchase:

![](Capture1.PNG)

After entering an item ID, the purchases will prompt you for how many you would like to purchase. If the inventory is available, the app calculate your total cost and subtract these items from the database, then disconnect you from the app.

![](Capture2.PNG)

###Bamazon Manager
The Bamazon manager application has four main functions: displaying products for sale, viewing low inventory, adding to inventory, and adding new products. Upon loading the app in the command line, the user will be prompted as to which function they would like to utilize:

![](Capture3.PNG)

Viewing products for sale:

![](Capture4.PNG)

Viewing low inventory (any item with a quantity less than five):

![](Capture5.PNG)

When selecting "Add to Inventory", the app will first display products in the database:

![](Capture6.PNG)

The app will then prompt for which item you would like to add to, and how may to add to it:

![](Capture7.PNG)

Selecting "Add New Product" will walk the user through the following prompts:

![](Capture8.PNG)



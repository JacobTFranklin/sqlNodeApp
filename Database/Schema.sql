create database bamazon;

use bamazon;

create table products (
item_id int primary key auto_increment,
product_name varchar(30) not null,
department_name varchar(30),
price decimal(10,2),
stock_quantity int (10)
);
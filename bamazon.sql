DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50),
  department_name VARCHAR(50),
  retail_price INTEGER(10),
  stock_quantity INTEGER(50),
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, retail_price, stock_quantity)
VALUES ("ultra light weight backpack", "travel", 40, 100);


INSERT INTO products (product_name, department_name, retail_price, stock_quantity)
VALUES ("lego blocks", "toys and games", 40, 1000);

INSERT INTO products (product_name, department_name, retail_price, stock_quantity)
VALUES ("alexa", "electronics", 140, 80);

INSERT INTO products (product_name, department_name, retail_price, stock_quantity)
VALUES ("portable speakers", "electronics", 40, 130);

INSERT INTO products (product_name, department_name, retail_price, stock_quantity)
VALUES ("horizon", "computer games", 80, 1050);

INSERT INTO products (product_name, department_name, retail_price, stock_quantity)
VALUES ("fall out", "computer games", 80, 1070);

INSERT INTO products (product_name, department_name, retail_price, stock_quantity)
VALUES ("fuji film", "photo accessoires", 20, 1370);

INSERT INTO products (product_name, department_name, retail_price, stock_quantity)
VALUES ("go pro", "photo accessoires", 280, 1070);

INSERT INTO products (product_name, department_name, retail_price, stock_quantity)
VALUES ("nintendo", "computer games", 380, 1059);

INSERT INTO products (product_name, department_name, retail_price, stock_quantity)
VALUES ("Sony PlayStation", "computer games", 380, 1089);

1. bamazonCustomer - Yes answer, doesnt recall bamazonCustomer
2. bamazonManager - function restock, should add not update 
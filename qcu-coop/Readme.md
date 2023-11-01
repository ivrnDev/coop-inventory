category_id:1
product_name:Barbeque
display_name:Filipino Barbeque
display_price:20 - 40
product_stocks:15
product_description:Original Filipino Taste Barbeque
variant_name:small
variant_symbol:s
variant_price:39
variant_stocks:100
variant_name:medium
variant_symbol:m
variant_price:79
variant_stocks:111
variant_name:large
variant_symbol:l
variant_price:99
variant_stocks:244

interface Params {
  searchParams: { [key: string]: string | string[] | undefined };
}


DELETE FROM customers;
ALTER TABLE customers AUTO_INCREMENT = 1;

DELETE FROM orders;
ALTER TABLE orders AUTO_INCREMENT = 1;

DELETE FROM transactions;
ALTER TABLE transactions AUTO_INCREMENT = 1;

DELETE FROM variants;
ALTER TABLE variants AUTO_INCREMENT = 1;

DELETE FROM products;
ALTER TABLE products AUTO_INCREMENT = 1;

DELETE FROM albums;
ALTER TABLE albums AUTO_INCREMENT = 1;

DELETE FROM banner;
ALTER TABLE banner AUTO_INCREMENT = 1;

DELETE FROM category;
ALTER TABLE category AUTO_INCREMENT = 1;

DELETE FROM activity;
ALTER TABLE activity AUTO_INCREMENT = 1;

DELETE FROM admin;
ALTER TABLE admin AUTO_INCREMENT = 1;







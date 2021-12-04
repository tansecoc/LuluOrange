-- These are the Database Manipulation queries for LuluOrange

--------------------------------------------------------------
-- Queries for the Activities page
--------------------------------------------------------------

-- get all fields from lo_activities to populate into the Activities List
SELECT activity_id, activity_description FROM lo_activities

-- add a new activity
INSERT INTO lo_activities (activity_description) VALUES (:activity_description)

-- get activity for update
SELECT activity_id, activity_description FROM lo_activities WHERE activity_id = :activity_id

-- update an activity
UPDATE lo_activities SET activity_description = :activity_description WHERE activity_id = :activity_id_selected

-- delete an activity
DELETE FROM lo_activities WHERE activity_id = :activity_id_selected

--------------------------------------------------------------
-- Queries for the Customers page
--------------------------------------------------------------

-- get all fields from lo_customers to populate into the Customers List
SELECT customer_id, customer_email, customer_firstname, customer_lastname FROM lo_customers

-- add a new customer
INSERT INTO lo_customers (customer_email, customer_firstname, customer_lastname) VALUES
    (:customer_email, :customer_firstname, :customer_lastname)

-- get customer for update
SELECT customer_id, customer_email, customer_firstname, customer_lastname FROM lo_customers WHERE customer_id = :customer_id

-- update a customer
UPDATE lo_customers SET
    customer_email = :customer_email,
    customer_firstname = :customer_firstname,
    customer_lastname = :customer_lastname WHERE
        customer_id = :customer_id_selected

--------------------------------------------------------------
-- Queries for the Genders page
--------------------------------------------------------------

-- get all fields from lo_genders to populate into the Genders List
SELECT gender_id, gender_description FROM lo_genders

-- add a new gender
INSERT INTO lo_genders (gender_id, gender_description) VALUES (:gender_id, gender_description)

-- get gender for update
SELECT gender_id, gender FROM lo_genders WHERE gender_id = :gender_id

-- update a gender
UPDATE lo_genders SET
    gender_id = :gender_id,
    gender_description = :gender_description WHERE
        gender_id = :gender_id_selected

-- delete a gender
DELETE FROM lo_genders WHERE gender_id = :gender_id_selected

--------------------------------------------------------------
-- Queries for the Products page
--------------------------------------------------------------

-- get all fields from lo_products to populate into the Products List
SELECT product_id, product_name, product_description, gender_id, activity, product_price FROM lo_products

-- add a new product
INSERT INTO lo_products (product_name, product_description, gender_id, activity_id, product_price) VALUES
    (:product_name, :product_description, :gender_id, :activity_id, :product_price)

-- get product for update
SELECT product_id, product_name, product_description, gender_id, activity_id, product_price FROM lo_products WHERE product_id = :product_id

-- get activities for filter
SELECT activity_id, activity_description FROM lo_activities

-- filter product by activity
SELECT lo_products.product_id, lo_products.product_name, lo_products.product_description, lo_products.gender_id, lo_products.activity_id, lo_products.product_price from lo_products WHERE lo_products.activity_id = :activity_id

-- update a product
UPDATE lo_products SET
    product_name = :product_name,
    product_description = :product_description,
    gender_id = :gender_id,
    activity_id = :activity_id,
    product_price = :product_price WHERE
        product_id = :product_id_selected

-- delete a product
DELETE FROM lo_product WHERE product_id = :product_id_selected

-- filter products by activity
SELECT lo_products.product_id, lo_products.product_name, lo_products.product_description, lo_products.gender_id, lo_products.activity_id, lo_products.product_price from lo_products WHERE lo_products.activity_id = ?;

--------------------------------------------------------------
-- Queries for the Stores page
--------------------------------------------------------------

-- get all fields from lo_stores to populate into the Stores List
SELECT store_id, store_email, store_phone, store_street, store_city, store_state, store_country, store_zip FROM lo_stores

-- add a new store
INSERT INTO lo_stores (store_email, store_phone, store_street, store_city, store_state, store_country, store_zip) VALUES
    (:store_email, :store_phone, :store_street, :store_city, :store_state, :store_country, :store_zip)

-- get store for update
SELECT store_id, store_email, store_phone, store_street, store_city, store_state, store_country, store_zip FROM lo_stores WHERE store_id = :store_id

-- update a store
UPDATE lo_stores SET
    store_email = :store_email,
    store_phone = :store_phone,
    store_street = :store_street,
    store_city = :store_city,
    store_state = :store_state,
    store_country = :store_country,
    store_zip = :store_zip WHERE
        store_id = :store_id_selected

--------------------------------------------------------------
-- Queries for the Orders page
--------------------------------------------------------------
-- get all fields from lo_stores to populate into the Orders List
SELECT order_id, customer_id, store_id, order_date FROM lo_orders;

-- add a new order
INSERT INTO lo_orders (customer_id, store_id, order_date) VALUES (:customer_id_Input, :store_id_Input, :order_date_Input)

-- delete an order
DELETE FROM lo_orders WHERE order_id = :order_id_selected_from_browse_Orders_page

-- get customers for orders
SELECT customer_id, customer_email FROM lo_customers

-- get order for update
SELECT order_id, customer_id, store_id, order_date FROM lo_orders WHERE order_id = :order_id

-- update an order's data based on submission of the Edit Order form 
UPDATE lo_orders SET 
customer_id = :customer_id_Input, 
store_id= :store_id_Input, 
order_date = :order_date_Input
WHERE order_id= :order_id_from_the_edit_form

--------------------------------------------------------------
-- Queries for the Orders_Products page
--------------------------------------------------------------
-- get all fields from lo_orders_products to populate into the orders_products List
SELECT order_id, product_id, quantity, selling_price FROM lo_orders_products;

-- add a new order
INSERT INTO lo_orders_products (order_id, product_id, quantity, selling_price) 
VALUES (:order_id_Input, :product_id_Input, :quantity_Input, :selling_price_Input)

-- delete an order
DELETE FROM lo_orders_products 
WHERE order_id = :order_id_selected_from_browse_Orders_page
AND product_id = :product_id_selected_from_browse_Orders_page 

-- get order-product for update
SELECT order_id, product_id, quantity, selling_price FROM lo_orders_products WHERE order_id=:order_id AND product_id=:product_id

-- update an order's data based on submission of the Edit Order form 
UPDATE lo_orders_products SET 
quantity = :quantity_Input,
selling_price = :selling_price_Input
WHERE order_id= :order_id_from_the_edit_form AND product_id = :product_id_from_the_edit_form


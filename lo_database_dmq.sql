-- These are the Database Manipulation queries for LuluOrange

--------------------------------------------------------------
-- Queries for the Activities page
--------------------------------------------------------------

-- get all fields from lo_activities to populate into the Activities List
SELECT * from lo_activities

-- add a new activity
INSERT INTO lo_activities (activity_description) VALUES (:activity_description)

-- update an activity
UPDATE lo_activities SET activity_description = :activity_description WHERE activity_id = :activity_id_selected

-- delete an activity
DELETE FROM lo_activities WHERE activity_id = :activity_id_selected

--------------------------------------------------------------
-- Queries for the Customers page
--------------------------------------------------------------

-- get all fields from lo_customers to populate into the Customers List
SELECT * from lo_customers

-- add a new customer
INSERT INTO lo_customers (customer_email, customer_firstname, customer_lastname) VALUES
    (:customer_email, :customer_firstname, :customer_lastname)

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
SELECT * from lo_genders

-- add a new gender
INSERT INTO lo_genders (gender_id, gender_description) VALUES (:gender_id, gender_description)

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
SELECT * from lo_products

-- add a new product
INSERT INTO lo_products (product_name, product_description, gender_id, activity_id, product_price) VALUES
    (:product_name, :product_description, :gender_id, :activity_id, :product_price)

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

--------------------------------------------------------------
-- Queries for the Stores page
--------------------------------------------------------------

-- get all fields from lo_stores to populate into the Stores List
SELECT * from lo_stores

-- add a new store
INSERT INTO lo_stores (store_email, store_phone, store_street, store_city, store_state, store_country, store_zip) VALUES
    (:store_email, :store_phone, :store_street, :store_city, :store_state, :store_country, :store_zip)

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

module.exports = function(){
    var express = require('express');
    var router = express.Router();

    /* For displaying all orders */
    function getOrders_Products(res, mysql, context, complete){
        mysql.pool.query("SELECT order_id, product_id, quantity, selling_price FROM lo_orders_products", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.orders_products = results;
            complete();
        });
    }

    /* Get order_product for update */
    function getOrder_Product(res, mysql, context, order_id, product_id, complete){
        // console.log('order_id:', order_id)
        // console.log('product_id:', product_id)
        var sql = "SELECT order_id, product_id, quantity, selling_price FROM lo_orders_products WHERE order_id=? AND product_id=?";
        var inserts = [order_id, product_id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            // console.log('results[0]:', results[0])
            context.order_product= results[0];
            complete();
        });
    }

    //For order dropdown
    function getOrders(res, mysql, context, complete){
        mysql.pool.query("SELECT order_id as order_id FROM lo_orders", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.orders = results;
            complete();
        });
    }

    //For product dropdown
    function getProducts(res, mysql, context, complete){
        mysql.pool.query("SELECT product_id as product_id, product_name FROM lo_products", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.products = results;
            complete();
        });
    }

    /* Display all orders_products. */
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteorderproduct.js"];
        var mysql = req.app.get('mysql');
        getOrders_Products(res, mysql, context, complete);
        getOrders(res, mysql, context, complete);
        getProducts(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render('orders_products_manage', context);
            }

        }
    })

    /* Display one order_product for the specific purpose of updating order_products */

    router.get('/:order_id_product_id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updateorderproduct.js", "deleteorderproduct.js"];
        var mysql = req.app.get('mysql');
        // console.log('params:', req.params)
        var paramsSplit = req.params.order_id_product_id.split('_');
        var params_order_id = paramsSplit[0];
        var params_product_id = paramsSplit[1];
        // console.log('order_id:', params_order_id)
        // console.log('product_id:', params_product_id)
        getOrder_Product(res, mysql, context, params_order_id, params_product_id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-order-product', context);
            }

        }
    });

    /* The URI that update data is sent to in order to update a order_product */

    router.put('/:order_id_product_id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log('req.body:', req.body)
        // console.log(req.params.id)
        var paramsSplit = req.params.order_id_product_id.split('_');
        var params_order_id = paramsSplit[0];
        var params_product_id = paramsSplit[1];        
        var sql = "UPDATE lo_orders_products SET quantity=?, selling_price=? WHERE order_id=? AND product_id=?";
        var inserts = [req.body.quantity, req.body.selling_price, params_order_id, params_product_id];
        // console.log(inserts)
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    });

    
    /* add an order_product */
    router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO lo_orders_products (order_id, product_id, quantity, selling_price) VALUES (?,?,?,?)";
        var inserts = [req.body.order_id, req.body.product_id, req.body.quantity, req.body.selling_price];

        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/orders_products_manage');
            }
        });
    });

    /* Route to delete an order_product, simply returns a 202 upon success. Ajax will handle this. */

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM lo_orders_products WHERE order_id=? AND product_id=?";
        var paramsSplit = req.params.id.split('_');
        var params_order_id = paramsSplit[0];
        var params_product_id = paramsSplit[1];
        var inserts = [params_order_id, params_product_id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })

    return router;
}();

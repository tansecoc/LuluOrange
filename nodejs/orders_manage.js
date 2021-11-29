module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getOrders(res, mysql, context, complete){
        mysql.pool.query("SELECT lo_orders.order_id, lo_orders.customer_id, lo_orders.store_id, lo_orders.order_date FROM lo_orders INNER JOIN lo_customers ON lo_orders.customer_id = lo_customers.customer_id", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.orders = results;
            complete();
        });
    }

    function getOrder(res, mysql, context, id, complete){
        var sql = "SELECT order_id, customer_id, store_id, order_date FROM lo_orders WHERE order_id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.order = results[0];
            complete();
        });
    }

    function getCustomers(res, mysql, context, complete){
        mysql.pool.query("SELECT customer_id, customer_email FROM lo_customers", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.customers = results;
            complete();
        });
    }

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["filterorder.js"];
        var mysql = req.app.get('mysql');
        getOrders(res, mysql, context, complete);
        getCustomers(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('orders_manage', context);
            }

        }
    })

    /* Display one order for the specific purpose of updating orders */

    router.get('/:order_id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updateorder.js"];
        var mysql = req.app.get('mysql');
        getOrder(res, mysql, context, req.params.order_id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-order', context);
            }

        }
    });

    router.post('/', function(req, res){
        console.log(req.body.store)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO lo_orders (customer_id, store_id, order_date) VALUES (?,?,?)";
        var inserts = [req.body.customer_id, req.body.store_id, req.body.order_date];

        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/orders_manage');
            }
        });
    });

    /* The URI that update data is sent to in order to update an order */

    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE lo_orders SET customer_id=?, store_id=?, order_date=? WHERE order_id=?";
        var inserts = [req.body.customer_id, req.body.store_id, req.body.order_date, req.params.id];
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

    // //Delete an order
    // router.get('/delete', function (req, res, next) {
    //     var callbackCount = 0;
    //     var deleteID = req.query.order;
    //     var mysql = req.app.get('mysql');
    //     var sql = "DELETE FROM lo_orders WHERE order_id = " + deleteID;
    //     sql = mysql.pool.query(sql, function(error, results, fields){
    //         if(error){
    //             console.log(JSON.stringify(error))
    //             res.write(JSON.stringify(error));
    //             res.end();
    //         }else{
    //             res.redirect('/orders_manage');
    //         }
    //     });
    // });

    return router;
}();

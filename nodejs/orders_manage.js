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

    // function getOrdersbyCustomer(req, res, mysql, context, complete){
    //     var query = "SELECT lo_customers.customer_id, lo_customers.customer_email FROM lo_customers INNER JOIN lo_orders ON lo_customers.customer_id = lo_orders.customer_id WHERE lo_customers.customer_id = ?";
    //     console.log(req.params)
    //     var inserts = [req.params.customer_id]
    //     mysql.pool.query(query, inserts, function(error, results, fields){
    //           if(error){
    //               res.write(JSON.stringify(error));
    //               res.end();
    //           }
    //           context.customer_id = results;
    //           complete();
    //       });
    //   }

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

    // router.get('/filter/:customer', function(req, res){
    //     var callbackCount = 0;
    //     var context = {};
    //     context.jsscripts = ["filterorder.js"];
    //     var mysql = req.app.get('mysql');
    //     getOrdersbyCustomer(req,res, mysql, context, complete);
    //     getOrders(res, mysql, context, complete);
    //     function complete(){
    //         callbackCount++;
    //         if(callbackCount >= 2){
    //             res.render('orders_manage', context);
    //         }

    //     }
    // });

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

    return router;
}();

module.exports = function(){
    var express = require('express');
    var router = express.Router();

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

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = [];
        var mysql = req.app.get('mysql');
        getOrders_Products(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('orders_products_manage', context);
            }

        }
    })

    router.post('/', function(req, res){
        console.log(req.body.store)
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

    return router;
}();

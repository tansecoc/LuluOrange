module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getOrders(res, mysql, context, complete){
        mysql.pool.query("SELECT order_id, customer_id, store_id, order_date FROM lo_orders", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.orders = results;
            complete();
        });
    }

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = [];
        var mysql = req.app.get('mysql');
        getOrders(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('orders_manage', context);
            }

        }
    })

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

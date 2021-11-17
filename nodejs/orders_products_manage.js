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

    function getProductWithID(req, res, mysql, context, complete) {
        var query = "SELECT order_id, lo_orders_products.product_id, lo_products.product_description, quantity, selling_price FROM ((lo_orders_products INNER JOIN lo_products ON lo_orders_products.product_id = lo_products.product_id) INNER JOIN lo_activities ON lo_products.activity_id = lo_activities.activity_id) WHERE lo_activities.activity_id = " + mysql.pool.escape(req.params['s']);
        console.log(query)
  
        mysql.pool.query(query, function(error, results, fields){
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

    router.get('/search/:s', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["searchProductID.js"];
        var mysql = req.app.get('mysql');
        getProductWithID(req, res, mysql, context, complete);
        // getPlanets(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('orders_products', context);
            }
        }
    });

    // router.post('/', function(req, res){
    //     console.log(req.body.store)
    //     console.log(req.body)
    //     var mysql = req.app.get('mysql');
    //     var sql = "INSERT INTO lo_stores (store_email, store_phone, store_street, store_city, store_state, store_country, store_zip) VALUES (?,?,?,?,?,?,?)";
    //     var inserts = [req.body.store_email, req.body.store_phone, req.body.store_street, req.body.store_city, req.body.store_state, req.body.store_country, req.body.store_zip];

    //     sql = mysql.pool.query(sql,inserts,function(error, results, fields){
    //         if(error){
    //             console.log(JSON.stringify(error))
    //             res.write(JSON.stringify(error));
    //             res.end();
    //         }else{
    //             res.redirect('/stores_manage');
    //         }
    //     });
    // });

    return router;
}();

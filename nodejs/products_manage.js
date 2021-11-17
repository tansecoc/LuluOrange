module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getProducts(res, mysql, context, complete){
        mysql.pool.query("product_id, product_name, product_description, gender_id, activity, product_price FROM lo_products", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.products = results;
            complete();
        });
    }

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = [];
        var mysql = req.app.get('mysql');
        getStores(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('products_manage', context);
            }

        }
    })

    router.post('/', function(req, res){
        console.log(req.body.store)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO lo_products (product_id, product_name, product_description, gender_id, activity_id, product_price) VALUES (?,?,?,?,?,?)";
        var inserts = [req.body.product_id, req.body.product_name, req.body.product_description, req.body.activity_id, req.body.product_price];

        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/products_manage');
            }
        });
    });

    return router;
}();

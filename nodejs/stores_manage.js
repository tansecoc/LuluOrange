module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getStores(res, mysql, context, complete){
        mysql.pool.query("SELECT store_id, store_email, store_phone, store_street, store_city, store_state, store_country, store_zip FROM lo_stores", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.stores = results;
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
                res.render('stores_manage', context);
            }

        }
    })

    router.post('/', function(req, res){
        console.log(req.body.store)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO lo_stores (store_email, store_phone, store_street, store_city, store_state, store_country, store_zip) VALUES (?,?,?,?,?,?,?)";
        var inserts = [req.body.store_email, req.body.store_phone, req.body.store_street, req.body.store_city, req.body.store_state, req.body.store_country, req.body.store_zip];

        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/stores_manage');
            }
        });
    });

    return router;
}();

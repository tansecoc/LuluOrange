module.exports = function(){
    var express = require('express');
    var router = express.Router();

    /* For displaying all stores */
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

    /* Get a store for update */
    function getStore(res, mysql, context, id, complete){
        // var sql = "SELECT character_id as id, fname, lname, homeworld, age FROM bsg_people WHERE character_id = ?";
        var sql = "SELECT store_id, store_email, store_phone, store_street, store_city, store_state, store_country, store_zip FROM lo_stores WHERE store_id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.store = results[0];
            complete();
        });
    }

    /* Display all stores. */
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

    /* Display one store for the specific purpose of updating stores */
    router.get('/:store_id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updatestore.js"];
        var mysql = req.app.get('mysql');
        getStore(res, mysql, context, req.params.store_id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-store', context);
            }

        }
    });

    /* The URI that update data is sent to in order to update a store */
    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE lo_stores SET store_email=?, store_phone=?, store_street=?, store_city=?, store_state=?, store_country=?, store_zip=? WHERE store_id=?";
        var inserts = [req.body.store_email, req.body.store_phone, req.body.store_street, req.body.store_city, req.body.store_state, req.body.store_country, req.body.store_zip, req.params.id];
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

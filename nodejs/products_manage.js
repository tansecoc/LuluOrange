module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getProducts(res, mysql, context, complete){
        mysql.pool.query("SELECT product_id, product_name, product_description, gender_id, activity_id, product_price FROM lo_products", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.products = results;
            complete();
        });
    }

    function getActivities(res, mysql, context, complete){
        mysql.pool.query("SELECT activity_id, activity_description FROM lo_activities", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.activities = results;
            complete();
        });
    }

    function getProductsByActivity(req, res, mysql, context, complete){
        // var query = "SELECT bsg_people.character_id as id, fname, lname, bsg_planets.name AS homeworld, age FROM bsg_people INNER JOIN bsg_planets ON homeworld = bsg_planets.planet_id WHERE bsg_people.homeworld = ?";
        var query = "SELECT lo_products.product_id, lo_products.product_name, lo_products.product_description, lo_products.gender_id, lo_products.activity_id, lo_products.product_price from lo_products WHERE lo_products.activity_id = ?";
        console.log(req.params)
        var inserts = [req.params.product]
        mysql.pool.query(query, inserts, function(error, results, fields){
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
        context.jsscripts = ["filterproduct.js"];
        var mysql = req.app.get('mysql');
        getProducts(res, mysql, context, complete);
        getActivities(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('products_manage', context);
            }

        }
    })

    /*Display all products associated with a given activity.*/
    router.get('/filter/:product', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["filterproduct.js"];
        var mysql = req.app.get('mysql');
        getProductsByActivity(req,res, mysql, context, complete);
        getProducts(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('products_manage', context);
            }

        }
    });

    router.post('/', function(req, res){
        console.log(req.body.store)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO lo_products (product_name, product_description, gender_id, activity_id, product_price) VALUES (?,?,?,?,?)";
        var inserts = [req.body.product_name, req.body.product_description, req.body.gender_id, req.body.activity_id, req.body.product_price];

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

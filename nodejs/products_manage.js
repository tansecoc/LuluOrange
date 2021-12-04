module.exports = function(){
    var express = require('express');
    var router = express.Router();

    /* For displaying all products */
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

    /* Get a product for update */
    function getProduct(res, mysql, context, id, complete){
        // var sql = "SELECT character_id as id, fname, lname, homeworld, age FROM bsg_people WHERE character_id = ?";
        var sql = "SELECT product_id, product_name, product_description, gender_id, activity_id, product_price FROM lo_products WHERE product_id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.product = results[0];
            complete();
        });
    }

    /* For the activities filter dropdown */
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

    /* For filtering products by an activity */
    function getProductsByActivity(req, res, mysql, context, complete){
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

    /* Display all products. */
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["filterproduct.js", "deleteproduct.js"];
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
        context.jsscripts = ["filterproduct.js", "deleteproduct.js"];
        var mysql = req.app.get('mysql');
        getProductsByActivity(req,res, mysql, context, complete);
        getActivities(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('products_manage', context);
            }

        }
    });

    /* Display one product for the specific purpose of updating products */

    router.get('/:product_id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updateproduct.js", "deleteproduct.js"];
        var mysql = req.app.get('mysql');
        getProduct(res, mysql, context, req.params.product_id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-product', context);
            }

        }
    });

    /* The URI that update data is sent to in order to update a product */

    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        // console.log(req.params.id)
        if (req.body.gender_id === '') {
            // var sql = "INSERT INTO lo_products (product_name, product_description, gender_id, activity_id, product_price) VALUES (?,?,null,?,?)";
            var sql = "UPDATE lo_products SET product_name=?, product_description=?, gender_id=null, activity_id=?, product_price=? WHERE product_id=?";
            var inserts = [req.body.product_name, req.body.product_description, req.body.activity_id, req.body.product_price, req.params.id];
        } else{
            var sql = "UPDATE lo_products SET product_name=?, product_description=?, gender_id=?, activity_id=?, product_price=? WHERE product_id=?";
            var inserts = [req.body.product_name, req.body.product_description, req.body.gender_id, req.body.activity_id, req.body.product_price, req.params.id];
        }
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

    /* add a product */
    router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        if (req.body.gender_id === '') {
            var sql = "INSERT INTO lo_products (product_name, product_description, gender_id, activity_id, product_price) VALUES (?,?,null,?,?)";
            var inserts = [req.body.product_name, req.body.product_description, req.body.activity_id, req.body.product_price];
        } else{
            var sql = "INSERT INTO lo_products (product_name, product_description, gender_id, activity_id, product_price) VALUES (?,?,?,?,?)";
            var inserts = [req.body.product_name, req.body.product_description, req.body.gender_id, req.body.activity_id, req.body.product_price];
        }
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

    /* Route to delete a product, simply returns a 202 upon success. Ajax will handle this. */
    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM lo_products WHERE product_id = ?";
        var inserts = [req.params.id];
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

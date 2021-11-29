module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getCustomers(res, mysql, context, complete){
        mysql.pool.query("SELECT customer_id, customer_email, customer_firstname, customer_lastname  FROM lo_customers", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.customers = results;
            complete();
        });
    }

    /*Display all customerss. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        //context.jsscripts = ["deleteactivity.js"];
        context.jsscripts = [];
        var mysql = req.app.get('mysql');
        getCustomers(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('customers_manage', context);
            }
        }
    });

    /* Adds a customer, redirects to the customer_manage page after adding */

    router.post('/', function(req, res){
        //console.log(req.body.activities)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO lo_customers (customer_email, customer_firstname, customer_lastname) VALUES (?,?,?)";
        var inserts = [req.body.customer_email, req.body.customer_firstname, req.body.customer_lastname];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/customers_manage');
            }
        });
    });

    /* Display one customer for the specific purpose of updating customers */

    router.get('/:customer_id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updatecustomer.js"];
        var mysql = req.app.get('mysql');
        getCustomer(res, mysql, context, req.params.customer_id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-customer', context);
            }

        }
    });

    function getCustomer(res, mysql, context, customer_id, complete){
        var sql = "SELECT customer_id, customer_email, customer_firstname, customer_lastname FROM lo_customers WHERE customer_id = ?";
        var inserts = [customer_id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.customer = results[0];
            complete();
        });
    }

    /* The URI that update data is sent to in order to update a customer */

    router.put('/:customer_id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.gender_id)
        var sql = "UPDATE lo_customers SET customer_email=?, customer_firstname=?, customer_lastname=? WHERE customer_id=?";
        var inserts = [req.body.customer_email, req.body.customer_firstname, req.body.customer_lastname, req.params.customer_id];
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

   

    return router;
}();
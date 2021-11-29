module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getGenders(res, mysql, context, complete){
        mysql.pool.query("SELECT gender_id, gender FROM lo_genders", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.genders = results;
            complete();
        });
    }

    /*Display all genderrs. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        //context.jsscripts = ["deleteactivity.js"];
        context.jsscripts = [];
        var mysql = req.app.get('mysql');
        getGenders(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('genders_manage', context);
            }
        }
    });

    /* Display one gender for the specific purpose of updating genders */

    router.get('/:gender_id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updategender.js"];
        var mysql = req.app.get('mysql');
        getGender(res, mysql, context, req.params.gender_id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-gender', context);
            }

        }
    });

    function getGender(res, mysql, context, gender_id, complete){
        var sql = "SELECT gender_id, gender FROM lo_genders WHERE gender_id = ?";
        var inserts = [gender_id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.gender = results[0];
            complete();
        });
    }

    /* Adds a gender, redirects to the genders_manage page after adding */

    router.post('/', function(req, res){
        console.log(req.body.gender)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO lo_genders (gender) VALUES (?)";
        var inserts = [req.body.gender];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/genders_manage');
            }
        });
    });

    /* The URI that update data is sent to in order to update an gender */

    router.put('/:gender_id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.gender_id)
        var sql = "UPDATE lo_genders SET gender=? WHERE gender_id=?";
        var inserts = [req.body.gender, req.params.gender_id];
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
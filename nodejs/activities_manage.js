module.exports = function(){
    var express = require('express');
    var router = express.Router();

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

    /*Display all activities. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteactivity.js"];
        var mysql = req.app.get('mysql');
        getActivities(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('activities', context);
            }
        }
    });

    /* Adds an activity, redirects to the activities_manage page after adding */

    router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO lo_activities (activity_description) VALUES (?)";
        var inserts = [req.body.activity_description];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/activities_manage');
            }
        });
    });

    /* Display one activity for the specific purpose of updating activities */

    router.get('/:activity_id', function(req, res){
        callbackCount = 0;
        var context = {};
        //context.jsscripts = ["selectedplanet.js", "updateperson.js"];
        var mysql = req.app.get('mysql');
        getActivity(res, mysql, context, req.params.activity_id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('update-activity', context);
            }

        }
    });

    function getActivity(res, mysql, context, activity_id, complete){
        var sql = "SELECT activity_id, activity_description FROM lo_activities WHERE activity_id = ?";
        var inserts = [activity_id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.activity = results[0];
            complete();
        });
    }

    /* The URI that update data is sent to in order to update an activity */

    router.put('/:activity_id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.activity_id)
        var sql = "UPDATE lo_activities SET activity_description=?";
        var inserts = [req.body.activity_description, req.params.activity_id];
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

    /* Route to delete an activity, simply returns a 202 upon success. Ajax will handle this. */

    router.delete('/:activity_id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM lo_activities WHERE character_activity_id = ?";
        var inserts = [req.params.activity_id];
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
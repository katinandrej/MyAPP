const express = require('express');
const app = express();
const jwt = require('jsonwebtoken')
var sha1 = require('sha1')
const bodyParser = require('body-parser')
const api = require('./routes/api.ts')
var flash = require('connect-flash');
var bcrypt = require('bcrypt');
const saltRounds = 10;
//const signup_comp = require('./src/app/signup/signup.component')

//CORS Middleware
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods","GET,HEAD,POST,DELETE,PUT,OPTIONS");
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,contentType,Content-Type,Accept,Authorization");
    next();
});

app.use(bodyParser.json());
app.use(flash());
app.use('/api', api)

var sql = require("mssql");

// config for your database
var config = {
    user: 'Redmine',
    password: 'Redmine4_Tiac1',
    server: '192.168.1.99',
    database: 'TIAC_DB',
};

// var config = {
//     user: 'sa',
//     password: 'sa',
//     server: 'SVAROG', 
//     database: 'Praksa_test',
// };

var userActive = ""

app.get('/', function (req, res) {
       // connect to your database
    res.send("Hello from server!")
});

app.get('/absence', async (req, res) => {
    // Change execute query to accept parameters.
    sql.close();
    var executeQuery = function(res,query,parameters){
    sql.connect(config,function(err){
        if(err){
            console.log("there is a database connection error -> "+err);
            res.send(err);
        }
        else{
            // create request object
            var request = new sql.Request();

            // Add parameters
            parameters.forEach(function(p) {
                request.input(p.name, p.sqltype, p.value);
            });

            // query to the database
            request.query(query,function(err,result){
                if(err){
                    console.log("error while querying database -> "+err);
                    res.send(err);
                }
                else{
                    res.send(result);
                    sql.close();
                    }
                });
            }
        });
    }

    var pool = await sql.connect(config);
    var result1 = await pool.request()
    .query('SELECT ACCOUNT_ID, USERNAME_ACC FROM Final.ACCOUNT WHERE LEN(USERNAME_ACC) > 0 ORDER BY USERNAME_ACC ASC')
    var result = Object.values(result1.recordset)
    //console.log(result[0]);
    var i = 0
    res.send(result);
    for (i = 0, i < result.length; i++;) {
        res.json({
            list: result[i]
        })
    }

    sql.close();

});

app.delete('/admin/:ABSENCE_ID', async (req, res) => {
    // Change execute query to accept parameters.
    sql.close();
    var executeQuery = function(res,query,parameters){
    sql.connect(config,function(err){
        if(err){
            console.log("there is a database connection error -> "+err);
            res.send(err);
        }
        else{
            // create request object
            var request = new sql.Request();

            // Add parameters
            parameters.forEach(function(p) {
                request.input(p.name, p.sqltype, p.value);
            });

            // query to the database
            request.query(query,function(err,result){
                if(err){
                    console.log("error while querying database -> "+err);
                    res.send(err);
                }
                else{
                    res.send(result);
                    sql.close();
                    }
                });
            }
        });
    }
    var result = []
    var pool = await sql.connect(config);
    var result1 = await pool.request()
    .input('abs_id', sql.VarChar(50), req.params.ABSENCE_ID)
    .query('DELETE FROM Final.ABSENCE WHERE ABSENCE_ID = @abs_id')
    result = Object.values(result1.rowsAffected)
      var result_f = result[0]
      var result_ff = result_f[""]

      if (result_f != 0) {
        sql.close();
        let payload = { subject: req.body._id }
        let token = jwt.sign(payload, 'secretKey')

        res.json ({
            suc: true,
            mes: "Successfully deleted event!"
        })
      } else {
        res.json ({
            suc: false,
            mes: "Error with delete!"
        })
      }

});

app.put('/admin/:ABSENCE_ID', async (req, res) => {
    // Change execute query to accept parameters.
    sql.close();
    var executeQuery = function(res,query,parameters){
    sql.connect(config,function(err){
        if(err){
            console.log("there is a database connection error -> "+err);
            res.send(err);
        }
        else{
            // create request object
            var request = new sql.Request();

            // Add parameters
            parameters.forEach(function(p) {
                request.input(p.name, p.sqltype, p.value);
            });

            // query to the database
            request.query(query,function(err,result){
                if(err){
                    console.log("error while querying database -> "+err);
                    res.send(err);
                }
                else{
                    res.send(result);
                    sql.close();
                    }
                });
            }
        });
    }
    var result = []
    console.log(req.body)
    var pool = await sql.connect(config);
    var result1 = await pool.request()
    .input('abs_id', sql.VarChar(50), req.params.ABSENCE_ID)
    .input('abs_start', sql.VarChar(50), req.body.start)
    .input('abs_end', sql.VarChar(50), req.body.end)
    .input('reason', sql.VarChar(50), req.body.title)
    .query('UPDATE Final.ABSENCE SET REASON = @reason, ABSENCE_START = @abs_start, ABSENCE_END = @abs_end WHERE ABSENCE_ID = @abs_id')
    result = Object.values(result1.rowsAffected)
      var result_f = result[0]
      var result_ff = result_f[""]

      if (result_f != 0) {
        sql.close();
        let payload = { subject: req.body._id }
        let token = jwt.sign(payload, 'secretKey')

        res.json ({
            suc: true,
            mes: "Successfully updated event!"
        })
      } else {
        res.json ({
            suc: false,
            mes: "Error with updating!"
        })
      }

});

app.get('/absences/:USERNAME_ACC', async (req, res) => {
    // Change execute query to accept parameters.
    sql.close();
    var executeQuery = function(res,query,parameters){
    sql.connect(config,function(err){
        if(err){
            console.log("there is a database connection error -> "+err);
            res.send(err);
        }
        else{
            // create request object
            var request = new sql.Request();

            // Add parameters
            parameters.forEach(function(p) {
                request.input(p.name, p.sqltype, p.value);
            });

            // query to the database
            request.query(query,function(err,result){
                if(err){
                    console.log("error while querying database -> "+err);
                    res.send(err);
                }
                else{
                    res.send(result);
                    sql.close();
                    }
                });
            }
        });
    }

    var pool = await sql.connect(config);
    var result1 = await pool.request()
    .input('acc_name', sql.VarChar(50), req.params.USERNAME_ACC)
    .query('SELECT ABSENCE_ID, USERNAME_ACC, ABSENCE_START, ABSENCE_END, REASON FROM Final.ACCOUNT ac join Final.ABSENCE ab on ac.ACCOUNT_ID = ab.ACCOUNT_ID WHERE USERNAME_ACC = @acc_name')
    var result = Object.values(result1.recordset)
    //console.log(result[0]);
    var i = 0
    res.send(result);
    for (i = 0, i < result.length; i++;) {
        res.json({
            list: result[i]
        })
    }
    sql.close();

});

app.get('/view-contracts/:USERNAME_ACC', async (req, res) => {
    // Change execute query to accept parameters.
    sql.close();
    var executeQuery = function(res,query,parameters){
    sql.connect(config,function(err){
        if(err){
            console.log("there is a database connection error -> "+err);
            res.send(err);
        }
        else{
            // create request object
            var request = new sql.Request();

            // Add parameters
            parameters.forEach(function(p) {
                request.input(p.name, p.sqltype, p.value);
            });

            // query to the database
            request.query(query,function(err,result){
                if(err){
                    console.log("error while querying database -> "+err);
                    res.send(err);
                }
                else{
                    res.send(result);
                    sql.close();
                    }
                });
            }
        });
    }

    var pool = await sql.connect(config);
    var result1 = await pool.request()
    .input('acc_name', sql.VarChar(50), req.params.USERNAME_ACC)
    .query('SELECT USERNAME_ACC, NORM_FOR_MONTH, VALID_FROM, VALID_UNTIL, COEF FROM Final.CONTRACT C join Final.ACCOUNT aC on ac.ACCOUNT_ID = C.ACCOUNT_ID WHERE ac.ACCOUNT_ID = @acc_name')
    var result = Object.values(result1.recordset)
    //console.log(result);
    //console.log(result[0]);
    var i = 0
    res.send(result);
    for (i = 0, i < result.length; i++;) {
        res.json({
            list: result[i]
        })
    }
    sql.close();

});

app.get('/view-valid-contract/:USERNAME_ACC', async (req, res) => {
    // Change execute query to accept parameters.
    sql.close();
    var executeQuery = function(res,query,parameters){
    sql.connect(config,function(err){
        if(err){
            console.log("there is a database connection error -> "+err);
            res.send(err);
        }
        else{
            // create request object
            var request = new sql.Request();

            // Add parameters
            parameters.forEach(function(p) {
                request.input(p.name, p.sqltype, p.value);
            });

            // query to the database
            request.query(query,function(err,result){
                if(err){
                    console.log("error while querying database -> "+err);
                    res.send(err);
                }
                else{
                    res.send(result);
                    sql.close();
                    }
                });
            }
        });
    }

    var pool = await sql.connect(config);
    var result1 = await pool.request()
    .input('acc_name', sql.VarChar(50), req.params.USERNAME_ACC)
    .query('SELECT USERNAME_ACC, NORM_FOR_MONTH, VALID_FROM, VALID_UNTIL, COEF FROM Final.CONTRACT C join Final.ACCOUNT aC on ac.ACCOUNT_ID = C.ACCOUNT_ID WHERE ac.ACCOUNT_ID = @acc_name AND VALID_UNTIL is null')
    var result = Object.values(result1.recordset)
    console.log(result);
    //console.log(result[0]);
    var i = 0
    res.send(result);
    for (i = 0, i < result.length; i++;) {
        res.json({
            list: result[i]
        })
    }
    sql.close();

});



app.get('/absences', async (req, res) => {
    // Change execute query to accept parameters.
    sql.close();
    var executeQuery = function(res,query,parameters){
    sql.connect(config,function(err){
        if(err){
            console.log("there is a database connection error -> "+err);
            res.send(err);
        }
        else{
            // create request object
            var request = new sql.Request();

            // Add parameters
            parameters.forEach(function(p) {
                request.input(p.name, p.sqltype, p.value);
            });

            // query to the database
            request.query(query,function(err,result){
                if(err){
                    console.log("error while querying database -> "+err);
                    res.send(err);
                }
                else{
                    res.send(result);
                    sql.close();
                    }
                });
            }
        });
    }

    var pool = await sql.connect(config);
    var result1 = await pool.request()
    //.input('acc_name', sql.VarChar(50), userActive)
    .query('SELECT ABSENCE_ID, USERNAME_ACC, ABSENCE_START, ABSENCE_END, REASON FROM Final.ACCOUNT ac join Final.ABSENCE ab on ac.ACCOUNT_ID = ab.ACCOUNT_ID')
    var result = Object.values(result1.recordset)
    //console.log(result[0]);
    var i = 0
    res.send(result);
    for (i = 0, i < result.length; i++;) {
        res.json({
            list: result[i]
        })
    }
    sql.close()

});


app.post('/absencepost', async (req, res) => {
    // Change execute query to accept parameters.
    sql.close();
    var executeQuery = function(res,query,parameters){
    sql.connect(config,function(err){
        if(err){
            console.log("there is a database connection error -> "+err);
            res.send(err);
        }
        else{
            // create request object
            var request = new sql.Request();

            // Add parameters
            parameters.forEach(function(p) {
                request.input(p.name, p.sqltype, p.value);
            });

            // query to the database
            request.query(query,function(err,result){
                if(err){
                    console.log("error while querying database -> "+err);
                    res.send(err);
                }
                else{
                    res.send(result);
                    sql.close();
                }
            });
        }
    });
}

      var result = [];
      var pool = await sql.connect(config);
      var result1 = await pool.request()
      .input('start', sql.VarChar(50), req.body.ABSENCE_START)
      .input('end', sql.VarChar(50), req.body.ABSENCE_END)
      .input('reason', sql.VarChar(50), req.body.REASON)
      .input('acc_id', sql.VarChar(50), req.body.USERNAME_ACC)
      .query('INSERT INTO Final.ABSENCE(ABSENCE_START, ABSENCE_END, REASON, ACCOUNT_ID) VALUES(@start, @end, @reason, @acc_id)');
      //console.log(result1)
      result = Object.values(result1.rowsAffected)
      var result_f = result[0]
      var result_ff = result_f[""]
      console.log(result_f)
      //console.log(result_ff)
      //console.log(result_f[""]);

      if (result_f != 0) {
        sql.close();
        let payload = { subject: req.body._id }
        let token = jwt.sign(payload, 'secretKey')
        //console.log(token)

        res.json ({
            suc: true,
            mes: "Successfully logged in!"
        })
        //res.status(200).send({token})
        //res.status(401).send("Username or password are wrong")
      } else {
        res.json ({
            suc: false,
            mes: "Error with login!"
        })
      }


});

app.post('/contract', async (req, res) => {
    // Change execute query to accept parameters.
    sql.close();
    var executeQuery = function(res,query,parameters){
    sql.connect(config,function(err){
        if(err){
            console.log("there is a database connection error -> "+err);
            res.send(err);
        }
        else{
            // create request object
            var request = new sql.Request();

            // Add parameters
            parameters.forEach(function(p) {
                request.input(p.name, p.sqltype, p.value);
            });

            // query to the database
            request.query(query,function(err,result){
                if(err){
                    console.log("error while querying database -> "+err);
                    res.send(err);
                }
                else{
                    res.send(result);
                    sql.close();
                }
            });
        }
    });
    }

    var result = [];
    var pool = await sql.connect(config);
    var result1 = await pool.request()
    .input('coef', sql.VarChar(50), req.body.COEF)
    .input('nfm', sql.VarChar(50), req.body.NORM_FOR_MONTH)
    .input('nfw', sql.VarChar(50), req.body.NORM_FOR_MONTH/4)
    .input('nfd', sql.VarChar(50), req.body.NORM_FOR_MONTH/20)
    .input('dfv', sql.VarChar(50), req.body.DAYS_FOR_VACATION)
    .input('valid', sql.VarChar(50), req.body.VALID_FROM)
    .input('acc_id', sql.VarChar(50), req.body.USERNAME_ACC)
    .query('INSERT INTO Final.CONTRACT(ACCOUNT_ID, COEF, NORM_FOR_DAY, NORM_FOR_WEEK, NORM_FOR_MONTH, DAYS_FOR_VACATION, VALID_FROM) VALUES(@acc_id, @coef, @nfd, @nfw, @nfm, @dfv, @valid)');
    //console.log(result1)
    result = Object.values(result1.rowsAffected)
    var result_f = result[0]
    var result_ff = result_f[""]
    console.log(result_f)
    //console.log(result_ff)
    //console.log(result_f[""]);

    if (result_f != 0) {
      sql.close();
      let payload = { subject: req.body._id }
      let token = jwt.sign(payload, 'secretKey')
      //console.log(token)

      res.json ({
          suc: true,
          mes: "Successfully logged in!"
      })
      //res.status(200).send({token})
      //res.status(401).send("Username or password are wrong")
    } else {
      res.json ({
          suc: false,
          mes: "Error with login!"
      })
    }
});

app.post('/password-change', async (req, res) => {
    // Change execute query to accept parameters.
    sql.close();
    var executeQuery = function(res,query,parameters){
    sql.connect(config,function(err){
        if(err){
            console.log("there is a database connection error -> "+err);
            res.send(err);
        }
        else{
            // create request object
            var request = new sql.Request();

            // Add parameters
            parameters.forEach(function(p) {
                request.input(p.name, p.sqltype, p.value);
            });

            // query to the database
            request.query(query,function(err,result){
                if(err){
                    console.log("error while querying database -> "+err);
                    res.send(err);
                }
                else{
                    res.send(result);
                    sql.close();
                }
            });
        }
    });
    }
        sql.close();

            bcrypt.hash(req.body.PASSWORD_ACC, saltRounds, async function(err, hash) {
                // Store hash in your password DB.
                console.log(hash)

                bcrypt.compare(req.body.PASSWORD_ACC, hash, function (err, result) {
                    if (err) { throw (err); }
                    console.log(result);
                    //console.log(hash)
                })

                var pass = [];
                var pool1 = await sql.connect(config);
                var pass1 = await pool1.request()
                .input('username', sql.VarChar(50), req.body.USERNAME_ACC)
                .input('password', sql.VarChar(100), hash)
                .query('UPDATE Final.ACCOUNT SET PASSWORD_ACC = @password WHERE ACCOUNT_ID = @username');
                
                pass = Object.values(pass1.rowsAffected)
                var pass_f = pass[0]

                if (pass_f !== 0) {
                    res.json ({
                        suc: true,
                        mes: "Successfully changed!"
                    })   
                } else {
                    res.json({
                        suc: false,
                        mes: "Error with changing",
                    })
                }
        });
        sql.close();
});



app.post('/proc-group', async (req, res) => {
    // Change execute query to accept parameters.
    sql.close();
    var executeQuery = function(res,query,parameters){
    sql.connect(config,function(err){
        if(err){
            console.log("there is a database connection error -> "+err);
            res.send(err);
        }
        else{
            // create request object
            var request = new sql.Request();

            // Add parameters
            parameters.forEach(function(p) {
                request.input(p.name, p.sqltype, p.value);
            });

            // query to the database
            request.query(query,function(err,result){
                if(err){
                    console.log("error while querying database -> "+err);
                    res.send(err);
                }
                else{
                    res.send(result);
                    sql.close();
                }
            });
        }
    });
    }
        sql.close();
        var pass = [];
        var pool1 = await sql.connect(config);
        var acc = await pool1.request()
        .input('username', sql.VarChar(50), req.body.USER)
        .query('SELECT ACCOUNT_ID FROM Final.ACCOUNT WHERE USERNAME_ACC = @username');

        var acc1 = Object.values(acc.recordset)
        var acc_f = acc1[0]
        var acc_ff = acc_f["ACCOUNT_ID"]
        console.log(acc_ff)


        sql.close();
        var result = [];
        var pool = await sql.connect(config);
        var res = await pool.request()
        .input('desc', sql.VarChar(50), req.body.REPORT_DESCRIPTION)
        .input('acc', sql.VarChar(50), acc_ff)
        .query('INSERT INTO Final.REPORT (REPORT_DESCRIPTION, REPORT_DATE_FORM, ACCOUNT_ID) VALUES (@desc, convert(date, getdate()), @acc)');

        pass = Object.values(res.rowsAffected)
        var pass_f = pass[0]

        if (pass_f !== 0) {
            sql.close();

            var result = [];
            var pool = await sql.connect(config);
            var result1 = await pool.request()
            .query('exec proc_group_report_create');
        } else {
        }
});


app.post('/proc-user', async (req, res) => {
    // Change execute query to accept parameters.
    sql.close();
    var executeQuery = function(res,query,parameters){
    sql.connect(config,function(err){
        if(err){
            console.log("there is a database connection error -> "+err);
            res.send(err);
        }
        else{
            // create request object
            var request = new sql.Request();

            // Add parameters
            parameters.forEach(function(p) {
                request.input(p.name, p.sqltype, p.value);
            });

            // query to the database
            request.query(query,function(err,result){
                if(err){
                    console.log("error while querying database -> "+err);
                    res.send(err);
                }
                else{
                    res.send(result);
                    sql.close();
                }
            });
        }
    });
    }
    sql.close();
    var pass = [];
    var pool1 = await sql.connect(config);
    var acc = await pool1.request()
    .input('username', sql.VarChar(50), req.body.USER)
    .query('SELECT ACCOUNT_ID FROM Final.ACCOUNT WHERE USERNAME_ACC = @username');

    var acc1 = Object.values(acc.recordset)
    var acc_f = acc1[0]
    var acc_ff = acc_f["ACCOUNT_ID"]
    console.log(acc_ff)


    sql.close();
    var result = [];
    var pool = await sql.connect(config);
    var res = await pool.request()
    .input('desc', sql.VarChar(50), req.body.REPORT_DESCRIPTION)
    .input('acc', sql.VarChar(50), acc_ff)
    .query('INSERT INTO Final.REPORT (REPORT_DESCRIPTION, REPORT_DATE_FORM, ACCOUNT_ID) VALUES (@desc, convert(date, getdate()), @acc)');

    pass = Object.values(res.rowsAffected)
    var pass_f = pass[0]

    if (pass_f !== 0) {
        sql.close();

        var result = [];
        var pool = await sql.connect(config);
        var result1 = await pool.request()
        .query('exec proc_user_report_create');

    } else {
    }
});


app.post('/signup', async (req, res) => {
    // Change execute query to accept parameters.
    sql.close();
    var executeQuery = function(res,query,parameters){
    sql.connect(config,function(err){
        if(err){
            console.log("there is a database connection error -> "+err);
            res.send(err);
        }
        else{
            // create request object
            var request = new sql.Request();

            // Add parameters
            parameters.forEach(function(p) {
                request.input(p.name, p.sqltype, p.value);
            });

            // query to the database
            request.query(query,function(err,result){
                if(err){
                    console.log("error while querying database -> "+err);
                    res.send(err);
                }
                else{
                    res.send(result);
                    sql.close();
                }
            });
        }
    });
    }
      var result = [];
      var pool = await sql.connect(config);
      var result1 = await pool.request()
      .input('username', sql.VarChar(50), req.body.USERNAME_ACC)
      .query('select count(ACCOUNT_ID) from Final.ACCOUNT where USERNAME_ACC = @username');
      result = Object.values(result1.recordset)
      var result_f = result[0]
      var result_ff = result_f[""]
      //console.log(result_f[""]);

      if (result_ff == 0) {
        sql.close();
        let payload = { subject: req.body._id }
        let token = jwt.sign(payload, 'secretKey', {expiresIn: "1 day"})

            bcrypt.hash(req.body.PASSWORD_ACC, saltRounds, async function(err, hash) {
                // Store hash in your password DB.
                console.log(hash)
                
                var pool = await sql.connect(config);
                var result1 = await pool.request()
                .input('username', sql.VarChar(50), req.body.USERNAME_ACC)
                .input('first_name', sql.VarChar(50), req.body.FIRST_NAME_ACC)
                .input('last_name', sql.VarChar(50), req.body.LAST_NAME_ACC)
                .input('email', sql.VarChar(50), req.body.EMAIL)
                .input('password', sql.VarChar(100), hash)
                .input('admin', sql.VarChar(50), 0)
                .input('gr', sql.VarChar(50), 0)
                .query('INSERT INTO Final.ACCOUNT (FIRST_NAME_ACC, LAST_NAME_ACC, EMAIL, USERNAME_ACC, PASSWORD_ACC, IS_ADMIN, GROUP_REPORT) VALUES (@first_name, @last_name, @email, @username, @password, @admin, @gr)');
                userActive = req.body.USERNAME_ACC

                bcrypt.compare(req.body.PASSWORD_ACC, hash, function (err, result) {
                    if (err) { throw (err); }
                    console.log(result);
                    //console.log(hash)
                })

                res.json ({
                    suc: true,
                    mes: "Successfully registered!", 
                    token: token
                })
                    });
        //signup_comp.componentInstance.isLogged = 1;
      } else {
        res.json({
            suc: false,
            mes: "Username already exists",
            token: null
        })
        //res.status(401).send("Username already exists!")
        //signup_comp.componentInstance.isLogged = 0;
      }
      //res.send("Hello from api/signup")
});

app.post('/login', async (req, res) => {
    // Change execute query to accept parameters.
    sql.close();
    var executeQuery = function(res,query,parameters){
    sql.connect(config,function(err){
        if(err){
            console.log("there is a database connection error -> "+err);
            res.send(err);
        }
        else{
            // create request object
            var request = new sql.Request();

            // Add parameters
            parameters.forEach(function(p) {
                request.input(p.name, p.sqltype, p.value);
            });

            // query to the database
            request.query(query,function(err,result){
                if(err){
                    console.log("error while querying database -> "+err);
                    res.send(err);
                }
                else{
                    res.send(result);
                    sql.close();
                }
            });
        }
    });

}       

        //TAKING SALT FROM DB
        sql.close();
        var pool = await sql.connect(config);
        var hash = await pool.request()
        .input('username', sql.VarChar(50), req.body.USERNAME_ACC)
        .query('select SALT from Final.ACCOUNT where USERNAME_ACC = @username');

        var salt = Object.values(hash.recordset)
        var salt_f = salt[0]
        var salt_ff = salt_f["SALT"]
        //console.log(salt_ff);

        if (salt_ff != null) {
        
            sql.close();
            var pool1 = await sql.connect(config);
            var hash1 = await pool1.request()
            .input('username', sql.VarChar(50), req.body.USERNAME_ACC)
            .query('select PASSWORD_ACC, IS_ADMIN from Final.ACCOUNT where USERNAME_ACC = @username');

            var result = Object.values(hash1.recordset)
            var result_f = result[0]
            var result_ff = result_f["PASSWORD_ACC"]
            var hashed_password = result_f["PASSWORD_ACC"]
            console.log(hashed_password)

            var admin = Object.values(hash.recordset)
            var admin_f = admin[0]
            var admin_ff = admin_f["IS_ADMIN"]
            //console.log(admin_ff);



            //UPDATE - HASHED PASSWORDS FROM REDMINE
            sql.close();
            var pool = await sql.connect(config);
            var hash = await pool.request()
            .input('password', sql.VarChar(50), req.body.PASSWORD_ACC)
            .input('sha1', sql.VarChar(50), 'SHA1')
            .query('select sys.fn_varbintohexsubstring(0, HashBytes(@sha1, @password), 1, 0)');

            var password = Object.values(hash.recordset)
            var password_f = password[0]
            var password_ff = password_f[""]
            //console.log(password_f);
            console.log(password_ff);
            

            //SALTED STRING
            var saltedValue = salt_ff+password_ff;
            console.log(saltedValue);



            //FINAL HASH
            sql.close();
            var pool2 = await sql.connect(config);
            var hash2 = await pool2.request()
            .input('password', sql.VarChar(500), saltedValue)
            .input('sha1', sql.VarChar(50), 'SHA1')
            .query('select sys.fn_varbintohexsubstring(0, HashBytes(@sha1, @password), 1, 0)');

            var hashed_pass = Object.values(hash2.recordset)
            var hashed_pass_f = hashed_pass[0]
            var hashed_pass_ff = hashed_pass_f[""]
            //console.log(hashed_pass_ff)
            console.log(Object.values(hash2.recordset))

            if (hashed_pass_ff == hashed_password) {
                sql.close();
                let payload = { subject: req.body._id }
                let token = jwt.sign(payload, 'secretKey', {expiresIn: "1 day"})
                userActive = req.body.USERNAME_ACC

                res.json ({
                    suc: true,
                    uname: req.body.USERNAME_ACC,
                    mes: "Successfully logged in!",
                    token: token,
                    admin: admin_ff
                })
            } else {
                sql.close();
                res.json ({
                    suc: false,
                    uname: null,
                    mes: "Error!",
                    token: null,
                    admin: admin_ff
                })
            }

        } else {
            sql.close();
            var pool1 = await sql.connect(config);
            var hash1 = await pool1.request()
            .input('username', sql.VarChar(50), req.body.USERNAME_ACC)
            .query('select PASSWORD_ACC, IS_ADMIN from Final.ACCOUNT where USERNAME_ACC = @username');

            var result = Object.values(hash1.recordset)
            var result_f = result[0]
            var result_ff = result_f["PASSWORD_ACC"]

            var admin = Object.values(hash1.recordset)
            var admin_f = admin[0]
            var admin_ff = admin_f["IS_ADMIN"]


    
            var pass = false;
            bcrypt.compare(req.body.PASSWORD_ACC, result_ff, async function (err, result) {
                pass = true;
                //console.log(req.body.PASSWORD_ACC)
                //console.log(result_ff)
                //console.log(admin_ff)
                if (err) { throw (err); }
                console.log(result);
                if (result) {
                    //console.log("Uspesno!")
                    sql.close();
                    let payload = { subject: req.body._id }
                    let token = jwt.sign(payload, 'secretKey', {expiresIn: "1 day"})
                    userActive = req.body.USERNAME_ACC
                    //console.log(token)

                    res.json ({
                        suc: true,
                        uname: req.body.USERNAME_ACC,
                        mes: "Successfully logged in!",
                        token: token,
                        admin: admin_ff
                    })
                } else {
                    sql.close();
                    res.json ({
                        suc: false,
                        uname: null,
                        mes: "Error!",
                        token: null,
                        admin: admin_ff
                    })
                }
                //console.log(hash)
            })
        }


});
      


var server = app.listen(5000, function () {
    console.log('Server is running..');
});

module.exports = server
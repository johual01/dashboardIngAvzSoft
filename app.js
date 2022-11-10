const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const path = require('path')

const app = express()

app.use("/", express.static(__dirname, {index: "pages/dashboard.html"}));

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

const con = mysql.createConnection({
    host            : 'liseydb.cylbfgjnqcgt.us-east-2.rds.amazonaws.com',
    port            : 3306,
    user            : 'admin',
    password        : 'IngeAvan2022.2',
    database        : 'LISEY'
})

const pool = mysql.createPool({
    host            : 'liseydb.cylbfgjnqcgt.us-east-2.rds.amazonaws.com',
    port            : 3306,
    user            : 'admin',
    password        : 'IngeAvan2022.2',
    database        : 'LISEY'
})

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to database!");
  }
);

app.post('/getData', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)
        const query = req.body.query
        connection.query(query, (err, rows) => {
            connection.release()
            if(!err) {
                res.json({
                    error:'SIN_ERROR',
                    datos: rows
                })
            } else {
                console.log(err)
                res.json({
                    error:'ERROR',
                    descripcion: err
                })
            }

        })
    })
})

app.post('/delete', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)
        const where = req.body.sql
        connection.query(where, (err, rows) => {
            connection.release()

            if(!err) {
                res.json({
                    error:'SIN_ERROR',
                    description:`Se elimino correctamente el dato en la tabla.`
                })
            } else {
                console.log(err)
                res.json({
                    error:'ERROR',
                    descripcion: err
                })
            }

        })
    })
})

app.post('/insert', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)
        const params = req.body.params
        connection.query(params , (err, rows) => {
            connection.release() 
            if(!err) {
                res.json({
                    error:'SIN_ERROR',
                    descripcion:`Se inserto correctamente los datos en la tabla.`
                })
            } else {
                console.log(err)
                res.json({
                    error:'ERROR',
                    descripcion: err
                })
            }
        })
        console.log(req.body);
    })
})

app.post('/update', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)
        const params =  req.body.params
        connection.query(params, (err, rows) => {
            connection.release() 
            if(!err) {
                res.json({
                    error:'SIN_ERROR',
                    descripcion:`Se actualizo correctamente`
                })
            } else {
                console.log(err)
                res.json({
                    error:'ERROR',
                    descripcion: err
                })
            }
        })
        console.log(req.body)
    })
})

app.listen(5000, () => console.log(`Listen on port 5000`))
const express = require('express')
const pg = require('pg')
const app = express()

const pool = new pg.Pool({
    user: 'taskmanager',
    host: 'localhost',
    database: 'taskmanager',
    password: 'test123',
    port: 5433,
  })

//middlewares
app.use(express.json())


// methods
 app.get('/', (req, res)=>{
     pool.query('SELECT * FROM taskdata', (err, result)=>{
         if(err){
             throw err
         }
         res.status(200).json(result.rows);
         
     })
 })

  app.post("/", (req, res) => {
    const name = req.body;
  
    pool.query(
      "INSERT INTO taskdata (name) VALUES ($1)",
      [name],
      (err, results) => {
        if (err) {
          throw err
        }
  
        res.sendStatus(201)
        
      }
    )
  })
app.get('/:id', (req, res)=>{
    const {id}=req.params
    pool.query("SELECT * FROM taskdata where id=$1", [id], (err, result)=>{
        if(err){
            throw err
        }
      res.status(200).json(result.rows)
    })
})

app.put('/:id', (req, res)=>{
    const {id} = req.params
    const {name}= req.body

    pool.query("UPDATE taskdata SET name = $1 where id=$2", [name, id], (err, result)=>{
        if(err){
            throw err
        }
       res.sendStatus(200)
    })
})

app.listen(3000, (err, res)=>{
    if(!err){
        console.log('Server is listening on port 3000')
    }
    console.log(err)
})
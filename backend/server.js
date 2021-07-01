const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;
const knex = require('knex')(require('./knexfile.js')['development']);

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(express.json());

app.get('/', (req, res) => {
    console.log('the server was successfully hit')
    res.send('you hit the server')
})

app.get('/todo', function(req, res) {
  knex
    .select('*')
    .from('todolist')
    .orderBy('id')
    .then(data => res.status(200).json(data))
    .catch(err =>
      res.status(404).json({
        message:
          'The data you are looking for could not be found. Please try again'
      })
    );
});

app.post('/updateList', async (req, res) => {

    // {"todoitem" : "fefe"}

    console.log("user tried to add ",  req.body)

    await knex.insert(req.body).into('todolist')

    res.send('you tried to make a post')
})

app.post('/removeItem', async (req, res)=>{

    // DELETE FROM table_name WHERE condition;
    
   
    
    await knex('todolist').where('id', req.body.id ).del()

    console.log('user tried to remove an item from the database')
    console.log(`trying to delete ${req.body.id}`)
    res.send('you tried to remove an item')
})

app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});
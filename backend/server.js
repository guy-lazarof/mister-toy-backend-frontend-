const express = require('express')
const cors = require('cors')
const app = express()
const toyService = require('./services/toy.service.js')

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'public')))
} else {
  const corsOptions = {
    origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
    credentials: true
  }
  app.use(cors(corsOptions))
}


app.use(express.json())

//list
app.get('/api/toy', (req, res) => {
  const filterBy = req.params
  toyService.query(filterBy)
    .then((toys) => {
      res.send(toys)
    }).catch((err) => {
      console.log('Had issues getting toys', err);
      res.status(400).send({ msg: 'Had issues getting toys' })
    });
})

app.get('/api/toy/:toyId', (req, res) => {
  const { toyId } = req.params

  toyService.get(toyId)
    .then(toy => {
      res.send(toy)
    })
    .catch(err => {
      console.log('Had issues getting toy', err);
      res.status(400).send({ msg: 'Had issues getting toy' })
    })
})

app.put('/api/toy', (req, res) => {
  const toy = req.body

  toyService.save(toy)
    .then((savedToy) => {
      res.send(savedToy)
    })
    .catch(err => {
      console.log('Error:', err)
      res.status(400).send('Cannot update toy')
    })
})

/// create 
app.post('/api/toy', (req, res) => {
  const toy = req.body
  toyService.save(toy)
    .then((savedToy) => {
      res.send(savedToy)
    })
    .catch(err => {
      console.log('Error:', err)
      res.status(400).send('Cannot create toy')
    })
})

app.delete('/api/toy/:id', (req, res) => {
  const toyId = req.params.id
  toyService.remove(toyId)
    .then(() => {
      res.end('Done!')
    })
    .catch(err => {
      console.log('Had issues deleting toy', err);
      res.status(400).send({ msg: 'Had issues deleteing toy' })
    })
})

app.get('/**', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const port = process.env.PORT || 3030;

app.listen(port, () => {
  console.log(`App listening on port ${port}!`)
})
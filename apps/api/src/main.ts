import express from 'express';
import bodyParser from 'body-parser';
import * as db from './queries';
import cors from 'cors'

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.use(cors({
  origin: 'http://localhost:4200'
}));

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/notes', db.getNotes)
app.get('/notes/:id', db.getNoteById)
app.post('/notes', db.addNote)
app.put('/notes/:id', db.updateNote)
app.delete('/notes/:id', db.deleteNote)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
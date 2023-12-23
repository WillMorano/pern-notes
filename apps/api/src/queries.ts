import {Pool} from 'pg'

const pool = new Pool({
    user: 'admin',
    host: 'localhost',
    database: 'pernnotes',
    password: 'admin',
    port: 5432,
})

export const addNote = (request, response) => {
    const {title, body, date, time} = request.body.newNote
    pool.query('INSERT INTO notes (title, body, date, time) VALUES ($1, $2, $3, $4) RETURNING id', [title, body, date, time], (error, id) => {
        if(error) {
            response.status(204).send({ response: "NO CONTENT"})
        }
        else {
            response.status(200).send({ response: "OK", data: id.rows[0].id})
        }
    })
}

export const deleteNote = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM notes WHERE id = $1', [id], (error) => {
        if (error) {
            response.status(204).send(`NO CONTENT`)
        }
        else {
            response.status(200).send(`OK`)
        }
        
    })
}

export const getNotes = (request, response) => {
    pool.query('SELECT * FROM notes', (error, results) => {
        if (error) {
            response.status(404).send(`NOT FOUND`)
        }
        else {
            response.status(200).json({status: "OK", data: results.rows})
        }
    })
}

export const updateNote = (request, response) => {
    const id = parseInt(request.params.id)
    const { title, body, date, time } = request.body
    pool.query(
        'UPDATE notes SET title = $1, body = $2, date = $3, time = $4 WHERE id = $5 RETURNING *',
        [title, body, date, time, id],
        (error, data) => {
        if (error) {
            response.status(202).send({status: "ERR"})
        }
        else {
            response.status(200).send({status: 'OK', note: data.rows[0]})
        }
        
        }
    )
}
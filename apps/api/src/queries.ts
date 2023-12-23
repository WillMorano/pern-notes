import {Pool} from 'pg'

const pool = new Pool({
    user: 'admin',
    host: 'localhost',
    database: 'pernnotes',
    password: 'admin',
    port: 5432,
})

export const addNote = (request, response) => {
    const {title, note, date} = request.body
    pool.query('INSERT INTO notes (title, body, date) VALUES ($1, $2, $3)', [title, note, date], (error) => {
        if(error) {
            response.status(204).send("NO CONTENT")
        }
        else {
            response.status(200).send('OK')
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

export const getNoteById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM notes WHERE id = $1', [id], (error, results) => {
        if (error) {
            response.status(404).send(`NOT FOUND`)
        }
        else {
            response.status(200).json({status: "OK", data: results.rows})
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
    const { title, note, date } = request.body

    pool.query(
        'UPDATE notes SET title = $1 body = $2, date = $3 WHERE id = $4',
        [title, note, date, id],
        (error) => {
        if (error) {
            throw error
        }
        response.status(200).send('OK')
        }
    )
}
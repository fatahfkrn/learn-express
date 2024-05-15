const express = require('express');
const app = express();
const PORT = 8000;
const database = require('./database');

//Middleware
//Buat ambil data .json
app.use(express.json());

//buat menangani data dari browser
app.use(express.urlencoded({ extended: true }));

//Route Localhost
app.get('/', (req, res) => {
    res.json({
        message: 'keren'
    })
})

//Route User (GET)
app.get('/api/users', (req, res) => {
    database.query(`SELECT * FROM users`, (err, results) => {
        if (err) {
            res.status(500).json({error: "Error !"});
            throw err;
        }
        console.log(results);
        res.json({results});
    })
});


//Menambahkan data user (POST)
app.post('/api/users', (req, res) => {
    const {name, email, password} = req.body;
    if(!name || !email || !password) {
        return res.status(400).json({error: 'Semua field harus diisi'});
    }
    res.json({
        name: name,
        email: email,
        password: password,
        message: 'User berhasil ditambahkan'
    });
});

//Untuk mengubah data user (PUT)
app.put('/api/users/:id', (req, res) => {
    const {id} = req.params;
    const {name, email, password} = req.body;
    if(!id ||!name || !email || !password) {
        return res.status(400).json({error: 'Semua field harus diisi'});
    }
    res.json({
        message: 'Data user dengan ID ' + id + " telah diupdate",
        name: name,
        email: email,
        password: password
    });
});

//Untuk menghapus data user (DELETE)
app.delete('/api/users/:id', (req, res) => {
    const {id} = req.params;
    if(!id) {
        return res.status(400).json({error: 'Semua isi field ID user'});
    }
    res.json({
        message: 'Data user dengan ID ' + id + " telah dihapus"
    });
});

//Untuk cara mendapatkan data user by ID
app.get('/api/users/:id', (req, res) => {
    const {id} = req.params;
    if(!id) {
        return res.status(400).json({error: 'Semua isi field ID user'});
    }
    res.json({
        data: {
            name: "Aichi",
            email: "aichi@gmail.com",
            password: "password"
        }
    });
});

app.listen(PORT, () =>
    console.log('Server is running on http://localhost:' + PORT)
);
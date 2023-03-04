const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const yamlJs = require('yamljs');
const swaggerDocument = yamlJs.load('./swagger.yaml');

require('dotenv').config();

const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static('public'));

// Use the Swagger UI
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware to parse JSON
app.use(express.json());

// General error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    const status = err.statusCode || 500;
    res.status(status).send(err.message);
});

app.post('/users', (req, res) => {
    const { email, password } = req.body;
    const user = { email, password };

    connection.query('INSERT INTO users SET ?', user, (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error creating user');
        } else {
            console.log(results);
            res.status(201).send('User created');
        }
    });
});

app.listen(port, () => {
    const connection = mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'mydatabase',
    });

    connection.connect((err) => {
        if (err) throw err;
        console.log('Connected to MySQL database');
    });

    console.log(`App running. Docs at http://localhost:${port}/docs`);
});
const config = require('config');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./logger');
const morgan = require('morgan');
const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(helmet());

// configuration
// console.log('Application name ', config.get('name'));
// console.log('Mail server', config.get('mail.host'));
// console.log('Mail password', config.get('mail.password'));

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan enable', );
}

app.use(logger);

const courses = [
    {id: 1, name: 'courses1'},
    {id: 2, name: 'courses2'},
    {id: 3, name: 'courses3'}
];

app.get('/', (req, res) => {
    res.render('index', {title: 'My Express App', message: 'Hello!'});
    // res.send('Hello world');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.post('/api/courses', ((req, res) => {
    const schema = {
      name: Joi.string()  
    };
    
    if (!req.body.name || req.body.name.length < 3) {
        res.status(400).send('Name is require and should be minimum 3 charter');
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
}));

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(a => a.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with ID was not found!');
    res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () =>
    console.log('Listening port', port)
);
 


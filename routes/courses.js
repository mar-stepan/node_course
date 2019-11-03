const express = require('express');
const router = express.Router();
const Joi = require('joi');

const courses = [
    {id: 1, name: 'courses1'},
    {id: 2, name: 'courses2'},
    {id: 3, name: 'courses3'}
];

router.get('/', (req, res) => {
    res.send(courses);
});
router.post('/', ((req, res) => {
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
}));

router.put('/:id', ((req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The courses with the given in dont have');
    
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    course.name = req.body.name;
    res.send(course);
}));

router.delete('/:id', ((req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The courses with the given in dont have');
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
}));
router.get('/:id', (req, res) => {
    const course = courses.find(a => a.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with ID was not found!');
    res.send(course);
});

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).require()
    };
    
    return Joi.validate(course, schema);
}

module.exports = router;

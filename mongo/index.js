const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Could not connect to MongoDB', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        author: 'Stepan',
        tags: ['angular', 'frontend'],
        isPublished: true
    });
    const result = await course.save();
    console.log('', result);
}
// createCourse().then();

// show only select value, sort from bigger to lowest price, show array that or that
async function f() {
    const courses = await Course
        .find({isPublished: true})
        .or([{tags: 'frontend'}, {tags: 'backend'}])
        .sort('-price')
        .select('name author price');
    console.log('', courses);
}
// f().then();

// search word includes by in name and price greater than 15
async function b() {
    const courses = await Course
        .find({isPublished: true})
        .or([
            {price: {$gte: 15}},
            {name: /.*by.*/i}
        ])
        .sort('-price')
        .select('name author price');
    console.log('', courses);
}
// b().then();

async function getCourses() {
    const pageNumber = 2;
    const pageSize = 10;


    const courses = await Course
        .find({author: 'Stepan', isPublished: true})
        .skip((pageNumber -1) * pageSize)
        .limit(pageSize)
        .sort({name: 1})
        .select({name: 1, tags: 1});

    console.log('Courses', courses);
}
// getCourses().then();


// update by findById
// async function updateCourse(id) {
//     const course = await Course.findById(id);
//     if (!course) return;
//    
//     course.isPublished = true;
//     course.author = 'Another Author';
//  
//     const result = await course.save();
//     console.log('result', result);
// }


// update, findAndUpdate
async function updateCourse(id) {
    const result = await Course.update({_id: id}, {
        $set: {
            author: 'Stepan',
            isPublished: false
        }
    });
    // const result = await Course.findByIdAndUpdate(id, {
    //     $set: {
    //         author: 'Jason',
    //         isPublished: true
    //     }
    // }, {new: true});
    console.log('result', result);
}
// updateCourse('5dc3279a0e27bb299497fa59').then();


async function removeCourse(id) {
    // const result = await Course.deleteOne({_id: id});
    const result = await Course.deleteMany({_id: id});
    const q = Course.findByIdAndRemove(id);
    console.log('', result);
}
// removeCourse('5dc3279a0e27bb299497fa59').then();

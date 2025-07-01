const db= require('../db');

//Get all students
exports.getAllStudents= async(req, res)=> {
    const result= await db.query('SELECT * FROM students ORDER BY id');
    res.json(result.rows);
};

//Get student by ID

exports.getStudentById= async (req, res) => {
    const result= await db.query('SELECT * FROM students WHERE id= $1', [req.params.id]);
    res.json(result.rows[0]);
};

//Create new student
exports.createStudent= async (req, res) => {
    const { name, email, course, dob}= req.body;
    const result= await db.query(
    'INSERT INTO students (name, email, course, dob) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, email, course, dob],
    );
    res.status(201).json(result.rows[0]);
};

//Update student

exports.updateStudent= async (req, res)=> {
    const { name, email, course, dob}= req.body;
    const result= await db.query(
        'UPDATE students SET name= $1, email= $2, course= $3, dob= $4 WHERE id= $5 RETURNING *',
        [name, email, course, dob, req.params.id]
        );
        res.json(result.rows[0]);
        };


// Delete student

exports.deleteStudent= async (req, res)=> {
    await db.query('DELETE FROM students WHERE id= $1', [req.params.id]);
    res.status(204).send();
};


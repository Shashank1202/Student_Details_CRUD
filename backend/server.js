const express= require('express');
const cors= require('cors');
require('dotenv').config();


const studentRoutes= require('./routes/student.routes');

const app= express();
app.use(cors());
app.use(express.json());

app.use('/api/students', studentRoutes);

const PORT= process.env.PORT || 5000;

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
});
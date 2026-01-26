const request = require('supertest');
const express = require('express');
const app = express();
const empRoutes = require('../routes/employees');

app.use(express.json());
app.use('/employees', empRoutes);

describe('To check the employees data', () => {

    let createdId;
    
    it('should return all employees', async () => {
        const res = await request(app).get('/employees');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('should create a new employee', async () => {
        const newEmployee = { firstname: 'Jane', lastname: 'Doe' };
        const res = await request(app).post('/employees').send(newEmployee);
        expect(res.statusCode).toEqual(201);
        
        const lastEmployee = res.body[res.body.length - 1];
        createdId = lastEmployee.id; // Store the ID for the next tests
        expect(createdId).toBeDefined();
    });

    it('should update given employee', async () => {
        const updateData = { firstname: 'Jane', lastname: 'Smith' };
        const res = await request(app).put(`/employees/${createdId}`).send(updateData);
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);

        const updatedEmployee = res.body.find((emp) => emp.id === createdId);
        expect(updatedEmployee.lastname).toBe("Smith");
    });

    it('should delete given employee', async () => {
        const res = await request(app).delete(`/employees/${createdId}`);
        expect(res.statusCode).toEqual(200);

        const exists = res.body.some(person => person.id === createdId);
        expect(exists).toBe(false);
    });

});
const request = require('supertest');
const express = require('express');
const app = express();
const empRoutes = require('../routes/employees');

app.use(express.json());
app.use('/employees', empRoutes);

describe('To check the employees data', () => {
    
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
        expect(lastEmployee).toMatchObject(newEmployee);
        expect(lastEmployee).toHaveProperty('id');
    });

});
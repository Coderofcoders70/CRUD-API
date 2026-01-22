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

});
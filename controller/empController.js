const data = {
    employees: require('../model/employees.json'),
    setEmployees: function (data) { this.employees = data }
}

const getAllEmployees = (req, res) => {
    res.json(data.employees);
}

const getEmployeeId = (req, res) => {
    const employee = data.employees.find((emp) => emp.id === parseInt(req.params.id));
    if (!employee) {
        res.status(400).json({ 'message': `Given Employee ${req.params.id} not found` });
    }
    res.json(employee);
};

module.exports = {
    getAllEmployees,
    getEmployeeId
}
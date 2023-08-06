// Function to create an employee record
const createEmployeeRecord = (employeeInfo) => {
    return {
      firstName: employeeInfo[0],
      familyName: employeeInfo[1],
      title: employeeInfo[2],
      payPerHour: employeeInfo[3],
      timeInEvents: [],
      timeOutEvents: [],
    };
  };
  
  // Function to create employee records from an array of arrays
  const createEmployeeRecords = (employeesArray) => {
    return employeesArray.map((employee) => createEmployeeRecord(employee));
  };
  
  // Function to add a time-in event to an employee record
  const createTimeInEvent = function (dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    this.timeInEvents.push({
      type: 'TimeIn',
      hour: parseInt(hour, 10),
      date,
    });
    return this;
  };
  
  // Function to add a time-out event to an employee record
  const createTimeOutEvent = function (dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    this.timeOutEvents.push({
      type: 'TimeOut',
      hour: parseInt(hour, 10),
      date,
    });
    return this;
  };
  
  // Function to calculate hours worked on a specific date for an employee
  const hoursWorkedOnDate = function (date) {
    const timeInEvent = this.timeInEvents.find((event) => event.date === date);
    const timeOutEvent = this.timeOutEvents.find((event) => event.date === date);
    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
    return hoursWorked;
  };
  
  // Function to calculate wages earned on a specific date for an employee
  const wagesEarnedOnDate = function (date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour;
  };
  
  // Function to find an employee by first name from an array of employee records
  const findEmployeeByFirstName = function (srcArray, firstName) {
    return srcArray.find((employee) => employee.firstName === firstName);
  };
  
  // Function to calculate the total pay owed to an employee for all dates
  const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map((e) => e.date);
    const payable = eligibleDates.reduce((memo, date) => memo + wagesEarnedOnDate.call(this, date), 0);
    return payable;
  };
  
  // Function to calculate the total pay owed for all employees for all dates
  const calculatePayroll = function (employeeRecords) {
    return employeeRecords.reduce((totalPay, employee) => totalPay + allWagesFor.call(employee), 0);
  };
  
  module.exports = {
    createEmployeeRecord,
    createEmployeeRecords,
    createTimeInEvent,
    createTimeOutEvent,
    hoursWorkedOnDate,
    wagesEarnedOnDate,
    findEmployeeByFirstName,
    calculatePayroll,
  };
  
// Your code here
function createEmployeeRecord (line){
    return { firstName: line[0],
        familyName: line[1], 
        title: line[2],
        payPerHour: line[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords (employeeInfo) {
    return employeeInfo.map(function(line){
        return createEmployeeRecord(line)
})}

 function createTimeInEvent (worker, workHours){
    let [date, hour] = workHours.split(' ')

    worker.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return worker
}

 function createTimeOutEvent (worker, workHours){
    let [date, hour] = workHours.split(' ')

    worker.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return worker
}

function hoursWorkedOnDate (worker, workDate){
    let inEvent = worker.timeInEvents.find(function(e){
        return e.date === workDate
    })

    let outEvent = worker.timeOutEvents.find(function(e){
        return e.date === workDate
    })
     let sumEvent =  outEvent.hour - inEvent.hour   
    return sumEvent / 100
}

function wagesEarnedOnDate (worker, dateWorked){
    let rawWage = hoursWorkedOnDate(worker, dateWorked)
        * worker.payPerHour
    return parseFloat(rawWage.toString())
}

function allWagesFor(worker){
    let workDates = worker.timeInEvents.map(function(e){
        return e.date
    })

    let payOwed = workDates.reduce(function(note, date){
        return note + wagesEarnedOnDate(worker, date)
    }, 0)

    return payOwed
}

function calculatePayroll (arrayOfworkerInfo){
    return arrayOfworkerInfo.reduce(function(note, info){
        return note + allWagesFor(info)
    }, 0)
}
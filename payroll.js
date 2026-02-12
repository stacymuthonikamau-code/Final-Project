//list of  all salaries
const salaryData = {
    Health: {
        "MO Intern": [68000, 100000],
        "Medical Officer": [206000, 413000],
        "Senior Consultant": [1400000, 1400000],
        "CO Intern": [27000, 35000],
        "Clinical Officer": [35000, 150000],
        "Senior CO/Specialist": [150000, 338000],
        "Nursing Officer Intern": [35000, 50000],
        "Enrolled nurse III (JG G)": [22000, 30000],
        "Registered nurse III (JG H)": [39000, 45000],
        "Senior/Chief Registered nurse(JG L-M)": [50000, 60000],
        "Senior principal nurse(JG P)": [85000, 120000],
        "Community Health Ass. worker": [26900, 45000],
        "Public Health Officer": [35000, 120000],
        "Epidemiologist/Disease Serveillance Officer": [90000, 200000],
        "Medical Laboratory Technologist": [30000, 60000],
        "Health Records & Information Officer": [40000, 60000],
        "Health Administrator": [117000, 173000],
        "Accountant (Health Department)": [413000, 617000],
        "Mortuary Attendants/Technicians": [20000, 40000]
    },
    Education: {
        "Primary School Teacher": [20000, 40000],
        "Secondary School Teacher": [30000, 60000],
        "University Lecturer": [60000, 120000],
        "Education Officer": [50000, 90000],
        "Quality Assurance Officer": [40000, 80000],
        "Curriculum Development Officer": [50000, 100000],
        "Chief Principal": [70000, 150000],
        "Director of Education": [120000, 250000],
        "Researcher": [80000, 150000],
        "Administrative Staff": [25000, 45000]
    }
};

//get elementd from pay.html
const ministrySelect = document.getElementById('ministrySelect');
const positionSelect = document.getElementById('positionSelect');
const salaryOutput = document.getElementById('salaryOutput');
const hoursWorkedSelect = document.getElementById('hoursWorked');
const hoursAllowanceOutput = document.getElementById('hoursAllowanceOutput');

const grossPayOutput = document.getElementById('grossPayOutput');

// Update positions when ministry changes
ministrySelect.addEventListener('change', () => {
    const ministry = ministrySelect.value;
    positionSelect.innerHTML = '<option value="" disabled selected>Select Position</option>'; //clear all old jobs
    Object.keys(salaryData[ministry]).forEach(pos => { //for all jobs in the object...
        const option = document.createElement('option'); //make new element 4 me 
        option.value = pos; //sets value of option
        option.textContent = pos; //sets what is the value in my dropdown
        positionSelect.appendChild(option); //adds option to dropdown
    });
    salaryOutput.textContent = 'Your salary will appear here.'; //reset salary display
    grossPayOutput.textContent = ''; //clears gross pay display
});

// Show salary when position is selected
positionSelect.addEventListener('change', () => {
    const ministry = ministrySelect.value;
    const position = positionSelect.value;
    if(ministry && position) { //if they exist...
        const [minSalary, maxSalary] = salaryData[ministry][position]; // read what is on my object
        salaryOutput.textContent = `Salary Range: KES ${minSalary.toLocaleString()} - KES ${maxSalary.toLocaleString()}`; //show my range please
        grossPayOutput.textContent = ''; //clear gross pay 4 me
    }
});

//input hours
function getHoursAllowance(hoursRange) {
    switch (hoursRange) {
        case "130-159":
            return 5000; // give 5k
        case "160-179":
            return 10000; //give 10k
        case "180+":
            return 20000; //give 20k
        default:
            return 0; //if anything else 0
    }
}
// Calculate gross pay with allowance
document.getElementById('calculateBtn').addEventListener('click', () => {
    const ministry = ministrySelect.value;
    const position = positionSelect.value;
    const hoursRange = hoursWorkedSelect.value;

    if (ministry && position && hoursRange) {

        const [minSalary, maxSalary] = salaryData[ministry][position];//get range from object

        const hoursAllowance = getHoursAllowance(hoursRange);//get allowance from above

        hoursAllowanceOutput.textContent = //show me my allowance
            `Hours Allowance: KES ${hoursAllowance.toLocaleString()}`;

        const grossMin = minSalary + hoursAllowance;//add to min
        const grossMax = maxSalary + hoursAllowance;//add to max

        grossPayOutput.textContent =
            `Gross Pay: KES ${grossMin.toLocaleString()} - KES ${grossMax.toLocaleString()}`;//show result

    } else {
        alert('Please select ministry, position and hours worked.');//if u dont write anything
    }
});

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

const ministrySelect = document.getElementById('ministrySelect');
const positionSelect = document.getElementById('positionSelect');
const salaryOutput = document.getElementById('salaryOutput');
const allowanceInput = document.getElementById('allowance');
const grossPayOutput = document.getElementById('grossPayOutput');

// Update positions when ministry changes
ministrySelect.addEventListener('change', () => {
    const ministry = ministrySelect.value;
    positionSelect.innerHTML = '<option value="" disabled selected>Select Position</option>';
    Object.keys(salaryData[ministry]).forEach(pos => {
        const option = document.createElement('option');
        option.value = pos;
        option.textContent = pos;
        positionSelect.appendChild(option);
    });
    salaryOutput.textContent = 'Your salary will appear here.';
    grossPayOutput.textContent = '';
});

// Show salary when position is selected
positionSelect.addEventListener('change', () => {
    const ministry = ministrySelect.value;
    const position = positionSelect.value;
    if(ministry && position) {
        const [minSalary, maxSalary] = salaryData[ministry][position];
        salaryOutput.textContent = `Salary Range: KES ${minSalary.toLocaleString()} - KES ${maxSalary.toLocaleString()}`;
        grossPayOutput.textContent = '';
    }
});

// Calculate gross pay with allowance
document.getElementById('calculateBtn').addEventListener('click', () => {
    const ministry = ministrySelect.value;
    const position = positionSelect.value;
    const allowance = parseFloat(allowanceInput.value) || 0;
    if(ministry && position) {
        const [minSalary, maxSalary] = salaryData[ministry][position];
        const grossMin = minSalary + allowance;
        const grossMax = maxSalary + allowance;
        grossPayOutput.textContent = `Gross Pay with Allowance: KES ${grossMin.toLocaleString()} - KES ${grossMax.toLocaleString()}`;
    } else {
        alert('Please select both ministry and position.');
    }
});

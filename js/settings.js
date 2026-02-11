//book
function Employee(fname, mname, sname, email, ministry, specificjob, facility, county, institution, position) {
    this.id = Date.now();
    this.fullname = `${fname} ${mname} ${sname}`;
    this.email = email;
    this.ministry = ministry;
    this.job = specificjob;
    this.facility = facility;
    this.location = county;
    this.institution = institution;
    this.position = position;
}

//library
function Allemployees() {
    const saved = JSON.parse(localStorage.getItem('employees')) || [];
    this.person = new Map(saved.map(emp => [emp.id, emp]));
    this.render();
}

//c
Allemployees.prototype.addPerson = function(create) {
    this.person.set(create.id, create);
    this.save();
    this.render();
}

// save to localStorage whenever we add or delete
Allemployees.prototype.save = function() {
    const arr = Array.from(this.person.values());
    localStorage.setItem('employees', JSON.stringify(arr));
}

// create a method to load employees from storage
Allemployees.prototype.load = function() {
    const data = JSON.parse(localStorage.getItem('employees')) || [];
    data.forEach(empData => {
        this.person.set(empData.id, empData);
    });
    this.render();
}

//u
Allemployees.prototype.deletePerson = function(id) {
    this.person.delete(id);
    this.save();
    this.render();
}

//r
Allemployees.prototype.render = function() {
    let r = document.getElementById('employees');
    if (!r) return;
    r.innerHTML = '';
    this.person.forEach(create => {
        let l = document.createElement('li');
        l.dataset.id = create.id;
        l.innerHTML = `
            <strong>${create.fullname}</strong><br>
            Email: ${create.email}<br>
            Ministry: ${create.ministry}<br>
            Job: ${create.job}<br>
            Facility: ${create.facility}<br>
            Position: ${create.position}<br>
            Institution: ${create.institution}<br>
            Location: ${create.location}
        `;
        r.appendChild(l);
    });
}

//initialise
let person1 = new Allemployees();
person1.load();

//the button
let a = document.getElementById('form');
a.addEventListener('submit', function(event) {
    event.preventDefault();
    if (!confirm('Do you want to add employee?')) return;

    let fname = document.getElementById('fname').value;
    let mname = document.getElementById('mname').value;
    let sname = document.getElementById('sname').value;
    let email = document.getElementById('email').value;
    let ministry = document.getElementById('ministry').value;
// choose correct job based on ministry
    let specificjob = ministry === 'Health' 
        ? document.getElementById('hpositions').value 
        : document.getElementById('epositions').value;

    let facility = document.getElementById('facility').value;
    let county = document.getElementById('county').value;
    let inst = document.getElementById('inst').value;
    let position = ministry === 'Health' ? document.getElementById('hpositions').value : document.getElementById('epositions').value;

    let final = new Employee(
        fname, mname, sname, email, ministry, specificjob,
        facility, county, inst, position
    );

    person1.addPerson(final);
    a.reset();

    alert('Employee added! You can view the profile page now.');
});

// book
function Employee(fname, mname, sname, email, ministry, specificjob, facility, location, institution, position){
    this.id = Date.now();
    this.fullname = `${fname} ${mname} ${sname}`;
    this.email = email;
    this.ministry = ministry;
    this.job = specificjob = ministry === 'Health' ? hpositions : epositions;
    this.facility = facility;
    this.location = location;
    this.position = position;
    this.institution = institution;
}

//library
function Allemployees(){
    const saved = JSON.parse(localStorage.getItem('employeeData')) || [];
    this.person = new Map(saved.map(emp => [emp.id, emp]));
    this.render();
}

//c
Allemployees.prototype.addPerson = function(create){
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


//d
Allemployees.prototype.deletePerson = function(id){
    this.person.delete(id);
    this.save();
    this.render();
}

//u
Allemployees.prototype.updatePerson = function(id){
    this.person.get(id);
    this.render();
}

//r
Allemployees.prototype.render = function(id){
    let r = document.getElementById('employees');
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

//initailise
let person1 = new Allemployees();
person1.load();

//the button
let a = document.getElementById('form');
a.addEventListener('submit', function(event){
    event.preventDefault();
    if (!confirm('Do you want to add employee?')) return;
    let t1 = document.getElementById('fname');
    let t2 = document.getElementById('mname');
    let t3 = document.getElementById('sname');
    let t4 = document.getElementById('email');
    let t5 = document.getElementById('ministry');
    let t6 = document.getElementById('hpositions');
    let t7 = document.getElementById('facility');
    let t8 = document.getElementById('epositions');
    let t9 = document.getElementById('inst');
    let t10 = document.getElementById('county');
    let final = new Employee(t1.value, t2.value, t3.value, t4.value, t5.value, t6.value, t7.value, t8.value, t9.value, t10.value);
    person1.addPerson(final);
    a.reset();

    alert('Employee added! You can view the profile page now.');
});
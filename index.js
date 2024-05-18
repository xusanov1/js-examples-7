const addNewStudentBtn = document.querySelector("#add-student");
const addStudentForm = document.querySelector("#student-form");
const studentList = document.querySelector("#student-list");
const form = document.querySelector("#student-form");
const nameInput = document.querySelector("#name");
const surnameInput = document.querySelector("#surname");
const ageInput = document.querySelector("#age");

const addStudent = () => {
  addStudentForm.classList.add("show");
  
}

form.addEventListener('submit', (event) => {
  event.preventDefault()

  const name = nameInput.value;
  const surname = surnameInput.value;
  const age = parseInt(ageInput.value);

  const newStudent = { name, surname, age };

  let students = JSON.parse(localStorage.getItem('students')) || [];
  students.push(newStudent);

  localStorage.setItem('students', JSON.stringify(students));
  updateStudentList();

  nameInput.value = '';
  surnameInput.value = '';
  ageInput.value = '';
});


function updateStudentList() {
  const students = JSON.parse(localStorage.getItem('students')) || [];

  studentList.innerHTML = '';

  students.forEach((student) => {
    const studentElement = document.createElement('div');
    studentElement.textContent = 'Ism: '  + student.name   + 
     '  Familiya: ' +  student.surname + 
     '  Yosh: ' + student.age + '     ';

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'O\'chirish';
    deleteButton.addEventListener('click', () => {
      const index = students.indexOf(student);
      students.splice(index, 1);
      localStorage.setItem('students', JSON.stringify(students));
      updateStudentList();
    });


    studentElement.appendChild(deleteButton);
    studentList.appendChild(studentElement);

  });
}


window.addEventListener('load', updateStudentList);
addNewStudentBtn.addEventListener("click", addStudent)
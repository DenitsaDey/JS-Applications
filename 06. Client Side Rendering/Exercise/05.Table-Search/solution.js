import { html, render} from './node_modules/lit-html/lit-html.js';

const url = 'http://localhost:3030/jsonstore/advanced/table';
const tableEl = document.querySelector('tbody');
const inputField = document.getElementById('searchField');
document.getElementById('searchBtn').addEventListener('click', onSearch);

const studentRow = (student) => html`
    <tr class=${student.match ? 'select' : ''}>
        <th>${student.item.firstName} ${student.item.lastName}</th>
        <th>${student.item.email}</th>
        <th>${student.item.course}</th>
    </tr>
`;

let students;
getStudents();

async function getStudents(){
   const res = await fetch(url);
   const data = await res.json()
   students =  Object.values(data).map(s => ({item: s, match: false}));

   update();
}

function update(){
   render(students.map(studentRow), tableEl);
}

function onSearch(){
   const value = inputField.value.trim().toLocaleLowerCase();
   for(let student of students){
      student.match = Object.values(student.item).some(v => value && v.toLocaleLowerCase().includes(value));
   }

   update();
} 
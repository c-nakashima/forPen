const data = [
  {
    "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": false
  },
  {
    "userId": 1,
    "id": 2,
    "title": "quis ut nam facilis et officia qui",
    "completed": false
  },
  {
    "userId": 1,
    "id": 3,
    "title": "fugiat veniam minus",
    "completed": false
  },
  {
    "userId": 1,
    "id": 4,
    "title": "et porro tempora",
    "completed": true
  },
  {
    "userId": 1,
    "id": 5,
    "title": "laboriosam mollitia et enim quasi adipisci quia provident illum",
    "completed": false
  },
  {
    "userId": 1,
    "id": 6,
    "title": "qui ullam ratione quibusdam voluptatem quia omnis",
    "completed": false
  },
  {
    "userId": 1,
    "id": 7,
    "title": "illo expedita consequatur quia in",
    "completed": false
  },
  {
    "userId": 1,
    "id": 8,
    "title": "quo adipisci enim quam ut ab",
    "completed": true
  },
  {
    "userId": 1,
    "id": 9,
    "title": "molestiae perspiciatis ipsa",
    "completed": false
  },
  {
    "userId": 1,
    "id": 10,
    "title": "illo est ratione doloremque quia maiores aut",
    "completed": true
  }
];

//draw thead
const thead = document.querySelector('thead');
const dataKeys = Object.keys(data[1]); //TODO or directly 4? 
const tr = document.createElement('tr');
for(let i=0; i< dataKeys.length; i++){
  const th = document.createElement('th');
  th.innerHTML = dataKeys[i];
  tr.appendChild(th);
}
thead.appendChild(tr);

//draw tbody
const tbody = document.querySelector('tbody');
for(let i=0; i<data.length; i++){
  const tr = document.createElement('tr'); //TODO should this name be changed?(same 'tr' name is used global)
  //draw each tr inside tbody
  const dataValues = Object.values(data[i]);
  for(let j=0; j<dataKeys.length; j++){
    const td = document.createElement('td');
    td.innerHTML = dataValues[j];
    tr.appendChild(td);
  }
  tbody.appendChild(tr);
}
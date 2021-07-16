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
  },
  {
    "userId": 1,
    "id": 11,
    "title": "vero rerum temporibus dolor",
    "completed": true
  },
  {
    "userId": 1,
    "id": 12,
    "title": "ipsa repellendus fugit nisi",
    "completed": true
  },
  {
    "userId": 1,
    "id": 13,
    "title": "et doloremque nulla",
    "completed": false
  },
  {
    "userId": 1,
    "id": 14,
    "title": "repellendus sunt dolores architecto voluptatum",
    "completed": true
  },
  {
    "userId": 1,
    "id": 15,
    "title": "ab voluptatum amet voluptas",
    "completed": true
  },
  {
    "userId": 1,
    "id": 16,
    "title": "accusamus eos facilis sint et aut voluptatem",
    "completed": true
  },
  {
    "userId": 1,
    "id": 17,
    "title": "quo laboriosam deleniti aut qui",
    "completed": true
  },
  {
    "userId": 1,
    "id": 18,
    "title": "dolorum est consequatur ea mollitia in culpa",
    "completed": false
  },
  {
    "userId": 1,
    "id": 19,
    "title": "molestiae ipsa aut voluptatibus pariatur dolor nihil",
    "completed": true
  },
  {
    "userId": 1,
    "id": 20,
    "title": "ullam nobis libero sapiente ad optio sint",
    "completed": true
  },
  {
    "userId": 2,
    "id": 21,
    "title": "suscipit repellat esse quibusdam voluptatem incidunt",
    "completed": false
  },
  {
    "userId": 2,
    "id": 22,
    "title": "distinctio vitae autem nihil ut molestias quo",
    "completed": true
  },
  {
    "userId": 2,
    "id": 23,
    "title": "et itaque necessitatibus maxime molestiae qui quas velit",
    "completed": false
  },
  {
    "userId": 2,
    "id": 24,
    "title": "adipisci non ad dicta qui amet quaerat doloribus ea",
    "completed": false
  },
  {
    "userId": 2,
    "id": 25,
    "title": "voluptas quo tenetur perspiciatis explicabo natus",
    "completed": true
  },
  {
    "userId": 2,
    "id": 26,
    "title": "aliquam aut quasi",
    "completed": true
  },
  {
    "userId": 2,
    "id": 27,
    "title": "veritatis pariatur delectus",
    "completed": true
  },
  {
    "userId": 2,
    "id": 28,
    "title": "nesciunt totam sit blanditiis sit",
    "completed": false
  },
  {
    "userId": 2,
    "id": 29,
    "title": "laborum aut in quam",
    "completed": false
  },
  {
    "userId": 2,
    "id": 30,
    "title": "nemo perspiciatis repellat ut dolor libero commodi blanditiis omnis",
    "completed": true
  }
];

let currentPage = 1;
const rowsPerPage = 4;
const totalPage = Math.ceil(data.length / rowsPerPage);

const tableWrapper = document.getElementById('tableWrapper');

// const prevBtn = document.createElement('li');
// const nextBtn = document.createElement('li');
// const firstBtn = document.createElement('li');
// const lastBtn = document.createElement('li');

//draw table and thead 
const table = document.createElement('table');
//draw thead
const thead = document.createElement('thead');
const columns = Object.keys(data[1]); //TODO もしデータが完璧じゃない場合はユーザーに表示するカラムを指定させる
const tr = document.createElement('tr');
for (let i = 0; i < columns.length; i++) {
  const th = document.createElement('th');
  th.innerHTML = columns[i];
  tr.appendChild(th);
}
thead.appendChild(tr);
table.appendChild(thead);
tableWrapper.appendChild(table);

//draw tbody and make tbody updatable
const tbody = document.createElement('tbody');
table.appendChild(tbody);

function updateTable(page) {
  currentPage = page;
  tbody.innerHTML = "";
  const startIndexInCurrentPage = (page - 1) * rowsPerPage;
  const endIndexInCurrentPage = data.length > page * rowsPerPage ? page * rowsPerPage : data.length;
  const rowsInCurrentPage = data.slice(startIndexInCurrentPage, endIndexInCurrentPage);
  rowsInCurrentPage.forEach(row => {
    const tr = document.createElement('tr');
    const dataValues = Object.values(row);
    dataValues.forEach(value => {
      const td = document.createElement('td');
      td.innerHTML = value;
      tr.appendChild(td);
    })
    tbody.appendChild(tr);
  })
  updatePagination();
}

//display 5 pages maximum
function currentSurroundingPages() {
  let start, end;
  if (currentPage <= 3) {
    start = 1;
    end = Math.min(start + 4, totalPage);
  } else if (totalPage - currentPage <= 3) {
    end = totalPage;
    start = Math.max(end - 4, 1);
  } else {
    start = Math.max(currentPage - 2, 1);
    end = Math.min(currentPage + 2, totalPage);
  }
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

//insert pagination block area
tableWrapper.insertAdjacentHTML(
  'beforeend',
  `<ul id="paginationBlock">
    <li id="firstBtn">&lt;&lt;</li>
    <li id="prevBtn">&lt;</li>
    <li>
      <ul id="pagination">
      </ul>
    </li>
    <li id="nextBtn">&gt;</li>
    <li id="lastBtn">&gt;&gt;</li>
  </ul>`
);

//draw pagination and make it updatable current pagination style
const pagination = document.getElementById('pagination');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const firstBtn = document.getElementById('firstBtn');
const lastBtn = document.getElementById('lastBtn');
function updatePagination() {
  pagination.innerHTML = "";
  const surroundingPages = currentSurroundingPages();

  for (const i of surroundingPages) {
    const pageBtn = document.createElement("li");
    pageBtn.innerHTML = i;
    pageBtn.setAttribute("class", "page-btn");
    pagination.appendChild(pageBtn);
    pageBtn.addEventListener("click", () => {
      updateTable(i);
    });
  }

  //hilight current page button
  const pageBtns = document.querySelectorAll(".page-btn");
  for (const i of surroundingPages) {
    if (currentPage === i) {
      pageBtns[i - surroundingPages[0]].classList.add("current");
    }
  }

  //show/hide arrow button
  switch (currentPage) {
    case 1:
      firstBtn.style.display = "none";
      prevBtn.style.display = "none";
      nextBtn.style.display = "block";
      lastBtn.style.display = "block";
      break;
    case totalPage:
      nextBtn.style.display = "none";
      lastBtn.style.display = "none";
      firstBtn.style.display = "block";
      prevBtn.style.display = "block";
      break;
    default:
      firstBtn.style.display = "block";
      prevBtn.style.display = "block";
      nextBtn.style.display = "block";
      lastBtn.style.display = "block";
  }
}

//add eventlisteners to each buttons
function addEventListeners() {
  prevBtn.addEventListener("click", () => {
    updateTable(currentPage - 1);
  });
  nextBtn.addEventListener("click", () => {
    updateTable(currentPage + 1);
  });
  firstBtn.addEventListener("click", () => {
    updateTable(1);
  });
  lastBtn.addEventListener("click", () => {
    updateTable(totalPage);
  });
}

//init
updateTable(1)
addEventListeners()
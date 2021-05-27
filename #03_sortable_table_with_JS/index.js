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
const recordsPerPage = 4;
const totalPage = Math.ceil(data.length / recordsPerPage);

const prevBtn = document.getElementById('prevBtn')
const nextBtn = document.getElementById('nextBtn')
const firstBtn = document.getElementById('firstBtn')
const lastBtn = document.getElementById('lastBtn')

//draw thead
const thead = document.querySelector('thead');
const dataKeys = Object.keys(data[1]); //TODO or directly 4? 
const tr = document.createElement('tr');
for (let i = 0; i < dataKeys.length; i++) {
  const th = document.createElement('th');
  th.innerHTML = dataKeys[i];
  th.insertAdjacentHTML('beforeend', '<i class="fas fa-sort sort-btn"></i>');
  tr.appendChild(th);
}
thead.appendChild(tr);

//reset sort classname
const sortBtns = document.getElementsByClassName('sort-btn');
function resetSortClass(){
  for (let i = 0; i < sortBtns.length; i++) {
    sortBtns[i].className = "fas fa-sort sort-btn";
  }
}

//draw tbody and make tbody updatable
const tbody = document.querySelector('tbody');

function updateTable(page) {
  currentPage = page;
  tbody.innerHTML = "";
  for (
    let i = (page - 1) * recordsPerPage;
    i < page * recordsPerPage && i < displayedData.length;
    i++) {
    const tr = document.createElement('tr'); //TODO should this name be changed?(same 'tr' name is used global)
    const dataValues = Object.values(displayedData[i]);
    for (let j = 0; j < dataKeys.length; j++) {
      const td = document.createElement('td');
      td.innerHTML = dataValues[j];
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  updatePagination();
}

//display 5 pages maximum
function surroundingPages() {
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

//draw pagination and make it updatable current pagination style
const pagination = document.getElementById('pagination');
function updatePagination() {
  pagination.innerHTML = "";
  const surroundingPage = surroundingPages();

  for (const i of surroundingPage) {
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
  for (let i = surroundingPage[0]; i <= surroundingPage[4]; i++) {
    if (currentPage === i) {
      pageBtns[i - surroundingPage[0]].classList.add("current");
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
const resetSortBtn = document.getElementById('resetSortBtn');

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
  //set sort Buttotn
  for (let i = 0; i < sortBtns.length; i++) {
    sortBtns[i].setAttribute('data-type', dataKeys[i])
    sortBtns[i].addEventListener('click', (e) => {
      let page = currentPage;
      let sortBtn = e.path[0];
      let sortBtnOffsetY = e.offsetY;
      //reset other colomn's class name
      resetSortClass();
      const key = e.path[0].getAttribute('data-type');
      //sort clicked colomn
      if (sortBtnOffsetY >= 20) {
        sortBtn.className = "fas fa-sort-down sort-btn";
        const sortData = data.slice().sort((a, b) => a[key] < b[key] ? -1 : 1);
        displayedData = sortData;
      } else if (sortBtnOffsetY < 20) {
        sortBtn.className = "fas fa-sort-up sort-btn";
        const sortData = data.slice().sort((a, b) => b[key] < a[key] ? -1 : 1);
        displayedData = sortData;
      }
      updateTable(page);
    })
  }
  //set reset Buttotn
  resetSortBtn.addEventListener('click', () => {
    resetSortClass();
    page = currentPage;
    displayedData = data;
    updateTable(page);
  })
}



//init
let displayedData;
function init() {
  displayedData = data;
  updateTable(1)
  addEventListeners()
}

init();
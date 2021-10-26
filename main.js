document.addEventListener('DOMContentLoaded', () => {

  let students = [
    {
      surname: 'Кузнецов',
      name: 'Алексей',
      patronymic: 'Александрович',
      age: '1993-08-15',
      start: '2005',
      finish: '2009',
      faculty: 'Юридический',
    },
    {
      surname: 'Петров',
      name: 'Петр',
      patronymic: 'Петрович',
      age: '1992-12-31',
      start: '2005',
      finish: '2009',
      faculty: 'Исторический',
    },
    {
      surname: 'Васильев',
      name: 'Василий',
      patronymic: 'Васильевич',
      age: '1992-12-31',
      start: '2006',
      finish: '2010',
      faculty: 'Экономический',
    },
    {
      surname: 'Смирнов',
      name: 'Иван',
      patronymic: 'Петрович',
      age: '1990-12-31',
      start: '2007',
      finish: '2011',
      faculty: 'Физический',
    },
    {
      surname: 'Александрова',
      name: 'Евгения',
      patronymic: 'Павловна',
      age: '1990-12-31',
      start: '2006',
      finish: '2010',
      faculty: 'Физический',
    },
  ]

  let nameSt = document.querySelector('#name');
  let surnameSt = document.querySelector('#surname');
  let patronymicSt = document.querySelector('#patronymic');
  let birth = document.querySelector('#birthday');
  let startSt = document.querySelector('#start');
  let finishSt = document.querySelector('#finish');
  let facultySt = document.querySelector('#faculty');
  let searchName = document.querySelector('#searchName');
  let searchFaculty = document.querySelector('#searchFaculty');
  let searchYearStart = document.querySelector('#searchYearStart');
  let searchYearFinish = document.querySelector('#searchYearFinish');
  let inputs = document.querySelectorAll('label input');
  let now = new Date();
  let yearNow = now.getFullYear();
  let monthNow = now.getMonth();
  let dateNow = yearNow + '.' + monthNow;
  let arrStudent = [];
  let sortType = 1;
  let birthDate;
  let yearsOfStudy, yearStudy;
  let arr = [];
  let startArr = students.length;
  let newArr;

  const btn = document.querySelector('#button');
  const table = document.querySelector('table');
  const btnFilter = document.querySelector('#filterBtn');
  const title = document.querySelector('.hero__title');


  function createTable() {

    let tr = document.createElement('tr');

    let thSurname = document.createElement('th');
    thSurname.innerHTML = 'Фамилия Имя Отчество';
    thSurname.classList.add('surnameHead');
    tr.appendChild(thSurname);

    let thAge = document.createElement('th');
    thAge.innerHTML = 'Возраст';
    thAge.classList.add('ageHead');
    tr.appendChild(thAge);

    let thStudy = document.createElement('th');
    thStudy.innerHTML = 'Сколько лет учится';
    thStudy.classList.add('yearsHead');
    tr.appendChild(thStudy);

    let thFaculty = document.createElement('th');
    thFaculty.innerHTML = 'Факультет';
    thFaculty.classList.add('faculty');
    tr.appendChild(thFaculty);

    table.appendChild(tr);

  }


  function cleanTable() {
    let list = document.querySelectorAll('tr').length;
    if (list) {
      document.querySelectorAll('tr').forEach(function (x) {

        table.removeChild(x);
      })
    }

  }

  btn.addEventListener('click', function (e) {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) {
      return
    }

  });

  function cleanForm() {
    nameSt.value = '';
    surnameSt.value = '';
    patronymicSt.value = '';
    birth.value = '';
    startSt.value = '';
    finishSt.value = '';
    facultySt.value = '';
  }

  function createTableOfArrey(students) {
    for (let stud of students) {
      let tr = document.createElement('tr');

      let td1 = document.createElement('td');
      td1.className = 'surname';
      td1.innerHTML = stud.surname + ' ' + stud.name + ' ' + stud.patronymic;
      tr.appendChild(td1);

      let td2 = document.createElement('td');
      arrStudent = stud.age.split('-');
      birthDate = stud.age.split('-').reverse().join('.');
      let studentAge = yearNow - Number(arrStudent[0]);
      td2.innerHTML = birthDate + ' (' + studentAge + ' лет)';
      tr.appendChild(td2);

      let td3 = document.createElement('td');
      yearsOfStudy = (Number(stud.finish) - Number(stud.start));
      yearStudy = Number(stud.start) + 4;
      if (Number(stud.finish) < dateNow) {
        yearsOfStudy = 'Закончил';
        td3.innerHTML = stud.start + ' - ' + yearStudy + ' (' + yearsOfStudy + ')';
      } else {
        td3.innerHTML = stud.start + ' - ' + yearStudy + ' (' + yearsOfStudy + ' курс)';
      }
      tr.appendChild(td3);

      let td4 = document.createElement('td');
      td4.innerHTML = stud.faculty;
      tr.appendChild(td4);

      table.appendChild(tr);

    }
    sorted(students)
  }
  createTable();
  createTableOfArrey(students);

  function createNewStudent() {
    let trNew = document.createElement('tr');

    let td1 = document.createElement('td');
    td1.className = 'surname';
    td1.innerHTML = surnameSt.value.trim() + ' ' + nameSt.value.trim() + ' ' + patronymicSt.value.trim();
    trNew.appendChild(td1);

    let td2 = document.createElement('td');
    arrStudent = birth.value.split('-');
    let birthDate = birth.value.split('-').reverse().join('.');
    let studentAge = yearNow - Number(arrStudent[0]);
    td2.innerHTML = birthDate + ' (' + studentAge + ' лет)';
    trNew.appendChild(td2);

    let td3 = document.createElement('td');
    let finishNewSt = finishSt.value.trim();
    let startNewSt = startSt.value.trim();
    yearsOfStudy = (Number(finishNewSt) - Number(startNewSt));
    yearStudy = Number(startNewSt) + 4;
    if (Number(finishNewSt) < Number(dateNow)) {
      yearsOfStudy = 'Закончил';
      td3.innerHTML = startNewSt + ' - ' + yearStudy + ' (' + yearsOfStudy + ')';
    } else {
      yearsOfStudy = Math.round(Number(dateNow) - Number(startNewSt));
      td3.innerHTML = startNewSt + ' - ' + yearStudy + ' (' + yearsOfStudy + ' курс)';
    }
    trNew.appendChild(td3);

    let td4 = document.createElement('td');
    td4.innerHTML = facultySt.value.trim();
    trNew.appendChild(td4);

    table.appendChild(trNew);

    students.push(
      {
        surname: surnameSt.value.trim(),
        name: nameSt.value.trim(),
        patronymic: patronymicSt.value.trim(),
        age: birth.value,
        start: startSt.value.trim(),
        finish: finishSt.value.trim(),
        faculty: facultySt.value.trim(),
      }
    );

    return students;

  };

  // Валидация

  function validate() {
    let p = document.querySelector('p');
    if ((surnameSt.value.trim() === '') || (nameSt.value.trim() === '') || (patronymicSt.value.trim() === '') || (birth.value.trim() === '') || (startSt.value.trim() === '') || (finishSt.value.trim() === '') || (facultySt.value.trim() === '')) {
      p.innerHTML = 'Все поля должны быть заполнены';
    } else if ((birth.value.trim() < '1900-01-01') || (birth.value.trim() > yearNow)) {
      p.innerHTML = 'Введите дату не раньше 01.01.1900 и до текущего года';

    } else if (startSt.value.trim() < 2000) {
      p.innerHTML = 'Укажите начала обучения начиная от 2000 года';

    } else {
      createNewStudent();
      cleanForm();
      sorted(students)
      return true
    }

  }

  function createAll() {
    cleanTable();
    createTable();
  }

  // Сортировка

  let sortStudents;
  let trs = table.rows;


  function sorted(students) {
    let ths = document.querySelectorAll('th');

    ths.forEach(function (th) {

      th.addEventListener('click', function (e) {

        let clickName = e.target;

        switch (clickName.className) {
          case 'surnameHead':
            sortStudents = sortSurname(students, 'surname', sortType);
            break;
          case 'faculty':
            sortStudents = sortSurname(students, 'faculty', sortType);
            break;
          case 'ageHead':
            sortStudents = sortSurname(students, 'age', sortType);
            break;
          case 'yearsHead':
            sortStudents = sortSurname(students, 'start', sortType);
            break;
        }
        sortType *= -1
        createAll();
        createTableOfArrey(sortStudents);
      })
    })

  }

  function sortSurname(students, field, type) {

    sortStudents = students.slice();

    return sortStudents.sort((a, b) => {
      let nameA = a[field].toLowerCase();
      let nameB = b[field].toLowerCase();

      if (nameA < nameB) return -1 * type;

      if (nameA > nameB) return type;

      return 0
    })

  }

  // Фильтрация

  let studentsFilter = [];
  btnFilter.addEventListener('click', function (e) {
    e.preventDefault();

    filterCreate(students);

  })


  function filterSearch(students, label, value) {

    return studentsFilter = students.filter(item => item[label].indexOf(value) !== -1)

  }


  function filterCreate(students) {

    studentsFilter = students.slice();
    studentsFilter.forEach(function (person) {
      person.surname = `${person.surname} ${person.name} ${person.patronymic}`
      person.name = '';
      person.patronymic = '';

    })

    inputs.forEach(function (input) {

      let localData = studentsFilter.length ? studentsFilter : students

      switch (input.id) {
        case 'searchName':
          studentsFilter = filterSearch(localData, 'surname', input.value.trim());
          break;
        case 'searchFaculty':
          studentsFilter = filterSearch(localData, 'faculty', input.value.trim());
          break;
        case 'searchYearStart':
          studentsFilter = filterSearch(localData, 'start', input.value.trim());
          break;
        case 'searchYearFinish':
          studentsFilter = filterSearch(localData, 'finish', input.value.trim());
          break;
      }

      createAll()
      createTableOfArrey(studentsFilter);
      sorted(studentsFilter)
      input.addEventListener('input', function () {
        if (input.value.trim() === '') {

          createAll();
          createTableOfArrey(students);
          return students
        }

        return

      })

    })
  }



})
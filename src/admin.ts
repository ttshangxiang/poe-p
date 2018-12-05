import axios from 'axios';

function $id(id: string) {
  return document.getElementById(id);
}

const $list = $id('json-list');
const $popup = $id('popup');
const $edit = $id('edit-area');
const $select = <HTMLSelectElement>$id('select-table');
let currentTable = $select.value;

let pointList: Array<Object> = [];
let jsonArr: any = [];

function render () {
  const input = <HTMLInputElement>$id('query-input');
  let arr = jsonArr;
  if (input.value) {
    const filter: Array<string> = [];
    jsonArr.forEach((item: string) => {
      if (item.indexOf(input.value) > -1) {
        filter.push(item);
      }
    });
    arr = filter;
  }
  $list.innerHTML = arr.join('');
}

function query() {
  axios
    .get(`/api/poe/${currentTable}`)
    .then(response => {
      pointList = response.data.data;
      jsonArr = [];
      pointList.forEach((item: any, i: number) => {
        const str = JSON.stringify(item);
        jsonArr.push(
          `<li class="json-item" key="${i}">${str}</li>`
        );
      });
      render();
    })
    .catch(err => {
      console.log(err);
    });
}

function save(json: object) {
  axios
    .post(`/api/poe/${currentTable}`, json)
    .then(response => {
      $popup.style.display = 'none';
      query();
    })
    .catch(err => {
      console.log(err);
    });
}

function update(_id: string, json: object) {
  axios
    .put(`/api/poe/${currentTable}/` + _id, json)
    .then(response => {
      $popup.style.display = 'none';
      query();
    })
    .catch(err => {
      console.log(err);
    });
}

function submit() {
  const text = $edit.innerText;
  try {
    const json = JSON.parse(text);
    if (json._id) {
      const _id = json._id;
      delete json._id;
      if (_id.length == 24) {
        update(_id, json);
      } else {
        alert('_id长度错误');
        return;
      }
    } else {
      save(json);
    }
  } catch (error) {
    console.log(error);
    alert('JSON有错');
  }
}

function remove() {
  const text = $edit.innerText;
  try {
    const json = JSON.parse(text);
    if (json._id) {
      const _id = json._id;
      if (_id.length == 24) {
        axios
          .delete(`/api/poe/${currentTable}/` + _id)
          .then(response => {
            $popup.style.display = 'none';
            query();
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        alert('_id长度错误');
        return;
      }
    } else {
      save(json);
    }
  } catch (error) {
    console.log(error);
    alert('JSON有错');
  }
}

function setDefault() {
  const text = $edit.innerText;
  localStorage.setItem('poe-default-' + currentTable, text);
}

function getDefault() {
  return localStorage.getItem('poe-default-' + currentTable);
}

$id('pop-mask').addEventListener('click', function() {
  $popup.style.display = 'none';
});
$id('pop-cancel').addEventListener('click', function() {
  $popup.style.display = 'none';
});
$id('pop-update').addEventListener('click', submit);
$id('pop-add').addEventListener('click', submit);
$id('pop-delete').addEventListener('click', remove);
$id('pop-default').addEventListener('click', setDefault);

$list.addEventListener('click', function(e: MouseEvent) {
  const target = <HTMLElement>e.target;
  if (target.classList.contains('json-item')) {
    $id('pop-update-btn').style.display = 'inline';
    $id('pop-add-btn').style.display = 'none';
    $popup.style.display = 'block';
    const key: any = target.getAttribute('key');
    $edit.innerText = JSON.stringify(pointList[key], null, 2);
  }
});

$id('add-btn').addEventListener('click', function() {
  $id('pop-add-btn').style.display = 'inline';
  $id('pop-update-btn').style.display = 'none';
  $popup.style.display = 'block';
  const addDefault = getDefault();
  let obj = {};
  try {
    obj = JSON.parse(addDefault) || obj;
  } catch (error) {
    console.log(error);
  }
  $edit.innerText = JSON.stringify(obj, null, 2);
});

$id('query-btn').addEventListener('click', function () {
  render();
});

$select.addEventListener('change', (e: Event) => {
  currentTable = $select.value;
  query();
});

// 执行
query();

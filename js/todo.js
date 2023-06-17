const toDoForm =document.querySelector('#todo-form');
//const toDoInput =toDoForm.querySelector('input')
const toDoInput =document.querySelector('#todo-form input')
const toDoList =document.querySelector('#todo-list');


//저장기능
const TODOS_KEY="todos"

//업데이트 되므로 const 에서 let으로 변경하였다.
let toDos=[]

function saveToDos(){
  //toDots 배열 데이터인데 localStorage의 value에서 [] 안 보인다.
  //JSON.stringify()로 배열이나 객체를 문자열 형태로 변환한다. []가 보인다. 
  localStorage.setItem(TODOS_KEY,JSON.stringify(toDos));
}


//삭제 기능
function deleteToDo(event){

  const li=event.target.parentElement;
  // toDoList.removeChild(event.target.parentElement)
  li.remove();
  toDos=toDos.filter((toDo)=> toDo.id !== parseInt(li.id))
  saveToDos();
}

//submit시 추가 기능
function paintToDo(newTodo){
  const li =document.createElement('li');
  li.id=newTodo.id;
  li.style.marginRight="20px"
  const span =document.createElement('span');
  const button=document.createElement('button');

  span.innerText=newTodo.text;
  button.innerText='X';
  button.style.marginLeft="5px"
  button.addEventListener('click',deleteToDo)
  li.appendChild(span);
  li.appendChild(button);

  toDoList.appendChild(li);
}

//전체 기능
function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value="";
  const newTodoObj={
    text:newTodo,
    id:Date.now()
  }
  toDos.push(newTodoObj)
  paintToDo(newTodoObj);
  saveToDos();
}

toDoForm.addEventListener('submit',handleToDoSubmit)

//loading 기능
const savedToDos = localStorage.getItem(TODOS_KEY)

if(savedToDos!==null){
  //문자열 형태 데이터를 객체 및 배열 형태로 변환한다.
  const parsedToDos= JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo)
}

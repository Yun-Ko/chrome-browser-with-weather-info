
//로그인 기능

const loginForm = document.querySelector('#login-form');
const loginInput = document.querySelector('#login-form input');
const greeting =document.querySelector('#greeting');

const HIDDEN_CLASSNAME ='hidden';
const USERNAME_KEY ="username";


//이름 팝업 기능
function onLoginSubmit(e){
  e.preventDefault();
  loginForm.classList.add(HIDDEN_CLASSNAME);
  const username = loginInput.value;
  localStorage.setItem(USERNAME_KEY,username);
  paintGreetings(username);
}

function paintGreetings(username){
  greeting.innerText=`Hello ${username}`;
  greeting.classList.remove(HIDDEN_CLASSNAME);
}


//기존 LocalStorage 유무에 따른 form 및 이름 팝업 구현
const savedUsername = localStorage.getItem(USERNAME_KEY)

if(savedUsername===null){
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener('submit',onLoginSubmit)

}
else{
  paintGreetings(savedUsername);
}

///초기화

window.addEventListener('load',()=>{
  localStorage.removeItem(USERNAME_KEY)
})
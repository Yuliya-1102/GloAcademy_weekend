'use strict';

const register = document.querySelector('.register');
const logIn = document.querySelector('.logIn');
const list = document.querySelector('.list');

let userData = [];

if(localStorage.getItem('user')){
    userData = JSON.parse(localStorage.getItem('user'));
}

function addUser(){
    list.textContent = '';
    userData.forEach(function(item){
        let li = document.createElement('li');
        li.innerHTML = `Имя: ${item.firsName}, фамилия: ${item.lastName}, зарегестрирован: ${item.regDate} <button class='remove'>Удалить</button>`;
        list.append(li);

         // навешиваем событие на значек удалено 
        let btnRemove = li.querySelector('.remove');
        btnRemove.addEventListener('click', function(){
            let i = userData.indexOf(item);
            if(i >= 0){
                userData.splice(i, 1);
            }
            localStorage.setItem('user', JSON.stringify(userData));
            addUser();
        });
        return li;
    });
 
}

function showDays(){
    let monthArr = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
  
    let date = new Date();
    let year = date.getFullYear();
    let dateCurrent = date.getDate();
    let month = date.getMonth();
  
    date.setDate(date.getDate() -1);
  
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
  
    function getMonth(){
      if(month === 0){
        return 1;
      } else {
        return month + 1;
      }
    }
    getMonth();
  
    const addZero = n => n < 10 ? '0' + n : n;
  
    let currentDayOne = `${dateCurrent} ${monthArr[month]} ${year}г., ${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`;
    return currentDayOne;
  }
 
function removeList(){
    console.log('hello');
}  

function askAboutUser(){
    let nameUser = prompt('Ваше Имя и Фамилия');
    let firsName = nameUser.split(' ')[0];
    let lastName = nameUser.split(' ')[1];
    let loginUser = prompt('Ввести логин');
    let passwordUser = prompt('Ввести пароль');

    const newUser = {
        firsName: firsName,
        lastName: lastName,
        login: loginUser,
        password: passwordUser,
        regDate: showDays()
    };

    userData.push(newUser);

    localStorage.setItem('user', JSON.stringify(userData));

    addUser();
}

register.addEventListener('click', askAboutUser);
addUser();






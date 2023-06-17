navigator.geolocation.getCurrentPosition(onGeoOk,onGeoError);

const API_KEY="34e31d6a9b808750547426a713d63b97"

function onGeoOk(position){
  // console.log(position)
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  const urlforCurrentWeather =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric&lang=kr`
  const urlforWeeklyWeather =`https:/api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric&lang=kr`

  //CurrentWeather
  fetch(urlforCurrentWeather).then((response) => response.json()).then((data)=>{
    const weather =document.querySelector("#weather span:nth-child(1)")
    const city =document.querySelector("#weather span:nth-child(2)")
    const temp =document.querySelector("#weather span:nth-child(3)")
    city.innerText= data.name;
    weather.innerText=data.weather[0].main
    temp.innerText=`${data.main.temp}도`
  })

  //WeeklyWeather
  fetch(urlforWeeklyWeather).then((response) => response.json()).then((data) =>{
    //Date() 현지 시간대를 기준으로 날짜와 시간을 반환한다.
    const dateList=data.list;
    console.log(data.list)
    //날짜가 바뀌는 날, Date와 관련 정보가 담긴 객체를 배열에 담는다.
    let dateArr=[];
    for(let i=0; i<dateList.length; i++){
     
        let time = new Date(dateList[i].dt_txt).getDate();
        if(!dateArr.includes(time)){
          dateArr.push(time,dateList[i]);
        }
        else{
          continue;
        }
    }
    //객체에 Date 정보도 있으므로 Date는 배열에서 제거하고 객체만 남긴다. 
    let newDateArr= dateArr.filter((element)=>typeof element === 'object');
    // console.log(newDateArr)
    //각 Date
    const weatherElements =document.querySelector('#weekly-weather>ul')
    for(let i=0; i<newDateArr.length; i++){
      const weatherElement= document.createElement('li');
      weatherElements.appendChild(weatherElement);
      weatherElement.innerHTML=
        `<img src="https://openweathermap.org/img/wn/${newDateArr[i].weather[0].icon}@2x.png"/>
        <div style="text-align:center; color:white">${new Date(newDateArr[i].dt_txt).getDate()}</div>`
      }

    const weeklyWeatherBar =document.querySelector(`#weekly-weather`);
    weeklyWeatherBar.setAttribute('style','transform:translateY(-200px)');
    const weatherButton = document.querySelector('#weather-button');
    let showAndHide = true;
    const showWeeklyWeatherBar = ()=>{
      
      console.log('클릭했다')
      if(showAndHide===true){
        //HTML 요소의 인라인 속성으로 추가, 삭제된다.
        weatherButton.setAttribute("style","transform:translateX(-150px)")
        setTimeout(()=>{
          weeklyWeatherBar.removeAttribute('style')
        },200)
        showAndHide=false;
      } 

      else {
        weeklyWeatherBar.setAttribute('style','transform:translateY(-200px)')
        setTimeout(()=>{
          weatherButton.removeAttribute("style");
        },300)
        showAndHide=true;   
      }
      
    }

    weatherButton.addEventListener('click',showWeeklyWeatherBar);



  })
}

function onGeoError(){
  throw new Error("error occurs")
}



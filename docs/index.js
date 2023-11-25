(()=>{"use strict";const e=function(){const e=document.createElement("div");e.classList.add("loadingContainer");const t=document.createElement("div");return t.classList.add("loading"),e.append(t),e}(),t=document.querySelector(".header_search-form"),n=document.querySelector(".header__search-input"),a=document.querySelector(".header__location-name"),c=document.querySelector(".main__current-weather-additional-wind"),o=document.querySelector(".main__current-weather-additional-pressure"),r=document.querySelector(".main__current-weather-additional-humidity"),d=document.querySelector(".main__current-weather-temperature"),s=document.querySelector(".main__current-weather-icon"),i=document.querySelector(".main__current-weather-description"),u=document.querySelector(".main__current-weather-feels-like"),m=document.querySelector(".additional-info-block");async function l(t){if(t.length>1&&t.length<50){const n=await async function(t){a.style.color="transparent",document.body.appendChild(e);const n=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=4f889e1d89284a96bd475947232311&q=${t}&days=3`,{mode:"cors"});return n.ok?await n.json():(p(),!1)}(t);n&&function(e){m.innerHTML="";const t={location:e.location.name,windSpeed:e.current.wind_kph,windDir:e.current.wind_dir,pressure:e.current.pressure_mb,humidity:e.current.humidity,temperature:e.current.temp_c,weatherIcon:e.current.condition.icon,weatherCondition:e.current.condition.text,temperatureFeelsLike:e.current.feelslike_c},n=e.forecast.forecastday;(function(e){a.textContent=e.location,c.textContent=e.windSpeed.toFixed(0)+" km/h, "+e.windDir,o.textContent=e.pressure+" mb",r.textContent=e.humidity+"%",d.textContent=e.temperature.toFixed(0)+"°",s.src=e.weatherIcon,i.textContent=e.weatherCondition,u.textContent="Feels like "+e.temperatureFeelsLike.toFixed(0)+"°"})(t),function(e){const t=document.createElement("div");t.classList.add("today-hourly-forecast-block");const n=function(e){const t=(new Date).getHours();if(23-t==0)return e[1].hour;const n=e[0].hour.slice(t+1);for(let a=0;a<t+1;a++)n.push(e[1].hour[a]);return n}(e);for(let e=0;e<24;e++)t.append(y(n[e]));m.append(t)}(n),function(e){for(let t=0;t<e.length;t++){const n=e[t].date,a=e[t].day.maxwind_kph.toFixed(0),c=e[t].day.condition.icon,o=e[t].day.maxtemp_c.toFixed(0),r=e[t].day.mintemp_c.toFixed(0);m.append(_(n,a,c,o,r))}}(n.slice(1)),p()}(n)}}function p(){a.removeAttribute("style"),document.body.removeChild(e)}function y(e){const t=document.createElement("div");t.classList.add("hour-forecast-block");const n=document.createElement("span");n.classList.add("hour-forecast-time"),n.textContent=e.time.slice(-5);const a=h(e.condition.icon,"main__current-weather-icon"),c=document.createElement("span");return c.classList.add("hour-forecast-temperature"),c.textContent=e.temp_c.toFixed(0)+"°",t.append(n),t.append(a),t.append(c),t}function _(e,t,n,a,c){const o=document.createElement("div");return o.classList.add("next-day-forecast-block"),o.append(function(e){const t=new Date(e),n=document.createElement("div");n.classList.add("next-day-forecast__date-block");const a=document.createElement("span");a.classList.add("next-day-forecast__date"),a.textContent=`${["January","February","March","April","May","June","July","August","September","October","November","December"][t.getMonth()]}, ${t.getDate()}`;const c=document.createElement("span");return c.classList.add("next-day-forecast__day"),c.textContent=`${["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][t.getDay()]}`,n.append(a),n.append(c),n}(e)),o.append(function(e,t,n,a){const c=document.createElement("div");return c.classList.add("next-day-forecast__details-block"),c.append(function(e){const t=document.createElement("div");t.classList.add("next-day-forecast__wind-block");const n=f("Wind"),a=document.createElement("span");return a.classList.add("next-day-forecast__wind-speed"),a.textContent=e+" km/h",t.append(n),t.append(a),t}(e)),c.append(h(t,"next-day-forecast__image")),c.append(function(e){const t=document.createElement("div");t.classList.add("next-day-forecast__day-temp-block");const n=f("Day"),a=document.createElement("span");return a.classList.add("next-day-forecast__day-temp"),a.textContent=e+"°",t.append(n),t.append(a),t}(n)),c.append(function(e){const t=document.createElement("div");t.classList.add("next-day-forecast__night-temp-block");const n=f("Night"),a=document.createElement("span");return a.classList.add("next-day-forecast__night-temp"),a.textContent=e+"°",t.append(n),t.append(a),t}(a)),c}(t,n,a,c)),o}function f(e){const t=document.createElement("span");return t.classList.add("next-day-forecast__detail-heading"),t.textContent=e,t}function h(e,t){const n=document.createElement("img");return n.classList.add(t),n.alt="Weather icon",n.src=e,n}t.addEventListener("submit",(e=>{e.preventDefault(),l(n.value),t.reset()})),l("Saransk")})();
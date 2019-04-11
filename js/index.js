
// Weather-app js below -->

window.addEventListener('load', ()=> {
    let long; //variable for longitude
    let lat; //variable for latitude
    
    //DOM elements taken from HTML -->

    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    let visibilityDescription = document.querySelector('.visibility-description');
    const temperatureSpan = document.querySelector('.temperature span');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude; // Enter a database by "coords"
            lat  = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/'; // PROXY (let api download data on local)
            const api = `${proxy}https://api.darksky.net/forecast/ce99a3f610e5d3a6e387bb938f5a1667/${lat},${long}`;

            //Replace informations (latitude and longitude and set them to variables using "$" sign)
            
            fetch(api)
                .then(response => {
                    return response.json();
                })

                .then(data => {
                    console.log(data);
                    const {
                        temperature,
                        summary,
                        icon,
                        visibility
                    } = data.currently;
                    // DOM elements from the API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    visibilityDescription.textContent = visibility + " points of visibility";

                    // FORMULA FOR CELSIUS
                    let celsius = (temperature - 32) * (5 / 9);

                    // Set icon
                    setIcons(icon, document.querySelector(".icon"));

                    //Change temperature to Celsius from Farenheit

                    temperatureSection.addEventListener('click', () => {
                        if(temperatureSpan.textContent === "F"){
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celsius);
                        } else {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        }
                    });

                });
        });
    }
  
    function setIcons(icon, iconId)  {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase(); // REPLACE all "-" elements to "_" + get all letters to UPPERCASE
        skycons.play();
        return skycons.set(iconId, Skycons[currentIcon]);
  }
});

// Clock js below -->

function showTime() {
    let date = new Date();
    let h = date.getHours(); // 0 - 23
    let m = date.getMinutes(); // 0 - 59
    let s = date.getSeconds(); // 0 - 59
    let session = "AM";

    // FORMULA FOR TIME COUNTING AND "AM/PM" CHANGE

    if (h == 0) {
        h = 12;
    }

    if (h > 12) {
        h = h - 12;
        session = "PM";
    }

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;

    let time = h + ":" + m + ":" + s + " " + session;
    document.getElementById("MyClockDisplay").innerText = time;
    document.getElementById("MyClockDisplay").textContent = time;

    setTimeout(showTime, 1000);

}

showTime();
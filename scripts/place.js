document.getElementById("lastModified").innerHTML =`Last Modified: ${document.lastModified}`;
document.getElementById("current-year").innerHTML = new Date().getFullYear();

function calculateWindChill(temp, wind, unit = "C") {
  return unit === "C"
    ? (13.12 + 0.6215 * temp - 11.37 * Math.pow(wind, 0.16) + 0.3965 * temp * Math.pow(wind, 0.16))
    : (35.74 + 0.6215 * temp - 35.75 * Math.pow(wind, 0.16) + 0.4275 * temp * Math.pow(wind, 0.16));
}

function getWindChillDisplay(temp, wind, unit = "C") {
  if (unit === "C" && temp <= 10 && wind > 4.8) {
    return calculateWindChill(temp, wind, unit).toFixed(1) + "°C";
  } 
  else if (unit === "F" && temp < 50 && wind > 3) {
    return calculateWindChill(temp, wind, unit).toFixed(1) + "°F";
  }
  else {
    return "N/A";
  }
}

const temperature = 10;  
const windSpeed = 5;   
const unit = "C";   

document.getElementById("windchill").textContent =
  "Wind Chill: " + getWindChillDisplay(temperature, windSpeed, unit);

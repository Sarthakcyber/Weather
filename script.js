function clearAnimations() {
  document.querySelectorAll(".raindrop, .snowflake, .cloud").forEach(el => el.remove());
}

function createRain() {
  for (let i = 0; i < 40; i++) {
    const drop = document.createElement("div");
    drop.className = "raindrop";
    drop.style.left = Math.random() * window.innerWidth + "px";
    drop.style.animationDuration = 0.5 + Math.random() * 0.7 + "s";
    document.body.appendChild(drop);
  }
}

function createSnow() {
  for (let i = 0; i < 20; i++) {
    const snow = document.createElement("div");
    snow.className = "snowflake";
    snow.innerHTML = "❄";
    snow.style.left = Math.random() * window.innerWidth + "px";
    snow.style.fontSize = 12 + Math.random() * 24 + "px";
    snow.style.animationDuration = 5 + Math.random() * 5 + "s";
    document.body.appendChild(snow);
  }
}

function createClouds() {
  for (let i = 0; i < 3; i++) {
    const cloud = document.createElement("div");
    cloud.className = "cloud";
    cloud.style.width = 100 + Math.random() * 100 + "px";
    cloud.style.height = 60 + Math.random() * 40 + "px";
    cloud.style.top = 50 + Math.random() * 200 + "px";
    cloud.style.left = -200 + "px";
    cloud.style.animationDuration = 30 + Math.random() * 20 + "s";
    document.body.appendChild(cloud);
  }
}

async function getWeather() {
  const location = document.getElementById("locationInput").value.trim();
  const resultDiv = document.getElementById("result");

  if (!location) {
    resultDiv.innerHTML = "⚠️ Please enter a location!";
    return;
  }

  const apiKey = "74fab2cf8292446abae192237251709";
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Location not found");
    }
    const data = await response.json();
    
    resultDiv.innerHTML = `
      <div class="icon">
        <img src="${data.current.condition.icon}" alt="${data.current.condition.text}">
      </div>
      <div class="temp">${data.current.temp_c}°C</div>
      <div>${data.location.name}, ${data.location.country}</div>
      <div>${data.current.condition.text}</div>
    `;

    // Clear old animations
    clearAnimations();

    // Add animation based on condition
    const condition = data.current.condition.text.toLowerCase();
    if (condition.includes("rain")) {
      createRain();
    } else if (condition.includes("snow")) {
      createSnow();
    } else if (condition.includes("cloud")) {
      createClouds();
    }
    // Sunny keeps gradient background

  } catch (error) {
    resultDiv.innerHTML = `❌ ${error.message}`;
  }
}


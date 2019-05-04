const https = require("https");

const apiKey =
  "rJuKdTen_ktUx0Mls6culJDA0P3yXXP5FoajDMiozWFFJOcxfgNejA-LL5ejEt17ihVzEvduWdvVs9Nmb-RD0IIyZwOfiHPl415Rm2t-tS1-8Ezyat6J1f3PWoZfXHYx";

// get coordinates via html geolocation api
var map_ = document.querySelector(".mapholder");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    map_.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  map_.innerHTML =
    "Latitude: " +
    position.coords.latitude +
    "<br>Longitude: " +
    position.coords.longitude;
}

const lat = 30.588059799999996;
const long = -96.3230157;

// Yelp API querying
const options = {
  hostname: "api.yelp.com",
  path: `/v3/businesses/search?term=tacos&latitude=${lat}&longitude=${long}`,

  headers: {
    Authorization: `Bearer ${apiKey}`
  }
};

https
  .get(options, res => {
    let data = "";

    // it's coming in in buffer chunks
    // so we lump all of it into "data" up there
    res.on("data", chunk => {
      data += chunk;
    });

    // Once the buffer's done, it sends this 'end' signal
    // This is where we can use JSON.parse() to parse the buffer data into something human readable
    res.on("end", () => console.log(JSON.parse(data)));
  })
  .on("error", e => {
    console.error(e);
  });

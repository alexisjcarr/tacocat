// const https = require("https");
// const XMLHttpRequest = require('xhr2');

const apiKey =
  "rJuKdTen_ktUx0Mls6culJDA0P3yXXP5FoajDMiozWFFJOcxfgNejA-LL5ejEt17ihVzEvduWdvVs9Nmb-RD0IIyZwOfiHPl415Rm2t-tS1-8Ezyat6J1f3PWoZfXHYx";

// get coordinates via html geolocation api
var map_ = document.querySelector(".container .app .mapholder");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    map_.innerHTML = "Geolocation is not supported by this browser.";
  }
}

const makeRequest = (latitude, longitude) => {
  const url = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=tacos&latitude=${latitude}&longitude=${longitude}&sort_by=distance`;
  const request = new XMLHttpRequest();

  request.onload = function() {
    const data = JSON.parse(this.responseText);

    const restaurants = data.businesses.map(taco => {
      return [taco.name,`, ${taco.distance} meters away, `, `${taco.location.address1}; `];
    });

    const ans = [];

    for (i = 0; i < 20; i++) {
      for (j = 0; j < 3; j++) {
        console.log(restaurants[i][j]);
        ans.push(restaurants[i][j]);
        map_.innerHTML += '\n' + restaurants[i][j] + '\n';
      }
    }

    return ans;
  };

  request.open("GET", url);
  request.setRequestHeader("Authorization", `Bearer ${apiKey}`);
  request.send();
};

function showPosition(position) {
  // map_.innerHTML =
  //   "Latitude: " +
  //   position.coords.latitude +
  //   "<br>Longitude: " +
  //   position.coords.longitude;

  const req = makeRequest(position.coords.latitude, position.coords.longitude);
  map_.innerHTML = req;
}


// function findTacos(lat, long) {
//     // Yelp API querying with https (for deployment)
//     const request = new XMLHttpRequest();

//     request.open('GET', `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=tacos&latitude=${lat}&longitude=${long}`);
//     request.setRequestHeader(Authorization, `Bearer ${apiKey}`);

//     request.onload = function () {
//         const data = JSON.parse(this.response)

//         if (request.status >= 200 && request.status < 400) {
//             data.forEach(taqueria => {
//                 return taqueria.businesses.name;
//             })
//         } else {
//             console.log('error')
//         }

//     }

//     request.send();

// }

// Yelp API querying with https (for testing)
// const lat = 30.588068;
// const long = -96.32302159999999;

// const options = {
//   hostname: "api.yelp.com",
//   path: `/v3/businesses/search?term=tacos&latitude=${lat}&longitude=${long}`,

//   headers: {
//     Authorization: `Bearer ${apiKey}`
//   }
// };

// https
//   .get(options, res => {
//     let data = "";

//     // it's coming in in buffer chunks
//     // so we lump all of it into "data" up there
//     res.on("data", chunk => {
//       data += chunk;
//     });

//     // Once the buffer's done, it sends this 'end' signal
//     // This is where we can use JSON.parse() to parse the buffer data into something human readable
//     res.on("end", () => console.log(JSON.parse(data)));
//   })
//   .on("error", e => {
//     console.error(e);
//   });




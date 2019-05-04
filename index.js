const https = require("https");

// Yelp API querying
const clientKey = 'Tk50ZkP7y0dKQSX3FZ77Bw';
const apiKey = 'rJuKdTen_ktUx0Mls6culJDA0P3yXXP5FoajDMiozWFFJOcxfgNejA-LL5ejEt17ihVzEvduWdvVs9Nmb-RD0IIyZwOfiHPl415Rm2t-tS1-8Ezyat6J1f3PWoZfXHYx';

// const request = new XMLHttpRequest();
// request.open('GET', `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=tacos`);
// request.setRequestHeader(Authorization, `Bearer ${apiKey}`);

// request.onload = function () {
//     const data = JSON.parse(this.response);

//     if(request.status >= 200 && request.status < 400) {
//         data.forEach(taqueria => {
//             console.log(taqueria)
//         })
//     } else {
//         console.log('error')
//     }

// }

// request.send()

const lat =  30.588059799999996;
const long = -96.3230157;

const options = {
    hostname: 'api.yelp.com',
    path: `/v3/businesses/search?term=tacos&latitude=${lat}&longitude=${long}`,

    headers: {
        Authorization: `Bearer ${apiKey}`
    }
}

https.get(options, (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);

  res.on('data', (d) => {
    console.log(d);
  });

}).on('error', (e) => {
  console.error(e);
});

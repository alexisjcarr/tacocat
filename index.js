// Yelp API querying
const clientKey = 'Tk50ZkP7y0dKQSX3FZ77Bw';
const apiKey = 'rJuKdTen_ktUx0Mls6culJDA0P3yXXP5FoajDMiozWFFJOcxfgNejA-LL5ejEt17ihVzEvduWdvVs9Nmb-RD0IIyZwOfiHPl415Rm2t-tS1-8Ezyat6J1f3PWoZfXHYx';

const request = new XMLHttpRequest();
request.open('GET', `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=tacos`);
request.setRequestHeader(Authorization, `Bearer ${apiKey}`);

request.onload = function () {
    const data = JSON.parse(this.response);

    if(request.status >= 200 && request.status < 400) {
        data.forEach(taqueria => {
            console.log(taqueria)
        })
    } else {
        console.log('error')
    }

}

request.send()
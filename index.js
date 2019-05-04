var x = document.getElementById("demo");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    var latlon =
        position.coords.latitude + "," + position.coords.longitude;

    var img_url =
        "https://maps.googleapis.com/maps/api/staticmap?center=" +
        latlon +
        "&zoom=14&size=400x300&sensor=false&key=AIzaSyD9x4RyqdjQYmR6tGEoL5K8i_wa14Put0U ";

    document.getElementById("mapholder").innerHTML =
        "<img src='" + img_url + "'>";
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred.";
            break;
    }
}

const apiKey =
    "rJuKdTen_ktUx0Mls6culJDA0P3yXXP5FoajDMiozWFFJOcxfgNejA-LL5ejEt17ihVzEvduWdvVs9Nmb-RD0IIyZwOfiHPl415Rm2t-tS1-8Ezyat6J1f3PWoZfXHYx";

fetch(
    `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=tacos&location=${location}&sort_by=${sortBy}`, {
        headers: {
            Authorization: `Bearer ${apiKey}`
        }
    }
)
    .then(response => {
        return response.json();
    })
    .then(jsonResponse => {
        if (jsonResponse.businesses) {
            return jsonResponse.businesses.map(business => {
                return {
                    id: business.id,
                    imageSrc: business.image_url,
                    name: business.name,
                    address: business.location.address1,
                    city: business.location.city,
                    state: business.location.state,
                    zipCode: business.location.zip_code,
                    category: business.categories[0].title,
                    rating: business.rating,
                    reviewCount: business.review_count
                };
            });
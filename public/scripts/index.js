$(document).ready(function () {
  let reportData;
  let fileName = window.location.href.split('?')[1].split('=')[1]
  fetch(`../assets/reports/${fileName}.json`)
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonObj) {
      reportData = jsonObj;
      addRating(jsonObj.rating);
      addAudit(jsonObj.validUntil, jsonObj.auditedBy);
      addRestaurantDetails(jsonObj.dishImageSrc, jsonObj.restaurantName, jsonObj.restaurantAddr, jsonObj.restaurantRating, jsonObj.color);
      addMobileRating(jsonObj.rating);
    });
});

function addRating(rating) {
  const rateThreeSrc = './assets/images/Rating 3.png';
  const rateFourSrc = './assets/images/Rating 4.png';
  const rateFiveSrc = './assets/images/Rating 5.png';

  var imageSrc = '';
  switch (rating) {
    case 3: imageSrc = rateThreeSrc; break;
    case 4: imageSrc = rateFourSrc; break;
    case 5: imageSrc = rateFiveSrc; break;
    default: imageSrc = '';
  }
  $('.rating-divs img').attr('src', imageSrc);
}
function addAudit(validUntil, auditedBy) {
  $('.valid-until').text(validUntil);
  $('.audited-by').text(auditedBy);
}

function addRestaurantDetails(src, name, addr, rating, color) {
  $('.restaurant-info img').attr('src', src);
  $('.restaurant-details .name').text(name);
  $('.restaurant-details .location').text(addr);
  $('.restaurant-details .res-rating').text(rating);
  $('.restaurant-details .res-rating').css('background', color);
}

function addMobileRating(rating) {
  const rateThreeSrc = './assets/images/RatingPhone 3.png';
  const rateFourSrc = './assets/images/RatingPhone 4.png';
  const rateFiveSrc = './assets/images/RatingPhone 5.png';

  var imageSrc = '';
  switch (rating) {
    case 3: imageSrc = rateThreeSrc; break;
    case 4: imageSrc = rateFourSrc; break;
    case 5: imageSrc = rateFiveSrc; break;
    default: imageSrc = '';
  }
  console.log(imageSrc)
  $('.rating-on-mobile').css('background-image', `url('${imageSrc}')`);
}
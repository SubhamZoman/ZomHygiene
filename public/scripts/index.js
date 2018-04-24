$(document).ready(function () {
  const rating = 5;
  const validUntil = '04 MARCH 2019';
  const auditedBy = 'EQUINOX LABS';
  const dishImageSrc = 'http://via.placeholder.com/432x240';
  const restaurantName = 'Burger King Cafe';
  const restaurantAddr = 'DLF Phase 3, Gurgaon';
  const restaurantRating = 3.8;

  addRating(rating);
  addAudit(validUntil, auditedBy);
  addRestaurantDetails(dishImageSrc, restaurantName, restaurantAddr, restaurantRating);
  addMobileRating(rating);
});

function addRating(rating){
  const rateThreeSrc = './assets/images/Rating 3.png';
  const rateFourSrc = './assets/images/Rating 4.png';
  const rateFiveSrc = './assets/images/Rating 5.png';
  
  var imageSrc = '';
  switch(rating){
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

function addRestaurantDetails(src, name, addr, rating) {
  $('.restaurant-info img').attr('src', src);
  $('.restaurant-details .name').text(name);
  $('.restaurant-details .location').text(addr);
  $('.restaurant-details .res-rating').text(rating);
}

function addMobileRating(rating){
  const rateThreeSrc = './assets/images/RatingPhone 3.png';
  const rateFourSrc = './assets/images/RatingPhone 4.png';
  const rateFiveSrc = './assets/images/RatingPhone 5.png';
  
  var imageSrc = '';
  switch(rating){
    case 3: imageSrc = rateThreeSrc; break;
    case 4: imageSrc = rateFourSrc; break;
    case 5: imageSrc = rateFiveSrc; break;
    default: imageSrc = '';
  }
  console.log(imageSrc)
  $('.rating-on-mobile').css('background-image', `url('${imageSrc}')`);
}
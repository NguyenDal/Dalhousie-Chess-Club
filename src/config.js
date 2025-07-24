const BASE_URL = 'http://localhost:5001';

const getImageUrl = (imgurl) => {
  return `${BASE_URL}${imgurl}`;
};


module.exports = {
  BASE_URL,
  getImageUrl
};

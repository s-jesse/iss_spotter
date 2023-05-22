const request = require('request-promise-native');

// /*
//  * Requests user's ip address from https://www.ipify.org/
//  * Input: None
//  * Returns: Promise of request for ip data, returned as JSON string
//  */
const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};
const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`http://ipwho.is/${ip}`);
};
/* 
 * Input: None
 * Returns: Promise for fly over data for users location
 */
const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};
/*
* Requests data from https://iss-flyover.herokuapp.com using provided lat/long data
* Input: JSON body containing geo data response from ipwho.is
* Returns: Promise of request for fly over data, returned as JSON string
*/
const fetchISSFlyOverTimes = function(body) {
 const { latitude, longitude } = JSON.parse(body);
 const url = `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
 return request(url);
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };

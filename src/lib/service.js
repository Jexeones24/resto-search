const API_KEY = 'AIzaSyCzeDIyQkrczUrfCcEXRdlzdRik5HG8kmg'

export const getCoords = (term) => {
  return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${term}&key=${API_KEY}`)
    .then(resp => resp.json())
}

export const getPredictions = (address, lat, lng) => {
  return fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${address}&types=geocode&location=${lat},${lng}&radius=500&key=AIzaSyCzeDIyQkrczUrfCcEXRdlzdRik5HG8kmg`)
  .then(resp => resp.json())
}

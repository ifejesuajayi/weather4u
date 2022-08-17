const key = 'mR5ZyFJjdLhMvxHE3LRo8UhWY13hRGyw'

const getCondition = async (keyValue) => {
    const response = await fetch(`http://dataservice.accuweather.com/currentconditions/v1/${keyValue}?apikey=${key}`)
 
    const data = await response.json();
 
    return data[0]
 }

const getCity = async (city) => {
    const response = await fetch (`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${key}&q=${city}`);

    const data = await response.json();

    return data[0]
}
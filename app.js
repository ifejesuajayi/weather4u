const form = document.querySelector('form');
let card = document.querySelector('.card');
const details = document.querySelector('.details')
const time = document.querySelector('.time')
const icon = document.querySelector('.icon')


const updateUI = (data) => {
    const cityDeets = data.cityDeets;
    const condition = data.condition;

    details.innerHTML = `
      <h5 class="my-3">${cityDeets.EnglishName}</h5>
      <div class="my-3">${condition.WeatherText}</div>
      <div class="display-4 my-4">
        <span>${condition.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
      </div>
    `
    let iconSrc = `img/icons/${condition.WeatherIcon}.svg`
    icon.setAttribute('src', iconSrc)


    let timeSrc = null;
    if(condition.IsDayTime){
        timeSrc = 'img/day.svg'
    }else {
        timeSrc = 'img/night.svg'
    }
    time.setAttribute('src', timeSrc)

    if(card.classList.contains('d-none')){
        card.classList.remove('d-none')
    }
}

const updateLocation = async (city) => {
    const cityDeets = await getCity(city)
    const condition = await getCondition(cityDeets.Key)

    return {cityDeets,condition};
}
form.addEventListener('submit', (e) => {

    const inputValue = form.city.value

    form.reset()

    const preloader = document.querySelector('.preloader')
    

    // if(e.target.children[1].classList.contains('form-control')){
    //     preloader.style.display = 'flex'
    //     setTimeout(() => {
    //         preloader.remove()
    //     },2000);
    // }else{
    //     console.log('false')
    // }

    updateLocation(inputValue)
    .then(data => {
        updateUI(data)
        // preloader.classList.add('hidden')
        // card.classList.remove('hidden')
    })
    .catch(error => console.log(error))

    e.preventDefault();
})



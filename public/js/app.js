
// fetch('http://puzzle.mead.io/puzzle').then(response => {
//     response.json().then((data) => console.log(data))
// })

// fetch('http://api.weatherstack.com/current?access_key=27e4e75d8e8b4128b6b76ddaf2124ac9&query=42.3605,-71.0596').then(response => response.json().then(data => console.log(data.current.weather_descriptions[0])))


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From JS';

weatherForm.addEventListener('submit',(event) => {
    event.preventDefault();

    messageOne.textContent = 'Loading.....'
    messageTwo.textContent = '';
    const location = search.value;
    fetch(`/weather?address=${location}`).then(response => response.json().then(data => {
    if(data.error) {
        messageOne.textContent = data.error;
    } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
    }

}))
})
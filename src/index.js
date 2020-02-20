console.log('%c HI', 'color: firebrick')

document.addEventListener('DOMContentLoaded', function() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"

    const imgContainer = document.querySelector('#dog-image-container')
    fetch(imgUrl)
    .then(resp => resp.json())
    .then(json => addDogs(json.message));

    function addDogs(json) {
        json.forEach(dog => {
            let imageElement = document.createElement('img')
            imageElement.src = dog
            imgContainer.appendChild(imageElement)
        });
    }

    const dogList = document.querySelector('#dog-breeds')
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'

    fetch(breedUrl)
    .then(resp => resp.json())
    .then(json => addBreedList(json.message));

    function addBreedList(json) {
        Object.keys(json).forEach(breed => {
            let breedElement = document.createElement('li')
            breedElement.innerText = breed
            dogList.appendChild(breedElement)
            breedElement.addEventListener('click', function(e) {
                e.target.style.color = randomColor()
            })
        })
    }



    function randomColor() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }

    let breedDropdown = document.querySelector('#breed-dropdown');
    breedDropdown.addEventListener('change', function (e) {
        dogList.innerHTML = '';
        fetch(breedUrl)
        .then(resp => resp.json())
        .then(json => {
            let breeds = Object.keys(json.message).filter(breed => breed.startsWith(e.target.value))
            breeds.forEach(breed => {
                let breedElement = document.createElement('li')
                breedElement.innerText = breed
                dogList.appendChild(breedElement)
                breedElement.addEventListener('click', function(e) {
                    e.target.style.color = randomColor()
                })
            })
        });
    });
})
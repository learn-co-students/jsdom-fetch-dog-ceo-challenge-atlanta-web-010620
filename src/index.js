console.log('%c HI', 'color: firebrick')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"; 

// fetch the image data 
function fetchImg(){
    fetch(imgUrl)
    // .then(response => console.log(response))
    .then(response => response.json())
    .then(json => renderImages(json["message"]))
}



function renderImages(jsonFile){
    // debugger;
    jsonFile.forEach(image => {
        let newImg = document.createElement('img'); 
        newImg.src = image; 
        // document.querySelector("#dog-image-container").appendChild(newImg); 
    })
}

fetchImg(); 


/* ----------------------------
list dogs 
*/
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
const dogList = document.querySelector("#dog-breeds")
function fetchBreeds (){
    fetch(breedUrl)
    .then(response => response.json())
    .then(json => renderDogs(json["message"]))
}

function renderDogs(json){
    console.log(json);
    // clear listing 
    dogList.innerHTML = ""
    for (const dog in json){
            let newDogListing = document.createElement('li'); 
            newDogListing.innerHTML = dog; 
            dogList.appendChild(newDogListing); 
            // debugger;
            newDogListing.addEventListener('click',function(e){
                newDogListing.setAttribute("style", `color:rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`)
            })
        }
        // add listener for changing color 
        const dogListItems = document.querySelectorAll("#dog-breeds li");
        for (dog in dogListItems){
        }

}

// fetchBreeds();  

/*----------------------------
filter dogs by breed 
*/

function fetchBreedsByName (){
    fetch(breedUrl)
    .then(response => response.json())
    .then(json => renderDogsByName(json["message"]))
}


function renderDogsByName(json){
        const letter = document.querySelector("#breed-dropdown").value; 
        // clear listing 
        dogList.innerHTML = ""
        let dogs = Object.keys(json);

        dogs.forEach(function(dog){
            if (letter === ""){
                let newDogListing = document.createElement('li'); 
                newDogListing.innerHTML = dog; 
                dogList.appendChild(newDogListing); 
                // add listener for changing color 
                newDogListing.addEventListener('click',function(e){
                    newDogListing.setAttribute("style", `color:rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`)
                })
            }else if (dog[0]===letter){
                let newDogListing = document.createElement('li'); 
                newDogListing.innerHTML = dog; 
                dogList.appendChild(newDogListing); 
                // add listener for changing color 
                newDogListing.addEventListener('click',function(e){
                    newDogListing.setAttribute("style", `color:rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`)
                })
            }
        })        
}

fetchBreedsByName(); 

// add listener for changing the value of breed-dropdown 
const breedDropdown = document.querySelector("#breed-dropdown"); 
breedDropdown.addEventListener('change', function(e){
    fetchBreedsByName(); 
})

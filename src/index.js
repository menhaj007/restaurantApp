const BASE_URL = "http://localhost:3000/menu/";

fetchFoods()



function fetchFoods() {
    fetch(BASE_URL)
    .then(r => r.json())
    .then(data => data.forEach(addFoods))
}

function addFoods(food) {
    const foodBanner = document.createElement('h4')
    foodBanner.className = "food-name"
    foodBanner.innerText = food.name
    
    document.querySelector('#banner').appendChild(foodBanner)
}

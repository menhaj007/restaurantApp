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
displayFood();
function displayFood() {
    document.querySelector('#banner').addEventListener('click', (e) => {
        console.log(e.target.value);
        const foodImg = document.createElement('img')
        // foodImg.src = food.image 

        const foodName = document.createElement('h4')
        // foodName.innerText = food.name

        const foodCal = document.createElement('h4')
        // foodCal.innerText = food.calories

        const foodRev = document.createElement('h4')
        // foodRev.innerText = food.review

        document.querySelector('#food-info').append(foodImg, foodName, foodCal, foodRev)
    })
}
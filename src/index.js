const BASE_URL = "http://localhost:3000/menu/";

fetchFoods()



function fetchFoods() {
    fetch(BASE_URL)
    .then(r => r.json())
    .then(data => data.forEach(addFoods))
}

function addFoods(food) {
    const foodItem = document.createElement('h4')
    foodItem.className = "food-name"
    foodItem.innerText = food.name
    foodItem.id = food.id
    // console.log(foodItem);
    
    document.querySelector('.banner').appendChild(foodItem)

}
displayFood();
function displayFood() {
    document.querySelector('.banner').addEventListener('click', (e) => {
         const foodId = e.target.id
        //  console.log(foodId, e.target)
        ///url+id
        fetch(BASE_URL+foodId)
        .then(res => res.json())
        .then(addToSubContainer)
        
    })
}

function addToSubContainer(food) {
    const foodName = document.createElement('h4')
    const foodImage = document.createElement('img')
    const foodCal = document.createElement('h4')
    const foodRev = document.createElement('h4')
        
    foodImage.src = food.image 
    foodName.innerText = food.name
    foodCal.innerText = food.calories
    foodRev.innerText = food.review
    
    const foodInfo = document.querySelector('#food-info')
    foodInfo.innerText = ""
    foodInfo.append(foodName, foodImage, foodCal, foodRev)


   

}
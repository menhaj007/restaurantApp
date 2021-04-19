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
    if (food.review == 0) {
        foodRev.innerHTML = "&#9734";
        foodRev.style.fontSize = "2rem";
        foodRev.style.color = "gray";
    

    } else if (food.review ==1) {
        foodRev.innerHTML = "<p class='star'>⭐</p>";
    } else if (food.review == 2) {
        foodRev.innerHTML = "<p class='star'>⭐⭐</p>";
    } else if (food.review == 3) {
        foodRev.innerHTML = "<p class='star'>⭐⭐⭐</p>";
    } else if (food.review == 4) {
        foodRev.innerHTML = "<p class='star'>⭐⭐⭐⭐</p>";
    }   else {
        foodRev.innerHTML = "<p class='star'>⭐⭐⭐⭐⭐</p>";
    }
    
    const foodInfo = document.querySelector('#food-info')
    foodInfo.innerText = ""
    foodInfo.append(foodName, foodImage, foodCal, foodRev)

    
   

}
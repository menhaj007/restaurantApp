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
    const foodName = document.createElement('h3')
    const foodImage = document.createElement('img')
    const foodCal = document.createElement('h4')
    const foodRev = document.createElement('h4')
    const foodCom = document.createElement('h4')
        
    foodImage.src = food.image 
    foodName.innerText = food.name
    foodCal.innerText = food.calories
    foodCom.innerText = food.comment
    

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

    //getID
    let foodId = food.id;
    // console.log(foodId);
    
    const foodInfo = document.querySelector('#food-info')
    foodInfo.innerText = ""
    foodInfo.append(foodName, foodImage, foodCal, foodRev, foodCom)
    
    
    const form = document.createElement('form')
    const review = document.createElement('input')
    const rating = document.createElement('input')
    const submit = document.createElement('input')
    
    review.name = "comment";
    review.id = "reviewId";
    review.type = "text";
    
    rating.name = "rating";
    rating.id = "ratingId"
    rating.type = "text";
    submit.type="submit";
    
    form.appendChild(review);
    form.appendChild(submit);
    
    // console.log(review, submit);
    
    form.addEventListener("submit", e => {
        e.preventDefault();
        
        const newReviewId = e.target.reviewId.value;
        
        let tmpString = food.comment.toString();
        tmpString += ", " + newReviewId;
        let tmpArray = new Array();
        tmpArray = tmpString.split(",")
        console.log(tmpArray);

        let tmpObj = {
            "id": food.id,
            "name": food.name,
            "image": food.image,
            "calories": food.calories,
            "review": food.review.id,
            "comment": tmpArray
          }

        const reqObj = {
            headers: {'Content-Type': "application/json"},
            method: "PATCH",
            body: JSON.stringify(tmpObj)
        }
        fetch(BASE_URL+ foodId, reqObj)
        .then(r => r.json())
        .then(
            console.log
        )
        
        e.target.reset();
        
        
        
    })
    
    
    
    
    document.querySelector('#form-review').appendChild(form)
    

    
   

}
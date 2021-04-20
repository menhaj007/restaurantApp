const BASE_URL = "http://localhost:3000/menu/";
//const showForm = false; // c
const displayForm = document.getElementById("form-comment");
// displayForm.style.display = "none";
fetchFoods()
//test


function fetchFoods() {
    fetch(BASE_URL)
    .then(r => r.json())
    .then(data => data.forEach(addFoodToBanner))
}

function addFoodToBanner(food) {
    const foodItem = document.createElement('h4')
    foodItem.className = "food-name"
    foodItem.innerText = food.name
    foodItem.id = food.id
    // console.log(foodItem);
    
    document.querySelector('.banner').appendChild(foodItem)

}
renderFood();
function renderFood() {
    document.querySelector('.banner').addEventListener('click', (e) => {
         const foodId = e.target.id
         
        //  console.log(foodId, e.target)
        document.querySelector(".food-container").id = foodId;
        document.querySelector("#form-review").innerText = "";
        handleForm(foodId)
        ///url+id
       
        fetch(BASE_URL+foodId)
        .then(res => res.json())
        .then(addFoodToFoodContainer)
        
    })
}
// let currentObj = 0;
function addFoodToFoodContainer(food) {
    const foodName = document.createElement('h3')
    const foodImage = document.createElement('img')
    const foodCal = document.createElement('h4')
    const foodRev = document.createElement('h4')
    const foodCom = document.createElement('h4')

    // const btn = document.createElement("button");
        
    foodImage.src = food.image 
    foodName.innerText = food.name
    foodCal.innerText = food.calories
    foodCom.innerText = food.comment

    // btn.name = "button";
    // btn.type = "button";
    // btn.className = "button";
    // btn.innerText = "Click here to leave a review";
    // btn.id = food.id;
    
    // document.getElementById("button").appendChild(btn);
    // // console.log(domBtn);

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
    currentObj= food.id;
    // console.log(foodId);
    
    const foodInfo = document.querySelector('#food-info')
    foodInfo.innerText = ""
    foodInfo.append(foodName, foodImage, foodCal, foodRev, foodCom);
    
}

// handleForm();
function handleForm(id) {
    const foodId =  id;
    


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
    document.querySelector('#form-review').appendChild(form)

    form.addEventListener("submit", e => {
        e.preventDefault();
        // console.log(e.target);
        let newValue = e.target.reviewId.value;
        
        fetch(BASE_URL+foodId)
        .then(res => res.json())
        .then(data =>  {
            saveToDB(foodId,newValue, data);
        })

        e.target.reset();
        
    })

    
}



function saveToDB(foodId, newValue, oldData) {

        let tmpString = oldData.comment.toString();
        tmpString += ", " + newValue;
        let tmpArray = new Array();
        tmpArray = tmpString.split(",")
        // console.log(tmpArray);


    tmpObj = {
                "id": oldData.id,
                "name": oldData.name,
                "image": oldData.image,
                "calories": oldData.calories,
                "review": oldData.review.id,
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
                addFoodToFoodContainer
            );
}

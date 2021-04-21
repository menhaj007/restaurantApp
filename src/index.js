const BASE_URL = "http://localhost:3000/menu/";
//const showForm = false; // c
const displayForm = document.getElementById("form-comment");
// displayForm.style.display = "none";
fetchFoods()
renderFood();
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

function renderFood() {
    document.querySelector('.banner').addEventListener('click', (e) => {
         const foodId = e.target.id
         
        //  console.log(foodId, e.target)
        document.querySelector(".food-container").id = foodId;
        document.querySelector("#form-review").innerText = "";
        document.querySelector("#form-rating").innerText = "";
        handleForm(foodId);
        
        handleRatingForm(foodId);
       
        fetch(BASE_URL+foodId)
        .then(res => res.json())
        .then(addFoodToFoodContainer)
        
    })
}

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
    

    
    const foodInfo = document.querySelector('#food-info')
    foodInfo.innerText = ""
    foodInfo.append(foodName, foodImage, foodCal, foodRev, foodCom);
    // handleRatingForm()
   
}

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

        // let tmpString = oldData.comment.toString();
        // tmpString += ", " + newValue;
        // let tmpArray = new Array();
        // tmpArray = tmpString.split(",")
        // console.log(tmpArray); 
         
        oldData.comment.push(newValue);


    tmpObj = {
                "id": oldData.id,
                "name": oldData.name,
                "image": oldData.image,
                "calories": oldData.calories,
                "review": oldData.review, ///Note oldData.review.id
                "comment": oldData.comment
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


function handleRatingForm(id) {
    const formHTML = document.createElement("form");
    formHTML.innerHTML = 
    `<form>
        <input type="radio" class="star-input" name="rating" id="star-1" value="1">
        <label for="star-1" class="star"><i class="fas fa-star"></i></label>
        <input type="radio" class="star-input" name="rating" id="star-2" value="2">
        <label for="star-2" class="star"><i class="fas fa-star"></i></label>
        <input type="radio" class="star-input" name="rating" id="star-3" value="3">
        <label for="star-3" class="star"><i class="fas fa-star"></i></label>
        <input type="radio" class="star-input" name="rating" id="star-4" value="4">
        <label for="star-4" class="star"><i class="fas fa-star"></i></label>
        <input type="radio" class="star-input" name="rating" id="star-5" value="5" checked>
        <label for="star-5" class="star"><i class="fas fa-star"></i></label>
        <button type="submit">Send</button>
    </form>`;

    document.querySelector("#form-rating").appendChild(formHTML)
        formHTML.addEventListener('submit', event => {
            event.preventDefault();

            const formData = new FormData(event.target);
            const rating = formData.get('rating');
        // console.log(rating);

        fetch(BASE_URL+id)
        .then(res => res.json())
        .then(data =>  {
            saveToDbRatings(id,rating, data);
            // console.log
        })

    });
    
}

function saveToDbRatings(foodId, newValue, oldData) {
     
    // let a = parseInt(newValue);
    // let b = parseInt(oldData.review)
    // let result = a + b;
    // oldData.review = result;
    // [1,2,3,4] / arr.length

    // let addNewValue = parseInt(newValue) + parseInt(oldData.review)
    // oldData.review = addNewValue;
    // console.log("New added value: ",addNewValue, "old", oldData.review, "new", newValue);
    oldData.review = newValue; // reseting new value. newValue


tmpObj = {
            "id": oldData.id,
            "name": oldData.name,
            "image": oldData.image,
            "calories": oldData.calories,
            "review": oldData.review,
            "comment": oldData.review
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
            // console.log
        );
}

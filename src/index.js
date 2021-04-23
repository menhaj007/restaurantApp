const BASE_URL = "http://localhost:3000/menu/";
//const showForm = false; // c
// const displayForm = document.getElementById("form-comment");
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
    const foodName = document.querySelector(".food-name");
    const foodItem = document.createElement('h4')
    foodItem.className = "food-name"
    foodItem.innerText = food.name    
    if (food.name == "Pizza") {
        foodItem.style.backgroundImage = "url('likemeat-CbNAuxSZTFo-unsplash.jpg')";
    } else if (food.name =="Cheese Burger" ) {
        foodItem.style.backgroundImage = "url('likemeat-NxIcsLJbACU-unsplash.jpg')";
    } else if (food.name =="12oz Steak") {
        foodItem.style.backgroundImage = "url('loija-nguyen-NYBnDWeOX2c-unsplash.jpg')";
        // foodItem.style.backgroundImage = "url('sunorwind-Z4CvBOpOi6w-unsplash.jpg')";
    } else if (food.name =="Ceasar Salad") {
        foodItem.style.backgroundImage = "url('rachel-park-hrlvr2ZlUNk-unsplash.jpg')"; 
    } else if (food.name == "Rack of Ribs") {
        foodItem.style.backgroundImage = "url('sean-stone-0hOHNA3M6Ds-unsplash.jpg')";  
    } else if (food.name == "Lamb Chops") {
        foodItem.style.backgroundImage = "url('sam-carter-GHOiyov2TSQ-unsplash.jpg')";  
    }
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
        handleForm(foodId);
        
        document.querySelector("#form-rating").innerText = "";
        handleRatingForm(foodId);
       
        fetch(BASE_URL+foodId)
        .then(res => res.json())
        .then(addFoodToFoodContainer)
        
    })
}

function addFoodToFoodContainer(food) {
    const foodName = document.createElement('h2')
    const foodImage = document.createElement('img')
    const foodCal = document.createElement('h5')
    const foodRev = document.createElement('h4')
    const foodCom = document.createElement('p')

    // const btn = document.createElement("button");
        
    foodImage.src = food.image 
    foodImage.className = "test";
    
    foodName.innerText = food.name
    foodCal.innerText = "Calories: " + food.calories;

    let tmpString = food.comment.reverse().toString();
    let tmpArr = new Array();
    tmpArr = tmpString.split(",");
    console.log(tmpArr);
    tmpString= tmpArr.join("\n ");
        
         
    
    console.log(tmpString);
    foodCom.innerText = tmpString;

    // btn.name = "button";
    // btn.type = "button";
    // btn.className = "button";
    // btn.innerText = "Click here to leave a review";
    // btn.id = food.id;
    
    // document.getElementById("button").appendChild(btn);
    // // console.log(domBtn);

    var result = 0;
    var likes = 0;
    for (let i = 0; i < 5; i++) {
        result += (i+1.0) * food.review[i];
        likes += food.review[i];

    }
    let finalResult = result/likes;
    // console.log("res",finalResult);

     if (finalResult >= 1.0 && finalResult < 2.0) {
        foodRev.innerText = `Customer review
            Average: ${finalResult.toFixed(2)} \nRating: ⭐`;
        
    } else if (finalResult >= 2.0  && finalResult < 3.0) {
        foodRev.innerText = `Customer review
            Average: ${finalResult.toFixed(2)} \nRating: ⭐⭐`;
    } else if (finalResult >= 3.0  && finalResult < 4.0) {
        foodRev.innerText = `Customer review
            Average: ${finalResult.toFixed(2)} \nRating: ⭐⭐⭐`;
    } else if (finalResult >= 4.0  && finalResult < 5.0) {
        foodRev.innerText = `Customer review
            Average: ${finalResult.toFixed(2)} \nRating: ⭐⭐⭐⭐`;
    }   else if (finalResult >= 5.0 ){
        foodRev.innerText = `Customer review
            Average: ${finalResult.toFixed(2)} \nRating: ⭐⭐⭐⭐⭐`;
    } else {
        // console.log(finalResult);
        foodRev.innerText = "&#9734";
        foodRev.style.fontSize = "2rem";
        foodRev.style.color = "gray";
    }
    // console.log(finalResult);
    
    
    
    

    
    const foodInfo = document.querySelector('#food-info')
    foodInfo.innerText = "";
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
    review.placeholder = "Please write your review and hit the enter key to submit."
    
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
        <button type="submit">Submit Rating</button>
    </form>`;

    document.querySelector("#form-rating").appendChild(formHTML)
        formHTML.addEventListener('submit', event => {
            event.preventDefault();

            const formData = new FormData(event.target);
            let rating = formData.get('rating');
            rating = parseInt(rating, 10);
        // console.log(typeof rating);
        console.log(rating);
            

        fetch(BASE_URL+id)
        .then(res => res.json())
        .then(data =>  {
            saveToDbRatings(id,rating, data);
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
    // oldData.review.push(newValue); // reseting new value. newValue
    // oldData.review

    let tmpValue = 0;
    let tmpArray = new Array();

    if (newValue === 1) {
        tmpArray = [...oldData.review];
        tmpValue = oldData.review[0] + 1;
        tmpArray[0] = tmpValue;
        oldData.review = [...tmpArray];

    } else if (newValue === 2) {
        tmpArray = [...oldData.review];
        tmpValue = oldData.review[1] + 1;
        tmpArray[1] = tmpValue;
        oldData.review = [...tmpArray];

    } else if (newValue === 3) {
        tmpArray = [...oldData.review];
        tmpValue = oldData.review[2] + 1;
        tmpArray[2] = tmpValue;
        oldData.review = [...tmpArray];

    } else if (newValue === 4) {
        tmpArray = [...oldData.review];
        tmpValue = oldData.review[3] + 1;
        tmpArray[3] = tmpValue;
        oldData.review = [...tmpArray];

    } else if (newValue === 5) {
        tmpArray = [...oldData.review];
        tmpValue = oldData.review[4] + 1;
        tmpArray[4] = tmpValue;
        oldData.review = [...tmpArray];

    } 


    console.log(oldData.review);
    // if (newValue >-1 && newValue < 6) {
    //     oldData.review.push(newValue);

    // }
    // console.log(oldData.review);


tmpObj = {
            "id": oldData.id,
            "name": oldData.name,
            "image": oldData.image,
            "calories": oldData.calories,
            "review": oldData.review,
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
            // console.log
        );
}

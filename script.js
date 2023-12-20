// Getting references to HTML elements

const randomMeal=document.getElementById("random-meal");
const popUp=document.getElementById("pop-up");

const searchInput=document.getElementById("search");
const searchResultMeal=document.getElementById('search-result-meal')

const searchResultContainer=document.getElementById("search-result-container")

// Function to fetch and display a random meal
function getRandomMeal(){
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((res)=>res.json())
    .then((res)=>{appendRandomMeal(res.meals[0])})
    .catch((error)=>{console.log(error)})
}

// Initial call to fetch and display a random mea
getRandomMeal();
// Function to append a random meal to the Page
function appendRandomMeal(data) {
  let image = document.createElement("img");
  let h3 = document.createElement("h3");
  let p = document.createElement("h6");
// Setting attributes and content for the elements
  image.src = data.strMealThumb;
  image.style.cursor = 'pointer';
  image.className = 'meal-images';
  h3.innerText = data.strMeal;

  p.innerText = `Category: ${data.strCategory}`;
  p.style.fontSize = '1em';
// Appending elements to the random meal container  
  randomMeal.append(image, h3, p);
  randomMeal.className = 'meal-div';

 // Creating "View Ingredients" button
  let viewIngredientsButton = document.createElement("button");
  viewIngredientsButton.innerText = "View Ingredients";
  viewIngredientsButton.className = "view-ingredients-button";
  viewIngredientsButton.onclick = function () {
    showIngredientsPopup(data);
  };
// Appending the button to the random meal container
  randomMeal.append(viewIngredientsButton);

  // Function to show the ingredients popup

  function showIngredientsPopup(data) {
    let div = document.createElement("div");
    let h4 = document.createElement("h5");
    // Setting content for the elements in the popup
    h4.innerHTML = `<img src="${data.strMealThumb}" id="popup-image" alt="${data.strMeal}"> ${data.strMeal} <i class="fa fa-close" style="width:15%;font-size:30px;color:#121332; text-align:right;cursor:pointer;" onclick="closePopup()"></i>`;
    h4.style.color = 'green';
    div.append(h4);
// Creating and appending ingredient elements to the popup
    for (let i = 1; i <= 20; i++) {
      let p = document.createElement("h5");
      let ingredientKey = `strIngredient${i}`;
      p.innerText = data[ingredientKey];
      div.appendChild(p);
    }
 // Displaying the popup
    popUp.style.display = 'block';
    popUp.innerHTML = '';
    popUp.append(div);
    div.className = 'ingredients-box';
  }
}


// Function to close the popup
function closePopup() {
  popUp.style.display = 'none';
}

// Event listener for search button click
document.addEventListener('DOMContentLoaded', function () {
  
  const searchButton = document.getElementById('buttons');
  searchButton.addEventListener('click', searchMeal);
 // Function to search for meals based on user input
  function searchMeal() {
    
    const searchInput = document.getElementById('search').value;

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchInput}`)
      .then(response => response.json())
      .then(data => {
       
        displaySearchResults(data.meals);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
// Function to display search results
  function displaySearchResults(meals) {
    
    const searchResultsContainer = document.getElementById('search-results');

   
    searchResultsContainer.innerHTML = '';

   // Checking if there are search results
    if (meals) {
      
      meals.slice(0, 50).forEach(meal => {
        const mealCard = createMealCard(meal);
        searchResultsContainer.appendChild(mealCard);
      });
    } else {
       // Displaying a message if no results are found
      searchResultsContainer.innerHTML = '<p>No results found</p>';
    }
  }
// Function to create a meal card for search results
  function createMealCard(meal) {
    
    const mealCard = document.createElement('div');
    mealCard.classList.add('meal-div');

    // Creating and setting attributes for thumbnail image
    const thumbnail = document.createElement('img');
    thumbnail.classList.add('meal-images');
    thumbnail.src = meal.strMealThumb;
    thumbnail.alt = meal.strMeal;
    const mealName = document.createElement('h5');
    mealName.textContent = meal.strMeal;
    // Appending image and name to the meal card
    mealCard.appendChild(thumbnail);
    mealCard.appendChild(mealName);

    return mealCard;
  }
});



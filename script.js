const randomMeal=document.getElementById("random-meal");
const popUp=document.getElementById("pop-up");

const searchInput=document.getElementById("search");
const searchResultMeal=document.getElementById('search-result-meal')

const searchResultContainer=document.getElementById("search-result-container")


function getRandomMeal(){
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((res)=>res.json())
    .then((res)=>{appendRandomMeal(res.meals[0])})
    .catch((error)=>{console.log(error)})
}


getRandomMeal();



function appendRandomMeal(data) {
  let image = document.createElement("img");
  let h3 = document.createElement("h3");
  let p = document.createElement("h6");

  image.src = data.strMealThumb;
  image.style.cursor = 'pointer';
  image.className = 'meal-images';
  h3.innerText = data.strMeal;

  p.innerText = `Category: ${data.strCategory}`;
  p.style.fontSize = '1em';

  randomMeal.append(image, h3, p);
  randomMeal.className = 'meal-div';

  let div = document.createElement("div");
  let h4 = document.createElement("h5");
  h4.innerHTML = `<img src="${data.strMealThumb}" id="popup-image" alt="${data.strMeal}"> ${data.strMeal} <i class="fa fa-close" style="width:15%;font-size:30px;color:#121332; text-align:right;cursor:pointer;" onclick="closePopup()"></i>`;
  h4.style.color = 'green';
  div.append(h4);

  for (let i = 1; i <= 20; i++) {
    let p = document.createElement("h5");
    let ingredientKey = `strIngredient${i}`;
    p.innerText = data[ingredientKey];
    div.appendChild(p);
  }

  image.onclick = function () {
    popUp.style.display = 'block';
    popUp.innerHTML = ''; 
    popUp.append(div);
    div.className = 'ingredients-box';
  };
}


function closePopup() {
  popUp.style.display = 'none';
}



document.addEventListener('DOMContentLoaded', function () {
  
  const searchButton = document.getElementById('buttons');
  searchButton.addEventListener('click', searchMeal);

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

  function displaySearchResults(meals) {
    
    const searchResultsContainer = document.getElementById('search-results');

   
    searchResultsContainer.innerHTML = '';

   
    if (meals) {
      
      meals.slice(0, 9).forEach(meal => {
        const mealCard = createMealCard(meal);
        searchResultsContainer.appendChild(mealCard);
      });
    } else {
      
      searchResultsContainer.innerHTML = '<p>No results found</p>';
    }
  }

  function createMealCard(meal) {
    
    const mealCard = document.createElement('div');
    mealCard.classList.add('meal-div');

    
    const thumbnail = document.createElement('img');
    thumbnail.classList.add('meal-images');
    thumbnail.src = meal.strMealThumb;
    thumbnail.alt = meal.strMeal;
    const mealName = document.createElement('h5');
    mealName.textContent = meal.strMeal;
    mealCard.appendChild(thumbnail);
    mealCard.appendChild(mealName);

    return mealCard;
  }
});



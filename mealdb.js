// Gets the value from input element and calls allMeals function to fetch all meals from server.
function showSearchItems()
{
    const searchValue = document.querySelector('input').value;
    allMeals(searchValue);
}

// Gets all meals data from server and calls displayMeals fucntion to show them on screen.
function allMeals(searchValue)
{
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
    .then(response => response.json())  // Parse the JSON from the response
    .then(data => {
        displayMeals(data);
    })
}

// Displays all meals on the screen.
function displayMeals(meals)
{
    // Deletes previous meal details.
    if(document.querySelector('.meal-details')) document.querySelector('.meal-details').remove();

    // Deletes no result found text.
    if(document.querySelector('.js-noResult')) document.querySelector('.js-noResult').remove();

    // checks wheter the response was null.
    if(!meals.meals) 
    {
        updateCards(meals);

        const message = document.createElement('p');
        message.className = 'js-noResult';
        message.innerHTML = `Sorry! No result found.`;

        const mealContainer = document.querySelector('.meal-container');
        mealContainer.appendChild(message);
    } 
    else updateCards(meals);
}

// Updates card list based on search.
function updateCards(meals)
{
    document.querySelectorAll('.card').forEach(element =>
    {
        element.remove();
    }
    );

    if(!meals.meals) return;

    const mealContainer = document.querySelector('.meal-container');

    meals.meals.forEach(meal => {
        const div = document.createElement("div");
    
        div.classList.add("card");
    
        div.innerHTML = `
            <img class="card-img" src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h2 class="meal-name">${meal.strMeal}</h2>
        `;

        // Add click event listener to each card
        div.addEventListener('click', () => {
            showMealDetails(meal);
        });
    
        mealContainer.appendChild(div);
    });
}

// Meal details displayer fucntionalities.
function showMealDetails(meal) 
{
    // Deletes previous meal details.
    if(document.querySelector('.meal-details')) document.querySelector('.meal-details').remove();

    // Gets the main container to place meal-details.
    const mealDetails = document.querySelector('.meal-details-container');

    // Three divs for showing meal-details.
    const div1 = document.createElement("div");
    const div2 = document.createElement("div");
    const div3 = document.createElement("div");

    // Assigning class names for styling.
    div1.className = 'meal-details';
    div2.className = 'meal-name-img';
    div3.className = 'ingredients-container';

    // Left side: meal image and name.
    div2.innerHTML = `
        <img class="meal-img" src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h2>${meal.strMeal}</h2>
    `;

    // Right side: ingredients list.
    const ingredientsList = document.createElement("ul");

    // Loop to find and add each ingredient.
    for (let i = 1; i <= 10; i++) 
    {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        
        // If an ingredient exists, add it to the list.
        if (ingredient) 
        {
            const listItem = document.createElement("li");
            listItem.textContent = `${measure ? measure : ""} ${ingredient}`;
            ingredientsList.appendChild(listItem);
        } 
        // Stop if there's no more ingredients.
        else break;
    }

    // Add ingredients header and list to div3.
    div3.innerHTML = `<h3>Ingredients</h3>`;
    div3.appendChild(ingredientsList);

    // Append div2 and div3 to div1, then to mealDetails.
    div1.append(div2, div3);
    mealDetails.append(div1);
}
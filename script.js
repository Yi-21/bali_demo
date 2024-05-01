document.addEventListener('DOMContentLoaded', function() {
    const restaurants = ["Restaurant A", "Restaurant B", "Restaurant C", "Restaurant D", "Restaurant E", "Restaurant F", "Restaurant G"];
    let currentRestaurantIndex = 0;
    let categories = {
        "I liked it": [],
        "It was fine": [],
        "I didn't like it": []
    };

    function showRestaurant() {
        if (currentRestaurantIndex < restaurants.length) {
            const restaurant = restaurants[currentRestaurantIndex];
            const container = document.getElementById('restaurantContainer');
            container.innerHTML = `<h2>${restaurant}</h2>
                                   <p>Have you eaten here?</p>
                                   <button onclick="handleInitialResponse(true)">Yes</button>
                                   <button onclick="handleInitialResponse(false)">No</button>`;
        } else {
            document.getElementById('restaurantContainer').innerHTML = "<h2>Thank you for all your responses!</h2>";
        }
    }

    function getRandomElement(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    window.handleInitialResponse = function (visited) {
        if (visited) {
            const container = document.getElementById('restaurantContainer');
            container.innerHTML += `<p>How was your experience?</p>
                                    <button onclick="handleFinalResponse('I liked it')">I liked it</button>
                                    <button onclick="handleFinalResponse('It was fine')">It was fine</button>
                                    <button onclick="handleFinalResponse('I didn't like it')">I didn't like it</button>`;
        } else {
            //alert("Maybe next time!");
            currentRestaurantIndex++;
            showRestaurant();
        }
    };

    window.handleFinalResponse = function (response) {
        categories[response].push(restaurants[currentRestaurantIndex]);
        if (categories[response].length > 1) { // Ensure there is at least one other restaurant for comparison
            let comparisonRestaurant = getRandomElement(categories[response].filter(r => r !== restaurants[currentRestaurantIndex]));
            document.getElementById('restaurantContainer').innerHTML = `<h2>Comparison</h2>
                                                                       <p>Do you prefer ${restaurants[currentRestaurantIndex]} or ${comparisonRestaurant}?</p>
                                                                       <button onclick="finishComparison('${restaurants[currentRestaurantIndex]}')">${restaurants[currentRestaurantIndex]}</button>
                                                                       <button onclick="finishComparison('${comparisonRestaurant}')">${comparisonRestaurant}</button>`;
        } else {
            //alert(`You said: ${response}`);
            currentRestaurantIndex++;
            showRestaurant();
        }
    };

    window.finishComparison = function (favorite) {
        //alert(`You prefer: ${favorite}`);
        currentRestaurantIndex++;
        showRestaurant();
    };

    showRestaurant();
});

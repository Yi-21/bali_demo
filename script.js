document.addEventListener('DOMContentLoaded', function() {
    // Expanded list of restaurants
    const restaurants = ["Restaurant A", "Restaurant B", "Restaurant C", "Restaurant D", "Restaurant E", "Restaurant F", "Restaurant G", "Restaurant H"];
    let currentRestaurantIndex = 0;
    let categories = {
        "I liked it": [],
        "It was fine": [],
        "I didn't like it": []
    };
    let scores = {};

    function showRestaurant() {
        if (currentRestaurantIndex < restaurants.length) {
            const restaurant = restaurants[currentRestaurantIndex];
            const container = document.getElementById('restaurantContainer');
            container.innerHTML = `<h2>${restaurant}</h2>
                                   <p>Have you eaten here?</p>
                                   <button onclick="handleInitialResponse(true)">Yes</button>
                                   <button onclick="handleInitialResponse(false)">No</button>`;
        } else {
            displayFinalScores();
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
            alert("Maybe next time!");
            currentRestaurantIndex++;
            showRestaurant();
        }
    };

    window.handleFinalResponse = function (response) {
        categories[response].push(restaurants[currentRestaurantIndex]);
        scores[restaurants[currentRestaurantIndex]] = scores[restaurants[currentRestaurantIndex]] || 0; // Initialize score if not already
        if (categories[response].length > 1) {
            let comparisonRestaurant = getRandomElement(categories[response].filter(r => r !== restaurants[currentRestaurantIndex]));
            document.getElementById('restaurantContainer').innerHTML = `<h2>Comparison</h2>
                                                                       <p>Do you prefer ${restaurants[currentRestaurantIndex]} or ${comparisonRestaurant}?</p>
                                                                       <button onclick="finishComparison('${restaurants[currentRestaurantIndex]}', '${comparisonRestaurant}')">${restaurants[currentRestaurantIndex]}</button>
                                                                       <button onclick="finishComparison('${comparisonRestaurant}', '${restaurants[currentRestaurantIndex]}')">${comparisonRestaurant}</button>`;
        } else {
            alert(`You said: ${response}`);
            currentRestaurantIndex++;
            showRestaurant();
        }
    };

    window.finishComparison = function (preferred, other) {
        scores[preferred] = (scores[preferred] || 0) + 1; // Increment score for preferred restaurant
        alert(`You prefer: ${preferred}`);
        currentRestaurantIndex++;
        showRestaurant();
    };

    function displayFinalScores() {
        let scoreMessages = Object.keys(scores).map(r => `${r}: ${Math.round((scores[r] / (restaurants.length - 1)) * 10)} / 10`);
        document.getElementById('restaurantContainer').innerHTML = "<h2>Final Scores</h2>" + scoreMessages.join('<br>');
    }
    
    showRestaurant();
});

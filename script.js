document.addEventListener('DOMContentLoaded', function() {
    const restaurants = ["Restaurant A", "Restaurant B", "Restaurant C", "Restaurant D"];
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

    function getRandomElements(arr, count) {
        let shuffled = arr.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
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
        let comparableRestaurants = categories[response].filter(r => r !== restaurants[currentRestaurantIndex]);
        if (comparableRestaurants.length > 0) {
            let comparisons = getRandomElements(comparableRestaurants, Math.min(2, comparableRestaurants.length));
            let comparisonOptions = comparisons.map(r => `<button onclick="finishComparison('${r}')">${r}</button>`).join('');
            let comparisonQuestion = comparisons.length === 1 ?
                `How does ${restaurants[currentRestaurantIndex]} compare to ${comparisons[0]}?` :
                `Which one do you prefer?`;
            document.getElementById('restaurantContainer').innerHTML = `<h2>Comparison</h2>
                                                                       <p>${comparisonQuestion}</p>
                                                                       ${comparisonOptions}
                                                                       <button onclick="finishComparison('${restaurants[currentRestaurantIndex]}')">${restaurants[currentRestaurantIndex]}</button>`;
        } else {
            alert(`You said: ${response}`);
            currentRestaurantIndex++;
            showRestaurant();
        }
    };

    window.finishComparison = function (favorite) {
        alert(`You prefer: ${favorite}`);
        currentRestaurantIndex++;
        showRestaurant();
    };

    showRestaurant();
});

document.addEventListener('DOMContentLoaded', function() {
    const restaurants = ["Restaurant A", "Restaurant B", "Restaurant C"]; // Add more restaurants as needed
    let currentRestaurantIndex = 0;

    function showRestaurant() {
        if (currentRestaurantIndex < restaurants.length) {
            const restaurant = restaurants[currentRestaurantIndex];
            const container = document.getElementById('restaurantContainer');
            container.innerHTML = `<h2>${restaurant}</h2>
                                   <p>Have you eaten here?</p>
                                   <button onclick="handleInitialResponse(true)">Yes</button>
                                   <button onclick="handleInitialResponse(false)">No</button>`;
        } else {
            document.getElementById('restaurantContainer').innerHTML = "<h2>Thank you for your responses!</h2>";
        }
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
        alert(`You said: ${response}`);
        currentRestaurantIndex++;
        showRestaurant();
    };

    showRestaurant();
});

document.addEventListener('DOMContentLoaded', function() {
    const restaurants = ["Restaurant A", "Restaurant B", "Restaurant C"]; // Add more as needed
    let currentRestaurantIndex = 0;

    function showRestaurant() {
        if (currentRestaurantIndex < restaurants.length) {
            const restaurant = restaurants[currentRestaurantIndex];
            const container = document.getElementById('restaurantContainer');
            container.innerHTML = `<h2>${restaurant}</h2>
                                   <p>Have you eaten here?</p>
                                   <button onclick="handleResponse(true)">Yes</button>
                                   <button onclick="handleResponse(false)">No</button>`;
        } else {
            document.getElementById('restaurantContainer').innerHTML = "<h2>Thank you for your responses!</h2>";
        }
    }

    window.handleResponse = function (visited) {
        alert(visited ? "Thanks for your response!" : "Maybe next time!");
        currentRestaurantIndex++;
        showRestaurant();
    }

    showRestaurant();
});

document.addEventListener('DOMContentLoaded', function() {
    const restaurants = ["Restaurant A", "Restaurant B", "Restaurant C"]; // Add more as needed
    const listContainer = document.getElementById('restaurantList');

    restaurants.forEach(function(restaurant) {
        const div = document.createElement('div');
        div.className = 'restaurant';
        div.innerHTML = `<h3>${restaurant}</h3>
                         <p>Have you eaten here?</p>
                         <button onclick="alert('Thanks for your response!')">Yes</button>
                         <button onclick="alert('Maybe next time!')">No</button>`;
        listContainer.appendChild(div);
    });
});

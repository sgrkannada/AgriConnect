// index.js

// --- Reusable Toast Notification ---
function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    toastContainer.appendChild(toast);

    // Automatically remove the toast after 5 seconds
    setTimeout(() => {
        toast.remove();
    }, 5000);
}

// --- Live Mandi Prices ---
const refreshPricesBtn = document.getElementById('refresh-prices-btn');
const pricesGrid = document.getElementById('mandi-prices-grid');
const priceTimestamp = document.getElementById('price-timestamp');

refreshPricesBtn.addEventListener('click', () => {
    // Show a loading state
    pricesGrid.innerHTML = '<div class="loader"></div>';

    // Simulate fetching data after 1.5 seconds
    setTimeout(() => {
        // In a real app, this data would come from an API
        const newPrices = [
            { name: 'Wheat', price: 2485.50, change: 1.5, min: 2250, max: 2700, market: 'Delhi' },
            { name: 'Rice', price: 3050.75, change: -0.8, min: 2950, max: 3300, market: 'Mumbai' },
            { name: 'Sugarcane', price: 405.20, change: 5.2, min: 360, max: 430, market: 'Pune' },
            { name: 'Cotton', price: 7055.00, change: 2.5, min: 6300, max: 7200, market: 'Nagpur' }
        ];
        
        // Clear the loader
        pricesGrid.innerHTML = '';
        
        // Populate with new data
        newPrices.forEach(item => {
            const changeClass = item.change >= 0 ? 'positive' : 'negative';
            const changeSign = item.change >= 0 ? '+' : '';
            pricesGrid.innerHTML += `
                <div class="card price-card">
                    <h4>${item.name}</h4>
                    <div class="price-value">₹${item.price.toFixed(2)} <span class="change ${changeClass}">${changeSign}${item.change}%</span></div>
                    <div class="price-meta">per quintal</div>
                    <div class="price-details">
                        <span>Min: <strong>₹${item.min}</strong></span>
                        <span>Max: <strong>₹${item.max}</strong></span>
                        <span>Market: <strong>${item.market}</strong></span>
                    </div>
                </div>
            `;
        });

        // Update timestamp
        const now = new Date();
        priceTimestamp.textContent = `🕒 Updated: ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute:'2-digit' })}`;
        
        showToast('Prices updated successfully!');
    }, 1500);
});


// --- Sell Crops Form ---
const sellForm = document.getElementById('sell-form');

sellForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the form from actually submitting
    
    const cropType = document.getElementById('crop-type').value;
    const quantity = document.getElementById('quantity').value;
    
    if (!cropType || !quantity) {
        showToast('Please fill all required fields.', 'error');
        return;
    }
    
    // In a real app, you would send this data to your backend
    console.log('Form Submitted:', {
        crop: cropType,
        quantity: quantity,
        price: document.getElementById('price').value,
        location: document.getElementById('location').value,
    });

    showToast(`Your ${cropType} listing has been created!`);
    sellForm.reset(); // Clear the form
});

// --- My Farm Tasks ---
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Function to add a task
function addTask(taskText) {
    const li = document.createElement('li');
    li.innerHTML = `<span>${taskText}</span> <button class="delete-btn">×</button>`;
    
    // Event listener to toggle completion
    li.addEventListener('click', () => {
        li.classList.toggle('completed');
    });
    
    // Event listener for the delete button
    li.querySelector('.delete-btn').addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent the li click event from firing
        li.remove();
        showToast('Task removed.');
    });
    
    taskList.appendChild(li);
}

// Handle form submission
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText) {
        addTask(taskText);
        taskInput.value = '';
    }
});

// Add event listeners to pre-existing tasks
document.querySelectorAll('#task-list li').forEach(li => {
     li.addEventListener('click', () => li.classList.toggle('completed'));
     li.querySelector('.delete-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        li.remove();
        showToast('Task removed.');
    });
});

// --- Farmer Reels ---
document.querySelectorAll('.reel-card video').forEach(video => {
    video.addEventListener('mouseenter', () => video.play());
    video.addEventListener('mouseleave', () => video.pause());
});
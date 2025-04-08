// Function to generate a random key (17 lowercase letters)
function generateRandomKey() {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let key = '';
    for (let i = 0; i < 17; i++) {
        key += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return key;
}

// Check if the user has passed a checkpoint
function getUserProgress() {
    return localStorage.getItem('checkpoint');
}

// Set user progress after they complete a checkpoint
function setUserProgress(checkpoint) {
    localStorage.setItem('checkpoint', checkpoint);
}

// Get the key from localStorage if it exists
function getUserKey() {
    return localStorage.getItem('key');
}

// Set the key in localStorage
function setUserKey(key) {
    localStorage.setItem('key', key);
}

// Redirect the user to the previous checkpoint if they try to access the next one
function checkCheckpointAccess() {
    const currentPage = window.location.pathname;

    if (currentPage.includes('checkpoint2') && getUserProgress() < 1) {
        window.location.href = 'checkpoint1.html'; // Redirect to Checkpoint 1 if not passed
    } else if (currentPage.includes('checkpoint3') && getUserProgress() < 2) {
        window.location.href = 'checkpoint2.html'; // Redirect to Checkpoint 2 if not passed
    }
}

// Event listener for starting the process
document.getElementById('startButton')?.addEventListener('click', () => {
    window.location.href = 'checkpoint1.html';
});

// Event listener for checkpoint 1 button
document.getElementById('nextCheckpoint1')?.addEventListener('click', () => {
    setUserProgress(1); // Set user progress to 1 (Checkpoint 1 completed)
    window.location.href = 'checkpoint2.html'; // Go to next checkpoint
});

// Event listener for checkpoint 2 button
document.getElementById('nextCheckpoint2')?.addEventListener('click', () => {
    setUserProgress(2); // Set user progress to 2 (Checkpoint 2 completed)
    window.location.href = 'checkpoint3.html'; // Go to final checkpoint
});

// Check if user can access the current checkpoint (prevents bypass)
checkCheckpointAccess();

// If the user reaches checkpoint 3, generate and show the key
if (window.location.pathname.includes('checkpoint3.html')) {
    if (!getUserKey()) {
        const key = generateRandomKey(); // Generate a new random key
        setUserKey(key); // Store the key in localStorage
    }
    const key = getUserKey(); // Retrieve the key from localStorage
    document.getElementById('keyDisplay')?.textContent = `Your unique key is: ${key}`; // Display the key
}

document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript file loaded successfully!");

    // Keep the loading screen visible and make it slightly transparent
    const loadingScreen = document.getElementById("loading-screen");
    loadingScreen.style.background = "rgba(0, 0, 0, 0.8)"; // Semi-transparent

    // Simulated drone status data
    const drones = [
        { id: "DR-001", status: "Inactive", battery: 75, lat: 30.7641899, lon: 76.572544 },
        { id: "DR-002", status: "Inactive", battery: 40, lat: 30.7641899, lon: 76.572544 },
        { id: "DR-003", status: "Inactive", battery: 55, lat: 30.7641899, lon: 76.572544 }
    ];

    // Function to check if the drone is connected (Always false for now)
    function isDroneConnected() {
        return false;
    }

    // Update the blinking effect of the circle
    function updateBlinkingCircle() {
        const circle = document.querySelector(".blinking-circle");
        let isRed = true;
        setInterval(() => {
            circle.style.background = isRed ? "darkred" : "red";
            circle.style.transform = isRed ? "scale(1.1)" : "scale(1)";
            isRed = !isRed;
        }, 800);
    }

    // Show an alert when a button is clicked
    document.querySelectorAll(".confirm, .start").forEach(button => {
        button.addEventListener("click", function () {
            if (!isDroneConnected()) {
                alert("Cannot confirm or start the mission until the drone is connected to the backend!");
            } else {
                alert("Mission action confirmed! (Replace with actual backend logic)");
            }
        });
    });

    // Function to dynamically update the drone status in the table
    function updateDroneTable() {
        const tbody = document.querySelector(".drone-table tbody");
        tbody.innerHTML = ""; // Clear existing rows

        drones.forEach(drone => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${drone.id}</td>
                <td><span class="${drone.status === 'Active' ? 'active' : 'inactive'}">● ${drone.status}</span></td>
                <td>${drone.battery}%</td>
                <td>${drone.lat.toFixed(6)}</td>
                <td>${drone.lon.toFixed(6)}</td>
                <td>
                    <button class="confirm">CONFIRM</button>
                    <button class="start">START MISSION</button>
                </td>
            `;

            tbody.appendChild(row);
        });
    }

    // Function to simulate drones going online and battery depletion
    function simulateDroneStatus() {
        setInterval(() => {
            drones.forEach(drone => {
                drone.battery = Math.max(0, drone.battery - Math.floor(Math.random() * 5)); // Reduce battery randomly
                if (drone.battery === 0) {
                    drone.status = "Inactive";
                }
            });

            updateDroneTable();
        }, 5000);
    }

    // Function to log warnings every few seconds
    function logWarnings() {
        setInterval(() => {
            console.warn("🚨 WARNING: Drones are still disconnected from the backend!");
        }, 3000);
    }

    // Function to disable buttons when drones are disconnected
    function disableButtons() {
        document.querySelectorAll(".confirm, .start").forEach(button => {
            button.disabled = true;
            button.style.opacity = "0.5";
        });
    }

    // Map initialization (Mock function)
    function initializeMap() {
        console.log("Initializing Map...");
        var map = L.map('map').setView([30.7641899, 76.572544], 13);

        // Load and display the tile layer from OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        // Add markers for each drone
        drones.forEach(drone => {
            L.marker([drone.lat, drone.lon]).addTo(map)
                .bindPopup(`<b>${drone.id}</b><br>Status: ${drone.status}<br>Battery: ${drone.battery}%`)
                .openPopup();
        });
    }

    // Function to keep updating the loading screen message
    function updateLoadingMessage() {
        const messages = [
            "Drones are not connected to the backend.",
            "Cannot use the website until the owner connects the backend.",
            "Waiting for connection...",
            "Backend is offline, reconnecting..."
        ];
        let index = 0;
        setInterval(() => {
            document.querySelector("#loading-screen p:nth-child(2)").innerText = messages[index];
            index = (index + 1) % messages.length;
        }, 4000);
    }

    // Execute all functions on page load
    updateBlinkingCircle();
    disableButtons();
    logWarnings();
    initializeMap();
    simulateDroneStatus();
    updateDroneTable();
    updateLoadingMessage();
});

# AURA Drone Delivery System 🚀  

AURA is an advanced drone delivery system leveraging **ArduPilot**, **MAVLink**, and **Python** for autonomous navigation, payload deployment, and return-to-home capabilities. This system retrieves real-time delivery coordinates from an API, navigates to the specified location, drops the package, and returns to base.

---

## **Features**
✅ Fully autonomous flight control using MAVLink  
✅ Real-time API-based location fetching  
✅ Precise waypoint navigation with altitude adjustments  
✅ Automated payload deployment via servo mechanism  
✅ Intelligent return-to-launch (RTL) functionality  

---

## **System Requirements**  

### **Hardware**  
- ArduPilot-compatible flight controller (e.g., **Pixhawk 2.4.8**)  
- GPS module (for waypoint navigation)  
- Servo mechanism for payload release  

### **Software**  
- **Python 3.x**  
- **ArduPilot SITL** (for simulation)  
- **MAVProxy** (for MAVLink connection)  
- **Required Python Libraries**  
  ```sh
  pip install pymavlink requests
  ```

---

## **Setup & Environment Configuration**

### **1. Installing ArduPilot SITL (For Simulation)**  
To test the system in a simulated environment, install ArduPilot SITL:

```sh
git clone --recurse-submodules https://github.com/ArduPilot/ardupilot.git
cd ardupilot
Tools/environment_install/install-prereqs-ubuntu.sh -y
. ~/.profile
```

Then, start the SITL simulator:

```sh
cd ArduCopter
sim_vehicle.py -v ArduCopter --console --map
```

### **2. Connecting to the Drone**
Ensure MAVProxy is running and listening on the correct UDP port:

```sh
mavproxy.py --master=udp:127.0.0.1:14550 --console
```

### **3. Running the Drone Delivery Script**
Execute the Python script to start the mission:

```sh
python drone_delivery.py
```

---

## **Flight Operation Workflow**  
1️⃣ Fetch delivery coordinates from API  
2️⃣ Arm and take off to default cruising altitude  
3️⃣ Navigate to delivery waypoint  
4️⃣ Descend to drop altitude and release payload  
5️⃣ Return to launch site via RTL mode  

---

## **API Integration**  
The drone dynamically retrieves target delivery coordinates via a REST API request:

```http
GET https://placeholder-api.com/get-location
```

### **Example API Response:**

```json
{
    "latitude": 28.7041,
    "longitude": 77.1025,
    "altitude": 50
}
```

---

## **Configuration & Customization**

### 🔹 Adjust altitude settings:
```python
DEFAULT_ALTITUDE = 50  # Default cruising altitude in meters
DROP_ALTITUDE = 5  # Altitude at which payload is dropped
```

### 🔹 Modify payload release settings:
```python
SERVO_CHANNEL = 9  # Change based on connected servo pin
SERVO_PWM = 1900  # Adjust PWM signal to trigger payload release
```

### 🔹 Tune navigation delays for better waypoint accuracy:
Increase `time.sleep()` between commands to avoid positioning errors.

---

## **Troubleshooting & Debugging**

🔴 **Drone connection issues?**  
✔ Ensure ArduPilot SITL or real drone is running MAVLink  
✔ Verify MAVProxy is connected to `udp:127.0.0.1:14550`  

🔴 **API request failure?**  
✔ Check API response format and ensure it's reachable  
✔ Try a manual request using:
```sh
curl -X GET https://placeholder-api.com/get-location
```

🔴 **Drone not reaching waypoints?**  
✔ Increase `time.sleep()` before executing next command  
✔ Check GPS signal and ensure coordinates are correctly scaled  

---

## **License & Disclaimer**
📌 **License:** MIT License. This is our own project, you can only view this, no changes allowed.  
📌 **Disclaimer:** This software is for research and educational purposes only. Ensure compliance with local drone regulations before testing with real hardware.  

Developed by: **[Deepak]**   &  **[Saurav]** 
📧 **Contact:** [sauravdutta0219@gmail.com , deepakpopli002@gmail.com]  

🚀 **Happy Flying!** ✈️✨

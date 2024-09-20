
## SensoSphere Frontend

The **SensoSphere Frontend** is the user interface component of the SensoSphere platform, providing a real-time dashboard for sensor data, notifications, user management, and data visualization. Built using React and Redux, this project enables users to monitor and manage data from connected devices.

### Project Overview

- **Technologies**: React, Redux, Redux Thunk, Axios, WebSocket
- **Language**: JavaScript (ES6+)
- **CSS Framework**: Tailwind CSS (or CSS Modules if preferred)
- **Routing**: React Router v6
- **State Management**: Redux Toolkit
- **API**: Communicates with the SensoSphere Backend API via Axios for real-time data updates

---

### Getting Started

#### 1. Clone the repository

```bash
git clone https://github.com/your-username/sensosphere-frontend.git
cd sensosphere-frontend
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Running the Development Server

Start the app in development mode:

```bash
npm start
```

The app will be available at `http://localhost:3000`.

#### 4. Building for Production

To create an optimized production build, run:

```bash
npm run build
```

This will output the production-ready files to the `build/` folder.

---

### Features

- **User Authentication**
  - [x] Registration
  - [x] Login
  - [x] Protected Routes (JWT Authentication)

- **Real-Time Dashboard**
  - [ ] Live sensor data display via WebSockets
  - [ ] Sensor details and statistics
  - [ ] Notifications for alerts

- **Data Management**
  - [ ] CRUD operations for sensor data
  - [ ] Task management for organizing sensor-related tasks

- **User Management**
  - [ ] User profile management
  - [ ] Roles and permissions

- **Data Visualization**
  - [ ] Charts for sensor readings (using Chart.js or D3.js)
  - [ ] Historical data filtering

- **Settings**
  - [ ] User preferences
  - [ ] Notification settings

---

### Folder Structure

```
SensoSphere-Frontend/
│
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   └── Fonts/
│   │   └── Images/
│   ├── components/       # Reusable UI components
│   │   ├── Dashboard.js
│   │   ├── Footer.js
│   │   ├── LiveFeed.js
│   │   └── Navbar.js
│   │   └── Notifications.js
│   │   └── Post.js
│   │   └── Profile.js
│   │   └── SensorData.js
│   │   └── Sidebar.js
│   ├── pages/        
│   │   ├── Home.js      
│   │   └── Login.js
│   │   └── NotFound.js
│   │   └── Profile.js
│   │   └── Register.js
│   │   └── Sensors.js
│   ├── redux/
│   │   └── slices/
│   │   │   └── authSlice.js
│   │   │   └── feedSlice.js
│   │   │   └── notificationSlice.js
│   │   │   └── sensorSlice.js
│   │   └── store.js
│   ├── routes/
│   │   ├── ProtectedRoute.js
│   │   ├── PublicRoute.js
│   ├── services/         # API services using Axios
│   │   └── authService.js
│   │   └── feedService.js
│   │   └── notificationService.js
│   │   └── sensorService.js
│   ├── utils/
│   │   │   └── api.js
│   │   │   └── authHelper.js
│   │   │   └── formatDate.js
│   │   │   └── websocket.js
│   ├── App.css
│   ├── App.js            # Root component
│   └── index.css       
│   ├── index.js          # Main entry point
│   ├── routes.js         # App routing
├── .env                  # Environment variables
├── .gitignore
└── README.md
```

---

### Checklist for Project Milestones

- **Setup**
  - [x] Project initialized with Create React App
  - [x] Installed all required dependencies (React, Redux Toolkit, etc.)
  - [x] Folder structure set up

- **Authentication**
  - [x] Implement login and registration forms
  - [x] Setup JWT handling for protected routes
  - [x] Test integration with backend

- **State Management**
  - [x] Create Redux store
  - [x] Create slices for sensors, notifications, and user management
  - [x] Integrate Redux with React components

- **WebSocket Integration**
  - [ ] Setup WebSocket connection to backend
  - [ ] Display live data updates on the dashboard
  - [ ] Handle connection errors

- **Real-Time Dashboard**
  - [ ] Display real-time sensor data
  - [ ] Show historical data and charts

- **Data Visualization**
  - [ ] Integrate charts using Chart.js or D3.js
  - [ ] Show data trends based on selected time range

- **User Management**
  - [ ] Implement user profile page
  - [ ] Implement role-based permissions

---

### Contributing

If you would like to contribute to this project, feel free to submit a pull request or open an issue.

---

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

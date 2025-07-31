# FSD-lab-  



## 📚 List of Experiments

1. Create a simple React application (Hello World)
2. Create basic calculator application using React JS
3. Build a music store application using React components
4. Create simple web server application using Node.js
5. Create a basic Express website using Node.js
6. Design a simple user login system using Node.js
7. Design Node blog system
8. Design book store system
9. Design a Portfolio App
10. Design a Simple Online Quiz System
11. Create a Job Listing Site
12. Build a Product Inventory System in Node.js + MySQL
13. Build a Chat Application using React and Socket.io
14. Create a Student Result Management App
15. Design Node E-learning system


## Experiment 1: Create a Simple React Application ("Hello World") using Vite

### Objective
To set up and run a basic React application using Vite, displaying "Hello World" on the browser. This gives students firsthand experience with modern tooling and the component-centric approach of React.

### Steps Involved

1. **Install Node.js (if not already)**
   - Ensure Node.js (v18.x or v20.x LTS) is installed.
   - Check with `node -v` and `npm -v`.

2. **Create a New Vite + React Project**
   ```bash
   npm create vite@latest hello-world-app --template react
   ```

3. **Navigate to Project Directory**
   ```bash
   cd hello-world-app
   ```

4. **Install Dependencies**
   ```bash
   npm install
   ```

5. **Start the Development Server**
   ```bash
   npm run dev
   ```
   - Open the local server URL (usually `http://localhost:5173`) in your browser.

6. **Modify App Component to Show "Hello World"**
   - Open `src/App.jsx` in your code editor (e.g., VS Code).
   - Replace its contents as below for a basic "Hello World" example.

### Program Code (`src/App.jsx`)

```jsx
function App() {
  return (
    
      Hello World
      Welcome to your first React app with Vite!
    
  );
}

export default App;
```

### Expected Outcome

- When you visit the app in your browser, you will see:
  - A large "Hello World" heading.
  - A short welcome message underneath.

#### Example Output (Browser)

```
Hello World
Welcome to your first React app with Vite!
```

### Key Learnings

- How to scaffold a modern React project using Vite.
- Running a development server and viewing your app in the browser.
- Editing React component code to control what appears on the page.

**This foundation will set you up for all subsequent experiments in the lab, using the same workflow for project scaffolding, running, and editing code.**


## Experiment 2: Create a Basic Calculator Application Using React (with Vite)

### Objective

To build a simple calculator that performs basic arithmetic (addition, subtraction, multiplication, division) using React, scaffolded with Vite. This helps you understand building interactive forms, managing component state, and handling user input in React.

### What Options to Choose When Creating the Project

When you run the Vite scaffolding command for React:

```bash
npm create vite@latest calculator-app --template react
```

- **Project Name:** Choose something like `calculator-app` (or anything meaningful).
- **Template:** **react**
  - *Do not* pick Vanilla, Vue, Svelte, etc.
  - You can optionally use `--template react-ts` for TypeScript, but choose **React** (JavaScript) for simplicity if you're new.

You’ll then navigate into your project and install dependencies:

```bash
cd calculator-app
npm install
```
---

### Steps to Build Your Calculator App

1. **Start Vite’s dev server**
   ```bash
   npm run dev
   ```
   Open the provided `localhost` URL in your browser.

2. **Open and Edit `src/App.jsx`**

   Replace the contents with a basic calculator implementation (see below).

### Example Calculator Program (`src/App.jsx`)

```jsx
import React, { useState } from 'react';
import './App.css'; // Style as needed

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleClick = (value) => {
    if (value === '=') {
      try {
        // Evaluate the expression (caution: eval has limitations)
        setResult(eval(input));
        setInput('');
      } catch {
        setResult('Math Error');
        setInput('');
      }
    } else if (value === 'Clear') {
      setInput('');
      setResult('');
    } else {
      setInput((prev) => prev + value);
    }
  };

  const buttons = [
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['0', '.', '+'],
  ];

  return (
    
      React Calculator
      
        
        
      
      {buttons.map((row, i) => (
        
          {row.map((item) => (
             handleClick(item)}
              style={{ width: 60, height: 40, margin: 2, fontSize: 18 }}
            >
              {item}
            
          ))}
        
      ))}
       handleClick('=')}
        style={{ width: '60%', height: 40, margin: 2, fontWeight: 'bold' }}
      >
        =
      
       handleClick('Clear')}
        style={{ width: '36%', height: 40, margin: 2, background: '#f44', color: '#fff', fontWeight: 'bold' }}
      >
        Clear
      
    
  );
}

export default App;
```

### Outcome

- Visiting your app in the browser, you’ll see a working calculator with number and operator buttons, a display, an equal sign (`=`) and Clear button.
- You can enter expressions (e.g., 9 + 5 * 2), compute the result using `=`, and clear everything with the Clear button.

### Key Learnings

- Creating a functional React component that handles multiple types of UI input and dynamic state.
- Basic error handling and clearing/resetting state.
- Arranging user interface elements cleanly in React.
- Running and testing an interactive app powered by Vite and React.

#### Additional Tips
- You can further enhance the UI with CSS or frameworks like Tailwind CSS if desired—all are open source and free to use.
- To avoid risks with `eval`, consider using community calculation libraries (e.g., `mathjs`) for more complex calculators in future projects.

This project gives you a strong foundation for building more interactive, data-driven apps as you progress through the lab[1][2].


## Experiment 3: Build a Music Store Application Using React (with Vite)

### Objective

Create a basic music store/player app using React and Vite, allowing users to view a list of songs and play/pause tracks. This lab introduces you to component structuring, state management, and handling media in React.

### What Options to Choose When Creating the Project

- **Project name:** Use something like `music-store-app`.
- **Template:** Select **react**.
  - Stick with JavaScript for now unless you prefer TypeScript.

Run:
```bash
npm create vite@latest music-store-app --template react
cd music-store-app
npm install
```

### Steps to Build Your Music Store App

1. **Set Up the Project**
   - Initialize as above with Vite and React.
   - Start the server:
     ```bash
     npm run dev
     ```

2. **Prepare Sample Data**
   - In `src/`, create a new file named `songs.js`:
     ```js
     // songs.js
     const songs = [
       {
         id: 1,
         name: "Sunrise Serenade",
         artist: "Harmony Harp",
         url: "https://media.geeksforgeeks.org/wp-content/uploads/20231004185212/Jawan-Prevue-Theme.mp3"
       },
       {
         id: 2,
         name: "Urban Groove",
         artist: "Beatmaster B",
         url: "https://media.geeksforgeeks.org/wp-content/uploads/20231004184006/SoundHelix-Song-10.mp3"
       }
     ];
     export default songs;
     ```

3. **Build the App UI (`src/App.jsx`)**

   Replace contents with:

   ```jsx
   import React, { useRef, useState } from "react";
   import songsData from "./songs";

   function App() {
     const [currentSong, setCurrentSong] = useState(songsData[0]);
     const [isPlaying, setIsPlaying] = useState(false);
     const audioRef = useRef(null);

     const playSong = () => {
       if (audioRef.current) {
         audioRef.current.play();
         setIsPlaying(true);
       }
     };

     const pauseSong = () => {
       if (audioRef.current) {
         audioRef.current.pause();
         setIsPlaying(false);
       }
     };

     return (
       
         🎵 Music Store
         
           {songsData.map(song => (
              {
                 setCurrentSong(song);
                 setIsPlaying(true);
                 setTimeout(() => playSong(), 0);
               }}
             >
               {song.name} 
               {song.artist}
             
           ))}
         

          setIsPlaying(false)}
         />

         
           {isPlaying ? (
             Pause
           ) : (
             Play
           )}
         
         
           Now Playing: 
           {currentSong.name} by {currentSong.artist}
         
       
     );
   }

   export default App;
   ```

4. **(Optional) Style with `App.css`**
   - Customize for a cleaner look.

### Outcome

- The browser app displays a song list.
- **Click** a song: it becomes selected and starts playing.
- Use the Play/Pause button to control playback.
- The current song and artist are always shown.

### Key Learnings

- **Component structure** for modular React apps.
- **State management** to handle the current song and playback status.
- **Refs** in React for directly controlling HTML audio.
- **Rendering lists** and handling user clicks/interactions.

**This project gives you hands-on experience creating multimedia, stateful applications, preparing you for more complex CRUD (Create, Read, Update, Delete) and database-driven labs.**  
You can extend this with features like volume control and playlists as next steps!


## Experiment 4: Create a Simple Web Server Application Using Node.js (with Vite Frontend)

### Objective

To introduce the fundamentals of Node.js by building a **basic web server** that responds to HTTP requests. This experiment helps you understand how backend servers work, which will be extended in later labs to full-stack development.

> **Note:** Vite is used for building React frontends and running development servers. For this program, you will create a standalone Node.js backend (without frontend). In future labs, you'll combine both.

### Steps to Build Your Simple Node.js Web Server

1. **Create a Project Directory**

   ```bash
   mkdir simple-node-server
   cd simple-node-server
   ```

2. **Initialize a Node.js Project**

   ```bash
   npm init -y
   ```

3. **Create the Server File**

   - Create a file called `server.js` in your project directory.

4. **Write the Web Server Code**  
   Add the following code to `server.js`:

   ```js
   // server.js
   const http = require('http');

   const hostname = 'localhost';
   const port = 3000;

   const server = http.createServer((req, res) => {
     res.statusCode = 200;
     res.setHeader('Content-Type', 'text/plain');
     res.end('Hello from your Node.js Server!');
   });

   server.listen(port, hostname, () => {
     console.log(`Server running at http://${hostname}:${port}/`);
   });
   ```

5. **Run the Server**

   ```bash
   node server.js
   ```

   - The console should show: `Server running at http://localhost:3000/`

6. **Test It**
   - Open your browser and go to [http://localhost:3000](http://localhost:3000)
   - You should see:
     ```
     Hello from your Node.js Server!
     ```

### Outcome

- You built and ran a simple Node.js web server that responds to browser requests.
- You can now build upon this foundation to serve web pages, handle routes, and connect to databases in future experiments.

### Key Learnings

- How to initialize a Node.js project with `npm init`.
- Writing a minimal HTTP server using Node's built-in `http` module.
- Starting/stopping your server and accessing it via browser or tools like Postman.
- Understanding the role of server-side code in web development.

**This practical exercise gives you the essential backend skills for upcoming full stack experiments, and gets you comfortable working with Node.js as a server environment.**

## Experiment 5: Create a Basic Express Website Using Node.js

### Objective

To learn how to build a server-side web application using the **Express** framework in Node.js. This program introduces routing, serving HTML content, and modularizing server logic using Express.

### Steps to Build Your Express Website

1. **Create a Project Directory**

   ```bash
   mkdir express-website
   cd express-website
   ```

2. **Initialize a Node.js Project**

   ```bash
   npm init -y
   ```

3. **Install Express (Free & Open Source)**

   ```bash
   npm install express
   ```

4. **Create the Main Server File**

   - Create a file named `index.js` in your project directory.

5. **Write the Express Web Server Code**

   ```js
   // index.js
   const express = require('express');
   const app = express();
   const PORT = 3000;

   // Home page route
   app.get('/', (req, res) => {
     res.send('Welcome to Your First Express Website!This page is served from an Express backend.');
   });

   // About page route
   app.get('/about', (req, res) => {
     res.send('About This AppThis is a simple demonstration of Express routing.');
   });

   // Handle 404 errors
   app.use((req, res) => {
     res.status(404).send('404 Not Found');
   });

   app.listen(PORT, () => {
     console.log(`Express app running at http://localhost:${PORT}`);
   });
   ```

6. **Run the Express App**

   ```bash
   node index.js
   ```
   - Console output: `Express app running at http://localhost:3000`

7. **Test Your Application**

   - Visit in the browser:
     - [http://localhost:3000](http://localhost:3000) → Home Page
     - [http://localhost:3000/about](http://localhost:3000/about) → About Page
     - Any other route (e.g., `/contact`) → 404 Error

### Outcome

- A simple Express-powered Node.js server running with custom routes for the homepage and an about page.
- Displays custom HTML content for each route.
- Returns a 404 message for unknown URLs.

### Key Learnings

- Installing and using **Express**, the most popular Node.js web framework.
- Defining server routes for different pages.
- Sending HTML responses from the backend.
- Handling basic errors (404 pages).
- General project organization for back-end work in Node.js.

**This experiment gives you the groundwork to build more dynamic, data-driven, and interactive server-side applications in future labs, and is a solid step toward mastering full-stack development.**




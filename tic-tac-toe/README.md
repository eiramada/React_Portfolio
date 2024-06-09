# ReactJS Tic-Tac-Toe Game

This is a simple Tic-Tac-Toe game built with ReactJS. The application allows users to input player names, start a new game, view the game board, and check the scoreboard. The previous winner starts as Player 1 in the next game if the same players have played before.

## Features

1. Input player names and start a new game.
2. Game board UI with X (red) and O (blue).
3. Store current positions in the local state using `useState()`.
4. Store history of all games using global state with `useContext()`.
5. Navigation between game board and scoreboard using React Router.
6. Previous winner starts as Player 1 for the next game if the same players have played before.

## Prerequisites

- Node.js (>=12.x)
- npm (>=6.x)

## Getting Started

### 1. Clone the Repository

Clone the repository to your local machine.
```bash
git clone https://github.com/eiramada/React_Portfolio.git
```

### 2. Navigate to the Tic-Tac-Toe Project Directory
```bash
cd React_Portfolio/tic-tac-toe
```

### 3. Install Dependencies

Install the necessary dependencies using npm.
```bash
npm install
```

### 4. Start the Application

Start the development server and open the application in your default web browser. The app will be running at http://localhost:3000.
```bash
npm start
```

## Project Structure
```
React_Portfolio/
├── .vscode/
├── bakery-shop/
├── shipments/
├── tic-tac-toe/
│ ├── assignment/
│ │ ├── FE_Dev_Home_Assignment.pdf
│ ├── public/
│ │ ├── index.html
│ │ └── manifest.json
│ ├── src/
│ │ ├── components/
│ │ │ ├── RegistrationForm.js
│ │ │ ├── Gameboard.js
│ │ │ ├── Scoreboard.js
│ │ ├── context/
│ │ │ ├── GameHistoryContext.js
│ │ ├── css/
│ │ │ ├── RegistrationForm.css
│ │ │ ├── Gameboard.css
│ │ │ └── Scoreboard.css
│ │ ├── App.css
│ │ ├── App.js
│ │ ├── index.css
│ │ ├── index.js
│ ├── .gitignore
│ ├── package-lock.json
│ ├── package.json
│ └── README.md
├── twn-test/
└── README.md
```

## Learn More

You can learn more in the Create React App documentation. To learn React, check out the React documentation.

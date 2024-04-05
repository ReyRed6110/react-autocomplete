# Auto-Complete Component

This is a React TypeScript component that implements an auto-complete functionality. It fetches user data from an API and allows users to search for users by typing in their first or last name. The matching part of the text is highlighted, and the selected user's details are displayed.

## Requirements
- Vite (v4.5.3 or higher)
- Node.js (v12 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository: git clone https://github.com/ReyRed6110/react-autocomplete.git

2. Navigate to the project directory: 
 `cd react-autocomplete`

3. Install dependencies: 
  `npm install`

## Usage

1. Start the development server: 
 `npm run dev`

2. Open your browser and navigate to `http://localhost:5173/` to see the auto-complete component in action.

## Features

- Asynchronous data fetching from an API
- TypeScript implementation with proper interfaces and types
- Highlighting of matching text
- Display of selected user's details
- Basic CSS styling

## Notes

- The component uses React hooks and avoids unnecessary re-renders by utilizing the `useEffect` and `useCallback` hooks.
- No third-party libraries are used; the component relies solely on React and built-in DOM functions.
- The code includes comments explaining the purpose and functionality of various sections.
- Edge cases and user experience have been considered, such as handling empty input values and resetting the filtered users list.
- No external state management libraries are used; the component uses React's built-in state management with the `useState` hook.
- The component fetches data from the provided API (`https://dummyjson.com/users`).


# Fate/Grand Order Planner

The purpose of this project was to create an application that simplified resource management in the mobile game Fate/Grand Order while new learning web development technologies.

This project was created using the `create-react-app` boilerplate with additional libraries such as `react-router-6.3` for page navigation, `react-toastify` for toast style notifications, and `axios` for GET calls from the public [Atlas Academy API](https://api.atlasacademy.io/rapidoc).

The project's main functionality is to request data from an API and display data from it based on user input. The requests retrieved from the API are cached in `localStorage` to prevent constant API calls and allow for quicker access in the future. Data is then displayed dynamically on both Search and Overview pages with the help of React's `useState` and `useEffect` hooks.

## Installation and Usage

Installation:

`npm install`

Start Local Server:

`npm start`

To Visit Locally:

`http://localhost:3000`

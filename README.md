# Radio-Station-App
This is a copy of the work I did for the SWE 432: Web App Development course at George Mason University, where I helped create a working radio station.
All my code can be viewed in the [Producers-Branch](https://github.com/DeeP-008/Radio-Station-App/tree/Producers-Branch).
This project is built using Node.js, Express, and EJS templates. My part of the project involves implementing a music producer's view of the app where they could manage their musicians, assign show timings and 
songs for their DJs, and look at any upcoming shows where the musicians and DJs they represent would be playing. Here's a breakdown of my contributions to the project:

## Overview

The producer's page is divided into three main sections:

- Musicians Metrics: A section that displays information about different musicians. It includes buttons that lead to detailed metrics for each musician.

- DJ Control Center: This section allows producers to access the control centers for different DJs by clicking on that DJ's corresponding buttons.

- Upcoming Shows: Information about upcoming shows is displayed here. Producers can access detailed show information by clicking on buttons representing different locations.

## Contributions

### Frontend

- Implemented the front end of the website using EJS templates to dynamically generate HTML content.

- Created responsive web pages for musicians, DJs, and upcoming shows.

- Styled the web pages using CSS to ensure an attractive and user-friendly design.

- Added interactive features to the website, such as play/pause controls for an embedded audio player.

### Backend

- Developed an Express application that handles routing for the different sections of the website.

- Set up EJS as the template engine for rendering dynamic content.

- Created routes for displaying musician metrics, DJ control centers, and upcoming shows.

- Implemented button functionality for redirection to specific HTML pages based on user interactions.

- Served static files, such as HTML, CSS, and JavaScript files, to enhance website performance.

### Future Enhancements

This project is an ongoing effort, and there are several areas for future improvements:

- Integrating a database to store and manage musicians, DJs, and upcoming show information data.

- Implementing user registration and authentication features.

- Expanding the website's functionality to allow user-generated content and interactions.

- Enhancing the design and user experience with more advanced CSS and JavaScript features.

## Getting Started

To run the project locally, follow these steps:

1. Clone this repository to your local machine.
2. Install the necessary dependencies using `npm install`.
    i. Note: the app requires node or nodemon to be installed on your local machine.
4. Start the server with `node app.js`.

You can then access the website in your browser at `http://localhost:8080`.

Shoutout to my awesome teammates on this project:
[Lloyd Amarento](https://github.com/LloydAAmaranto) and [Alex Park](https://github.com/TheQwertz64)

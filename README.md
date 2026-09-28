# WanderLust
A MER# WanderLust 🌍

A web-based travel and tourism platform where users can explore destinations, create and manage travel listings, share reviews, and view locations on an interactive map.

## Features

* **User Authentication:** Secure signup and login using Passport.js.
* **Tourist Listings:** Browse tourist destinations and view their details, photos, and locations.
* **Create Listings:** Authenticated users can add their own tourist destination listings.
* **Listing Management:** Users can edit or delete the listings they have created.
* **Reviews and Ratings:** Share experiences and rate listed destinations.
* **Interactive Maps:** View destination locations using Leaflet and OpenStreetMap.
* **Image Uploads:** Upload and manage listing images using Cloudinary.
* **User Dashboard:** View and manage your own listings.

## Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB, Mongoose
* **Frontend:** EJS, HTML, CSS, JavaScript, Bootstrap
* **Authentication:** Passport.js
* **Maps:** Leaflet, OpenStreetMap
* **Image Hosting:** Cloudinary

## Project Structure

```text
WanderLust/
├── classroom/
├── controller/
├── init/
├── models/
├── public/
│   ├── css/
│   └── js/
├── routes/
├── uploads/
├── utils/
├── views/
│   ├── includes/
│   ├── layouts/
│   ├── listings/
│   └── users/
├── app.js
├── cloudconfig.js
├── middleware.js
├── schema.js
├── package.json
└── .gitignore
```

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/Neha-soam/WanderLust.git
cd WanderLust
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root and configure the required variables, such as:

```env
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_session_secret
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

Use the exact variable names expected by your application code. Never commit your `.env` file or expose API secrets.

### 4. Start the application

```bash
node app.js
```

If your `package.json` defines a start script, you can use:

```bash
npm start
```

Open the local URL shown in your terminal.

## Future Improvements

* Add destination search and filtering.
* Improve the user dashboard.
* Deploy the application online.
* Add more travel-related features.

## Purpose

WanderLust was developed as a college project to demonstrate web application development, user authentication, database integration, image uploads, reviews, and interactive maps.

## Author

**Neha Soam**

GitHub: [Neha-soam](https://github.com/Neha-soam)
N stack-based tourism platform where users can explore tourist destinations, create and manage listings, share reviews, and view locations on interactive maps.


# Simple Weather App

## This GUI serves as a real-time weather observer using AccuWeather API. It gives the user the opportunity to:

1. Search for almost any city in the world.
2. Upon each character insertion/removal from the input field a suggestion list is provided giving the user the opportunity to make their choice from a dynamic dropdown of cities. Each city in this collection begins with the phrase typed in the search field at that very moment. This list is sorted by the AccuWeather API's City Rank concept (factors such as population, political importance, and geographic size).
3. After each location selection the following gets showed below the input field:

- Main Weather Card presenting city's current weather
- 5 other Weather Cards being the forecast for the next five days

4. Globally toggle the temperature measurement unit of the entire application with the simple toggle button above the Seach Field
5. Navigate between two pages: **Weather** and **Favourites**
6. Each Main Weather Card features a star-button giving the ability to add the current city to your
   favourites list that could be observed as it is navigated to the **Favourites** page. City's removal from that list is done on subsequent click on the button again
7. Favourites Page's list is a collection of container links each navigating the user to the corresponding City's Forecast in the **Weather Page**
8. Globally toggle the Application's theme between `light` and `dark`
9. Each error gets diplayed on the top-middle of the screen using popups (React toasts)
10. Have fun!

## How to build and start the project

### Tech Stack used

NodeJS(18), Docker(20), React(18)

### Prerequisites

The project was developed using Node 18 (You could use `nvm` to easily install and switch between different versions of `node`). Additionally, the `OS` used was `OpenSUSE 15.3` and there should be no problems with the installation process on other Linux distrubitions. Follow these steps to build and observe the application:

1. Download in a directory of your choosing using any of the following:

   - Over SSH:
     `git clone git@github.com:plamenpetkov8/Simple-Weather-App.git`
   - over HTTP:
     `git clone https://github.com/plamenpetkov8/Simple-Weather-App.git`

2. There are **2 ways** to proceed:
   - Manual Installation
   - Docker Installation

#### Manual Installation

1. From the root of the project, navigate to **/app**:
   ```bash
   cd ./app
   ```
2. Install module's dependencies:
   ```bash
   npm install
   ```
3. Build the project:

   ```bash
       VITE_WEATHER_API_KEY="<custom_api_key>" VITE_SERVER_PORT=<server_port> npm run build
   ```

   **Placeholders:**

   - **custom_api_key**: Use custom AccuWeather API Key (register on their site, "Add a new App" (make sure to select "Core Weather Limited Trial") and copy your new key. Keep in mind that if using free plan, each app is given only 50 requests per day. When that happens, just remove your app and create a new one. Voila! )
   - **server_port**: The port of the server. Make sure you use the same port as the one used later initializing the server.

   **NOTE:** The above command will produce a **./dist** folder

   **Example:**

   ```bash
   VITE_WEATHER_API_KEY="AbCdEfGhIjKlMnOp" VITE_SERVER_PORT=7777 npm run build
   ```

4. Install a useful tool that would host our newly built app:
   ```bash
   npm install -g serve
   ```
5. Host our app:

   ```bash
   serve -p <host_port> -s dist
   ```

   **Placeholders:**

   - **host_port:** The port we are telling **`serve`** to serve our gui on

   **Example:**

   ```bash
   serve -p 3006 -s dist
   ```

6. In the terminal you could see a rectangle with a green border looking like this (if we use port 3000 otherwise it would be different):

   ![Alt text](img/installation-thumbnail.png)

7. Use any of the addresses provided later to view the App!
8. Open a new Terminal and navigate to the **root** of the project
9. Navigate to the **server** namespace:

   ```bash
   cd ./server
   ```

10. Install module's dependencies:
    ```bash
    npm install
    ```
11. Fire the server:

    ```bash
    PORT=<server_port> node index.mjs
    ```

    **Placeholders:**

    - **server_port:** The port the servevr will be listening on.  
      **NOTE:** It must be the same as App's one used for http calls

    **Example:**

    ```bash
    PORT=7777 node index.mjs
    ```

12. Enjoy the app!!!

#### Docker installation

1. From the root of the project, navigate to **/app**:
   ```bash
   cd ./app
   ```
2. Create App's **Docker Image**:

   ```bash
    docker build --no-cache --build-arg hosted_on_port=<port> --build-arg vite_weather_api_key="<weather_api_key>" --build-arg vite_server_port=<server_port> -t weather-app .
   ```

   **Placeholders:**

   - **port:** The port of the host our app is going to be hosted on
   - **vite_weather_api_key:** Use custom AccuWeather API Key (register on their site, "Add a new App" (make sure to select "Core Weather Limited Trial") and copy your new key. Keep in mind that if using free plan, each app is given only 50 requests per day. When that happens, just remove your app and create a new one. Voila! )
   - **server_port:** The port our server will be listening on. We need it to match the real one to make proper `http` requests

   **Example:**

   ```bash
   docker build --no-cache --build-arg hosted_on_port=3006 --build-arg vite_weather_api_key="AbCdEfGhIjKlMnOp" --build-arg vite_server_port=7777 -t weather-app .
   ```

3. Run the newly created image:

   ```bash
   docker run -dti -p <container_port>:<our_host_port> weather-app "-p" <hosted_on_port>
   ```

   **Placeholders:**

   - **container_port:** The port our app will be hosted on inside the container
   - **our_host_port:** The port in the "outside world" we want to map to
   - **hosted_on_port:** Explicitly selected port to host the app on
     **NOTE:** **container_port**, **our_host_port** and **hosted_on_port** must be the same

   **Example:**

   ```bash
   docker run -dti -p 3006:3006 weather-app "-p" 3006
   ```

4. Open a new Terminal and navigate to the **root** of the project
5. Navigate to the **./server** namespace:
   ```bash
   cd ./server
   ```
6. Create Server's **Docker Image**:

   ```bash
    docker build --no-cache --build-arg port=<server_port> -t weather-server .
   ```

   **Placeholders:**

   - **port:** The port our server will be listening to

   **NOTE:** Must be the same as App's one used for http calls

   **Example:**

   ```bash
   docker build --no-cache --build-arg port=7777 -t weather-server .
   ```

7. Run the newly created image:

   ```bash
     docker run -dti -p <container_port>:<outside_port> weather-server
   ```

   **Placeholders:**

   - **container_port:** The port our server will be listening on inside the container
   - **outside_port:** The port in the "outside world" we want to map to  
     **NOTE:** **container_port** and **outside_port** must be the same

   **Example:**

   ```bash
     docker run -dti -p 7777:7777 weather-server
   ```

8. Enjoy the app!!!

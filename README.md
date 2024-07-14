# Todo List project
## Installation
Required:
- [Node.js](https://nodejs.org/en)
- [NPM](https://www.npmjs.com/) (Node Package Manager)

Clone the repository:
```bash
git clone https://github.com/ngocdo4299/todo-list.git
```

### Back-end
In the folder `server`, you can find of the project is a simplified Node.js + Express server with static data. Before running the project, enviroment variables need to be configured, start by copying `.env.sample` file to `.env` file:
```bash
cd server
cp .env.sample .env
```
There are two variables in `.env` file that need to be added: 
- `TOKEN_SECRET_KEY`: Secret key to sign JWT, should be a random string.
- `WEATHER_API_KEY`:  API KEY for OpenWeatherMap API, follow [instruction](https://openweathermap.org/api) of OpenWeatherMap API to get the API Key.

After all environment variables are setup, run the project's back end by:  
```bash
npm install
npm run start
```
There should be a message: 
```
Server running on port _
````

### Front-end
The UI of the project is made with React Native, require either configurations for simulators of [IOS](https://docs.expo.dev/workflow/ios-simulator/)/[Android](https://docs.expo.dev/workflow/android-studio-emulator/) devices or [Expo GO](https://expo.dev/go) to use on physical devices

Run the project's back end by:
```bash
npm install
npm run start
```
After the front-end is built, choose desired option to use IOS simulator, Android simulator or physical device.

## Documentations
### Features:
- Authentication: Users log-into the app using dummy accounts using username and password. After successfully validating the username and password, a JWT is generated and stored in the device’s storage; this token will be sent along with future HTTP requests, guaranteeing the user’s valid access until it expires.

- Task management: By default, not completed tasks will be displayed to users, sorted by created date. User have options to show all tasks including completed tasks.
    - Account with `user` role: can view list task, view task detail, complete task.
    - Account with `admin` role: can view list task, view task detail, complete task, create new task and edit existing task.

- Weather data integration: When user choose the view task detail, server will check if *the weather data relevant to task's location is cached in server's storage and valid within the configuration time*. If yes, the weather data is retrieved from cached data object and attached to task's detail; If not, the weather data is retrieved from OpenWeatherData API and will be cached in server's storage before being attached to task's detail.
### Screenshots from IOS simulator:
<img alt="Authentication-signin" src="https://github.com/user-attachments/assets/b19e7836-8ecc-4e1e-83c5-7f5a248fa378" width=200>
<img alt="Authentication-signin-showpassword" src="https://github.com/user-attachments/assets/ad3a273d-160c-4287-adac-35a794222c1a" width=200>
<img alt="Authentication-profile" src="https://github.com/user-attachments/assets/b9d17aa0-21c1-49fe-af3a-8e6768eb5360" width=200>
<img alt="TaskManagement-viewlist-default" src="https://github.com/user-attachments/assets/5ab2bb75-27f2-4ce1-ab24-f5fc0c52c447" width=200>
<img alt="TaskManagement-viewlist-all" src="https://github.com/user-attachments/assets/65b83be7-6e52-4193-85c1-90e47c0f7116" width=200>
<img alt="TaskManagement-viewtask-readonly" src="https://github.com/user-attachments/assets/ac05aecf-65d5-4dff-8096-b84fdcfb9daf" width=200>
<img alt="TaskManagement-viewtask-edit" src="https://github.com/user-attachments/assets/28771e74-a094-4249-a93c-d471c2d2381b" width=200>

[//]: #(References)
   [expo]: <https://docs.expo.dev/>
   [react-native]: <https://reactnative.dev/>
   [aora]: <https://github.com/adrianhajdin/aora>
   [React Native Course for Beginners in 2024]: <https://www.youtube.com/watch?v=ZBCUegTZF7M&ab_channel=JavaScriptMastery>

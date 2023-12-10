# Building a Fullstack application with the MERN stack along with Socket.Io and React Three Fiber


This is a repository for a a project utilizing the MERN stack along with Socket.IO and React Three Fiber


Features:

- Animated background using React Three Fiber
- Realtime global chat with Socket.IO
- MongoDB & Mongoose connect, Database creation
- Authentication with JWT
- Full responsiveness on all pages
- API and Controllers creation
- Zustand state management


### Cloning the repository

```shell
git clone https://github.com/AlistairM13/r3f_mern.git
```

### Install packages

```shell
# Server
cd server
npm i

# Client
cd client
npm i
```

### Setup .env file


```js
NODE_ENV=
PORT=
MONGO_URI=
JWT_SECRET=
```



### Start the app


```shell
# Replace urls
client/src/components/ChatBox.jsx
client/action/userActions.js

# Server
cd server
npm run dev

# Client
cd client
npm start
```
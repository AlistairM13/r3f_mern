# Building a Fullstack application with the MERN stack along with Socket.Io and React Three Fiber


This is a repository for a  project utilizing the MERN stack along with Socket.IO and React Three Fiber

![Screenshot 2023-12-10 233511](https://github.com/AlistairM13/r3f_mern/assets/105148183/6d95b701-479b-4935-86c1-fd47b7ad7804)


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

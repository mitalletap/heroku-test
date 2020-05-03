Followed Steps from : https://daveceddia.com/deploy-react-express-app-heroku/


### Build Backend 

1. Create Directory
2. npm init -y OR yarn init -y
3. Add the following to a **index.js** file in the root directory
```javascript
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = express();
const port = process.env.PORT || 5000;
app.use(express.static(path.join(__dirname, 'frontend/build')));

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

app.get('/message', (req, res) => {
    res.send({ "message" : "you're connected!"})
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/frontend/build/index.html'));
});

app.listen(port, function () {
    console.log("Server is running on port :" + port)
})
```
4. Add start script to **package.json** in the root directory
```
"scripts": {
    "start": "node index.js"
  }
```





### Connect To Git and Heroku

1. Initialize Git Repo in local folder
2. Add the **node_modules** folder to the **.gitignore** file
3. Add all unchanged files
4. Commit all added files
```
git init
echo node_modules/ > .gitignore
git add .
git commit -m "Init"
```
5. Assuming the Heroku CLI is installed, run the following
```
heroku create
```
6. Push to Heroku
```
git push heroku master
```





### Build Frontend 

1. Create the React App
```
npx create-react-app frontend OR yarn create-react-app frontend
```
2. Add a proxy to the **package.json** in the frontend directory
```
"proxy": "http://localhost:5000"
```
3. Add App.js
```javascript
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: [],
    }

  }

  componentDidMount() {
    this.getMessage();
  }

  getMessage = () => {
    fetch('/message')
    .then(res => res.json())
    .then(result => this.setState({ message: result }))
  }

  render() {
    const { message } = this.state;
    return (
      <div className="App">
        <h1> {`${message.message}`} </h1>
      </div>
    )
  }
}

export default App;
```
4. Add Post Build Script for Heroku to Build Frontend in the package.json in the frontend directory
```
"scripts": {
  "start": "node index.js",
  "heroku-postbuild": "cd client && npm install && npm run build"
}
OR
"scripts": {
  "start": "node index.js",
  "heroku-postbuild": "cd client && yarn && yarn run build"
}
```
5. Save changes and deploy to Heroku
```
git add .
git commit -m "Final Setup"
git push heroku master

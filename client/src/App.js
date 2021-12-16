import { useState, useEffect } from "react";
import './App.css';
import axios from 'axios';

axios.defaults.withCredentials = true;

function App() {
  const [infoReg, setInfoReg] = useState({
    username : "",
    password : ""
  });
  const [infoLog, setInfoLog] = useState({
    username : "",
    password : ""
  });
  const [message, setMessage] = useState("");

  const handleChangeRegister = e => {
    const {name, value} = e.target;

    setInfoReg(prev => ({
      ...prev,
      [name] : value
    }))
    
  }
  const handleChangeLogin = e => {
    const {name, value} = e.target;

    setInfoLog(prev => ({
      ...prev,
      [name] : value
    }))
  }

  const handleOnRegister = e => {
    e.preventDefault();
    
    axios({
      method : 'POST',
      baseURL : "http://localhost:5000/api/users/register",
      data : infoReg  
    }).then(data => {
      console.log(data.data);
    }).catch(err => {
      console.log(err);
    })
    setInfoReg({
      username : "",
      password : ""
    })
  }

  const handleOnLogin = e => {
    e.preventDefault();
   // console.log(infoLog);

   axios({
     method : 'POST',
     baseURL : 'http://localhost:5000/api/users/login',
     data : infoLog
   }).then(data => {
      if(data.data.erreur){
        setMessage(data.data.erreur);
      }else{
        setMessage(data.data.username)
      }
   }).catch(err => {
     console.log(err);
   })

   setInfoLog({
     username : "",
     password : ""
   });

  }
 
  useEffect(() => {
    axios.get('http://localhost:5000/api/users/login').then(res => {
      if(res.data.loggedIn === true){
        setMessage(res.data.user.username)
      }
    }).catch(err => {
      console.log(err);
    })
  }, []);

  return (
    <div className="App">
      <div className="registration">
          <h2>Registration</h2>
          <input type="text" placeholder="Username" value={infoReg.username} name="username" onChange={handleChangeRegister} /><br /><br />
          <input type="password" placeholder="Password" value={infoReg.password} name="password" onChange={handleChangeRegister} /><br /><br/>
          <button onClick={handleOnRegister}>Register</button>
      </div><br /><br />
      <div className="login">
          <h2>Login</h2>
          <input type="text" name="username" value={infoLog.username} placeholder="Username" onChange={handleChangeLogin} /><br /><br />
          <input type="password" name="password" value={infoLog.password} placeholder="Password" onChange={handleChangeLogin} /><br/><br/>
          <button onClick={handleOnLogin}>Login</button>
      </div>
      <div>
          <h3>{message && `Bonjour ` + message} </h3>
      </div>
    </div>
  );
}

export default App;

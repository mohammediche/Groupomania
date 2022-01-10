//https://www.telerama.fr/sites/tr_master/files/styles/simplecrop1000/public/medias/2015/04/media_126061/call-of-duty-retour-sur-l-histoire-mouvementee-d-une-des-saga-les-plus-populaires-du-jeu-video%2CM217573.jpg?itok=4BONQD39"
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Post from "./components/Post";
import EditPost from "./components/EditPost";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PageNotFound from "./components/PageNotFound"
import "./styles/App.css";
import {AuthContext} from "./Helpers/AuthContext";
import { useState, useEffect } from "react";



function App() {
  const [authState, setAuthState] = useState({ // on déclare value initial false (user not connect)
    username:"",
    id:0,
    status:false,
  })

  useEffect(() => {
    if(localStorage.getItem("authToken")){
      setAuthState({status : true}); // localStorage enregistré, qui veut dire user est connecté !
    }

  }, [])


  return (
    <AuthContext.Provider value={{authState, setAuthState}}> {/* on appelera ses valeur dans login, register, comment delete */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Home /> }/>
        <Route path="/post/:id" element={ <Post /> }/>
        <Route path="/edit-post/:id" element={ <EditPost /> }/>
        <Route path="/login" element={ <Login /> }/>
        <Route path="/signup" element={ <Signup /> }/>
        <Route path="*" element={ <PageNotFound/>} />
      </Routes>
      
    </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;

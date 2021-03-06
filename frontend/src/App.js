//https://www.telerama.fr/sites/tr_master/files/styles/simplecrop1000/public/medias/2015/04/media_126061/call-of-duty-retour-sur-l-histoire-mouvementee-d-une-des-saga-les-plus-populaires-du-jeu-video%2CM217573.jpg?itok=4BONQD39"
import Home from "./Pages/Home";
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Post from "./Pages/Post";
import EditPost from "./Pages/EditPost";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import PageNotFound from "./Pages/PageNotFound"
import "./styles/App.css";
import {AuthContext} from "./Helpers/AuthContext";
import { useState, useEffect } from "react";
import PrivateRoutes from "./components/PrivateRoutes";
import Profile from "./Pages/Profile";



function App() {

  const [authState, setAuthState] = useState({ // on déclare value initial false (user not connect)
    status:false,
  })

  // supprimer cet useEffect et voir ce qui change
  useEffect(() => { // Role et l’id ajouté à local storage et supprimer du coté setAuth
    if(localStorage.getItem("autorisationToken")){
      setAuthState({status: true}); // localStorage enregistré, qui veut dire user est connecté !
    }

  }, [])


  return (
    <AuthContext.Provider value={{authState, setAuthState}}> {/* on appelera ses valeur dans login, register, comment delete */}
    <BrowserRouter>
      <Routes>
        {/* {authState.status === true && */}
        <>
        <Route path="/" element={ <PrivateRoutes> <Home /> </PrivateRoutes> }/>
        <Route path="/post/:postId" element={ <PrivateRoutes> <Post /> </PrivateRoutes> }/>
        <Route path="/edit-post/:postId" element={ <PrivateRoutes> <EditPost /> </PrivateRoutes> }/>
        <Route path="/login" element={ !authState.status ?<Login /> : <Navigate to={"/"}/>}/>
        <Route path="/signup" element={ !authState.status ? <Signup /> : <Navigate to={"/"}/>}/>
        <Route path="/profil/:id" element={ <PrivateRoutes> <Profile /> </PrivateRoutes> }/>
        <Route path="*" element={ <PageNotFound/>} />
        </>
     
      </Routes>
      
    </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;

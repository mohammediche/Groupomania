//https://www.telerama.fr/sites/tr_master/files/styles/simplecrop1000/public/medias/2015/04/media_126061/call-of-duty-retour-sur-l-histoire-mouvementee-d-une-des-saga-les-plus-populaires-du-jeu-video%2CM217573.jpg?itok=4BONQD39"
import Home from "./components/Home";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Post from "./components/Post";
import EditPost from "./components/EditPost";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { BiArrowToLeft } from "react-icons/bi"; //icon
import "./styles/App.css";



function App() {
  return (
    <BrowserRouter>

    <header className="nav">
      <Link className="retour-accueil" to={"/"}>< BiArrowToLeft/>Revenir à l'accueil</Link>
      <Link to={"/signup"}>S'inscrire</Link>
      <Link to={"/login"}>Se connecter</Link>
      
    </header> 
      <Routes>
        <Route path="/" element={ <Home /> }/>
        <Route path="/post/:id" element={ <Post /> }/>
        <Route path="/edit-post/:id" element={ <EditPost /> }/>
        <Route path="/login" element={ <Login /> }/>
        <Route path="/signup" element={ <Signup /> }/>
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;

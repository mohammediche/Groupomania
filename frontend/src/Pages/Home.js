import React from 'react';
import AllPosts from "../components/AllPosts"
import Nav from '../components/Nav';


const Home = () => {
    return (
        <div className='CreatePost-AllPosts'>
              <Nav/>
              <AllPosts />
        </div>
    );
};

export default Home;
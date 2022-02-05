import React from 'react';
import AllPosts from "./AllPosts"
import Nav from './Nav';


const Home = () => {
    return (
        <div className='CreatePost-AllPosts'>
            <Nav/>
            <AllPosts />
        </div>
    );
};

export default Home;
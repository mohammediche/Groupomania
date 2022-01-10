import React from 'react';
import CreatePost from "./CreatePost"
import AllPosts from "./AllPosts"
import Nav from './Nav';


const Home = () => {
    return (
        <div className='CreatePost-AllPosts'>
            <Nav/>
            <CreatePost />
            <AllPosts />
        </div>
    );
};

export default Home;
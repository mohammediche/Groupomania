import React from 'react';
import CreatePost from "./CreatePost"
import AllPosts from "./AllPosts"


const Home = () => {
    return (
        <div className='CreatePost-AllPosts'>
            <CreatePost />
            <AllPosts />
        </div>
    );
};

export default Home;
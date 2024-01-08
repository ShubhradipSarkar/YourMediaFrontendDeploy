import React from 'react'
import Navbar1 from './Navbar'
import PostButton from './PostButton'

function Post(){
    return(

        <div>
            <Navbar1/>
            <center>
            <h1 className='postpage'>Post What's In Your Mind</h1>
            <PostButton/>
            </center>
            
        </div>
    )
}

export default Post
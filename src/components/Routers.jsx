import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import {Route, Routes} from 'react-router-dom'
import Friends_info from './Friends_info'
import Friend_requests from './Friend_requests'
import Locals from './Locals'
import Suggestions from './Suggestions'
import Feed from './Feed'
import Friends from './Friends'
import Test from './Test'
import Post from './Post'
import Auth from './Auth'
import Login from './Login'
import {Logout} from './Logout'
import Register from './Register'
import Primaryinfo from './PrimaryInfo'
import Profile from './Profile'

function Uapp(){
    return(
       
        <BrowserRouter>
         
            <Routes>
                <Route  path='/Feed' element={<Feed/>}/>
                <Route  path='/friends' element={<Friends_info/>}/>
                <Route  path='/friendrequests' element={<Friend_requests/>}/>
                <Route  path='/locals' element={<Locals/>}/>
                <Route  path='/suggestions' element={<Suggestions/>}/>
                {/* <Route  path='/yourconnections' element={<Friends/>}/> */}
                <Route  path='/test' element={<Test/>}/>
                <Route  path='/postWhatsinMind' element={<Post/>}/>
                {/* <Route  path='/' element={<Auth/>}/> */}
                <Route  path='/' element={<Login/>}/>
                <Route path="/logout" element={<Logout/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/primaryinfo" element={<Primaryinfo/>}/>
                <Route path="/profile" element={<Profile/>}/>
            </Routes>
            
            
        </BrowserRouter>
        
    )
}
export default Uapp
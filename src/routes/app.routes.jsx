import { Routes, Route } from 'react-router-dom';

import { Home } from '../pages/Home';
import { Details } from '../pages/Details';
import { Profile } from '../pages/Profile';
import { NoteCreate } from '../pages/NoteCreate';

export function AppRoutes(){
    return(
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/details/:id' element={<Details/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/noteCreate/' element={<NoteCreate/>}/>
        </Routes>
    )
};
import { Routes, Route } from 'react-router-dom';

import { Home } from '../pages/Home';
import { Details } from '../pages/Details';
import { Profile } from '../pages/Profile';
import { NoteCreate } from '../pages/NoteCreate';

export function AppRoutes(){
    return(
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/details' element={<Details/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/noteCreate/:id' element={<NoteCreate/>}/>
        </Routes>
    )
};
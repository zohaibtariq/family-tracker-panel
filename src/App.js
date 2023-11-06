import React from 'react';
import {BrowserRouter as Router, Route, Routes/*, Navigate*/} from 'react-router-dom';
import LoginPage from './components/LoginPage';
import ProtectedPage from './components/ProtectedPage';
import PublicPage from "./components/PublicPage";
import NotFoundPage from "./components/NotFoundPage";
import Protected from "./components/Protected";
import {useSelector} from "react-redux";
import {selectIsLoggedIn} from "./store/authSlice";

function App() {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    console.log('App::isLoggedIn')
    console.log(isLoggedIn)
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/protected"
                       element={
                           <Protected isLoggedIn={isLoggedIn}>
                               <ProtectedPage/>
                           </Protected>
                       }
                />
                <Route path="/public" element={<PublicPage/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
                {/*<Route path="*" element={ <Navigate to="/error-page" /> } />*/}
            </Routes>
        </Router>
    );
}

export default App;

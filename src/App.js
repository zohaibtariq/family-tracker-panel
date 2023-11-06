import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes/*, Navigate*/} from 'react-router-dom';
import LoginPage from './components/LoginPage';
import ProtectedPage from './components/ProtectedPage';
import PublicPage from "./components/PublicPage";
import NotFoundPage from "./components/NotFoundPage";
import Protected from "./components/Protected";
import {useDispatch} from "react-redux";
import {setTokens} from "./store/authSlice";

function App() {
    const dispatch = useDispatch();

    const isLoggedIn = localStorage.getItem('isLoggedIn');
    useEffect(() => {
        const storedAccessToken = localStorage.getItem('accessToken');
        const storedRefreshToken = localStorage.getItem('refreshToken');
        const storedUser = localStorage.getItem('user');
        const storedUserId = localStorage.getItem('userId');
        const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
        if (storedAccessToken && storedRefreshToken && storedUser && storedUserId && storedIsLoggedIn) {
            dispatch(setTokens({
                accessToken: storedAccessToken,
                refreshToken: storedRefreshToken,
                user: storedUser,
                userId: storedUserId,
                isLoggedIn: storedIsLoggedIn,
            }));
        }
    }, [dispatch]);
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

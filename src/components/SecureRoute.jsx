import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { refreshToken } from "../services/UserService";

export const SecureRoute = (props)=>{
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const checkUserToken = async () => {
        const userToken = localStorage.getItem('user-token');
        if (!userToken || userToken === 'undefined') {
            setIsLoggedIn(false);
            return navigate('/login');
        } else {
            setIsLoggedIn(true);
            await refreshTokenUser(userToken);
        }
    }
    useEffect(() => {
            checkUserToken();
        }, []);

    async function refreshTokenUser(expiredToken) {
        const data = await refreshToken(expiredToken);
        if (data.token) {
            localStorage.setItem('user-token', data.token);
        } else {
            console.error('Impossible de rafraîchir le token');
            setIsLoggedIn(false);
            navigate('/login');
        }
    }
    return (
        <>
            {
                isLoggedIn ? props.children : null
            }
       </>
    );
}
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
        }
    }
    useEffect(() => {
            checkUserToken();
        }, [setIsLoggedIn]);
    return (
        <>
            {
                isLoggedIn ? props.children : null
            }
       </>
    );
}
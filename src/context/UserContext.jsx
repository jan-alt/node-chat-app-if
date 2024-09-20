import { createContext, useContext, useEffect, useState } from "react";
import api from "../config/api";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    // const [name, setName] = useState("");
    const [user, setUser] = useState("");
    const [token, setToken] = useState(null);
    const nav = useNavigate();
    // return <UserContext.Provider value={{ name }}>{children}</UserContext.Provider>;

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        nav("/login");
    };

    useEffect(() => {
        api.get('/user', { headers: { Authorization: `Bearer ${token}` } }).then(res => {
            setUser(res.data.user)
        }).catch(() => nav('/login'))
    }, [token]);

    return <UserContext.Provider value={{ user, setToken, logout }}>{children}</UserContext.Provider>;

};

export default UserProvider;
export const useUser = () => useContext(UserContext)
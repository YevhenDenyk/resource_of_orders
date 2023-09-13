import {useContext, useState} from "react";

const AuthContext = useContext(null);

const AuthProvider = () => {
    const [user, setUser] = useState(null);


    return (
        <div>

        </div>
    );
};

export {AuthProvider};
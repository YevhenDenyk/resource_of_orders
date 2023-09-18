// import {createContext, useState} from "react";
//
// const AuthContext = createContext(null);
//
//
// const AuthProvider = ({children}) => {
//     const [user, setUser] = useState(null);
//     // встейті збережено юзера потрібно переписати на локальне сховище бо інфа губиться при перезагрузці сторінки
//
//     const logIn = (newUser, cb) => {
//         setUser(newUser);
//         cb();
//     }
//     const logOut = (cb) => {
//         setUser(null);
//         cb();
//     }
//     const value = {user, logOut, logIn}
//
//     return (
//         <AuthContext.Provider value={value}>
//             {children}
//         </AuthContext.Provider>
//     );
// };
//
// export {AuthProvider, AuthContext};
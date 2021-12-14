import React, { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
// utils
import axios from '../utils/axios';
import Cookies from 'universal-cookie';
import JSCookies from 'js-cookie';
import jwt from 'jwt-decode';

// ----------------------------------------------------------------------

const initialState = {
   isAuthenticated: false,
   isInitialized: false,
   user: null
};

const handlers = {
   INITIALIZE: (state, action) => {
      const { isAuthenticated, user } = action.payload;
      return {
         ...state,
         isAuthenticated,
         isInitialized: true,
         user
      };
   },
   LOGIN: (state, action) => {
      const { user } = action.payload;

      return {
         ...state,
         isAuthenticated: true,
         user
      };
   },
   LOGOUT: (state) => ({
      ...state,
      isAuthenticated: false,
      user: null
   }),
   REGISTER: (state, action) => {
      const { user } = action.payload;

      return {
         ...state,
         isAuthenticated: true,
         user
      };
   }
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
   ...initialState,
   method: 'jwt',
   login: () => Promise.resolve(),
   logout: () => Promise.resolve(),
   register: () => Promise.resolve()
});

AuthProvider.propTypes = {
   children: PropTypes.node
};

function AuthProvider({ children }) {
   const [state, dispatch] = useReducer(reducer, initialState);

   useEffect(() => {
      const initialize = async () => {
         try {
            const accessToken = JSCookies.get('jwt')
            if (accessToken) {
               if (jwt(accessToken)[Object.keys(jwt(accessToken))[3]] === "Admin") {
                  const user = JSON.parse(JSCookies.get('user'))
                  dispatch({
                     type: 'INITIALIZE',
                     payload: {
                        isAuthenticated: true,
                        user
                     }
                  });
               } else {
                  dispatch({
                     type: 'INITIALIZE',
                     payload: {
                        isAuthenticated: false,
                        user: null
                     }
                  });
               }
            } else {
               dispatch({
                  type: 'INITIALIZE',
                  payload: {
                     isAuthenticated: false,
                     user: null
                  }
               });
            }
         } catch (err) {
            console.error(err);
            dispatch({
               type: 'INITIALIZE',
               payload: {
                  isAuthenticated: false,
                  user: null
               }
            });
         }
      };
      initialize();
   }, []);

   const login = async () => {
      const cookies = new Cookies();
      const response = await axios.post('/api/account/login');
      const { accessToken, current_user } = response.data;
      if(accessToken === undefined) {
         return [200, { message: true }];
      }
      if (jwt(accessToken)[Object.keys(jwt(accessToken))[3]] === "Admin") {
         cookies.set('jwt', accessToken, { path: '/', maxAge: 60 * 60 * 1000 });
         cookies.set('user', current_user, { path: '/', maxAge: 60 * 60 * 1000 });
         const user = {
            about: '',
            address: '',
            displayName: current_user.displayName,
            email: jwt(accessToken)[Object.keys(jwt(accessToken))[2]],
            id: jwt(accessToken)[Object.keys(jwt(accessToken))[4]],
            isPublic: true,
            phoneNumber: '',
            photoURL: '',
            role: jwt(accessToken)[Object.keys(jwt(accessToken))[3]]
         }
         dispatch({
            type: 'LOGIN',
            payload: {
               user
            }
         });
      } else {
         return [200, { message: true }];
      }
   };

   const register = async (email, password, firstName, lastName) => {
      const response = await axios.post('/api/account/register', {
         email,
         password,
         firstName,
         lastName
      });
      const { accessToken, user } = response.data;

      window.localStorage.setItem('accessToken', accessToken);
      dispatch({
         type: 'REGISTER',
         payload: {
            user
         }
      });
   };

   const logout = async () => {
      // setSession(null);
      JSCookies.remove('jwt')
      dispatch({ type: 'LOGOUT' });
   };

   const resetPassword = () => { };

   const updateProfile = () => {
      const accessToken = JSCookies.get('jwt')
      const url = `https://api.pimo.studio/api/v1/brands/profile/${jwt(accessToken)[Object.keys(jwt(accessToken))[4]]}`
      fetch(url)
         .then(res => res.json())
         .then(data => {
            const user = {
               about: data.brand.description,
               address: data.brand.address,
               displayName: data.brand.name,
               email: data.brand.mail,
               id: data.brand.id,
               isPublic: true,
               phoneNumber: data.brand.phone,
               photoURL: data.brand.logo,
               role: 'Nhãn hàng',
               brandCateId: data.brand.brandCateId
            }
            dispatch({
               type: 'LOGIN',
               payload: {
                  user
               }
            });
         }
         )
   }

   return (
      <AuthContext.Provider
         value={{
            ...state,
            method: 'jwt',
            login,
            logout,
            register,
            resetPassword,
            updateProfile
         }}
      >

         {children}
      </AuthContext.Provider>
   );
}



export { AuthContext, AuthProvider };

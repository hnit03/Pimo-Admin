import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
import JSCookies from 'js-cookie';
import this_axios from 'axios';

require('dotenv').config()

// ----------------------------------------------------------------------

const initialState = {
   isLoading: false,
   error: false,
   myProfile: null,
   posts: [],
   users: [],
   userList: [],
   followers: [],
   friends: [],
   gallery: [],
   cards: null,
   addressBook: [],
   invoices: [],
   notifications: null
};

const slice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      // START LOADING
      startLoading(state) {
         state.isLoading = true;
      },

      // HAS ERROR
      hasError(state, action) {
         state.isLoading = false;
         state.error = action.payload;
      },

      // GET PROFILE
      getProfileSuccess(state, action) {
         state.isLoading = false;
         state.myProfile = action.payload;
      },

      // GET POSTS
      getPostsSuccess(state, action) {
         state.isLoading = false;
         state.posts = action.payload;
      },

      // GET USERS
      getUsersSuccess(state, action) {
         state.isLoading = false;
         state.users = action.payload;
      },

      // DELETE USERS
      deleteUser(state, action) {
         const accessToken = JSCookies.get('jwt')
         let axiosConfig = {
            headers: {
               'Content-Type': 'application/json;charset=UTF-8',
               "Access-Control-Allow-Origin": "*",
               'authorization': 'Bearer ' + accessToken,
            }
         };
         try {
            this_axios.delete(`${process.env.REACT_APP_API_URL}/models?id=${action.payload}`, axiosConfig);
         } catch (error) {
            console.log(error);
         }
         const deleteUser = filter(state.userList, (user) => 1 === 1);
         deleteUser.map((user) => {
            if (user.id === action.payload) {
               user.status = 'banned'
            }
         })
         state.userList = deleteUser;
      },

      // DELETE BRANDS
      deleteBrand(state, action) {
         const accessToken = JSCookies.get('jwt')
         let axiosConfig = {
            headers: {
               'Content-Type': 'application/json;charset=UTF-8',
               "Access-Control-Allow-Origin": "*",
               'authorization': 'Bearer ' + accessToken,
            }
         };
         try {
            this_axios.delete(`${process.env.REACT_APP_API_URL}/brands/${action.payload}`, axiosConfig);
         } catch (error) {
            console.log(error);
         }
         const deleteBrand = filter(state.userList, (user) => 1 === 1);
         deleteBrand.map((user) => {
            if (user.id === action.payload) {
               user.status = 'banned'
            }
         })
         state.userList = deleteBrand;
      },

      // DELETE EVENTS
      deleteEvent(state, action) {
         const accessToken = JSCookies.get('jwt')
         let axiosConfig = {
            headers: {
               'Content-Type': 'application/json;charset=UTF-8',
               "Access-Control-Allow-Origin": "*",
               'authorization': 'Bearer ' + accessToken,
            }
         };
         try {
            this_axios.delete(`${process.env.REACT_APP_API_URL}/castings/${action.payload}`, axiosConfig);
         } catch (error) {
            console.log(error);
         }
         const deleteUser = filter(state.userList, (user) => 1 === 1);
         deleteUser.map((user) => {
            if (user.id === action.payload) {
               console.log(user.id);
               console.log(action.payload);
               user.status = 'warning'
            }
         })
         state.userList = deleteUser;
      },

      // DELETE EVENTS
      applyEvent(state, action) {
         const accessToken = JSCookies.get('jwt')
         let axiosConfig = {
            headers: {
               'Content-Type': 'application/json;charset=UTF-8',
               "Access-Control-Allow-Origin": "*",
               'authorization': 'Bearer ' + accessToken,
            }
         };
         try {
            this_axios.put(`${process.env.REACT_APP_API_URL}/castings/admin`, action.payload, axiosConfig);
         } catch (error) {
            console.log(error);
         }
         const deleteUser = filter(state.userList, (user) => 1 === 1);
         deleteUser.map((user) => {
            if (user.id === action.payload) {
               console.log(user.id);
               console.log(action.payload);
               user.status = 'active'
            }
         })
         deleteUser.map((user) => {
            console.log(user.status);
         })
         state.userList = deleteUser;
      },

      // GET FOLLOWERS
      getFollowersSuccess(state, action) {
         state.isLoading = false;
         state.followers = action.payload;
      },

      // ON TOGGLE FOLLOW
      onToggleFollow(state, action) {
         const followerId = action.payload;

         const handleToggle = map(state.followers, (follower) => {
            if (follower.id === followerId) {
               return {
                  ...follower,
                  isFollowed: !follower.isFollowed
               };
            }
            return follower;
         });

         state.followers = handleToggle;
      },

      // GET FRIENDS
      getFriendsSuccess(state, action) {
         state.isLoading = false;
         state.friends = action.payload;
      },

      // GET GALLERY
      getGallerySuccess(state, action) {
         state.isLoading = false;
         state.gallery = action.payload;
      },

      // GET MANAGE USERS
      getUserListSuccess(state, action) {
         state.isLoading = false;
         state.userList = action.payload;
      },

      // GET CARDS
      getCardsSuccess(state, action) {
         state.isLoading = false;
         state.cards = action.payload;
      },

      // GET ADDRESS BOOK
      getAddressBookSuccess(state, action) {
         state.isLoading = false;
         state.addressBook = action.payload;
      },

      // GET INVOICES
      getInvoicesSuccess(state, action) {
         state.isLoading = false;
         state.invoices = action.payload;
      },

      // GET NOTIFICATIONS
      getNotificationsSuccess(state, action) {
         state.isLoading = false;
         state.notifications = action.payload;
      }
   }
});

// Reducer
export default slice.reducer;

// Actions
export const { onToggleFollow, deleteUser, deleteBrand, deleteEvent, applyEvent } = slice.actions;

// ----------------------------------------------------------------------

export function getProfile() {
   return async (dispatch) => {
      dispatch(slice.actions.startLoading());
      try {
         const response = await axios.get('/api/user/profile');
         dispatch(slice.actions.getProfileSuccess(response.data.profile));
      } catch (error) {
         dispatch(slice.actions.hasError(error));
      }
   };
}

// ----------------------------------------------------------------------

export function getPosts() {
   return async (dispatch) => {
      dispatch(slice.actions.startLoading());
      try {
         const response = await axios.get('/api/user/posts');
         dispatch(slice.actions.getPostsSuccess(response.data.posts));
      } catch (error) {
         dispatch(slice.actions.hasError(error));
      }
   };
}

// ----------------------------------------------------------------------

export function getFollowers() {
   return async (dispatch) => {
      dispatch(slice.actions.startLoading());
      try {
         const response = await axios.get('/api/user/social/followers');
         dispatch(slice.actions.getFollowersSuccess(response.data.followers));
      } catch (error) {
         dispatch(slice.actions.hasError(error));
      }
   };
}

// ----------------------------------------------------------------------

export function getFriends() {
   return async (dispatch) => {
      dispatch(slice.actions.startLoading());
      try {
         const response = await axios.get('/api/user/social/friends');
         dispatch(slice.actions.getFriendsSuccess(response.data.friends));
      } catch (error) {
         dispatch(slice.actions.hasError(error));
      }
   };
}

// ----------------------------------------------------------------------

export function getCastings() {
   return async (dispatch) => {
      dispatch(slice.actions.startLoading());
      try {
         const response = await axios.get('/api/casting/all');
         dispatch(slice.actions.getUsersSuccess(response.data.users));
      } catch (error) {
         dispatch(slice.actions.hasError(error));
      }
   };
}

// ----------------------------------------------------------------------

export function getGallery() {
   return async (dispatch) => {
      dispatch(slice.actions.startLoading());
      try {
         const response = await axios.get('/api/user/social/gallery');
         dispatch(slice.actions.getGallerySuccess(response.data.gallery));
      } catch (error) {
         dispatch(slice.actions.hasError(error));
      }
   };
}

// ----------------------------------------------------------------------

export function getUserList() {
   return async (dispatch) => {
      dispatch(slice.actions.startLoading());
      try {
         const response = await axios.get('/api/user/manage-users');
         dispatch(slice.actions.getUserListSuccess(response.data.users));
      } catch (error) {
         dispatch(slice.actions.hasError(error));
      }
   };
}

// ----------------------------------------------------------------------

export function getBrandList() {
   return async (dispatch) => {
      dispatch(slice.actions.startLoading());
      try {
         const response = await axios.get('/api/user/manage-brands');
         dispatch(slice.actions.getUserListSuccess(response.data.users));
      } catch (error) {
         dispatch(slice.actions.hasError(error));
      }
   };
}

// ----------------------------------------------------------------------

export function getCastingList() {
   return async (dispatch) => {
      dispatch(slice.actions.startLoading());
      try {
         const response = await axios.get('/api/user/manage-castings');
         dispatch(slice.actions.getUserListSuccess(response.data.users));
      } catch (error) {
         dispatch(slice.actions.hasError(error));
      }
   };
}

// ----------------------------------------------------------------------
export function getCards() {
   return async (dispatch) => {
      dispatch(slice.actions.startLoading());
      try {
         const response = await axios.get('/api/user/account/cards');
         dispatch(slice.actions.getCardsSuccess(response.data.cards));
      } catch (error) {
         dispatch(slice.actions.hasError(error));
      }
   };
}

// ----------------------------------------------------------------------

export function getAddressBook() {
   return async (dispatch) => {
      dispatch(slice.actions.startLoading());
      try {
         const response = await axios.get('/api/user/account/address-book');
         dispatch(slice.actions.getAddressBookSuccess(response.data.addressBook));
      } catch (error) {
         dispatch(slice.actions.hasError(error));
      }
   };
}

// ----------------------------------------------------------------------

export function getInvoices() {
   return async (dispatch) => {
      dispatch(slice.actions.startLoading());
      try {
         const response = await axios.get('/api/user/account/invoices');
         dispatch(slice.actions.getInvoicesSuccess(response.data.invoices));
      } catch (error) {
         dispatch(slice.actions.hasError(error));
      }
   };
}

// ----------------------------------------------------------------------

export function getNotifications() {
   return async (dispatch) => {
      dispatch(slice.actions.startLoading());
      try {
         const response = await axios.get('/api/user/account/notifications-settings');
         dispatch(slice.actions.getNotificationsSuccess(response.data.notifications));
      } catch (error) {
         dispatch(slice.actions.hasError(error));
      }
   };
}

// ----------------------------------------------------------------------

export function getUsers() {
   return async (dispatch) => {
      dispatch(slice.actions.startLoading());
      try {
         const response = await axios.get('/api/user/all');
         dispatch(slice.actions.getUsersSuccess(response.data.users));
      } catch (error) {
         dispatch(slice.actions.hasError(error));
      }
   };
}

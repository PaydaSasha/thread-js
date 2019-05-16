import * as authService from 'src/services/authService';
import { SET_USER, SET_IS_LOADING } from './profileActionTypes';

const setToken = token => localStorage.setItem('token', token);

const setUser = user => async dispatch => dispatch({
    type: SET_USER,
    user
});

const setIsLoading = isLoading => async dispatch => dispatch({
    type: SET_IS_LOADING,
    isLoading
});

const setAuthData = (user = null, token = '') => (dispatch, getRootState) => {
    setUser(user)(dispatch, getRootState);
    setToken(token);
};

const handleAuthResponse = authResponsePromise => async (dispatch, getRootState) => {
    setIsLoading(true)(dispatch, getRootState);
    const { user, token } = await authResponsePromise;
    setAuthData(user, token)(dispatch, getRootState);
    setIsLoading(false)(dispatch, getRootState);
};

export const login = request => handleAuthResponse(authService.login(request));

export const registration = request => handleAuthResponse(authService.registration(request));

export const logout = () => setAuthData();

export const loadCurrentUser = () => async (dispatch, getRootState) => {
    setIsLoading(true)(dispatch, getRootState);
    const user = await authService.getCurrentUser();
    setUser(user)(dispatch, getRootState);
    setIsLoading(false)(dispatch, getRootState);
};

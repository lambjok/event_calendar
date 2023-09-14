import { AuthActionsEnum, SetAuthAction, SetUserAction } from "./types";

import { IUser } from "../../../models/IUser";

import { AppDispatch } from "../../";

import UserService from "../../../api/UserService";

export const AuthActionCreators = {
  setUser: (user: IUser): SetUserAction => ({ type: AuthActionsEnum.SET_USER, payload: user }),
  setIsAuth: (auth: boolean): SetAuthAction => ({ type: AuthActionsEnum.SET_AUTH, payload: auth }),
  setIsLoading: (payload: boolean) => ({ type: AuthActionsEnum.SET_IS_LOADING, payload}),
  setError: (payload: string) => ({ type: AuthActionsEnum.SET_ERROR, payload }),
  login: (username: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(AuthActionCreators.setIsLoading(true));
      setTimeout(async () => {
        const responce = await UserService.getUsers();
        const mockUser = responce.data.find(user => user.username === username && user.password === password);
        if (mockUser) {
          localStorage.setItem('auth', 'true');
          localStorage.setItem('username', mockUser.username);
          dispatch(AuthActionCreators.setUser(mockUser));
          dispatch(AuthActionCreators.setIsAuth(true));
        } else {
          dispatch(AuthActionCreators.setError('Incorrect login or password!'))
        }
        dispatch(AuthActionCreators.setIsLoading(false));
      }, 1000)
    } catch (e: any) {
      dispatch(AuthActionCreators.setError(`${e}!`));
    }
  },
  logout: () => async (dispatch: AppDispatch) => {
    localStorage.removeItem('auth');
    localStorage.removeItem('username');
    dispatch(AuthActionCreators.setUser({} as IUser));
    dispatch(AuthActionCreators.setIsAuth(false));
  }
}
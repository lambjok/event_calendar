import axios, { AxiosResponse } from 'axios';

import { IUser } from "../models/IUser"

const getUsers = async () : Promise<AxiosResponse<IUser[]>> => axios.get<IUser[]>('./users.json');

export default { getUsers };
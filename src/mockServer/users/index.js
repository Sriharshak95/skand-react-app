/* eslint-disable import/prefer-default-export */
import userData from './userData.json';

const getUsers = JSON.parse(JSON.stringify(userData));

export default getUsers;

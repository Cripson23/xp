import {Feature} from './Feature';
import {User} from './User';


export const featureAPI = new Feature({
  baseUrl: '/api',
});
export const userAPI = new User({
  baseUrl: '/api',
});

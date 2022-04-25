import {Requester} from './Requester';


export class User extends Requester {

  async authorize({username, password}) {
    let response = await this.get('/login/', {
      headers: {
        ...this.getAuthHeader(`${username}:${password}`),
      },
    });

    if (+response.status === 401) {
      return {
        status: false,
        reason: 'Неверный логин/пароль',
      };
    }

    let result = {
      status: false,
      reason: 'Bad request',
    };
    try {
      result = {
        status: true,
        data: await response.json(),
      };
    } catch (e) {
      console.log(e);
    }

    return result;
  }

  async register(userData) {
    let response = await this.post('/register/', userData);
    return await response.json();
  }
}

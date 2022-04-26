import { Requester } from "./Requester";

export class User extends Requester {
  async authorize({ username, password }) {
    let result = {
      status: false,
      reason: "Bad request",
    };
    try {
      result = {
        status: true,
        data: await this.get("/login/", {
          headers: {
            ...this.getAuthHeader(`${username}:${password}`),
          },
        }),
      };
    } catch (e) {
      console.log(e);
    }

    return result;
  }

  async register(userData) {
    return await this.post("/register/", userData);
  }
}

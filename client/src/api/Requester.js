export class Requester {
  constructor({baseUrl = '/api', headers = {}}) {
    this._baseUrl = baseUrl;
    this._headers = {
      'Content-Type': 'application/json',
      ...headers,
    };
  }

  async get(entityPath = '/') {
    console.log(entityPath);
    return await this.request({
      method: 'get',
      entityPath,
    });
  }

  async post(entityPath = '/', body = {}) {
    return await this.request({
      method: 'post',
      body,
      entityPath,
    });
  }

  async delete(entityPath = '/') {
    return await this.request({
      method: 'delete',
      entityPath,
    });
  }

  async put(entityPath = '/', body = {}) {
    return await this.request({
      method: 'put',
      entityPath,
      body,
    });
  }

  async request({
    method = 'get',
    baseUrl = this._baseUrl,
    entityPath = null,
    headers = this._headers,
    body = null,
  }) {
    let response = await fetch(`${baseUrl}${entityPath}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });



    return await response.json();
  }
}

export class Requester {
  constructor({ baseUrl = "/api", headers = {} }) {
    this._baseUrl = baseUrl;
    this._headers = {
      "Content-Type": "application/json",
      ...headers,
    };
  }

  getAuthHeader(data) {
    return {
      Authorization: `Basic ${btoa(data)}`,
    };
  }

  async get(entityPath = "/", params = {}) {
    return await this.request({
      method: "get",
      entityPath,
      ...params,
    });
  }

  async post(entityPath = "/", body = {}, params = {}) {
    return await this.request({
      method: "post",
      body,
      entityPath,
      ...params,
    });
  }

  async delete(entityPath = "/", params = {}) {
    return await this.request({
      method: "delete",
      entityPath,
      ...params,
    });
  }

  async put(entityPath = "/", body = {}, params) {
    return await this.request({
      method: "put",
      entityPath,
      body,
      ...params,
    });
  }

  async request({
    method = "get",
    baseUrl = this._baseUrl,
    entityPath = null,
    headers = {},
    body = null,
    isFormData = false,
  }) {
    let requestHeaders = {
      ...headers,
      ...this._headers,
    };
    if (isFormData) {
      delete requestHeaders["Content-Type"];
    } else {
      body = body ? JSON.stringify(body) : null;
    }

    let result = await fetch(`${baseUrl}${entityPath}`, {
      method,
      headers: requestHeaders,
      body: body ? body : null,
    });

    result = await result.json();
    return result;
  }
}

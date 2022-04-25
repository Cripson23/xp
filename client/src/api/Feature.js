import {Requester} from './Requester';


export class Feature extends Requester {
  async getFeatures(token = null) {
    let headers = null;
    if (token !== null) {
      headers = {
        ...this.getAuthHeader(token),
      };
    }
    let result = await this.get('/objects/', {headers});
    return await result.json();
  }

  async createFeature(featureData, token) {
    let headers = null;
    if (token !== null) {
      headers = {
        ...this.getAuthHeader(token),
      };
    }
    let result = await this.post('/objects/', featureData, {headers});
    return await result.json();
  }

  async deleteFeature(id, token) {
    let headers = null;
    if (token !== null) {
      headers = {
        ...this.getAuthHeader(token),
      };
    }
    return await this.delete(`/objects/${id}`, {headers});
  }
}

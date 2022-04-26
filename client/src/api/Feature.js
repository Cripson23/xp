import { Requester } from "./Requester";

export class Feature extends Requester {
  async getFeatures(token = null) {
    let headers = null;
    if (token) {
      headers = {
        ...this.getAuthHeader(token),
      };
    }
    let result = await this.get("/objects/", { headers });
    return await result.json();
  }

  async createFeature(featureData, token) {
    let headers = null;
    if (token) {
      headers = {
        ...this.getAuthHeader(token),
      };
    }
    let result = await this.post("/objects/", featureData, { headers });
    return await result.json();

    // if (!Object.prototype.hasOwnProperty.call(result, 'id')) {
    //   return null;
    // }
    //
    // let imagesResult = await this.post(
    //     `/objects/${result.id}/upload-img/`,
    //     images,
    //     {
    //       isFormData: true,
    //     });
    //
    // imagesResult = await imagesResult.json();
    // console.log('imagesResult: ', JSON.parse(JSON.stringify(imagesResult)));
    // return result;
  }

  async deleteFeature(id, token) {
    let headers = null;
    if (token) {
      headers = {
        ...this.getAuthHeader(token),
      };
    }
    return await this.delete(`/objects/${id}`, { headers });
  }

  async fetchImages(featureId, token) {
    let headers = null;
    if (token) {
      headers = {
        ...this.getAuthHeader(token),
      };
    }

    let response = await this.get(`/objects/${featureId}/`, { headers });
    response = await response.json();
    return response.images;
  }

  async addImage(id, formData, token) {
    let headers = null;
    if (token) {
      headers = {
        ...this.getAuthHeader(token),
      };
    }

    let response = await this.post(`/objects/${id}/upload-img/`, formData, {
      headers: headers,
      isFormData: true,
    });

    response = await response.json();
    console.log("response: ", JSON.parse(JSON.stringify(response)));

    return response;
  }
}

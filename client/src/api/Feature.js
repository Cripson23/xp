import {Requester} from './Requester';


export class Feature extends Requester {
  random(min, max) {
    return Math.random() * (max - min) + min;
  }

  *generateTest() {
    let counter = 0;
    while (true) {
      counter++;
      yield {
        idObject: counter,
        name: `Test ${counter}`,
        descriptionObject: `Description ${counter}`,
        xObject: this.random(57.95713196221859, 58.01208284993545),
        yObject: this.random(56.13360939239281, 56.25360478150062),
      };
    }
  }

  async getFeatures() {
    let res = [];
    let generator = this.generateTest();
    for (let i = 0; i < 10; i++) {
      res.push(generator.next().value);
    }
    res = [...res, ...await this.get('/objects')];

    return res;

  }

  async createFeature(featureData) {
    let res = await this.post('/objects/', featureData);

    console.log('res: ', JSON.parse(JSON.stringify(res)));

  }
}

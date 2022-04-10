import {Requester} from './Requester';


export class POI extends Requester {
  random(min, max) {
    return Math.random() * (max - min) + min;
  }

  *generateTest() {
    let counter = 0;
    while(true) {
      counter++;
      yield {
        idObject: counter,
        nameObject: `Test ${counter}`,
        descriptionObject: `Description ${counter}`,
        xObject: this.random(56.13360939239281, 56.25360478150062),
        yObject: this.random(57.95713196221859, 58.01208284993545),
      }
    }
  }
  async getPOIs() {
    let res = [];
    let test = this.generateTest()
    for(let i = 0; i < 10; i++) {
      res.push(test.next().value);
    }
    return res;
    // return await this.get('/objects/');
  }
}

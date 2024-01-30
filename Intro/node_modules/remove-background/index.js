const superagent = require('superagent')
const fs = require('fs')

const detectron2Endpoint = 'https://master-ainized-detectron2-gkswjdzz.endpoint.ainize.ai'

/**
 * @classdesc Represents an Detectron2 API call.
 * @class
 * @abstract
 */
class Detectron2 {
  /**
   * Create a Detectron2.
   * @constructor
   * @param {string} baseURL - String with the base URL.
   */
  constructor (baseURL) {
    this.baseURL = baseURL
  }

  getObjectCoordinates () {
    return superagent
      .post(`${this.baseURL}/predictions`)
      .accept('application/json')
      .type('form')
      .set({ preview: false })
      .attach('file', './cat.jpg')
  }
}

/**
 * @classdesc Represents an RemoveDotBg API call.
 * https://www.remove.bg/api
 */
class RemoveDotBg {
  constructor (removeBgApiKey) {
    this.baseURL = 'https://api.remove.bg/v1.0/removebg'
    this.apiKey = removeBgApiKey
  }

  getBgRemovedImage (filePath) {
    if (!filePath) throw new Error('filePath param is empty.')

    return superagent
      .post(this.baseURL)
      .set({ 'X-Api-Key': this.apiKey })
      .type('form')
      .field('size', 'auto')
      .attach('image_file', fs.createReadStream(filePath))
  }
}

class RemoveBackground {
  constructor (removeBgApiKey) {
    this.detectron2 = new Detectron2(detectron2Endpoint)
    this.removeDotBg = new RemoveDotBg(removeBgApiKey)
  }
}

module.exports = RemoveBackground

require('dotenv').config()
const amazon = require('amazon-product-api')

class AmazonSearch {
  constructor() {
    console.log('constructing', process.env.ACCESS_KEY_ID);
    this.client = amazon.createClient({
      awsId: process.env.REACT_APP_ACCESS_KEY_ID,
      awsSecret: process.env.REACT_APP_SECRET_ACCESS_KEY,
      awsTag: process.env.REACT_APP_SELECTED_TRACKING_ID
    })
  }

  searchByKeyword(keyword) {
    console.log('searching', keyword);
    return this.client.itemSearch({
      condition: 'New',
      keywords: keyword,
      responseGroup: 'ItemAttributes,Images'
    }).then(results => {
      console.log('got results', results)
      console.log('results length', results.length)
      return results.map(result => this.parseAmazonProduct(result))
    }).catch(err => {
      console.log(err)
      return err
    })
  }

  parseAmazonProduct(data) {
    console.log('parsing random product', data);
    return {
      id: data.ASIN[0],
      link: data.DetailPageURL[0],
      image_link: data.LargeImage ? data.LargeImage[0].URL[0] : null,
      name: data.ItemAttributes[0].Title[0],
      price: data.ItemAttributes[0].ListPrice ? data.ItemAttributes[0].ListPrice[0].FormattedPrice[0]: null
    }
  }
}

const amazonSearch = new AmazonSearch()
export default amazonSearch
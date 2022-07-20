const withImages = require('next-images')

const settings = {
  future: {
    webpack5: true,
  },
  images: {
    disableStaticImages: true
  },


}
module.exports = withImages(settings)

const mongoose = require('mongoose');

const siteContentSchema = new mongoose.Schema({
  heroHeadline: {
    type: String,
    default: "Nature's Touch at Your Doorstep"
  },
  heroSubhead: {
    type: String,
    default: "Discover our wide range of Wood, Ayurved, Food, Fruit, and Flower plants, alongside our signature homemade products like authentic Achar and Papad. Cultivated with love, delivered with care."
  },
  productsHeadline: {
    type: String,
    default: "Nature's Favorites"
  },
  aboutHeadline: {
    type: String,
    default: "About Our Roots"
  },
  aboutText1: {
    type: String,
    default: "Shree Plantation began with a simple mission: to bring the purity of nature directly into people's homes. We specialize in cultivating a diverse variety of plants—from towering wood plants to medicinal Ayurved herbs."
  },
  aboutText2: {
    type: String,
    default: "But our roots go deeper than just soil. We believe in preserving traditional culinary arts. Our homemade products, including hand-crafted Achar and naturally dried Papads, are made using generations-old recipes."
  },
  contactAddress: {
    type: String,
    default: "Fulbari, Kishanganj"
  },
  contactPhone: {
    type: String,
    default: "8409966393/9635329770"
  },
  contactEmail: {
    type: String,
    default: "monumanish345@gmail.com"
  },
  ownerName: {
    type: String,
    default: "Monu Manish"
  },
  heroImage: {
    type: String
  },
  heroImages: {
    type: [String],
    default: []
  },
  aboutImage1: {
    type: String
  },
  aboutImages1: {
    type: [String],
    default: []
  },
  aboutImage2: {
    type: String
  },
  aboutImages2: {
    type: [String],
    default: []
  },
  testimonials: [{
    name: String,
    message: String,
    id: String
  }]
});

module.exports = mongoose.model('SiteContent', siteContentSchema);

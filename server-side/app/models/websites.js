const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const websitesSchema = new Schema({
    id: { type: String, required: true, default: () => mongoose.Types.ObjectId().toHexString() },
    siteName: { type: String,  default: '' },
    title: { type: String,  default: '' },
    metaDescription: { type: String, default: '' },
    metaKeywords: {type: String, default: ''},
    imageSrc: {type: String, default: new Date()},
    hyperLinks: {type: String, default: ''},
    socialLinks: { type: Boolean, default: false },
}, { collection: 'Websites' });

const WebsitesModal = mongoose.model('Websites', websitesSchema);
module.exports = WebsitesModal;
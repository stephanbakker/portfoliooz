'use strict';

const mongoose = require('mongoose');

const PageSchema = new mongoose.Schema({
    title: {type: String, trim: true},
    html: {type: String, trim: true},
    type: {type: String, default: 'content'},
    photoSetId: {type: String},
    photosDate: {type: Number},
    photos: {type: Array}
});

mongoose.model('Page', PageSchema);

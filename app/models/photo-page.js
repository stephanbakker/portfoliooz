'use strict';

const mongoose = require('mongoose');

const PhotoPageSchema = new mongoose.Schema({
    name: {type: String, trim: true},
    id: {type: String, trim: true},
    date: {type: Number},
});

const PhotoSetSchema = new mongoose.Schema({
    "id": {type: String},
	"title": {type: String},
    "photos": {type: Array, default: []}
});

mongoose.model('PhotoPage', PhotoPageSchema);
mongoose.model('PhotoSet', PhotoSetSchema);

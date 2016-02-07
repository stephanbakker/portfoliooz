'use strict';

const mongoose = require('mongoose');

const PageSchema = new mongoose.Schema({
    title: {type: String, trim: true},
    html: {type: String, trim: true}
});

mongoose.model('Page', PageSchema);

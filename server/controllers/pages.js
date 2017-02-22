const config = require('../config/config');
import {updateContentPages} from './update-pages.factory';

export default updatePages;

let timer;

function updatePages(req, res, next) {
  if (req.githubUpdate) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(updateContentPages, config.CONTENTS_UPDATE_WAIT);
  }
  // allways respond with 200, will leave you in the dark
  // about triggering update or not ;-)
  res.sendStatus(200);
}


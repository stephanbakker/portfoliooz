export {mapTags};

function mapTags(photos) {
  return photos.map(photo => {
    if (photo.tags !== '') {
      photo.tags = parseTags(photo.tags);
    }
    return photo;
  });
}

function parseTags(tagString) {
  return tagString.replace(/tm/g, '-');
}

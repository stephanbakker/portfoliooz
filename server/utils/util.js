export {titleToRoute};

function titleToRoute(title) {
  return title.trim().replace(/\s/g, '-');
}

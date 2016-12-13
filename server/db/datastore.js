'use strict';

const datastore = datastoreFactory();

export {datastore as default};

function datastoreFactory() {
  const pages = {
    content: [],
    photo: [],
    saveDate: {
      content: null,
      photo: null
    }
  };

  function updatePages(newPages, type) {
    pages[type] = newPages;
    pages.saveDate[type] = Date.now();

    return pages;
  }

  function getPages() {
    return pages.photo.concat(pages.content);
  }

  function getSaveDate(type) {
    return pages.saveDate[type];
  }

  return {
    updatePages,
    getPages,
    getSaveDate
  };
}

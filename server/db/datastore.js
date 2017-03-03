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
    pages[type] = (type === 'content') ?
        newPages.sort() : newPages;

    pages.saveDate[type] = Date.now();

    return pages;
  }

  function getPages(order) {
    let reversedContent = pages.content;
    let orderedPages = [...pages.photo, ...reversedContent];

    orderedPages = [...pages.photo, ...pages.content].reduce((arr, item, i) => {
      arr[item.title === 'home' ? 'unshift' : 'push'](item);
      return arr;
    }, []);

    return orderedPages;
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

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

  function getPages(order) {
    let orderedPages = [...pages.photo, ...pages.content];

    orderedPages = [...pages.photo, ...pages.content].reduce((arr, item, i) => {
      arr[item.title === 'news' ? 'unshift' : 'push'](item);
      return arr;
    }, []);

    return orderedPages;

    // move news to the first index


    // _order.forEach(function pushTypeToPages(type) {
    //   const matchPage = type.match(/(\w+):(\w+)/);
    //   if (matchPage) {
    //     let pageType = pages[matchPage[1]].find(p =>
    //       p.title === matchPage[2]
    //     );
    //     orderedPages.push(pageType);
    //   } else {
    //     orderedPages = [...orderedPages, ...pages[type]];
    //   }
    // });

    // console.log(orderedPages.map(p => p.title), '======================')
    // return orderedPages;
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

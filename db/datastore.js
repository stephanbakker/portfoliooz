'use strict';

module.exports = (() => {

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

       console.log('data updates:----------------\n', getPages());
       return pages;
    }

    function getPages() {
        return pages.content.concat(pages.photo);
    }

    function getSaveDate(type) {
        return pages.saveDate[type];
    }

    return {
        updatePages,
        getPages,
        getSaveDate
    };
})();

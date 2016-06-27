export default (pages, req, res, next) => {
    const pageTitle = req.params.page;

    req.pages = pages;

    if (pageTitle) {
        req.page = pages.find(page => page.title === pageTitle);
    }

    next();
};

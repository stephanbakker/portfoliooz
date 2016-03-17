import React from 'react';
// we'll use this to render our app to an html string
import { renderToString } from 'react-dom/server';
// and these to match the url to routes and then render
import { match, RouterContext } from 'react-router';
import routes from './routes';


export default  (req, res, next) => {

    // match the routes to the url
    match({ routes: routes, location: req.url }, (err, redirect, props) => {

        // add pages from middleware
        props.params.pages = req.pages;

        if (props.params.page) {
            props.params.pageContent = req.pages.find(page => page.title === props.params.page);
        }

        // in here we can make some decisions all at once
        if (err) {
            // there was an error somewhere during route matching
            res.status(500).send(err.message);

        } else if (redirect) {
            // we haven't talked about `onEnter` hooks on routes, but before a
            // route is entered, it can redirect. Here we handle on the server.
            res.redirect(redirect.pathname + redirect.search);

        } else if (props && (isPageOrHome(props.params.page, props.params.pageContent))) {

            // if we got props then we matched a route and can render
            const appHtml = renderToString(<RouterContext {...props}/>);
            res.send(renderPage(appHtml, props))

        } else {
            // no errors, no redirect, we just didn't match anything
            res.status(404).send('Not Found')

        }
    });

}

function isPageOrHome(page, content) {
    return page ? !!content : true;
}

function renderPage(appHtml, props) {
    const scriptProps = JSON.stringify(props);
    return `
        <!doctype html>
        <html>
            <meta charset="utf-8"/>
            <title>My First React Router App</title>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css">
            <link rel="stylesheet" href="/main.css"/>
            <body>
                <div id="app" class="app">${appHtml}</div>
                <script>
                    window.__initialProps__ = ${scriptProps};
                </script>
                <script src="/bundle.js"></script>
            </body>
        </html>
    `
}

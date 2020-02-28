NC-News (FRONTEND) - REACT WEBSITE

A website (https://frosty-raman-bc528a.netlify.com/stats) that gets data from https://jamie-backendapp.herokuapp.com/api to display Topics, Articles and Comments. It allows voting on comments that weren't created by the logged in user, and the ability to post and delete comments to articles. Articles can be arranged several ways and the website displays on both a monitor and a smaller phone display.

LOCAL USE SETUP

Install the required dependencies (axios, @reach/router)

```bash
npm install
```

LOCAL USE BROWSING

To start the website locally, just type the command "npm start" and it should automatically open your default browser to http://localhost:3000/ and display the Homepage.

```bash
npm start
```

INFORMATION ABOUT THE SITE

The site doesn't have a live login server but you can log in as any user by typing any password over 1 character long.
To test the full functionality log in as a user that has made articles and comments - tickle122, cooljmessy, weegembump, jessjelly or the user that is logged in as default grumpy19.

FUNCTIONALITY

-required to accept disclaimer before viewing the site
-nav bar displaying logged in user (defaulting to grumpy19 but accepting tickle122, cooljmessy, weegembump and jessjelly with any password) and their avatar. With the ability to change user at any time.
-loading gif displayed when making a request from the backend server.
-list of clickable topics linking to all the articles in that topic.
-ability to sort the articles based on date, comments and votes in both ascending and descending order.
-each article has a link to the full article and allows the logged in user to vote once on an article
-show comments button, click to show all comments in that article. Allows the logged in user to delete their own comments, post a new comment or vote on other users comments once.
-each full article shows the full information. Comments show by default and has all the functionality of the pervious comments section.
-articles/stats page shows all articles currently on the server each with a link to the full article. These can be sorted again by date comment and vote in either ascending or descending order.
-the stats shows the most popular and least popular articles with links and totals the number of topics and articles on the server.

LINKS:

Live Website: https://frosty-raman-bc528a.netlify.com/stats
Frontend github repo: https://github.com/JamieLG/nc-news
Backend github repo: https://github.com/JamieLG/be-nc-news

CONTRIBUTING

Jamie Gormley

ACKNOWLEDGMENTS

NorthCoders - setup the project.

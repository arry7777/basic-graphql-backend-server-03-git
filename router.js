const express = require('express')
const router = express.Router();

const routehandler = (req, res) => {
  res.send(
    `<div style="
       display:flex;
       text-align:center;
       height:80rem;
       width:80rem;
       font-size:1.3em;
    ">
    <h1 style="color:white;
                padding:5rem;
               background:conic-gradient(#ff5e7c,#c272d4,#6bbae8);
               height:100%;
               width:100%;
               left:50%;
               top:50%;
              ">
    Hi thanku for visiting... </hr></br>
    This is a graphql api which uses <i>GraphiQL<i/> Tool .</br>
    for making query requests for Testing... So u need to access </br> <a href=" https://basic-graphql-server-03.herokuapp.com/graphql"> https://basic-graphql-server-03.herokuapp.com/graphql </a>. </br>Route for using graphiql for making queries to the Server</h1>
    </div>`
  );
  //next()
};

router.route("/").get(routehandler);

module.exports = router;
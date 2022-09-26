products = [{"name":"Tasty Cotton Chair","price":444,"dimensions":{"x":2,"y":4,"z":5},"stock":21, "reviews": [], "id":0},
{"name":"Small Concrete Towels","price":806,"dimensions":{"x":4,"y":7,"z":8},"stock":47, "reviews": [], "id":1},
{"name":"Small Metal Tuna","price":897,"dimensions":{"x":7,"y":4,"z":5},"stock":13, "reviews": [], "id":2},
{"name":"Generic Fresh Chair","price":403,"dimensions":{"x":3,"y":8,"z":11},"stock":47, "reviews": [], "id":3},
{"name":"Generic Steel Keyboard","price":956,"dimensions":{"x":3,"y":8,"z":6},"stock":8, "reviews": [], "id":4},
{"name":"Refined Metal Bike","price":435,"dimensions":{"x":7,"y":5,"z":5},"stock":36, "reviews": [], "id":5},
{"name":"Practical Steel Pizza","price":98,"dimensions":{"x":4,"y":7,"z":4},"stock":12, "reviews": [], "id":6},
{"name":"Awesome Wooden Bike","price":36,"dimensions":{"x":11,"y":10,"z":10},"stock":3, "reviews": [], "id":7},
{"name":"Licensed Cotton Keyboard","price":990,"dimensions":{"x":8,"y":7,"z":3},"stock":27, "reviews": [], "id":8},
{"name":"Incredible Fresh Hat","price":561,"dimensions":{"x":6,"y":7,"z":5},"stock":28, "reviews": [], "id":9},
{"name":"Tasty Cotton Soap","price":573,"dimensions":{"x":2,"y":6,"z":11},"stock":31, "reviews": [], "id":10},
{"name":"Intelligent Metal Mouse","price":3,"dimensions":{"x":4,"y":5,"z":10},"stock":0, "reviews": [], "id":11},
{"name":"Practical Plastic Ball","price":11,"dimensions":{"x":11,"y":9,"z":11},"stock":25, "reviews": [], "id":12},
{"name":"Rustic Fresh Tuna","price":159,"dimensions":{"x":8,"y":6,"z":8},"stock":30, "reviews": [], "id":13},
{"name":"Small Metal Tuna","price":225,"dimensions":{"x":8,"y":10,"z":8},"stock":49, "reviews": [], "id":14}];

let nextId = products[products.length-1].id + 1

const express = require('express');
const fs = require("fs");

const app = express();

app.set('view engine', 'pug')

app.use(express.json());

app.get("/", function(req, res, next){
  res.render("pages/index")
})

app.get("/add", function(req, res, next){
  res.render("pages/addproduct")
})

app.get("/addproduct.js", function(req, res, next){
  fs.readFile("addproduct.js", function(err, data){
    if(err){
      send500(res);
      return;
    }
    res.statusCode = 200;
    res.end(data);
    return;
  });
})

app.get("/search.js", function(req, res, next){
  fs.readFile("search.js", function(err, data){
    if(err){
      send500(res);
      return;
    }
    res.statusCode = 200;
    res.end(data);
    return;
  });
})

app.get("/product.js", function(req, res, next){
  fs.readFile("product.js", function(err, data){
    if(err){
      send500(res);
      return;
    }
    res.statusCode = 200;
    res.end(data);
    return;
  });
})
//Search product
app.get("/products", function(req, res, next){
    val = [];
    if (req.query.inStock === 'true'){
      if(req.query.name === undefined){
        val = products.filter(product => product.stock > 0)
      }
      else{
      val = products.filter(product => product.stock > 0 && product.name.toLowerCase().includes(req.query.name.toLowerCase()))
      }
    }
    else{
      if(req.query.name === undefined){
        val = products
      }
      else{
      val = products.filter(product => product.name.toLowerCase().includes(req.query.name.toLowerCase()))
      }
    }
    res.status(200)
    res.render('pages/products', {products: val})
})

//For any request string containing :productID, find the matching product
app.param("productID", function(req, res, next){
  if(products.hasOwnProperty(req.params.productID)){
    req.product = products[req.params.productID];
    next();
  }else{
    res.status(404).send("Unknown product ID");
  }
})

//Retrieve a particular product by specify ID
//e.g., GET /products/0, GET /products/3831, etc.
app.get("/products/:productID", function(req, res, next){
  res.format({
    'html': function () {
      res.status(200);
      res.render('pages/product.pug', {product: req.product})
    },
    'application/json': function () {
      res.status(200);
      res.send({ product: req.product });
    }
});
})

//Get a particular piece of data about a partiular product
//:productID is the product's ID, :data is what data we are trying to get
app.get("/products/:productID/:review", function(req, res, next){
  if(true){
    res.format({
      html: function () {
        res.status(200);
        res.render('pages/reviews.pug', {reviews: req.product.reviews})
      },
      json: function () {
        res.status(200);
        res.send({ reviews: req.product.reviews });
      }
  })}
  else{
    res.status(404).send("Unknown resource.");
  }
})

//Create a product
//Two step process: verify the data, then add the product
app.post("/products", addProduct);

function addProduct(req, res, next){
  let product = {
    name : req.body.name,
    price : req.body.price,
    dimensions : req.body.dimensions,
    stock : req.body.stock,
    id: nextId,
    reviews: []
  };
  nextId++;
  products.push(product)
  res.status(201).json(product);
}

//Add a Review to the product with ID=:productID
app.post("/products/:productID/reviews", addReview);


function addReview(req, res, next){
  review = req.body.review
  products[req.product.id].reviews.push(review)

  res.status(200).json(req.body.review);
}

app.listen(3000);
console.log("Server listening at http://localhost:3000");
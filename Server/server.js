var mysql = require("mysql");
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var sh = require("shorthash");
var router = express.Router();
var cors = require('cors');
var Category = require("./models/category.js");
var Seller = require("./models/seller.js");
var Region = require("./models/region.js");
var Product = require("./models/product.js");
const token = "ZXbWabTwk09qJqFcU0rIPbKTQ6axnxtW";
const port = process.env.PORT || 3000;

var con = mysql.createPool({
    connectionLimit: 10,
    host: "us-cdbr-iron-east-03.cleardb.net",
    user: "be77f63195ae18",
    password: "183684ed",
    database: "heroku_85cbb7ea625c930"
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//
// POST REQUESTS
//
router.route('/category/add').post((req, res) => {
    let tokenParam = req.query.token;
    if (tokenParam === token) {
        let tempCategory = new Category(req.body);
        tempCategory.save(con).then((result) => {
            console.log(result);
            res.json({ message: result });
        }).catch((err) => {
            console.log(err);
            res.json({ message: err });
        });
    } else {
        res.json({ message: "Authentication failed" });
    }
});

router.route('/product/add').post((req, res) => {
    let tokenParam = req.query.token;
    if (tokenParam === token) {
        let tempProduct = new Product(req.body);
        tempProduct.save(con).then((result) => {
            console.log(result);
            res.json({ message: result });
        }).catch((err) => {
            console.log(err);
            res.json({ message: err });
        });
    } else {
        res.json({ message: "Authentication failed" });
    }
});

router.route('/region/add').post((req, res) => {
    let tokenParam = req.query.token;
    if (tokenParam === token) {
        let tempRegion = new Region(req.body);
        tempRegion.save(con).then((result) => {
            console.log(result);
            res.json({ message: result });
        }).catch((err) => {
            console.log(err);
            res.json({ message: err });
        });
    } else {
        res.json({ message: "Authentication failed" });
    }
});

router.route('/seller/add').post((req, res) => {
    let tokenParam = req.query.token;
    if (tokenParam === token) {
        let tempSeller = new Seller(req.body);
        tempSeller.save(con).then((result) => {
            console.log(result);
            res.json({ message: result });
        }).catch((err) => {
            console.log(err);
            res.json({ message: err });
        });
    } else {
        res.json({ message: "Authentication failed" });
    }
});

//
//GET REQUESTS
//

router.route('/category').get((req, res) => {
    let sql = "SELECT * from categories";
    con.query(sql, (err, result) => {
        if (err) throw (err);
        console.log("Succesfully requested categories!");
        res.json(result);
    });
});

router.route('/seller').get((req, res) => {
    let sql = "SELECT * from sellers";
    con.query(sql, (err, result) => {
        if (err) throw (err);
        console.log("Succesfully requested sellers!");
        res.json(result);
    });
});

router.route('/region').get((req, res) => {
    let sql = "SELECT * from regions";
    con.query(sql, (err, result) => {
        if (err) throw (err);
        console.log("Succesfully requested regions!");
        res.json(result);
    });
});

router.route('/product/:region?').get((req, res) => {
    //Getting the region
    let region = req.params.region;

    //Get starting index for infinite scroll
    let index = req.query.index;
    if (index < 0) {
        index = 0;
    }
    let from = index - 5;
    from = (from >= 0) ? from : 0;

    //Get seller name
    let seller = req.query.seller;

    //Get sex
    let sex = req.query.sex;
    if (!sex) {
        sex = "u";
    }

    //Get category
    let category = req.query.category;

    let sql = "";

    if (region) {
        sql += "SELECT p.*, s.name as sellername, s.icon as sellericon, s.url as sellerurl, c.name as categoryname "
        sql += "from products as p INNER JOIN sellers as s ON p.seller=s.id INNER JOIN categories as c ON p.category=c.id WHERE ";
        sql += "p.region='" + req.params.region + "' ";
        if (seller && seller !== "all") {
            sql += "AND p.seller='" + seller + "' ";
        }
        if (sex) {
            sql += "AND sex='" + sex + "' ";
        }
        if (category) {
            sql += "AND category='" + category + "' ";
        }
        sql += "Limit 5 OFFSET " + from;
        console.log(sql);
        console.log("Succesfully requested products from region " + region);
    } else {
        sql = "SELECT * from products";
        console.log("Succesfully requested products");
    }

    con.query(sql, (err, result) => {
        if (err) throw (err);
        res.json(result);
    });
});

//
//DELETE REQUESTS
//

router.route('/category/delete/:category_id').delete((req, res) => {
    let tokenParam = req.query.token;
    if (tokenParam === token) {
        let id = req.params.category_id;
        let sql = "DELETE FROM categories WHERE id = '" + id + "'";
        con.query(sql, (err, result) => {
            if (err) res.json({ message: "Deletion failed!" });
            console.log("Succesfully deleted category with id " + id);
            res.json({ message: "Deletion successful!" });
        });
    } else {
        res.json({ message: "Authentication failed" });
    }
});

router.route('/region/delete/:region_shortcode').delete((req, res) => {
    let tokenParam = req.query.token;
    if (tokenParam === token) {
        let id = req.params.region_shortcode;
        let sql = "DELETE FROM regions WHERE shortcode = '" + id + "'";
        con.query(sql, (err, result) => {
            if (err) res.json({ message: "Deletion failed!" });
            console.log("Succesfully deleted category with id " + id);
            res.json({ message: "Deletion successful!" });
        });
    } else {
        res.json({ message: "Authentication failed" });
    }
});

router.route('/product/delete/:product_id').delete((req, res) => {
    let tokenParam = req.query.token;
    if (tokenParam === token) {
        let id = req.params.product_id;
        let sql = "DELETE FROM products WHERE id = '" + id + "'";
        con.query(sql, (err, result) => {
            if (err) res.json({ message: "Deletion failed!" });
            console.log("Succesfully deleted category with id " + id);
            res.json({ message: "Deletion successful!" });
        });
    } else {
        res.json({ message: "Authentication failed" });
    }
});

app.use("/api", router);

app.listen(port, (err) => {
    if (err) throw (err);

    console.log("Started Express server on port " + port);
});
var that;
var sh = require("shorthash");

var Product = function (values) {
    this.id = sh.unique(values.name);
    this.name = values.name;
    this.category = values.category;
    this.seller = values.seller;
    this.image = values.image;
    this.url = values.url;
    this.region = values.region;
    this.productid = values.productid;
    this.price = values.price;
    this.sex = values.sex;
    this.description = values.description;
    that = this;
}

Product.prototype.validate = function () {
    console.log(this);
    if (this.name && this.category && this.seller && this.region && this.image && this.url && this.sex && this.description) {
        return true;
    }

    return false;
}

Product.prototype.save = function (con) {
    return new Promise(function (resolve, reject) {
        if (that.validate()) {
            let sql = "INSERT INTO products (id, category, seller, name, image, url, price, productid, added, region, sex, description) VALUES ('" + that.id + "', '" + that.category + "', '" + that.seller + "','" + that.name + "', '" + that.image + "', '" + that.url + "', '" + that.price + "', '" + that.productid + "',now(), '" + that.region + "', '" + that.sex + "', '" + that.description + "')";
            con.query(sql, (err, result) => {
                if (err) reject("Database error");
                resolve("Product added");
            });
        } else {
            reject("Product not valid!");
        }
    });
}

module.exports = Product;
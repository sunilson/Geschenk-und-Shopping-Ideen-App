var that;

var Seller = function (values) {
    this.name = values.name;
    this.icon = values.icon;
    this.url = values.url;
    this.region = values.region
    that = this;
}

Seller.prototype.validate = function () {
    if (this.name && this.icon && this.url && this.region) {
        return true;
    }

    return false;
}

Seller.prototype.save = function (con) {
    return new Promise(function (resolve, reject) {
        if (that.validate()) {
            let sql = "INSERT INTO sellers (name, icon, url, region) VALUES ('" + that.name + "', '" + that.icon + "', '" + that.url + "', '" + that.region + "')";
            con.query(sql, (err, result) => {
                if (err) reject("Database error");
                resolve("Seller added");
            });
        } else {
            reject("Seller not valid!");
        }
    });
}

module.exports = Seller;
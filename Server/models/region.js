var that;

var Region = function (values) {
    this.name = values.name;
    this.shortcode = values.shortcode
    that = this;
}

Region.prototype.validate = function () {
    if (this.name && this.shortcode) {
        return true;
    }

    return false;
}

Region.prototype.save = function (con) {
    return new Promise(function (resolve, reject) {
        if (that.validate()) {
            let sql = "INSERT INTO regions (shortcode, name) VALUES ('" + that.shortcode + "', '" + that.name + "')";
            con.query(sql, (err, result) => {
                if (err) reject("Database error");
                resolve("Region added");
            });
        } else {
            reject("Region not valid!");
        }
    });
}

module.exports = Region;
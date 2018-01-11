var that;

var Category = function (values) {
    this.name = values.name;
    this.id = values.id;
    this.icon = values.icon;
    that = this;
}

Category.prototype.validate = function () {
    if (this.name && this.icon && this.id) {
        return true;
    }

    return false;
}

Category.prototype.save = function (con) {
    return new Promise(function (resolve, reject) {
        if (that.validate()) {
            let sql = "INSERT INTO categories (id, name, icon) VALUES ('" + that.id + "','" + that.name + "', '" + that.icon + "')";
            con.query(sql, (err, result) => {
                if (err) reject("Database error");
                resolve("Category added");
            });
        } else {
            reject("Category not valid!");
        }
    });
}

module.exports = Category;
const mongoose = require("mongoose");
const Retailer = mongoose.model("retailers");
const Product = mongoose.model("products");
const RetailerOrder = mongoose.model("retailerOrders");
const Service = mongoose.model("services");

const authVerification = (req, res, next) => {
  if (!req.user) return res.send(false);
  if (req.user.badge === "RETAILER") next();
  else {
    return res.send("Unauthorized");
  }
};

module.exports = app => {
  // middlewares will be applied to app.all

  app.get("/api/retailer", authVerification, async (req, res) => {
    if (!req.user) res.send(false);
    let retailer = await Retailer.findById(req.user.id);
    res.send(retailer);
  });

  app.post("/api/retailer", authVerification, async (req, res) => {
    const data = req.body;
    let options = {
      new: true
    };
    let user = await Retailer.findByIdAndUpdate(req.user.id, data, options)
      // .populate("inventory")
      .exec((err, user) => {
        if (err) return err;
        res.send(user);
      });
  });

  app.get("/api/retailer/products", authVerification, async (req, res) => {
    let { pageNum } = req.query;
    if (!pageNum) pageNum = 1;
    let products = await Product.find({ retailer: req.user.id })
      .skip((pageNum - 1) * 10)
      .limit(10);
    res.send(products);
  });

  app.post("/api/retailer/inventory", authVerification, async (req, res) => {
    // adding a new product to inventory
    let data = req.body;
    data.retailer = req.user.id;
    let product = await new Product(data).save();
    await req.user.inventory.push(product.id);
    await req.user.save();
    res.send(product);
  });

  app.put("/api/retailer/inventory", authVerification, async (req, res) => {
    // editiing an existing product
    let data = req.body;
    const { title, price, brand, description, imgSrc, quantity } = data;
    let newData = {
      title,
      price,
      brand,
      description,
      imgSrc,
      quantity
    };
    await Product.findByIdAndUpdate(data.id, newData);
    let updatedProduct = await Product.findById(data.id);
    res.send(updatedProduct);
  });

  app.delete("/api/retailer/inventory", authVerification, async (req, res) => {
    await Product.findByIdAndDelete(req.body.id);
    await req.user.inventory.filter(p => {
      if (p == req.body.id) {
        return;
      } else {
        return p;
      }
    });
    await req.user.save();
    res.send("User deleted");
  });

  app.get("/api/retailer/orders", authVerification, async (req, res) => {
    let retailer = await Retailer.findById(req.user.id).populate(
      "retailerOrders"
    );
    res.send(retailer.retailerOrders);
  });

  app.get("/api/retailer/order/:id", authVerification, async (req, res) => {
    let order = await RetailerOrder.findById(req.params.id)
      .populate("products")
      .populate("serviceId");
    let services = await Service.find({});
    let response = {
      order,
      services
    };
    res.send(response);
  });

  app.put("/api/retailer/order/:id", authVerification, async (req, res) => {
    let service = await Service.findById(req.body.serviceId);
    let serviceRetailerOrders = service.retailerOrders;
    serviceRetailerOrders.push(req.params.id);
    let updatedService = await Service.findByIdAndUpdate(
      req.body.serviceId,
      { retailerOrders: serviceRetailerOrders },
      { new: true }
    );

    if (updatedService) {
      let updatedOrder = await RetailerOrder.findByIdAndUpdate(
        req.params.id,
        { serviceId: req.body.serviceId, status: "Pending" },
        { new: true }
      )
        .populate("products")
        .populate("serviceId");
      res.send(updatedOrder);
    }
  });
};

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Product = require('../models/Product');

// @route     GET api/products
// @desc      Get all users products
// @access    Private
router.get('/', auth, async (req, res) => {
    try {
      const products = await Product.find({}).sort({
        date: -1
      });
      res.json(products);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  // @route     POST api/products
// @desc      Add new product
// @access    Private
router.post(
    '/',
    auth,
    check('productname', 'Product Name is required').not().isEmpty(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { productname, producttype, productline, devicetype, devicebrand, upc, innercarton, mastercarton, modelsku, pkgid, specs, status } = req.body;
  
      try {
        const newProduct = new Product({
          productname,
          producttype,
          productline,
          devicetype,
          devicebrand,
          upc,
          innercarton,
          mastercarton,
          modelsku,
          pkgid,
          specs,
          status
        });
  
        const product = await newProduct.save();
  
        res.json(product);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );

  
// @route     PUT api/products/:id
// @desc      Update product
// @access    Private
router.put('/:id', auth, async (req, res) => {
    const { productname, producttype, productline, devicetype, devicebrand, upc, innercarton, mastercarton, modelsku, pkgid, specs, status } = req.body;
  
    // Build product object
    const productFields = {};
    if (productname) productFields.productname = productname;
    if (producttype) productFields.producttype = producttype;
    if (productline) productFields.productline = productline;
    if (devicetype) productFields.devicetype = devicetype;
    if (devicebrand) productFields.devicebrand = devicebrand;
    if (upc) productFields.upc = upc;
    if (innercarton) productFields.innercarton = innercarton;
    if (mastercarton) productFields.mastercarton = mastercarton;
    if (modelsku) productFields.modelsku = modelsku;
    if (pkgid) productFields.pkgid = pkgid;
    if (specs) productFields.specs = specs;
    if (status) productFields.status = status;
    try {
      let product = await Product.findById(req.params.id);
  
      if (!product) return res.status(404).json({ msg: 'Product not found' });
  
      // Make sure user owns product
      // if (product.user.toString() !== req.user.id) {
      //   return res.status(401).json({ msg: 'Not authorized' });
      // }
  
      product = await Product.findByIdAndUpdate(
        req.params.id,
        { $set: productFields },
        { new: true }
      );
  
      res.json(product);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  
// @route     DELETE api/products/:id
// @desc      Delete product
// @access    Private
router.delete('/:id', auth, async (req, res) => {
    try {
      let product = await Product.findById(req.params.id);
  
      if (!product) return res.status(404).json({ msg: 'Product not found' });
  
      // Make sure user owns product
      // if (product.user.toString() !== req.user.id) {
      //   return res.status(401).json({ msg: 'Not authorized' });
      // }
  
      await Product.findByIdAndRemove(req.params.id);
  
      res.json({ msg: 'Product removed' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });


  module.exports = router;
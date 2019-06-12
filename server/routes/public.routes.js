const express = require('express');
const Order = require('../models/order.model');

const router = express.Router();

router.get('/test', (req, res) => {
  console.log('Test endpoint hit!');
  res.json({ success: true });
});

router.post('/add-order', async (req, res) => {
  if (!req.body) {
    res.status(400).json({ success: false, error: 'No information sent.' })
    return;
  }

  if (!req.body.order_item) {
    res.status(400).json({ success: false, error: 'No order item sent.'});
    return;
  }

  if (!req.body.quantity) {
    res.status(400).json({ success: false, error: 'No quantity sent.'})
    return;
  }

  const orderObj = new Order({
    order_item: req.body.order_item,
    quantity: req.body.quantity
  });

  const dbResponse = await orderObj.save();
  if (dbResponse && dbResponse._id) {
    res.status(200).json({ success: true, insertedId: dbResponse._id });
  } else {
    res.status(400).json({ success: false, error: 'Database Error' });
  }

});

module.exports = router;

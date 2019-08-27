const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

//Email model
const Email = require('../../models/Email');

//@route  GET api/emails
//@desc   GET All Emails
//@access Public
router.get('/', (req, res) => {
  Email.find()
    .sort({ date: -1 })
    .then(emails => res.json(emails));
});

//@route  POST api/emails
//@desc   Create a Email
//@access Private
router.post('/', auth, (req, res) => {
  const newEmail = new Email({
    email: req.body.email
  });

  newEmail.save().then(email => res.json(email));
});

//@route  DELETE api/emails/:id
//@desc   DELETE Email
//@access Private
router.delete('/:id', auth, (req, res) => {
  Email.findById(req.params.id)
    .then(email => email.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;

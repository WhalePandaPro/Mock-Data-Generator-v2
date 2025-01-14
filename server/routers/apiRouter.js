const express = require('express');
const router = express.Router(); 

// const {makeArray, getFirstNames, getMiddleNames, getLastNames, getCountry} = require('../controllers/dbController')
const {getEmails, getPhoneNumbers, getAge, getTotalPurchaseVal, getNumOfPurchases, getFrequency, getGender, postalCode} = require('../controllers/otherDataController')
const {isLoggedIn, startSession} = require('../controllers/sessionController')
const {setCookie, setSSIDCookie} = require('../controllers/cookieController')
const {getBcrypt, createUser, verifyUser} = require('../controllers/userController')

const {makeArray, getFirstName, getMiddleName, getlastName, getCountry} = require('../controllers/jsonController')
// dbController is an array of all of our controller functions, NOT an object with controller methods
const Profile = require('../models/authModels');
const { Country } = require('../models/models');
// const controllers = [makeArray, getFirstNames, getMiddleNames, getLastNames, getCountry, getEmails, getPhoneNumbers]
const controllers  = [makeArray, getFirstName, getMiddleName, getlastName, getGender, getAge, getEmails, getPhoneNumbers, getCountry, getTotalPurchaseVal, getNumOfPurchases, getFrequency, postalCode];

router.get('/', isLoggedIn, controllers ,(req, res) => {
  return res.status(200).json(res.locals.data)
});


//route to signup
router.post('/signup', 
  getBcrypt, 
  createUser, 
  setSSIDCookie, 
  startSession, 
  (req, res) => {
    return res.status(200).json('signup successful');
})

// route to login
router.post('/login', 
  verifyUser,
  setSSIDCookie,
  startSession,
  (req, res) => {
  return res.status(200).json('login successful');
})

module.exports = router;
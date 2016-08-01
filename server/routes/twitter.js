'use strict'

const express = require('express')
const router = express.Router()
require('dotenv').config()

const Twitter = require('twitter')
const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

router.get('/', function(req, res, next) {
  // client.get('statuses/home_timeline', {count: 50}, function(error, tweets, response){
  //   if (error) console.log('error', error)
  //   res.send(tweets)
  // })
  res.send()
})

module.exports = router


// Get current trending hashtags and tweets
//
//
// const locationParams =  {
//   id: 2487956 // San Francisco
// }
//
// client.get('trends/place', locationParams, function(error, tweets, response){
//   let trends = tweets[0].trends
//   let topTrend = trends[0].name
//
//   client.get('search/tweets', {q: topTrend}, function(error, tweets, response) {
//     let payload = {
//       tweets,
//       topTrend
//     }
//
//     res.send(payload)
//   })
// })

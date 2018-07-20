const express = require('express');
const request = require('request-promise-native');
const router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    let options = {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${process.env.BEARER_TOKEN}`
      },
      url: 'https://api.twitter.com/1.1/users/show.json',
      qs: {
        screen_name: 'TheBastionBot',
        include_user_entities: true
      },
      json: true
    };
    let response = await request(options);

    let info = {
      id: response.id_str,
      name: response.name,
      username: response.screen_name,
      location: response.location,
      description: response.description,
      url: response.url,
      followers_count: response.followers_count,
      following_count: response.friends_count,
      statuses_count: response.statuses_count,
      profile_background_color: response.profile_background_color,
      profile_image_url: response.profile_image_url_https.replace('_normal', '_400x400'),
      profile_banner_url: response.profile_banner_url,
    };

    res.json(info);
  }
  catch (e) {
    next(e);
  }
});

module.exports = router;

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
      url: 'https://api.twitter.com/1.1/followers/list.json',
      qs: {
        screen_name: 'TheBastionBot',
        cursor: -1,
        count: 200,
        skip_status: true,
        include_user_entities: false
      },
      json: true
    };
    let response = await request(options);

    let followers = response.users.map(user => {
      return {
        id: user.id_str,
        name: user.name,
        username: user.screen_name,
        location: user.location,
        description: user.description,
        url: user.url,
        followers_count: user.followers_count,
        following_count: user.friends_count,
        statuses_count: user.statuses_count,
        profile_background_color: user.profile_background_color,
        profile_image_url: user.profile_image_url_https.replace('_normal', '_400x400'),
        profile_banner_url: user.profile_banner_url,
      }
    });

    res.json(followers);
  }
  catch (e) {
    next(e);
  }
});

module.exports = router;

const axios = require('axios')
const querystring = require('querystring')

module.exports = {
    tokenRefresh: (req, res, next) => {
        const body = {
            grant_type: 'refresh_token',
            refresh_token: req.user.refreshToken
        }
        axios.post('https://accounts.spotify.com/api/token', querystring.stringify(body), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            auth: {
                username: process.env.SPOTIFY_CLIENT_ID,
                password: process.env.SPOTIFY_CLIENT_SECRET
            },
        })
        .then(res => res.data)
        .then(data => {
            req.user.access = data.access_token
            next()
        })
        .catch(next)
    }
}
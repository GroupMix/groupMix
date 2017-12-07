# [groupMix](https://fullstack-groupmix.herokuapp.com/)
### "A collaborative smart playlist generator for social events"
---
groupMix automatically creates a playlist that satisfies all of your guests' individual tasets.

---
We achieve this by tapping into Spotify's API to pull user's top and most recently listened to artists from their spotify account. Then, the user will choose what artists they want to listen to during an event. 

Those tracks will be persisted to our database with all the tracks' metadata provided by spotify and indexed to a playlist table that belongs to an event created by a user.

Once those songs are in our playlist table, we run our prioritization algorithm which will add points based on how well a tracks' metadata matches the parameters set by by the host.

This will give us a playlist populated with tracks most relevant to the event's song parameters.

--- 
Stack: 
- React
- Node.js
- Semantic
- Socket.io
- Express.js
- PostgreSQL
- Heroku for deployment and serving the database
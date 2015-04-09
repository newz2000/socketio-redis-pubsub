#Real time web apps
###With Node.js and Redis

This app demonstrates how you can use Redis and PubSub with Node.js and Socket.io to connect your apps across instances, wither those instances run on the same computer or on separate servers.

## Getting Started

1. Make sure you have Redis and Node.js installed
2. `npm install` in the project folder to install dependencies
3. Start redis `redis-server`
4. Start one instance of the app on port 5000 
`env PORT=5000 node ./app.js`
5. Start a second instance of the app on port 5001
`env PORT=5001 node ./app.js`
6. Open up two browser windows, one to each instance: [http://localhost:5000](http://localhost:5000) and [http://localhost:5001](http://localhost:5001)

## Presentation
See the attached [presentation](Real time web apps with Node.js and Redis.pdf) for this project. It was presented at the April 2015 meeting of the [Omaha JS user group](http://www.meetup.com/nebraskajs/).

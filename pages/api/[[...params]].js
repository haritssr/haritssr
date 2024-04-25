// catch all route
// if /pages/api do not have an index.js, it will throw blank white screen and console.log(undefined) in server terminal
// catch all route after /api
// if /api/one, it will throw ['one']
// if /api/one/two, it will throw ['one', 'two']
// and so on..

// if this file named [...params].js
// it will catch only the route after /api which /api/*
// and if we visit /api, it will return what inside the /api/index.js
// if there is no /api/index.js, it will throw 404.js

export default function handler(req, res) {
	const { params } = req.query;
	res.status(200).json(params);
}

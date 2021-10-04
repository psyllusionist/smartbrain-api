const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '373d0d3eb731491096a33dbac6f226d2'
});

const handleApiCall = (req, res) => {
 app.models.predict('f76196b43bbd45c99b4f3cd8e8b40a8a', req.body.input)
 .then(data => res.json(data))
 .catch(err => res.status(400).json('Unable to work with API'))
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where({id})
	.increment('entries', 1)
	.returning('entries')
	.then(data => {
		res.json(data[0])
	})
}

module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
}
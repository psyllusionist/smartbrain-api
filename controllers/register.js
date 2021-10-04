const handleRegister = (req, res, db, bcrypt) => {
	const { name, email, password } = req.body;
	if(!name || !email || !password) {
		return res.status(404).json('Incorrect form submission')
	}
	const hash = bcrypt.hashSync(password);
	db.transaction(trx => {
		trx.insert({
			hash: hash,
			email: email
		})
		.into('login')
		.returning('email')
		.then(loginEmail => {
			trx('users')
			.returning('*')
			.insert({
			name: name,
			email: loginEmail[0],
			joined: new Date()
			})
			.then(user => {
				res.json(user[0])
			})
			.catch(err => res.status(400).json('unable to register'))
		})
	.then(trx.commit)
	.catch(trx.rollback)
	})
	.catch(err => res.status(400).json('unable to register'))
}

module.exports = {
	handleRegister: handleRegister
}
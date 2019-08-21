const sessionizeUser = user => ({
	userId: user.id,
	username: user.username
})

const parseError = err => JSON.stringify({
	name: err.name,
	message: err.message
});

module.exports = {
	sessionizeUser,
	parseError
}
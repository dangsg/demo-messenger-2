export const welcome = user => (
	fetch('http://localhost:5000/', {
		method: 'GET',
		credentials: 'include'
	})
);

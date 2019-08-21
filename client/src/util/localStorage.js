export const updateStorage = (data) => {
	if(data.username) window.sessionStorage.setItem('sessionUsername', data.username);
	if(data.imageUrl) window.sessionStorage.setItem('sessionAvatar', data.imageUrl);
	// window.localStorage.setItem('sessionUserId', data.userId);
}

export const clearStorage = () => {
	window.sessionStorage.removeItem('sessionUsername');
	window.sessionStorage.removeItem('sessionAvatar');
	// window.localStorage.removeItem('sessionUserId');
}
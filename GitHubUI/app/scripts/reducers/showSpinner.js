const showSpinner = (state = false, action) => {
	switch (action.type) {
		case 'SPINNER_SHOW':
			return {...state, active: action.active};
		default:
			return state;
	}
};

export default showSpinner;

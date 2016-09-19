const visFilter = (state = {itemsPerPage: 5, pageSelected: 1}, action) => {
	switch (action.type) {
		case 'SET_VISIBLITY_FILTER':
			return {...state, itemsPerPage: action.filter.itemsPerPage,
				pageSelected: action.filter.pageSelected};
		default:
			return state;
	}
};

export default visFilter;

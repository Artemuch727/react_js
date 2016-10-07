import React, { Component } from 'react'
import Spinner from '../components/Spinner'
import UserLoginRepo from './UserLoginRepo'
import PagingContainer from '../containers/PagingContainer'

class SearchLayout extends React.Component {
	constructor(props) {
		super(props);
		this.displayName = 'SearchLayout';
	}

	render() {
		return (
			<div className = "search">
				<UserLoginRepo />
				<div> { this.props.children } </div>
			</div>
		);
	}
}


export default SearchLayout;

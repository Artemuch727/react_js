import React, { Component } from 'react'
import Spinner from '../components/Spinner'
import UserLoginRepo from './UserLoginRepo'
import PagingContainer from '../containers/PagingContainer'

class SearchLayout extends React.Component {
	constructor(props) {
		super(props);
		this.displayName = 'SearchLayout';
		this.scrollToPageTop = this.scrollToPageTop.bind(this);
		window.addEventListener('scroll', this.handleScroll);
	}

	scrollToPageTop(e) {
		window.scrollTo(0, 0);
	}

	handleScroll(event) {
		let scrollTop = event.srcElement.body.scrollTop;
		let div = document.querySelector('.userInfoBox');
		let divUp = document.querySelector('.scrollToTop');
		var listUl = document.querySelector('.dropdownList');

		listUl.classList.remove('animate');
		if (scrollTop > 90) {
			div.classList.add('userInfoBox--solid');
			divUp.classList.remove('hidden');
		}
		if (scrollTop < 30) {
			div.classList.remove('userInfoBox--solid');
			divUp.classList.add('hidden');
		}
	}

	render() {
		return ( 
			<div className = "search">
				<UserLoginRepo />
				<div> { this.props.children } </div>  
					<div className = "scrollToTop hidden" onClick = {(e) => {this.scrollToPageTop(e)}}>
				</div>	   
			</div>
		);
	}
};

export default SearchLayout;

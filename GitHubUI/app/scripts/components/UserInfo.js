import React from 'react';
import Paginator from './Paginator';
import Spinner from './Spinner';

const UserInfo = ({ errorLog, userLogin, userRepos, itemsPerPage, repoIssues, issuesCount, onUserSelect, onRepoSelect, showSpinner }) => {
	let newList = [];
	let index = -1;

	document.addEventListener('DOMContentLoaded', () =>  {
		let inputUser = document.getElementsByName('login')[0];
		let inputRepo = document.getElementsByName('repository')[0];
		/* add listeners to inputFields */
		inputUser.addEventListener('focus', () => {
			document.getElementById('user_hr')
				.classList.toggle('hrBox__hr--input');
			document.querySelectorAll('.inputBox__label')[0]
				.classList.toggle('inputBox__label--up');
		});
		inputUser.addEventListener('blur', () => {
			document.getElementById('user_hr')
			.classList.toggle('hrBox__hr--input');
			document.querySelectorAll('.inputBox__label')[0]
			.classList.toggle('inputBox__label--up');
		});
		inputUser.addEventListener('keyup', (e) => {
			handleUserInput(e);
		});
		inputRepo.addEventListener('focus', () => {
			document.getElementById('repo_hr')
				.classList.toggle('hrBox__hr--input');
			document.querySelectorAll('.inputBox__label')[1]
				.classList.toggle('inputBox__label--up');
		});
		inputRepo.addEventListener('blur', () => {
			document.getElementById('repo_hr')
				.classList.toggle('hrBox__hr--input');
			document.querySelectorAll('.inputBox__label')[1]
				.classList.toggle('inputBox__label--up');
		});
	});

	const handleUserInput = (ev) => {
		let repInput = document.getElementsByName('repository')[0];
		repInput.value = '';
		onRepoSelect(userLogin, '')
		if (ev.keyCode == 13) {
			onUserSelect(ev.target.value);
		}
	};

	const handleRepoInput = (ev) => {
		let listUl = document.querySelector('.dropdownList');
		listUl.classList.add('dropdownList--animate');        
		index = -1;
		if(!ev.target.value){ 
			newList=[];        
		};          
		let re = new RegExp("^"+ev.target.value)
		newList = userRepos.sort().filter((el) => {
			return re.test(el.name)
		});          
		refreshOptionsList(newList);   		 
	}; 

    const refreshOptionsList = (newList) => {
		let listUl = document.querySelector('.dropdownList');
		let repInput = document.getElementsByName('repository')[0];
		while (listUl.firstChild) 
			listUl.removeChild(listUl.firstChild)
		for (let i = 0; i <= newList.length-1; i++) {
			let newOption = document.createElement('li');
			newOption.innerHTML =  newList[i].name;
			newOption.className = 'dropdownList__item';
			newOption.addEventListener('click', (event) => {
				repInput.value = event.target.innerText;
				listUl.classList.remove('dropdownList--animate');    
				onRepoSelect(userLogin, event.target.innerText, itemsPerPage);
				repInput.blur();
			});
		newOption.setAttribute("value", "v"+i);
		listUl.appendChild(newOption);
		};
    } 

    const move = (dir) => {
    	let listUl = document.querySelector('.dropdownList');
    	let items = listUl.childNodes;
    	let repInput = document.getElementsByName('repository')[0]; 

		!items[index] || (items[index].className = 'dropdownList__item');
		switch (dir) {        
			case 'up':                
				index = (index <= 0) ? items.length-1 : --index;
				break;
			case 'down':                
				index = (index == items.length-1) ? 0 : ++index;
				break;
			default:
				break;
		};
		listUl.scrollTop = (index > 8 ? index : 0) * 40;
		items[index].className = 'dropdownList__item--active';   
		repInput.value = items[index].innerText;    
    };

	const handleRepoKeyUp = (event) => {  
		let listUl = document.querySelector('.dropdownList');     
		let repInput = document.getElementsByName('repository')[0]; 
		let items = listUl.childNodes;

		switch (event.keyCode) {
			case 40: {
				event.preventDefault();
				move('down');
				break;
			}
			case 38: {
				event.preventDefault();
				move('up');
				break;
			}
			case 13: {
				listUl.classList.remove('dropdownList--animate');    
				onRepoSelect(userLogin, repInput.value, itemsPerPage);
				repInput.blur(); 
				break;
			}
			default:
				handleRepoInput(event);
				break;
		};
	};

	return (
		<div className="userInfoBox__container">	
			<div className="errorDiv">
				<img alt="error" src="/error.png" height="50"  width="50" />
				<span> { errorLog } </span>
			</div>	
			<div className="userInfoBox">
				<a className="logo" href="/">
					<svg aria-hidden="true" height="45" version="1.1" viewBox="0 0 16 16" width="45">
						<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
					</svg>
				</a>
				<div className="userInfoBox__inputBox inputBox">
					<label className="inputBox__label"> Пользователь </label>
					<input className="inputBox__input" type="text" name="login"   placeholder="Имя пользователя" />
					<div className="inputBox__hrBox hrBox">
						<hr className="hrBox__hr" />
						<hr id="user_hr" className={(userLogin!="ERR_NotFound"?'hrBox__hr--def':'hrBox__hr--err')} />
					</div>					
				</div>			
			<div className="userInfoBox__inputBox inputBox">
				<label className="inputBox__label"> Репозиторий </label>
				<input className="inputBox__input" type="text" name="repository"  list="repos" placeholder="Репозиторий" 
					onKeyUp={(e) => {handleRepoKeyUp(e)}}/>			
				<div className="inputBox__hrBox hrBox">
					<hr className="hrBox__hr" />
					<hr id="repo_hr" className="hrBox__hr--def"/>
				</div>
				<div className="inputBox__dropdownList">          
					<ul className="dropdownList">
					</ul>
				</div> 				
			</div>
			<div className={(showSpinner ? "spinner" : "spinner novis")}>
				{ <Spinner /> }
			</div>
		</div> 
	</div>   
	)
};

export default UserInfo;

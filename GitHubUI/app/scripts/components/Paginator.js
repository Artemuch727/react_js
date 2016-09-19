import React from 'react';
import { Link } from 'react-router'

const Paginator = ({itemsPerPage, pageSelected, issuesCount, userLogin, repositorySelect, onItemsOnPageChange, onPageSelect  }) => {
	var pageCount = 0; 
	var pageArray = [];
	if (issuesCount > itemsPerPage) {
		pageCount = Math.round(issuesCount / itemsPerPage);
	}
	for (var i = 1 ; i <= pageCount ; i++) {
		pageArray.push(i);
	}
	var Pages = pageArray.map((item) => {
		return (
			<li key={item}  onClick={()=> {onPageSelect(item, itemsPerPage, userLogin, repositorySelect) }}>
				<Link to={'/issues/'+userLogin+'/'+repositorySelect+'/' + item} className={(pageSelected == item ? 'pageList__item pageList__item--active':'pageList__item')} >{item}</Link>
			</li>
		)
	});  
return (
	<div className={issuesCount > 0 ? 'paginator':'paginator hidden'}>        
		<div className='pageNavigation'>
			<ul className="pageNavigation__pageList">
				<li className={(pageCount>0?'':'hidden')}  onClick={()=> {onPageSelect((pageSelected-1 == 0 ? pageSelected : pageSelected-1), itemsPerPage, userLogin, repositorySelect) }}>
					<Link to={'/issues/'+userLogin+'/'+repositorySelect+'/' +(pageSelected-1 == 0 ? pageSelected : pageSelected-1)} aria-label="Previous" className="pageList__item" >                 
						<span aria-hidden="true">&laquo;</span>                     
					</Link>
				</li>                      
				{Pages}
				<li className={(pageCount>0?'':'hidden')} onClick={()=> {onPageSelect((pageSelected+1 > pageCount ? pageCount : pageSelected+1), itemsPerPage, userLogin, repositorySelect) }}>
					<Link to={'/issues/'+userLogin+'/'+repositorySelect+'/' +(pageSelected+1 > pageCount ? pageCount : pageSelected+1)} aria-label="Next" className="pageList__item">                     
						<span aria-hidden="true">&raquo;</span>                     
					</Link>                      
				</li>
				<li className="pageList__item" >
					<span > на странице: 
						<select id="mySelectId" name="mySelect" className="pageNavigation__itemSelector" onChange = {(e) => {onItemsOnPageChange(e.target.value, pageSelected,  userLogin, repositorySelect)}}>     
							<option value="5">5</option>    
							<option value="10">10</option>
							<option value="15">15</option>
							<option value="9999">Все</option>      
						</select>
					</span>
				</li>
			</ul>
		</div>            
	</div>
)
};

export default Paginator;

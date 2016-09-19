import React from 'react';
import PagingContainer from '../containers/PagingContainer'
import Issue from './Issue'
       
const IssuesList = ({ userLogin, userRepos, repoIssues, onIssueSelect }) => (  
  <div>          
    <div className={repoIssues.length > 0 ? 'issuelist':'issuelist hidden'}>       
      <div>     
        <ul> 
          { repoIssues.map((issue) => 
            <Issue 
              key={issue.id}
              issueInfo={issue}
              onIssueSelect={onIssueSelect}
            />
          )}
        </ul>
      </div>
    </div>      
    <PagingContainer />
  </div>
);

export default IssuesList;
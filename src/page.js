import React from 'react';
import './App.css';

const Page = ({postPerPage,totalPosts, paginate}) =>{

    //Implement pagination
    const pageNumbers = [];
    for(let i=1;i<=Math.ceil(totalPosts/postPerPage);i++){
        pageNumbers.push(i);
    }
    return(
        <nav>
        <ul className="pagination">
            {pageNumbers.map(number=>{
                return <li key={number} className="page-item">
                    <button onClick={()=>paginate(number)} className="page-link">
                        {number}
                    </button>
                </li>
            })}
        </ul>
        </nav>
    )
};

export default Page;

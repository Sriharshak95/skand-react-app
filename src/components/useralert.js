import React from 'react';
import CheckIcon from '../check.png';
import {StyledToast} from '../helpers/allstyles';

//separate alert for use creation and updation
function UserAlert({flag,setFlag,message}){
    return(
        <StyledToast show={flag} onClose={()=>setFlag(false)} autohide>
            <StyledToast.Body className="d-flex"><img src={CheckIcon} alt="checkicon" style={{width:22}} /> {message} </StyledToast.Body>
        </StyledToast>);
}

export default UserAlert;
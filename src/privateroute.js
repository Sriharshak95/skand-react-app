import React from 'react';
import {Redirect, Route} from 'react-router-dom';

function PrivateRoute({component:Component,auth,...rest}){

    return(
        <Route {...rest} render={(props)=>(
            auth?(
            <Component {...props}/>
            ):(
                <Redirect to={{pathname:'/',state:{referer:props.location}}} />
            )
        )}
        />
    );
}

export default PrivateRoute;
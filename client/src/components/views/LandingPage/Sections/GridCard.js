import React from 'react'
import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch,
  } from 'react-router-dom';
import { Col } from 'antd'
function GridCard(props) {
    if(props.actor) {
        return(
            <div>
                
            </div>
        )
    } else {
            
    return (

       

   
        <Col lg={6} md={8} xs={24}>
            <div style={{ position: 'relative'}}>
                {/* <a href={`/movie/${props.href[0]}`}> */}
                <Link to = {{ pathname: `/movie/${props.href[0]}`, search : props.search}}>
                    <img style={{width: '100%', height: '240px'}} alt="" src={props.image}/>
                </Link>
            </div>
            <h1>{props.name}</h1>
            <h1>{props.search}</h1>
        </Col>
 
)
}


    }

export default GridCard

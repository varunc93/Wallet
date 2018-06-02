import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

// const ExpenseListItem = (props) => (
//     <div>
//         <Link to={`/edit/${props.id}`}>
//             <h3>{props.description}</h3>
//         </Link>
//         <p>{props.amount} - {props.createdAt}</p>
//     </div>
// );

//Same as
const ExpenseListItem = ({id, description, amount, createdAt}) => {
    return (
    <div>
        <Link to={`/edit/${id}`}>
            <h3>{description}</h3>
        </Link>
        <p>{numeral(amount/100).format('$0,0.00')}
            -
            {moment(createdAt).format("MMMM Do, YYYY")}</p>
    </div>
)};

//We need to use connect to be able to access dispatch
export default ExpenseListItem;
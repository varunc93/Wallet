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
    <Link className="list-item" to={`/edit/${id}`}>
        <div>
            <h3 className="list-item__title">{description}</h3>
            <span className="list-item__sub-title">{moment(createdAt).format("MMMM Do, YYYY")}</span>
        </div>
        <h3 className="list-item__data">{numeral(amount/100).format('$0,0.00')}</h3>
    </Link>
)};

//We need to use connect to be able to access dispatch
export default ExpenseListItem;
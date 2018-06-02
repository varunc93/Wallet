import moment from 'moment';

export default [{
    id: "1",
    description: 'A',
    text: 'Atext',
    amount: 500,
    createdAt: 0
},
{
    id: "2",
    description: 'B',
    text: 'Btext',
    amount: 100,
    createdAt: moment(0).subtract(4, 'days').valueOf()
},
{
    id: "3",
    description: 'C',
    text: 'Ctext',
    amount: 1000,
    createdAt: moment(0).add(4, 'days').valueOf()
}]

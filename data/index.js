const where = { address: 'main street 2415', postcode: '8888AA', city: 'Enschede' };
const who = { name: 'TestUSer', email: 'testuser@test.test', phone: '1234567890' };
const when = { time: 'asap' };

const ordersTestData = {
    baseUrl: 'https://www.thuisbezorgd.nl/en/', // 'https://www.thuisbezorgd.nl/'
    case1: {
        order: {
            restaurant: { address: '8888', selectOption: '8888 Alpha', name: 'TEST Restaurant Selenium' },
            item: { name: 'Salami' },
            where,
            who,
            when,
            payment: { type: 'cash', details: { amount: 'closest' }}
        },
    },
    case2: {
        restaurant: { address: '8888', selectOption: '8888 Alpha', name: "Maarten's Pannenkoeken" },
        item: { name: 'Ham' },
        where,
        who,
        when,
        payment: { type: 'cash' },
    },
};

module.exports = {
    ordersTestData,
};

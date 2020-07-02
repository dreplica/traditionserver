/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('carts', {
        id: {
            type: 'uuid',
            notNull: true,
            primaryKey: true,
            default: pgm.func('uuid_generate_v4()'),
            comment: 'this is the id field'
        },
        buyer: {
            type: 'Text',
            notNull: true
        },
        item: {
            type: 'text',
            notNull: true,
        },
        totalPrice: {
            type: 'integer',
            notNull: true
        },
        payed: {
            type: 'Text',
            notNull: false
        },
        delivered: {
            type: 'Text',
            notNull: false
        },
        createdat: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp')
        }
    })
};

exports.down = pgm => {
    pgm.dropTable('carts')
};

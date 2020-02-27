/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('history', {
        id: {
            type: 'uuid',
            notNull: true,
            primaryKey: true,
            default: pgm.func('uuid_generate_v4()'),
            comment: 'this is the id field,can also be used as track-id',
        },
        itemid: {
            type: 'uuid',
            notNull: true,
            references: 'items',
            onDelete:'cascade',
            onUpdate:'cascade',
            comment:"its the user id thats the id"
        },
        userid: {
            type: 'uuid',
            notNull: true,
            references: 'users',
            onDelete:'cascade',
            onUpdate:'cascade',
            comment:"its the user id thats the id"
        },
        bought: {
            type: 'VARCHAR(100)',
            notNull: true,
        },
        quantity: {
            type: 'VARCHAR(100)',
            notNull: true,
        },
        delivered: {
            type: 'VARCHAR(100)',
            notNull: true,
        },
        created: {
            type: 'VARCHAR(100)',
            notNull: true,
        }
    })
};

exports.down = pgm => {
    pgm.dropTable('history')
};

/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('seller', {
        id: {
            type: 'uuid',
            notNull: true,
            primaryKey: true,
            default: pgm.func('uuid_generate_v4()'),
            comment: 'this is the id field',
        },
        userid: {
            type: 'uuid',
            notNull: true,
            references: 'users(id)',
            onDelete:'cascade',
            onUpdate:'cascade',
            comment:"uses email as key"
        },
        username: {
            type: 'VARCHAR(100)',
            notNull: true,
        },
        phone: {
            type: 'VARCHAR(100)',
            notNull: true,
        },
        created: {
            type: 'VARCHAR(100)',
            notNull: true,
        },
        updated: {
            type: 'VARCHAR(100)',
            notNull: true,
        },
    })
};

exports.down = pgm => {
    pgm.dropTable('seller')
};

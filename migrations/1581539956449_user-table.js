/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('users', {
        id: {
            type: 'uuid',
            notNull: true,
            primaryKey: true,
            default: pgm.func('uuid_generate_v4()'),
            comment: 'this is the id field',
        },
        username: {
            type: 'VARCHAR(100)',
            notNull: true,
        },
        firstname: {
            type: 'VARCHAR(100)',
            notNull: true,
        },
        lastname: {
            type: 'VARCHAR(100)',
            notNull: true,
        },
        email: {
            type: 'VARCHAR(100)',
            notNull: true,
            unique:true,
        },
        password: {
            type: 'VARCHAR(100)',
            notNull: true,
        },
        phone: {
            type: 'VARCHAR(100)',
            notNull: true,
        },
        isAdmin: {
            type: 'VARCHAR(10)',
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
    pgm.dropTable('users')
};

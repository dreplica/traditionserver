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
        isadmin: {
            type: 'VARCHAR(10)',
            notNull: true,
        },
        createdAt:{
            type:'timestamp',
            notNull:true,
            default:pgm.func('current_timestamp')
        },
        updatedAt:{
            type:'timestamp',
            notNull:true,
            default:pgm.func('current_timestamp')
        }
    })
};

exports.down = pgm => {
    pgm.dropTable('users')
};

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
            referenceskey:'id',
            onDelete:'cascade',
            onUpdate:'cascade'
        },
        userid: {
            type: 'uuid',
            notNull: true,
            references: 'users',
            onDelete:'cascade',
            onUpdate:'cascade'
        },
        bought: {
            type: 'text',
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
        createdat:{
            type:'timestamp',
            notNull:true,
            default:pgm.func('current_timestamp')
        }
    })
};

exports.down = pgm => {
    pgm.dropTable('history')
};

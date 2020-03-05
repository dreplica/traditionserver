/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('items', {
        id: {
            type: 'uuid',
            notNull: true,
            primaryKey: true,
            default: pgm.func('uuid_generate_v4()'),
            comment: 'this is the id field',
        },
        itemname: {
            type: 'VARCHAR(100)',
            notNull: true,
        },
        type: {
            type: 'VARCHAR(100)',
            notNull: true,
        },
        category: {
            type: 'TEXT',
            notNull: true,
            // references: 'category',
            // referenceskey:'id',
            // onDelete:'Cascade',
            // onUpdate:'Cascade'
        },
        price: {
            type: 'VARCHAR(100)',
            notNull: true,
        },
        description: {
            type: 'VARCHAR(100)',
            notNull: true,
        },
        quantity: {
            type: 'INT',
            notNull: true,
        },
        sellerid: {
            type: 'uuid',
            notNull: true,
            references: 'users',
            onDelete:'cascade',
            onUpdate:'cascade'
        },
        image: {
            type: 'TEXT',
            notNull: false,
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
    pgm.dropTable('items')
};

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
            references: 'users',
            onDelete:'cascade',
            onUpdate:'cascade',
            comment:"uses email as key"
        },
        companyname: {
            type: 'VARCHAR(100)',
            notNull: true,
        },
        companydesc: {
            type: 'TEXT',
            notNull: true,
        },
        logo: {
            type: 'Text',
          notNull:true  
        },
        facebook: {
            type: 'TEXT',
            notNull: true,
        },
        twitter: {
            type: 'TEXT',
            notNull: true,
        },
        instagram: {
            type: 'TEXT',
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
    pgm.dropTable('seller')
};

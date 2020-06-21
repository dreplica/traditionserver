/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('category', {
        id: {
            type: 'uuid',
            notNull: true,
            primaryKey: true,
            default: pgm.func('uuid_generate_v4()'),
            comment: 'this is the id field',
        },
        categoryname: {
            type: 'VARCHAR(100)',
            notNull: true,
            comment: `this should have the 
            category name, e.g fashion, 
            accessories, computers`
        },
        
        categoryimage: {
            type: 'VARCHAR(100)',
            notNull: true,
            comment:`contains the path to the image for categories`
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
    pgm.dropTable('category')
};

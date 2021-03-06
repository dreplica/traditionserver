import { ITEMS } from './../../lib/type';
import { db, sql } from '../../models/pg-model';

interface Itemtype {
	type: string;
	category: string;
}

export const itemstype = async (params: Itemtype) => {
	if (params.category) {
		try {
			const { type, category } = params;
			const items: ITEMS[] = await db.query(
				sql`Select * from items Where category =${category} And type=${type}`
			);
			console.log(items);
			return { payload: items };
		} catch (error) {
			return { error: error.message };
		}
	}
};

export const category = async (params: string) => {
	try {
		const cate: ITEMS[] = await db.query(sql`Select * from items Where 
            lower(category) LIKE ${'%' + params + '%'} 
            ORDER BY createdat DESC LIMIT 10 `);
		console.log(items);
		return { payload: cate };
	} catch (error) {
		return { error: error.message };
	}
};

export const items = async () => {
	try {
		const item: ITEMS[] = await db.query(sql`Select * From items ORDER BY createdat DESC LIMIT 30`);
		console.log(item);
		return { payload: item };
	} catch (error) {
		console.log(error.message);
		return { error: error.message };
	}
};

export const additems = async (token: string, args: ITEMS) => {
	if (!token) {
		return { error: 'network error, please try again' };
	}
	// const now = new Date().toISOString();
	try {
		const userId: { id: string }[] = await db.query(sql`Select id from users where email=${token}`);

		const item = await db.query(sql`Insert Into items Values (uuid_generate_v4(),
            ${args.itemname},${args.type},${args.category},${args.price},${args.description},
            ${args.quantity},${userId[0].id},${args.image},current_timestamp,current_timestamp) returning *`);

		return { payload: item };
	} catch (error) {
		console.log(error.message);
		return { error: error.message };
	}
};

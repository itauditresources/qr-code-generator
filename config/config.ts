import dotenv from 'dotenv';

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME as string;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD as string;
const MONGO_DB = process.env.MONGO_DB as string;
const MONGO_URI: string = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.dvgqk1v.mongodb.net/${MONGO_DB}`;

const PORT = process.env.NODE_ENV === 'production' ? (Number(process.env.PORT) as number) : 3001;

export const config = {
	mongo: {
		uri: MONGO_URI,
		// Since Mongoose v.6 the url parser and unified index are used by default
		options: {},
	},
	server: {
		port: PORT,
	},
};

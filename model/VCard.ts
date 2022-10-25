import mongoose, { mongo } from 'mongoose';
import validator from 'validator';

const vcardSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Provide a name'],
	},
	email: {
		type: String,
		required: [true, 'Provide an email address'],
		validate: {
			validator: function (value) {
				return validator.isEmail(value);
			},
			message: 'email not valid',
		},
	},
});

const VCard = mongoose.model('VCard', vcardSchema);

export default VCard;

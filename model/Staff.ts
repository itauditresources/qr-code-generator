import mongoose from 'mongoose';
import validator from 'validator';

const staffSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Provide a name'],
		trim: true,
	},
	firstName: {
		type: String,
		required: [true, 'Provide a first name'],
		trim: true,
	},
	department: {
		type: String,
		required: [true, 'Provide the department you are working in'],
		trim: true,
	},
	role: {
		type: String,
		required: [true, 'Provide your current role'],
		enum: ['Auditor', 'Senior Auditor', 'Junior Auditor'],
	},
	email: {
		type: String,
		required: [true, 'Provide your company email address'],
		validate: {
			validator: function (value: string) {
				validator.isEmail(value);
			},
			message: 'This is not a valid email address',
		},
	},
});

const Staff = mongoose.model('Staff', staffSchema);

export default Staff;

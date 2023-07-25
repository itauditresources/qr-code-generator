/*
 * ############### WARNING #################
 *
 * Mongoose is a ODM (Object Data Modelling) tool and runs on top of the
 * native mongo-db driver, adding an additional abstraction layer.
 *
 * If you make any changes on the Mongoose schemas keep in mind
 * to change the respective existing entries in the MongoDB Collection!!
 *
 * Since Mongoose creates its own data models, MongoDB doesn't know about
 * our database schema and will not type check, validate and recursively change data types.
 *
 * I will most likely replace Mongoose with the native MongoDB driver in a production
 * environment to reduce abstraction and a potential source of errors.
 */

import validator from "validator";
import bcrypt from "bcrypt";

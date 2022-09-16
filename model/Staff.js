
import validator from 'validator'
import fs from 'fs'



class Staff {
  /**
  * Staff class constructor including all staff properties
  * @param {String} firstName
  * @param {String} lastName
  * @param {String} postition
  * @param {String} email
  * @param {Number} telephone
  * @param {Number} mobile
  * @param {URL} website
  *
  *
  * @returns Class object
  */
  
  constructor(firstName, lastName, position, email, telephone, mobile, website) {

    this._firstName = firstName
    this._lastname = lastName
    this._position = position
    this._email = email
    this._telephone = telephone
    this._mobile = mobile
    this._website = website

    this.validateForm()
  }
  

  validateForm() {
    /**
    Validation method to sanitize the properties data types
    */

    if (!validate.isString(this._fristName)) throw new Error('Provide a string')

    
  }

  async getCurrentStaff() {

    const raw = await fs.readFile('./database.db.json')

    const json = JSON.parse(raw)
  }
}

module.exports = Staff
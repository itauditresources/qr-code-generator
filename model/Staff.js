
import validator from 'validator'
import fs from 'fs'



class Staff {
  /**
  * Staff class constructor including all staff properties
  * @param firstName String 
  * @param lastName String
  * @param position String
  * @param email String
  * @param telephone Integer
  * @param mobile Integer
  * @param website URL
  *
  *
  * @returns function
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

    if (!validate.isString(this._fristName) throw new Error('Provide a string')

    
  }

  async getCurrentStaff() {

    const raw = await fs.readFile('./database.db.json')

    const json = JSON.parse(raw)
  }
}

module.exports = Staff
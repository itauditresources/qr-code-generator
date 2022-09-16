
import validator from 'validator'


class Staff {

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

    
  }
}

module.exports = Staff
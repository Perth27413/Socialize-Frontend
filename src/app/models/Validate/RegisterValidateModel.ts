declare type Nullable<T> = T | null

class RegisterValidateModel {
  public userIsValid: Nullable<boolean> = null
  public passIsValid: Nullable<boolean> = null
  public emailIsValid: Nullable<boolean> = null
  public firstNameIsValid: Nullable<boolean> = null
  public lastNameIsValid: Nullable<boolean> = null
  public phoneIsValid: Nullable<boolean> = null
  public birthDayIsValid: Nullable<boolean> = null
}

export default RegisterValidateModel
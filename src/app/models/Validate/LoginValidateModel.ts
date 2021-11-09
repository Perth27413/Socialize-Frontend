declare type Nullable<T> = T | null

class LoginValidateModel {
  public userIsValid: Nullable<boolean> = null
  public passIsValid: Nullable<boolean> = null
}

export default LoginValidateModel
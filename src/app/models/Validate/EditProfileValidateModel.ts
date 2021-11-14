declare type Nullable<T> = T | null

class EditProfileValidateModel {
    public firstNameIsValid: Nullable<boolean> = null
    public lastNameIsValid: Nullable<boolean> = null
    public detailsIsValid: Nullable<boolean> = null
    public emailIsValid: Nullable<boolean> = null
    public phoneIsValid: Nullable<boolean> = null
    public birthDayIsValid: Nullable<boolean> = null
    public currentPassIsValid: Nullable<boolean> = null
    public newPassIsValid: Nullable<boolean> = null
    public retryPassIsValid: Nullable<boolean> = null
}

export default EditProfileValidateModel
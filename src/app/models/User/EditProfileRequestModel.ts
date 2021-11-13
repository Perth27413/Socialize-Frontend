class EditProfileModel {
    public email: string = String()
    public details: string = String()
    public firstName: string = String()
    public lastName: string = String()
    public birthday: Date = new Date()
    public phoneNumber: string = String()
}

export default EditProfileModel
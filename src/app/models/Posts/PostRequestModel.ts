class PostRequestModel {
  public userId: number = Number()
  public page: number = Number()
  public isCurrent: boolean = Boolean()
  public currentUserId: number = Number()
}

export default PostRequestModel
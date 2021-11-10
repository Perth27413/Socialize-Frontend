class CommentAddRequestModel {
  public userId: number = Number()
  public postId: number = Number()
  public contents: string = String()
}

export default CommentAddRequestModel
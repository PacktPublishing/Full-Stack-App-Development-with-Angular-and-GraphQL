import { IResolvers } from 'apollo-server-express';
import { User } from "../entity/User";
import { Post } from "../entity/Post";
import { Comment } from "../entity/Comment";
import { Likes } from "../entity/Like";
import { Notification } from "../entity/Notification";


/
    getUser(userId: ID!): User! 
    getPostsByUserId(userId: ID!, skip: Int, limit: Int): [Post]    
    getFeed(skip: Int, limit: Int): [Post]
    getNotificationsByUserId(userId: ID! skip: Int, limit: Int): [Notification]
    getCommentsByPostId(postId: ID!, skip: Int, limit: Int): [Comment]
    getLikesByPostId(postId: ID!, skip: Int, limit: Int): [Like]
    searchUsers(searchQuery: String): [User]

    post(text: String, image: String, authorId: ID!): Post
    removePost(postID: ID!): ID 
    comment(comment: String!, author: ID!, postId: ID!): Comment
    removeComment(id: ID!): ID
    like(user: ID!, post: ID!): Like
    removeLike(id: ID!): ID
    removeNotification(id: ID!): ID
/

const resolvers: IResolvers = {
  Query: {
    getUser: async (_: any, args: any) => {
      const { id } = args;
      return await User.findOne({ where: { id: id } });
    },
    getPostsByUserId: (_: any, args: any) => {
     const { userId, skip, limit } = args;
     return await Post.find({ order: { createdAt: 'DESC'}, where: { author: {id: userId} , skip: skip, take: limit } });
    },
    getFeed: (_: any, args: any) => {
     const { skip, limit } = args;

     return await Post.find({ order: { createdAt: 'DESC'}, where: { order: {createdAt: 'DESC'}, skip: skip, take: limit } });
    },
    getNotificationsByUserId: (_: any, args: any) => {
     const { userId, skip, limit } = args;
     return await Notification.find({ order: { createdAt: 'DESC'}, where: { author: {id: userId} , skip: skip, take: limit } });
    },
    getCommentsByPostId: (_: any, args: any) => {
     const { postId, skip, limit } = args;
     return await Comment.find({ order: { createdAt: 'DESC'}, where: { post: {id: postId} , skip: skip, take: limit } });      
    },
    getLikesByPostId: (_: any, args: any) => {
     const { postId, skip, limit } = args;
     return await Likes.find({ order: { createdAt: 'DESC'}, where: { post: {id: postId} , skip: skip, take: limit } });      
    },
    searchUsers: (_: any, args: any) => {
    }
  }

  Mutation: {
    post: async (_: any, args: any) => {
        const { text, image, authorId } = args;
      //return Post
    },
    removePost: async (_: any, args: any) => {
        const { postID } = args;
        return postID
    },
    comment: async (_: any, args: any) => {
        const { comment, author, postId } = args;
        // 
    },
    removeComment: async (_: any, args: any) => {},
    like: async (_: any, args: any) => {},
    removeLike: async (_: any, args: any) => {},
    removeNotification: async (_: any, args: any) => {},

    addUser: async (_: any, args: any) => {
      const { firstName, lastName, age } = args;
      try {
        const user = User.create({
          firstName,
          lastName,
          age
        });

        await user.save();

        return true;
      } catch (error) {
        return false;
      }
    }
  }
};

export default resolvers;




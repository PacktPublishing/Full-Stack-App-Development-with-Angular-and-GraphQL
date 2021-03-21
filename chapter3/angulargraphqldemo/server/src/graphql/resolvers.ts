import { IResolvers } from 'apollo-server-express';
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { Post } from "../entity/Post";
import { Comment } from "../entity/Comment";
import { Likes } from "../entity/Like";
import { Notification } from "../entity/Notification";


const resolvers: IResolvers = {
  Query: {
    getUser: async (_: any, args: any) => {
      const { userId } = args;
      return await getRepository(User).findOne({ where: { id: userId } });
    },
    getPostsByUserId: async (_: any, args: any) => {
      const { userId, skip, limit } = args;
      return await getRepository(Post).find({
        skip: skip, take: limit,
        join: {
          alias: "post",
          leftJoinAndSelect: {
            "author": "post.author",
            "latestComment": "post.latestComment",
            "commentAuthor": "latestComment.author",
          }
        },
        order: { createdAt: 'DESC' },
        where: { author: { id: userId } }
      });
    },
    getFeed: async (_: any, args: any) => {
      let { skip, limit, order } = args;
      order = order || "DESC";

      return await getRepository(Post)
        .createQueryBuilder("post")
        .innerJoinAndSelect(
          "post.author",
          "author")
        .innerJoinAndSelect(
          "post.latestComment",
          "latestComment")
        .orderBy("post.createdAt", order).skip(skip).take(limit)
        .getMany();
    },
    getNotificationsByUserId: async (_: any, args: any) => {
      const { userId, skip, limit } = args;
      return await getRepository(Notification)
        .find({
          relations: ["user"],
          order: { createdAt: 'DESC' },
          where: { user: { id: userId } },
          skip: skip,
          take: limit
        });
    },
    getCommentsByPostId: async (_: any, args: any) => {
      const { postId, skip, limit } = args;

      return await getRepository(Comment)
        .createQueryBuilder("comment")
        .innerJoinAndSelect("comment.author", "author")
        .innerJoinAndSelect("comment.post", "post")
        .where("post.id = :id", { id: postId })
        .orderBy("comment.createdAt", "DESC").skip(skip).take(limit)
        .getMany();
    },
    getLikesByPostId: async (_: any, args: any) => {
      const { postId, skip, limit } = args;

      return await getRepository(Likes)
        .createQueryBuilder("like")
        .innerJoinAndSelect("like.user", "user")
        .innerJoinAndSelect("like.post", "post")
        .where("post.id = :id", { id: postId })
        .orderBy("like.createdAt", "DESC").skip(skip).take(limit)
        .getMany();
    },
    searchUsers: (_: any, args: any) => {
      const { searchQuery } = args;
      return getRepository(User).createQueryBuilder("user")
        .where(`user.fullName Like '%${searchQuery}%'`)
        .orWhere(`user.username Like '%${searchQuery}%'`)
        .getMany();
    }
  },

  Mutation: {
    // change schema to author insead of authorId
    post: async (_: any, args: any) => {
      const { text, image, authorId } = args;

      let post = getRepository(Post).create();
      post.author = <User>await getRepository(User).findOne(authorId);
      post.text = text;
      post.image = image;

      return await getRepository(Post).save(post);
    },
    removePost: async (_: any, args: any) => {
      const { postID } = args;
      getRepository(Post).delete(postID);
      return postID
    },
    comment: async (_: any, args: any) => {
      const { comment, author, postId } = args;
      const c = getRepository(Comment).create();
      c.author = <User>await getRepository(User).findOne(author);
      c.comment = comment;
      c.post = <Post>await getRepository(Post).findOne(postId);
      return await getRepository(Comment).save(c);
    },
    removeComment: async (_: any, args: any) => {
      const { id } = args;
      getRepository(Comment).delete(id);
      return id;
    },
    like: async (_: any, args: any) => {
      const { user, post } = args;
      const like = getRepository(Likes).create();
      like.user = <User>await getRepository(User).findOne(user);
      like.post = <Post>await getRepository(Post).findOne(post);
      return await getRepository(Likes).save(like);
    },
    removeLike: async (_: any, args: any) => {
      const { id } = args;
      getRepository(Likes).delete(id);
      return id;
    },
    removeNotification: async (_: any, args: any) => {
      const { id } = args;
      getRepository(Notification).delete(id);
      return id;
    }
  }
};

export default resolvers;




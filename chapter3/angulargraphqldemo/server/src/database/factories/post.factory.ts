import Faker from 'faker';
import { define, factory } from 'typeorm-seeding';
import { Post } from '../../entity/Post';
import { User } from '../../entity/User';

//import { Comment } from '../../entity/Comment';
//import { Likes } from '../../entity/Like';




define(Post, (faker: typeof Faker) => {

  const post = new Post();
  post.text = faker.lorem.text();
  post.image = faker.image.imageUrl();
  post.commentsCount = faker.random.number(100);
  post.likesCount = faker.random.number(200);
  //post.latestComment = factory(Comment)() as any;
  post.latestLike = faker.name.findName();
  //post.author = factory(User)() as any;
  //post.comments = await factory(Comment)().createMany(10);
  //post.likes = factory(Likes)().createMany(10);
  post.createdAt = faker.date.past();
  return post;
});

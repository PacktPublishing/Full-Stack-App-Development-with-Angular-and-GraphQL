import Faker from 'faker';
import { define, factory } from 'typeorm-seeding';
//import { Post } from '../../entity/Post';
//import { User } from '../../entity/User';

import { Comment } from '../../entity/Comment';
//import { Likes } from '../../entity/Like';




define(Comment, (faker: typeof Faker) => {

  const comment = new Comment();
  comment.comment = faker.lorem.text();
  //comment.author = factory(User)() as any;
  //comment.post = factory(Post)() as any;
  comment.createdAt = faker.date.past();
  return comment;
});

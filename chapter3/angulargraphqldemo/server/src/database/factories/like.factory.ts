import Faker from 'faker';
import { define, factory } from 'typeorm-seeding';
//import { Post } from '../../entity/Post';
//import { User } from '../../entity/User';

import { Likes } from '../../entity/Like';




define(Likes, (faker: typeof Faker) => {

  const like = new Likes();
  //like.user = factory(User)() as any;
  //like.post = factory(Post)() as any;
  like.createdAt = faker.date.past();
  return like;
});

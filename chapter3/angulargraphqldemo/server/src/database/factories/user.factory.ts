import Faker from 'faker';
import { define, factory } from 'typeorm-seeding';
import { User } from '../../entity/User';
//import { Post } from '../../entity/Post';

define(User, (faker: typeof Faker) => {

  const user = new User()
  user.fullName =  faker.name.findName();
  user.bio = faker.lorem.sentences();
  user.email = faker.internet.email();
  user.username = faker.internet.userName();
  user.password = faker.internet.password();
  user.image = faker.image.imageUrl();
  user.coverImage = faker.image.imageUrl();
  user.postsCount = faker.random.number();
  user.createdAt = faker.date.past();

  return user
});

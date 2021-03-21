import Faker from 'faker';
import { define, factory } from 'typeorm-seeding';
//import { Post } from '../../entity/Post';
//import { User } from '../../entity/User';

import { Notification } from '../../entity/Notification';



define(Notification, (faker: typeof Faker) => {

  const notification = new Notification();
  notification.text = faker.lorem.words();

  notification.postId = faker.random.number();
  //notification.user = factory(User)() as any;

  notification.createdAt = faker.date.past();
  return notification;
});

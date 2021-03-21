import { Seeder, Factory } from 'typeorm-seeding';
import { Post } from '../../entity/Post';

export default class CreatePosts implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(Post)().createMany(0);
  }
}

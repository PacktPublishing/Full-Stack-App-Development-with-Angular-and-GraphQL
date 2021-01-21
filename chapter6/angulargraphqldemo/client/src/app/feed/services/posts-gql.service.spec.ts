import { TestBed } from '@angular/core/testing';

import { PostsGqlService } from './posts-gql.service';

describe('PostsGqlService', () => {
  let service: PostsGqlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostsGqlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

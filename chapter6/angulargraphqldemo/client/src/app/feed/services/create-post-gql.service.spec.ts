import { TestBed } from '@angular/core/testing';

import { CreatePostGqlService } from './create-post-gql.service';

describe('CreatePostGqlService', () => {
  let service: CreatePostGqlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatePostGqlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

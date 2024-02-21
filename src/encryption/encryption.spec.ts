import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { EncryptionModule } from './encryption.module';

describe('Encryption', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [EncryptionModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('/POST encrypt', () => {
    it(`should encrypt in base64 every value in the object (at a depth of 1), returning the encrypted payload as JSON`, () => {
      return request(app.getHttpServer())
        .post('/encrypt')
        .send({
          foo: 'foobar',
          bar: {
            isBar: true,
            age: 26,
            personne: {
              name: 'toto',
            },
          },
        })
        .expect(201)
        .expect({
          foo: 'ImZvb2JhciI=',
          bar: 'eyJpc0JhciI6dHJ1ZSwiYWdlIjoyNiwicGVyc29ubmUiOnsibmFtZSI6InRvdG8ifX0=',
        });
    });

    it(`should return a bad request when the provided payload is not an object`, () => {
      return request(app.getHttpServer())
        .post('/encrypt')
        .send(['foobar'])
        .expect(400);
    });
  });

  describe('/POST decrypt', () => {
    it(`should decrypt base64 encrypted strings and return the decrypted data as JSON`, () => {
      return request(app.getHttpServer())
        .post('/decrypt')
        .send({
          foo: 'ImZvb2JhciI=',
          bar: 'eyJpc0JhciI6dHJ1ZSwiYWdlIjoyNiwicGVyc29ubmUiOnsibmFtZSI6InRvdG8ifX0=',
        })
        .expect(201)
        .expect({
          foo: 'foobar',
          bar: {
            isBar: true,
            age: 26,
            personne: {
              name: 'toto',
            },
          },
        });
    });

    it(`should return a bad request when the provided payload is not a one-level deep object with values as strings`, () => {
      return request(app.getHttpServer())
        .post('/decrypt')
        .send({
          foo: {
            bar: 'eyJpc0JhciI6dHJ1ZSwiYWdlIjoyNiwicGVyc29ubmUiOnsibmFtZSI6InRvdG8ifX0=',
          },
        })
        .expect(400);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});

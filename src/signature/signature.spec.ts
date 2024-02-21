import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { SignatureModule } from './signature.module';

describe('Signature', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [SignatureModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('/POST sign', () => {
    it(`should compute a sha256 cryptographic signature for the plaintext payload in HMAC`, () => {
      return request(app.getHttpServer())
        .post('/sign')
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
          signature: 'F2KRFQazEHZmVGy2mvvvOQXIpFOHXJo/ijSneu6MPrA=',
        });
    });

    it(`should return a bad request when the provided payload is not an object`, () => {
      return request(app.getHttpServer())
        .post('/sign')
        .send(['foobar'])
        .expect(400);
    });
  });

  describe('/POST verify', () => {
    it(`should verify that the provided signature matches the computed signature from the provided data`, () => {
      return request(app.getHttpServer())
        .post('/verify')
        .send({
          signature: 'F2KRFQazEHZmVGy2mvvvOQXIpFOHXJo/ijSneu6MPrA=',
          data: {
            foo: 'foobar',
            bar: {
              isBar: true,
              age: 26,
              personne: {
                name: 'toto',
              },
            },
          },
        })
        .expect(204);
    });

    it(`should return a bad request with status code 400 when the signature is corrupted`, () => {
      return request(app.getHttpServer())
        .post('/verify')
        .send({
          signature: 'CorruptedSignature=',
          data: {
            foo: 'foobar',
            bar: {
              isBar: true,
              age: 26,
              personne: {
                name: 'toto',
              },
            },
          },
        })
        .expect(400);
    });

    it(`should return a bad request with status code 400 when the data does not match the signature`, () => {
      return request(app.getHttpServer())
        .post('/verify')
        .send({
          signature: 'IzVadypovADFpRvDcz8zyeOe02x1qk037KPpOGL5eLM=',
          data: {
            foo: 'this is not the correct string',
            bar: {
              isBar: true,
              age: 26,
              personne: {
                name: 'toto',
              },
            },
          },
        })
        .expect({
          message: 'Invalid signature',
          error: 'Bad Request',
          statusCode: 400,
        });
    });

    it(`should return a bad request, with a "Validation failed" message, when the provided payload's structure is incorrect'`, () => {
      return request(app.getHttpServer())
        .post('/verify')
        .send({
          foo: 'IzVadypovADFpRvDcz8zyeOe02x1qk037KPpOGL5eLM=',
          data: { foo: true },
        })
        .expect({
          message: 'Validation failed',
          error: 'Bad Request',
          statusCode: 400,
        });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});

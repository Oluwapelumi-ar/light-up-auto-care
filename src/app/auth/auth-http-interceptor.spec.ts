import { AuthHttpInterceptor } from './auth-http-interceptor';
import { AuthServiceService } from './auth-service.service';

describe('AuthHttpInterceptor', () => {
  it('should create an instance', () => {
    return expect(new AuthHttpInterceptor().toBeTruthy());
  });
});

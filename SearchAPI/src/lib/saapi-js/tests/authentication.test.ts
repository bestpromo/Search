import { Authentication } from '../src/authentication';

describe('Authentication', () => {
  test('should generate correct headers', () => {
    const auth = new Authentication('test_app_id', 'test_secret');
    const payload = '{"query":"test"}';
    
    const headers = auth.getHeaders(payload);
    
    expect(headers).toHaveProperty('Content-Type', 'application/json');
    expect(headers).toHaveProperty('Authorization');
    expect(headers.Authorization).toMatch(/^SHA256 Credential=test_app_id, Timestamp=\d+, Signature=[a-f0-9]{64}$/);
  });

  test('should generate different signatures for different payloads', () => {
    const auth = new Authentication('test_app_id', 'test_secret');
    const payload1 = '{"query":"test1"}';
    const payload2 = '{"query":"test2"}';
    
    const headers1 = auth.getHeaders(payload1);
    const headers2 = auth.getHeaders(payload2);
    
    expect(headers1.Authorization).not.toBe(headers2.Authorization);
  });
});

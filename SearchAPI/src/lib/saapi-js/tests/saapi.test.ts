import { SaAPI } from '../src/saapi';
import { Country } from '../src/countries';

describe('SaAPI', () => {
  test('should create instance with default country (Brazil)', () => {
    const client = new SaAPI({
      appId: 'test_app_id',
      secret: 'test_secret'
    });
    
    expect(client).toBeDefined();
    // @ts-ignore - accessing private property for testing
    expect(client.url).toContain(`.${Country.BRAZIL}/`);
  });

  test('should create instance with specific country', () => {
    const client = new SaAPI({
      appId: 'test_app_id',
      secret: 'test_secret',
      country: Country.MALAYSIA
    });
    
    // @ts-ignore - accessing private property for testing
    expect(client.url).toContain(`.${Country.MALAYSIA}/`);
  });

  test('should throw error for invalid country', () => {
    expect(() => {
      new SaAPI({
        appId: 'test_app_id',
        secret: 'test_secret',
        country: '.org' as Country
      });
    }).toThrow();
  });

  test('should have queries property', () => {
    const client = new SaAPI({
      appId: 'test_app_id',
      secret: 'test_secret'
    });
    
    expect(client.queries).toBeDefined();
    expect(client.queries.productOfferV2).toBeDefined();
    expect(client.queries.shopOfferV2).toBeDefined();
    expect(client.queries.shopeeOfferV2).toBeDefined();
    expect(client.queries.conversionReport).toBeDefined();
    expect(client.queries.validatedReport).toBeDefined();
  });

  test('should have mutations property', () => {
    const client = new SaAPI({
      appId: 'test_app_id',
      secret: 'test_secret'
    });
    
    expect(client.mutations).toBeDefined();
    expect(client.mutations.generateShortLink).toBeDefined();
  });
});

import { createHash } from 'crypto';

export class Authentication {
  private appId: string;
  private secret: string;

  constructor(appId: string, secret: string) {
    this.appId = appId;
    this.secret = secret;
  }

  getHeaders(payload: string): Record<string, string> {
    const timestamp = Math.floor(Date.now() / 1000);
    const signFactor = `${this.appId}${timestamp}${payload}${this.secret}`;
    const signature = createHash('sha256').update(signFactor).digest('hex');
    const auth = `SHA256 Credential=${this.appId}, Timestamp=${timestamp}, Signature=${signature}`;

    return {
      'Content-Type': 'application/json',
      'Authorization': auth
    };
  }
}

export declare class Authentication {
    private appId;
    private secret;
    constructor(appId: string, secret: string);
    getHeaders(payload: string): Record<string, string>;
}
//# sourceMappingURL=authentication.d.ts.map
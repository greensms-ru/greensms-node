import type { Client } from '../../../api/client';
export type TSendParams = {
    /**
     * Phone number
     *
     * Size range: 11..14
     */
    to: string;
    /**
     * Message text
     */
    txt: string;
    /**
     * Sender pre-approved shortname
     *
     * Default value: GREENSMS
     *
     * Size range: 1..11
     */
    from?: string;
    /**
     * Comma-separated ordered list. If message delivery fails then resend via next route.
     *
     * Allowed values: "sms", "voice"
     */
    cascade?: string;
};
export type TSendResponse = {
    /**
     * Request ID may be used for status check
     *
     * Size range: 36
     */
    requestId: string;
};
export type TStatusParams = {
    /**
     * Message ID
     *
     * Size range: 36
     */
    id: string;
    /**
     * Extended information: MCC, MNC, region, tag
     *
     * Default value: true
     */
    extended?: boolean;
};
export type TStatusResponse = {
    /**
     * Request status time
     */
    time: string;
    /**
     * Status
     *
     * Default value: Status not ready
     *
     * Allowed values: "Status not ready", "Delivery success", "Delivery failure", "Message read", "Message buffered", "Delivery accepted", "Delivery rejected", "Status request expired"
     */
    status: string;
    /**
     * Status code
     *
     * Default value: 0
     *
     * Size range: 1..2
     *
     * Allowed values: 0, 1, 2, 3, 4, 8, 16, 34
     */
    statusCode: number;
};
export declare class V1_0 {
    private readonly client;
    private readonly schema;
    constructor(client: Client);
    send(params: TSendParams): Promise<TSendResponse>;
    status(params: TStatusParams): Promise<TStatusResponse>;
}

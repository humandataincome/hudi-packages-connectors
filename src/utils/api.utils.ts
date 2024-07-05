export interface HTTPRequest {
    url: string;
    method: string;
    body?: string;
    headers?: Record<string, string>;
}

/**
 * Must NOT return the something like '{data: { ...interesting data }}' but only '{ ...interesting data }'
 */
export type HttpMethod = (request: HTTPRequest) => Promise<any>;

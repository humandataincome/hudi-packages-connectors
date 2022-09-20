export interface HTTPRequest {
    url: string,
    method: string;
    body?: JSON;
    headers: Record<string,string>;
}

/**
 * Must return only the response object
 */
export type HttpMethod = (request: HTTPRequest) => Promise<any>;

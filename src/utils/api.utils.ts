export interface APIRequest {
    url: string,
    method: string;
    body?: JSON;
    headers: Record<string,string>;
}

/**
 * Must return only the response object
 */
export type HttpMethod = (request: APIRequest) => Promise<any>;

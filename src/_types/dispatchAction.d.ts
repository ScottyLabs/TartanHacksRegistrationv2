export interface DispatchAction {
  types: [string, string, string];
  request: DispatchActionRequest;
  body?: any;
}

export interface DispatchActionRequest {
  path: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
}

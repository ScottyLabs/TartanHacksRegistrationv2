export interface StoreAction {
  type: string;
  body: StoreActionPayload|StoreActionPayload[];
}

export interface StoreActionPayload {
  _id: string;
}
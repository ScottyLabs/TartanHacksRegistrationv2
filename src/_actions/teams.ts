import { DispatchAction } from "../_types/dispatchAction";

const create = (_id: string, body: any): DispatchAction => ({
  types: ["CREATE_TEAM_REQUEST", "CREATE_TEAM_SUCCESS", "CREATE_TEAM_ERROR"],
  request: {
    path: `/api/users/${_id}/team`,
    method: "PUT",
    body,
  },
});

export default {
  create
}

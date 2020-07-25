import { DispatchAction } from "../_types/dispatchAction";

const create = (_id: string, body: any): DispatchAction => ({
  types: ["CREATE_TEAM_REQUEST", "CREATE_TEAM_SUCCESS", "CREATE_TEAM_ERROR"],
  request: {
    path: `/api/users/${_id}/team`,
    method: "PUT",
    body,
  },
});

const invitations = (_id: string): DispatchAction => ({
  types: [
    "GET_TEAM_INVITATIONS_REQUEST",
    "GET_TEAM_INVITATIONS_SUCCESS",
    "GET_TEAM_INVITATIONS_ERROR",
  ],
  request: {
    path: `/api/users/${_id}/team/invitations`,
    method: "GET"
  }
});

export default {
  create,
  invitations
}

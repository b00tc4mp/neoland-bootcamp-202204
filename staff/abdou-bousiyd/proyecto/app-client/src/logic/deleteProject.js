import Apium from "../vendor/Apium";
// import { validateJWT } from '../validators'

function deleteProject(token, projectId, callback) {
  // validateJWT(token)

  const api = new Apium("http://localhost:8080/api");

  api.delete(
    `project/${projectId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
    (error, response) => {
      if (error) return callback(error);

      const { status, payload } = response;

      if (status >= 400 && status < 500) {
        const data = JSON.parse(payload);

        callback(new Error(data.error));
      } else if (status >= 500) callback(new Error("server error"));
      else if (status === 204) {
        callback(null);
      }
    }
  );
}

export default deleteProject;

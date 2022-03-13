import axios, { AxiosInstance } from "axios";

const axiosAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default class API {
  // Tasks
  static async getTasks() {
    return await axiosAPI.get("/tasks", {
      headers: {
        authorization: "Bearer " + localStorage["token"],
      },
    });
  }

  static async getStates() {
    return await axiosAPI.get("/tasks/states", {
      headers: {
        authorization: "Bearer " + localStorage["token"],
      },
    });
  }

  static async editTask(task) {
    return await axiosAPI.put(
      "/tasks/id/" + task.id,
      {
        name: task.name,
        state: task.state,
      },
      {
        headers: {
          authorization: "Bearer " + localStorage["token"],
        },
      }
    );
  }

  static async deleteTask(task) {
    return await axiosAPI.delete("/tasks/id/" + task._id, {
      headers: {
        authorization: "Bearer " + localStorage["token"],
      },
    });
  }

  static async createTask(task) {
    return await axiosAPI.post("/tasks/add", { name: task }, {
      headers: { authorization: "Bearer " + localStorage["token"] }
    });
  }

  // Auth
  static async login(form) {
    return await axiosAPI.post("/auth/login", {
      email: form.identifier,
      password: form.password,
    });
  }

  static async register(form) {
    return await axiosAPI.post("/auth/register", {
      email: form.identifier,
      password: form.password
    });
  }
}

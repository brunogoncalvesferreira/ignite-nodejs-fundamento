import { Database } from "../database/database.js";
import { randomUUID } from "node:crypto";
import { buildRoutePath } from "../utils/build-route-path.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { search } = req.query
      const tasks = database.select("tasks", {
        title: search,
        description: search
      });

      return res.end(JSON.stringify(tasks));
    },
  },

  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { title, description } = req.body;

      if (!title) {
        return res
          .writeHead(400)
          .end(
            JSON.stringify({ message: "Por favor, preencha o campo `title`" })
          );
      }

      if (!description) {
        return res.writeHead(400).end(
          JSON.stringify({
            message: "Por favor, preencha o campo `description`",
          })
        );
      }

      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date(),
      };
      database.insert("tasks", task);

      return res
        .writeHead(201)
        .end(JSON.stringify({ message: "Tarefa criada com sucesso!" }));
    },
  },

  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      const { title, description } = req.body;

      if (!title) {
        return res
          .writeHead(400)
          .end(
            JSON.stringify({ message: "Por favor, preencha o campo `title`" })
          );
      }

      if (!description) {
        return res.writeHead(400).end(
          JSON.stringify({
            message: "Por favor, preencha o campo `description`",
          })
        );
      }

      const [task] = database.select("tasks", { id });

      const data = {
        title: title ?? task.title,
        description: description ?? task.description,
        updated_at: new Date(),
      };

      database.update("tasks", id, data);

      return res.writeHead(204).end();
    },
  },

  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      database.delete("tasks", id);

      return res.writeHead(204).end();
    },
  },

  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/completed"),
    handler: (req, res) => {
      const { id } = req.params;

      const [task] = database.select("tasks", { id });

      if (!task) {
        return res.writeHead(404).end()
      }

      const isTaskCompletedd = !!task.completed_at;
      const completed_at = isTaskCompletedd
        ? null
        : new Date();

      database.update("tasks", id, { completed_at });

      return res.writeHead(204).end();
    },
  },
];

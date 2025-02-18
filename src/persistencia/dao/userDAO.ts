import { User } from "@/types/types";
import { pool } from "@/persistencia/pool";
import pg from "pg";

export class UserDAO {
  private pool: pg.Pool = pool;

  async addUser(user: User): Promise<User> {
    const client = await this.pool.connect();
    try {
      const query: string = `
        INSERT INTO users (first_name, last_name, email, gender) 
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `;
      const values: string[] = [
        user.first_name,
        user.last_name,
        user.email,
        user.gender,
      ];
      const newUser: User = (await client.query(query, values)).rows[0];

      if (!newUser) throw new Error("something went wrong");
      return newUser;
    } finally {
      client.release();
    }
  }

  async getUser(id: string): Promise<User> {
    const client = await this.pool.connect();
    try {
      const query: string = `
        SELECT * FROM users
        WHERE id = $1;
      `;
      const values: string[] = [id];
      const user: User = (await client.query(query, values)).rows[0];

      if (!user) throw new Error("user not found");
      return user;
    } finally {
      client.release();
    }
  }

  async updateUser(user: User): Promise<User> {
    const client = await this.pool.connect();
    try {
      const query: string = `
          UPDATE users 
          SET first_name = $2, last_name = $3, email = $4, gender = $5
          WHERE id = $1
          RETURNING *;
      `;
      const values: string[] = [
        user.id!,
        user.first_name,
        user.last_name,
        user.email,
        user.gender,
      ];
      const updatedUser: User = (await client.query(query, values)).rows[0];

      if (!updatedUser) throw new Error("something went wrong");
      return updatedUser;
    } finally {
      client.release();
    }
  }

  async deleteUser(id: string): Promise<string> {
    const client = await this.pool.connect();
    try {
      const query: string = `
        DELETE FROM users
        WHERE id = $1
        RETURNING *;
      `;
      const values: string[] = [id];

      const user: User = (await client.query(query, values)).rows[0];

      if (!user) throw new Error("something went wrong");
      return "user deleted success";
    } finally {
      client.release();
    }
  }

  async getAllUsers(): Promise<User[]> {
    const client = await this.pool.connect();
    try {
      const users: User[] = (await client.query("SELECT * FROM users")).rows;

      if (users === undefined || users === null)
        throw new Error("user not found");
      return users;
    } finally {
      client.release();
    }
  }

  async deleteAllUsers(): Promise<string> {
    const client = await this.pool.connect();
    try {
      const response = await client.query("DELETE FROM users;");

      return `Deleted ${response.rowCount} users.`;
    } finally {
      client.release();
    }
  }
}

"use server";

import { revalidatePath } from "next/cache";
import { db, todos } from "../db/client";
import { eq } from "drizzle-orm";

export async function createTodo(formData: FormData) {
  const title = formData.get("title")?.toString().trim();
  if (!title) return;

  await db.insert(todos).values({ title });

  revalidatePath("/");
}

export async function deleteTodo(id: number) {
  await db.delete(todos).where(eq(todos.id, id));
  revalidatePath("/");
}

export async function updateTodo(id: number, formData: FormData) {
  console.log(id);
  const title = formData.get("title")?.toString().trim();
  if (!title) return;

  await db.update(todos).set({ title }).where(eq(todos.id, id));
  revalidatePath("/");
}

'use server';

import prisma from "@/lib/prisma/prisma";
import { revalidatePath } from "next/cache";
import { GetSession } from "./auth-action";

export async function CreateTask(Title: string, priority: string) {

  // get current user id
  const session = await GetSession();
  const userId = session?.user.id;

  try {
    await prisma.task.create({
      data: {
        Title,
        priority,
        status: 'Pending',
        userId: userId
      }
    })

    revalidatePath('/tasks');
  } catch (error) {
    return {error, res: 'Failed'}
  }
}

export async function GetTasks() {

  const session = await GetSession();
  const userId = session?.user.id;

  try {
    const res = await prisma.task.findMany({
      where: {
        userId: userId
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function UpdateStatus(taskID: string, status: string) {

  const session = await GetSession();
  const userId = session?.user.id;

  try {
    await prisma.task.update({
      where: {
        id: taskID,
        userId: userId
      },
      data: {
        status: status
      }
    })

    revalidatePath('/tasks');
  } catch (error) {
    return {error, res: 'Failed'}
  }
}

export async function RemoveTask(id: string) {

  const session = await GetSession();
  const userId = session?.user.id;

  try {
    await prisma.task.delete({
      where: {
        id: id,
        userId: userId
      }
    })

    revalidatePath('/tasks');
  } catch (error) {
    return {error, res: 'Failed'};
  }
}
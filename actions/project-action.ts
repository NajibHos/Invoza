'use server';

import prisma from "@/lib/prisma/prisma";
import { revalidatePath } from "next/cache";
import { GetSession } from "./auth-action";

interface ProjectData {
  clientName: string,
  clientEmail: string,
  title: string,
  description: string,
  budget: number,
  status: string,
  deadline?: Date | undefined
}

export async function CreateProject(data: ProjectData) {

  // get current user id
  const session = await GetSession();
  const userId = session?.user.id;

  try {
    await prisma.project.create({
      data: {
        ...data,
        userId: userId
      }
    })

    revalidatePath('/projects');
  } catch (error) {
    return {error, res: 'Failed'}
  }

}

export async function GetProjects(projectStatus: string | undefined) {

  const session = await GetSession();
  const userId = session?.user.id;

  try {
    const res = await prisma.project.findMany({
      where: {
        AND: [
          projectStatus ? {status: projectStatus} : {}
        ],
        userId: userId
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function GetProject(projectId: string) {

  const session = await GetSession();
  const userId = session?.user.id;

  try {
    const res = await prisma.project.findUnique({
      where: {
        id: projectId,
        userId: userId
      },
    })

    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function UpdateStatus(projectId: string, status: string) {

  const session = await GetSession();
  const userId = session?.user.id

  try {
    await prisma.project.update({
      where: {
        id: projectId,
        userId: userId
      },
      data: {
        status: status
      }
    })

    revalidatePath(`/projects/view-project/${projectId}`);
  } catch (error) {
    return {error, res: 'Failed'}
  }
}

export async function RemoveProject(projectId: string) {

  const session = await GetSession();
  const userId = session?.user.id;

  try {
    await prisma.project.delete({
      where: {
        id: projectId,
        userId: userId
      }
    })

    revalidatePath('/projects');
  } catch (error) {
    return {error, res: 'Failed'}
  }
}
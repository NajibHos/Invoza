'use server';

import prisma from "@/lib/prisma/prisma";
import { GetSession } from "./auth-action";

export async function GetIncomeThisMonth() {

  // get current user id
  const session = await GetSession();
  const userId = session?.user.id;

  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  try {
    const res = await prisma.invoice.findMany({
      where: {
        status: 'Paid',
        createdAt: {
          gte: new Date(`${year}-${month}-01`),
          lt: new Date(`${year}-${month + 1}-01`)
        },
        userId: userId
      }
    })

    return res.reduce((sum, invoice) => sum + invoice.total, 0);
  } catch (error) {
    console.error(error);
  }
}

export async function GetPendingPayments() {

  const session = await GetSession();
  const userId = session?.user.id;

  try {
    const res = await prisma.invoice.findMany({
      where: {
        status: 'Pending',
        userId: userId
      }
    })

    return res.reduce((sum, invoice) => sum + invoice.total, 0);
  } catch (error) {
    console.error(error);
  }
}

export async function GetCompletedProjects() {

  const session = await GetSession();
  const userId = session?.user.id;

  try {
    const res = await prisma.project.count({
      where: {
        status: 'Completed',
        userId: userId
      }
    })

    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function GetPendingProjects() {

  const session = await GetSession();
  const userId = session?.user.id;

  try {
    const res = await prisma.project.count({
      where: {
        status: 'Pending',
        userId: userId
      }
    })

    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function GetMonthlyIncomeChartData() {

  const session = await GetSession();
  const userId = session?.user.id;

  // get last 6 months
  const now = new Date();
  const months = Array.from({length: 6}, (_, i) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    return {year: date.getFullYear(), month: date.getMonth() + 1,
      label: date.toLocaleString('default', {month: 'short'})};
  })

  try {
    const res = await Promise.all(months.map(async ({year, month, label}) => {
      const invoices = await prisma.invoice.findMany({
        where: {
          status: 'Paid',
          createdAt: {
            gte: new Date(`${year}-${month}-01`),
            lt: new Date(`${year}-${month + 1}-01`)
          },
          userId: userId
        }
      })

      const amount = invoices.reduce((sum, inv) => sum + inv.total, 0);
      return { month: label, amount };
    }))

    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function GetProjectChartData() {

  const session = await GetSession();
  const userId = session?.user.id;

  try {
    const completed = await prisma.project.count({
      where: {
        status: 'Completed',
        userId: userId
      }
    });

    const pending = await prisma.project.count({
      where: {
        status: 'Pending',
        userId: userId
      }
    });

    const cancelled = await prisma.project.count({
      where: {
        status: 'Cancelled',
        userId: userId
      }
    });

    return [
      {
        status: 'Completed',
        count: completed,
        fill: 'var(--color-completed)'
      },
      {
        status: 'Pending',
        count: pending,
        fill: 'var(--color-pending)'
      },
      { status: 'Cancelled',
        count: cancelled,
        fill: 'var(--color-cancelled)'
      }
    ]
  } catch (error) {
    console.error(error);
  }
}
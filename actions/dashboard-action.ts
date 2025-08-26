'use server';

import prisma from "@/lib/prisma/prisma";

export async function GetIncomeThisMonth(userID: string) {

  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  try {
    const res = await prisma.invoice.aggregate({
      _sum: { total: true },
      where: {
        status: 'Paid',
        createdAt: {
          gte: new Date(`${year}-${month}-01`),
          lt: new Date(`${year}-${month + 1}-01`)
        },
        userId: userID
      }
    })

    return res._sum.total ?? 0;
  } catch (error) {
    console.error(error);
  }
}

export async function GetPendingPayments(userID: string) {

  try {
    const res = await prisma.invoice.aggregate({
      _sum: { total: true },
      where: {
        status: 'Pending',
        userId: userID
      }
    })

    return res._sum.total ?? 0;
  } catch (error) {
    console.error(error);
  }
}

export async function GetCompletedProjects(userID: string) {

  try {
    const res = await prisma.project.count({
      where: {
        status: 'Completed',
        userId: userID
      }
    })

    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function GetPendingProjects(userID: string) {

  try {
    const res = await prisma.project.count({
      where: {
        status: 'Pending',
        userId: userID
      }
    })

    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function GetMonthlyIncomeChartData(userID: string) {

  // get last 6 months
  const now = new Date();
  const months = Array.from({length: 6}, (_, i) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    return {year: date.getFullYear(), month: date.getMonth() + 1,
      label: date.toLocaleString('default', {month: 'short'})};
  })

  try {
    const res = await Promise.all(months.map(async ({year, month, label}) => {
      const aggregate = await prisma.invoice.aggregate({
        _sum: { total: true },
        where: {
          status: 'Paid',
          createdAt: {
            gte: new Date(`${year}-${month}-01`),
            lt: new Date(`${year}-${month + 1}-01`)
          },
          userId: userID
        }
      })

      const amount = aggregate._sum.total ?? 0;
      return { month: label, amount };
    }))

    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function GetProjectChartData(userID: string) {

  try {
    const [completed, pending, cancelled] = await Promise.all([
      prisma.project.count({
        where: {
          status: 'Completed',
          userId: userID
        }
      }),
      prisma.project.count({
        where: {
          status: 'Pending',
          userId: userID
        }
      }),
      prisma.project.count({
        where: {
          status: 'Cancelled',
          userId: userID
        }
      })
    ]);

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
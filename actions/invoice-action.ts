'use server';

import { customAlphabet } from 'nanoid';
import prisma from "@/lib/prisma/prisma";
import { revalidatePath } from 'next/cache';
import { GetSession } from './auth-action';

export type InvoiceListItem = {
  id: string;
  invoiceId: string;
  status: string;
  createdAt: Date;
  dueDate: Date | null;
  updatedAt: Date | null;
  userId: string | null;
  billerName: string;
  billerEmail: string;
  billerAddress: string;
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  description: string;
  price: number;
  quantity: number;
  total: number;
}

interface InvoiceType {
  dueDate: Date | undefined;
  billerName: string;
  billerEmail: string;
  billerAddress: string;
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  description: string;
  price: number;
  quantity: number;
  total: number;
  status: string;
}

export async function CreateInvoice(data: InvoiceType) {

  // get current user id
  const session = await GetSession();
  const userId = session?.user.id;

  // get unique invoice id within 8 characters
  const invoiceID = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 8);

  try {
    await prisma.invoice.create({
      data: {
        invoiceId: invoiceID(),
        ...data,
        userId: userId
      }
    })

    revalidatePath('/invoices');
  } catch (error) {
    return {error, res: 'Failed'}
  }
}

export async function GetInvoices(
  invoiceStatus: string | undefined,
  userID?: string
): Promise<InvoiceListItem[]> {

  let resolvedUserId = userID;
  if (!resolvedUserId) {
    const session = await GetSession();
    resolvedUserId = session?.user.id;
  }

  if (!resolvedUserId) {
    return [];
  }

  try {
    const res = await prisma.invoice.findMany({
      take: 10,
      where: {
        AND: [
          invoiceStatus ? { status: invoiceStatus } : {}
        ],
        userId: resolvedUserId
      },
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        invoiceId: true,
        status: true,
        createdAt: true,
        dueDate: true,
        updatedAt: true,
        userId: true,
        billerName: true,
        billerEmail: true,
        billerAddress: true,
        clientName: true,
        clientEmail: true,
        clientAddress: true,
        description: true,
        price: true,
        quantity: true,
        total: true,
      }
    }) as unknown as InvoiceListItem[]

    return res;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function GetInvoice(invoiceID: string) {

  const session = await GetSession();
  const userId = session?.user.id;

  try {
    const res = await prisma.invoice.findUnique({
      where: {
        id: invoiceID,
        userId: userId
      }
    })

    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function UpdateStatus(invoiceID: string | undefined, status: string) {

  const session = await GetSession();
  const userId = session?.user.id;

  try {
    await prisma.invoice.update({
      where: {
        id: invoiceID,
        userId: userId
      },
      data: {
        status: status
      }
    })

    revalidatePath(`/invoices/view-invoice/${invoiceID}`)
  } catch (error) {
    return {error, res: 'Failed'}
  }
}

export async function RemoveInvoice(invoiceID: string) {

  const session = await GetSession();
  const userId = session?.user.id;

  try {
    await prisma.invoice.delete({
      where: {
        id: invoiceID,
        userId: userId
      }
    })

    revalidatePath('/invoices');
  } catch (error) {
    return {error, res: 'Failed'}
  }
}
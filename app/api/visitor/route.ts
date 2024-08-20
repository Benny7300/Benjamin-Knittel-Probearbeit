import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const visitor = await prisma.visitor.findFirst();
  if (!visitor) {
    
    await prisma.visitor.create({ data: { count: 1 } });
    return NextResponse.json({ count: 1 });
  }
  return NextResponse.json({ count: visitor.count });
}

export async function PUT() {
  const visitor = await prisma.visitor.findFirst();
  if (visitor) {
    await prisma.visitor.update({
      where: { id: visitor.id },
      data: { count: visitor.count + 1 }
    });
  } else {
    await prisma.visitor.create({ data: { count: 1 } });
  }
  return NextResponse.json({});
}


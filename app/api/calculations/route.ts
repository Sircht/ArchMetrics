import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const calculationSchema = z.object({ projectId: z.string().optional(), tool: z.string().min(2), title: z.string().min(2), input: z.record(z.unknown()), result: z.record(z.unknown()) });

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const calculations = await prisma.calculation.findMany({ where: { user: { email: session.user.email } }, orderBy: { createdAt: "desc" }, take: 50 });
  return NextResponse.json({ calculations });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const payload = calculationSchema.parse(await request.json());
  const user = await prisma.user.upsert({ where: { email: session.user.email }, update: {}, create: { email: session.user.email, name: session.user.name } });
  const calculation = await prisma.calculation.create({ data: { ...payload, userId: user.id } });
  return NextResponse.json({ calculation }, { status: 201 });
}

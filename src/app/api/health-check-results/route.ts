import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireSession } from "@/lib/session";
import type {
  AnswersMap,
  CategoryScores,
  HealthCheckResult,
} from "@/features/health-check/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type CreateHealthCheckResultBody = {
  clientResultId?: string;
  answers?: AnswersMap;
  result?: HealthCheckResult;
};

function isAnswersMap(value: unknown): value is AnswersMap {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isCategoryScores(value: unknown): value is CategoryScores {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isHealthCheckResult(value: unknown): value is HealthCheckResult {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  const result = value as Partial<HealthCheckResult>;

  return (
    typeof result.totalScore === "number" &&
    (result.level === "low" ||
      result.level === "medium" ||
      result.level === "high") &&
    isCategoryScores(result.categoryScores) &&
    typeof result.summary === "string" &&
    Array.isArray(result.recommendations) &&
    result.recommendations.every((item) => typeof item === "string")
  );
}

function toPrismaLevel(level: HealthCheckResult["level"]): PrismaHealthCheckLevel {
  switch (level) {
    case "low":
      return HEALTH_CHECK_LEVEL.LOW;
    case "medium":
      return HEALTH_CHECK_LEVEL.MEDIUM;
    case "high":
      return HEALTH_CHECK_LEVEL.HIGH;
  }
}

function toAppLevel(level: PrismaHealthCheckLevel): HealthCheckResult["level"] {
  switch (level) {
    case HEALTH_CHECK_LEVEL.LOW:
      return "low";
    case HEALTH_CHECK_LEVEL.MEDIUM:
      return "medium";
    case HEALTH_CHECK_LEVEL.HIGH:
      return "high";
  }
}

export async function GET() {
  const session = await requireSession();
  if (session instanceof NextResponse) return session;

  const results = await prisma.healthCheckResult.findMany({
    where: { userId: session.sub },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      clientResultId: true,
      totalScore: true,
      level: true,
      categoryScores: true,
      summary: true,
      recommendations: true,
      createdAt: true,
    },
  });

  type SavedHealthCheckResult = (typeof results)[number];

  return NextResponse.json({
    results: results.map((result: SavedHealthCheckResult) => ({
      id: result.id,
      clientResultId: result.clientResultId,
      totalScore: result.totalScore,
      level: toAppLevel(result.level),
      categoryScores: result.categoryScores as CategoryScores,
      summary: result.summary,
      recommendations: result.recommendations as string[],
      createdAt: result.createdAt.toISOString(),
    })),
  });
}

export async function POST(req: Request) {
  const session = await requireSession();
  if (session instanceof NextResponse) return session;

  const body = (await req.json().catch(() => null)) as CreateHealthCheckResultBody | null;

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  if (
    typeof body.clientResultId !== "string" ||
    !body.clientResultId.trim() ||
    !isAnswersMap(body.answers) ||
    !isHealthCheckResult(body.result)
  ) {
    return NextResponse.json(
      { error: "Invalid health check payload" },
      { status: 400 }
    );
  }

  const saved = await prisma.healthCheckResult.upsert({
    where: {
      userId_clientResultId: {
        userId: session.sub,
        clientResultId: body.clientResultId,
      },
    },
    update: {
      answers: body.answers,
      totalScore: body.result.totalScore,
      level: toPrismaLevel(body.result.level),
      categoryScores: body.result.categoryScores,
      summary: body.result.summary,
      recommendations: body.result.recommendations,
    },
    create: {
      userId: session.sub,
      clientResultId: body.clientResultId,
      answers: body.answers,
      totalScore: body.result.totalScore,
      level: toPrismaLevel(body.result.level),
      categoryScores: body.result.categoryScores,
      summary: body.result.summary,
      recommendations: body.result.recommendations,
    },
    select: {
      id: true,
      clientResultId: true,
      totalScore: true,
      level: true,
      categoryScores: true,
      summary: true,
      recommendations: true,
      createdAt: true,
    },
  });

  return NextResponse.json({
    result: {
      id: saved.id,
      clientResultId: saved.clientResultId,
      totalScore: saved.totalScore,
      level: toAppLevel(saved.level),
      categoryScores: saved.categoryScores as CategoryScores,
      summary: saved.summary,
      recommendations: saved.recommendations as string[],
      createdAt: saved.createdAt.toISOString(),
    },
  });
}
const HEALTH_CHECK_LEVEL = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
} as const;

type PrismaHealthCheckLevel =
  (typeof HEALTH_CHECK_LEVEL)[keyof typeof HEALTH_CHECK_LEVEL];

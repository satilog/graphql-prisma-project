// https://www.prisma.io/docs/guides/performance-and-optimization/connection-management#prismaclient-in-long-running-applications

import { PrismaClient } from "@prisma/client";

let prisma = new PrismaClient();

export default prisma;

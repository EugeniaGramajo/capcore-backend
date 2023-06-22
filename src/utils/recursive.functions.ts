import prisma from "@/config/prisma-client.config";
import { Title } from "@prisma/client";

export async function titleRecursive(id: string): Promise<Title> {
  const titleFound = await prisma.title.findUnique({ where: { id },include:{child_titles:true} });

  if (!titleFound) {
    throw new Error("Title not found");
  }

  const nestedTitles: Title[] = [];

  for (const childTitleId of titleFound.title_ids) {
    const childTitle = await titleRecursive(childTitleId);
    nestedTitles.push(childTitle);
  }

  titleFound.child_titles = nestedTitles;

  return titleFound;
}

export async function itemRecursive(id:string) {
    
}
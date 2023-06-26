import prisma from "@/config/prisma-client.config";
import { ProjectItem, Title } from "@prisma/client";

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

export async function itemProjectRecursive(id: number): Promise<ProjectItem> {
  const itemProject = await prisma.projectItem.findUnique({
    where: { id },
    include: { childProjectItems: true },
  });

  if (!itemProject) {
    throw new Error("Project item not found");
  }

  const nestedItemProject: ProjectItem[] = [];

  for (const itemId of itemProject.item_ids) {
    const nestedItem = await itemProjectRecursive(parseInt(itemId));
    nestedItemProject.push(nestedItem);
  }

  itemProject.childProjectItems = nestedItemProject;

  return itemProject;
}

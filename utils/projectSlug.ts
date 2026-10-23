const whitespaceSequencePattern = /\s+/gu;

export function getProjectSlug(projectName: string): string {
  return projectName
    .trim()
    .toLocaleLowerCase("en-US")
    .replaceAll(whitespaceSequencePattern, "-");
}

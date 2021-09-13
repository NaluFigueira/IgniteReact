export const getNumberOfWords = (paragraph: string): number => {
  if (!paragraph) return 0;
  return paragraph.split(' ').length;
};

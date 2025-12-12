export const generateChatId = (userId1: string, userId2: string): string => {
  // Sort the two IDs lexicographically (Dictionary Order) to ensure order doesn't matter
  const ids = [userId1, userId2].sort();
  return ids.join('_');
}
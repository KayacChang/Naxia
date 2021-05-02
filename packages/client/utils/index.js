export async function safeGet(db, key, rollback) {
  try {
    return await db.get(key).then(JSON.parse);
  } catch (err) {
    if (err.notFound) return rollback;

    throw err;
  }
}

export function deduplication(array) {
  return Array.from(new Set(array));
}

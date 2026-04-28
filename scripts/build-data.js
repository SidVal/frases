import fs from "node:fs";
import crypto from "node:crypto";

const inputPath = "data/phrases.raw.json";
const raw = JSON.parse(fs.readFileSync(inputPath, "utf8"));

const normalize = text =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .replace(/\s+/g, " ")
    .trim();

const tokenize = text =>
  normalize(text)
    .split(" ")
    .filter(word => word.length > 2);

const approved = raw.phrases
  .filter(p => p.status === "approved")
  .map(p => {
    const normalizedText = normalize(p.text);
    const hash = crypto
      .createHash("sha256")
      .update(normalizedText)
      .digest("hex")
      .slice(0, 8);

    return {
      ...p,
      hash,
      normalizedText,
      tokens: tokenize(p.text),
      length: p.text.trim().split(/\s+/).length
    };
  });

const countBy = (items, getter) => {
  const map = new Map();

  for (const item of items) {
    const key = getter(item);
    map.set(key, (map.get(key) || 0) + 1);
  }

  return [...map.entries()]
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => b.count - a.count);
};

const topAuthors = countBy(approved, p => p.author)
  .map(({ key, count }) => ({ author: key, count }));

const phrasesPerDay = countBy(approved, p => p.createdAt.slice(0, 10))
  .map(({ key, count }) => ({ date: key, count }))
  .sort((a, b) => a.date.localeCompare(b.date));

const wordMap = new Map();

for (const phrase of approved) {
  for (const token of phrase.tokens) {
    wordMap.set(token, (wordMap.get(token) || 0) + 1);
  }
}

const topWords = [...wordMap.entries()]
  .map(([word, count]) => ({ word, count }))
  .sort((a, b) => b.count - a.count)
  .slice(0, 100);

const byAuthor = {};
const byDate = {};

for (const phrase of approved) {
  byAuthor[phrase.author] ??= [];
  byAuthor[phrase.author].push(phrase.id);

  const date = phrase.createdAt.slice(0, 10);
  byDate[date] ??= [];
  byDate[date].push(phrase.id);
}

const generatedAt = new Date().toISOString();

const phrases = {
  meta: {
    schemaVersion: 1,
    generatedAt,
    totalPhrases: approved.length
  },
  phrases: approved
};

const stats = {
  meta: {
    schemaVersion: 1,
    generatedAt
  },
  totalPhrases: approved.length,
  topAuthors,
  topWords,
  phrasesPerDay
};

const indices = {
  meta: {
    schemaVersion: 1,
    generatedAt
  },
  byAuthor,
  byDate
};

fs.writeFileSync("data/phrases.json", JSON.stringify(phrases, null, 2));
fs.writeFileSync("data/stats.json", JSON.stringify(stats, null, 2));
fs.writeFileSync("data/indices.json", JSON.stringify(indices, null, 2));

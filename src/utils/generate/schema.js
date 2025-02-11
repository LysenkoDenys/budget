// schema.js is not an actual part of the project—it's a template used
// on json-generator.com to generate mock data for development and testing.

JG.repeat(100, {
  id: JG.objectId(),
  value: JG.floating(-2000, 5000),
  comment: JG.loremIpsum({ units: 'words', count: 4 }),
  date: JG.date(new Date(1990, 0, 1), new Date(2000, 0, 1)),
});

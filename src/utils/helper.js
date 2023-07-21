// Define arrays of possible first and last names
const firstNames = ['Alice', 'Bob', 'Charlie', 'David', 'Emily', 'Frank', 'Grace', 'Henry', 'Isabella', 'Jacob', 'Kate', 'Liam', 'Mia', 'Nathan', 'Olivia', 'Peter', 'Quinn', 'Rose', 'Sarah', 'Thomas', 'Uma', 'Victoria', 'William', 'Xavier', 'Yasmine', 'Zoe'];
const lastNames = ['Adams', 'Baker', 'Clark', 'Davis', 'Edwards', 'Fisher', 'Garcia', 'Hernandez', 'Johnson', 'Khan', 'Lee', 'Martinez', 'Nguyen', 'Olsen', 'Perez', 'Quinn', 'Roberts', 'Smith', 'Taylor', 'Umar', 'Vargas', 'Walker', 'Xu', 'Young', 'Zhang'];

// Define a function to generate a random name
export function generateRandomName() {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${firstName} ${lastName}`;
}


// Define arrays of possible message components
const subjects = ['You', 'I', 'We', 'They', 'He', 'She', 'It'];
const verbs = ['love', 'hate', 'like', 'dislike', 'appreciate', 'enjoy', 'fear', 'avoid', 'need', 'want', 'miss'];
const objects = ['chocolate', 'coffee', 'music', 'reading', 'exercise', 'nature', 'sleep', 'travel', 'learning'];

// Define a function to generate a random message
export function generateRandomMessage() {
  const subject = subjects[Math.floor(Math.random() * subjects.length)];
  const verb = verbs[Math.floor(Math.random() * verbs.length)];
  const object = objects[Math.floor(Math.random() * objects.length)];
  return `${subject} ${verb} ${object}.`;
}
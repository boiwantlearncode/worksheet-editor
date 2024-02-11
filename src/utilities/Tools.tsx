export function numberToAlphabet(number: number) {
  return (number + 9).toString(36).toUpperCase()
}

export function getRandomID() { 
  return Math.floor(Math.random() * 100).toString();
}
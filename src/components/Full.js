export default function Full(usersJoinedArr, maxPart) {
  const isFull = false;
  if (usersJoinedArr >= maxPart) {
    isFull = true;
  } else {
    isFull = false;
  }
  return isFull;
}

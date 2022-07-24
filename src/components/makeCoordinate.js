function makeCoordinate(nth) {
  const coordinates = [
    [1, 1], [2, 1], [3, 1],
    [1, 2], [2, 2], [3, 2],
    [1, 3], [2, 3], [3, 3]
  ]

  return coordinates[nth];
}

export default makeCoordinate;

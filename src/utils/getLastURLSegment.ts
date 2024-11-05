export const getLastPathSegment = (url: string) => {
  const segments = url.split("/").filter(Boolean); // Filter out empty segments
  const lastSegment = segments[segments.length - 1];

  // Check if the last segment is an integer
  if (!isNaN(Number(lastSegment))) {
    // Return the second-to-last segment if it exists
    return segments.length > 1 ? segments[segments.length - 2] : lastSegment;
  }

  return lastSegment;
};

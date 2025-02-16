export const getLastPathSegment = (url: string) => {
  const segments = url.split('/').filter(Boolean) // Filter out empty segments
  const lastSegment = segments[segments.length - 1]

  // Check if the last segment is an integer
  if (!isNaN(Number(lastSegment))) {
    // Return the second-to-last segment if it exists
    return segments.length > 1 ? segments[segments.length - 2] : lastSegment
  }

  return lastSegment
}

export const getFirstPathSegment = (url: string) => {
  const segments = url.split('/').filter(Boolean) // Filter out empty segments
  return segments.length > 0 ? segments[0] : '' // Return first segment if it exists
}

// export const doesSegmentExistInUrl = (url: string, segment: string) => {
//   const segments = url.split("/").filter(Boolean).map(s => s.toLowerCase()); // Convert all segments to lowercase
//   return segments.includes(segment.toLowerCase()); // Compare in lowercase
// };

export const doesSegmentExistInUrl = (url: string, segment: string) => {
  const segments = url
    .split('/')
    .filter(Boolean)
    .map(s => s.toLowerCase()) // Normalize segments to lowercase
  return segments.includes(segment.toLowerCase()) // Check if any matches
}

export const generateBreadcrumbsFromPathname = (pathname: string) => {
  const segments = pathname.split('/').filter(Boolean) // Split pathname into segments
  return segments.map((segment, index) => {
    const path = `/${segments.slice(0, index + 1).join('/')}`
    return { path, label: segment.charAt(0).toUpperCase() + segment.slice(1) } // Capitalize first letter
  })
}

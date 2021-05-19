export const getApiId = (url: string) => {
  const urlSegments = url.split("/")
  return Number(urlSegments[urlSegments.length - 2])
}

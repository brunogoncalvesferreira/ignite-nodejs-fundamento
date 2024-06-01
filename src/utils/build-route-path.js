export function buildRoutePath(path) {
  const routeParametersRegex = /:([a-zA-Z]+)/g
  const pathWithoutParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9-_]+)')
  
  const pathRegex = new RegExp(`^${pathWithoutParams}(?<query>\\?(.*))?$`)

  return pathRegex
}
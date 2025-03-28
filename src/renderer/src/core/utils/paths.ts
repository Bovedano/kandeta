export const truncatePath = (path, maxLength = 120): string => {
  if (path.length <= maxLength) return path

  const inicio = Math.floor(maxLength * 0.4) // 40% del inicio
  const fin = path.length - (maxLength - inicio - 3) // Dejar espacio para '...'

  return path.slice(0, inicio) + '...' + path.slice(fin)
}

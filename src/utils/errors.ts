export interface ResponseError extends Error {
  status?: number;
}

const handleError = (status: number, message: string) => {
  const error: ResponseError = new Error(message)
  error.status = status
  return error
}

export { handleError }

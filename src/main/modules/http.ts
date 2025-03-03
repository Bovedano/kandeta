import axios from 'axios'

// Función genérica para hacer peticiones HTTP
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const request = async (_event, config: any): Promise<unknown> => {
  // Realiza la solicitud
  const response = await axios(config)
  return response.data // Devuelve la respuesta de la API
}

export default async function handler(req: any, res: any) {
  // Asegurarnos de que solo aceptamos peticiones POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }

  try {
    // Extraemos la query que nos envía el MapPage.tsx
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ error: 'Falta la query en el body' });
    }

    // Hacemos la petición a Overpass de servidor a servidor (Sin problemas de CORS)
    // Usamos x-www-form-urlencoded que es el formato estricto que pide Overpass
    const response = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `data=${encodeURIComponent(query)}`
    });

    if (!response.ok) {
      throw new Error(`Overpass falló con código: ${response.status}`);
    }

    // Parseamos la respuesta de Overpass
    const data = await response.json();
    
    // Y se la devolvemos felizmente a tu frontend
    return res.status(200).json(data);

  } catch (error: any) {
    console.error('Error interno del proxy de Overpass:', error);
    return res.status(500).json({ error: 'Error al contactar con Overpass' });
  }
}
/**
 * ============================================
 * AITDL — India's AI Command Center
 * ============================================
 * @author    Jawahar Ramkripal Mallah
 * @copyright © 2026 All Rights Reserved
 * ============================================
 * pages/api/aiBattle.js
 * Proxy to aiBattle Cloud Function.
 * Forwards the user's Firebase ID token for auth verification.
 * Zero-cost: no server compute here — just a secure passthrough.
 * ============================================
 */

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { toolA, toolB, uid } = req.body
  if (!toolA || !toolB) {
    return res.status(400).json({ error: 'toolA and toolB are required' })
  }

  // Forward to Cloud Function
  const FUNCTION_URL = process.env.NEXT_PUBLIC_FUNCTIONS_BASE_URL + '/aiBattle'

  const response = await fetch(FUNCTION_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader,
    },
    body: JSON.stringify({ toolA, toolB, uid }),
  })

  const data = await response.json()

  if (!response.ok) {
    return res.status(response.status).json(data)
  }

  return res.status(200).json(data)
}

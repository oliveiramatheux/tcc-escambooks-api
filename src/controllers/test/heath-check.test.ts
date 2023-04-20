import supertest from 'supertest'
import server from '../../server'

describe('test controller health-check', () => {
  it('should return 200 when is called', async () => {
    const response = await supertest(server)
      .get('/api/health-check')

    expect(response.status).toBe(200)
    expect(response.text).toBe('Server is ok')
  })
})

import { fetchSinToken } from "../../helpers/fetch"

describe('Test en el Helper Fecht', () => {
    test('fecth sin token', async () => {
        const resp = fetchSinToken('auth', {email: 'dann@dann.com', password: '1234567'}, 'POST' )
        expect( resp instanceof Response )

        const body = await resp.json();
        expect( body.ok )
    
        token = body.token;
    })
})
var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');
var chai = require('chai');  
const expect = chai.expect;

describe('Login System - AuthService Class', () => {
    let mockAxios;

    beforeEach(() => {
        mockAxios = new MockAdapter(axios);
    });

    afterEach(() => {
        mockAxios.restore();
    });

    it('should return valid response if credentials are valid', async () => {
        // Arrange
        const mockUser = { username: 'testuser', password: 'testpass' };
        const mockResponse = { status: 'Success', message: 'Login Successful' };

        mockAxios.onPost('/login', mockUser).reply(200, mockResponse);

        // Act
        const response = await axios.post('/login', mockUser);

        // Assert
        expect(response.status).to.equal(200);
        expect(response.data).to.deep.equal(mockResponse);
    });

    it('should return error message if credentials are invalid', async () => {
        // Arrange
        const mockUser = { username: 'testuser', password: 'wrongpass' };
        const mockResponse = { status: 'Error', message: 'Invalid Credentials' };

        mockAxios.onPost('/login', mockUser).reply(401, mockResponse);

        // Act
        try {
            await axios.post('/login', mockUser);
        } catch (error) {
            // Assert
            expect(error.response.status).to.equal(401);
            expect(error.response.data).to.deep.equal(mockResponse);
        }
    });


});

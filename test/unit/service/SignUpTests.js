var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');
var chai = require('chai');  
const expect = chai.expect;

it('should return error message if credentials are invalid', async () => {
    // Arrange
    const mockUser = { username: 'testuser', password: 'wrongpass' };
    const mockResponse = { status: 'Error', message: 'Invalid Credentials' };

    mockAxios.onPost('/signup', mockUser).reply(401, mockResponse);

    // Act
    try {
        await axios.post('/signup', mockUser);
    } catch (error) {
        // Assert
        expect(error.response.status).to.equal(401);
        expect(error.response.data).to.deep.equal(mockResponse);
    }
});

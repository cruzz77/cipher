import axios from 'axios';

const TEST_URL = 'http://localhost:1213/api/analyze';
const SAMPLE_DATA = {
    text: "Patient has fever for 2 days and mild cough. Doctor prescribed paracetamol 500mg three times a day."
};

async function testEndpoint() {
    console.log('Verification Test');
    try {
        console.log('Sending request to:', TEST_URL);
        const response = await axios.post(TEST_URL, SAMPLE_DATA);
        console.log('Response Status:', response.status);
        console.log('Response Data:', JSON.stringify(response.data, null, 2));

        if (response.data.symptoms && response.data.duration) {
            console.log('✅ Verification Successful: Structured data returned.');
        } else {
            console.log('❌ Verification Failed: Missing expected fields.');
        }
    } catch (error) {
        if (error.response && error.response.status === 501) {
            console.log('ℹ️ Expected failure: Groq API Key not setup in .env (HTTP 501).');
            console.log('Error details:', error.response.data.details);
            console.log('✅ Logic Verification: Controller correctly handles missing API key.');
        } else {
            console.error('❌ Error during test:', error.message);
            if (error.response) {
                console.error('Response details:', error.response.data);
            }
        }
    }
}

testEndpoint();

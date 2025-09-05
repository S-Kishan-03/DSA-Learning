import {config} from 'dotenv';
config();

// We don't import the flows here anymore because they are dynamically initialized
// when called with an API key. This file is now primarily for setting up
// environment variables if needed for other development purposes.

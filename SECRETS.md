# Secrets Management

## Environment Configuration

The Aplomado Core Shell uses environment variables for configuration and secrets management.

### Setup Instructions

1. Copy the example file:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` with your actual configuration values:
   - `AUTH_ENCRYPTION_KEY`: Generate a secure encryption key for authentication
   - `API_KEY`: Your API key for authentication (contact TekPet Digital to obtain)
   - Other values can be customised based on your needs

3. The `.env.local` file is ignored by git (see `.gitignore`) and will not be committed.

### Security Notes

- Never commit `.env.local` or any actual secrets to the repository
- Use strong, unique encryption keys
- Rotate encryption keys periodically in production
- All sensitive data is stored locally on your machine - no cloud telemetry
- API keys should be obtained from TekPet Digital for production use

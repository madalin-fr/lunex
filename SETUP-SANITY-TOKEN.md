# Sanity API Token Setup Instructions

The review submission feature requires a valid Sanity API token for creating new reviews. Follow these steps to set it up:

## Step 1: Access Sanity Management Dashboard

1. Go to [https://sanity.io/manage](https://sanity.io/manage)
2. Sign in with your Sanity account
3. Select your project: **n6k9v913** (the project ID from your environment)

## Step 2: Create API Token

1. In your project dashboard, navigate to **API** → **Tokens**
2. Click **Add API Token**
3. Configure the token:
   - **Name**: `Lunex Reviews Write Token`
   - **Permissions**: Select **Editor** (required for creating documents)
   - **Dataset**: Select **production** (matches your environment)
4. Click **Save** to generate the token
5. **Important**: Copy the token immediately - it won't be shown again

## Step 3: Update Environment Variable

1. Open the `.env.local` file in your project root
2. Find the line: `SANITY_API_TOKEN=your_sanity_write_token_here`
3. Replace `your_sanity_write_token_here` with your actual token:
   ```
   SANITY_API_TOKEN=skqq1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7
   ```

## Step 4: Restart Development Server

After updating the token:
1. Stop the development server (Ctrl+C)
2. Restart it: `npm run dev`
3. The review submission should now work

## Security Notes

- ⚠️ **Never commit the actual token to version control**
- The `.env.local` file is already in `.gitignore`
- Keep your token secure and don't share it
- You can regenerate the token from Sanity dashboard if needed

## Testing

Once configured, test the review form:
1. Navigate to `/reviews`
2. Click "Scrivi una Recensione"
3. Fill out the form and submit
4. Check the terminal - you should see success instead of "Session not found" error

## Current Status

✅ Review form UI is complete and styled  
✅ Form validation is working  
✅ API endpoint is implemented  
⚠️ **Sanity API token needs to be configured** (you are here)  

After completing these steps, the review system will be fully functional!
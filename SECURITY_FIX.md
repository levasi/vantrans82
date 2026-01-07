# Security Fix: Remove Exposed Database Credentials

## Immediate Actions Required

### 1. Rotate Database Password (CRITICAL)
Your PostgreSQL database password has been exposed. You **MUST** rotate it immediately:

1. Go to your Railway dashboard
2. Navigate to your PostgreSQL database service
3. Click on "Settings" or "Variables"
4. Reset the database password
5. Update the `DATABASE_URL` environment variable in Railway with the new password

### 2. Remove Secret from Git History

The secret is still in your git history. To remove it completely:

**Option A: Using git filter-repo (Recommended)**
```bash
# Install git-filter-repo if not already installed
# brew install git-filter-repo  # macOS
# or: pip install git-filter-repo

# Remove the secret from all history
git filter-repo --path ADMIN_SETUP.md --invert-paths
# Then re-add the cleaned file
git add ADMIN_SETUP.md
git commit -m "Security: Remove exposed credentials"
```

**Option B: Using BFG Repo-Cleaner**
```bash
# Download BFG from https://rtyley.github.io/bfg-repo-cleaner/
# Create a passwords.txt file with the exposed password:
echo "UWAgRFeNqdJWEbPlwIUHGzXdPaYLOQrs" > passwords.txt

# Run BFG
java -jar bfg.jar --replace-text passwords.txt

# Clean up
git reflog expire --expire=now --all
git gc --prune=now --aggressive
```

**Option C: Manual git filter-branch**
```bash
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch ADMIN_SETUP.md" \
  --prune-empty --tag-name-filter cat -- --all

# Force push (WARNING: This rewrites history)
git push origin --force --all
```

### 3. Force Push to GitHub

After cleaning history, you'll need to force push:
```bash
git push origin --force --all
git push origin --force --tags
```

⚠️ **WARNING**: Force pushing rewrites history. Make sure all team members are aware and re-clone the repository.

### 4. Verify Secret is Removed

Check that the secret is no longer in the repository:
```bash
git log --all --full-history --source -S "UWAgRFeNqdJWEbPlwIUHGzXdPaYLOQrs"
```

If this returns nothing, the secret has been removed.

## Prevention

1. ✅ `.env` files are already in `.gitignore`
2. ✅ Documentation now uses placeholders
3. ⚠️ Always use environment variables, never hardcode secrets
4. ⚠️ Use Railway's environment variables feature for production secrets
5. ⚠️ Consider using a secrets management service for production

## Current Status

- ✅ Secret removed from `ADMIN_SETUP.md`
- ⚠️ Secret still exists in git history (needs cleanup)
- ⚠️ Database password needs to be rotated


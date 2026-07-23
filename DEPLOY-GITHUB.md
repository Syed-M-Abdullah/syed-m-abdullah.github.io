# Auto-deploy portfolio to GitHub Pages

Every push to `main` in this repo automatically builds the portfolio and publishes it to:

**https://syed-m-abdullah.github.io**

The workflow lives at `.github/workflows/deploy.yml`.

## One-time setup (5 minutes)

You need to do this **once**. After that, every push auto-deploys.

### 1. Create the target Pages repo (if not created yet)

- Go to https://github.com/new
- Repository name: `syed-m-abdullah.github.io` (exact name)
- Owner: `Syed-M-Abdullah`
- Public
- Do **not** add README / .gitignore / license
- Click **Create repository**

### 2. Create a Personal Access Token (PAT)

This lets the workflow push to your Pages repo.

1. Go to https://github.com/settings/tokens?type=beta (Fine-grained tokens)
2. Click **Generate new token**
3. Token name: `portfolio-deploy`
4. Expiration: `No expiration` (or 1 year)
5. Repository access → **Only select repositories** → pick `syed-m-abdullah.github.io`
6. Repository permissions → **Contents** → **Read and write**
7. Click **Generate token** and **copy the token** (starts with `github_pat_...`)

### 3. Add the token as a secret in THIS source repo

1. Open this repo on GitHub → **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Name: `DEPLOY_TOKEN`
4. Secret: paste the token from step 2
5. Click **Add secret**

### 4. Enable GitHub Pages on the target repo

1. Go to `https://github.com/Syed-M-Abdullah/syed-m-abdullah.github.io/settings/pages`
2. Source → **Deploy from a branch**
3. Branch → **main** → **/ (root)** → **Save**

(First deploy will populate `main`; after that Pages serves it automatically.)

## That's it

Push any change to `main` in this source repo → GitHub Actions builds → pushes static files to `syed-m-abdullah.github.io` → live in ~1 minute at:

**https://syed-m-abdullah.github.io**

You can also trigger a manual deploy from the **Actions** tab → **Build & Deploy Portfolio to GitHub Pages** → **Run workflow**.

## Local export (optional)

If you want to build locally without pushing:

```bash
bun run export:github
```

Output goes to `dist/github/`.

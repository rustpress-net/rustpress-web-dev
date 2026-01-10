# Contributing to RustPress Dev

Thank you for your interest in contributing to RustPress Dev! This document explains our branch strategy and release process.

## Branch Strategy

We use a three-branch strategy:

```
development → release → main
```

### Branches

| Branch | Purpose | Protected |
|--------|---------|-----------|
| `main` | Production-ready code, releases are created here | Yes |
| `release` | Staging branch for preparing releases | Yes |
| `development` | Active development, feature branches merge here | Yes |

### Branch Flow

```
feature/xyz ──┐
feature/abc ──┼──► development ──► release ──► main
bugfix/123 ───┘                      │
                                     ▼
                              GitHub Release
                              (GitHub Pages)
```

## Development Workflow

### 1. Creating a Feature

```bash
# Start from development branch
git checkout development
git pull origin development

# Create your feature branch
git checkout -b feature/my-feature

# Make your changes and commit
git add .
git commit -m "feat: add my feature"

# Push your branch
git push -u origin feature/my-feature

# Create a Pull Request to development branch
```

### 2. Commit Message Convention

We use conventional commits for automatic changelog generation:

| Prefix | Purpose | Example |
|--------|---------|---------|
| `feat:` | New feature | `feat: add user authentication` |
| `fix:` | Bug fix | `fix: resolve login issue` |
| `docs:` | Documentation | `docs: update API reference` |
| `style:` | Formatting | `style: fix indentation` |
| `refactor:` | Code refactoring | `refactor: simplify auth logic` |
| `test:` | Adding tests | `test: add unit tests for auth` |
| `chore:` | Maintenance | `chore: update dependencies` |

### 3. Preparing a Release

When development is ready for release:

```bash
# Merge development into release
git checkout release
git pull origin release
git merge development
git push origin release

# Create PR from release to main (for review)
```

## Release Process

Releases are **automatically created** when the `release` branch is merged into `main`.

### Version Bump Keywords

Include one of these keywords in your merge commit message to trigger a release:

| Keyword | Effect | Version Change |
|---------|--------|----------------|
| `MAJOR` | Major version bump | `1.0.0` → `2.0.0` |
| `MINOR` | Minor version bump | `1.0.0` → `1.1.0` |
| `PATCH` | Patch version bump | `1.0.0` → `1.0.1` |
| `BUILD` | Build number bump | `1.0.0` → `1.0.1` |

### Example Merge Commits

```bash
# Patch release (bug fixes)
git merge release -m "Merge release into main PATCH"

# Minor release (new features)
git merge release -m "Merge release into main MINOR - Add user dashboard"

# Major release (breaking changes)
git merge release -m "Merge release into main MAJOR - New API version"
```

### What Happens on Release

1. Version is automatically bumped in `package.json`
2. Site is built with Vite
3. GitHub Release is created with version tag
4. Site is deployed to GitHub Pages

## Questions?

If you have questions about the contribution process, please open an issue or discussion.

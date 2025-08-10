# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Raycast extension called "SurgeRuleChecker" that integrates with the Surge proxy application to help users identify which Surge rule is being applied to their current website.

## Architecture

The extension consists of a single command (`surge-rule-checker`) that:
1. Uses AppleScript to get the active Chrome tab URL via `osascript`
2. Calls the local Surge API at `http://127.0.0.1:6171/v1/requests/recent` with auth header `X-Key: surgesch`
3. Matches the current host against recent proxy requests to find the applicable rule
4. Displays results via Raycast toast notifications

## Key Dependencies

- **Runtime**: Surge proxy must be running locally with API enabled on port 6171
- **Browser**: Google Chrome (hardcoded in AppleScript)
- **Platform**: macOS only (uses AppleScript and assumes local Surge installation)

## Development Commands

```bash
# Development mode (hot reload)
npm run dev

# Build extension
npm run build

# Lint code
npm run lint

# Fix linting issues
npm run fix-lint

# Publish to Raycast Store
npm run publish
```

## File Structure

- `src/surge-rule-checker.ts` - Main command implementation
- `package.json` - Extension manifest and dependencies
- `raycast-env.d.ts` - Auto-generated TypeScript definitions
- `assets/extension-icon.png` - Extension icon

## Configuration

The extension uses Raycast's standard configuration:
- No user preferences defined
- Single "no-view" command mode
- Standard Raycast ESLint configuration
- TypeScript with ES2023 target

## API Integration

The extension expects Surge to be configured with:
- API enabled on localhost:6171
- Authentication key "surgesch"
- Recent requests endpoint accessible at `/v1/requests/recent`

## Development Notes

- The extension runs in "no-view" mode, meaning it executes immediately without UI
- Error handling is minimal - missing Surge API or Chrome will cause runtime errors
- The AppleScript assumes Chrome is the active browser application
- Host matching uses string inclusion, not exact domain matching
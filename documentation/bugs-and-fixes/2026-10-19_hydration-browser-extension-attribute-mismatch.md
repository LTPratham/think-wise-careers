# Bug Fix: React Hydration Warning from Browser Extension Attributes

**Date:** 2026-10-19  
**Description:** Next.js dev overlay threw a hydration warning: *"A tree hydrated but some attributes of the server rendered HTML didn't match the client properties"*.  
**Root Cause:** The user's browser has an extension (`nakshtrm`) that automatically injects DOM attributes into the root `<html>` tag before React hydration:
- `data-nakshtrm-extension="active"`
- `data-nakshtrm-version="1.0.1"`
React compares the server-rendered HTML string (which lacks those extension attributes) against the client DOM tree and triggers a warning overlay.

**Fix Applied:**
Added `suppressHydrationWarning` to `<html ... suppressHydrationWarning>` and `<body ... suppressHydrationWarning>` in `src/app/layout.tsx`. As documented in the official Next.js documentation, `suppressHydrationWarning` instructs React to ignore attribute mismatches introduced by client-side browser extensions.

**Files Modified:**
- [`src/app/layout.tsx`](file:///d:/projects/Think%20Wise%20Careers/think-wise-careers/src/app/layout.tsx)

**Verification:**
Reloaded page in browser; hydration warning overlay on `<html>` is silenced and dismissed.

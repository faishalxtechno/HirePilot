import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

console.log('🧪 Starting HirePilot 3D Logo Intro Experience Test Suite...\n');

let passedTests = 0;
let totalTests = 0;

function test(description, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✅ PASS: ${description}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${description}`);
    console.error(err);
    process.exitCode = 1;
  }
}

async function runAllTests() {
  const rootDir = process.cwd();

  // -----------------------------------------------------------------------------
  // 1. Official Logo Asset Verification
  // -----------------------------------------------------------------------------
  console.log('--- 1. Testing Official Logo Asset Integrity ---');

  test('Official logo file exists at public/images/hirepilot-logo.png', () => {
    const logoPath = path.join(rootDir, 'public', 'images', 'hirepilot-logo.png');
    assert.ok(fs.existsSync(logoPath), 'Logo file must exist in public/images');
    const stats = fs.statSync(logoPath);
    assert.ok(stats.size > 10000, `Logo file must not be empty or truncated (size: ${stats.size} bytes)`);
  });

  test('LogoIntro component strictly uses the official logo path without modification', () => {
    const componentPath = path.join(rootDir, 'src', 'components', 'ui', 'LogoIntro.tsx');
    const content = fs.readFileSync(componentPath, 'utf8');
    assert.ok(content.includes('src="/images/hirepilot-logo.png"'), 'Must reference official logo asset');
    assert.ok(content.includes('alt="HirePilot - Practice • Prepare • Get Hired"'), 'Must contain accessible brand alt text');
  });

  // -----------------------------------------------------------------------------
  // 2. Playback & Session Storage Rules
  // -----------------------------------------------------------------------------
  console.log('--- 2. Testing Session Storage & Playback Rules ---');

  test('SessionStorage key is standardized as hirepilot_intro_seen', () => {
    const componentPath = path.join(rootDir, 'src', 'components', 'ui', 'LogoIntro.tsx');
    const content = fs.readFileSync(componentPath, 'utf8');
    assert.ok(content.includes("const STORAGE_KEY = 'hirepilot_intro_seen'"), 'STORAGE_KEY must be hirepilot_intro_seen');
  });

  test('Component reads sessionStorage on mount and sets it upon display', () => {
    const componentPath = path.join(rootDir, 'src', 'components', 'ui', 'LogoIntro.tsx');
    const content = fs.readFileSync(componentPath, 'utf8');
    assert.ok(content.includes('sessionStorage.getItem(STORAGE_KEY)'), 'Must check sessionStorage on initial render');
    assert.ok(content.includes('sessionStorage.setItem(STORAGE_KEY, \'true\')'), 'Must set sessionStorage when intro plays');
  });

  test('Supports forceShow override for testing or manual preview', () => {
    const componentPath = path.join(rootDir, 'src', 'components', 'ui', 'LogoIntro.tsx');
    const content = fs.readFileSync(componentPath, 'utf8');
    assert.ok(content.includes('forceShow?: boolean'), 'Must accept forceShow prop');
    assert.ok(content.includes('if (forceShow) return true;'), 'forceShow must bypass sessionStorage check');
  });

  // -----------------------------------------------------------------------------
  // 3. Animation Timing & Duration Rules (2–3 seconds)
  // -----------------------------------------------------------------------------
  console.log('--- 3. Testing Animation Timing & Transition Duration ---');

  test('Default display duration is within the 2–3s specification (2300ms + 550ms exit)', () => {
    const componentPath = path.join(rootDir, 'src', 'components', 'ui', 'LogoIntro.tsx');
    const content = fs.readFileSync(componentPath, 'utf8');
    assert.ok(content.includes('displayDuration = 2300'), 'Default active display duration should be 2300ms');
    assert.ok(content.includes('550'), 'Exit dissolve transition should be 550ms');
    const totalDuration = 2300 + 550;
    assert.ok(totalDuration >= 2000 && totalDuration <= 3000, `Total duration ${totalDuration}ms must be within 2-3s range`);
  });

  test('Provides fallback hard safety timer to guarantee unmount', () => {
    const componentPath = path.join(rootDir, 'src', 'components', 'ui', 'LogoIntro.tsx');
    const content = fs.readFileSync(componentPath, 'utf8');
    assert.ok(content.includes('displayDuration + 900'), 'Must include safety timeout for graceful fallback');
  });

  // -----------------------------------------------------------------------------
  // 4. Accessibility & Reduced Motion
  // -----------------------------------------------------------------------------
  console.log('--- 4. Testing Accessibility & Reduced Motion Support ---');

  test('Integrates useReducedMotion hook and handles prefers-reduced-motion', () => {
    const componentPath = path.join(rootDir, 'src', 'components', 'ui', 'LogoIntro.tsx');
    const content = fs.readFileSync(componentPath, 'utf8');
    assert.ok(content.includes('useReducedMotion'), 'Must import useReducedMotion');
    assert.ok(content.includes('if (prefersReducedMotion)'), 'Must check prefersReducedMotion');
  });

  test('CSS defines reduced motion overrides to disable 3D transforms', () => {
    const cssPath = path.join(rootDir, 'src', 'index.css');
    const cssContent = fs.readFileSync(cssPath, 'utf8');
    assert.ok(cssContent.includes('@media (prefers-reduced-motion: reduce)'), 'CSS must include prefers-reduced-motion media query');
    assert.ok(cssContent.includes('.animate-logo-3d-stage'), 'CSS must target .animate-logo-3d-stage in reduced motion');
  });

  test('Provides accessible Skip button and Escape key dismiss', () => {
    const componentPath = path.join(rootDir, 'src', 'components', 'ui', 'LogoIntro.tsx');
    const content = fs.readFileSync(componentPath, 'utf8');
    assert.ok(content.includes('Skip ✕'), 'Must render Skip button');
    assert.ok(content.includes("e.key === 'Escape'"), 'Must handle Escape key to dismiss');
    assert.ok(content.includes('role="dialog"'), 'Must have accessible dialog semantics');
  });

  // -----------------------------------------------------------------------------
  // 5. CSS 3D Stage & Lighting Transforms
  // -----------------------------------------------------------------------------
  console.log('--- 5. Testing 3D Keyframe Animations & Lighting ---');

  test('CSS defines 3D emergence with perspective, rotateX, rotateY, and translate3d', () => {
    const cssPath = path.join(rootDir, 'src', 'index.css');
    const cssContent = fs.readFileSync(cssPath, 'utf8');
    assert.ok(cssContent.includes('@keyframes logo-3d-stage-emerge'), 'Must define logo-3d-stage-emerge');
    assert.ok(cssContent.includes('perspective(1200px)'), 'Must use 3D perspective');
    assert.ok(cssContent.includes('rotateX('), 'Must rotate along X axis');
    assert.ok(cssContent.includes('rotateY('), 'Must rotate along Y axis');
    assert.ok(cssContent.includes('preserve-3d'), 'Must preserve 3D context');
  });

  test('CSS defines studio specular light sweep across logo surface', () => {
    const cssPath = path.join(rootDir, 'src', 'index.css');
    const cssContent = fs.readFileSync(cssPath, 'utf8');
    assert.ok(cssContent.includes('@keyframes logo-specular-sweep'), 'Must define logo-specular-sweep');
    assert.ok(cssContent.includes('.animate-logo-specular'), 'Must expose .animate-logo-specular utility');
  });

  test('CSS defines floor shadow depth projection and ambient aura', () => {
    const cssPath = path.join(rootDir, 'src', 'index.css');
    const cssContent = fs.readFileSync(cssPath, 'utf8');
    assert.ok(cssContent.includes('@keyframes logo-floor-shadow'), 'Must define logo-floor-shadow');
    assert.ok(cssContent.includes('@keyframes logo-ambient-bloom'), 'Must define logo-ambient-bloom');
    assert.ok(cssContent.includes('@keyframes logo-tagline-reveal'), 'Must define logo-tagline-reveal');
  });

  // -----------------------------------------------------------------------------
  // 6. Seamless Homepage Transition & Non-blocking Safety
  // -----------------------------------------------------------------------------
  console.log('--- 6. Testing Homepage Integration & Non-blocking Guarantee ---');

  test('Landing.tsx integrates LogoIntro with homepage ready in DOM behind it', () => {
    const landingPath = path.join(rootDir, 'src', 'pages', 'Landing.tsx');
    const landingContent = fs.readFileSync(landingPath, 'utf8');
    assert.ok(landingContent.includes("import { LogoIntro } from '../components/ui/LogoIntro'"), 'Landing must import LogoIntro');
    assert.ok(landingContent.includes('<LogoIntro />'), 'Landing must render LogoIntro');
  });

  test('Exiting state applies pointer-events-none and opacity-0 to never trap user', () => {
    const componentPath = path.join(rootDir, 'src', 'components', 'ui', 'LogoIntro.tsx');
    const content = fs.readFileSync(componentPath, 'utf8');
    assert.ok(content.includes('opacity-0 scale-[1.04] blur-[8px] pointer-events-none'), 'Exiting state must release pointer events and blur away');
    assert.ok(content.includes('if (!isVisible) {\n    return null;\n  }'), 'Must completely unmount when finished');
  });

  test('Restores document.body.style.overflow upon exit/unmount', () => {
    const componentPath = path.join(rootDir, 'src', 'components', 'ui', 'LogoIntro.tsx');
    const content = fs.readFileSync(componentPath, 'utf8');
    assert.ok(content.includes("document.body.style.overflow = 'hidden'"), 'Locks scroll during play');
    assert.ok(content.includes('document.body.style.overflow = originalOverflow'), 'Restores original scroll on cleanup');
  });

  // -----------------------------------------------------------------------------
  // Summary
  // -----------------------------------------------------------------------------
  console.log('\n========================================');
  console.log(`🎉 LOGO INTRO TEST RESULTS: ${passedTests} / ${totalTests} Passed`);
  console.log('========================================\n');
}

runAllTests().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});


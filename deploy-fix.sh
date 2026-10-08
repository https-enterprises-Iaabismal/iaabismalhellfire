#!/bin/bash
set -e

echo "🔥 [ABYSSAL-CORE] FULL DEPLOYMENT FIX"
echo "======================================"

# 1. Clean old builds
echo "🧹 Cleaning old builds..."
rm -rf .next node_modules package-lock.json 2>/dev/null || true

# 2. Install dependencies
echo "📦 Installing dependencies..."
npm install

# 3. Remove src/app conflicts
echo "🗑️ Removing src/app conflicts..."
rm -rf src/app 2>/dev/null || true
mkdir -p src/lib

# 4. Generate catalog if missing
echo "🎸 Generating metal tracks catalog..."
if [ ! -f public/data/metal-tracks.json ]; then
  mkdir -p public/data
  python3 core/generador_abismal.py || echo "⚠️ Python generation skipped"
fi

# 5. Build for production
echo "🔨 Building for production..."
npm run build

# 6. Ready for deployment
echo ""
echo "✅ READY FOR DEPLOYMENT"
echo "======================================"
echo "📊 For Vercel:     git push (auto-deploys)"
echo "📊 For Cloudflare: git push (Pages auto-builds)"
echo "🌐 Local test:     npm start"
echo ""

#!/bin/bash
# build.sh - Build script for Render deployment

echo "🔨 Building Finarrator Backend..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

echo "✅ Build complete!"

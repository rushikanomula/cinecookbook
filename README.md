# pixels-to-products-cloudinary-ai-hackathon-2026-bugbusters
# CineCookbook 🍳🎬
### Pixels to Products: Cloudinary AI Hackathon 2026 — Bugbusters
Recipe Share & Interactive Cooking Platform

An interactive, media-rich web application built with Next.js designed for food enthusiasts to discover, scale, upload, and follow video-integrated recipes seamlessly.

📋 Table of Contents

The Problem

The Solution

Hackathon Track / Category

Technologies Used

Cloudinary Integration

Project Structure

Setup & Installation

Running the Project

Usage Guide

🔍 The Problem

Traditional recipe websites often suffer from rigid structures and poor user experience:

Inflexible Serving Sizes: Users struggle to manually calculate ingredient quantities when cooking for more or fewer people.

Cluttered Media: Cooking videos are frequently buried under long blog posts or intrusive ads.

Complex Upload Pipelines: Adding media-rich content (videos and high-res photos) to recipe platforms is often slow, unoptimized, and lacking proper storage handling.

💡 The Solution

This platform solves these pain points by offering:

Dynamic Ingredient Scaler: Instantly scales ingredient measurements up or down based on the desired number of servings.

Embedded Video Integration: Clean, distraction-free video playback alongside step-by-step instructions.

Seamless Media Uploads: Fast, optimized media handling for recipe imagery and cooking demonstration videos via Cloudinary.

Saved Favorites & State Management: A responsive React Context architecture allowing users to save and manage their go-to recipes effortlessly.

🚀 Hackathon Track / Category

Track: Web Development / Full-Stack Multimedia / Developer Tools (Cloudinary Integration Track)

Focus: Next.js App Router, Cloudinary Media Optimization, Modern UI/UX with Tailwind CSS.

🛠 Technologies Used

Framework: Next.js (App Router)

Language: TypeScript

Styling: Tailwind CSS

Media Management: Cloudinary (Image & Video hosting, optimization, and transformation)

State Management: React Context API (RecipeContext)

Icons & UI Utilities: Lucide React / Tailwind Utils

☁️ Cloudinary Integration

Cloudinary powers all media operations within the application:

Asset Uploads: Recipe creators upload high-resolution images and cooking videos directly through the /upload interface.

Optimization & Delivery: Cloudinary automatically optimizes image and video delivery formats (e.g., WebP/AVIF for images, adaptive streaming for videos) to ensure lightning-fast page loads.

Responsive Media: Utilizes Cloudinary transformation parameters to serve correctly sized visual assets across mobile and desktop viewports.

📂 Project Structure

├── src/
│   ├── app/
│   │   ├── globals.css          # Global styles and Tailwind directives
│   │   ├── layout.tsx           # Root layout with providers and Navbar
│   │   ├── page.tsx             # Home feed / Discover recipes
│   │   ├── saved/               # Saved recipes page
│   │   ├── upload/              # Recipe creation & media upload page
│   │   └── recipe/[id]/         # Dynamic individual recipe view
│   ├── components/
│   │   ├── Navbar.tsx           # Navigation bar component
│   │   ├── RecipeCard.tsx       # Card component for recipe previews
│   │   ├── VideoPlayer.tsx      # Video playback wrapper component
│   │   ├── RecipeSteps.tsx      # Step-by-step cooking instructions
│   │   └── IngredientScaler.tsx # Interactive serving size adjuster
│   ├── context/
│   │   └── RecipeContext.tsx    # Global state for recipes and favorites
│   ├── types/
│   │   └── recipe.ts            # TypeScript interfaces for recipes
│   └── lib/
│       └── utils.ts             # Helper utilities
├── tailwind.config.ts           # Tailwind configuration
├── postcss.config.js            # PostCSS configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Project dependencies


⚙️ Setup & Installation

Follow these steps to set up the project locally:

Clone the repository:

git clone https://github.com/your-username/recipe-platform.git
cd recipe-platform


Install dependencies:

npm install
# or
yarn install


Configure Environment Variables:
Create a .env.local file in the root directory based on .env.example:

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset


🏃‍♂️ Running the Project

Start the development server:

npm run dev
# or
yarn dev


Open http://localhost:3000 in your browser to explore the app.

📱 How to Use the Project

Browse Recipes: Explore featured recipes right on the home page feed (src/app/page.tsx).

View Details: Click on any recipe card to open its dedicated page (src/app/recipe/[id]/page.tsx), featuring ingredients, steps, and video guides.

Scale Ingredients: Use the Ingredient Scaler component to adjust portion sizes, and watch the measurements update dynamically.

Upload a Recipe: Navigate to the upload page (src/app/upload/page.tsx) to add your own recipe title, ingredients, steps, and upload media through Cloudinary.

Save Favorites: Bookmark recipes to quickly access them later via the Saved tab (src/app/saved/page.tsx).

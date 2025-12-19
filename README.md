# Kaan vs. Kadir: The Birthday Battle 🎉

Epic futuristic birthday battle game with real-time multiplayer support.

## 🚀 Features

- **Futuristic UI**: Dark void aesthetic with neon glow effects
- **Real-time Multiplayer**: Firebase-powered synchronization
- **Smooth Animations**: Framer Motion for buttery transitions
- **Celebration Twist**: Glitch effect revealing the true birthday surprise
- **Responsive Design**: Works perfectly on desktop and mobile

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Effects**: Canvas Confetti
- **Database**: Firebase Realtime Database
- **Deployment**: Vercel

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/ParzivalSANN/asksite.git
cd asksite
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Realtime Database
   - Copy your Firebase config

4. Create `.env.local` file:
```bash
cp .env.local.example .env.local
```

5. Add your Firebase credentials to `.env.local`

6. Run the development server:
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000)

## 🎮 How to Play

1. Choose your player (Kaan or Kadir)
2. Battle by pressing:
   - **A key** for Kaan (or tap left side on mobile)
   - **L key** for Kadir (or tap right side on mobile)
3. Push the energy bar to your opponent's side
4. First to 95% wins!
5. Watch the epic celebration reveal 🎊

## 🌐 Deploy to Vercel

1. Push to GitHub:
```bash
git add .
git commit -m "v2: Birthday Battle Game"
git push origin main
```

2. Go to [Vercel](https://vercel.com)
3. Import your GitHub repository
4. Add environment variables (Firebase config)
5. Deploy!

## 📝 Firebase Setup (Detailed)

### Step 1: Create Firebase Project
1. Go to https://console.firebase.google.com/
2. Click "Add Project"
3. Name it (e.g., "kaan-kadir-battle")
4. Disable Google Analytics (optional)
5. Click "Create Project"

### Step 2: Enable Realtime Database
1. In Firebase Console, go to "Realtime Database"
2. Click "Create Database"
3. Choose location (e.g., "europe-west1")
4. Start in **test mode** for development
5. Click "Enable"

### Step 3: Get Firebase Config
1. Go to Project Settings (gear icon)
2. Scroll to "Your apps"
3. Click Web icon (</>)
4. Register app (name: "Birthday Battle")
5. Copy the `firebaseConfig` object
6. Paste values into `.env.local`

### Step 4: Security Rules (Production)
```json
{
  "rules": {
    "games": {
      ".read": true,
      ".write": true
    }
  }
}
```

## 🎨 Color Palette

- **Kaan**: Neon Cyan (#00f0ff)
- **Kadir**: Neon Magenta (#ff00ff)
- **Background**: Deep Void (#0a0a0a)
- **Accent**: Purple (#8b5cf6)

## 📄 License

MIT License - Feel free to use this for your own birthday celebrations!

## 🎂 Made with ❤️ for Kaan & Kadir

Happy Birthday Kings! 👑👑

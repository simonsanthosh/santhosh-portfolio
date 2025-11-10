# Groq AI Integration Setup Guide

## ✅ What's Been Done

I've integrated **Groq AI (100% FREE)** into your portfolio chatbot. The system now uses real AI instead of keyword matching!

### Files Modified:
1. **Backend**: `santhosh-portfolio-backend/server.js` - Added Groq API endpoint
2. **Frontend**: `main.js` - Updated to call real AI API with fallback to keyword matching
3. **Dependencies**: Installed `groq-sdk` package

---

## 🔑 Step 1: Get Your FREE Groq API Key

1. Visit: **https://console.groq.com/**
2. Sign up for FREE (no credit card needed)
3. Go to **API Keys** section
4. Click **Create API Key**
5. Copy your API key (starts with `gsk_...`)

---

## ⚙️ Step 2: Add API Key to Backend

Open this file: `santhosh-portfolio-backend/server.js`

Find line 17 and replace `YOUR_GROQ_API_KEY_HERE` with your actual key:

```javascript
const groq = new Groq({
  apiKey: "gsk_your_actual_key_here", // Paste your key here
});
```

**OR** (Better for production):

Create a `.env` file in `santhosh-portfolio-backend/` folder:
```
GROQ_API_KEY=gsk_your_actual_key_here
```

Then install dotenv:
```bash
cd santhosh-portfolio-backend
npm install dotenv
```

And add to top of `server.js`:
```javascript
require('dotenv').config();
```

---

## 🚀 Step 3: Start the Backend Server

```bash
cd santhosh-portfolio-backend
node server.js
```

You should see:
```
Server running on http://localhost:3000
AI Chat endpoint: http://localhost:3000/api/chat
```

---

## 🌐 Step 4: Open Your Website

Open `index.html` in your browser (or use Live Server)

---

## 🧪 Step 5: Test the AI Chat

1. Click the **AI toggle** in the header to enable
2. Type any message like:
   - "Who is Santhosh?"
   - "What are your skills?"
   - "Tell me about your projects"
3. Watch the AI respond with intelligent, natural answers!

---

## 🎯 How It Works

### With Backend Running:
- User types message → Calls Groq API → Gets intelligent AI response
- **Cost: ₹0 (FREE forever)**
- **Speed: Very fast (usually < 1 second)**
- **Quality: Excellent (Llama 3.1 70B model)**

### If Backend is Down:
- Automatically falls back to keyword matching (your old system)
- No errors, seamless experience

---

## 📝 Customizing the AI

Edit the `systemPrompt` in `server.js` (lines 42-56) to customize what the AI knows about you:

```javascript
const systemPrompt = `You are an AI assistant for Santhosh's portfolio website.

About Santhosh:
- Full-stack developer and mentor
- [Add your details here]
- [Add your skills here]
- [Add your achievements here]

Keep responses concise (2-3 sentences), friendly, and professional.`;
```

---

## 🔧 Troubleshooting

### Problem: "API error" in console
**Solution**: Make sure backend is running (`node server.js`)

### Problem: "Failed to fetch"
**Solution**: Check if backend URL is correct (http://localhost:3000)

### Problem: Gets keyword responses instead of AI
**Solution**: Backend might not be running. Check console for errors.

### Problem: "Invalid API key"
**Solution**: Double-check your Groq API key is correct

---

## 📊 Groq Free Tier Limits

✅ **14,400 requests per day**
✅ **30 requests per minute**
✅ **No credit card required**
✅ **Never expires**

For a portfolio, you'll use maybe 10-100 requests per day. You're well within limits!

---

## 💡 Next Steps (Optional)

### 1. Deploy Backend to Cloud (Still FREE):
- **Railway.app**: Free hosting for Node.js apps
- **Render.com**: Free tier available
- **Vercel**: Can host serverless functions
- **Fly.io**: Free tier available

### 2. Add Rate Limiting:
Prevent abuse by limiting requests per IP

### 3. Add Chat History:
Store conversations in a database

### 4. Multi-language Support:
Groq can respond in any language!

---

## 📞 API Endpoints

### Chat Endpoint:
```
POST http://localhost:3000/api/chat
Body: { "message": "Your question here" }
Response: { "reply": "AI's answer" }
```

### Visitor Count (Already working):
```
GET http://localhost:3000/api/visitors
Response: { "count": 5 }
```

---

## 🎉 Success!

Your portfolio now has a **real AI chatbot** powered by Groq (Llama 3.1 70B)!

**Cost**: ₹0/month
**Quality**: Professional-grade AI
**Speed**: Lightning fast
**Setup time**: 5 minutes

Enjoy your smart AI assistant! 🚀

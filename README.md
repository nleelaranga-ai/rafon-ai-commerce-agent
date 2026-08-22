# RAFON AI ⚡

<p align="center">
  <h3 align="center">Autonomous Commerce Intelligence Platform</h3>
  <p align="center">
    Built for <b>Razorpay AI Buildathon 2026</b> • AI Growth & Agentic Commerce Track
  </p>
</p>

---

## 🚀 Overview

RAFON AI is an AI-powered commerce platform that helps online merchants increase revenue using conversational AI, intelligent product recommendations, AI-powered upselling, explainable payment decisions, and Razorpay Test Mode checkout.

Instead of a traditional checkout flow, RAFON AI understands customer intent, recommends products, generates contextual upsells, executes secure payments, and records every AI decision in an auditable timeline.

---

## ✨ Core Features

- 🤖 AI Shopping Assistant (Gemini-powered)
- 🛍️ Intent-Based Product Recommendations
- 💡 AI Upsell & Cross-Sell Engine
- 💳 Razorpay Test Mode Checkout
- 🔁 Payment Failure Recovery Flow
- 📊 Merchant Revenue Analytics Dashboard
- 📜 Explainable AI Audit Timeline
- 📱 Fully Responsive Fintech UI

---

## 🏗️ System Architecture

```text
                  RAFON AI (Next.js Frontend)
                           │
      ┌────────────────────┼────────────────────┐
      │                    │                    │
 Customer UI        Merchant Dashboard      AI Copilot
      │                    │                    │
      └────────────── REST API ────────────────┘
                           │
                FastAPI Backend (Render)
                           │
      ┌──────────────┬───────────────┬──────────────┐
      │              │               │              │
 Gemini AI      Razorpay APIs     SQLite DB    Recovery Engine
      │              │               │              │
      └──────────────┴───────────────┴──────────────┘
                           │
            Merchant Analytics + Audit Timeline
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 15 + React + Tailwind CSS |
| UI Components | Shadcn UI |
| Animation | Framer Motion |
| Charts | Recharts |
| Backend | FastAPI |
| AI | Google Gemini 2.5 Flash |
| Payments | Razorpay Test Mode API |
| Database | SQLite |
| Deployment | Vercel + Render |
| Version Control | GitHub |

---

## 📂 Repository Structure

```text
rafon-ai-commerce-agent/

├── frontend/
├── backend/
├── database/
├── design/
├── docs/
├── screenshots/
├── demo/
├── README.md
├── LICENSE
├── .gitignore
└── .env.example
```

---

## 📱 Screens

| Screen | Status |
|--------|--------|
| Landing Page | ✅ |
| Merchant Dashboard | ✅ |
| AI Shopping Assistant | ✅ |
| Smart Cart | ✅ |
| Razorpay Checkout | ✅ |
| Payment Success | ✅ |
| Payment Failure Recovery | ✅ |
| Revenue Analytics | ✅ |
| AI Audit Timeline | ✅ |

---

## 🔄 AI Commerce Flow

1. Customer starts chatting with RAFON AI.
2. AI detects intent and budget.
3. AI recommends products.
4. AI generates contextual upsells.
5. Customer proceeds to Razorpay Checkout.
6. Payment is verified.
7. Merchant dashboard updates revenue.
8. Every AI decision is logged.

---

## 📊 Merchant Dashboard Metrics

- Total Revenue
- AI Assisted Orders
- Conversion Rate
- Upsell Revenue
- Payment Success Rate
- Recovery Success Rate

---

## 📜 Explainable AI Audit Timeline

Every AI decision is recorded.

Example:

| Time | Event |
|------|-------|
|10:22|Intent detected|
|10:22|Budget extracted|
|10:23|Recommendation generated|
|10:24|Upsell suggested|
|10:25|Razorpay Order created|
|10:26|Payment verified|

---

## 🔐 Security

- API keys stored in environment variables.
- Razorpay Secret never exposed to frontend.
- Payment verification performed on backend.
- Audit logs stored server-side.

---

## 🌐 Deployment

| Service | Platform |
|----------|----------|
| Frontend | Vercel |
| Backend | Render |
| AI | Gemini API |
| Payments | Razorpay Sandbox |

Live Demo → **Coming Soon**

---

## 👨‍💻 Team

**LEELA RANGA PRASAD**

B.Tech AI & Data Science

VR Siddhartha Engineering College

Built for Razorpay AI Buildathon 2026.

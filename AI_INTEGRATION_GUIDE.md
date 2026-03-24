# On-Device AI Integration & Backend Guide

This document is intended for backend developers or ML engineers working to transform this offline tracked frontend into a fully-fledged local AI application. Currently, the interface operates completely offline using `localStorage` to simulate a local database, providing a highly scalable structure ready to be hooked into real WebAssembly (Wasm) or local inference models.

---

## 🧠 1. State Management & Data Calculations

Calculations and data logic are heavily abstracted into the **Zustand Stores** located in `src/store/`.

### `useExpenseStore.js`
- **Logic**: It manages the entire taxonomy of budgets, savings goals, and transaction histories locally. 
- **Calculations**: `getTotalSpending()` iterates through the `expenses` array caching the sum of all string/numeric active amounts.
- **Backend Migration**: Currently, it uses Zustand's `.persist` middleware to flush the stringified state tree synchronously to the browser's `localStorage` API. 
  - **Required Update**: To scale securely and efficiently, rewrite the persist wrapper's custom `storage` property to point to an asynchronous **IndexedDB** adapter (like `idb-keyval`) or a local Wasm SQLite wrapper. 

### `useAuthStore.js`
- **Logic**: Handles offline profile sessions and the numeric Privacy App Lock PIN.
- **Required Update**: If higher security is needed locally, password hashing should be applied. The PIN mechanism functions purely on UI diversion at the routing level (`AppLayout.jsx`), and does not explicitly encrypt the JSON payloads. True on-device AES encryption should intercept the save sequence if biometric locking is required.

---

## 🤖 2. Replacing the Mocked AI Input Layer

The primary objective to make this app "AI-first" is dropping real local inference models into the provided UI skeletons. All UI elements handle their own loading states cleanly without heavy animations blockages, making them perfect asynchronous targets.

### A. Smart Input Layer (`src/features/input/SmartInput.jsx`)
- **Current Mock Logic**: We use rudimentary string mapping (e.g. `lower.includes('coffee')`) running on a 600ms fake `setTimeout` delay to guess the user's category and amount.
- **Backend Task**: 
  - Remove the timeout.
  - Pipe the raw `text` string input through an on-device Small Language Model (SLM) executing via WebGPU (e.g., **WebLLM** or **Transformers.js**).
  - Return a strictly parsed absolute JSON object `(Amount, Category, Merchant, Date)`.

### B. Receipt Scanner (`src/features/input/ReceiptScanner.jsx`)
- **Current Mock Logic**: The camera interface is purely CSS-driven mockup states (`idle | scanning | done`), returning a static hardcoded Whole Foods receipt upon capture.
- **Backend Task**:
  - Implement a `getUserMedia` streaming block into the viewfinder.
  - Hook the capture sequence up to an offline OCR (Optical Character Recognition) library like **Tesseract.js Wasm**.
  - Pass the OCR raw text payload to your local NLP engine to extract the final `{ amount, merchant, date }` parameters.

### C. Voice Assistant Overlay (`src/features/input/VoiceAssistant.jsx`)
- **Current Mock Logic**: Activated globally via the Floating Mic, it utilizes a fake interval to print statically written strings claiming "I spent thirty-five dollars on gas".
- **Backend Task**:
  - Connect the `isVoiceListening` UI state securely to the `window.SpeechRecognition` (Web Speech API) for real-time offline dictation transcriptions. 
  - If a heavier model is preferred for offline privacy, compile an on-device local Whisper implementation.
  - Pipe the final compiled transcript explicitly through the same NLP Intent extractor utilized by the Smart Input module to yield the structured final expense.

### D. Intelligent Insights (`src/features/dashboard/AIInsights.jsx`)
- **Current Mock Logic**: Renders a heavily styled static card mentioning a "12% higher" trend in dining.
- **Backend Task**:
  - Build an on-device RAG (Retrieval-Augmented Generation) loop or a standard prompt injection.
  - Periodically inject the user's massive offline `expenses` array Context into a local inference engine with instructions to analyze their spending cadence.
  - Update the UI to render the locally streamed response string providing real actionable offline analytics without leaking user data to the cloud.

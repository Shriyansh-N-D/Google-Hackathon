# Google-Hackathon

# 🛡️ AI Content Moderation Backend — Hackathon Project

This backend powers an AI-driven moderation system that analyzes both **text** and **image+text (memes)**. It detects harmful or offensive content and provides human-readable explanations using powerful transformer models.

---

## 🚀 Features

- ✏️ **Text classification** with DeBERTa-v2
- 🖼️ **Meme classification** using CLIP (ViT-B/32)
- 🧠 **Harmful content explanation** via:
  - 🗣️ OpenHermes for text (via Ollama)
  - 👁️ LLaVA 1.5 (7B) for multimodal (image + text)
- ⚡ FastAPI backend with a single `/analyze` endpoint
- 🔌 Modular design to allow model replacement or updates

---

## 🧠 Moderation Pipeline

### 🔹 Text-only Inputs
1. Input is routed to the **DeBERTa** classifier.
2. If flagged as harmful, it's passed to **OpenHermes (via Ollama)** for moderation message generation.

### 🔹 Image + Text Inputs
1. Image is classified using the **CLIP** model.
2. If flagged as harmful, it's passed to the **LLaVA** model to explain *why* it was flagged.

---

## 🗂️ Project Structure



---

## ⚙️ Setup Instructions

> ✅ Python 3.12 + pip recommended

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd backend
```

## 📁 Model Placement (⚠️ Important)

⚠️ Due to file size constraints, models are not included in this repo. You must manually place them.


###🔹 DeBERTa (Text Classifier)
Open models/text_classifier.py
Look for this line:

```
MODEL_PATH = "C:/CODING/Hackathon/deberta_harmful_text_classifier"
```

and replace it with the path to your own deberta model

###🔹 CLIP (Meme Classifier)
Open models/clip_classifier.py
Look for this line:

```
CLIP_MODEL_PATH = "C:/CODING/Hackathon/harmful_meme_detector_optimized_CLIP.pt"
```

and replace it with your own .pt model path

###🔹 LLaVA (Multimodal Explanation)

Open models/llama_explainer.py
Look for this line:
```
LLaVA_MODEL_PATH = "C:/CODING/Hackathon/LLaVA/models/llava-1.5-7b-hf"
```

and replace with your own LLaVA model directory


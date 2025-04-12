from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
import uvicorn
import os
import shutil

from models.text_classifier import classify_text
from models.clip_classifier import classify_clip

from models.llama_explainer import generate_explanation
from models.llama_explainer import generate_llava_explanation

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze")
async def analyze(
    text: str = Form(...),
    image: Optional[UploadFile] = File(None)
):
    print(f"[DEBUG] Input received: Text = '{text[:60]}...' | Image = {image.filename if image else 'None'}")

    if image:
        temp_path = f"temp_images/{image.filename}"
        os.makedirs("temp_images", exist_ok=True)
        with open(temp_path, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)

        result = await handle_multimodal_pipeline(text, temp_path)

        os.remove(temp_path)
    else:
        result = await handle_text_pipeline(text)

    print(f"[DEBUG] Final pipeline output: {result}")
    return JSONResponse(content=result)


async def handle_text_pipeline(text: str):
    print("[DEBUG] Routing to text pipeline...")

    is_hate = classify_text(text)
    print(f"[DEBUG] classify_text() result: {is_hate}")

    if is_hate:
        reason = "hate/harassment"
        explanation = generate_explanation(reason)
        return {
            "pipeline": "text",
            "harmful": True,
            "misinformation": None,
            "decision": "flagged",
            "explanation": explanation
        }

    

    return {
        "pipeline": "text",
        "harmful": False,
        "misinformation": False,
        "decision": "approved",
        "explanation": None
    }


async def handle_multimodal_pipeline(text: str, image_path: str):
    print("[DEBUG] Routing to multimodal pipeline...")

    is_hate, score = classify_clip(text, image_path)
    print(f"[DEBUG] classify_clip() result: {is_hate} | score: {score:.4f}")

    if is_hate:
        reason = "hate/harassment (image + text)"
        print(f"[DEBUG] Sending to LLaVA for explanation: reason = {reason}, image_path = {image_path}")

        explanation = generate_llava_explanation(image_path, reason)
        return {
            "pipeline": "multimodal",
            "harmful": True,
            "misinformation": None,
            "decision": "flagged",
            "clip_score": score,
            "explanation": explanation
        }

    # If not harmful:
    return {
        "pipeline": "multimodal",
        "harmful": False,
        "misinformation": False,
        "decision": "approved",
        "clip_score": score,
        "explanation": None
    }




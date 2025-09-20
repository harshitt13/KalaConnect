import os
import time
import google.generativeai as genai
from flask import current_app

def generate_product_content(craft_name, materials):
    """
    Calls the Google Gemini API to generate product content.
    Includes exponential backoff retry logic for fault tolerance.
    """
    try:
        api_key = current_app.config.get('GEMINI_API_KEY')
        if not api_key:
            raise ValueError("GEMINI_API_KEY is not configured.")
        
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel('gemini-2.5-flash-preview-05-20')

    except Exception as e:
        current_app.logger.error(f"AI Service configuration failed: {e}")
        raise ConnectionError("Failed to configure the AI service.")

    prompt = f"""
    You are a creative marketing assistant for an Indian artisan. Your task is to generate compelling content for a new product listing.
    The artisan creates '{craft_name}' using these materials: '{materials}'.

    Generate the following content, strictly following the format with ### headings. Do not add any extra text or introductions.

    ### Title
    A creative, appealing, and SEO-friendly title for the product.

    ### Story
    A short, heartwarming story (2-3 sentences) that connects the product to the artisan's heritage, process, or inspiration.

    ### Description
    A detailed product description focusing on features, dimensions (if applicable), materials, and ideal use cases.
    """

    max_retries = 5
    for attempt in range(max_retries):
        try:
            response = model.generate_content(prompt)
            # Parse the response text to extract content based on headings
            text = response.text
            title = text.split('### Title')[1].split('### Story')[0].strip()
            story = text.split('### Story')[1].split('### Description')[0].strip()
            description = text.split('### Description')[1].strip()
            
            return {
                "title": title,
                "story": story,
                "description": description
            }
        except Exception as e:
            current_app.logger.warning(f"AI API call attempt {attempt + 1} failed: {e}")
            if attempt < max_retries - 1:
                time.sleep(2 ** attempt)
            else:
                current_app.logger.error("AI API call failed after multiple retries.")
                raise ConnectionError("The AI content generator is currently unavailable. Please try again later.")


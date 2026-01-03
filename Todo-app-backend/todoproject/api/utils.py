from google import genai
from django.conf import settings

client = genai.Client(api_key=settings.GENAI_API_KEY)



def get_gemini_response(user_input):
    try:
        response = client.models.generate_content(
            model = "gemini-2.5-flash",
            contents = user_input
        )
        return response.text
    except Exception as e:
        print("Gemini error:", e)
        return "AI failed to respond. Please try again."
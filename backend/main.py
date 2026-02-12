#----------------------------------------------IMPORTS------------------------------------------------#
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
from tensorflow.keras.models import load_model
from scheduler import router as scheduler_router #contains API routes related to irrigation
from dashboard import router as dashboard_router #contains API routes related to dashboard
#PIL(Python Imaging Library) is used for image processing
from PIL import Image
#Numpy is used for numerical operations(images are represented as arrays)
import numpy as np
#io helps us read image bytes from uploaded files
import io
# REGISTER THE CROP HEALTH ROUTER
from crop_health import router as crop_health_router


#---------------------------------------------------------------------------------------------#


#
# --- Load model ---
MODEL_PATH = "../ml_model/saved_model/krishi_mitra_inference_model.keras"
#load_model is a function from TensorFlow Keras that loads a pre-trained model from the specified path into memory.
model = load_model(MODEL_PATH)

# --- Class names ---
#These are the class labels your model was trained to recognize.
#The model outputs a number(index) and we map it to these names to get human-readable results.
#Eg: If the model predicts index 0, it corresponds to 'Apple___Apple_scab'.
CLASS_NAMES = [
    'Apple___Apple_scab', 'Apple___Black_rot', 'Apple___Cedar_apple_rust', 'Apple___healthy',
    'Blueberry___healthy', 'Cherry___healthy', 'Cherry___Powdery_mildew',
    'Corn___Cercospot_leaf_spot Gray_leaf_spot', 'Corn___Common_rust', 'Corn___healthy',
    'Corn___Northern_Leaf_Blight', 'Grape___Black_rot', 'Grape___Esca_(Black_Measles)',
    'Grape___healthy', 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)',
    'Orange___Haunglongbing_(Citrus_greening)', 'Peach___Bacterial_spot', 'Peach___healthy',
    'Pepper,_bell___Bacterial_spot', 'Pepper,_bell___healthy', 'Potato___Early_blight',
    'Potato___healthy', 'Potato___Late_blight', 'Raspberry___healthy', 'Soybean___healthy',
    'Squash___Powdery_mildew', 'Strawberry___healthy', 'Strawberry___Leaf_scorch',
    'Tomato___Bacterial_spot', 'Tomato___Early_blight', 'Tomato___healthy', 'Tomato___Late_blight',
    'Tomato___Leaf_Mold', 'Tomato___Septoria_leaf_spot',
    'Tomato___Spider_mites Two-spotted_spider_mite', 'Tomato___Target_Spot',
    'Tomato___Tomato_mosaic_virus', 'Tomato___Tomato_Yellow_Leaf_Curl_Virus'
]

# --- FastAPI app ---
#Create an instance of the FastAPI application
app = FastAPI()

# REGISTER THE CROP HEALTH ROUTER
#include_router is a method that allows you to modularize your API by separating different functionalities into different routers.
# Here, we are including the crop_health_router which contains routes related to crop health functionalities.
app.include_router(crop_health_router)


# REGISTER THE DASHBOARD ROUTER
#This line includes the dashboard_router into the main FastAPI application.
app.include_router(dashboard_router)

# --- CORS ---
# This allows your React app (running on localhost:5173)
# to call the backend APIs without browser blocking it
# CORS (Cross-Origin Resource Sharing) is a security feature implemented by web browsers to restrict web pages from making requests to a different domain than the one that served the web page.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all origins
    allow_credentials=True,
    allow_methods=["*"], # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"], # Allow all headers
)

# ✅ REGISTER THE SCHEDULER ROUTER
app.include_router(scheduler_router)

def preprocess_image(image_bytes: bytes):

    #Open the image using PIL and resize it to 224x224 pixels
    #io.BytesIO allows us to treat the byte data as a file-like object 
    image = Image.open(io.BytesIO(image_bytes)).resize((224, 224))

    #Convert the image to a numpy array and normalize pixel values to [0, 1] 
    #The model expects input data to be in the range [0, 1]
    image_array = np.array(image) / 255.0

    #Add a batch dimension to the array
    #Models typically expect input data to have a shape that includes the batch size as the first dimension.
    # tf.expand_dims adds this extra dimension, making the shape (1, 224, 224, 3)
    return tf.expand_dims(image_array, 0)

@app.get("/")
def root():
    return {"message": "Krishi Mitra API Running"}

#Import the function to save crop scan results
from services.crop_health_service import save_crop_scan_result

@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    #Read the uploaded image file as bytes
    #await is used because file.read() is an asynchronous operation that may take time to complete.
    image_bytes = await file.read()

    #Preprocess the image, converting it to the format expected by the model
    image_tensor = preprocess_image(image_bytes)

    #Make prediction using the pre-trained model
    prediction = model.predict(image_tensor)

    #Get the class with the highest predicted probability
    #np.argmax returns the index of the maximum value in the array
    #Eg: If the model predicts [0.1, 0.7, 0.2], np.argmax will return 1 (index of 0.7) 
    #We then use this index to get the corresponding class name from CLASS_NAMES list.
    predicted_class = CLASS_NAMES[np.argmax(prediction)]

    #Get the confidence score of the prediction
    #np.max returns the highest probability value from the prediction array.
    #Eg: If the model predicts [0.1, 0.7, 0.2], np.max will return 0.7 and float converts it to a standard Python float type.
    confidence = float(np.max(prediction))

    # SAVE RESULT in backend.
    #This is what updates the "Overall Crop Health Statistics" in the dashboard.
    #This single line connects:
    #ML → Dashboard → Farm Summary
    #save_crop_scan_result is a function that saves the predicted class to the database or any storage system.
    save_crop_scan_result(predicted_class)

    # Send prediction result back to frontend
    return {
        "prediction": predicted_class,
        "confidence": confidence
    }

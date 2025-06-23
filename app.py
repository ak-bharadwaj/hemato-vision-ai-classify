
from flask import Flask, render_template, request, redirect, url_for, flash
import os
import numpy as np
from werkzeug.utils import secure_filename
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array
import cv2

app = Flask(__name__)
app.secret_key = 'hemato_vision_secret_key'
app.config['UPLOAD_FOLDER'] = 'static/uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Ensure upload directory exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Load the trained model
MODEL_PATH = 'bloodcell.h5'
try:
    model = load_model(MODEL_PATH)
    print("Model loaded successfully!")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

# Blood cell class labels
CLASS_LABELS = {
    0: 'Eosinophil',
    1: 'Lymphocyte', 
    2: 'Monocyte',
    3: 'Neutrophil'
}

# Cell descriptions
CELL_DESCRIPTIONS = {
    'Eosinophil': 'A type of white blood cell involved in allergic reactions and parasitic infections.',
    'Lymphocyte': 'A type of white blood cell that plays a key role in adaptive immunity.',
    'Monocyte': 'Large white blood cells that differentiate into macrophages and dendritic cells.',
    'Neutrophil': 'The most abundant type of white blood cell, first responders to infection.'
}

def allowed_file(filename):
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def preprocess_image(image_path, target_size=(150, 150)):
    """Preprocess image for model prediction"""
    try:
        # Load and resize image
        img = load_img(image_path, target_size=target_size)
        img_array = img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        img_array = img_array / 255.0  # Normalize pixel values
        return img_array
    except Exception as e:
        print(f"Error preprocessing image: {e}")
        return None

def get_confidence_metrics(confidence):
    """Get confidence level and color based on confidence score"""
    if confidence >= 0.8:
        return 'High', 'green'
    elif confidence >= 0.6:
        return 'Medium', 'yellow'
    else:
        return 'Low', 'red'

@app.route('/')
def home():
    """Home page with upload form"""
    return render_template('home.html')

@app.route('/classify', methods=['POST'])
def classify():
    """Handle image upload and classification"""
    if 'file' not in request.files:
        flash('No file selected')
        return redirect(request.url)
    
    file = request.files['file']
    
    if file.filename == '':
        flash('No file selected')
        return redirect(request.url)
    
    if file and allowed_file(file.filename):
        try:
            # Save uploaded file
            filename = secure_filename(file.filename)
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)
            
            if model is None:
                flash('Model not available. Please try again later.')
                return redirect(url_for('home'))
            
            # Preprocess image
            processed_image = preprocess_image(filepath)
            if processed_image is None:
                flash('Error processing image. Please try again.')
                return redirect(url_for('home'))
            
            # Make prediction
            predictions = model.predict(processed_image)
            predicted_class = np.argmax(predictions[0])
            confidence = float(predictions[0][predicted_class])
            
            # Get prediction details
            prediction_label = CLASS_LABELS[predicted_class]
            description = CELL_DESCRIPTIONS[prediction_label]
            confidence_level, confidence_color = get_confidence_metrics(confidence)
            
            # Prepare data for template
            result_data = {
                'image_path': f'/static/uploads/{filename}',
                'prediction': prediction_label,
                'confidence': round(confidence * 100, 1),
                'confidence_level': confidence_level,
                'confidence_color': confidence_color,
                'description': description
            }
            
            return render_template('result.html', **result_data)
            
        except Exception as e:
            print(f"Error during classification: {e}")
            flash('Error processing image. Please try again.')
            return redirect(url_for('home'))
    else:
        flash('Invalid file type. Please upload an image file.')
        return redirect(url_for('home'))

@app.errorhandler(404)
def not_found(error):
    return render_template('home.html'), 404

@app.errorhandler(500)
def internal_error(error):
    flash('Internal server error. Please try again.')
    return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

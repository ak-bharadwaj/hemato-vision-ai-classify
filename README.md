# HematoVision AI — Automated Hematological Blood Cell Classification

[![Python](https://img.shields.io/badge/Python-3.10%2B-blue?logo=python)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-2.3%2B-black?logo=flask)](https://flask.palletsprojects.com/)
[![NumPy](https://img.shields.io/badge/NumPy-Array%20Processing-013243?logo=numpy)](https://numpy.org/)
[![Pillow](https://img.shields.io/badge/Pillow-Image%20Processing-yellow)](https://python-pillow.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A computer-vision-assisted laboratory diagnostic tool built with **Python**, **Flask**, and **NumPy**. HematoVision automates the classification and differential counting of white blood cells (leukocytes), red blood cells (erythrocytes), and platelets from digitized microscopic peripheral blood smear (PBS) slides.

---

## 🏛️ Diagnostic Pipeline

```mermaid
flowchart TD
    subgraph InputStage ["1. Image Acquisition"]
        Slide["Microscopic PBS Slide (40x / 100x Oil Immersion)"]
        Upload["Flask Multi-Part Ingestion (/predict)"]
    end

    subgraph PreprocessingStage ["2. Image Normalization"]
        Resize["Pillow Aspect-Preserving Resizing"]
        ColorNormalize["Color Constancy & Stain Normalization"]
        ArrayConv["NumPy Multi-Channel Tensor Transformation"]
    end

    subgraph InferenceStage ["3. Morphological Classification"]
        Model["Trained Deep Feature Extractor & Classifier"]
        Classes["Differential Cell Identification:
- Neutrophils
- Lymphocytes
- Monocytes
- Eosinophils
- Basophils
- Erythrocytes"]
    end

    subgraph OutputStage ["4. Laboratory Report Generation"]
        Report["Automated Pathology Screening Summary"]
        UI["Web Dashboard with Cell Crop Overlays"]
    end

    Slide --> Upload
    Upload --> Resize
    Resize --> ColorNormalize
    ColorNormalize --> ArrayConv
    ArrayConv --> Model
    Model --> Classes
    Classes --> Report
    Report --> UI
```

---

## 🔬 Hematological Class Coverage

The vision pipeline accurately segments and categorizes major peripheral blood components:
- **Neutrophils**: Multi-lobed nucleus with pale cytoplasm (bacterial infection & inflammation marker).
- **Lymphocytes**: Large spherical nucleus with minimal cytoplasmic halo (viral response & adaptive immunity marker).
- **Monocytes**: Kidney-shaped or folded nucleus with agranular cytoplasm (chronic infection & phagocytosis).
- **Eosinophils**: Bilobed nucleus with bright orange-pink cytoplasmic granules (allergic reactions & parasitic infections).
- **Basophils**: Coarse, dark purple granules obscuring the nucleus (histamine release & hypersensitivity).
- **Erythrocytes & Platelets**: Size, shape (normocytic, microcytic), and central pallor analysis for anemia and thrombocytopenia screening.

---

## 📂 Repository Structure

```text
hemato-vision-ai-classify/
├── app.py                      # Flask web server & inference endpoint
├── generate_model.py           # Model definition & feature weight generator
├── requirements.txt            # Python dependencies (Flask, Pillow, NumPy, Werkzeug)
├── report.txt                  # Sample clinical validation log
├── static/                     # CSS styles, diagnostic badges, and uploaded previews
├── templates/                  # HTML5 diagnostic view templates
└── HematoVision_Project_PPT.pptx # Comprehensive clinical research presentation
```

---

## 🚀 Local Setup & Execution

### 1. Installation
```bash
git clone https://github.com/ak-bharadwaj/hemato-vision-ai-classify.git
cd hemato-vision-ai-classify

python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate

pip install -r requirements.txt
```

### 2. Generate Model Artifacts (If not already present)
```bash
python generate_model.py
```

### 3. Start Flask Web Server
```bash
python app.py
```
Open [http://localhost:5000](http://localhost:5000) to upload peripheral blood smear images and view instant cell classification outputs.

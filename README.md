# 🧬 HematoVision - Blood Cell Classification using Deep Learning

HematoVision is a web-based AI application that classifies blood cells into four categories using a Convolutional Neural Network (CNN) model. It helps in medical research and diagnosis by identifying white blood cell types from microscope images.

---

## 📌 Project Overview

This project was developed as part of the **SmartBridge Internship** to apply **Transfer Learning** for medical image classification.

### 🔍 It can classify:
- 🟥 **Eosinophils**
- 🟦 **Lymphocytes**
- 🟨 **Monocytes**
- 🟩 **Neutrophils**

---

## 🚀 Features

- 📷 Upload any microscope image of a blood smear
- 🤖 Predicts the blood cell type using a trained `.h5` model
- 📊 Shows prediction confidence with color-coded indicators
- 🧠 Gives medical descriptions for each cell type

---

## 🧠 Model Info

- Framework: **TensorFlow / Keras**
- Input Image Size: **150x150**
- Preprocessing: Normalization, resizing, and augmentation
- Model File: `bloodcell.h5` (pretrained and saved)

---

## 🔧 How to Run (Locally)

1. Clone the repository:
```bash
git clone https://github.com/ak-bharadwaj/hemato-vision-ai-classify.git
cd hemato-vision-ai-classify
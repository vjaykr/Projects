Fraud Detection System

This is a Flask-based web application for detecting financial fraud in transactions. The application uses machine learning models (Logistic Regression and Random Forest) to classify transactions as either fraudulent or non-fraudulent.

Features

User-Friendly Interface: A simple and intuitive web interface for inputting transaction details.

Fraud Prediction: Uses pre-trained machine learning models to detect fraudulent transactions.

Dynamic Data Handling: Automatically computes required fields based on user input.

Installation

1. Clone the Repository

$ git clone https://github.com/vjaykr/fraud-detection-system.git
$ cd fraud-detection-system

2. Set Up Virtual Environment

$ python -m venv venv
$ source venv/bin/activate  # On Windows: venv\Scripts\activate

3. Install Dependencies

$ pip install -r requirements.txt

Project Structure

fraud-detection-system/
├── app/
│   ├── static/
│   │   └── styles.css           # CSS file for styling
│   ├── templates/
│   │   └── index.html           # HTML template for the web interface
│   └── app.py                   # Flask application file
├── models/
│   ├── financial_fraud_lr.pkl   # Logistic Regression model
│   ├── financial_fraud_rf.pkl   # Random Forest model
├── data/
│   └── synthetic_data.csv       # Dataset (optional)
├── scripts/
│   └── train_model.py           # Script for training models
├── .gitignore                   # Git ignore file
├── README.md                    # Documentation
└── requirements.txt             # Python dependencies

Usage

1. Start the Flask Server

$ python app/app.py

The application will start at http://127.0.0.1:5000.

2. Use the Web Interface

Open a browser and navigate to http://127.0.0.1:5000.

Input transaction details:

Transaction Type: Select from Cash Out, Payment, or Transfer.

Transaction Amount: Enter the transaction amount.

Sender's Current Balance: Enter the sender's balance.

Receiver's Current Balance: Enter the receiver's balance.

Click Check for Fraud to get predictions.

Models

The system uses two machine learning models trained on synthetic financial transaction data:

Logistic Regression: A simple linear model for binary classification.

Random Forest: A tree-based ensemble model for robust predictions.

Training the Models

If you want to retrain the models:

Prepare your dataset (synthetic_data.csv or a similar dataset).

Use the train_model.py script to train new models:

$ python scripts/train_model.py

Save the models in the models/ directory with appropriate filenames (financial_fraud_lr.pkl and financial_fraud_rf.pkl).

Dependencies

Flask

scikit-learn

pandas

numpy

Install dependencies using:

$ pip install -r requirements.txt

Contributing

Fork the repository.

Create a new branch for your feature/fix:

$ git checkout -b feature-name

Commit your changes:

$ git commit -m "Add feature description"

Push to the branch:

$ git push origin feature-name

Open a pull request.

License

This project is licensed under the MIT License. See the LICENSE file for details.

Acknowledgments

Dataset: Synthetic data used for training was generated for demonstration purposes.

Libraries: Special thanks to Flask and scikit-learn for simplifying web development and machine learning.

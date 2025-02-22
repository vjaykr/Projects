from flask import Flask, render_template, request
import pickle
import pandas as pd

app = Flask(__name__)

# Load the pre-trained models
with open("app/financial_fraud_lr.pkl", "rb") as f:
    lr_model = pickle.load(f)

with open("app/financial_fraud_rf.pkl", "rb") as f:
    rf_model = pickle.load(f)

# Define feature names (ensure they match the trained model)
feature_names = [
    "step", "amount", "oldbalanceOrg", "newbalanceOrig",
    "oldbalanceDest", "newbalanceDest",
    "type_CASH_OUT", "type_DEBIT", "type_PAYMENT", "type_TRANSFER"
]

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get user input from the form
        transaction_type = request.form.get("transaction_type")
        amount = float(request.form.get("amount"))
        sender_balance = float(request.form.get("sender_balance"))
        receiver_balance = float(request.form.get("receiver_balance"))

        # Prepare one-hot encoding for transaction type
        type_features = {
            "type_CASH_OUT": 1 if transaction_type == "CASH_OUT" else 0,
            "type_DEBIT": 0,  # Default to 0, not included in UI
            "type_PAYMENT": 1 if transaction_type == "PAYMENT" else 0,
            "type_TRANSFER": 1 if transaction_type == "TRANSFER" else 0
        }

        # Derive other necessary features
        step = 1  # Default to 1 (time step)
        oldbalanceOrg = sender_balance
        newbalanceOrig = sender_balance - amount
        oldbalanceDest = receiver_balance
        newbalanceDest = receiver_balance + amount

        # Prepare input data
        input_data = pd.DataFrame([[
            step, amount, oldbalanceOrg, newbalanceOrig,
            oldbalanceDest, newbalanceDest,
            type_features["type_CASH_OUT"],
            type_features["type_DEBIT"],
            type_features["type_PAYMENT"],
            type_features["type_TRANSFER"]
        ]], columns=feature_names)

        # Predict using both models
        lr_prediction = lr_model.predict(input_data)[0]
        rf_prediction = rf_model.predict(input_data)[0]

        # Interpret results
        lr_result = "Fraudulent" if lr_prediction == 1 else "Not Fraudulent"
        rf_result = "Fraudulent" if rf_prediction == 1 else "Not Fraudulent"

        # Combine predictions for display
        result_message = (
            f"Logistic Regression Prediction: {lr_result}<br>"
            f"Random Forest Prediction: {rf_result}"
        )
        return render_template("index.html", result=result_message)

    except Exception as e:
        # Handle errors gracefully
        return render_template("index.html", result=f"<span class='error'>Error: {str(e)}</span>")

if __name__ == '__main__':
    app.run(debug=True)

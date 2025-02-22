import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score
import pickle

# Step 1: Load the dataset
data_path = "scripts\synthetic_data.csv"  # Update this path as needed
data = pd.read_csv(data_path)

# Step 2: Explore the dataset
print("Dataset Overview:")
print(data.head())
print(data.info())

# Step 3: Drop unnecessary columns and prepare the data
# Target variable: 'isFraud'
# Features: Drop 'isFraud', 'nameOrig', 'nameDest' (if not useful for predictions)
X = data.drop(columns=["isFraud", "nameOrig", "nameDest"])  # Keep relevant features
y = data["isFraud"]

# Convert categorical feature 'type' to numerical (one-hot encoding)
X = pd.get_dummies(X, columns=["type"], drop_first=True)

# Step 4: Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Step 5: Train the model
print("Training the model...")
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Step 6: Evaluate the model
y_pred = model.predict(X_test)
print("Model Evaluation:")
print("Accuracy:", accuracy_score(y_test, y_pred))
print("Classification Report:\n", classification_report(y_test, y_pred))

# Step 7: Save the trained model
model_path = "../models/financial_fraud_model.pkl"
with open(model_path, "wb") as f:
    pickle.dump(model, f)
print(f"Model saved to {model_path}")

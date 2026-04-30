import pandas as pd
from sklearn.ensemble import RandomForestRegressor
import pickle

# Load dataset
df = pd.read_csv("ai-engine/data/dataset.csv")

# Convert categorical → numeric
df = pd.get_dummies(df)

# Features & targets
X = df.drop(["execution_time", "utilization"], axis=1)
y = df[["execution_time", "utilization"]]

# Train model
model = RandomForestRegressor()
model.fit(X, y)

# Save model
pickle.dump(model, open("ai-engine/models/model.pkl", "wb"))

print("Model trained and saved ✅")
import pickle
import pandas as pd
import os

# Load model
model_path = os.path.join(
    os.path.dirname(__file__),
    "../models/model.pkl"
)

model = pickle.load(open(model_path, "rb"))

def predict_load(task, node):

    input_data = {
        "model_type": task["type"],
        "input_size": task["size"],
        "priority": task["priority"],
        "node_type": node["type"]
    }

    df = pd.DataFrame([input_data])

    # Convert categorical
    df = pd.get_dummies(df)

    # Align columns with model
    model_columns = model.feature_names_in_
    df = df.reindex(columns=model_columns, fill_value=0)

    prediction = model.predict(df)

    execution_time = float(prediction[0][0])
    utilization = float(prediction[0][1])

    return {
        "execution_time": execution_time,
        "utilization": utilization
    }
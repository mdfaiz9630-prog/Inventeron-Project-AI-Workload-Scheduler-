# ai-engine/core/scheduler.py

from load_predictor import predict_load

def schedule(tasks, nodes):
    result = []

    for task in tasks:
        best_node = None
        best_score = float("inf")
        best_prediction = None

        for node in nodes:
            prediction = predict_load(task, node)

            score = prediction["execution_time"] + node["load"]

            if score < best_score:
                best_score = score
                best_node = node
                best_prediction = prediction

        # update node load
        best_node["load"] += best_prediction["execution_time"] / 10

        result.append({
            "task": task["name"],
            "assigned_node": best_node["name"],
            "predicted_time": round(best_prediction["execution_time"], 2),
            "utilization": best_prediction["utilization"]
        })

    # 🔥 RETURN BOTH schedule + updated nodes
    return {
        "schedule": result,
        "nodes": nodes
    }
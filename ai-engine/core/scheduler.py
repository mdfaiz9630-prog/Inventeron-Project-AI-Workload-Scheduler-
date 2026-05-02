from load_predictor import predict_load

def schedule(tasks, nodes):
    result = []

    for task in tasks:
        best_node = None
        best_score = float("inf")
        best_prediction = None

        # -------- FIND BEST NODE --------
        for node in nodes:
            prediction = predict_load(task, node)

            score = (
                prediction["execution_time"]          # ML predicted time
                + node["load"] * 3                    # load penalty
                + (20 if node["type"] == "gpu" else 0)  # slight GPU penalty
            )

            if score < best_score:
                best_score = score
                best_node = node
                best_prediction = prediction

        # -------- QUEUE LOGIC --------
        if best_node["load"] >= 90:
            result.append({
                "task": task["name"],
                "assigned_node": "QUEUED",
                "predicted_time": None,
                "utilization": 0
            })
            continue

        # -------- ASSIGN TASK --------
        best_node["load"] += best_prediction["execution_time"] / 10

        result.append({
            "task": task["name"],
            "assigned_node": best_node["name"],
            "predicted_time": round(best_prediction["execution_time"], 2),
            "utilization": best_prediction["utilization"]
        })

    return {
        "schedule": result,
        "nodes": nodes
    }
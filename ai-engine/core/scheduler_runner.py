import sys
import os
import json

# fix import path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), ".")))

from scheduler import schedule

if __name__ == "__main__":
    data = json.loads(sys.argv[1])

    result = schedule(data["tasks"], data["nodes"])

    print(json.dumps(result))
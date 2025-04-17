import pandas as pd
import random
from datetime import datetime, timedelta

# Settings
num_seconds = 30
emp_ids = [f"EMP00{i}" for i in range(1, 6)]
start_time = datetime.now()

# Generate data
data = []
for i in range(num_seconds):
    timestamp = start_time + timedelta(seconds=i)
    for emp_id in emp_ids:
        x = round(random.uniform(0, 10), 2)
        y = round(random.uniform(0, 10), 2)
        data.append([timestamp.strftime("%Y-%m-%d %H:%M:%S"), emp_id, x, y])

# Create DataFrame
df = pd.DataFrame(data, columns=["timestamp", "emp_id", "x", "y"])
df.head()  # Show sample of the data
print(df)
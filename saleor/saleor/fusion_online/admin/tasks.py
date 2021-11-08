from ...celeryconf import app

@app.task
def test_task(data):
    return len(data)
    # print(len(data))

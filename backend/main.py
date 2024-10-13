from flask import request, jsonify
from config import app, db
from models import ToDo

@app.route("/todos", methods=["GET"])
def get_todos():
  todos = ToDo.query.all()
  json_todos = list(map(lambda x : x.to_json(), todos))
  return jsonify({"todos": json_todos})

@app.route("/create_todo", methods=["POST"])
def create_todo():
  title = request.json.get("title")

  if not title:
    return (
      jsonify({"message": "Todo must have a title"}),
      400
    )

  new_todo = ToDo(title=title)
  try:
    db.session.add(new_todo)
    db.session.commit()
  except Exception as e:
    return jsonify({"message": str(e)}), 400

  return jsonify({"message": "Todo created!"}), 201

@app.route("/update_todo/<int:todo_id>", methods=["PATCH"])
def update_todo(todo_id):
  todo = ToDo.query.get(todo_id)

  if not todo:
    return jsonify({"message": "Todo not found"}), 404

  data = request.json
  todo.title = data.get("title", todo.title)

  db.session.commit()

  return jsonify({"message": "Todo updated?"}), 200

@app.route("/delete_todo/<int:todo_id>", methods=["DELETE"])
def delete_todo(todo_id):
  todo = ToDo.query.get(todo_id)

  if not todo:
    return jsonify({"message": "Todo not found"}), 404

  db.session.delete(todo)
  db.session.commit()

  return jsonify({"message": "Todo deleted!"}), 200


if __name__ == "__main__":
  with app.app_context():
    db.create_all()

  app.run(debug=True)

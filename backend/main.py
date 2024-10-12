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
  description = request.json.get("description")

  if not title or not description:
    return (
      jsonify({"message": "You must include a title and description"}),
      400
    )

  new_todo = ToDo(title=title, description=description)
  try:
    db.session.add(new_todo)
    db.session.commit()
  except Exception as e:
    return jsonify({"message": str(e)}), 400

  return jsonify({"message": "Todo created!"}), 201

@app.route("/update_todo/<int:todo_id>", methods=["PATCH"])
def update_contact(todo_id):
  todo = ToDo.query.get(todo_id)

  if not todo:
    return jsonify({"message": "Todo not found"}), 404

  data = request.json
  todo.title = todo.get("title", todo.title)
  todo.description = todo.get("description", todo.description)

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

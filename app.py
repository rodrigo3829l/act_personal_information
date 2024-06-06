from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Datos iniciales del usuario
user_data = {
    "full_name": "Avelina Hernandez Hernandez",
    "student_id": "20210667",
    "grade": "9 'A'",
    "favorite_color": "Yellow",
    "favorite_food": "Tacos",
    "favorite_hobby": "Dancing",
    "hobbies": []
}

@app.route('/')
def index():
    return render_template('index.html', user=user_data)

@app.route('/add_hobby', methods=['POST'])
def add_hobby():
    new_hobby = request.form.get('hobby')
    if new_hobby:
        user_data['hobbies'].append(new_hobby)
    return jsonify(user_data)

@app.route('/remove_hobby', methods=['POST'])
def remove_hobby():
    hobby_to_remove = request.form.get('hobby')
    if hobby_to_remove in user_data['hobbies']:
        user_data['hobbies'].remove(hobby_to_remove)
    return jsonify(user_data)

if __name__ == '__main__':
    app.run(debug=True)

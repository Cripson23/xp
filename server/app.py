import pyrebase
from config import config
from flask import Flask, jsonify, abort, make_response, request, url_for

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False


def db_connect():
    firebase = pyrebase.initialize_app(config)
    firebase.auth()
    return firebase.database()


db = db_connect()


@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)


@app.route('/api/objects', methods=['GET'])
def get_objects():
    all_objects = db.child("objects").get()

    objects = []
    for obj in all_objects.each():
        dict_obj = obj.val()
        dict_obj['id'] = obj.key()
        objects.append(dict_obj)

    return jsonify(objects)


@app.route('/api/objects/<string:obj_id>', methods=['GET'])
def get_object(obj_id):
    obj = db.child("objects").child(obj_id).get()
    if not obj.val():
        abort(404)

    dict_obj = obj.val()
    dict_obj['id'] = obj.key()

    return jsonify(dict_obj)


@app.route('/api/objects', methods=['POST'])
def create_object():
    if not request.json or 'name' not in request.json or 'xObject' not in request.json or 'yObject' not in request.json \
            or 'descriptionObject' not in request.json:
        abort(400)

    obj = {
        'name': request.json['name'],
        'descriptionObject': request.json['descriptionObject'],
        'xObject': request.json['xObject'],
        'yObject': request.json['yObject'],
    }

    obj_id = db.child("objects").push(obj)['name']
    obj['id'] = obj_id

    return jsonify(obj), 201


@app.route('/api/objects/<string:obj_id>', methods=['PUT'])
def update_object(obj_id):
    obj = db.child("objects").child(obj_id).get()
    if not obj.val():
        abort(404)

    if not request.json or (
            'name' not in request.json and 'xObject' not in request.json and 'yObject' not in request.json
            and 'descriptionObject' not in request.json):
        abort(400)

    dict_obj = {}

    for key in request.json:
        if db.child("objects").child(obj_id).child(key).get().val() is not None:
            dict_obj[key] = request.json[key]

    db.child("objects").child(obj_id).update(dict_obj)

    return jsonify(dict_obj)


@app.route('/api/objects/<string:obj_id>', methods=['DELETE'])
def delete_object(obj_id):
    obj = db.child("objects").child(obj_id).get()
    if not obj.val():
        abort(404)

    db.child("objects").child(obj_id).remove()

    return jsonify({'result': True})


if __name__ == '__main__':
    app.run(debug=True)
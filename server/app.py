import os

import pyrebase
from config import config
from flask import Flask, jsonify, abort, make_response, request, url_for
from flask_cors import CORS, cross_origin
from datetime import datetime

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


def db_connect():
    firebase = pyrebase.initialize_app(config)
    firebase.auth()
    return firebase.database(), firebase.storage()


db, storage = db_connect()


@app.route('/api/objects/', methods=['GET'])
@cross_origin()
def get_objects():
    all_objects = db.child("objects").get()

    objects = []
    for obj in all_objects.each():
        dict_obj = obj.val()
        dict_obj['id'] = obj.key()
        objects.append(dict_obj)

    return jsonify(objects)


@app.route('/api/objects/<string:obj_id>/', methods=['GET'])
@cross_origin()
def get_object(obj_id):
    obj = db.child("objects").child(obj_id).get()
    if not obj.val():
        abort(404)

    dict_obj = obj.val()
    dict_obj['id'] = obj.key()

    return jsonify(dict_obj)


@app.route('/api/objects/', methods=['POST'])
@cross_origin()
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


@app.route('/api/objects/<string:obj_id>/', methods=['PUT'])
@cross_origin()
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


@app.route('/api/objects/<string:obj_id>/', methods=['DELETE'])
@cross_origin()
def delete_object(obj_id):
    obj = db.child("objects").child(obj_id).get()
    if not obj.val():
        abort(404)

    db.child("objects").child(obj_id).remove()

    return jsonify({'result': True})


@app.errorhandler(404)
@cross_origin()
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)

# Работа с изображениями
UPLOAD_FOLDER = 'upload'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/api/objects/<string:obj_id>/upload-img/', methods=['POST'])
@cross_origin()
def upload_object_img(obj_id):
    obj = db.child("objects").child(obj_id).get()
    if not obj.val():
        abort(404)

    if 'file' not in request.files or 'year' not in request.form:
        abort(400)

    file = request.files['file']
    year = request.form['year']

    date = datetime.now().strftime("%Y_%m_%d_%H_%M_%S")
    filename = f"{obj_id}_{year}_{date}"
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)

    if file and allowed_file(file.filename):
        file.save(file_path)
    else:
        abort(400)

    save_path = year + "_" + date
    storage.child(obj_id).child(save_path).put(file_path)
    db.child("images").child(obj_id).child(year).push(save_path)

    os.remove(file_path)

    return jsonify({'result': True})


@app.route('/api/objects/<string:obj_id>/images/', methods=['GET'])
@cross_origin()
def get_object_images(obj_id):
    obj = db.child("objects").child(obj_id).get()
    if not obj.val():
        abort(404)

    images = db.child("images").get()
    images_dict = {
        'object_id': obj_id,
    }

    for img in images.each():
        for d in img.val().keys():
            images_dict[d] = []
            for img_info in img.val()[d].items():
                url = storage.child(obj_id).child(img_info[1]).get_url(None)
                images_dict[d].append({
                    'url': url
                })

    return jsonify(images_dict)


if __name__ == '__main__':
    app.run(debug=True)

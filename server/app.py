import os
import time

import pyrebase
from config import config
from flask import Flask, jsonify, abort, make_response, request, url_for, g
from flask_cors import CORS, cross_origin
from flask_httpauth import HTTPBasicAuth
import jwt
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SECRET_KEY'] = 'JdhsadIU2(@*&981239*-0asd0a)_(ASD1213dsF123@#'
UPLOAD_FOLDER = 'upload'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

def db_connect():
    firebase = pyrebase.initialize_app(config)
    firebase.auth()
    return firebase.database(), firebase.storage()


db, storage = db_connect()
auth = HTTPBasicAuth()

# Авторизация
@auth.verify_password
def verify_password(username_or_token, password):
    user = verify_auth_token(username_or_token)

    if user is None:
        users = db.child("users").get()
        if users.each() is not None:
            for u in users.each():
                if u.val()['username'] == username_or_token:
                    user = u.val()
                    user['id'] = u.key()
        if not user or not check_password_hash(user['hash_password'], password):
            return False

        g.user = user
    return True


def generate_auth_token(username, expires_in = 600):
    return jwt.encode(
            {'id': username, 'exp': time.time() + expires_in },
            app.config['SECRET_KEY'], algorithm='HS256')


def verify_auth_token(token):
    try:
        data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
    except Exception:
        return

    users = db.child("users").get()
    if users.each() is not None:
        for u in users.each():
            if u.val()['username'] == data['id']:
                return u.val()


# Users
@app.route("/api/login/", methods=['GET'])
@auth.login_required
def get_token():
    token = generate_auth_token(auth.username(), 86400)
    return jsonify({"token": token, "duration": 86400, "moderator": g.user['moderator']})


@app.route('/api/register/', methods=['POST'])
def register():
    # Check for blank requests
    if 'username' not in request.json or 'password' not in request.json or 'fio' not in request.json or 'gender' \
            not in request.json or 'birthday' not in request.json:
        abort(400)
    # Check for existing users
    users = db.child("users").get()

    if users.each() is not None:
        for user in users.each():
            if user.val()['username'] == request.json['username']:
                return jsonify({'result': 'username already registered'})

    username = request.json['username']
    password = request.json['password']
    fio = request.json['fio']
    gender = request.json['gender']
    birthday = request.json['birthday']

    user = {
        'username': username,
        'hash_password': generate_password_hash(password),
        'fio': fio,
        'gender': gender,
        'birthday': birthday,
        'moderator': False
    }

    user_id = db.child("users").push(user)['name']
    user['id'] = user_id

    return jsonify(user), 201


# Objects
@app.route('/api/objects/', methods=['GET'])
@auth.login_required
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
@auth.login_required
@cross_origin()
def get_object(obj_id):
    obj = db.child("objects").child(obj_id).get()
    if not obj.val():
        abort(404)

    dict_obj = obj.val()
    dict_obj['id'] = obj.key()

    return jsonify(dict_obj)


@app.route('/api/objects/', methods=['POST'])
@auth.login_required
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
@auth.login_required
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
@auth.login_required
@cross_origin()
def delete_object(obj_id):
    obj = db.child("objects").child(obj_id).get()
    if not obj.val():
        abort(404)

    db.child("objects").child(obj_id).remove()

    return jsonify({'result': True})


# Images
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/api/objects/<string:obj_id>/upload-img/', methods=['POST'])
@auth.login_required
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
    db.child("images").child(obj_id).child(year).push({'user_id': g.user['id'], 'path': save_path, 'moderate_status': False})

    os.remove(file_path)

    return jsonify({'result': True})


# Получение всех прошедших изображений объекта
@app.route('/api/objects/<string:obj_id>/images/', methods=['GET'])
@auth.login_required
@cross_origin()
def get_object_images(obj_id):
    obj = db.child("objects").child(obj_id).get()
    if not obj.val():
        abort(404)
    moderated = False

    if 'moderated' in request.args:
        if request.args['moderated'] == "true":
            moderated = True
        else:
            moderated = False


    images = db.child("images").child(obj_id).get()
    images_dict = {
        'object_id': obj_id,
        'images': {}
    }

    if images.each() is not None:
        for img in images.each():
            year = img.key()
            img_info = img.val()
            for d in img.val().keys():
                if moderated == img_info[d]['moderate_status']:
                    if year not in images_dict['images']:
                        images_dict['images'][year] = []

                    url = storage.child(obj_id).child(img_info[d]['path']).get_url(None)
                    images_dict['images'][year].append({
                        'id': d,
                        'user_id': img_info[d]['user_id'],
                        'url': url
                    })

    return jsonify(images_dict)


# Commons
@app.errorhandler(404)
@cross_origin()
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)


if __name__ == '__main__':
    app.run(debug=True)

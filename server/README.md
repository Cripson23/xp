# Setup
## Create virtual environment
```
python -m venv venv
```
## Activate environment
```
source venv/bin/activate
```
## Install packages
```
pip install -r requirements.txt
```
## Start app to http://localhost:5000
```
python app.py
```

# API
## Users
### Model
```
id - Идентификатор пользователя
username - Логин пользователя
hash_password - Захешированный пароль
moderator - Является ли пользователь модератором (true/false)
fio - ФИО
birthday - Дата рождения
gender - Пол (man/woman)
```
### User registration [required=all JSON model fields | method='POST']
```
/api/register/
```
### User login [required=Authorization Data: username, password | method='GET']
```
/api/login/
```

## Objects
### Model
```
id - Идентификатор объекта
name - Название объекта
descriptionObject - Описание объекта
xObject - Координата x на карте
yObject - Координата y на карте
```

### Get all objects [method=GET]
```
/api/objects
```

### Get one object by ID [method=GET]
```
/api/objects/<string:object_id>
```

### Push new object [required=all JSON model fields | method=POST]
```
/api/objects
```

### Update object [required=at least one JSON model field | method=PUT]
```
/api/objects/<string:object_id>
```

### Delete object by ID [method=DELETE]
```
/api/objects/<string:object_id>
```

## Images
### Model
```
object_id - ID объекта
year - Год изображения
image_id - ID изображения
image_name - Название изображения в хранилище
```

### Upload image [Form data: 'file', 'year' | method=POST]
```
/api/objects/<string:object_id>/upload-img/
```

### Get all MODERATED images urls list by object ID [method=GET]
```
/api/objects/<string:object_id>/images/
```

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
### User registration [method='POST']
The request must contain: all JSON model fields
```
/api/register/
```
### User login [method='GET']
The request must contain: In Authorization Data - username, password 
```
/api/login/
```
Returns: duration (day), moderator (true/false), token 

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

### Push new object [method=POST]
The request must contain: all JSON model fields
```
/api/objects
```

### Update object [method=PUT]
The request must contain: at least one JSON model field
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

### Upload image [method=POST]
The request must contain: Form data - file, year
```
/api/objects/<string:object_id>/upload-img/
```

### Get all MODERATED images urls list by object ID [method=GET]
```
/api/objects/<string:object_id>/images/
```

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
The request must contain: all model fields in JSON
```
/api/register/
```
### User login [method='GET']
The request must contain: In Authorization Data - username, password 
```
/api/login/
```
Returns: duration (day), moderator (true/false), token

Add token in Authorization Data for all requests

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
/api/objects/
```

### Get one object by ID [method=GET]
```
/api/objects/<string:object_id>/
```

### Push new object [method=POST]
The request must contain: all JSON model fields
```
/api/objects/
```

### Update object [method=PUT]
The request must contain: at least one model field in JSON
```
/api/objects/<string:object_id>/
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
moderate_status - статус прохождения модерации (true/false)
```

### Upload image [method=POST]
The request must contain: Form data - file, year
```
/api/objects/<string:object_id>/upload-img/
```

### Delete image by object ID and image ID [method=DELETE]
```
/api/objects/<string:obj_id>/images/<string:img_id>/
```

### Change moderate_status by object ID and image ID [method=PUT]
The request must contain: moderate_status field in JSON (value=true/false)

```
/api/objects/<string:obj_id>/images/<string:img_id>/
```

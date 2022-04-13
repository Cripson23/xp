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
/api/objects/<string:obj_id>
```

### Push new object [method=POST]
```
/api/objects
```

### Update object [method=PUT]
```
/api/objects/<string:obj_id>
```

### Delete object by ID [method=DELETE]
```
/api/objects/<string:obj_id>
```

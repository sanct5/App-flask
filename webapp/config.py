class Config:
    SECRET_KEY = 'ui\xcc\xf7\x1cte\xfes\x89\x844eW@Co\x98\x0f\x01\x1fg\xbf\xc1'
    MYSQL_HOST = 'localhost'
    MYSQL_USER = 'root'
    MYSQL_PASSWORD = 'root'
    MYSQL_DB = 'myflaskapp'
    SQLALCHEMY_DATABASE_URI = f'mysql://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_HOST}/{MYSQL_DB}'


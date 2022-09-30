import os

class Settings():
    DB_URL = "127.0.0.1:27017" if os.getenv("DB_URL", default=None) == None else os.getenv("DB_URL")
    DB_NAME = "BITBULL-HACKA-DB" if os.getenv("DB_NAME", default=None) == None else os.getenv("DB_NAME")
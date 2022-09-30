from bson import ObjectId
from pymongo import *
from Config.config import Settings

class Agent:
    __host = ""
    __serverInfo = ""

    async def connectDB():
        try:
            connection = MongoClient(Settings.DB_URL)
            Agent.__host =  connection.HOST
            Agent.__serverInfo = connection.server_info()
            return connection[Settings.DB_NAME]
        except Exception as exp:
            raise Exception("status_code=502, detail=exp.args")

    async def getServerInfo():
        return {"host": Agent.__host, "serverInfo": Agent.__serverInfo}    

    async def rescue(collectionName, filter):
        try:
            db = await Agent.connectDB()
            collection = db[collectionName]
            ret = []
            for item in collection.find(filter):
                ret.append(item["data"] + " | " + item["num"])
            return ret
        except Exception as exp:
            raise Exception("status_code=502, detail=exp.args")
        finally:
            db.client.close()

    async def insert(collectionName, value):
        try:
            db = await Agent.connectDB()
            collection = db[collectionName]
            collection.insert_one(value)
            return True
        except Exception as exp:
            raise exp
        finally:
            db.client.close()

    async def edit(collectionName, filter, value):
        try:
            db = await Agent.connectDB()
            collection = db[collectionName]            
            aux = {}
            collection.update_one(filter, {"$set":value})
            return True
        except Exception as exp:
            raise Exception("status_code=502, detail=exp.args")
        finally:
            db.client.close()

    async def delete(collectionName, filter):
        try:
            db = await Agent.connectDB()
            collection = db[collectionName]
            collection.delete_one(filter)
            return True
        except Exception as exp:
            raise Exception("status_code=502, detail=exp.args")
        finally:
            db.client.close()
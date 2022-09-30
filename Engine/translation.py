from googletrans import Translator

class Agent:
    __translator = None

    def __init__(self, src="", dest=""):
        self.src = src 
        self.dest = dest
        self.__translator = Translator()

    def translateText(self, text):
        return self.__translator.translate(text, dest=self.dest, src=self.src).text

    def translateList(self, list):
        ret = ""
        for item in self.__translator.translate(list, dest=self.dest, src=self.src):
            ret+= item.text + " "
        return ret
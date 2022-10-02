from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.corpus import stopwords
import nltk
from nltk.stem import PorterStemmer
from nltk.stem import WordNetLemmatizer

class Agent:
    example_string = """
         Muad'Dib learned rapidly because his first training was in how to learn.
         And the first lesson of all was the basic trust that he could learn.
         It's shocking to find how many people do not believe they can learn,
         and how many more believe learning to be difficult.
        """
    worf_quote = "Sir, I protest. I am not a merry man!"

    string_for_stemming = """
        The crew of the USS Discovery discovered many discoveries.
        Discovering is what explorers do. and title equal teste and status equal CURATED 
        """

    sagan_quote = """
        If you wish to make an apple pie from scratch,
        you must first invent the universe.
        """
    tags = {
                "abstract": "",
                "author": "",
                "center": "",
                "created": {"date": "", "act":""},
                "disseminated":"",
                "distribution":"",
                "fundingNumber":"",
                "highlight":"",
                "keyword":"",
                "modified":"",
                "organization":"",
                "published":"",
                "reportNumber":"",
                "stiType":"",
                "stiTypeDetails":"",
                "subjectCategory": "",
                "title":""
            }
    def teste():
        nltk.download('punkt')
        nltk.download("stopwords")
        stop_words = set(stopwords.words("english"))
        filtered_list = []
        words_in_quote = word_tokenize(Agent.example_string)
        for word in words_in_quote:
            if word.casefold() not in stop_words:
                filtered_list.append(word)

        filtered_list = [word for word in words_in_quote if word.casefold() not in stop_words]
        

        stemmer = PorterStemmer()
        words = word_tokenize(Agent.string_for_stemming)
        stemmed_words = [stemmer.stem(word) for word in words]

        nltk.download('averaged_perceptron_tagger')
        words_in_sagan_quote = word_tokenize(Agent.sagan_quote)


        lemmatizer = WordNetLemmatizer()
        lemmatizer.lemmatize("scarves")
        string_for_lemmatizing = "The friends of DeSoto love scarves."
        words = word_tokenize(string_for_lemmatizing)

    def getTagsFromText(text):
        nltk.download('punkt')
        tags = {}
        words = word_tokenize(text)
        for index in range(0, len(words)):
            if(words[index].upper() == "EQUAL"):
                tags[words[index-1]] = words[index+1]
        return [tags]

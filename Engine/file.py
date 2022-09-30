from PyPDF2 import PdfFileReader
from fpdf import FPDF

class Agent():
    def getInformations(path):
        with open(path, 'rb') as file:
            pdf = PdfFileReader(file)
            information = pdf.getDocumentInfo()
            ret = {
                'Pages': pdf.getNumPages(),
                'Author': information.author,
                'Creator': information.creator,
                'Producer': information.producer,
                'Subject': information.subject,
                'Title': information.title}
        return ret

    
    def getPdfText(path):
        ret = ""
        with open(path, 'rb') as file:
            pdf = PdfFileReader(file, strict=False)
            for page in range(0, int(Agent.getInformations(path)["Pages"])):
                ret += pdf.getPage(page).extract_text()+" "
        return ret

    def createPDF(name):
        pdf = FPDF()  
        pdf.add_page()
        pdf.set_font("Arial", size = 15)
        for line in Agent.getPdfText("nasa01.pdf").split("\n"):
            pdf.cell(200, 10, txt=line, ln=1, align='C')
        pdf.output(name)


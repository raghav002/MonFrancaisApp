from googletrans import Translator 

translator = Translator()
text = 'Jeff'
transtext = ''
print (translator.translate('Hello', dest="fr", src = 'en').text)

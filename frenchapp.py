from ast import Or
from asyncio.windows_events import NULL
from cgitb import text
from datetime import datetime
from email.mime import audio
from functools import reduce
from operator import or_
from flask import Flask, render_template, request, redirect, flash, session
from flask_sqlalchemy import SQLAlchemy
from googletrans import Translator 
from playsound import playsound
from flask_login import UserMixin, login_user, login_remembered, LoginManager, login_required, logout_user, current_user

#Section 1 - Database Model Construction

frenchapp = Flask(__name__)

frenchapp.config.from_object(__name__)
frenchapp.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///suppfiles.db'
frenchapp.config.update(SESSION_COOKIE_SAMESITE = "None", SESSION_COOKIE_SECURE = True)
db = SQLAlchemy(frenchapp)

login_man = LoginManager()
login_man.init_app(frenchapp)
login_man.login_view = "loginpage"

@login_man.user_loader
def load_user(user_id):
    return UserInfo.query.get(int(user_id))    

class UserInfo(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key= True)
    useremail = db.Column(db.String(40), nullable = False, default="no email")
    username = db.Column(db.String(20), nullable=False, default="no username")
    password = db.Column(db.String(20), nullable=False, default="no password")
    
    def __repr__(self):
        return self.username + ' login details'

db.create_all()

#Section 2.A - Home page

@frenchapp.route('/')
def home():
    return render_template('home.html')

#Section 2.B - Registration page + availability checks 

@frenchapp.route('/regis', methods=['GET', 'POST'])
def regispage():
    if request.method == 'POST':
        user_email = request.form['useremail']
        user_name = request.form['username']
        user_password = request.form['password']
        print(user_email)
        userinfonum = 0
        while userinfonum < UserInfo.query.count():
            if user_email == UserInfo.query.all()[userinfonum].useremail:
                flash ('Account already exists with this email')
                user_email = None
                user_name = None
                user_password = None
                return redirect('/regis')
                
            elif user_name == UserInfo.query.all()[userinfonum].username:
                flash ('Username taken')
                user_email = None
                user_name = None
                user_password = None
                return redirect('/regis')
            
            userinfonum = userinfonum + 1

        if user_name and user_email and user_password :        
            new_user = UserInfo(useremail = user_email, username = user_name, password=user_password)
            db.session.add(new_user)
            db.session.commit()
            return redirect('/login')
        else:
            flash ('Enter valid details')
            return redirect('/regis')
                
    else:
        return render_template('regis.html')

#Section 2.C - Login page + validity/verification checks 

@frenchapp.route('/login', methods=['GET', 'POST'])
def loginpage():
    if request.method == 'POST':
        user_email = request.form['useremail']
        user_name = request.form['username']
        user_password = request.form['password']
        userinfonum = 0
        while userinfonum < UserInfo.query.count():
            #check for cases where 1 is right, 2 are wrong
            #2 are right, 1 is wrong
            #3 are right or 3 are wrong
            if user_email == UserInfo.query.all()[userinfonum].useremail and \
                user_name == UserInfo.query.all()[userinfonum].username and \
                user_password == UserInfo.query.all()[userinfonum].password:
                
                user = UserInfo.query.filter_by(useremail=user_email).first()
                if user:
                    login_user(user, remember=True)
                    return redirect('/mainmenu')

            elif user_email == UserInfo.query.all()[userinfonum].useremail and \
                user_name == UserInfo.query.all()[userinfonum].username and \
                user_password != UserInfo.query.all()[userinfonum].password:
                flash ('Incorrect password')
                return redirect ('/login')
            userinfonum = userinfonum + 1 

        if not user_email or not user_name or not user_password:
            flash ('No details entered')
            return redirect('/login')
    else:
        return render_template('login.html')

#Section 3 - Main Menu

@frenchapp.route('/mainmenu')
@login_required
def mainmenupage():
    return render_template('mainmenu.html')

@frenchapp.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect('/')

#Section 4 - Translation Page 

@frenchapp.route('/translation', methods=['GET', 'POST'])
@login_required
def translatepage():
    if request.method == 'POST':
        translator = Translator()
        texttobetranslated = request.form['etext']
        print (texttobetranslated)
        if texttobetranslated:
            flash("English text recognized")
        translatedtext = ''; 
        translatedtext = translator.translate(texttobetranslated, dest='fr').text
        print (translatedtext)
        return render_template('translation.html', value=translatedtext, value1=texttobetranslated)
    else:
        return render_template('translation.html')
    
    
#Section 5 - Vocabulary Menu 

@frenchapp.route('/vocabmenu')
@login_required
def vocabpage():
    return render_template('vocabmenu.html')

#Section 5.A - Basic Conversation Vocab Menu and Functions

@frenchapp.route('/bconv')
@login_required
def bconvpage():
    return render_template('bconv.html')
    

@frenchapp.route('/bconv/bonjour')
@login_required
def bonjourpage():
    playsound('BonjourPronounciation.mp3')
    return redirect('/bconv')

@frenchapp.route('/bconv/bonsoir')
@login_required
def bonsoirpage():
    print ('bonsoirpro')
    #playsound('BonsoirP.mp3')
    #return redirect('/bconv')

@frenchapp.route('/bconv/bonnenuit')
@login_required
def bonnenuit():
    print('bonnenuitpro')
    #playsound('BonneNuitP.mp3')
    #return redirect('/bconv')

#Section 5.B - Environment Vocab Menu and Functions

#Section 6 - Books Menu 

@frenchapp.route('/booksmenu')
@login_required
def booksmenupage():
    return render_template('booksmenu.html')

#Section 7 - Wordmatch Quiz 

@frenchapp.route('/wordmatch')
@login_required
def wordmatchpage():
    return render_template('wordmatch.html')


#Section 8.A - Picture GUess Game 

@frenchapp.route('/picguess')
@login_required
def picguesspage():
    return render_template('picguess.html')
   

if __name__ == "__main__":
    frenchapp.secret_key='secret_secret_key'
    frenchapp.run(debug=True)
import cherrypy
import os
import glob

current_dir = os.path.dirname(os.path.abspath(__file__))

class Root(object):
    
    def __init__(self):
        self.USERPROFILE = os.getenv('USERPROFILE')
        self.DESKTOP = os.path.join(USERPROFILE, 'Desktop')
        self.DOCUMENTS = os.path.join(USERPROFILE, 'Documents')
        self.MUSIC = os.path.join(USERPROFILE, 'Music')
        self.PICTURES = os.path.join(USERPROFILE, 'Pictures')
        self.VIDEOS = os.path.join(USERPROFILE, 'Videso')
        self.DOWNLOADS = os.path.join(USERPROFILE, 'Downloads')

        self.favourites = {
            'DESKTOP': self.DESKTOP,
            'DOCUMENTS': self.DOCUMENTS,
            'MUSIC': self.MUSIC,
            'PICTURES': self.PICTURES,
            'VIDEOS': self.VIDEOS,
            'DOWNLOADS': self.DOWNLOADS
            }
        self.FILETYPES = {'video': 'static/images/videos.png',
                          'music': 'static/images/MUSIC.png',
                          'image': 'static/images/image.png',
                          'document': {'.docx': 'static/images/docx.png',
                                       '.doc': 'static/images/docx.png',
                                       '.pdf': 'static/images/pdf.png'},
                          'other': 'static/images/file.png'
                          }
        self.videos = ['.mp4', '.flv', '.mkv']
        self.musics = ['.mp3', '.wav', '.m4a', '.ogg', '.wma']
        self.images = ['.jpg', '.jpeg', '.png', '.gif']
        self.documents = ['.docx', '.doc', '.pdf']
        mfiles = ['mp3','wav','m4a','ogg']

        with open('index.html','rt') as file:
            data = file.read()

        self.cdir = 'DESKTOP'
        self.prevdirs = []
        self.nextdirs = []

        self.content = data%self.folder(self.cdir)
    
    def checktype(self, file):
        details = []
        details.append(file)
        filename = os.path.split(file)[1]
        details.append(filename)
        details.append([filename[:10]+'..' if len(filename)>10 else filename])
        if os.path.isdir(file):
            details.append("<img src='static/images/folder.png'/>%s"%(filename))
        elif os.path.isfile(file):
            details.append("<img src='%s'/>%s"%(self.filetype(file),filename))
        return(details)
        

    def filetype(self, file):
        if os.path.splitext(file)[1].lower() in self.videos:
            pimage = self.FILETYPES['video']
            
        elif os.path.splitext(file)[1].lower() in self.musics:
            pimage = self.FILETYPES['music']
            
        elif os.path.splitext(file)[1].lower() in self.images:
            pimage = self.filepath(file)
            
        elif os.path.splitext(file)[1].lower() in self.documents:
            pimage = self.FILETYPES['document'][os.path.splitext(file)[1]]
        else:
            pimage = self.FILETYPES['other']

        return(pimage)

    def filepath(self,file):
        file = file.split('\\')[3:]
        file.insert(0,'user')
        file = '/'.join(file)
        return(file)

    def convert(self, fpath):
        return(self.filepath(fpath))

    @cherrypy.expose
    def index(self):
        return(self.content)

    @cherrypy.tools.expires(secs=0, force=True)
    @cherrypy.expose
    def folder(self, foldername):
        self.dirdetail = {}
        self.send = ''
        self.filesend = ''
        self.dircontent = []
        self.prevdirs.append(self.cdir)
        
        if foldername in self.favourites.keys():
            self.cdir = self.favourites[foldername]
        else:
            print(self.cdir)
            foldername = foldername.split('/')
            foldername[0] = self.USERPROFILE
            foldername = '\\'.join(foldername)
            self.cdir = foldername
        
        for file in glob.glob(self.cdir+'/*'):
            if not '.lnk' in os.path.splitext(file)[1]:
                self.dircontent.append(file)
            else:
                pass
        for file in self.dircontent:
            ftype = self.checktype(file)
            self.dirdetail[file] = ftype
            if os.path.isdir(file):
                self.send += "<li class='direc ui-button' alt='%s' title='%s'>%s</li>"%(self.filepath(file), ftype[1],ftype[3])
            else:
                self.filesend += "<li class='direc ui-button' alt='%s' title='%s'>%s</li>"%(self.filepath(file), ftype[1],ftype[3])
        self.send += self.filesend

        return(self.send)

    @cherrypy.tools.expires(secs=0, force=True)
    @cherrypy.expose
    def goback(self, _=None):
        self.prevdir = self.prevdirs[-1]
        self.prevdir = self.convert(self.prevdir)
        self.cdir = self.prevdir
        self.prevdirs.pop()
        return(self.folder(self.cdir))


if __name__=="__main__":
    USERPROFILE = os.getenv('USERPROFILE')
    cherrypy.server.socket_host = '0.0.0.0'
    #cherrypy.server.socket_port = 8081
    cherrypy.quickstart(Root(), config={
        '/static':
        {'tools.staticdir.on': True,
         'tools.staticdir.dir': os.path.join(current_dir, "static")
         },
        '/user':
        {'tools.staticdir.on': True,
         'tools.staticdir.dir': USERPROFILE
         }
        })
